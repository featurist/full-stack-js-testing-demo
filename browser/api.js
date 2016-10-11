export default {
  loadTODOs() {
    return window.fetch('/api/todos').then(res => res.json());
  }
}
