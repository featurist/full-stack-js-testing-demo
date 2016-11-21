class fakeApi {
  constructor() {
    this.responses = {};
  }

  respond({to, withData}) {
    this.responses[to] = withData;
  }

  request(endpoint) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.responses[endpoint]);
      }, 50);
    });
  }

  // Actual API to stub
  loadTODOs() {
    return this.request('loadTODOs');
  }
}

export default function() {
  return new fakeApi();
}
