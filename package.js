var packageName = 'auth0:angular-storage';
var where = 'client';
var version = '0.0.13';
var summary = 'A storage library for AngularJS done right';
var gitLink = 'https://github.com/auth0/angular-storage.git';
var documentationFile = 'README.md';

// Meta-data
Package.describe({
    name: packageName,
    version: version,
    summary: summary,
    git: gitLink,
    documentation: documentationFile
});

Package.onUse(function (api) {
    api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0']);

    api.use('angular:angular@1.3.3', where);

    api.addFiles('dist/angular-storage.js', where);
});
