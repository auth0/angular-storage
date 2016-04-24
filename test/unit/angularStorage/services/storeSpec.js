'use strict';

describe('angularStorage store', function() {

  beforeEach(function() {
    module('angular-storage.store');
  });

  it('should save items correctly in localStorage', inject(function($angularStorage) {
    var value = 1;
    $angularStorage.set('gonto', value);
    expect($angularStorage.get('gonto')).to.equal(value);
  }));

  it('should save null items correctly in localStorage', inject(function($angularStorage) {
    $angularStorage.set('gonto', null);
    $angularStorage.inMemoryCache = {};
    expect($angularStorage.get('gonto')).to.equal(null);
  }));

  it('should save undefined items correctly in localStorage', inject(function($angularStorage) {
    $angularStorage.set('gonto', undefined);
    $angularStorage.inMemoryCache = {};
    expect($angularStorage.get('gonto')).to.equal(undefined);
  }));

  it('should delete items correctly from localStorage', inject(function($angularStorage) {
    var value = 1;
    $angularStorage.set('gonto', value);
    expect($angularStorage.get('gonto')).to.equal(value);
    $angularStorage.remove('gonto');
    expect($angularStorage.get('gonto')).to.not.exist;
  }));

  it('should save objects correctly', inject(function($angularStorage) {
    var value = {
      gonto: 'hola'
    };
    $angularStorage.set('gonto', value);
    expect($angularStorage.get('gonto')).to.eql(value);
  }));

  it('should save objects correctly', inject(function($angularStorage) {
    var value = {
      gonto: 'hola'
    };
    $angularStorage.set('gonto', value);
    expect($angularStorage.get('gonto')).to.eql(value);
  }));

  it('should save and objects correctly without cache', inject(function($angularStorage) {
    var value = {
      gonto: 'hola'
    };
    $angularStorage.set('gonto', value);
    $angularStorage.inMemoryCache = {};
    expect($angularStorage.get('gonto')).to.eql(value);
    expect($angularStorage.get('gonto')).not.to.equal(value);
  }));

  it('should save and objects correctly without cache', inject(function($angularStorage) {
    var value = {
      gonto: 'hola'
    };
    $angularStorage.set('gonto', value);
    $angularStorage.inMemoryCache = {};
    expect($angularStorage.get('gonto')).to.eql(value);
    expect($angularStorage.get('gonto')).not.to.equal(value);
  }));
});

describe('angularStorage $angularStorageProvider.setCaching(false)', function () {
  var provider;

  beforeEach(function() {
    module('angular-storage.store', function($angularStorageProvider) {
      provider = $angularStorageProvider;
      provider.setCaching(false);
    });
  });

  it('should not store into internal cache', inject(function($angularStorage) {
    var value1 = 'some value';
    var value2 = 256;
    $angularStorage.set('key1', value1);
    $angularStorage.set('key2', value2);
    $angularStorage.remove('key1');

    expect($angularStorage.inMemoryCache).to.be.empty;
    expect($angularStorage.get('key2')).to.equal(value2);
  }));

  it('should store into internal cache in namespaced store when default caching', inject(function($angularStorage) {
    var namespacedStore = $angularStorage.getNamespacedStore('bb');
    var value1 = 'some value';
    var value2 = 256;

    namespacedStore.set('key1', value1);
    namespacedStore.set('key2', value2);

    expect(namespacedStore.inMemoryCache).not.to.be.empty;
    expect(namespacedStore.inMemoryCache).to.have.property('key1');
    expect(namespacedStore.inMemoryCache).to.have.property('key2');
  }));

  it('should not store into internal cache in namespaced store when caching=false', inject(function($angularStorage) {
    var namespacedStore = $angularStorage.getNamespacedStore('bb', 'localStorage', null, false);
    var value1 = 'some value';
    var value2 = 256;

    namespacedStore.set('key1', value1);
    namespacedStore.set('key2', value2);

    expect(namespacedStore.inMemoryCache).to.be.empty;
    expect(namespacedStore.get('key1')).to.equal(value1);
    expect(namespacedStore.get('key2')).to.equal(value2);
  }));
});

