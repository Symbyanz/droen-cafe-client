var myApp = angular.module('app', ['ngRoute', 'btford.socket-io', 'ngMessages']);

angular
.module('app')
.config(['$routeProvider',
    function config($routeProvider) {

        $routeProvider.
        when('/', {
            templateUrl: "../views/Client.html",
            controller: 'ClientCtrl as vm'
        }).
        when('/kitchen', {
            templateUrl: '../views/Kitchen.html',
            controller: 'KitchenCtrl as vm'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
    ])

.factory('socket', function ($rootScope) {
  var socket = io.connect('http://192.168.0.121:3000/'); // url ... https://infinite-lowlands-52249.herokuapp.com/
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});