import {createStore} from 'redux';
import {mainComponent} from './game/index';

import gameReducer from './reducers/game';

const generateContent = async () => {
  const element = await mainComponent();

  const rootDiv = document.createElement('div');
  rootDiv.id = 'mainGameWrapper';
  rootDiv.className = 'flex-container';
  rootDiv.appendChild(element);

  return rootDiv;
};

(async () => {
  let content = await generateContent();
  document.body.appendChild(content);

  if (module.hot) {
    module.hot.accept('./index.js', async () => {
      document.body.removeChild(content);

      content = await generateContent();
      document.body.appendChild(content);
    });
  }
})();
