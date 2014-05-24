'use strict';
//editeur HTML
//Source angular directive: https://gist.github.com/joshkurz/3300629

angular.module('richTextEditor',[]).directive('richTextEditor', function(){
  return {
    restrict: 'A',
    replace: true,
    require: '?ngModel',
    transclude: true,
    template: '<div><textarea class="span12" rows="6"></textarea></div>',//Wrapper <div> required.
    link: function(scope, element, attrs, controller){
			
	      var textarea = element.find('textarea').wysihtml5({stylesheets: null});
	      //Prevents a console error, likely a bug.
	      
	      //Ajout du placeholder
		 attrs.$observe("placeholder", function(value){
		 	textarea.attr("placeholder",value)
		 })	
	      
	      	      	
	      editor = textarea.data('wysihtml5').editor;
		
	      //Sync view -> model (took me 2 hours to figure this out)
	      console.log("element",element)
	      element.on('keypress', function(){
	      	console.log("change")
	      })
	      editor.on('change', function(){
	      	scope.$apply(function(){
	      		controller.$setViewValue(editor.getValue());
	      	})
	      })
	     

	      //Sync model -> view
	      scope.$watch(attrs.ngModel, function(newValue, oldValue){
      		textarea.html(newValue);
	        editor.setValue(newValue);
	      })
	      
	      var checkLength = function(length){
	      	return (length && length >= attrs.ngMinlength && length <= attrs.ngMaxlength) ? true:false;
	      }
	      
	      controller.$parsers.unshift(function(viewValue) {
	      	if(attrs.required && !viewValue){
	      		controller.$setValidity('required', false);
	      	}
	      	else{
	      		controller.$setValidity('required', true);
	      	}
	      	
	      	if (!attrs.required && !viewValue || viewValue && checkLength(viewValue.length)) {
	          // it is valid
	          controller.$setValidity('length', true);
	          return viewValue;
	        } else {
	          // it is invalid, return undefined (no model update)
	          if(attrs.required && !controller.$error.required || !attrs.required){
	          	controller.$setValidity('length', false);
	          }	
	          else{
	          	controller.$setValidity('length', true);
	          }
	          return undefined;
	        }
	      });
	      
	 }       
  }
}) 