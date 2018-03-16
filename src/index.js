import {mainComponent} from './game/index';

let element = mainComponent();
document.body.appendChild(element);

if (module.hot) {
    module.hot.accept('./index.js', function() {
        console.log('Hot reload!');
        document.body.removeChild(element);
        element = mainComponent();
        document.body.appendChild(element);
    });
}