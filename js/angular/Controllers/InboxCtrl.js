'use strict'

var Inbox = angular.module('Inbox',[]);
Inbox.directive('message',
	[
	'$modal',
	'UserService',
	'InboxService',
	'ErrorService',
	'$rootScope',
	 function(
	 	$modal,
		UserService,
		InboxService,
		ErrorService,
		$rootScope
	){
	return{
		restrict:'EA',
		scope:{
			user:"="
		},
		link: function(scope, element, attrs, ngModel) { 
			console.log("linked")
		},
		//replace:true,
		//templateUrl:Config.templatesPublicURL+'inbox/sendMessage.html',
		controller:function($scope){
			$scope.Config = $rootScope.Config;
			
			$scope.available = function(){
				return (UserService.isLoggedIn() && angular.isDefined($scope.user) && UserService.getUser().id != $scope.user.id)?true:false;
			};
			
			$scope.show = function(){				
				$modal({
			      template: Config.templatesPublicURL+'conversations/modals/message.html',
			      show: true,
			      backdrop: 'static',
			      scope: $scope
				})
			}	
			
			$scope.initNew = function(){
				$scope.message = "";
			}	
			
			$scope.sendMessage = function(userId,message,hide){
				console.log("message",$scope.message,$scope.modal)
				$scope.hideModal = function(){
					hide();
				}	
				if(angular.isDefined(userId) && angular.isDefined(message) && message.length > 0){
					$scope.sending = true;
					$scope.sendingMessage(true);
					InboxService.sendMessage(message,userId).then(
						function(data){
							$scope.message = "";  	
					    	if(angular.isUndefined(data.errors)){
					    		ErrorService.showAlert('success', [data.success])
					    		$scope.hideModal();
					    	}
					    	else{
								ErrorService.showAlert('error', data.errors)
					    	}
					    	$scope.sending = false;
					    	$scope.sendingMessage(false);
						}
					)
				}	
			}

			$scope.sendingMessage = function(val){
		    	if(val){
		    		angular.element(".sendingMessage").button('loading');
		    	}
		    	else{
		    		angular.element(".sendingMessage").button("reset");
					angular.element(".sendingMessage").button("toggle");
					angular.element(".sendingMessage").removeClass("active");
		    	}
		    }
		}
	}
}])
Inbox.directive('inbox',
	[
	'UserService',
	'InboxService',
	'$location',
	'refreshMessagesDelay',
	'$timeout',
	'ErrorService',
	'$rootScope',
	function(
		UserService,
		InboxService,
		$location,
		refreshMessagesDelay,
		$timeout,
		ErrorService,
		$rootScope
	){
	
	return{	
		restrict : 'E',
		scope : {},
		templateUrl : Config.templatesPublicURL + 'directives/conversations.html',
		controller : function($scope){
			$scope.$watch( UserService.isLoggedIn, function ( logged_in ) {
			    if ( !logged_in ) {
			    	$scope.messages = [];
			    }		
			});
			
			$scope.initInbox = function(){
				if(UserService.isLoggedIn()){
					$scope.firstReception = true;
					console.log("userservice context", UserService.getContext())

					var context = UserService.getContext();
					$scope.messages = [];
					
					if(angular.isDefined(context) && angular.isDefined(context.messages) && context.messages.length > 0){
						angular.forEach(context.messages, function(value,key){
							$scope.messages.push(value);	
						})
					}	
					$scope.refreshMessages();
				}	
			}
			
			$scope.isSender = function(fromId){
				return false;
				//return (UserService.getUser().id == fromId) ? true : false;
			}
			
			$scope.refreshMessages = function(){	
				if(UserService.isLoggedIn()){			
					InboxService.getMessages(true).then(
						function(data){
							if(angular.isUndefined(data.errors)){
					    		var oldMessages = $scope.messages;
					    		var newMessages = [];
								var locArray;
					    		angular.forEach(data, function(value,key){
					    			if(!$scope.isExist(value.id)){
					    				//Empeche les notificaitons de poper au lancement de l'application
					    				if(!$scope.firstReception){
					    					//Notification
					    					locArray = $location.path().split('/');

					    					//Ajout message dans la conversation (si on est dessus)
					    					if(locArray[1] == "conversations" && locArray[2] == value.conversation.id){
					    						$rootScope.$broadcast('newMessage',value);
					    					}
					    					
					    					ErrorService.showAlert("message", [{message:value, link:value.link}])
					    				}	
					    				newMessages.push(value);
					    			}
					    		})
					    		$scope.messages = newMessages.concat(oldMessages);	
					    		$scope.firstReception = false;
					    		$timeout(function(){
									$scope.refreshMessages();
								}, refreshMessagesDelay);
					    	}	
						}	
					)			
				}			
			}
			
			$scope.read = function(){
				//Fermeture des éventuelles notifications actives
				ErrorService.hideAlert();
				
				if($scope.unReaded > 0){
					InboxService.readedMessages();
					$scope.setReaded()
				}	
			}
			
			$scope.isExist = function(id){
				var exist = false;
				angular.forEach($scope.messages, function(value,key){
					if(value.id == id){
						exist = true;
					}
				})
				return exist;
			}
			
			$scope.setReaded = function(){
				angular.forEach($scope.messages, function(value,key){
					$scope.messages[key].readed = true;	
				})
			}
			
			$scope.seeConversation = function(id){
				$location.path("conversations/"+id+"/messages");
			}
			
			$scope.countUnreaded = function(){
				
				var count = 0;
				angular.forEach($scope.messages, function(value,key){
					if(!value.readed){
						count++;
					}	
				})

				if(count > 0){
					$rootScope.updateTitle(count,"messages");
					$rootScope.updateTitle(count);
					$scope.unReaded = count;
					return "btn-warning";
				}
				else{
					$rootScope.updateTitle(count,"messages");
					$scope.unReaded = 0;
					return "";
				}	
			}
		}
	}		
}])

