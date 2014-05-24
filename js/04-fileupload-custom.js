/**
 * This file contains all the functions, events binding and
 * DOM manipulation which concerns the 'upload pictures'
 * feature.
 */

var uploading = 0;
var error = false;

/* **************************** */
/* ***** DOM manipulation ***** */
/* **************************** */

function removeDropzoneHover() {
	$(this).removeClass('dropzone-hover');
}

/* ******************* */
/* ***** Actions ***** */
/* ******************* */

function initializeProgressbar() {
	$(this).progressbar({
		value: 0
	});
}

function initializeUpload() {
	var toast = $('.toast:first');
	var toastId = toast.attr('data-oml-store-id');
	var toastContent = toast.children('.tst-content:first');
	
	$('#fileupload').fileupload({
		url: 'api/upload', // Can be replaced by data-url in the input-file field
		formData: {
			toastId: toastId
		},
	    dataType: 'xml',
	    dropZone: $('body'),
	    start: function(e, data) {
			$('.progressbar:first').progressbar('option', 'value', 0);
			$('.toast-progressbar:first').show();
		},
	    send: function (event, data) {
	    	if (toastContent.find('.tst-slot-picture').length + uploading < 10) {
	    		uploading++;
	    		return true;
	        }
	        else {
	        	error = true;
	        	return false;
	        }
	    },
	    progressall: function (e, data) {
		    var progress = parseInt(data.loaded / data.total * 100, 10);
		    $('.progressbar:first').progressbar('option', 'value', progress);
		},
		done: function(e, data) {
			$xml = $(data.result);
			var memories = $xml.find('div[data-oml-store-id]');
	
			$.each(memories, function(index, memory) {
				var slot = $('<div data-element="tst-slot" class="tst-slot" />');
	
				slot.append(memory);
				toastContent.children('.slot-zone-wrapper').append(slot);
				
				
				/* ***** Global actions ***** */
	
				trace('toast.picture', 'toast.picture.add', 'Add picture');
			});
			
			if (memories.length == 0) {
				error = true;
			}
			
			uploading--;
		},
		stop: function(e, data) {
			$('.toast-progressbar:first').hide();
			
			if (error == true) {
			    $('.mask:first').show();
			    $('.dialogs').width($(window).width());
			    $('.dialogs').height($(window).height());
			    $('.dialog-upload-error').show();
				
				error = false;
			}
			
			// On affiche temporairement une boite de dialog qui explique qu'on est en train de calculer titre, meteo...
			if ($('body').attr('firstupload') != 'false') {
				setTimeout(function() {
					showNotification($('.notification-cooking'));
				}, 2000);
				$('body').attr('firstupload', 'false');	
			}

			
			storeToast();
		},
		dragover: function(e, data) {
			var dropzone = e.data.fileupload.options.dropZone[0];
	    	var target = e.currentTarget;
	
		    if (target === dropzone) {
		        $(dropzone).addClass('dropzone-hover');
		    }
		    else {
		        $(dropzone).removeClass('dropzone-hover');
		    }
		},
		drop: function(e, data) {
			var dropzone = e.data.fileupload.options.dropZone[0];
	
			$(dropzone).removeClass('dropzone-hover');
		}
	});
}

function showUploadButton() {
	$('.fileuploader-container:first').delay(1000).fadeIn();
}

function hideUploadButton() {
	$('.fileuploader-container:first').delay(2000).fadeOut();
}



/* ************************** */
/* ***** Events binding ***** */
/* ************************** */

$(document).ready(initializeUpload);
//$('.progressbar').livequery(initializeProgressbar);
//$('body').live('dragleave', removeDropzoneHover);
//$('#main').live('mouseenter', showUploadButton);	
//$('#main').live('mouseleave', hideUploadButton);