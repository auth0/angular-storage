angular.module('angular-storage.store', ['angular-storage.storage'])
  .service('store', function(storage) {

    this.inMemoryCache = {};

    this.set = function(name, elem) {
      this.inMemoryCache[name] = elem;
      storage.set(name, JSON.stringify(elem));
    };

    this.get = function(name) {
      if (this.inMemoryCache[name]) {
        return this.inMemoryCache[name];
      }
      var saved = storage.get(name);
      return saved ? JSON.parse(saved) : null;
    };

    this.remove = function(name) {
      this.inMemoryCache[name] = null;
      storage.remove(name);
    }


  });

