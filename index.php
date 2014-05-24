<!doctype html>
<html lang="fr" ng-controller="MainCtrl" ng-init="init()">
	<head>
		<?php
			echo '<link rel="icon" type="image/png" href="' . images_assets_file_url('favicon.png') . '">';
		?>
		
		<!--<title>{{$root.titleNotifications}}Ottercamp, des activités de proximité avec des personnes proches de chez vous</title>
		-->
		<title ng-bind="$root.titleNotifications +  ' Ottercamp, des activités de proximité avec des personnes proches de chez vous'">Ottercamp, des activités de proximité avec des personnes proches de chez vous</title>
		<meta charset="utf-8">
		<meta name="title" content="Ottercamp, des activités de proximité avec des personnes proches de chez vous" />
	    <meta name="description" content="Ottercamp est une plateforme sociale qui vous permet d'organiser et de trouver des activités à réaliser avec des personnes proches de chez vous. Ces activités peuvent se dérouler dans des espaces privés, tels que l'appartement d'un hôte pour un repas, ou dans des espaces publics comme une salle de sport pour une partie de badminton." />
	    <meta name="keywords" content="ottercamp, activité, évènement, sortie, organisation, rencontre, proximité, social, local, ami, amitié" />
	    <meta name="author" content="Ottercamp" />
		<meta name="copyright" content="© Ottercamp SAS." />
		
		<!-- SEO -->
		<!--<meta name="fragment" content="!">
		
		 <?php 
	    	if(ENVIRONMENT == "development"){
	    		echo '<base href="/ottercamp/">';
			}
			else{
				echo '<base href="/">';
			}
	    ?>		
		-->
		<meta property="og:title" content="Ottercamp, des activités de proximité avec des personnes proches de chez vous" />

		<meta property="og:url" content="<?php echo $this->config->item('base_url'); ?>" />
		<meta property="og:image" content="<?php echo images_assets_file_url('logo-300.png'); ?>" />
		<meta property="og:site_name" content="Ottercamp" />
		<meta property="og:description" content="Ottercamp est une plateforme sociale qui vous permet d'organiser et de trouver des activités à réaliser avec des personnes proches de chez vous. Ces activités peuvent se dérouler dans des espaces privés, tels que l'appartement d'un hôte pour un repas, ou dans des espaces publics comme une salle de sport pour une partie de badminton." />
	    <meta property="og:type" content="website" />
	    <!--
	    <title>{{MetaData.title()}}</title>
	    <title ng-bind="MetaData.title()"></title>-->
	    
	    <?php 
	    	if(ENVIRONMENT == "development"){
	    		//Boostrap Twitter
	    		echo css_assets_file_asset("10-bootstrap.css");
	    		echo css_assets_file_asset("11-bootstrap-responsive.css");

				//Fileupload
	    		echo css_assets_file_asset("20-bootstrap-fileupload.min.css");
				echo css_assets_file_asset("21-boostrap-fileuploadui.css");
				
				//Image gallery
	    		echo css_assets_file_asset("30-bootstrap-image-gallery.css");
				
				//Bouttons
				echo css_assets_file_asset("40-auth-buttons.css");
				
				//mapbox group
				//echo css_assets_file_asset("45-MarkerCluster.css");
				//echo css_assets_file_asset("46-MarkerCluster.Default.css");
				
				//Old picker (a supprimer)
				echo css_assets_file_asset("50-bootstrap-datepicker.css");
				
				//Nouveau picker
				echo css_assets_file_asset("60-datetimepicker.css");
				
				//Editor
				echo css_assets_file_asset("65-bootstrap-wysiHtml5.css");
				
				//Pnotify
				echo css_assets_file_asset("70-jquery.pnotify.default.icons.css");
				echo css_assets_file_asset("71-jquery.pnotify.default.css");
				
				//Select2
				echo css_assets_file_asset("80-select2.css");
				
				//Custom
				echo css_assets_file_asset("99-style.css");
	    	}
			else{
				echo css_assets_file_asset("all.css");
			}
	    ?>
		<!-- mapbox -->    
	    <link href='http://api.tiles.mapbox.com/mapbox.js/v0.6.7/mapbox.css' rel='stylesheet' />	
	    
	    <!-- fontwasome -->
	    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">	    
	    
	    <!-- google analytics -->
	    <script type="text/javascript">
		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', '-']);
		  _gaq.push(['_trackPageview']);
		
		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();	
		</script>
		
		<!-- Addthis -->
		<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=xa-51d1774e436848fa&async=1"></script>
		
		<!-- Variables générales -->
		<script>
			var Config = {
				webURL: "<?php echo $this->config->item('base_url'); ?>",
				templatesPublicURL: "<?php echo $this->config->item('templates_public_url'); ?>",
				traductionURL: "<?php echo $this->config->item('traduction_url'); ?>",
				apiURL: "<?php echo $this->config->item('api_url'); ?>",
				publicToken: "<?php echo $this->config->item('app_public_token'); ?>",
				mapBoxID: "<?php echo $this->config->item('mapbox_id'); ?>",
				forecastID: "<?php echo $this->config->item('forecast_id'); ?>",
				addthis_id: "<?php echo $this->config->item('addthis_id'); ?>"
			};
			var user = '<?php echo $user; ?>';
		</script>
		
		<!-- Ressources sur CDN -->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	    <script type="application/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
	    <script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js"></script>
		
		<!-- Mabox-->
		<script src='http://api.tiles.mapbox.com/mapbox.js/v0.6.7/mapbox.js'></script>
		
		<?php
		if(ENVIRONMENT == "development"){
			
	   		echo js_assets_file_asset("01-jquery.ui.widget.js");
	    	echo js_assets_file_asset("02-jquery.fileupload.js");
	    	echo js_assets_file_asset("03-jquery.fileupload-fp.js");
			
			echo js_assets_file_asset("20-load-image.js");

			echo js_assets_file_asset("05-fileupload-iframe-transport.js");
	    	echo js_assets_file_asset("71-sha1.js");
			
			echo js_assets_file_asset("21-angular-cookies.min.js");
			
			echo js_assets_file_asset("30-angular-ui.js");
			echo js_assets_file_asset("31-select2.js");
			
			//A supprimer(ancien)
	    	echo js_assets_file_asset("41-bootstrap-datepicker.js");

			//Nouveau picker
			echo js_assets_file_asset("43-bootstrap-datetimepicker.js");
			
			echo js_assets_file_asset("50-jquery.pnotify.min.js");
			
			//echo js_assets_file_asset("54-leaflet-src.js");
			//echo js_assets_file_asset("55-leaflet.markercluster.js");-->
						
			echo js_assets_file_asset("80-bootstrap-image-gallery.min.js");
			echo js_assets_file_asset("85-jquery.nested.js");
			
			echo js_assets_file_asset("87-skyicons.js");
			
			echo js_assets_file_asset("90-input-clear.js");
			

			echo js_assets_file_asset("angular/Extern/angular-strap.js");
	    	echo js_assets_file_asset("angular/Loader/loadApp.js");
			echo js_assets_file_asset("angular/Loader/config.js");
			
			echo js_assets_file_asset("angular/Filters/filters.js");
			
		    echo js_assets_file_asset("angular/Controllers/MainCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/AdministrateOrganizations.js");
			echo js_assets_file_asset("angular/Controllers/InboxCtrl.js");
			echo js_assets_file_asset("angular/Controllers/ContactCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/AddEventCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/ShowEventCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/DiscoverCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/ProfileCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/MapCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/LoginCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/RegisterCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/SearchCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/ParameterCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/PasswordCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/ConfirmCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/NotificationsCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/PaymentCtrl.js");
			echo js_assets_file_asset("angular/Controllers/HobbiesCtrl.js");
			echo js_assets_file_asset("angular/Controllers/TalentsCtrl.js");
			echo js_assets_file_asset("angular/Controllers/AboutCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/MetaCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/BadgesCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/CommunitiesCtrl.js");
		    echo js_assets_file_asset("angular/Controllers/OrganizationsCtrl.js");
		    
		    
		    echo js_assets_file_asset("angular/Services/services.js");
		    
		    echo js_assets_file_asset("angular/Extern/http-auth-interceptor.js");
		    echo js_assets_file_asset("angular/Extern/angular-ui-states.min.js");
			
		    echo js_assets_file_asset("angular/Directives/administrateParticipantsDir.js");
			echo js_assets_file_asset("angular/Directives/eventListDir.js");
		    echo js_assets_file_asset("angular/Directives/userBoxDir.js");
		    echo js_assets_file_asset("angular/Directives/jqueryDir.js");
			echo js_assets_file_asset("angular/Directives/mapDir.js");
			echo js_assets_file_asset("angular/Directives/geolocPickerDir.js");
			echo js_assets_file_asset("angular/Directives/notificationsDir.js");
			echo js_assets_file_asset("angular/Directives/hovercardsDir.js");
			echo js_assets_file_asset("angular/Directives/searchDir.js");
			echo js_assets_file_asset("angular/Directives/text-editor.js");
			
			echo js_assets_file_asset("angular/Traduction/traduction.js");	
			
			//Traduction fr Angular.js
			echo js_assets_file_asset_folder("languages/angular-locale_fr-fr.js");
				
		}
		else{
			echo js_assets_file_asset("angular-app.min.js");
			echo js_assets_file_asset_folder("languages/angular-locale_fr-fr.js");
		}	
			echo js_assets_file_asset_folder("dev/js/exclude/94-wysihtml5-0.3.0.js");
			echo js_assets_file_asset_folder("dev/js/exclude/95-bootstrap-wysihtml5.js");
		?>
	</head>
	
	<body  class="{{about}}">

		<!-- Vu si le Javascript n'est pas activé -->
		<noscript>Le JavaScript n'est pas activé sur votre navigateur et est nécessaire pour utiliser Ottercamp</noscript>

		<!-- navBar -->
		<ng-include src="Config.templatesPublicURL+'includes/navBar.html'"></ng-include>
	     
		<!-- Container principal -->
		<div ng-class="{'container':state != 'about.about'}" ng-hide="waiting">
			
		    <div ui-view></div>
		</div>
	
		<ng-include ng-hide="state == 'discover2' || state == 'discover' || state == 'inbox.loader' ||state == 'inbox' || state == 'inbox.detail'" src="Config.templatesPublicURL+'includes/footer.html'"></ng-include>

		<!-- Facebook Login -->
		<div id="fb-root"></div>
		<script>
		  // Additional JS functions here
		  window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '-', // App ID
		      channelUrl : '//'+Config.webURL + 'views/channel.html', // Channel File
		      status     : true, // check login status
		      cookie     : true, // enable cookies to allow the server to access the session
		      xfbml      : true,  // parse XFBML
		      oauth		 : true
		    });
			//console.log("channel",'//'+Config.webURL + 'views/channel.html')
		    // Additional init code here
			angular.bootstrap(document, ['ottercamp']);
		  };
		
		  // Load the SDK asynchronously
		  (function(d){
		     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		     if (d.getElementById(id)) {return;}
		     js = d.createElement('script'); js.id = id; js.async = true;
		     js.src = "//connect.facebook.net/en_US/all.js";
		     ref.parentNode.insertBefore(js, ref);
		   }(document));
		</script>
		
		<!-- Fin Facebook Login -->
	</body>
</html>
