module.exports = function(context) {
  var fs = context.requireCordovaModule('fs');
  var path = context.requireCordovaModule('path');
  var cordova_util = context.requireCordovaModule('cordova-lib/src/cordova/util.js');
  var ConfigParser = context.requireCordovaModule('cordova-common').ConfigParser;

  var projectRoot = context.opts.projectRoot;

  var configXml = cordova_util.projectConfig(projectRoot);
  var config = new ConfigParser(configXml);
  var projectName = config.name();

  var wwwPath = path.join(context.opts.projectRoot, 'platforms/ios/www');
  var indexHTMLPath = path.join(wwwPath, projectName,
      'index.html');

  console.log(context.opts.plugin.id + ' updating META tag for file ' + indexHTMLPath);
  var oldMetaPattern = '<meta http-equiv="Content-Security-Policy" [^\n]*$';

  var data = fs.readFileSync(indexHTMLPath, {'encoding': 'utf8'});

  var oldMetaRegexp = new RegExp(oldMetaPattern);
  var newmeta = `<meta http-equiv="Content-Security-Policy" content="default-src * data: blob: 'unsafe-inline' 'unsafe-eval' ws: wss:;">`;

  if (!oldMetaRegexp.test(data)) {
    var newdata = data.replace(oldMetaRegexp, newmeta);
    fs.writeFileSync(indexHTMLPath, newdata);
  } else {
    // no meta tag found. So we'll add one.
    // first find the head.
    var headpattern = '<head>';
    var headregexp = new RegExp(headpattern, 'i');
    if (headregexp.text(data)) {
        // replace <head> with <head>\n<meta....>
        var newdata = data.replace(headregexp, `${headpattern}\n${newmeta}`);
        fs.writeFileSync(indexHTMLPath, newdata);
    }
  }
}