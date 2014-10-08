'use strict';

describe('angularStorage store', function() {

  beforeEach(function() {
    module('angular-storage.store');
  });

  it('should save items correctly in localStorage', inject(function(store) {
    var value = 1;
    store.set('gonto', value);
    expect(store.get('gonto')).to.equal(value);
  }));

  it('should delete items correctly from localStorage', inject(function(store) {
    var value = 1;
    store.set('gonto', value);
    expect(store.get('gonto')).to.equal(value);
    store.remove('gonto');
    expect(store.get('gonto')).to.not.exist;
  }));

  it('should save objects correctly', inject(function(store) {
    var value = {
      gonto: 'hola'
    };
    store.set('gonto', value);
    expect(store.get('gonto')).to.eql(value);
  }));

  it('should save objects correctly', inject(function(store) {
    var value = {
      gonto: 'hola'
    };
    store.set('gonto', value);
    expect(store.get('gonto')).to.eql(value);
  }));

  it('should save and objects correctly without cache', inject(function(store) {
    var value = {
      gonto: 'hola'
    };
    store.set('gonto', value);
    store.inMemoryCache = {};
    expect(store.get('gonto')).to.eql(value);
    expect(store.get('gonto')).not.to.equal(value);
  }));

  it('should save and objects correctly without cache', inject(function(store) {
    var value = {
      gonto: 'hola'
    };
    store.set('gonto', value);
    store.inMemoryCache = {};
    expect(store.get('gonto')).to.eql(value);
    expect(store.get('gonto')).not.to.equal(value);
  }));

});

describe('angularStorage new namespaced store', function() {

  beforeEach(function() {
    module('angular-storage.store');
  });

  var newStore = null;

  beforeEach(inject(function(store) {
    newStore = store.getNamespacedStore('auth0');
  }));

  it('should save items correctly', inject(function($window) {
    var value = 1;
    newStore.set('myCoolValue', value);
    expect(newStore.get('myCoolValue')).to.equal(value);
    expect($window.localStorage.getItem('auth0.myCoolValue')).to.exist;
    expect($window.localStorage.getItem('myCoolValue')).to.not.exist;
  }));

  it('should delete items correctly from localStorage', function() {
    var value = 1;
    newStore.set('gonto', value);
    expect(newStore.get('gonto')).to.equal(value);
    newStore.remove('gonto');
    expect(newStore.get('gonto')).to.not.exist;
  });

  it('should save objects correctly', function() {
    var value = {
      gonto: 'hola'
    };
    newStore.set('gonto', value);
    expect(newStore.get('gonto')).to.eql(value);
  });

  it('should save objects correctly', function() {
    var value = {
      gonto: 'hola'
    };
    newStore.set('gonto', value);
    expect(newStore.get('gonto')).to.eql(value);
  });

  it('should save and objects correctly without cache', function() {
    var value = {
      gonto: 'hola'
    };
    newStore.set('gonto', value);
    newStore.inMemoryCache = {};
    expect(newStore.get('gonto')).to.eql(value);
    expect(newStore.get('gonto')).not.to.equal(value);
  });

  it('should save and objects correctly without cache', function() {
    var value = {
      gonto: 'hola'
    };
    newStore.set('gonto', value);
    newStore.inMemoryCache = {};
    expect(newStore.get('gonto')).to.eql(value);
    expect(newStore.get('gonto')).not.to.equal(value);
  });

});

