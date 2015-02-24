angular.module('angular-storage.cookieStorage', [])
  .service('cookieStorage', function ($injector) {
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
  });