describe('angularStorage $angularStorageProvider.setStore("sessionStorage")', function () {

  var provider;

  beforeEach(function() {
    module('angular-storage.store', function($angularStorageProvider) {
      provider = $angularStorageProvider;
      provider.setStore('sessionStorage');
    });
  });

  it('should save items correctly in the sessionStorage', inject(function($angularStorage, $window) {
    var value = 99;
    $angularStorage.set('gonto123', value);
    $angularStorage.inMemoryCache = {};

    expect($angularStorage.get('gonto123')).to.equal(value);
    expect($window.sessionStorage.getItem('gonto123')).to.exist;
    expect($window.sessionStorage.getItem('gonto123')).to.equal(value.toString());

    $angularStorage.remove('gonto123');

    expect($angularStorage.get('gonto123')).to.not.exist;
    expect($window.sessionStorage.getItem('gonto123')).to.not.exist;
  }));
});

describe('angularStorage $angularStorageProvider.setStore("sessionStorage")', function () {

  var provider, windowMock, $cookies;
  var mockCookieStore = {};

  beforeEach(function() {
    module('ngCookies', 'angular-storage.store', function($angularStorageProvider, $provide) {

      // decorator to mock the methods of the cookieStore
      $provide.decorator('$cookies', function ($delegate) {
        $delegate.put = function (key, value) {
          mockCookieStore[key] = value;
        };
        $delegate.get = function (key) {
          return mockCookieStore[key];
        };
        return $delegate;
      });

      provider = $angularStorageProvider;
      provider.setStore('sessionStorage');

      windowMock = { sessionStorage: undefined };
      $provide.value('$window', windowMock);
    });
  });

  beforeEach(inject(function( _$cookies_) {
    $cookies = _$cookies_;
  }));

  it('should fallback to cookieStorage', inject(function($angularStorage) {
    var value = 99;
    $angularStorage.set('gonto123', value);

    expect($angularStorage.get('gonto123')).to.equal(value);
    expect($cookies.get('gonto123')).to.equal(JSON.stringify(value));
  }));
});

describe('angularStorage $angularStorageProvider.setStore("localStorage")', function () {

  var provider;

  beforeEach(function() {
    module('angular-storage.store', function($angularStorageProvider) {
      provider = $angularStorageProvider;
      provider.setStore('localStorage');
    });
  });

  it('should save items correctly in the localStorage', inject(function($angularStorage, $window) {
    var value = 55;
    $angularStorage.set('gonto', value);

    expect($angularStorage.get('gonto')).to.equal(value);
    expect($window.localStorage.getItem('gonto')).to.exist;
    expect($window.localStorage.getItem('gonto')).to.equal(value.toString());
  }));
});

describe('angularStorage $angularStorageProvider.setStore("cookieStorage")', function () {

  var provider;
  var $cookies;

  beforeEach(function() {
    module('ngCookies', 'angular-storage.store', function($angularStorageProvider) {
      provider = $angularStorageProvider;
      provider.setStore('cookieStorage');
    });
  });

  beforeEach(inject(function( _$cookies_) {
    $cookies = _$cookies_;
  }));

  it('should save items correctly in the cookieStorage', inject(function($angularStorage) {
    var value = 66;
    $angularStorage.set('gonto', value);

    expect($angularStorage.get('gonto')).to.equal(value);
    expect($cookies.get('gonto')).to.equal(JSON.stringify(value));
  }));
});

