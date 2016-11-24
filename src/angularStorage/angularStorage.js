/**
 * Add a module for use with commonjs(WebPack)
 * Add to your webpack.config.js with:
 * 
 module.exports = {
  resolve: {
    alias: {
      "auth0": 'auth0-angular/build/auth0-angular'
    }
  }
 }
 */ 
// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

angular.module('angular-storage',
    [
      'angular-storage.store'
    ]);
