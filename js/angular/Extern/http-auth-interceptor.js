/**
 * @license HTTP Auth Interceptor Module for AngularJS
 * (c) 2012 Witold Szczerba
 * License: MIT
 */
var interceptor = angular.module('http-auth-interceptor', []);

var authservice = interceptor.provider('authService', function() {
    /**
     * Holds all the requests which failed due to 401 response,
     * so they can be re-requested in future, once login is completed.
     */
    var buffer = [];

    
    
    /**
     * Required by HTTP interceptor.
     * Function is attached to provider to be invisible for regular users of this service.
     */
    this.pushToBuffer = function(config, deferred) {
      buffer.push({
        config: config, 
        deferred: deferred
      });
    }
    
    this.$get = ['$rootScope','$injector', 'BroadcastFactory', function($rootScope, $injector,BroadcastFactory) {
      var $http; //initialized later because of circular dependency problem
      
      function retry(config, deferred) {
        $http = $http || $injector.get('$http');
        $http(config).then(function(response) {
          deferred.resolve(response);
        });
      }
      function retryAll() {
        for (var i = 0; i < buffer.length; ++i) {
          retry(buffer[i].config, buffer[i].deferred);
        }
        buffer = [];

        BroadcastFactory.broadcast("retryAll");
      }

      return {
        loginConfirmed: function() {
          BroadcastFactory.broadcast("previousPath");
          BroadcastFactory.broadcast("event:auth-loginConfirmed");
          
          retryAll();
        }
      }
    }]
  })

  /**
   * $http interceptor.
   * On 401 response - it stores the request and broadcasts 'event:angular-auth-loginRequired'.
   */
  .config(['$httpProvider', 'authServiceProvider',function($httpProvider, authServiceProvider) {
    
    var interceptor = ['$rootScope', '$q', 'BroadcastFactory', function($rootScope, $q, BroadcastFactory) {
      function success(response) {
	
        return response;
      }
 
      function error(response) {
        if (response.status === 401) {
			/*
          	var deferred = $q.defer();
          	authServiceProvider.pushToBuffer(response.config, deferred);
          	BroadcastFactory.broadcast("storePath");
          	BroadcastFactory.broadcast("event:auth-loginRequired");
          	return deferred.promise;
        	*/
        }
        else if(response.status === 500){
        	BroadcastFactory.broadcast("e500");
        }
        else if(response.status === 404){
        	BroadcastFactory.broadcast("e404");
        }
        //Pas de réponse
        else if(response.status === 0){
        	//console.log("MAINTENANCE BUG, IT SHOULD NOT OCCUR",response)
        	//BroadcastFactory.broadcast("maintenance");
        }
        
        // otherwise
        return $q.reject(response);
      }
 
      return function(promise) {
        return promise.then(success, error);
      }
 
    }];
    $httpProvider.responseInterceptors.push(interceptor);
  }]);