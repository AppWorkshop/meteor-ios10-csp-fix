# Meteor Cordova Android Fix for Duplicate Google Services

That's a mouthful of a title. But it's a really simple little cordova plugin that 
just comments out the ```apply plugin: com.google.gms.googleservices.GoogleServicesPlugin``` tag in your cordova build's ```platforms/android/cordova-support-google-services/XXXXXX-build.gradle```
file.

This fixes an issue with meteor android builds which give the error:

```
Cannot add extension with name 'googleServices', as there is an extension already registered with that name.
```