var InboxCtrl = Inbox.controller('InboxCtrl',
	["$scope",
	"UserService",
	"InboxService",
	"Conversations",
	"ErrorService",
	"$state",
	"$stateParams",	
	"$location",
	function(
		$scope,
		UserService,
		InboxService,
		Conversations,
		ErrorService,
		$state,
		$stateParams,
		$location
	){
		
	$scope.isUnreadConversation = function(unread){
		return (unread)?"unread":""; 
	}
	
	$scope.existConversation = function(id){
		var res = false;
		angular.forEach($scope.conversations,function(value,key){
			if(value.id == id) res = true;
		})
		return res;
	}
		
	$scope.getConversations = function(){
		InboxService.getConversations().then(
			function(data){
				if(angular.isUndefined(data.errors)){
					
				}
				else{
					//ErrorService.showAlert("error",data.errors)
				}
			}
		)
	}
		
	$scope.initInbox = function(){	
		$scope.conversations = Conversations;
		angular.forEach($scope.conversations, function(value, key){
			if(value.member1.id == UserService.getUser().id){
				$scope.conversations[key].dest = "member2";
			}
			else{
				$scope.conversations[key].dest = "member1";
			}
		})

		$scope.state = $state;		
	}	

	$scope.loadConversation = function(id){
		$location.path("conversations/" + id+"/messages").replace();
	}
		
	$scope.sendingMessage = function(val){
    	if(val){
    		angular.element(".sendingMessage").button('loading');
    	}
    	else{
    		angular.element(".sendingMessage").button("reset");
			angular.element(".sendingMessage").button("toggle");
			angular.element(".sendingMessage").removeClass("active");
    	}
    }	
}])

.controller('InboxMessageCtrl',
	[
	'$scope',
	'$stateParams',
	'$anchorScroll',
	function($scope,$stateParams,$anchorScroll){
	
		console.log("Message!!!!!",$stateParams);
		$location.hash($stateParams.messageId);
	    $anchorScroll();
			
}])

