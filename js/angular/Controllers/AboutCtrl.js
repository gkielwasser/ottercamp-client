'use strict'

angular.module('AboutCtrl',[]).controller('AboutCtrl',["$scope","$rootScope","UserService",function($scope,$rootScope,UserService){
	console.log("init AboutCtrl");
	
	$rootScope.about = "about";
	$scope.user = UserService.getUser();
	$scope.$on("$destroy", function(){
		console.log("destroy");
        $rootScope.about = "";   
    });
}])
