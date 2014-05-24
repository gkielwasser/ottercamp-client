'use strict';

angular.module('hovercards.directives',[])

.directive('card', function(){
	return{
		restrict : 'E',
		templateUrl : Config.templatesPublicURL + 'directives/card.html',
		replace:true,
		link: function(scope, elm, attrs) {
			scope.searchTag = function(id,tag){
				console.log("broadcst")
				scope.$emit("searchTag",{tag:tag,id:id});
			}			
			//hideMarker(resource.id);searchTag(tag)
			
			scope.Config = Config;	
			
			scope.cleanUrl = function(url){
				//.replace(/[^\w-]+/g,'')
				if(angular.isDefined(url))return url.toLowerCase().replace(/ /g,'-');
			}
			
			scope.templateUrl = Config.templatesPublicURL + attrs.type + '/cards/' + attrs.format +'.html';
			
			if(attrs.status == "true"){
				scope.status = true;
			}
		},	
		scope: {
			resource : '='
		}
	}
})