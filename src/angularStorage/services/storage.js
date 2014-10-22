angular.module('angular-storage.storage', [])
  .service('storage', function($window, $injector) {
    var storeDisabled = false;
    var testKey = '__storejs__';
    
    // Need to do try/catch because Safari in private
    // browsing mode throws an exception when trying to
    // call setItem
    try {
      $window.localStorage.setItem(testKey, testKey);

      if ($window.localStorage.getItem(testKey) !== testKey) {
        storeDisabled = true;
      }

      $window.localStorage.removeItem(testKey);
    } catch(e) {
      storeDisabled = true;
    }
    
    if (!storeDisabled) {
      this.set = function(what, value) {
        return $window.localStorage.setItem(what, value);
      };
      this.get = function(what) {
        return $window.localStorage.getItem(what);
      };
      this.remove = function(what) {
        return $window.localStorage.removeItem(what);
      };
    } else {
      var $cookieStore = $injector.get('$cookieStore');
      this.set = function(what, value) {
        return $cookieStore.put(what, value);
      };
      this.get = function(what) {
        return $cookieStore.get(what);
      };
      this.remove = function(what) {
        return $cookieStore.remove(what);
      };
    }
  });

