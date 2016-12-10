var app = angular.module("CRMApp", [ui.router]);

app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouteProvider.otherwise("/login"); // default page

  $stateProvider.state("home", {
    url: "/home",
    templateUrl: "../views/home.html",
    controller: ""
  })
  .state("customer", {
    url: "/customer",
    templateUrl: "../views/customer.html",
    controller: ""
  })
  .state("customer.newCustomer", {
    url: "/new-customer",
    templateUrl: "../views/newCustomer.html",
    controller: ""
  })

});
