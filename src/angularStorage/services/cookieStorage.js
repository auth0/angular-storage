angular.module('angular-storage.cookieStorage', [])
  .service('cookieStorage', ['$cookies', function ($cookies) {

    this.set = function (what, value) {
      return $cookies.put(what, value);
    };

    this.get = function (what) {
      return $cookies.get(what);
    };

    this.remove = function (what) {
      return $cookies.remove(what);
    };

    this.clear = function () {
      var cookies = $cookies.getAll();
      angular.forEach(cookies, function (v, k) {
        $cookies.remove(k);
      });
    };
  }]);
