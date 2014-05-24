'use strict';

angular.module('filters',[])
.filter('noHtmlTags', function () {
	var regex = /(<([^>]+)>)/ig;
	return function (html) {
		if(angular.isDefined(html) && html)return html.replace(regex, " ");
	}
})
.filter('truncate', function () {
        return function (text, length, end) {
            if (text == null || text.length == 0)
        		return null;
        		
            if (isNaN(length))
                length = 10;
 
            if (end === undefined)
                end = "...";
 
            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length-end.length) + end;
            }
 
        };
    });