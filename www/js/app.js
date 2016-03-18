// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('reditta', ['ionic', 'angularMoment'])

.controller('redditaCtrl', function($scope, $http) {
    $scope.stories = [];

    function loadPosts(params, callback) {
        $http.get('http://www.reddit.com/r/space/new/.json', { params: params })
            .success(function(response) {
              var stories = [];
                angular.forEach(response.data.children, function(child) {
                    stories.push(child.data);
                });
            callback(stories);      
            });
    }

    $scope.loadNew = function() {
      var params = {'before': $scope.stories[0].name};
      loadPosts(params, function(newerPosts){
        $scope.stories = newerPosts.concat($scope.stories);
        $scope.broadcast('scroll.refreshComplete');
      });
    };

    $scope.loadOld = function() {
        var params = {};
        if ($scope.stories.length > 0) {
            params['after'] = $scope.stories[$scope.stories.length - 1].name;
        }
        loadPosts(params, function(olderPosts) {
          $scope.stories = $scope.stories.concat(olderPosts);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

})

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});