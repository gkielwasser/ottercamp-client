'use strict'

var BadgeCtrlMod = angular.module('BadgesCtrl',[]);
var BadgesCtrl = BadgeCtrlMod.controller('BadgesCtrl',
	["$scope",
	"$location",
	"$stateParams",
	"badge",
	function(
		$scope,
		$location,
		$stateParams,
		badge
	){
	
	$scope.initBadge = function(){
		if(angular.isUndefined(badge)){
			$location.path('/404').replace();
		}
		else{
			$scope.badge = badge;
		}
	}
	
}])

BadgesCtrl.resolve = {
	badge : function($location,$stateParams,BadgesService){
		return BadgesService.getBadge($stateParams.badgeId);
	}
}
