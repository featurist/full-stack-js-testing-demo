import plastiq from 'plastiq';

function addRefreshButton() {
  var refreshLink = document.createElement('a');
  refreshLink.href = window.location.href;
  refreshLink.innerText = 'refresh';
  document.body.appendChild(refreshLink);
  document.body.appendChild(document.createElement('hr'));
}

var isDebugging = /\/debug\.html$/.test(window.location.pathname);

if (isDebugging) {
  addRefreshButton();
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

export default function(app, url) {
  window.history.pushState(null, null, url);

  plastiq.append(createTestDiv(), app);
}
