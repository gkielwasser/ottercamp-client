'use strict';

// eventList Event
var mEvent = angular.module('mEvent.directives',[])
    //Directive liste des événements
var eventList = mEvent.directive('eventList', function(){
        return{
            restrict:'E',
            templateUrl: Config.templatesPublicURL + 'discover/events.html'
        }
    }
)
