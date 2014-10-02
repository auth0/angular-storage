angular.module('angular-storage.storage', [])
  .service('storage', function($window) {
    if ($window.localStorage) {
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

