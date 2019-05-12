let ws
setInterval(() => {
  if (!ws) {
    ws = new window.WebSocket(`ws://${window.location.host}`)
    ws.onmessage = function ({data}) {
      if (data === 'reload') {
        window.location.reload()
      }
    }
    ws.onclose = function () {
      ws = undefined
    }
  }
}, 500)
