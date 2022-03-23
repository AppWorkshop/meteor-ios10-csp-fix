module.exports = function(context) {
  const path = require('path');
  const propertiesReader = require('properties-reader');
  const PropertiesParser = require('properties-parser');

  console.log('cordova-plugin-comment-googleservices: Running')

  const propertiesFilePath = path.join(context.opts.projectRoot, `platforms/android/project.properties`);

  const properties = propertiesReader(propertiesFilePath);
  let googleServicesPropKey;
  properties.each((key, value) => {
    // called for each item in the reader,
    // first with key=main.some.thing, value=foo
    // next with key=blah.some.thing, value=bar
    console.log('checking prop', key, value);
    if (/cordova-support-google-services/.test(value)) {
      // remove this prop val from the object
      console.log(`Removing properties key in ${propertiesFilePath}: ${key}=${value}`);
      googleServicesPropKey = key;
    }
  });

  if (googleServicesPropKey) {
    const propsEditor = PropertiesParser.createEditor(propertiesFilePath);
    propsEditor.unset(googleServicesPropKey);
    propsEditor.save(propertiesFilePath, function(){
      console.log(`${propertiesFilePath} modified.`);
    })
  }
  console.log('cordova-plugin-comment-googleservices: Done')
}