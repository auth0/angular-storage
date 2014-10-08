angular.module('angular-storage.store', ['angular-storage.storage'])
  .service('store', function(storage) {

    var store = this;

    store.inMemoryCache = {};
    store.namespace = null;
    store.namespaceDelimiter = '.';

    function getNamespacedKey(name, namespace) {
      var key;

      if (namespace === null) {
        key = name;
      }
      else {
        if (namespace) {
          key = [namespace, name].join(store.namespaceDelimiter);
        }
        else {
          key = store.namespace ? [store.namespace, name].join(store.namespaceDelimiter) : name
        }
      }

      return key;
    }

    store.set = function(name, elem, namespace) {
      var key = getNamespacedKey(name, namespace);
      store.inMemoryCache[key] = elem;
      storage.set(key, JSON.stringify(elem));
    };

    store.get = function(name, namespace) {
      var key = getNamespacedKey(name, namespace);
      if (key in store.inMemoryCache) {
        return store.inMemoryCache[key];
      }
      var saved = storage.get(key);
      var obj =  saved ? JSON.parse(saved) : null;
      store.inMemoryCache[key] = obj;
      return obj;
    };

    store.remove = function(name, namespace) {
      var key = getNamespacedKey(name, namespace);
      store.inMemoryCache[key] = null;
      storage.remove(key);
    };


  });