.controller('InboxNewCtrl',
	["$scope",
	"UserService",
	"InboxService",
	"ErrorService",
	function(
		$scope,
		UserService,
		InboxService,
		ErrorService
	){

	$scope.initNew = function(){
		console.log("init new")	
		$scope.message = "";
	}	
	
	$scope.sendMessage = function(userId,message,hide){	
		if(angular.isDefined(userId) && angular.isDefined(message) && message.length > 0){
			$scope.sendingMessage(true);
			InboxService.sendMessage(message,userId).then(
				function(){
					if(angular.isUndefined(data.errors)){
			    		ErrorService.showAlert('success', [data.success])
			    		$scope.hideModal();
			    	}
			    	else{
						ErrorService.showAlert('error', data.errors)
			    	}
			    	$scope.sendingMessage(false);
				}
			)
		}	
		$scope.hideModal = function(){
			hide();
		}
	}
	
	$scope.sendingMessage = function(val){
    	if(val){
    		angular.element(".sendingMessage").button('loading');
    	}
    	else{
    		angular.element(".sendingMessage").button("reset");
			angular.element(".sendingMessage").button("toggle");
			angular.element(".sendingMessage").removeClass("active");
    	}
    }

}]).controller('InboxLoaderCtrl',
	["$scope",
	"$location",
	function(
		$scope,
		$location
	){
	
	//Charger la première conversations
	if($scope.conversations.length > 0){
		$scope.loadConversation($scope.conversations[0].id);
	}
	else{
		//$location.path("conversation").replace();
	}

}]).directive('scrollIf', ['$location',function($location) {
  return function (scope, element, attributes) {
    
      if($location.hash() == scope.message.id) {
      	//console.log("SCROLL",element.prop( 'offsetTop' ))
      	//$('#conversation').scrollTop($('#conversation').offsetTop + element[0].offsetTop);
      }	
  }
}])
.directive('scrollable', ['$location',function($location) {
    return {        
        controller: function($element) {
        	console.log("scrooll",$location.hash(),$element.height())
            this.scrollTo = function(n) {
            	console.log("should scroll to",n.offsetTop,$element[0].offsetTop)
                $element.scrollTop = $element.offsetTop + n;
            };
        }
    };
}]).directive('scrollableItem', ['$location',function($location) {
    return {
        require: "^scrollable",
        link: function(scope, element, attrs, ctrl) {
        	//console.log("item add",$location.hash(),scope.message.id)
        	if($location.hash() == scope.message.id) {      
      			console.log("position", element, element.offset(),$('#51c0518de4b0554c02f69c4f'))
        		ctrl.scrollTo(element[0]);
        	}
        }
    };
}])

.controller('InboxDetailCtrl', 
	['$scope',
	'$stateParams',
	'InboxService',
	'ErrorService',
	'UserService',
	'$location',
	function($scope,$stateParams,InboxService,ErrorService,UserService,$location){

		console.log("Detail Ctrl")
		$scope.initDetail = function(){
			$scope.getConversation($stateParams.convId);
			$scope.message = "";			
		}
		
		//Renvoi la conversation
		$scope.findConversationById = function(id){
			var conv;
			angular.forEach($scope.conversations,function(value,key){
				if(value.id == id){
					conv = value;
				}
			})
			return conv;
		}
		
		$scope.getDest = function(){
			
		}
		
		//Met à jour le lastMessage dans la conversation
		$scope.addLastMessageById = function(id,lastMessage){
			angular.forEach($scope.conversations, function(value, key){
				if(value.id == id){
					$scope.conversations[key].lastMessage = lastMessage;
				}
			})
		}
		
		$scope.sendMessage = function(userId,message){	
			if(angular.isDefined(userId) && angular.isDefined(message) && message.length > 0){
				$scope.sendingMessage(true);
				InboxService.sendMessage(message,userId).then(
					function(data){
						if(angular.isUndefined(data.errors)){
				    		$scope.addLastMessageById($scope.currentConversation.id,data.message);
				    		$scope.conversation.push(data.message);
				    		ErrorService.showAlert('success', [data.success])
				    	}
				    	else{
							ErrorService.showAlert('error', data.errors)
				    	}
				    	$scope.sendingMessage(false);
					}
				)
			}	
		}

	   	//Réception d'un nouveau message
	   	$scope.$on('newMessage', function(action,data){
	   		$scope.addLastMessageById(data.conversation.id,data);
	   		$scope.conversation.push(data);	   		
	   	})

		$scope.getConversation = function(id){
			$scope.loadingConversation = true;
			InboxService.getConversation(id).then(
				function(data){
					if(angular.isUndefined(data.errors)){
						$scope.conversation = data;
	
						$scope.currentConversation = $scope.findConversationById(id);
						if($scope.currentConversation.member1.id == UserService.getUser().id){
							$scope.dest = $scope.currentConversation.member2;
							$scope.userId = $scope.currentConversation.member2.id;
						}
						else{
							$scope.dest = $scope.currentConversation.member1;
							$scope.userId = $scope.currentConversation.member1.id;
						}
						$scope.loadingConversation = false;
					}	
					else{
						//ErrorService.showAlert("error",data.errors)
					}		
				}
			)
		}
}])
