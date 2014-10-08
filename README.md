# angular-storage

A Storage done right for AngularJS.

## Key Features

* Uses **`localStorage` by default but if it's not available, it uses `ngCookies`**.
* Lets you **save JS Objects**
* If **you save an `Number`, you get an `Number`**, not a String
* Uses a **caching system** so that if you already got a value, it won't get it from the store again.

## Installing it

You have several options:

````bash
bower install a0-angular-storage
````

````bash
npm install angular-storage
````

````html
<script type="text/javascript" src="https://rawgit.com/auth0/angular-storage/master/dist/angular-storage.js"></script>
````

## Using it

````js
angular.module('app', ['angular-storage'])
.controller('Controller', function(store) {
  var myObj = {
    name: 'mgonto'
  };

  store.set('obj', myObj);

  var myNewObject = store.get('obj');

  angular.equals(myNewObject, myObj); // return true

  store.remove('obj');

  store.set('number', 2);

  typeof(store.get('number')) === 'number'
});
````

## Namespaced Storages

You can also create namespaced storages if you want

````js
angular.module('app', ['angular-storage'])
.factory('Auth0Store', function(store) {
  reutrn store.getNamespacedStore('auth0');
})
.controller('Controller', function(Auth0Store) {

  var myObj = {
    name: 'mgonto'
  };
  
  // This will be saved in localStorage as auth0.obj
  Auth0Store.set('obj', myObj);

  // This will look for auth0.obj
  var myNewObject = Auth0Store.get('obj');

  angular.equals(myNewObject, myObj); // return true

  Auth0Store.remove('obj');

  store.set('number', 2);

  typeof(store.get('number')) === 'number'
});
````

## API

### store.set(name, value)

Sets a new `value` to the storage with the key `name`. It can be any object.

### store.get(name)

Returns the saved `value` with they key `name`. If you saved an object, you get an object.

### store.remove(name)

Deletes the saved `value` with the key `name`

### store.getNamespacedStore(namespace, delimiter)

Returns a new `store` service that will use the `nanespace` and `delimiter` when saving and getting values like the following `namespace[delimiter]key`. For example `auth0.object` considering `auth0` as `namespace` and `.` as a `delimiter`

## Usages

This library is used in [auth0-angular](https://github.com/auth0/auth0-angular)

## Contributing

Just clone the repo, run `npm install`, `bower install` and then `gulp` to work :).

## License

MIT

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free account in Auth0

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.




