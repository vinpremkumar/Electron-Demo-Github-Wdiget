// Modules to control application life and create native browser mainWindowdow
const { app, BrowserWindow, globalShortcut, nativeTheme} = require("electron");

// Enable live reload for all the files inside your project directory
try {
  require('electron-reloader')(module)
} catch (_) {}

//const globalShortcut = electron.globalShortcut
// Keep a global reference of the mainWindowdow object, if you don't, the mainWindowdow will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser mainWindowdow.
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

  	// Upper Limit is working of 500 %
	mainWindow.webContents
		.setVisualZoomLevelLimits(1, 5)
		.then(console.log("Zoom Levels Have been Set between 100% and 500%"))
		.catch((err) => console.log(err));
  
	mainWindow.webContents.on("zoom-changed", (event, zoomDirection) => {
		console.log(zoomDirection);
		var currentZoom = mainWindow.webContents.getZoomFactor();
		console.log("Current Zoom Factor - ", currentZoom);
		// console.log('Current Zoom Level at - '
		// , mainWindow.webContents.getZoomLevel());
		console.log("Current Zoom Level at - ", mainWindow.webContents.zoomLevel);
  
		if (zoomDirection === "in") {
        
			// mainWindow.webContents.setZoomFactor(currentZoom + 0.20);
			mainWindow.webContents.zoomFactor = currentZoom + 0.2;
	
			console.log("Zoom Factor Increased to - "
						, mainWindow.webContents.zoomFactor * 100, "%");
		}
		if (zoomDirection === "out") {
			
			// mainWindow.webContents.setZoomFactor(currentZoom - 0.20);
			if (currentZoom > 0.2) {
				mainWindow.webContents.zoomFactor = currentZoom - 0.2;
			}
			console.log("Zoom Factor Decreased to - "
						, mainWindow.webContents.zoomFactor * 100, "%");
		}
	});
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
		  mainWindow.webContents.setVisualZoomLevelLimits(0.5, 1.5)
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

  // Emitted when the mainWindowdow is closed.
  mainWindow.on("closed", function() {
    // Dereference the mainWindowdow object, usually you would store mainWindowdows
    // in an array if your app supports multi mainWindowdows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser mainWindowdows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
	//nativeTheme.themeSource = 'dark'
	createWindow();
});

// Quit when all mainWindowdows are closed.
app.on("mainWindowdow-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  app.quit();
  
});

app.on("activate", function() {
  // On macOS it's common to re-create a mainWindowdow in the app when the
  // dock icon is clicked and there are no other mainWindowdows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
