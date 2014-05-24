'use strict'

angular.module('DiscoverCtrl',[]).controller('DiscoverCtrl',function($scope,$stateParams){
    $scope.params = $stateParams;

    $scope.init = function(){
        console.log("init DiscoverCtrl");
    }

    $scope.init();

})