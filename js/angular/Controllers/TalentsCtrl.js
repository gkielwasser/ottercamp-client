'use strict'

angular.module('Talents',[]).controller('TalentsCtrl', ['$scope' , 'ErrorService', 'UserService', 'TalentsService', '$filter', function($scope, ErrorService, UserService, TalentsService,$filter){
	$scope.loading = true;
	
	$scope.initTalents = function(){
		console.log("init TalentsCtrl");
		//Récupération de la liste des talents
		TalentsService.talents().then(
			function(data){
				$scope.talentsList = data;
				$scope.loading = false;
			}
		)
		
		//Récupération des talents de l'utilisateur
		$scope.talents = UserService.getTalents();
		if(angular.isUndefined($scope.talents)){
			$scope.talents = [];
		}
		
		//Talents max
		$scope.maxTalents = 3;
	}
	
	$scope.addTalent = function(talent){
		if($scope.talents.length < $scope.maxTalents){
			TalentsService.addTalent(talent.id).then(
				function(data){
					if(angular.isUndefined(data.erorrs)){
						$scope.talents.push(talent);
						UserService.setTalents($scope.talents);
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
			ErrorService.showAlert("warning",[{message:$filter("trad")("error_member_talents_toomuch")}])
		}
	}
	
	$scope.deleteTalent = function(talent){
		TalentsService.deleteTalent(talent.id).then(
			function(data){
				if(angular.isUndefined(data.erorrs)){
					$scope.removeTalent(talent.id);
					UserService.setTalents($scope.talents);
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
	
	$scope.exist = function(id){
		var res = false;
		angular.forEach($scope.talents, function(value, key){
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
	
	$scope.removeTalent = function(id){
		angular.forEach($scope.talents, function(value, key){
			if(value.id == id){
				$scope.talents.splice(key,1)
			}
		})
	}
}])