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

  it('should save objects correctly when a namespace is set', inject(function(store) {
    var value = {
      gonto: 'hola'
    };
    store.namespace = 'auth0';
    store.set('gonto', value);
    store.inMemoryCache = {};
    expect(store.get('gonto')).to.eql(value);
    expect(store.get('gonto')).not.to.equal(value);
  }));

  it('should save objects correctly when a namespace and namespace delimiter are set', inject(function(store) {
    var value = {
      gonto: 'hola'
    };
    store.namespace = 'auth0';
    store.namespaceDelimiter = '-';
    store.set('gonto', value);
    store.inMemoryCache = {};
    expect(store.get('gonto')).to.eql(value);
    expect(store.get('gonto')).not.to.equal(value);
  }));

  it('should get objects correctly if a custom namespace is given', inject(function (store) {
    var value = {
      gonto: 'hola'
    };
    store.namespace = 'auth0';
    store.set('gonto', value, 'customNamespace');
    store.inMemoryCache = {};
    expect(store.get('gonto', 'customNamespace')).to.eql(value);
    expect(store.get('gonto', 'customNamespace')).not.to.equal(value);
  }));

  it('should get objects correctly if forced to not use a namespace', inject(function (store) {
    var value = {
      gonto: 'hola'
    };
    store.namespace = 'auth0';
    store.set('noNamespace', value, null);
    store.inMemoryCache = {};
    expect(store.get('noNamespace', null)).to.eql(value);
    expect(store.get('noNamespace', null)).not.to.equal(value);
  }));

});
