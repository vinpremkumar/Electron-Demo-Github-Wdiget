// Modules to control application life and create native browser window
const { app, BrowserWindow, globalShortcut, nativeTheme} = require("electron");

// Enable live reload for all the files inside your project directory
try {
  require('electron-reloader')(module)
} catch (_) {}

//const globalShortcut = electron.globalShortcut
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 420,
    height: 500,
    maxWidth: 600,
    maxHeight: 1000,
    fullscreenable: false,
    darkTheme: true,
    show: false,
    //titleBarStyle: 'customButtonsOnHover',
    //titleBarStyle: 'hidden',
    movable: true,
    backgroundColor: '#000',
    
    //titleBarOverlay: true,
    //webPreferences: {
      //preload: `${__dirname}/renderer.js`
    //  zoomFactor: 0.7
    //}
  });
  
  globalShortcut.register('f5', function() {
    //console.log('f5 is pressed')
    mainWindow.reload()
  })
  globalShortcut.register('CommandOrControl+R', function() {
    //console.log('CommandOrControl+R is pressed')
    mainWindow.reload()
  })

  // and load the index.html of the app.
  mainWindow.removeMenu();
  mainWindow.setIcon('./github.ico');
  mainWindow.loadURL("https://github.com/vinpremkumar?tab=repositories");
  
  mainWindow.webContents.on('did-finish-load', function() {
      mainWindow.webContents.insertCSS('.titlebar{-webkit-user-select: none;-webkitapp-region: drag;}')
      //mainWindow.webContents.insertCSS('button {-webkit-app-region: no-drag;}')
      //mainWindow.webContents.insertCSS('body {-webkit-app-region: drag;}')
      mainWindow.webContents.insertCSS('::-webkit-scrollbar {display: none;}') /* Hide scrollbars */
  });

  mainWindow.once('ready-to-show', () => {
      mainWindow.webContents.on('did-finish-load', function() {
		  mainWindow.webContents.setZoomFactor(0.7)
          mainWindow.show();
      });
  })
  
  function reloadScrollBars() {
      document.documentElement.style.overflow = 'auto';  // firefox, chrome
      document.body.scroll = "yes"; // ie only
  }

  function unloadScrollBars() {
      document.documentElement.style.overflow = 'hidden';  // firefox, chrome
      document.body.scroll = "no"; // ie only
  }
  
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
	//nativeTheme.themeSource = 'dark'
	createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  app.quit();
  
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
