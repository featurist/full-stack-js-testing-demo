const hyperdom = require('hyperdom')
const runningInBrowser = require('./stubBrowser')
const createBrowser = require('browser-monkey/create')
const vquery = require('vdom-query')

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

module.exports = function(app) {
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
  browser.set({ timeout: process.env.BM_TIMEOUT || 1000 })
  return browser;
}
