/* jshint ignore:start */
(function(window, document, undefined) {
/* jshint ignore:end *//* jshint ignore:start */
'use strict';
/*jshint ignore:end */

var BlueprintAppConfig = (function() {

  var appName = 'blueprint';

  var appDependencies = [
    'ngResource',
    'ngAnimate'
  ];

  var registerModule = function(moduleName) {
    angular.module(moduleName, []);
    angular.module(appName).requires.push(moduleName);
  };

  return {
    appName: appName,
    appDependencies: appDependencies,
    registerModule: registerModule
  };
})();

angular.module(BlueprintAppConfig.appName, BlueprintAppConfig.appDependencies);

angular.element(document).ready( function() {
  angular.bootstrap(document, [BlueprintAppConfig.appName]);
});

// ******** ****** *** ** * * CUSTOM FILTERS * * ** *** ***** *******



// ******** ****** *** ** * * CUSTOM DIRECTIVES * * ** *** ***** *******BlueprintAppConfig.registerModule('coffee_timer');

angular.module('coffee_timer').config([
  function() {
}]);

angular.module('coffee_timer').controller('TimerController',
  ['$scope', '$interval',
  function($scope, $interval) {
    $scope.minutes = 0;
    $scope.seconds = 0;
    var stop;

    $scope.timer = function() {
      if(angular.isDefined(stop)){ return; }

      stop = $interval(function() {
        if($scope.seconds < 59) {
          $scope.seconds++;
        } else {
          $scope.minutes++;
          $scope.seconds = 0;
        }
      },1000);
    };

    $scope.timer_stop = function() {
      if(angular.isDefined(stop)) {
        $interval.cancel(stop);
        stop = undefined;
      }
    };

    $scope.timer_reset = function() {
      $scope.timer_stop();
      $scope.minutes = 0;
      $scope.seconds = 0;
    };

    $scope.$on('$destroy', function() {
      $scope.timer_stop();
    });

}]);
/* jshint ignore:start */
})(window, document);
/* jshint ignore:end */