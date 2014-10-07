angular.module('angular-storage.store', ['angular-storage.storage'])
  .service('store', function(storage) {

    this.inMemoryCache = {};

    this.set = function(name, elem) {
      this.inMemoryCache[name] = elem;
      storage.set(name, JSON.stringify(elem));
    };

    this.get = function(name) {
      if (name in this.inMemoryCache) {
        return this.inMemoryCache[name];
      }
      var saved = storage.get(name);
      var obj =  saved ? JSON.parse(saved) : null;
      this.inMemoryCache[name] = obj;
      return obj;
    };

    this.remove = function(name) {
      this.inMemoryCache[name] = null;
      storage.remove(name);
    }


  });

