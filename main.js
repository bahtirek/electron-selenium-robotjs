// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const robot = require("robotjs");
const console = require('console');
const path = require('path')
let driver;
let interval;
let body = 0;

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  // Fixes robotjs error
//app.allowRendererProcessReuse = false
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Sending logs to renderer
app.console = new console.Console(process.stdout, process.stderr);

//channel to cannect with renderer.js
ipcMain.on('tab', (ev, url) => {
  console.log(ev);
  console.log(url);
  example();
});

const tabbing = async () => {
  let activeElement = await driver.switchTo().activeElement();
  let tagName = await activeElement.getTagName();
  console.log(body);
  if(body == 2) {
    clearInterval(interval);
    interval = null;
    console.log('completed');
  } else {
    robot.keyTap("tab")
    if(tagName == "body") body++
  }
}

async function example() {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get('https://www.fpl.com');
  } finally {
    //await driver.quit();
    console.log('finally');
    interval = setInterval(tabbing, 1000);
  }
};
