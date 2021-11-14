# Github Widget using Electron
This project is based off of https://github.com/electron/electron-quick-start

I have modded the script to make the window look more like a widget. 
It displays my github repository currently, but you can easily edit the mainWindow.loadURL('') command line to show any webpage you wish.

# How to compile an .exe
1) Install NodeJS from https://nodejs.org/en/download/
2) Install Electron using the command
```
npm install -g electron
```
3) Install electron-packager using ```npm install -g electron-packager``` (check link: https://www.christianengvall.se/electron-packager-tutorial/)
4) After installing electron-packager, use the below command for compiling an executable
```
electron-packager dir appName --overwrite --asar --platform=win32 --arch=x64 --prune=true --out=release-builds --icon=./build/icon.ico
```
_ref: https://stackoverflow.com/a/69226864/12529099_

_PS: The executable attached to this github repository was made for windows 10_

# Output:

![ezgif-1-d4fae4c12be1](https://user-images.githubusercontent.com/49431830/141337328-d6fa80fb-6c1e-4dba-9a20-ce37e3fd4be4.gif)

# Auto startup
To automatically start the widget during start-up, open Run using Win+R and type in shell:startup
![image](https://user-images.githubusercontent.com/49431830/141337477-769c4b87-2887-41e4-a955-401d7ae44daf.png)

You will get a window like this:
![image](https://user-images.githubusercontent.com/49431830/141337724-f01f7095-421b-4ef0-9582-83dfac7a3668.png)

Now make a shortcut of the .exe file and put it in the Startup folder

![image](https://user-images.githubusercontent.com/49431830/141337687-2fa03b76-cf6d-4113-a248-2e6eae202dde.png)

Thats it! It will load everytime you start your PC up.
