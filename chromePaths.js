const karmaChromeLauncher = require('karma-chrome-launcher')

const chromePaths = {}

Object.keys(karmaChromeLauncher).forEach((key) => {
  let info
  if (key.indexOf('launcher:') !== 0) return
  info = (
    karmaChromeLauncher[key] &&
    karmaChromeLauncher[key][1] &&
    karmaChromeLauncher[key][1].prototype
  )
  if (!info) return
  chromePaths[info.name] = info.DEFAULT_CMD[process.platform] || null
})

module.exports = chromePaths
