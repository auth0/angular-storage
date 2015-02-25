angular.module('angular-storage.store', ['angular-storage.internalStore'])
  .provider('store', function() {

    // the default storage
    var _storage = 'localStorage';

    /**
     * Sets the storage.
     *
     * @param {String} storage The storage name
     */
    this.setStore = function(storage) {
      if (storage && angular.isString(storage)) {
        _storage = storage;
      }
    };

    this.$get = function(InternalStore) {
      var store = new InternalStore(null, _storage);

      /**
       * Returns a namespaced store
       *
       * @param {String} namespace The namespace
       * @param {String} storage The name of the storage service
       * @param {String} key The key
       * @returns {InternalStore}
       */
      store.getNamespacedStore = function(namespace, storage, key) {
        return new InternalStore(namespace, storage, key);
      };

      return store;
    };
  });