describe('angularStorage $angularStorageProvider.setStore()', function () {

  var provider;

  beforeEach(function() {
    module('angular-storage.store', function($angularStorageProvider) {
      provider = $angularStorageProvider;
      provider.setStore();
    });
  });

  it('should save items correctly in the localStorage', inject(function($angularStorage, $window) {
    var value = 77;
    $angularStorage.set('gonto', value);

    expect($angularStorage.get('gonto')).to.equal(value);
    expect($window.localStorage.getItem('gonto')).to.exist;
    expect($window.localStorage.getItem('gonto')).to.equal(value.toString());
  }));
});

describe('angularStorage $angularStorageProvider.setStore(123)', function () {

  var provider;

  beforeEach(function() {
    module('angular-storage.store', function($angularStorageProvider) {
      provider = $angularStorageProvider;
      provider.setStore(123);
    });
  });

  it('should save items correctly in the localStorage', inject(function($angularStorage, $window) {
    var value = 77;
    $angularStorage.set('gonto', value);

    expect($angularStorage.get('gonto')).to.equal(value);
    expect($window.localStorage.getItem('gonto')).to.exist;
    expect($window.localStorage.getItem('gonto')).to.equal(value.toString());
  }));
});

describe('angularStorage $angularStorageProvider.setStore("abc")', function () {

  var provider;

  beforeEach(function() {
    module('angular-storage.store', function($angularStorageProvider) {
      provider = $angularStorageProvider;
      provider.setStore('abc');
    });
  });

  it('should throw an error when the $angularStorage is not found', function() {
    expect(function() { inject(function($angularStorage){ $angularStorage.get('a');}); } ).to.throw();
  });
});

describe('angularStorage store: cookie fallback', function() {

    /* these tests ensure that the cookie fallback works correctly.
    *
    * note - to confirm that cookiestore was used we attempt to retrieve the value from the cookie
             since this bypasses our service, the result will not have been json parsed
             therefore we use JSON.stringify on the expected value, so comparing like for like
    *
    */

  var windowMock, $cookies;
  var mockCookieStore = {};

  /* provide a mock for $window where localStorage is not defined */
  beforeEach(module('ngCookies', 'angular-storage.store', function ($provide) {

    // decorator to mock the methods of the cookieStore
    $provide.decorator('$cookies', function ($delegate) {
      $delegate.put = function (key, value) {
        mockCookieStore[key] = value;
      };
      $delegate.get = function (key) {
        return mockCookieStore[key];
      };
      $delegate.remove = function (key) {
        delete mockCookieStore[key];
      };
      return $delegate;
    });

    windowMock = { localStorage: undefined };
    $provide.value('$window', windowMock);
  }));

  beforeEach(inject(function (_$cookies_) {
    $cookies = _$cookies_;
  }));

  it('should save items correctly in localStorage', inject(function($angularStorage) {
    var value = 1;
    $angularStorage.set('gonto', value);
    expect($angularStorage.get('gonto')).to.equal(value); //this line asserts that value was saved by our service
    expect($cookies.get('gonto')).to.equal(JSON.stringify(value)); //this line asserts that cookie store was used
  }));

  it('should save null items correctly in localStorage', inject(function($angularStorage) {
    $angularStorage.set('gonto', null);
    $angularStorage.inMemoryCache = {};
    expect($angularStorage.get('gonto')).to.equal(null);
    expect($cookies.get('gonto')).to.equal(JSON.stringify(null));
  }));

  it('should save undefined items correctly in localStorage', inject(function($angularStorage) {
    $angularStorage.set('gonto', undefined);
    $angularStorage.inMemoryCache = {};
    expect($angularStorage.get('gonto')).to.equal(undefined);
    expect($cookies.get('gonto')).to.equal(JSON.stringify(undefined));
  }));

  it('should delete items correctly from localStorage', inject(function($angularStorage) {
    var value = 1;
    $angularStorage.set('gonto', value);
    expect($angularStorage.get('gonto')).to.equal(value);
    $angularStorage.remove('gonto');
    expect($angularStorage.get('gonto')).to.not.exist;
    expect($cookies.get('gonto')).to.not.exist;
  }));

  it('should save objects correctly', inject(function($angularStorage) {
    var value = {
      gonto: 'hola'
    };
    $angularStorage.set('gonto', value);
    expect($angularStorage.get('gonto')).to.eql(value);
  }));

  it('should save objects correctly', inject(function($angularStorage) {
    var value = {
      gonto: 'hola'
    };
    $angularStorage.set('gonto', value);
    expect($angularStorage.get('gonto')).to.eql(value);
    expect($cookies.get('gonto')).to.equal(JSON.stringify(value));
  }));

  it('should save objects correctly without cache', inject(function($angularStorage) {
    var value = {
      gonto: 'hola'
    };
    $angularStorage.set('gonto', value);
    $angularStorage.inMemoryCache = {};
    expect($angularStorage.get('gonto')).to.eql(value);
    expect($angularStorage.get('gonto')).not.to.equal(value);
  }));

  it('should save objects correctly without cache', inject(function($angularStorage) {
    var value = {
      gonto: 'hola'
    };
    $angularStorage.set('gonto', value);
    $angularStorage.inMemoryCache = {};
    expect($angularStorage.get('gonto')).to.eql(value);
    expect($angularStorage.get('gonto')).not.to.equal(value);
    expect($cookies.get('gonto')).to.eql(JSON.stringify(value));

  }));

});

