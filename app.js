var myApp = angular.module("myApp", ["ngRoute"]);

myApp.config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
      .when("/home", {
        templateUrl: "views/home.html",
        controller: "myController",
      })
      .when("/directory", {
        templateUrl: "views/directory.html",
        controller: "myController",
      })
      .otherwise({
        redirectTo: "/home",
      });
    // $locationProvider.html5Mode(true);
  },
]);
myApp.directive("profileImage", [
  function () {
    return {
      restrict: "E",
      scope: {
        datas: "=",
        title: "=",
      },
      templateUrl: "views/datas.html",
      controller: function ($scope) {
        $scope.random = Math.floor(Math.random() * 3);
      },
    };
  },
]);
myApp.controller("myController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.removeFunc = function (data) {
      var removedElem = $scope.datas.indexOf(data);
      $scope.datas.splice(removedElem, 1);
    };
    $scope.addNew = function () {
      $scope.datas.push({
        name: $scope.newprofile.name,
        age: parseInt($scope.newprofile.age),
        available: true,
      });
      $scope.newprofile.name = "";
      $scope.newprofile.age = "";
    };
    $scope.variable = "hello in angular js";
    $http.get("data/data.json").then((datas) => {
      console.log(datas.data);
      $scope.datas = datas.data;
    });
  },
]);
