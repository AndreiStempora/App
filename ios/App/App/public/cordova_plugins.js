
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-screen-orientation.screenorientation",
          "file": "plugins/cordova-plugin-screen-orientation/www/screenorientation.js",
          "pluginId": "cordova-plugin-screen-orientation",
        "clobbers": [
          "cordova.plugins.screenorientation"
        ]
        },
      {
          "id": "cordova-sqlite-storage.SQLitePlugin",
          "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
          "pluginId": "cordova-sqlite-storage",
        "clobbers": [
          "SQLitePlugin"
        ]
        },
      {
          "id": "es6-promise-plugin.Promise",
          "file": "plugins/es6-promise-plugin/www/promise.js",
          "pluginId": "es6-promise-plugin",
        "runs": true
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-screen-orientation": "3.0.2",
      "cordova-sqlite-storage": "6.0.0",
      "es6-promise-plugin": "4.2.2"
    };
    // BOTTOM OF METADATA
    });
    