describe('angularStorage new namespaced store', function() {
  beforeEach(function() {
    module('ngCookies', 'angular-storage.store');
  });

  var newStore = null;

  beforeEach(inject(function($angularStorage) {
    newStore = $angularStorage.getNamespacedStore('auth0');
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

  it('should should save items correctly when the delimiter is set', inject(function($angularStorage, $window) {
    var value = 111;
    var aStore = $angularStorage.getNamespacedStore('aa', 'sessionStorage', '-', true);
    aStore.set('wayne', value);

    expect(aStore.get('wayne')).to.equal(value);
    expect($window.sessionStorage.getItem('aa-wayne')).to.exist;
    expect($window.sessionStorage.getItem('aa-wayne')).to.equal(value.toString());
    expect($window.sessionStorage.getItem('wayne')).to.not.exist;
  }));

  describe('with param storage', function () {
    var $cookies;

    beforeEach(inject(function( _$cookies_) {
      $cookies = _$cookies_;
    }));

    it('should should save items correctly when the storage is set to sessionStorage', inject(function($angularStorage, $window) {
      var value = 111;
      var sessionStore = $angularStorage.getNamespacedStore('aa', 'sessionStorage');
      sessionStore.set('wayne', value);

      expect(sessionStore.get('wayne')).to.equal(value);
      expect($window.sessionStorage.getItem('aa.wayne')).to.exist;
      expect($window.sessionStorage.getItem('aa.wayne')).to.equal(value.toString());
      expect($window.sessionStorage.getItem('wayne')).to.not.exist;
    }));

    it('should should save items correctly when the storage is set to localStorage', inject(function($angularStorage, $window) {
      var value = 222;
      var localStore = $angularStorage.getNamespacedStore('bb', 'localStorage');
      localStore.set('wayne', value);

      expect(localStore.get('wayne')).to.equal(value);
      expect($window.localStorage.getItem('bb.wayne')).to.exist;
      expect($window.localStorage.getItem('bb.wayne')).to.equal(value.toString());
      expect($window.localStorage.getItem('wayne')).to.not.exist;
    }));

    it('should should save items correctly when the storage is set to cookieStorage', inject(function($angularStorage) {
      var value = 222;
      var cookieStore = $angularStorage.getNamespacedStore('cc', 'cookieStorage');
      cookieStore.set('wayne', value);

      expect(cookieStore.get('wayne')).to.equal(value);
      expect($cookies.get('cc.wayne')).to.equal(JSON.stringify(value));
    }));
  });
});

