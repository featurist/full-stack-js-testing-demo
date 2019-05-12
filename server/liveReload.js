const WebSocket = require('ws')
const chokidar = require('chokidar')
const {join} = require('path')

module.exports = class LiveReload {
  constructor ({server}) {
    this.server = server
  }

  listen () {
    if (!this.wss) {
      this.wss = new WebSocket.Server({server: this.server})
      this.wss.on('connection', function connection (ws) {
        console.info('Live reload connected to the browser')
        const watcher = chokidar.watch(join(process.cwd(), 'browser', 'dist'))
        watcher.on('change', () => {
          console.info('Reloading browser')
          try {
            ws.send('reload')
          } catch (e) {
            console.warn(e)
            watcher.close()
          }
        })
      })
    }
  }
}
