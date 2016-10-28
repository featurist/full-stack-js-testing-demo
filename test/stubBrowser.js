var isBrowser = typeof window !== 'undefined';

var pushState, replaceState;

pushState = replaceState = function(state, title, url) {
  window.location.pathname = url;
  (window.__registeredEvents['onpopstate'] || []).forEach(cb => cb({}));
};

if (!isBrowser) {
  global.window = {
    location: {
      pathname: '/',
      search: ''
    },
    __registeredEvents: {},
    history: {
      pushState,
      replaceState,
    },
    addEventListener(eventName, cb) {
      if (!this.__registeredEvents[eventName]) {
        this.__registeredEvents[eventName] = [];
      }
      this.__registeredEvents[eventName].push(cb);
    }
  };
}

export default isBrowser;
