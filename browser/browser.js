import hyperdom from 'hyperdom';
import App from './app.jsx';
import router from 'hyperdom-router';

router.start();
hyperdom.append(document.body, new App({router: router}));
