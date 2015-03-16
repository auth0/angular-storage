angular.module('angular-storage.sessionStorage', ['angular-storage.cookieStorage'])
  .service('sessionStorage', function ($window, $injector) {
    if ($window.sessionStorage) {
      this.set = function (what, value) {
        return $window.sessionStorage.setItem(what, value);
      };

      this.get = function (what) {
        return $window.sessionStorage.getItem(what);
      };

      this.remove = function (what) {
        return $window.sessionStorage.removeItem(what);
      };
    } else {
      var cookieStorage = $injector.get('cookieStorage');

      this.set = cookieStorage.set;
      this.get = cookieStorage.get;
      this.remove = cookieStorage.remove;
    }
  });
