import plastiq from 'plastiq';

var div;

function createTestDiv() {
  if (div) {
    div.parentNode.removeChild(div);
  }

  div = document.createElement('div');

  document.body.appendChild(div);

  return div;
}

export default function(app) {
  plastiq.append(createTestDiv(), app);
}
