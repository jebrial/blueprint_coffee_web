BlueprintAppConfig.registerModule('coffee_timer');

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
