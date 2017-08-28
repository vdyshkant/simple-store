


const app = angular.module('storeApp', ['ngRoute','ngStorage']);

////////////
// routing config:
//////

app.config(function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider.when("/", {
    templateUrl: "views/home.html",
    controller: "homeCtrl"
  });

  $routeProvider.when("/edit/:id", {
    templateUrl: "views/edit.html",
    controller: "editCtrl"
  });

  $routeProvider.when("/create", {
    templateUrl: "views/edit.html",
    controller: "editCtrl"
  });

  $routeProvider.when("/product/:id", {
    templateUrl: "views/product.html",
    controller: "productCtrl"
  });

  $routeProvider.otherwise({
    templateUrl: "views/home.html",
    controller: "homeCtrl"
  });
});
