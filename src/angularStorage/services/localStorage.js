angular.module('angular-storage.localStorage', ['angular-storage.cookieStorage'])
  .service('localStorage', function ($window, $injector) {
       var localStorageType = null;

      if (!localStorageType) {
        try {
          $window.localStorage.setItem('testKey', 'test');
          $window.localStorage.removeItem('testKey');
          localStorageType = 1;
        } catch (e) {
          localStorageType = 2;
        }
      }

    if (localStorageType===1) {
      this.set = function (what, value) {
        return $window.localStorage.setItem(what, value);
      };

      this.get = function (what) {
        return $window.localStorage.getItem(what);
      };

      this.remove = function (what) {
        return $window.localStorage.removeItem(what);
      };
    } else {
      var cookieStorage = $injector.get('cookieStorage');

      this.set = cookieStorage.set;
      this.get = cookieStorage.get;
      this.remove = cookieStorage.remove;
    }
  });
