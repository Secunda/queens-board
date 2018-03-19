import {mainComponent} from './game/index';

const generateContent = () => {
  const element = mainComponent();

  const rootDiv = document.createElement('div');
  rootDiv.id = 'mainGameWrapper';
  rootDiv.className = 'flex-container';
  rootDiv.appendChild(element);

  return rootDiv;
};

let content = generateContent();
document.body.appendChild(content);

if (module.hot) {
  module.hot.accept('./index.js', () => {
    document.body.removeChild(content);

    content = generateContent();
    document.body.appendChild(content);
  });
}
