angular.module('angular-storage.store', ['angular-storage.storage'])
  .service('store', function(storage) {

    var store = this;

    store.inMemoryCache = {};
    store.namespace = null;
    store.namespaceDelimiter = '.';

    function getNamespacedKey(name) {
      return store.namespace ? [store.namespace, name].join(store.namespaceDelimiter) : name;
    }

    store.set = function(name, elem) {
      var key = getNamespacedKey(name);
      store.inMemoryCache[key] = elem;
      storage.set(key, JSON.stringify(elem));
    };

    store.get = function(name) {
      var key = getNamespacedKey(name);
      if (key in store.inMemoryCache) {
        return store.inMemoryCache[key];
      }
      var saved = storage.get(key);
      var obj =  saved ? JSON.parse(saved) : null;
      store.inMemoryCache[key] = obj;
      return obj;
    };

    store.remove = function(name) {
      var key = getNamespacedKey(name);
      store.inMemoryCache[key] = null;
      storage.remove(key);
    };


  });

