import plastiq from 'plastiq';
import App from './app.jsx';
import router from 'plastiq-router';

router.start();
plastiq.append(document.body, new App({router: router}));
