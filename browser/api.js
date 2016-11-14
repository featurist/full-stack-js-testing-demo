import httpism from 'httpism/browser';

export default {
  loadTODOs() {
    return httpism.get('/api/todos').then(res => res.body);
  }
}
