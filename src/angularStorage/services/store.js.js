angular.module('angular-storage.store', ['angular-storage.internalStore'])
  .factory('store', function(InternalStore) {

    var store = new InternalStore();
    store.getNamespacedStore = function(namespace, key) {
      return new InternalStore(namespace, key);
    }

    return store;


  });

