(function() {


// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

angular.module('angular-storage',
    [
      'angular-storage.store'
    ]);

angular.module('angular-storage.cookieStorage', [])
  .service('cookieStorage', ["$injector", function ($injector) {
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
  }]);

angular.module('angular-storage.internalStore', ['angular-storage.localStorage', 'angular-storage.sessionStorage'])
  .factory('InternalStore', ["$log", "$injector", function($log, $injector) {

    function InternalStore(namespace, delimiter) {
      this.namespace = namespace || null;
      this.delimiter = delimiter || '.';
      this.inMemoryCache = {};
      this.storage = $injector.get('localStorage');
    }

    InternalStore.prototype.getNamespacedKey = function(key) {
      if (!this.namespace) {
        return key;
      } else {
        return [this.namespace, key].join(this.delimiter);
      }
    };

    InternalStore.prototype.set = function(name, elem) {
      this.inMemoryCache[name] = elem;
      this.storage.set(this.getNamespacedKey(name), JSON.stringify(elem));
    };

    InternalStore.prototype.get = function(name) {
      var obj = null;
      if (name in this.inMemoryCache) {
        return this.inMemoryCache[name];
      }
      var saved = this.storage.get(this.getNamespacedKey(name));
      try {

        if (typeof saved === 'undefined' || saved === 'undefined') {
          obj = undefined;
        } else {
          obj = JSON.parse(saved);
        }

        this.inMemoryCache[name] = obj;
      } catch(e) {
        $log.error('Error parsing saved value', e);
        this.remove(name);
      }
      return obj;
    };

    InternalStore.prototype.remove = function(name) {
      this.inMemoryCache[name] = null;
      this.storage.remove(this.getNamespacedKey(name));
    };

    InternalStore.prototype.setStorage = function(storage) {
      if (!storage || !angular.isString(storage)) {
        return;
      }

      this.storage = $injector.get(storage);
    };

    return InternalStore;
  }]);


angular.module('angular-storage.localStorage', ['angular-storage.cookieStorage'])
  .service('localStorage', ["$window", "$injector", function ($window, $injector) {
    if ($window.localStorage) {
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
  }]);

angular.module('angular-storage.sessionStorage', ['angular-storage.cookieStorage'])
  .service('sessionStorage', ["$window", "$injector", function ($window, $injector) {
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
  }]);

angular.module('angular-storage.storage', [])
  .service('storage', ["$window", "$injector", function($window, $injector) {
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
  }]);


angular.module('angular-storage.store', ['angular-storage.internalStore'])
  .factory('store', ["InternalStore", function(InternalStore) {

    var store = new InternalStore();

    /**
     * Returns a namespaced store
     *
     * @param {String} namespace The namespace
     * @param {String} key The key
     * @returns {InternalStore}
     */
    store.getNamespacedStore = function(namespace, key) {
      return new InternalStore(namespace, key);
    };

    return store;
  }]);


}());