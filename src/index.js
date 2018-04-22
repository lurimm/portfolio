import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
let weatherAPIKey = '327427b8847d53c7636094261e589171';
export { weatherAPIKey }

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
