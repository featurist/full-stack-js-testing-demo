export default {
  loadTODOs() {
    return new Promise(function(resolve) {
      setTimeout(() => {
        resolve([{title: 'one'}, {title: 'two'}]);
      }, 50);
    });
  }
}
