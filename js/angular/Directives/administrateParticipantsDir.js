'use strict';

// eventList Event
var mAdministrate = angular.module('mAdministrate.directives',[])
    //Directive liste des événements

mAdministrate.directive('administrateParticipants', function(){
        return{
            restrict:'A',
            controller: function($scope){
                $scope.countParticipants = function(abbreviation){
                	var number = 0
                	if(angular.isDefined($scope.participantsList) && $scope.participantsList.length > 0){
	                	if(abbreviation != ""){
		                	angular.forEach($scope.participantsList, function(value,key){
		                		if((abbreviation == "pending_payment") 
			            			&& (value.currentStatus.abbreviation == "pending_payment"
			            			|| value.currentStatus.abbreviation == "sended_payment")
			            		){
			            			number ++;
			            		}
			            		else if((abbreviation == "requested_participation")
			            			&& (value.currentStatus.abbreviation == "requested_participation"
			            			|| value.currentStatus.abbreviation == "invited_participation")
			            		){
			            			number ++;
			            		}
		                		else if(value.currentStatus.abbreviation == abbreviation){
		                			number ++;
		                		}
		                	})
		                }
		                else{
		                	number = $scope.participantsList.length;
		                }
		            }    
                	if(number > 0){
                		return number;
                	}
                }
                
                $scope.$watch('participantsList', function(value){
                	if(angular.isDefined(value)){
                		if($scope.countParticipants("pending_participation") > 0){
		                	$scope.currentFilter = "pending_participation";  
		                }
		                else{
		                	$scope.currentFilter = "";  
		                }
                	}
                })

                $scope.filterParticipants = function(participation){
            		if($scope.currentFilter == ""){
            			return true;
            		}
            		//Cas particulier
            		else if(($scope.currentFilter == "pending_payment") 
            			&& (participation.currentStatus.abbreviation == "pending_payment"
            			|| participation.currentStatus.abbreviation == "sended_payment")
            		){
            			return true;
            		}
            		//Cas particulier
            		else if(($scope.currentFilter == "requested_participation") 
            			&& (participation.currentStatus.abbreviation == "requested_participation"
            			|| participation.currentStatus.abbreviation == "invited_participation")
            		){
            			return true;
            		}
            		else if($scope.currentFilter == participation.currentStatus.abbreviation){
            			return true;
            		}
            		else{
            			return false;
                	}  	
                }
                
                $scope.initLine = function(){
					$scope.parts = [];
					angular.forEach($scope.participantsList, function(value,key){
						var item = {};
						item[value.id] = false;
						$scope.parts.push( item);
					})
				}			
				
				$scope.showButton = function(participation){
					return (participation.currentStatus.abbreviation == "pending_participation") ? true : false;
				}
				
				//Demande une confirmation pour l'action à l'utilisateur
				$scope.showConfirmation = function(participation, action){
	            	$scope.parts[participation.id] = true;
	            	$scope.currentAction = action;
	            }
	            
	            //Cache la demande de confirmation
	            $scope.hideConfirmation = function(participation){
	            	$scope.parts[participation.id] = false;
	            }
	            
	            //Détermine s'il faut afficher la confirmation ou non
	            $scope.seeConfirmation = function(participation){
	            	return ($scope.parts[participation.id] == true) ? true : false;
	            }
	            
	            //Execution de l'action après validation de l'utilisateur
	            $scope.confirmedAction = function(participation, action){
	            	if($scope.currentAction == "accept"){
	            		$scope.acceptParticipant(participation)
	            	}
	            	else if($scope.currentAction == "refuse"){
	            		$scope.refuseParticipant(participation)
	            	}
	            	$scope.hideConfirmation(participation)
	            }

	            $scope.initLine()
                
            }
        }
    }
)
