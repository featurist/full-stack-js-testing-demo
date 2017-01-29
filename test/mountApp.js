import hyperdom from 'hyperdom';
import runningInBrowser from './stubBrowser';
import createBrowser from 'browser-monkey/create';
import vquery from 'vdom-query';

function addRefreshButton() {
  var refreshLink = document.createElement('a');
  refreshLink.href = window.location.href;
  refreshLink.innerText = 'refresh';
  document.body.appendChild(refreshLink);
  document.body.appendChild(document.createElement('hr'));
}

var div;
function createTestDiv() {
  if (div) {
    div.parentNode.removeChild(div);
  }
  div = document.createElement('div');
  document.body.appendChild(div);
  return div;
}

if (runningInBrowser) {
  localStorage['debug'] = '*';
  addRefreshButton();
}

export default function(app) {
  var browser;

  if (runningInBrowser) {
    browser = createBrowser(document.body);
    hyperdom.append(createTestDiv(), app);
  } else {
    var vdom = hyperdom.html('body');

    browser = createBrowser(vdom);
    browser.set({$: vquery, visibleOnly: false, document: {}});

    hyperdom.appendVDom(vdom, app, { requestRender: setTimeout });
  }
  return browser;
}
