# mdual-tasklist-cordova
The typical to-do app that interacts with the browser's LocalStorage. Playing a bit with Cordova, jQuery/UI, and MaterializeCSS. 

## Setup

```
git clone https://github.com/rubenmantecon/mdual-tasklist-cordova.git
cd mdual-tasklist-cordova/www/
cordova platform add browser
```
If you get an npm error, it s most likely the `package.lock`. Delete it and try again.
```
cordova run browser
```

You could also emulate this an Android app, via 
```
cordova platform add android
cordova build android
cordova run android
```
Note that this requires setting up an Android SDK.

