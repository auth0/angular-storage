angular.module('angular-storage.cookieStorage', [])
  .service('cookieStorage', function ($injector) {
    if ($injector.has('$cookieStore')) {
      var $cookieStore = $injector.get('$cookieStore');

      this.set = function (what, value) {
        return $cookieStore.put(what, value);
      };

      this.get = function (what) {
        return $cookieStore.get(what);
      };

      this.remove = function (what) {
        return $cookieStore.remove(what);
      };
    } else {
      this.set = function() {};
      this.get = function() {};
      this.remove = function() {};
    }
  });
