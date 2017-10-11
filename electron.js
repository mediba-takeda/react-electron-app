const electron = require('electron')
const { app, BrowserWindow, ipcMain } = electron

const path = require('path')
const url = require('url')

const chromePath = require('./chromePaths').Chrome
const { executor } = require('chroco')
const baseCommands = {
  options: {
    headless: false
    // executablePath: chromePath
  }
}

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/build/index.html'),
      protocol: 'file:',
      slashes: true
    })
  mainWindow.loadURL(startUrl)
  // debugging with devtools, unless BROWSER env set false
  if (!process.env.BROWSER) {
    mainWindow.webContents.openDevTools()
  }
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  ipcMain.on('CHROME/LAUNCH', (event, payload) => {
    event.sender.send('CHROME/PATH', chromePath)
    console.log(Object.assign({}, baseCommands, payload.commands))

    executor(Object.assign({}, baseCommands, payload.commands))
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
