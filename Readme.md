# Meteor Cordova Android Fix for Duplicate Google Services

That's a mouthful of a title. But it's a really simple little cordova plugin that 
just removes the ```cordova.gradle.include.X=cordova-support-google-services/XXXXXX-build.gradle``` property from your cordova build's ```platforms/android/project.properties```
file.

This fixes an issue with meteor android builds which give the error:

```
Cannot add extension with name 'googleServices', as there is an extension already registered with that name.
```
Specifically targeted at [an issue I experienced][1] in Meteor 2.6.1 but may apply to other cordova builds also.

[1]:http://https://forums.meteor.com/t/mobile-app-generation-cordova-issues-with-2-5-1-solved/57199/2
