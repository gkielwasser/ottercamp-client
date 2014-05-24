'use strict'

angular.module('Communities',[]).controller('CommunitiesCtrl', ['$scope' , 'ErrorService', 'UserService', function($scope, ErrorService, UserService){

	$scope.initCommunities = function(){
		$scope.communities = UserService.getUser().communities;
	}
	
	$scope.deleteCommunity = function(id){
		angular.forEach($scope.communities, function(value, key){
			if(value.id == id){
				$scope.communities.splice(key,1);
			}
		})
	}
	
	$scope.unFollow = function(id){
		UserService.deleteCommunity(id).then(
			function(data){
				if(angular.isUndefined(data.errors)){
					ErrorService.showAlert("success",[data.success]);
					$scope.deleteCommunity(id);
				}
				else{
					ErrorService.showAlert("error", data.errors);
				}
			}
		)
	}
}])