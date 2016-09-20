# Meteor 1.4.1 Cordova iOS 10 Content Security Policy Web Sockets Fix

That's a mouthful of a title. But it's a really simple little cordova plugin that 
just rewrites the ```META``` tag in your cordova build's ```platforms/ios/www/index.html```
file.

This fixes an issue with meteor 1.4 (and probably other cordova apps) where iOS 10's content security 
policy prevents connections via web sockets.

The new content security policy META element will be:

```
    <meta http-equiv="Content-Security-Policy" content="default-src * data: blob: 'unsafe-inline' 'unsafe-eval' ws: wss:;">
```