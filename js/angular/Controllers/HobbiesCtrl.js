'use strict'

angular.module('Hobbies',[]).controller('HobbiesCtrl', ['$scope' , 'ErrorService', 'HobbiesService', 'UserService', '$filter', function($scope, ErrorService, HobbiesService, UserService, $filter){
	$scope.loading = true;
	$scope.initHobbies = function(){
		console.log("init HobbiesCtrl");
		//Récupération de la liste des hobbies
		HobbiesService.hobbies().then(function(data){
		console.log("hobbies",data)
			$scope.hobbiesList = data;
			$scope.loading = false;
		})
		
		//Récupération des hobbies de l'utilisateur
		$scope.hobbies = UserService.getHobbies();
		if(angular.isUndefined($scope.hobbies)){
			$scope.hobbies = [];
		}
		
		//Max Hobbies
		$scope.maxHobbies = 3;
	}
	
	$scope.addHobby = function(hobby){
		if($scope.hobbies.length < $scope.maxHobbies){
			HobbiesService.addHobby(hobby.id).then(
				function(data){
					console.log("data",data,data.errors);
					if(angular.isUndefined(data.errors)){
						$scope.hobbies.push(hobby);
						UserService.setHobbies($scope.hobbies);
						ErrorService.showAlert('success', [data.success])
					}
					else{
						ErrorService.showAlert('error', data.errors)
					}					
				},
				function(data){
					ErrorService.showAlert('error', data.errors)
				}
			)
		}
		else{
			ErrorService.showAlert("warning",[{message:$filter("trad")("error_member_hobbies_toomuch")}])
		}	
	}
	
	$scope.deleteHobby = function(hobby){
		HobbiesService.deleteHobby(hobby.id).then(
			function(data){
				if(angular.isUndefined(data.errors)){
					$scope.removeHobby(hobby.id);
					UserService.setHobbies($scope.hobbies);
					ErrorService.showAlert('success', [data.success]);
				}	
				else{
					ErrorService.showAlert('error', data.errors)
				}
			},
			function(data){
				ErrorService.showAlert('error', data.errors)
			}
		)
	}
	
	$scope.exist = function(id){
		var res = false;
		angular.forEach($scope.hobbies, function(value, key){
			if(value.id == id){
				res = true
			}
		})
		return res;
	}
	
	$scope.existant = function(a,b){
		if($scope.exist(a.id)){
			return false;
		}
		else{
			return true;		
		}
	}
	
	$scope.removeHobby = function(id){
		angular.forEach($scope.hobbies, function(value, key){
			if(value.id == id){
				$scope.hobbies.splice(key,1)
			}
		})
	}
}])