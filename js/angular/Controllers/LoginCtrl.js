'use strict'

var loginctrlmodule = angular.module('LoginCtrl',[]);

var loginctrl = loginctrlmodule.controller('LoginCtrl', ['$rootScope', '$scope', 'UserService' ,'ErrorService', 'FBUser','$location',function($rootScope,$scope,UserService,ErrorService,FBUser,$location){

    $scope.init = function(){
        console.log("init LoginCtrl");
        //Redirection sur page découver si déjà connecté
        if(UserService.isLoggedIn()){
        	$location.path("").replace();
        }
        $scope.formSent = false;
        $scope.FBUser = FBUser;
    }
    
    $scope.FBlogining = function(val){
    	if(val){
    		angular.element(".FBlogining").button('loading');
    	}
    	else{
    		angular.element(".FBlogining").button("reset");
			angular.element(".FBlogining").button("toggle");
			angular.element(".FBlogining").removeClass("active");
    	}
    }

    $scope.$on("FBloginning", function(action,data){
    	if(data){
    		//Login FB
    		UserService.login({facebookId: data});  		
    	}
    	else{
    		$scope.FBlogining(true);
    	}
    });

    $scope.submit = function(){	
    	$scope.formSent = true;
    	if($scope.loginForm.$valid){   
    		console.log("submit") 	
	    	//Sha1 passwd
	    	$scope.myLoginForm.password = $.sha1($scope.password);
	    	$scope.sending = true;
	    	UserService.login($scope.myLoginForm);
	    }	
    }
    
    $scope.init();
    
    $scope.$on("login", function(action, data){
    	if(angular.isUndefined(data.errors)){
    		
    	}
    	else{
			ErrorService.showAlert('error', data.errors)
    	}
    	$scope.FBlogining(false);
    	$scope.sending = false;
   	});
    
}])