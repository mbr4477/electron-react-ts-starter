import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css'

// create a root element to hold our app layout
const root = document.createElement('div');
root.style.height = '100%'; // make the root element fill the screen
document.body.appendChild(root);

// create a render function to keep the ReactDOM call in one place 
const render = (Component: any) => {
    ReactDOM.render(<Component/>, root);
};

// do the initial render
render(App);

// if we are hot reloading, bind the App import to re-render the app.
// when changes occur to any element, they flow up the dom until
// they find an element that can handle the change. in this case,
// all changes will flow up to the root App, causing the whole
// App to reload
if ((module as any).hot) {
    (module as any).hot.accept('./App', () => { render(App) });
}

