import plastiq from 'plastiq';
import router from 'plastiq-router';

var div;

function createTestDiv() {
  if (div) {
    div.parentNode.removeChild(div);
  }

  div = document.createElement('div');

  document.body.appendChild(div);

  return div;
}

// so that app urls don't confuse karma
function useHashRoutes() {
  router.stop();
  router.start({history: router.hash});
  window.location.hash = '';
}

export default function(app) {
  useHashRoutes();
  plastiq.append(createTestDiv(), app);
}
