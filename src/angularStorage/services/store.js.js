angular.module('angular-storage.store', ['angular-storage.internalStore'])
  .factory('store', function(InternalStore) {

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
  });

