const fs = require('fs')

let manifest
module.exports = function loadManifest () {
  manifest = manifest || JSON.parse(
    fs.readFileSync(`${process.cwd()}/browser/dist/manifest.json`)
  )
  return manifest
}
