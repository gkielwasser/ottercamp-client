angular.module("ottercamp").run(["$templateCache", function($templateCache) {

  $templateCache.put("assets/dev/views/about/about.html",
    "<div class=\"row-fluid margin-bottom\">" +
    "	<div ui-view></div>" +
    "	<ng-include ng-show=\"!$root.about\" src=\"Config.templatesPublicURL+'about/includes/menu.html'\" class=\"span3 margin-top\"></ng-include>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/about/includes/contact.html",
    "<div class=\"span9 block margin-top\">" +
    "	<div class=\"header nav-header padding\">{{'label_contact'|trad}}</div>" +
    "	" +
    "	<div class=\"margin-top\">		" +
    "		<p class=\"padding\">" +
    "			{{\"label_contact_information\"|trad}}" +
    "		</p>" +
    "		" +
    "		<hr />" +
    "		" +
    "		<form name=\"contactForm\" class=\"form-{{formSent}}\" novalidate ng-submit=\"submitMessage()\">" +
    "			<div class=\"padding\">" +
    "				<div class=\"controls controls-row\">" +
    "			    	<input type=\"text\" name=\"name\"" +
    "			    		ng-blur ng-focus " +
    "		  				ng-model=\"myContactForm.name\"" +
    "		  				ng-minlength=\"2\" " +
    "		      			ng-maxlength=\"50\"" +
    "		      			ng-pattern=\"/^[a-zA-ZÀ-ÿ0-9 -]+$/\" " +
    "		  				required" +
    "		  				placeholder=\"{{'label_name'|trad}}\"" +
    "		  				class=\"span3\"" +
    "		  			>" +
    "				  	" +
    "			    	<input type=\"text\" name=\"lastName\" " +
    "			    		ng-blur ng-focus" +
    "			    		ng-minlength=\"2\" " +
    "		      			ng-maxlength=\"50\"" +
    "		      			ng-pattern=\"/^[a-zA-ZÀ-ÿ0-9 -]+$/\"" +
    "		  				ng-model=\"myContactForm.lastName\" " +
    "		  				required" +
    "		  				placeholder=\"{{'label_lastname'|trad}}\"" +
    "		  				class=\"span3\"" +
    "		  			>" +
    "		  			<span class=\"clear\"></span>" +
    "		  			" +
    "		  			<span class=\"text-error\" ng-show=\"!lastNameshow && csValidate(formSent,contactForm.lastName.$error.minlength || contactForm.lastName.$error.maxlength,contactForm.lastName.$pristine)\">{{'error_member_lastname_size'|trad}}</span> 			" +
    "		  			<span class=\"text-error\" ng-show=\"!lastNameshow && csValidate(formSent,contactForm.lastName.$error.required,contactForm.lastName.$pristine)\">{{'error_member_lastname_missing'|trad}}</span>" +
    "		  			<span class=\"text-error\" ng-show=\"!lastNameshow && csValidate(formSent,contactForm.lastName.$error.pattern,contactForm.lastName.$pristine)\">{{'error_member_lastname_invalid'|trad}}</span>" +
    "		  			" +
    "		  			<span class=\"text-error\" ng-show=\"!nameshow && csValidate(formSent,contactForm.name.$error.pattern,contactForm.name.$pristine)\">{{'error_member_name_invalid'|trad}}</span>" +
    "		  			<span class=\"text-error\" ng-show=\"!nameshow && csValidate(formSent,contactForm.name.$error.required,contactForm.name.$pristine)\">{{'error_member_name_missing'|trad}}</span>" +
    "	  				<span class=\"text-error\" ng-show=\"!nameshow && csValidate(formSent,contactForm.name.$error.minlength || contactForm.name.$error.maxlength,contactForm.name.$pristine)\">{{'error_member_name_size'|trad}}</span>" +
    "	  			</div>" +
    "			  " +
    "			  	<div class=\"controls controls-row\">" +
    "		  			<input type=\"email\" name=\"email\" " +
    "		  				ng-blur ng-focus" +
    "		  				ng-model=\"myContactForm.email\" " +
    "		  				required" +
    "		  				placeholder=\"{{'label_email'|trad}}\"" +
    "		  				class=\"span6\"" +
    "		  			>" +
    "		  			<span class=\"clear\"></span>" +
    "				    <span class=\"text-error\" ng-show=\"!emailshow && csValidate(formSent,contactForm.email.$error.required,contactForm.email.$pristine)\">{{'error_member_email_missing'|trad}}</span>" +
    "			    	<span class=\"text-error\" ng-show=\"!emailshow && csValidate(formSent,contactForm.email.$error.email,contactForm.email.$pristine)\">{{'error_member_email_invalid'|trad}}</span>" +
    "		    	</div>" +
    "		    	" +
    "		    	<div class=\"controls controls-row\">" +
    "		  			<input type=\"text\" name=\"subject\" " +
    "		  				ng-blur ng-focus" +
    "		  				ng-model=\"myContactForm.subject\" " +
    "		  				required" +
    "		  				ng-minlength=\"2\"" +
    "		  				ng-maxlength=\"100\"" +
    "		  				placeholder=\"{{'label_subject'|trad}}\"" +
    "		  				class=\"span6\"" +
    "		  			>" +
    "		  			<span class=\"clear\"></span>" +
    "				    <span class=\"text-error\" ng-show=\"!subjectshow && csValidate(formSent,contactForm.subject.$error.required,contactForm.subject.$pristine)\">{{'error_contact_subject_missing'|trad}}</span>" +
    "		    		<span class=\"text-error\" ng-show=\"!subjectshow && csValidate(formSent,contactForm.subject.$error.minlength || contactForm.subject.$error.maxlength,contactForm.subject.$pristine)\">{{'error_contact_subject_size'|trad}}</span>		    	" +
    "		    	</div>" +
    "			  	" +
    "			  	<div class=\"controls controls-row\">" +
    "			    	<textarea name=\"message\" ng-model=\"myContactForm.message\" " +
    "		  				rows=5" +
    "		  				cols=40" +
    "		  				ng-minlength=\"10\"" +
    "		  				ng-maxlength=\"5000\"" +
    "		  				ng-blur ng-focus" +
    "		  				placeholder=\"{{'label_message'|trad}}\"" +
    "		  				required" +
    "		  				class=\"span12\"" +
    "		  			></textarea>" +
    "		  			<span class=\"clear\"></span>" +
    "		  			<span class=\"text-error\" ng-show=\"!messageshow && csValidate(formSent,contactForm.message.$error.minlength || contactForm.message.$error.maxlength,contactForm.message.$pristine)\">{{'error_contact_message_size'|trad}}</span>" +
    "				    <span class=\"text-error\" ng-show=\"!messageshow && csValidate(formSent,contactForm.message.$error.required,contactForm.message.$pristine)\">{{'error_contact_message_missing'|trad}}</span>" +
    "			  	</div>" +
    "		  	</div>" +
    "		  " +
    "		  	<div class=\"form-actions\">" +
    "		    	<input type=\"submit\" class=\"btn btn-primary sendingMessage\" data-loading-text=\"{{'label_loading'|trad}}\" value=\"{{'label_send'|trad}}\" />" +
    "		    </div>" +
    "		</form>	" +
    "	</div> 	" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/about/includes/credits.html",
    "<div class=\"span9 block margin-top\">" +
    "	<div class=\"header nav-header padding\">{{'label_credits'|trad}}</div>" +
    "	" +
    "	<div class=\"padding margin-top text-justify\">" +
    "		Pour vous procurer la meilleure experience possible, Ottercamp utilise de nombreuses technologies. <br />" +
    "		" +
    "		<br />" +
    "		" +
    "		Toutes nos applications sont hebergées par <a href=\"https://www.heroku.com/\" target=\"_blank\">Heroku</a> et nos images par <a href=\"http://aws.amazon.com/fr/s3/\" target=\"_blank\">Amazon S3</a>." +
    "		Notre API a été développée en Java avec l'excellent <a href=\"http://www.playframework.com/\" target=\"_blank\">Play Framework</a> et nous enregistrons nos données grâce à <a href=\"http://www.mongodb.org\" target=\"_blank\">MongoDB</a>." +
    "		Notre site web utilise <a href=\"http://angularjs.org/\" target=\"_blank\">AngularJS</a> et <a href=\"http://jquery.com/\" target=\"_blank\">JQuery</a> pour la partie client, <a href=\"http://twitter.github.io/bootstrap/\" target=\"_blank\">Twitter Bootstrap</a> et <a href=\"http://fortawesome.github.io/Font-Awesome/\" target=\"_blank\">Font Awesome</a> pour le CSS et les icônes, ainsi que <a href=\"http://ellislab.com/codeigniter\" target=\"_blank\">CodeIgniter</a> pour la partie serveur." +
    "		Pour l'affichage de nos superbes cartes nous faisons confiance à <a href=\"http://mapbox.com/\" target=\"_blank\">MapBox</a> et <a href=\"http://www.openstreetmap.org/\" target=\"_blank\">OpenStreetMap</a>, et nous servons de <a href=\"http://www.geonames.org/\" target=\"_blank\">Geonames</a> et <a href=\"https://developers.google.com/maps/documentation/geocoding/?hl=fr\" target=\"_blank\">Google Geocoding</a> pour les adresses." +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/about/includes/help.html",
    "<div class=\"span9 block margin-top\">" +
    "	<div class=\"header nav-header padding\">{{'label_help'|trad}}</div>" +
    "	" +
    "	<div class=\"padding margin-top\">" +
    "		<ul class=\"nav nav-tabs nav-stacked\">" +
    "		  	<li><a href=\"#/about/help#general\">Généralités</a></li>" +
    "          	<li><a href=\"#/about/help#account\">Mon compte</a></li>" +
    "          	<li><a href=\"#/about/help#organizer\">Organisateur</a></li>" +
    "          	<li><a href=\"#/about/help#participant\">Participant</a></li>" +
    "          	<li><a href=\"#/about/help#security\">Sécurité</a></li>" +
    "		</ul>" +
    "" +
    "		<hr />" +
    "		" +
    "		<div id=\"general\">" +
    "			<h3>Généralités</h3>" +
    "			" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Est-ce qu’Ottercamp est légal, et puis-je gagner de l'argent avec ?</h4>" +
    "				<p class=\"text-justify\">" +
    "					Il est tout à fait légal d'organiser des activités avec d'autres personnes, de les recevoir chez soi ou en exterieur et même d'être payé pour cela. De base, le système de paiement d'Ottercamp est prévu uniquement pour compenser les frais que vous pourriez engager afin d'assurer le bon déroulement de votre activité. Cependant, Si vous souhaitez dégager des bénéfices quant à l'organisation d'activités, ce qui est tout à fait possible, il peut exister certaines restrictions liées à la législation de votre pays. Il vous faudra donc vous en informer." +
    "				</p>" +
    "			</div>" +
    "" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Est-ce payant d’utiliser Ottercamp ?</h4>" +
    "				<p class=\"text-justify\">" +
    "					L’utilisation d’Ottercamp est totalement gratuite et vous permet de participer aux activités de votre choix. Cependant certains organisateurs, en fonction de l’activité qu’ils vous proposent, peuvent demander une participation financière de votre part. Cela leur permet de rembourser les frais engagés dans la planification de leur activité." +
    "				</p>" +
    "			</div>" +
    "" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Comment les prix sont-ils déterminés ?</h4>" +
    "				<p class=\"text-justify\">" +
    "					L’organisateur d’une activité fixe lui même le prix par participant qu’il estime le plus juste. Ce prix est censé lui garantir un remboursement intégral des frais engagés dans la planification de son activité. Ottercamp ajoute ensuite une commission sur ce prix." +
    "					Les commissions fonctionnent par pallier de 5 euros et correspondent à 10% du maximum du pallier. Pour un évènement à 7€ par exemple, la commission sera de 10% de 10€ soit 1€. Le prix payé par le participant sera donc de 8€." +
    "				</p>" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		<hr />" +
    "		" +
    "		<div id=\"account\">" +
    "			<h3>Mon compte</h3>" +
    "			" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Je n'ai pas reçu l'email de confirmation de mon compte</h4>" +
    "				<p class=\"text-justify\">" +
    "					Il se peut que cet email soit arrivé dans le dossier SPAM de votre messagerie. Si jamais il ne se trouvait pas la non plus, vous pouez demander l'envoi d'un nouvel email depuis Ottercamp." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Que se passe t'il si je ne confirme pas mon compte</h4>" +
    "				<p class=\"text-justify\">" +
    "					Pour des mesures de sécurité, Ottercamp supprime définitivement tous les comptes qui n'ont pas été confirmés dans les 48h après leur création." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>J'ai oublié mon mot de passe</h4>" +
    "				<p class=\"text-justify\">" +
    "					Si jamais cela se produit, vous pouvez cliquer sur le lien \"Oubli de mot de passe\" présent dans le formulaire de connexion. Un lien vous sera envoyé par email et vous permettra de définir un nouveau mot de passe." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Pourquoi dois-je indiquer mon adresse email et mon numéro de téléphone ?</h4>" +
    "				<p class=\"text-justify\">" +
    "					Afin que l’organisation d’activité se déroule dans les meilleures conditions nous avons besoin de ces informations pour que les participants à vos activités puissent vous joindre en cas de problème (annulation de dernière minute, retard, …). Ces informations ne sont transmises qu’aux participants de vos activités et sont indisponibles pour tous les autres utilisateurs." +
    "					De plus, les participants vous feront plus confiance si vous remplissez ces informations, ce qui vous aidera à organiser des activités à succès." +
    "				</p>" +
    "			</div>" +
    "" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Pourquoi dois-je indiquer mon adresse ?</h4>" +
    "				<p class=\"text-justify\">" +
    "					Votre adresse est facultative mais vous offrira une meilleure expérience sur Ottercamp. Grâce à celle-ci vous pourrez organiser rapidement des activités à votre domicile, ou en rechercher proche de celui-ci en un rien de temps." +
    "				</p>" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		<hr />" +
    "		" +
    "		<div id=\"organizer\">" +
    "			<h3>Organisateur</h3>" +
    "			" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Puis-je refuser des participants ?</h4>" +
    "				<p class=\"text-justify\">" +
    "					Vous avez tout à fait le droit de refuser qui vous voulez si cette personne vous apparaît peu fiable. Lorsqu’une personne souhaite participer à une de vos activités, il vous faudra à chaque fois l’approuver sans quoi elle n’aura pas accès aux données confidentielles de votre évènement telle que l’adresse exacte ou vos coordonnées." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Comment et à quel moment suis-je payé ?</h4>" +
    "				<p class=\"text-justify\">" +
    "					Lorsque vous organisez une activité et décidez de la rendre payante, nous vous demandons de nous indiquer votre Relevé d’Identité Bancaire (RIB). Grâce à celui-ci, dès que votre activité est terminée, nous pouvons effectuer un virement sur votre compte bancaire." +
    "				</p>" +
    "			</div>" +
    "" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Suis-je payé si un participant ne vient pas à une activité payante ?</h4>" +
    "				<p class=\"text-justify\">" +
    "					Si cette personne n’a pas annulé sa participation dans les 48h précédant l’évènement, vous serez payé." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Pourquoi les participations à mes activités payantes sont-elles fermées 48h avant ?</h4>" +
    "				<p class=\"text-justify\">" +
    "					Dans certains cas, lorsque votre évènement est payant et que vous avez défini un nombre de places limitées pour votre activité, nous fermons les participations pour que vous ayez le temps de faire les courses nécessaires au bon déroulement. Nous ne voulons pas que vous vous retrouviez avec des participations de dernière minute qui remettent en cause toute votre organisation." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Pourquoi mon activité s'annule t'elle toute seule ?</h4>" +
    "				<p class=\"text-justify\">" +
    "					Dans certains cas, lorsque votre évènement est payant et que vous avez défini un nombre de places limitées pour votre activité, nous annulons votre évènement 48h avant si le nombre de participations minimum n'a pas été atteint. Cela dans le but de vous éviter de dépenser de l'argent pour une activité qui n'aura pas lieu." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Mon activitée a été archivée, qu'est ce que c'est ?</h4>" +
    "				<p class=\"text-justify\">" +
    "					Lorsque tout se passe bien, nous archivons automatiquement vos évènements. Cela signifie simplement que celui-ci est terminé, et que plus personne ne pourra le rejoindre. Il n'apparaitra plus non plus dans les résultats de la recherche." +
    "				</p>" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		<hr />" +
    "		" +
    "		<div id=\"participant\">" +
    "			<h3>Participant</h3>" +
    "" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Suis-je remboursé si j’annule ma participation à une activité payante ?</h4>" +
    "				<p class=\"text-justify\">" +
    "					Si vous pensez à annuler votre participation plus de 48h à l’avance vous serez remboursé intégralement à l’exception de notre commission." +
    "				</p>" +
    "			</div>" +
    "" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Suis-je remboursé si l’organisateur annule son activité ?</h4>" +
    "				<p class=\"text-justify\">" +
    "					Oui, vous serez remboursé intégralement à l’exception de notre commission." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Pourquoi n’ai-je que 24h pour payer mes participations ?</h4>" +
    "				<p class=\"text-justify\">" +
    "					Dans certains cas, lorsqu’un évènement est payant et que l’organisateur a défini un nombre de places limitées pour son activité, nous ne pouvons réserver votre place indéfiniment. Cela empêche une autre personne de participer et pourrait conduire au non déroulement de l’activité si vous tardiez trop." +
    "				</p>" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		<hr />" +
    "		" +
    "		<div id=\"security\">" +
    "			<h3>Sécurité</h3>" +
    "			" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Le système de paiement est-il sécurisé ?</h4>" +
    "				<p class=\"text-justify\">" +
    "					Oui, il est extrêmement sécurisé. Nous ne gérons pas les paiements nous même, car pour vous offrir un maximum de sécurité nous avons choisi de déléguer cette tâche à l’entreprise Leetchi, une spécialiste du domaine." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"margin-bottom padding-top\">" +
    "				<h4>Comment Ottercamp me protège t’il ?</h4>" +
    "				<p class=\"text-justify\">" +
    "					Que vous soyez un organisateur ou un participant, nous faisons notre maximum pour votre sécurité. Chacune de vos informations personnelles est protégée :" +
    "					<ul>" +
    "						<li>" +
    "							Votre adresse email n’est transmise qu’aux participants de vos activités" +
    "						</li>" +
    "						<li>" +
    "							Votre numéro de téléphone n’est transmis qu’aux participants de vos activités" +
    "						</li>" +
    "						<li>" +
    "							Votre adresse n’est transmise qu’aux participants de vos activités si celles-ci se déroulent à votre domicile" +
    "						</li>" +
    "						<li>" +
    "							Votre nom de famille n’est jamais transmis" +
    "						</li>" +
    "					</ul>" +
    "					De plus chaque utilisateur se voit attribuer une note de confiance appelée “karma”. Cette note est générée en fonction du nombre d’évènements annulés par l’utilisateur, ainsi que par un questionnaire rempli par tous les autres utilisateurs l’ayant rencontré." +
    "				</p>" +
    "			</div>" +
    "		</div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/about/includes/menu.html",
    "<ul class=\"nav nav-list block\">" +
    "  	<li class=\"nav-header header padding\">{{'label_navigation'|trad}}</li>" +
    "  	" +
    " 	<li><a href=\"#/about\">Ottercamp</a></li>" +
    " 	<li><a href=\"#/about/press\">{{'label_press'|trad}}</a></li>" +
    "	<li><a href=\"#/about/team\">{{'label_team'|trad}}</a></li>" +
    "	<li><a href=\"#/about/policies\">{{'label_policies'|trad}}</a></li>" +
    "	<li><a href=\"#/about/privacy\">{{'label_privacy'|trad}}</a></li>" +
    "	<li><a href=\"#/about/help\">{{'label_help'|trad}}</a></li>" +
    "	<li><a href=\"#/about/contact\">{{'label_contact'|trad}}</a></li>" +
    "	<li><a href=\"#/about/credits\">{{'label_credits'|trad}}</a></li>" +
    "</ul>"
  );

  $templateCache.put("assets/dev/views/about/includes/ottercamp.html",
    "<div class=\"tabbable\">" +
    "	<div class=\"padding\">" +
    "		<ul class=\"nav nav-tabs\">" +
    "			<li class=\"active\">" +
    "				<a href=\"#perso\" data-toggle=\"tab\">Ottercamp pour les particuliers</a>" +
    "			</li>" +
    "			<li>" +
    "				<a href=\"#pro\" data-toggle=\"tab\">Ottercamp pour les professionnels</a>" +
    "			</li>" +
    "		</ul>" +
    "	</div>" +
    "	" +
    "	<div class=\"tab-content\">" +
    "		<div class=\"tab-pane active\" id=\"perso\">" +
    "			<div class=\"padding\">" +
    "				<div class=\"row-fluid\">" +
    "					<div class=\"span4 alert alert-info row-fluid\" style=\"line-height:normal;\">" +
    "						<div class=\"span4\">" +
    "							<i class=\"pull-right\" style=\"color:#d2556c; font-size: 150px;\">5</i>" +
    "						</div>" +
    "		" +
    "						<div class=\"span8\" style=\"color:#666; font-size:25px; font-style:italic;\">" +
    "							millions de personnes veulent faire de nouvelles rencontres" +
    "						</div>" +
    "					</div>" +
    "		" +
    "					<div class=\"span4 alert alert-info row-fluid\" style=\"line-height:normal;\">" +
    "						<div class=\"span4\">" +
    "							<i class=\"pull-right\" style=\"color:#d2556c; font-size: 150px;\">6</i>" +
    "						</div>" +
    "		" +
    "						<div class=\"span8\" style=\"color:#666; font-size:25px; font-style:italic;\">" +
    "							millions de personnes vont déménager cette année" +
    "						</div>" +
    "					</div>" +
    "		" +
    "					<div class=\"span4 alert alert-info row-fluid\" style=\"line-height:normal;\">" +
    "						<div class=\"span6\">" +
    "							<i class=\"pull-right\" style=\"color:#d2556c; font-size: 150px;\">20</i>" +
    "						</div>" +
    "		" +
    "						<div class=\"span6\" style=\"color:#666; font-size:25px; font-style:italic;\">" +
    "							millions de personnes ne partiront pas en vacances cette année" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding\" style=\"background-color:#EDEDED; padding-top: 50px; padding-bottom: 50px;\">" +
    "				<div class=\"text-justify\" style=\"font-size:30px; color:#666; line-height:normal;\">" +
    "					Vous voulez sortir ? Faire de nouvelles rencontres ? Participer à des activités incroyables ?  Ottercamp est une plateforme sociale qui vous permet de trouver ou d'organiser des activités à faire avec des personnes proches de chez vous." +
    "				</div>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding\" style=\"padding-top: 50px; padding-bottom: 50px;\">" +
    "				<div class=\"row-fluid\">" +
    "					<div class=\"span4\">" +
    "						<i class=\"icon-map-marker icon-large pull-right\" style=\"color:#d2556c; font-size: 150px;\"></i>" +
    "					</div>" +
    "" +
    "					<div class=\"span8\" style=\"line-height:normal;\">" +
    "						<div style=\"color:#7dc7cb; font-size:75px;\">" +
    "							Découvrez" +
    "						</div>" +
    "						<div style=\"color:#666; font-size:35px;\">" +
    "							des activités proches de chez vous" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "	" +
    "				<div class=\"row-fluid\" style=\"margin-top:50px;\">" +
    "					<div class=\"span6 row-fluid\">" +
    "						<div class=\"span4\">" +
    "							<i class=\"icon-group icon-large pull-right\" style=\"color:#d2556c; font-size: 150px;\"></i>" +
    "						</div>" +
    "	" +
    "						<div class=\"span8\" style=\"line-height:normal;\">" +
    "							<div style=\"color:#7dc7cb; font-size:75px;\">" +
    "								Participez" +
    "							</div>" +
    "							<div style=\"color:#666; font-size:35px;\">" +
    "								à celles qui vous conviennent" +
    "							</div>" +
    "						</div>" +
    "					</div>" +
    "	" +
    "					<div class=\"span6 row-fluid\">" +
    "						<div class=\"span4\">" +
    "							<i class=\"icon-calendar pull-right\" style=\"color:#d2556c; font-size: 150px;\"></i>" +
    "						</div>" +
    "	" +
    "						<div class=\"span8\" style=\"line-height:normal;\">" +
    "							<div style=\"color:#7dc7cb; font-size:75px;\">" +
    "								Organisez" +
    "							</div>" +
    "							<div style=\"color:#666; font-size:35px;\">" +
    "								les activités qui vous passionnent" +
    "							</div>" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "	" +
    "				<div class=\"row-fluid\" style=\"margin-top:50px;\">" +
    "					<div class=\"span4\">" +
    "						<i class=\"icon-comments-alt icon-large pull-right\" style=\"color:#d2556c; font-size: 150px;\"></i>" +
    "					</div>" +
    "	" +
    "					<div class=\"span8\" style=\"line-height:normal;\">" +
    "						<div style=\"color:#7dc7cb; font-size:75px;\">" +
    "							Contactez" +
    "						</div>" +
    "						<div style=\"color:#666; font-size:35px;\">" +
    "							les autres participants pour faire leur connaissance" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "	" +
    "				<div class=\"row-fluid\" style=\"margin-top:50px;\">" +
    "					<div class=\"span4\">" +
    "						<i class=\"icon-thumbs-up icon-large pull-right\" style=\"color:#d2556c; font-size: 150px;\"></i>" +
    "					</div>" +
    "	" +
    "					<div class=\"span8\" style=\"line-height:normal;\">" +
    "						<div style=\"color:#7dc7cb; font-size:75px;\">" +
    "							Amusez-vous" +
    "						</div>" +
    "						<div style=\"color:#666; font-size:35px;\">" +
    "							avec vos nouveaux amis au cours d'activités passionnantes" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "	" +
    "				<div class=\"row-fluid\" style=\"margin-top:50px;\">" +
    "					<div class=\"span4\">" +
    "						<i class=\"icon-camera-retro icon-large pull-right\" style=\"color:#d2556c; font-size: 150px;\"></i>" +
    "					</div>" +
    "	" +
    "					<div class=\"span8\" style=\"line-height:normal;\">" +
    "						<div style=\"color:#7dc7cb; font-size:75px;\">" +
    "							Revivez l'instant" +
    "						</div>" +
    "						<div style=\"color:#666; font-size:35px;\">" +
    "							en partageant vos photos et commentaires" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding\" style=\"background-color:#EDEDED; padding-top: 50px; padding-bottom:50px;\">" +
    "				<div class=\"row-fluid\">" +
    "					<div class=\"span6 row-fluid\">" +
    "						<div class=\"span2\">" +
    "							<img src=\"assets/images/frodon.jpg\" />" +
    "						</div>" +
    "						" +
    "						<div class=\"span10\">" +
    "							<blockquote>" +
    "							  <p style=\"font-size: 25px; font-style:italic;\" class=\"text-justify\">\"Grâce à Ottercamp je me suis fait 8 nouveaux amis et j'ai enfin pu organiser la randonnée dont j'ai toujours rêvé.\"</p>" +
    "							  <small>Frodon Sacquet</small>" +
    "							</blockquote>" +
    "						</div>" +
    "					</div>" +
    "					" +
    "					<div class=\"span6 row-fluid\">" +
    "						<div class=\"span2\">" +
    "							<img src=\"assets/images/dude.jpg\" />" +
    "						</div>" +
    "						" +
    "						<div class=\"span10\">" +
    "							<blockquote>" +
    "							  <p style=\"font-size: 25px; font-style:italic;\" class=\"text-justify\">\"Au début je cherchais surtout à rencontrer des partenaires pour jouer au bowling, mais petit à petit je me suis ouvert à de nouveaux horizons et je ne le regrette pas.\"</p>" +
    "							  <small>Jeffrey Lebowski</small>" +
    "							</blockquote>" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "			</div>" +
    "			" +
    "			<div class=\"marketing panel\" ng-hide=\"user\" style=\"padding-top:50px; padding-bottom:50px;\">			" +
    "				<div class=\"margin-bottom\">" +
    "					<a fade=\"\" href=\"register\" class=\"btn btn-info btn-large\">Inscrivez-vous dès maintenant</a>" +
    "				</div>" +
    "		" +
    "				<p class=\"marketing-byline\">" +
    "					Et rejoignez vos amis qui ont déja franchi le pas" +
    "				</p>" +
    "		" +
    "				<div class=\"fb-facepile\" data-href=\"http://facebook.com/ottercamp\" data-app-id=\"125408324323674\" data-max-rows=\"1\" data-size=\"large\" data-width=\"1170\"></div>" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		" +
    "		" +
    "		" +
    "		" +
    "		" +
    "		" +
    "		" +
    "		" +
    "		" +
    "		<div class=\"tab-pane\" id=\"pro\">" +
    "			<!--<div class=\"padding\">" +
    "				<div class=\"row-fluid\">" +
    "					<div class=\"span4 alert alert-info row-fluid\" style=\"line-height:normal;\">" +
    "						<div class=\"span4\">" +
    "							<i class=\"pull-right\" style=\"color:#d2556c; font-size: 150px;\">5</i>" +
    "						</div>" +
    "		" +
    "						<div class=\"span8\" style=\"color:#666; font-size:25px; font-style:italic;\">" +
    "							millions de personnes veulent faire de nouvelles rencontres" +
    "						</div>" +
    "					</div>" +
    "		" +
    "					<div class=\"span4 alert alert-info row-fluid\" style=\"line-height:normal;\">" +
    "						<div class=\"span4\">" +
    "							<i class=\"pull-right\" style=\"color:#d2556c; font-size: 150px;\">6</i>" +
    "						</div>" +
    "		" +
    "						<div class=\"span8\" style=\"color:#666; font-size:25px; font-style:italic;\">" +
    "							millions de personnes vont déménager cette année" +
    "						</div>" +
    "					</div>" +
    "		" +
    "					<div class=\"span4 alert alert-info row-fluid\" style=\"line-height:normal;\">" +
    "						<div class=\"span6\">" +
    "							<i class=\"pull-right\" style=\"color:#d2556c; font-size: 150px;\">20</i>" +
    "						</div>" +
    "		" +
    "						<div class=\"span6\" style=\"color:#666; font-size:25px; font-style:italic;\">" +
    "							millions de personnes ne partiront pas en vacances cette année" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "			</div>-->" +
    "			" +
    "			<div class=\"padding\" style=\"background-color:#EDEDED; padding-top: 50px; padding-bottom: 50px;\">" +
    "				<div class=\"text-justify\" style=\"font-size:30px; color:#666; line-height:normal;\">" +
    "					Vous voulez vous faire <b>connaître</b> ? <b>Organiser des évènements</b> ? <b>Rencontrer votre communauté</b> ? Ottercamp est une plateforme sociale qui vous permet d'organiser des évènements et de les référencer afin que des utilisateurs puissent s'y inscrire." +
    "				</div>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding\" style=\"padding-top: 50px; padding-bottom: 50px;\">" +
    "				<div class=\"row-fluid\">" +
    "					<div class=\"span4\">" +
    "						<i class=\"icon-sitemap icon-large pull-right\" style=\"color:#d2556c; font-size: 150px;\"></i>" +
    "					</div>" +
    "" +
    "					<div class=\"span8\" style=\"line-height:normal;\">" +
    "						<div style=\"color:#7dc7cb; font-size:75px;\">" +
    "							Référencez" +
    "						</div>" +
    "						<div style=\"color:#666; font-size:35px;\">" +
    "							votre entreprise sur notre plateforme" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "				" +
    "				<div class=\"row-fluid\" style=\"margin-top:50px;\">" +
    "					<div class=\"span4\">" +
    "						<i class=\"icon-calendar icon-large pull-right\" style=\"color:#d2556c; font-size: 150px;\"></i>" +
    "					</div>" +
    "	" +
    "					<div class=\"span8\" style=\"line-height:normal;\">" +
    "						<div style=\"color:#7dc7cb; font-size:75px;\">" +
    "							Organisez" +
    "						</div>" +
    "						<div style=\"color:#666; font-size:35px;\">" +
    "							vos évènements et activités" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "				" +
    "				<div class=\"row-fluid\" style=\"margin-top:50px;\">" +
    "					<div class=\"span4\">" +
    "						<i class=\"icon-facebook-sign icon-large pull-right\" style=\"color:#d2556c; font-size: 150px;\"></i>" +
    "					</div>" +
    "	" +
    "					<div class=\"span8\" style=\"line-height:normal;\">" +
    "						<div style=\"color:#7dc7cb; font-size:75px;\">" +
    "							Promouvez" +
    "						</div>" +
    "						<div style=\"color:#666; font-size:35px;\">" +
    "							votre entreprise et vos évènements sur les différents réseaux sociaux" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "				" +
    "				<div class=\"row-fluid\" style=\"margin-top:50px;\">" +
    "					<div class=\"span4\">" +
    "						<i class=\"icon-cogs icon-large pull-right\" style=\"color:#d2556c; font-size: 150px;\"></i>" +
    "					</div>" +
    "" +
    "					<div class=\"span8\" style=\"line-height:normal;\">" +
    "						<div style=\"color:#7dc7cb; font-size:75px;\">" +
    "							Administrez" +
    "						</div>" +
    "						<div style=\"color:#666; font-size:35px;\">" +
    "							les personnes qui souhaitent participer" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "				" +
    "				<div class=\"row-fluid\" style=\"margin-top:50px;\">" +
    "					<div class=\"span4\">" +
    "						<i class=\"icon-credit-card pull-right\" style=\"color:#d2556c; font-size: 150px;\"></i>" +
    "					</div>" +
    "" +
    "					<div class=\"span8\" style=\"line-height:normal;\">" +
    "						<div style=\"color:#7dc7cb; font-size:75px;\">" +
    "							Récoltez" +
    "						</div>" +
    "						<div style=\"color:#666; font-size:35px;\">" +
    "							leurs contributions financières pour participer" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "				" +
    "				<div class=\"padding text-center\" style=\"margin-top:50px; font-size: 25px; padding-top: 50px; padding-bottom: 50px; background-color:#EDEDED;\">" +
    "					Et pour les entreprises, sites et blogs qui ont une forte communauté d'utilisateurs" +
    "				</div>" +
    "				" +
    "				<div class=\"row-fluid\" style=\"margin-top:50px;\">" +
    "					<div class=\"span4\">" +
    "						<i class=\"icon-bookmark icon-large pull-right\" style=\"color:#d2556c; font-size: 150px;\"></i>" +
    "					</div>" +
    "	" +
    "					<div class=\"span8\" style=\"line-height:normal;\">" +
    "						<div style=\"color:#7dc7cb; font-size:75px;\">" +
    "							Intégrez notre widget" +
    "						</div>" +
    "						<div style=\"color:#666; font-size:35px;\">" +
    "							sur votre site pour promouvoir votre entreprise et vos évènements" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "				" +
    "				<div class=\"row-fluid\" style=\"margin-top:50px;\">" +
    "					<div class=\"span4\">" +
    "						<i class=\"icon-group icon-large pull-right\" style=\"color:#d2556c; font-size: 150px;\"></i>" +
    "					</div>" +
    "	" +
    "					<div class=\"span8\" style=\"line-height:normal;\">" +
    "						<div style=\"color:#7dc7cb; font-size:75px;\">" +
    "							Laissez vos utilisateurs" +
    "						</div>" +
    "						<div style=\"color:#666; font-size:35px;\">" +
    "							organiser des activités entre eux pour se rencontrer" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "			</div>" +
    "			" +
    "			<div class=\"marketing panel\" ng-hide=\"user\" style=\"background-color:#EDEDED; padding-top:50px; padding-bottom:50px;\">			" +
    "				<div class=\"margin-bottom\">" +
    "					<a fade=\"\" href=\"register\" class=\"btn btn-info btn-large\">Inscrivez-vous dès maintenant</a>" +
    "				</div>" +
    "		" +
    "				<p class=\"marketing-byline\">" +
    "					Et proposez vos évènements à notre base d'utilisateurs" +
    "				</p>" +
    "		" +
    "				<div class=\"fb-facepile\" data-href=\"http://facebook.com/ottercamp\" data-app-id=\"125408324323674\" data-max-rows=\"1\" data-size=\"large\" data-width=\"1170\"></div>" +
    "			</div>" +
    "		</div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/about/includes/policies.html",
    "<div class=\"span9 block margin-top\">" +
    "	<div class=\"header nav-header padding\">{{'label_policies'|trad}}</div>" +
    "	" +
    "	<div class=\"padding margin-top text-justify\">" +
    "		<p>" +
    "			Ces Conditions d'Utilisation (\"Conditions\") régissent vos accès et utilisation des services, en ce compris notamment, nos différents sites Internet,les API, les applications, les boutons, les notifications e-mail, et toute autre information, textes, graphiques, photos mis en ligne, téléchargés ou figurant dans les services (collectivement dénommés les “Contenus\"). Votre accès et votre utilisation des Services sont conditionnés à votre acceptation et le respect des présentes Conditions. En accédant aux Services ou en les utilisant, vous acceptez d'être lié par ces Conditions." +
    "		</p>" +
    "		" +
    "		<div class=\"padding-top margin-bottom\">" +
    "			<h3>1. Conditions de base</h3>" +
    "			" +
    "			<p>" +
    "				Vous êtes responsable de votre utilisation des services, des contenus que vous publiez sur les services, et de toute conséquence qui en découlerait. Les contenus que vous soumettez, postez, ou affichez sont susceptibles d'être vus par d'autres utilisateurs des services et au travers de services et sites web fournis par des tiers. Vous ne devriez fournir que des contenus que vous souhaitez partager avec d'autres utilisateurs conformément aux présentes conditions." +
    "			</p>" +
    "			" +
    "			<div class=\"alert alert-info\">Votre profil et vos activités organisées sont visibles publiquement par tout le monde.</div>" +
    "			" +
    "			<p>" +
    "				Vous pouvez utiliser les services uniquement si vous avez la capacité de conclure un contrat avec Ottercamp et si vous n'êtes pas interdit de recevoir des services en vertu des lois applicables. Si vous acceptez ces Conditions et utilisez les services au nom d'une entreprise, organisation, gouvernement ou autre entité juridique, vous déclarez et garantissez que vous êtes autorisé à le faire. Vous ne pouvez utiliser les services qu'en conformité avec les présentes Conditions et toutes les lois, règles et règlements applicables qu'ils soient locaux, étatiques, nationaux et internationaux." +
    "				<br />" +
    "				Les services fournis par Ottercamp sont en constante évolution. La forme et la nature des services fournis par Ottercamp peuvent changer à tout moment sans préavis. De plus, Ottercamp peut cesser (définitivement ou temporairement) de fournir les services (ou toutes fonctionnalité inclue dans les services), à vous ou aux utilisateurs en général, sans qu’Ottercamp puisse être en mesure de vous en aviser préalablement. Nous nous réservons également le droit de définir à notre seule discrétion des limites sur l'utilisation et le stockage, à tout moment et sans préavis." +
    "			</p>" +
    "		</div>" +
    "		" +
    "		<div class=\"padding-top margin-bottom\">" +
    "			<h3>2. Confidentialité</h3>" +
    "			" +
    "			<p>" +
    "				Toute information que vous communiquez à Ottercamp est soumise à notre <a href=\"#/about/privacy\" target=\"_blank\">Politique de Confidentialité</a>, qui régit la collecte et l'utilisation de vos informations. Vous comprenez qu'en utilisant nos services, vous consentez à la collecte et l'utilisation (ainsi qu'il est énoncé dans la Politique de Confidentialité) de cette information, y compris le transfert de cette information aux États-Unis et / ou dans d'autres pays à des fins de stockage, de traitement et d'utilisation par Ottercamp. Dans le cadre de la fourniture des services, nous pouvons être amenés à vous adresser certaines communications, telles que des annonces de service et des messages administratifs. Ces communications sont considérées comme partie intégrante des services et de votre compte Ottercamp, de sorte qu'il n'est pas certain que vous puissiez vous opposer à leur réception." +
    "			</p>" +
    "		</div>" +
    "		" +
    "		<div class=\"padding-top margin-bottom\">" +
    "			<h3>3. Les mots de passe</h3>" +
    "			" +
    "			<p>" +
    "				Vous êtes responsable de la protection du mot de passe que vous utilisez pour accéder aux services et pour toutes les activités ou les actions faites après authentification avec votre mot de passe. Nous vous encourageons à utiliser pour votre compte des mots de passe forts (mots de passe constitués d'une combinaison de lettres majuscules et minuscules, de chiffres et de caractères spéciaux). Ottercamp ne saurait être responsable d'un quelconque dommage résultant d'un manquement de votre part sur ce qui précède." +
    "			</p>" +
    "		</div>" +
    "		" +
    "		<div class=\"padding-top margin-bottom\">" +
    "			<h3>4. Contenus avec les Services</h3>" +
    "		" +
    "			<p>" +
    "				Tous les contenus, qu'il s'agisse des contenus publiés ou communiqués à titre public ou privé, sont placés sous la seule responsabilité de la personne à l'origine de la communication de ces contenus. Ottercamp n'est pas en mesure de surveiller ou de contrôler les contenus postés au travers des services, et ne peut engager sa responsabilité vis-à-vis de ces contenus. Vous reconnaissez que toute utilisation des contenus publiés au travers des services, est à vos entiers risques et périls." +
    "				<br />" +
    "				L'exhaustivité, la véracité, l'exactitude, ou la fiabilité des contenus ou des informations publiés au travers des services n'est en aucune manière assumée, supportée, revendiquée ou garantie par Ottercamp. Vous comprenez qu'en utilisant les services, vous pouvez être exposé à des contenus qui pourraient être inexacts ou, dans certains cas, des messages mal titrés ou trompeurs. En aucun cas, Ottercamp ne pourra être tenue responsable de quelque manière que ce soit d'un quelconque dommage ou perte, de quelque nature que ce soit, résultant de l'utilisation des contenus, y compris, de manière non exhaustive, en cas d'erreur ou omission dans les contenus, que ces contenus soient affichés, transmis par courrier électronique, transmis ou rendus disponibles d'une autre manière au moyen des services ou diffusés autrement." +
    "			</p>" +
    "		</div>" +
    "		" +
    "		<div class=\"padding-top margin-bottom\">" +
    "			<h3>5. Vos droits</h3>" +
    "		" +
    "			<p>" +
    "				Vous conservez vos droits sur tous les contenus que vous soumettez, postez ou publiez sur ou par l'intermédiaire des services. En soumettant, postant ou publiant des contenus sur ou par le biais des services, vous nous accordez une licence mondiale, non-exclusive, gratuite, incluant le droit d'accorder une sous-licence, d'utiliser, de copier, de reproduire, de traiter, d'adapter, de modifier, de publier, de transmettre, d'afficher et de distribuer ces Contenus sur tout support par toute méthode de distribution connu ou amené à exister." +
    "			</p>" +
    "		" +
    "			<div class=\"alert alert-info\">Cette licence signifie que vous nous autorisez à mettre vos activités à la disposition du reste du monde et que vous permettez aux autres d'en faire de même.</div>" +
    "		" +
    "			<p>	" +
    "				Vous consentez à ce que cette licence comprenne le droit pour Ottercamp de fournir, de promouvoir et d'améliorer les services et de mettre les contenus publiés ou transmis au travers des services à disposition d'autres sociétés, organisations ou individus en partenariat avec Ottercamp pour l'agrégation, la diffusion, la distribution ou la publication de ces contenus sur d'autres supports, médias et services, dans la limite des termes de ces Conditions pour l'utilisation de ces contenus." +
    "			</p>" +
    "			" +
    "			<div class=\"alert alert-info\">Ottercamp applique un ensemble évolutif de règles sur la manière dont les partenaires de l'écosystème peuvent interagir avec vos contenus. Ces règles ont été conçues pour mettre en place un écosystème ouvert, tenant compte de vos droits. Mais ce qui vous appartient vous appartient – vous restez propriétaire de vos contenus (et vos photos font partie de ces contenus).</div>" +
    "			" +
    "			<p>" +
    "				Ces usages supplémentaires par Ottercamp, ou d'autres sociétés, organisations ou individus en partenariat avec Ottercamp, peuvent être faits sans compensation à votre égard en ce qui concerne les contenus que vous soumettez, postez, transmettez ou rendez disponible au travers des services." +
    "				<br />" +
    "				Nous pouvons modifier ou adapter vos contenus afin de les transmettre, afficher ou distribuer sur des réseaux informatiques et sur différents médias et / ou apporter des changements nécessaires à vos contenus afin de les rendre conformes aux exigences ou limitations de tous réseaux, équipements, services ou médias." +
    "				<br />" +
    "				Vous êtes responsable de l'utilisation que vous faites des services, des contenus que vous communiquez, et de toutes leurs conséquences, y compris de l'utilisation de vos contenus par nos partenaires tiers. Vous comprenez que vos contenus peuvent faire l'objet d'une agrégation, d'une diffusion, d'une distribution ou d'une publication par nos partenaires. Si vous ne disposez pas des droits nécessaires à la communication de ces contenus pour une telle utilisation, vous engagez votre responsabilité." +
    "				<br />" +
    "				Ottercamp ne saurait être tenu responsable des dommages résultant de l'utilisation de vos contenus par Ottercamp faite en conformité avec les présentes Conditions. Vous déclarez et garantissez que vous disposez des droits, des pouvoirs et des autorisations nécessaires pour concéder les droits accordés en vertu des présentes sur les Contenus que vous soumettez." +
    "			</p>" +
    "		</div>" +
    "		" +
    "		" +
    "		<div class=\"padding-top margin-bottom\">" +
    "			<h3>6. Votre Licence d'utilisation des services</h3>" +
    "			" +
    "			<p>" +
    "				Ottercamp vous concède une licence mondiale personnelle, gratuite, incessible, et non exclusive d'utiliser le logiciel mis à votre disposition par Ottercamp dans le cadre des services. Cette licence a pour seul but de vous permettre d'utiliser et de bénéficier des services fournis par Ottercamp, en conformité avec les présentes Conditions." +
    "			</p>" +
    "		</div>" +
    "		" +
    "		<div class=\"padding-top margin-bottom\">" +
    "			<h3>7. Droits de Ottercamp</h3>" +
    "			" +
    "			<p>" +
    "				Tout droit, titre et intérêt dans les services (à l'exclusion des contenus communiqués par les utilisateurs) sont et restent la propriété exclusive d’Ottercamp et de ses concédants. Les services sont protégés au titre du droit d'auteur/Copyright, du droit des marques, et d'autres lois à la fois de France et des pays étrangers. Rien dans les présentes Conditions ne vous donne un droit d'utiliser le terme \"Ottercamp\" ou aucun des marques ni aucun des logos, noms de domaine et autres signes distinctifs d’Ottercamp. Toute remarque, commentaire ou suggestion que vous pourriez soumettre concernant Ottercamp ou les services est faite de manière libre et spontanée et nous serons libres d'utiliser ces réactions, commentaires ou suggestions comme bon nous semble et sans aucune obligation à votre égard." +
    "			</p>" +
    "		</div>" +
    "		" +
    "		<div class=\"padding-top margin-bottom\">" +
    "			<h3>8. Restrictions sur les contenus et utilisation des services</h3>" +
    "			" +
    "			<p>" +
    "				Nous nous réservons le droit à tout moment, (mais sans que cela constitue une obligation) de supprimer ou de refuser de distribuer des contenus sur les services, de suspendre ou de résilier des comptes utilisateurs, et de récupérer des noms d'utilisateur, sans engager notre responsabilité à votre égard. Nous nous réservons également le droit d'accéder, de lire, de conserver et de divulguer toute information que nous estimons raisonnablement nécessaire pour : (i) satisfaire à toute loi ou tout règlement applicable, ou à toute procédure judiciaire ou demande administrative, (ii) faire respecter les présentes Conditions, y compris dans le cadre de la recherche d'éventuelles violations des présentes Conditions, (iii) détecter, prévenir ou traiter les problèmes de fraude, de sécurité ou les problèmes techniques, (iv) répondre aux demandes de d'assistance des utilisateurs, ou (v) protéger les intérêts, les biens ou la sécurité d’Ottercamp, de ses utilisateurs et du public." +
    "			</p>" +
    "		" +
    "			<div class=\"alert alert-info\">Ottercamp ne divulgue pas de données à caractère personnel à des tiers autrement qu'en conformité avec sa Politique de Vie Privée.</div>" +
    "			" +
    "			<p>" +
    "				Sauf à ce que cela soit autorisé dans le cadre des services ou des présentes Conditions, vous avez l'obligation d'utiliser l'API de Ottercamp si vous souhaitez reproduire, modifier, créer des œuvres dérivées, distribuer, vendre, transférer, afficher publiquement, exécuter, transmettre ou utiliser d'une quelque autre manière les contenus ou les services." +
    "			</p>" +
    "			" +
    "			<div class=\"alert alert-info\">Nous encourageons et autorisons une large réutilisation du contenu. L'API d’Ottercamp existe pour permettre cela.</div>" +
    "			" +
    "			<p>" +
    "				Vous n'êtes pas autorisé à effectuer les actions suivantes en accédant ou en utilisant les services : (i) accéder à des zones non-publiques des services, des systèmes informatiques appartenant à Ottercamp ou à des systèmes techniques de fourniture des prestataires de Ottercamp, ni à les utiliser ou les altérer, (ii) sonder, scanner ou tester la vulnérabilité de tout système ou réseau ou enfreindre ou contourner les mesures de sécurité ou d'authentification, (iii) accéder ou tenter d'accéder aux services ou rechercher ou tenter de rechercher à travers les services, par tout moyen (automatisé ou non), autrement que par l'interface publique fournie par Ottercamp (et seulement dans les limites des présentes conditions), sauf si vous avez été expressément autorisé à le faire aux termes d'un accord séparé avec Ottercamp (NOTE: indexer les services est permis si cette opération est faite en conformité avec les dispositions comprises dans le fichier robots.txt. Néanmoins, aspirer les services sans l'accord préalable d’Ottercamp est expressément interdit), (iv) falsifier une en-tête de paquet TCP / IP ou toute partie de l'information dans l'en-tête d'un courriel ou post, ou utiliser d'une quelconque manière les services pour envoyer des informations altérées, trompeuses ou dont la source est faussement identifiée, ou (v) perturber ou interrompre (ou tenter de le faire) l'accès de tout utilisateur, hôte ou réseau, en ce compris notamment, l'envoi d'un virus, les opérations de type overloading, flooding, spamming, mail-bombing à l'encontre des services, ou en scriptant la création des contenus manière à interférer avec le service ou créer une charge indue sur les services." +
    "			</p>" +
    "		</div>" +
    "		" +
    "		<div class=\"padding-top margin-bottom\">" +
    "			<h3>9. Résiliation</h3>" +
    "			" +
    "			<p>" +
    "				Les Conditions continueront à s'appliquer jusqu'à leur résiliation par vous ou par Ottercamp selon les termes suivants." +
    "				<br />" +
    "				Vous pouvez mettre fin à votre accord avec Ottercamp à tout moment pour quelque raison que ce soit en nous envoyant un courrier électronique à <a href=\"mailto:contact@ottercamp.com\" target=\"_blank\">contact@ottercamp.com</a>" +
    "				<br />" +
    "				Nous pouvons suspendre ou résilier vos comptes ou cesser de vous fournir tout ou partie des services à tout moment pour quelque raison que ce soit, notamment si nous avons des motifs raisonnables de croire que : (i) vous avez violé les présentes Conditions, (ii) vous créez un risque juridique à notre encontre, ou (iii) la mise à disposition des services pour votre usage n'est plus économiquement viable. Nous mettrons en œuvre des moyens raisonnables pour vous en aviser, à l'adresse e-mail associée à votre compte ou lorsque vous tenterez d'accéder à votre compte." +
    "				<br />" +
    "				Dans tous les cas précités, les Conditions seront résiliées, ce qui inclue, sans limitation, la licence d'utilisation des Services dont vous bénéficiez, sauf pour les sections suivantes qui continuent de s'appliquer : 4, 5, 7, 8, 10, 11 et 12." +
    "				<br />" +
    "				Rien dans la présente section n'affecte le droit d’Ottercamp de modifier, de limiter ou d'arrêter la mise à disposition des Services, sans préavis, tel que prévu ci-dessus dans la section 1." +
    "			</p>" +
    "		</div>" +
    "		" +
    "		<div class=\"padding-top margin-bottom\">" +
    "			<h3>10 Avertissements et limitations de responsabilité</h3>" +
    "			" +
    "			<p>" +
    "				Veuillez lire attentivement cette section car elle a pour objet de limiter la responsabilité d’Ottercamp et de ses dirigeants, employés, mandataires et partenaires. Chacune des sous-sections ci-dessous s'applique dans la limite la plus étendue autorisée par des dispositions légales applicables. Certaines lois nationales n'autorisent pas l'exclusion des garanties implicites ou les limitations de responsabilité dans les contrats, et en conséquence les dispositions de cette section peuvent ne pas s'appliquer à vous. Rien dans la présente section n'est destiné à limiter les droits que vous pourriez avoir qui ne peuvent être légalement limités." +
    "			</p>" +
    "			" +
    "			<div class=\"padding-top margin-bottom\">" +
    "				<h4>A. Les Services sont fournis \"EN L'ETAT\".</h4>" +
    "				" +
    "				<p>" +
    "					Vous utilisez et accédez aux Services et aux Contenus à vos entiers risques et périls. Vous comprenez et acceptez que les services vous sont fournis \"EN L'ETAT\" et \"TELS QUE DISPONIBLES\". Sans préjudice de ce qui précède, et dans les limites les plus étendues autorisées par la loi applicable, les ENTITÉS OTTERCAMP EXCLUENT TOUTES GARANTIES, EXPRESSES OU IMPLICITES, DE QUALITE MARCHANDE, D'ADEQUATION A UN USAGE PARTICULIER OU GARANTIES D'EVICTION." +
    "					<br />" +
    "					Les Entités Ottercamp ne donnent aucune garantie et déclinent toute responsabilité s'agissant : (i) de l'exhaustivité, l'exactitude, la disponibilité, la ponctualité, la sécurité ou la fiabilité des services ou des contenus, (ii) des dommages subis par votre système informatique, ou des pertes de données, ou autres dommages résultant de votre accès ou utilisation des services ou des contenus, (iii) de la suppression des contenus et autres communications gérés par les services ou de l'échec de leur conservation ou transmission, et (iv) de savoir si les services répondent à vos besoins ou seront disponibles de manière ininterrompue, sécurisée ou exempte d'erreurs. Aucun conseil et aucune information, qu'ils soient oraux ou écrits, obtenus à partir des Entités Ottercamp ou via les services, ne créé une quelconque garantie dès lors qu'ils ne sont pas expressément mentionnés dans les Conditions." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding-top margin-bottom\">" +
    "				<h4>B. Liens</h4>" +
    "				" +
    "				<p>" +
    "					Les Services peuvent contenir des liens vers des sites ou des ressources de tiers. Vous reconnaissez et acceptez que les Entités Ottercamp ne sont pas responsables : (i) de la disponibilité ou de l'exactitude de ces sites ou ressources, ou (ii) du contenu, des produits ou des services disponibles sur ou à partir de ces sites ou ressources. Aucun lien vers ces sites ou ressources n'implique l'approbation par les Entités Ottercamp de ces sites ou ressources ou de leur contenu, des produits ou des services offerts par ces sites ou ressources. L'utilisation de tels sites ou ressources se fait sous votre seule responsabilité et à vos entiers risques et périls." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding-top margin-bottom\">" +
    "				<h4>C. Limitation de responsabilité</h4>" +
    "				" +
    "				<p>	" +
    "					DANS LA LIMITE LA PLUS ETENDUE AUTORISEE PAR LA LOI APPLICABLE, LES ENTITÉS OTTERCAMP EXCLUENT TOUTE RESPONSABILITE POUR TOUS DOMMAGES INDIRECTS, ACCESSOIRES, SPÉCIAUX, CONSEQUENTIELS OU PUNITIFS, OU POUR TOUTE PERTE DE PROFITS OU DE REVENUS, QU'ILS SOIENT SUBIS DIRECTEMENT OU INDIRECTEMENT, AINSI QUE POUR TOUTE PERTE DE DONNÉES, D'UTILISATION, DE REPUTATION OU GOODWILL, OU AUTRES PERTES INTANGIBLES, RESULTANT (i) DE VOTRE ACCES AUX SERVICES OU DE LEUR UTILISATION, OU DE L'INCAPACITE D'ACCEDER AUX SERVICES OU DE LES UTILISER, (ii) DE TOUT COMPORTEMENT OU CONTENUS DE TIERS SUR LES SERVICES, Y COMPRIS, SANS LIMITATION, TOUTE CONDUITE DIFFAMATOIRE, OFFENSANTE OU ILLEGALE D'AUTRES UTILISATEURS OU DE TIERS, (iii) DES CONTENUS OBTENUS GRACE AUX SERVICES, OU (iv) DE TOUT ACCES, UTILISATION, ALTERATION DE VOS TRANSMISSIONS OU CONTENUS." +
    "					<br />" +
    "					EN AUCUN CAS LE MONTANT TOTAL DES DOMMAGES INTERETS AUXQUELS LES ENTITES OTTERCAMP POURRAIENT ETRE CONDAMNEES AU TITRE DE LEUR RESPONSABILITE NE POURRA DEPASSER LE MONTANT LE PLUS ELEVE ENTRE CENT DOLLARS AMERICAINS (USD 100,00) ET LES SOMMES QUE VOUS AVEZ VERSEES A Ottercamp, LE CAS ECHEANT, DURANT LES SIX DERNIERS MOIS POUR LES SERVICES À L'ORIGINE DE LA DEMANDE." +
    "					<br />" +
    "					LES LIMITES STIPULEES DANS CETTE SECTION S'APPLIQUENT QUEL QUE SOIT LE FONDEMENT JURIDIQUE SUR LEQUEL LA RESPONSABILITE EST RECHERCHEE, NOTAMMENT CONTRACTUEL, DELICTUEL (Y COMPRIS LA NÉGLIGENCE) OU AUTRE, ET QUE LES ENTITÉS OTTERCAMP AIENT ETE OU NON AVERTIES DE LA POSSIBILITE DE TELS DOMMAGES ET MÊME SI LES REPARATIONS PREVUES DANS LE CADRE DES PRESENTES N'ONT PAS ATTEINT LEUR OBJECTIF ESSENTIEL." +
    "				</p>" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		<div class=\"padding-top margin-bottom\">" +
    "			<h3>11. Conditions générales</h3>" +
    "		" +
    "			<div class=\"margin-bottom\">" +
    "				<h4>A. Renonciation et divisibilité</h4>" +
    "		" +
    "				<p>" +
    "					Le fait qu’Ottercamp ne cherche pas à se prévaloir d'un droit ou d'une disposition des présentes Conditions ne doit pas être considéré comme une renonciation à ce droit ou à cette disposition. Dans le cas où une disposition de ces Conditions serait jugée invalide ou inapplicable, cette disposition sera limitée ou supprimée dans la stricte mesure nécessaire, et les dispositions restantes de ces Conditions resteront pleinement vigueur." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding-top margin-bottom\">" +
    "				<h4>B. Loi applicable et compétence</h4>" +
    "					" +
    "				<p>	" +
    "					Ces Conditions et toute action judiciaire engagée en relation avec ces Conditions sont régies par les lois de France sans considération et sans faire application des dispositions légales de votre Etat ou de votre pays de résidence relatives aux conflits de lois. Toutes les réclamations, poursuites judiciaires ou litiges en relation avec les services seront portés exclusivement devant les tribunaux de Lyon, en Rhône-Alpes, France. Vous acceptez la compétence matérielle et territoriale de ces tribunaux et renoncez à toute objection à ce titre." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding-top margin-bottom\">" +
    "				<h4>C. Intégralité de l'accord</h4>" +
    "		" +
    "				<p>	" +
    "					Ces Conditions et notre <a href=\"about/privacy\" target=\"_blank\">Politique de Confidentialité</a> constituent l'intégralité de l'accord conclu entre Ottercamp et vous concernant les services (à l'exclusion des services pour lesquels vous avez conclu un accord distinct avec Ottercamp incluant ou excluant expressément les présentes Conditions). Les présentes Conditions annulent et remplacent tous les accords antérieurs entre Ottercamp et vous concernant les services. A l'exception des sociétés du groupe dont Ottercamp est la société-mère, aucune personne ou société ne sera considérée comme un tiers bénéficiaire des présentes Conditions." +
    "					<br />" +
    "					Ces Conditions peuvent faire l'objet de modifications à tout moment, la version la plus récente étant toujours disponible à l'adresse <a href=\"#/about/policies\">ottercamp.com/#/about/policies</a>. Si nous jugeons que ces modifications sont substantielles, nous les porterons à votre connaissance via une mise à jour par e-mail à l'adresse e-mail associée à votre compte. En continuant d'accéder ou d'utiliser les services après l'entrée en vigueur de ces modifications, vous acceptez d'être contractuellement liés par ces nouvelles Conditions d'utilisation." +
    "					<br /> <br />" +
    "					Ces services sont gérés et fournis par Ottercamp S.A.S., 116 le fruitier, 69380 Chasselay, France. Pour toute question concernant ces conditions, veuillez <a href=\"#/about/contact\" target=\"_blank\">nous contacter</a>." +
    "				</p>" +
    "			</div>" +
    "		</div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/about/includes/press.html",
    "<div class=\"span9 block margin-top\">" +
    "	<div class=\"header nav-header padding\">{{'label_press'|trad}}</div>" +
    "	" +
    "	<div class=\"padding margin-top\">" +
    "		<p>" +
    "			Ottercamp est une plateforme sociale qui vous permet d'organiser et de trouver des activités à réaliser avec des personnes proches de chez vous. Ces activités peuvent se dérouler dans des espaces privés, tel que l'appartement d'un hôte pour un repas, ou dans des espaces publics comme une salle de sport pour une partie de badminton. <br />" +
    "		</p>" +
    "		" +
    "		<hr />" +
    "		" +
    "		<!--<div class=\"margin-top margin-bottom\">" +
    "			<h4>Communiqués de presse</h4>" +
    "			" +
    "			<div class=\"margin-top\">" +
    "				<div class=\"row-fluid\">" +
    "					<div class=\"span2\">" +
    "						25 juin 2013" +
    "					</div>" +
    "					<div class=\"span10\">" +
    "						<a href=\"\">Ottercamp lance son service pour favoriser la rencontre entre particuliers autour d’activités géolocalisées.</a>" +
    "					</div>" +
    "				</div>" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		<hr />-->" +
    "		" +
    "		<div class=\"margin-top margin-bottom\">" +
    "			<h4>Articles de presse / blogs</h4>" +
    "						" +
    "			<div class=\"margin-top\">" +
    "				<div class=\"row-fluid\">" +
    "					<div class=\"span2\">" +
    "						12 juin 2013" +
    "					</div>" +
    "					<div class=\"span10\">" +
    "						<a href=\"http://lentreprise.lexpress.fr/creation-entreprise/start-in-lyon-14-start-up-qui-ont-de-l-avenir_41424.html?p=9#content\" target=\"_blank\">Article de Lexpress.fr : Start in Lyon: 14 start-up qui ont de l'avenir</a>" +
    "					</div>" +
    "				</div>" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		<hr />" +
    "		" +
    "		<div class=\"margin-top margin-bottom\">" +
    "			<h4>Ressources</h4>" +
    "			" +
    "			<div class=\"row-fluid\">" +
    "				<div class=\"row-fluid span4\">" +
    "					<div class=\"span7\">" +
    "						<img src=\"assets/images/logo-150.png\" />" +
    "					</div>" +
    "					" +
    "					<div class=\"span5\">" +
    "						<div><a href=\"assets/images/logo-150.png\">Petit format</a> <small>(150*150)</small></div>" +
    "						<div><a href=\"assets/images/logo-300.png\">Grand format</a> <small>(300*300)</small></div>" +
    "					</div>" +
    "				</div>" +
    "				" +
    "				<div class=\"row-fluid span4\">" +
    "					<div class=\"span7\">" +
    "						<img src=\"assets/images/full-150.png\" />" +
    "					</div>" +
    "					" +
    "					<div class=\"span5\">" +
    "						<div><a href=\"assets/images/full-150.png\">Petit format</a> <small>(394*150)</small></div>" +
    "						<div><a href=\"assets/images/full-300.png\">Grand format</a> <small>(788*300)</small></div>" +
    "					</div>" +
    "				</div>				" +
    "						" +
    "				<div class=\"row-fluid span4\">" +
    "					<div class=\"span7\">" +
    "						<img src=\"assets/images/typo-150.png\" />" +
    "					</div>" +
    "					" +
    "					<div class=\"span5\">" +
    "						<div><a href=\"assets/images/typo-150.png\">Petit format</a> <small>(478*150)</small></div>" +
    "						<div><a href=\"assets/images/typo-300.png\">Grand format</a> <small>(957*300)</small></div>" +
    "					</div>" +
    "				</div>" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		<hr />" +
    "		" +
    "		<!--<div class=\"margin-top margin-bottom\">" +
    "			<h4>Captures d'écran</h4>" +
    "			" +
    "			" +
    "		</div>" +
    "		" +
    "		<hr />-->" +
    "		" +
    "		<div>" +
    "			<h4>Pour plus d'informations, contactez-nous !</h4>" +
    "			" +
    "			<div class=\"margin-top row-fluid\">" +
    "				<div class=\"span2\">" +
    "					<img src=\"assets/images/adrien.jpg\" />" +
    "				</div>" +
    "				<div class=\"span10\">" +
    "					<div><b>Nom :</b> Adrien Blandin</div>" +
    "					<div><b>Adresse email :</b> press (at) ottercamp (dot) com</div>" +
    "				</div>" +
    "			</div>" +
    "		</div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/about/includes/privacy.html",
    "<div class=\"span9 block margin-top\">" +
    "	<div class=\"header nav-header padding\">{{'label_privacy'|trad}}</div>" +
    "	" +
    "	<div class=\"padding margin-top text-justify\">			" +
    "		<p>" +
    "			Ottercamp permet d’organiser ou de participer à des activités de proximité avec des personnes proches de chez soi." +
    "		</p>" +
    "		" +
    "		<div class=\"alert alert-info\">Chaque activité est visible publiquement par tout le monde.</div>" +
    "		" +
    "		<p>" +
    "			Cette politique de vie privée décrit les conditions dans lesquelles Ottercamp, collecte et utilise vos informations lorsque vous utilisez nos services. Ottercamp reçoit vos informations à travers notre site web, notre API et les notifications par email." +
    "			<br />" +
    "			Quand vous utilisez un de nos services, vous consentez à ce que nous collections, transférions, manipulions, conservions et procédions aux traitements de vos informations conformément aux disposition de la présente Politique de Confidentialité." +
    "			<br />" +
    "			Si vous avez des questions ou commentaires concernant la présente Politique de Confidentialité, n’hésitez pas à nous contacter à <a href=\"mailto:contact@ottercamp.com\" target=\"_blank\">contact@ottercamp.com</a> ou <a href=\"#/about/contact\" target=\"_blank\">ici</a>." +
    "		</p>" +
    "		" +
    "		<div class=\"padding-top margin-bottom\">" +
    "			<h3>Collecte et utilisation des informations</h3>" +
    "			" +
    "			<div class=\"alert alert-info\">Nous collectons et utilisons vos informations afin de vous fournir le service le plus adéquat à vos besoins.</div>" +
    "			" +
    "			<div class=\"margin-bottom\">" +
    "				<h4>Informations collectées au moment de l'inscription</h4>" +
    "				" +
    "				<p>" +
    "					Lorsque vous créez un compte Ottercamp, vous nous fournissez des informations personnelles telles que votre prénom, votre nom, votre nom d’utilisateur et votre adresse email. Certaines de ces informations, par exemple votre prénom et votre nom d’utilisateur, sont visibles publiquement sur nos services." +
    "					<br />" +
    "					Votre adresse email ainsi que votre nom de famille seront masqués pour la majorité des utilisateurs. Cependant lorsque vous organiser une activité, ces informations seront visibles par les participants de celle-ci afin qu’ils puissent vous contacter en cas de problème." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding-top margin-bottom\">" +
    "				<h4>Informations supplémentaires</h4>" +
    "				<p>" +
    "					Vous pouvez si vous le désirer, nous fournir des informations complémentaires afin d'enrichir votre profil comme une biographie ou votre photo de profil. Ces informations seront visibles publiquement." +
    "					Vous pouvez aussi si vous le désirer renseigner votre adresse postale ou votre numéro de téléphone afin de compléter votre compte. Votre adresse permettra d’améliorer votre expérience sur Ottercamp, mais seule la ville sera affichée publiquement. Votre numéro de téléphone, s’il est renseigné sera indiqué aux participants de vos activités afin qu’ils puissent vous contacter en cas de problème." +
    "					<br /> <br />" +
    "					Si vous souhaitez organiser des activités, vous devrez indiquer votre tranche d’âge. Cette information publique nous permettra d’améliorer votre expérience sur Ottercamp en favorisant la mise en relation avec d’autres personnes d’âge similaire." +
    "					<br /> <br />" +
    "					Pour mettre à jour vos paramètres, vous pouvez vous rendre sur <a href=\"#/settings\" target=\"_blank\">http://ottercamp.com/#/settings</a>." +
    "					<br /> <br />" +
    "					Si vous nous adressez un courrier électronique, nous pourrons garder votre message, l'adresse de courrier électronique et les informations pour vous contacter pour répondre à votre demande. Si vous connectez votre compte Ottercamp à un compte d'un autre service, cet autre service pourra nous adresser les informations vous concernant relatives à votre profil et votre enregistrement à ce service ainsi que d'autres informations que vous avez autorisées. Ces informations nous aident à améliorer nos servicess et sont effacées d’Ottercamp quelques semaines après que vous ayez déconnecté votre compte Ottercamp du service tiers." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding-top margin-bottom\">" +
    "				<h4>Information sur la localisation</h4>" +
    "				<p>" +
    "					Pour améliorer la qualité de nos services et vous présenter des activités géographiquement pertinentes pour vous, nous pouvons utiliser votre localisation. Celle-ci est désactivée par défaut, mais vous pouvez configurer votre ordinateur ou votre équipement mobile pour nous envoyer ces informations. Nous pouvons utiliser et conserver ces informations pour améliorer nos services et se souvenir de vos préférences géographiques." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding-top margin-bottom\">" +
    "				<h4>Liens</h4>" +
    "				<p>" +
    "					Ottercamp pourra suivre et conserver la façon dont vous interagissez avec les liens dans nos services, incluant nos notifications par courrier électronique, les services de tiers et les applications clientes, en redirigeant les clics ou par d'autres moyens. Nous faisons cela afin d'améliorer nos services et obtenir des statistiques agrégées sur les clics comme par exemple afin de déterminer combien de fois il a été cliqué sur un lien." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding-top margin-bottom\">" +
    "				<h4>Cookies</h4>" +
    "				<p>" +
    "					Comme beaucoup d'autres sites web, nous utilisons la technologie des \"cookies\" pour améliorer votre expérience sur notre site web. Mais les cookies ne sont pas obligatoires pour de nombreuses parties de nos services." +
    "					<br />" +
    "					Un cookie est un petit fichier texte qui est transféré sur le disque dur de votre ordinateur. La plupart des navigateurs Internet acceptent automatiquement les cookies. Vous pouvez configurer votre navigateur, en modifiant ses paramètres, pour arrêter d'accepter les cookies ou vous interroger avant d'accepter un cookie des sites que vous visitez. Néanmoins, certains services pourront ne pas fonctionner correctement si vous désactivez/refusez les cookies." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding-top margin-bottom\">" +
    "				<h4>Données de Log</h4>" +
    "				<p>" +
    "					Nos serveurs enregistrent automatiquement des informations (Données de Log) créées par votre utilisation de nos services. Les Données de Log peuvent contenir des informations telles que votre adresse IP, le type de votre navigateur, votre système d'exploitation, la page web dont vous venez, les pages visitées, votre localisation, votre opérateur téléphonique, votre équipement et l’identification de l'application, les termes de vos recherches et des informations sur les cookies. Nous enregistrons des Données de Log quand vous interagissez avec nos services, par exemple, quand vous visitez nos sites web, vous vous authentifiez sur nos Services, interagissez avec nos notifications par courrier électronique, utilisez votre compte Ottercamp pour vous authentifier sur le site ou une application d'un tiers. Ottercamp utilise les Données de Log pour fournir les services et les mesurer, les personnaliser et les améliorer." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding-top margin-bottom\">" +
    "				<h4>Prestataires de service tiers</h4>" +
    "				<p>" +
    "					Ottercamp utilise les services de prestataires tiers variés pour l'aider à fournir les services, comme l'hébergement de notre site web ou de notre API et nous aider à comprendre l'utilisation qui est faîte de nos services, comme Google Analytics. Ces prestataires de service tiers peuvent collecter des informations envoyées par votre navigateur parmi la requête d'une page web, comme les cookies et votre adresse IP." +
    "				</p>" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		<div class=\"padding-top margin-bottom\">" +
    "			<h3>Collecte et utilisation des informations</h3>" +
    "			" +
    "			<div class=\"alert alert-info\">Nous ne divulguons pas vos données qui sont personnelles et privées sauf dans les circonstances limitées qui sont énumérées ici.</div>" +
    "			" +
    "			<div class=\"margin-bottom\">" +
    "				<h4>Votre consentement</h4>" +
    "				<p>" +
    "					Nous pouvons partager ou divulguer vos informations suivant vos instructions, comme par exemple quand vous autorisez un site web ou une application tierce à accéder à votre compte Ottercamp." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding-top margin-bottom\">" +
    "				<h4>Prestataires de service</h4>" +
    "				<p>" +
    "					Nous engageons des prestataires de services aux Etats-Unis d'Amérique, en France et ailleurs pour nous fournir des services et exécuter certaines fonctions. Nous pouvons partager vos données personnelles et privées avec ces prestataires de service dès lors qu'ils sont soumis à des obligations de confidentialité qui sont cohérentes avec cette déclaration de vie privée et à la condition que ces tierces parties utilisent vos données personnelles et privées pour notre compte et suivant nos instructions." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding-top margin-bottom\">" +
    "				<h4>Loi et préjudice</h4>" +
    "				<p>" +
    "					Nonobstant toute disposition contraire dans la présente Politique de Confidentialité, nous pourrons conserver ou divulguer vos informations si nous croyons que cela est raisonnablement nécessaire pour se conformer à une loi, une réglementation ou à des demandes juridiques/judiciaires ; pour protéger la sécurité d'une personne, pour réagir à des fraudes ou des problèmes de sécurité ou techniques ; ou pour protéger les droits et la propriété d’Ottercamp. Néanmoins rien dans cette Politique de Confidentialité n'a pour intention de limiter toutes défenses ou objections que vous pourriez avoir à l'encontre d'une tierce partie, incluant une requête du gouvernement afin de divulguer vos informations." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding-top margin-bottom\">" +
    "				<h4>Transfert d'activités</h4>" +
    "				<p>" +
    "					Dans le cas où Ottercamp ferait l'objet d'une banqueroute ou serait impliquée dans une fusion, une acquisition, une réorganisation ou vente de ses actifs, vos informations pourraient être vendues ou transférées dans le cadre de cette opération. Les obligations prévues dans la présente Politique de Confidentialité s'appliqueront à vos informations transférées à la nouvelle entité." +
    "				</p>" +
    "			</div>" +
    "			" +
    "			<div class=\"padding-top margin-bottom\">" +
    "				<h4>Données non privées et/ou non personnelles</h4>" +
    "				<p>" +
    "					Nous pouvons partager et divulguer vos données qui ne sont pas privées ou qui sont rendues autrement anonymes, telles que les informations de votre profil public." +
    "				</p>" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		<div class=\"padding-top margin-bottom\">" +
    "			<h3>Modifier vos données personnelles</h3>" +
    "			<p>" +
    "				Si vous êtes un utilisateur qui a souscrit à nos services, nous vous fournissons les outils et les paramétrages de compte pour accéder ou modifier les informations personnelles que vous nous avez fournies et qui sont associées à votre compte." +
    "			</p>" +
    "		</div>" +
    "		" +
    "		<div class=\"padding-top margin-bottom\">" +
    "			<h3>Notre politique à l'égard des enfants</h3>" +
    "			<p>" +
    "				Nos services ne s'adressent pas à des personnes âgées de moins de 18 ans. Si vous apprenez que votre enfant nous a fourni des informations personnelles sans votre consentement, merci de nous contacter à <a href=\"mailto:contact@ottercamp.com\" target=\"_blank\">contact@ottercamp.com</a>. Nous ne collectons pas, en connaissance, d'informations personnelles sur des personnes de moins de 18 ans. Si nous apprenons qu'un enfant de moins de 18 ans nous a fourni des informations personnelles, nous prenons des mesures pour supprimer ces informations et résilions le compte de cet enfant." +
    "			</p>" +
    "		</div>" +
    "		" +
    "		<div class=\"padding-top margin-bottom\">" +
    "			<h3>Modification de cette Politique de Confidentialité</h3>" +
    "			<p>" +
    "				Nous pouvons modifier cette Politique de Confidentialité à tout moment. La version la plus actuelle de cette politique régit notre utilisation de vos informations et se trouvera toujours à l'adresse <a href=\"#/about/privacy\">http://ottercamp.com/#/about/privacy</a>. Si nous faisons une modification à cette politique qui, à notre seule discrétion, est substantielle, nous vous le notifierons via un courrier électronique à l'adresse associée avec votre compte. En continuant d'accéder ou en utilisant les services après que ces changements soient entrés en vigueur, vous manifestez vous accord à être lié par la Politique de Confidentialité amendée." +
    "			</p>" +
    "		</div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/about/includes/team.html",
    "<div class=\"span9 block margin-top\">" +
    "	<div class=\"header nav-header padding\">{{'label_team'|trad}}</div>" +
    "	" +
    "	<div class=\"padding margin-top\">" +
    "		<p class=\"block padding\">" +
    "			Ottercamp est une plateforme sociale qui vous permet d'organiser et de trouver des activités à réaliser avec des personnes proches de chez vous. Ces activités peuvent se dérouler dans des espaces privés, tel que l'appartement d'un hôte pour un repas, ou dans des espaces publics comme une salle de sport pour une partie de badminton. <br />" +
    "			<br />" +
    "			La société Ottercamp a été créée en 2013 par Adrien Blandin et Gabriel Kielwasser, deux étudiants de l'EPSI Lyon." +
    "		</p>" +
    "		" +
    "		<div>" +
    "			<div class=\"pull-left\">" +
    "				<iframe src=\"//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fottercamp&amp;width=292&amp;height=62&amp;show_faces=false&amp;colorscheme=light&amp;stream=false&amp;show_border=false&amp;header=false&amp;appId=125408324323674\" scrolling=\"no\" frameborder=\"0\" style=\"border:none; overflow:hidden; width:292px; height:62px;\" allowTransparency=\"true\"></iframe>" +
    "			</div>" +
    "			" +
    "			<div class=\"pull-left\">" +
    "				<a href=\"http://twitter.com/ottercamp\" class=\"twitter-follow-button\" data-show-count=\"false\" data-size=\"large\">Follow @ottercamp</a>" +
    "				<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>" +
    "			</div>" +
    "			" +
    "			<span class=\"clear\"></span>" +
    "		</div>" +
    "		" +
    "		<hr />" +
    "		" +
    "		<ul class=\"thumbnails\">" +
    "          <li class=\"span4\">" +
    "            <div class=\"thumbnail\">" +
    "              <img style=\"width: 200px; height: 200px;\" src=\"assets/images/adrien.jpg\" />" +
    "              " +
    "              <div class=\"caption text-center\">" +
    "                <h3>Adrien Blandin</h3>" +
    "                <p>Fondateur, développeur</p>" +
    "                " +
    "                <p>" +
    "                	<a href=\"http://twitter.com/sergentrif\" class=\"twitter-follow-button\" data-show-count=\"false\" data-size=\"large\">Follow @sergentrif</a>" +
    "                </p>" +
    "              </div>" +
    "            </div>" +
    "          </li>" +
    "          <li class=\"span4\">" +
    "            <div class=\"thumbnail\">" +
    "              <img style=\"width: 200px; height: 200px;\" src=\"assets/images/gabriel.jpg\" />" +
    "              " +
    "              <div class=\"caption text-center\">" +
    "                <h3>Gabriel Kielwasser</h3>" +
    "                <p>Fondateur, développeur</p>" +
    "                " +
    "                <p>" +
    "                	<a href=\"http://twitter.com/gkielwasser\" class=\"twitter-follow-button\" data-show-count=\"false\" data-size=\"large\">Follow @gkielwasser</a>" +
    "                </p>" +
    "              </div>" +
    "            </div>" +
    "          </li>" +
    "        </ul>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/badges/badge.html",
    "<div class=\"block margin-top\" fade ng-init=\"initBadge()\" ng-cloack>	" +
    "	<div class=\"header nav-header padding\">{{'label_badge'|trad}}: {{badge.label}}</div>" +
    "	" +
    "	<div class=\"row-fluid\">" +
    "		<div class=\"span2\">" +
    "			<img ng-src=\"{{badge.picture}}\">" +
    "		</div>" +
    "		<div class=\"span10\">" +
    "			<p>{{badge.description}}</p>" +
    "		</div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/channel.html",
    "<script src=\"//connect.facebook.net/en_US/all.js\"></script>"
  );

  $templateCache.put("assets/dev/views/comments/cards/large.html",
    "<div>" +
    "	<small>{{'label_in'|trad}} <a href=\"{{'#/events/' + resource.event.id + '/' + cleanUrl(resource.event.title)}}\">{{resource.event.title}}</a> ({{resource.timestamp |formatedDate}})</small>" +
    "" +
    "	<p class=\"text-justify\">" +
    "		{{resource.content}}" +
    "	</p>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/comments/cards/medium.html",
    "<div class=\"row-fluid\">" +
    "	<div class=\"span2\">" +
    "		<a href=\"#/users/{{resource.member.id}}\"> <img class=\"media-object\" ng-src=\"{{resource.member.smallPhoto}}\"> </a>" +
    "	</div>" +
    "" +
    "	<div class=\"span10\">" +
    "		<div>" +
    "			<a href=\"#/users/{{resource.member.id}}\"> {{resource.member.fullName}} </a>" +
    "" +
    "			<small>({{resource.timestamp |date: ('internationalization_datehour'|trad)}})</small>" +
    "" +
    "			<p class=\"text-justify\">" +
    "				{{resource.content}}" +
    "			</p>" +
    "		</div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/conversations/cards/small.html",
    "<div>" +
    "	<a href=\"#/users/{{resource[resource.dest].id}}\">{{resource[resource.dest].fullName}}</a> <small class=\"pull-right\">{{[resource.lastMessage.timestamp] |formatedDate}}</small>" +
    "</div>" +
    "" +
    "<p>" +
    "	{{resource.lastMessage.content}}" +
    "</p>"
  );

  $templateCache.put("assets/dev/views/conversations/conversations.html",
    "<div id=\"inbox\" class=\"block margin-top container\" ng-init=\"initInbox()\">		" +
    "	<div class=\"header nav-header padding\">{{'label_my_conversations'|trad}}</div>" +
    "" +
    "	<div class=\"margin-top padding-bottom\" ng-hide=\"loading\">" +
    "		<div class=\"row-fluid\">" +
    "			<div class=\"span4 padding conversations\">" +
    "				<div class=\"row-fluid\">" +
    "					<input ng-show=\"conversations.length > 0\" class=\"span12\" type=\"text\" ng-model=\"searchTerm\" placeholder=\"{{'label_search_small'|trad}}\">" +
    "				</div>" +
    "				" +
    "				<div ng-hide=\"conversations.length > 0\" class=\"alert alert-info\">{{'label_no_conversations'|trad}}</div>	" +
    "				" +
    "				<div class=\"border-top padding-top padding-right padding-bottom link\" ng-click=\"loadConversation(conversation.id)\" ng-show=\"conversations.length > 0\" class=\"media\" ng-repeat=\"conversation in conversations | filter:searchTerm\">" +
    "					<div class=\"row-fluid\">" +
    "						<a href=\"#/users/{{conversation[conversation.dest].id}}\">" +
    "							<img class=\"span2\" ng-src=\"{{conversation[conversation.dest].smallPhoto}}\">" +
    "						</a>" +
    "						" +
    "						<div class=\"span10\" ng-class=\"{{isUnreadConversation(conversation.lastMessage.readed)}}\">" +
    "							<card data-resource=\"conversation\" data-format=\"small\" data-type=\"conversations\"></card>" +
    "						</div>" +
    "						" +
    "					</div>" +
    "				</div>" +
    "			</div>" +
    "			" +
    "			<div ui-view class=\"span8 messages\">" +
    "				<div class=\"alert alert-info text-center margin-top\" ng-hide=\"state.current.name == 'inbox.new' || state.current.name == 'inbox.detail'\">{{'label_conversation_unselected'|trad}}</div>" +
    "			</div>" +
    "			" +
    "			<div ng-show=\"loadingConversation\"><img class=\"intern-loader\" src=\"assets/images/ajax-loader.gif\"></div>" +
    "		</div>" +
    "	</div>" +
    "	" +
    "	<div class=\"offset5\" ng-show=\"loading\"><img class=\"intern-loader\" src=\"assets/images/ajax-loader.gif\"></div>" +
    "</div>" +
    "" +
    "<div class=\"footer-absolute\">" +
    "	<ng-include src=\"Config.templatesPublicURL+'includes/footer.html'\"></ng-include>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/conversations/includes/conversation.html",
    "<div class=\"padding border-left\" height=\"100%\" ng-show=\"!loadingConversation\" ng-init=\"initDetail()\">" +
    "	<div>" +
    "		<h5>{{'label_conversation_with'|trad}} {{dest.fullName}}</h5>" +
    "" +
    "		<hr />" +
    "		" +
    "		<div id=\"{{message.id}}\" scroll-if class=\"padding-top margin-bottom\" ng-repeat=\"message in conversation\">" +
    "			<card data-resource=\"message\" data-format=\"medium\" data-type=\"messages\"></card>" +
    "		</div>" +
    "	</div>" +
    "	" +
    "	<hr />" +
    "	" +
    "	<form class=\"row-fluid\">		" +
    "		<div class=\"controls controls-row margin-top\">" +
    "			<textarea class=\"span12\" style=\"resize: none;\" rows=\"4s\" ng-model=\"message\" placeholder=\"{{'label_message'|trad}}\"></textarea>" +
    "		</div>" +
    "" +
    "		<input type=\"submit\" ng-disabled=\"!message || message.length < 2\" ng-click=\"sendMessage(userId,message);message='';\" class=\"btn btn-primary sendingMessage\" data-loading-text=\"{{'label_loading'|trad}}\" value=\"{{'label_respond'|trad}}\" />" +
    "	</form>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/conversations/modals/message.html",
    "<div class=\"modal-header\">" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
    "  " +
    "  <h4>{{'label_new_message'|trad}}</h4>" +
    "</div>" +
    "" +
    "<div class=\"modal-body\" ng-init=\"initNew()\">" +
    "	<form class=\"row-fluid\">" +
    "		<div>{{'label_to'|trad}} : <span class=\"label label-info\">{{user.fullName}}</span></div>" +
    "		" +
    "		<div class=\"controls controls-row margin-top\">" +
    "			<textarea class=\"span12\" style=\"resize: none;\" rows=\"6s\" ng-model=\"message\" placeholder=\"{{'label_message'|trad}}\"></textarea>" +
    "		</div>" +
    "	</form>" +
    "</div>" +
    "" +
    "<div class=\"modal-footer\">" +
    "  	<button type=\"button\" class=\"btn\" ng-click=\"message='';hide()\">{{'label_close'|trad}}</button>" +
    "	<!--<loader data-active=\"!message || message.length < 2\" data-sending=\"sending\" data-action=\"\" data-label=\"label_login\"></loader>-->" +
    "	<input ng-disabled=\"!message || message.length < 2\" type=\"submit\" ng-click=\"sendMessage(user.id,message,hide);\" class=\"btn btn-primary sendingMessage\" data-loading-text=\"{{'label_loading'|trad}}\" value=\"{{'label_send'|trad}}\" />				    	" +
    "</div>" +
    ""
  );

  $templateCache.put("assets/dev/views/conversations/notification.html",
    "<div ng-click=\"seeConversation(message.conversation.id)\" class=\"text-left\">" +
    "	<div class=\"row-fluid\">" +
    "		<div class=\"span2\">" +
    "			<a href=\"#/users/{{message.from.id}}\">" +
    "				<img ng-src=\"{{message.from.smallPhoto}}\">" +
    "			</a>" +
    "		</div>" +
    "		" +
    "		<div class=\"span9\">" +
    "		    <div>" +
    "		    	<a href=\"#/users/{{message.from.id}}\">{{message.from.fullName}}</a>" +
    "		    </div>" +
    "		    		    " +
    "		    <div>" +
    "		    	 <small>{{[message.timestamp] |formatedDate}}</small>" +
    "		    </div>" +
    "		    " +
    "		    <p>{{message.content}}</p>" +
    "		</div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/directives/card.html",
    "<div ng-include=\"templateUrl\" ng-cloak fade></div>"
  );

  $templateCache.put("assets/dev/views/directives/conversations.html",
    "<ul class=\"nav\" role=\"button\" ng-init=\"initInbox()\" ng-cloak>	" +
    "	<li class=\"dropdown\">" +
    "		<a role=\"button\" class=\"dropdown-toggle {{countUnreaded()}} hover\" " +
    "			tooltip " +
    "			data-placement=\"bottom\" " +
    "			title=\"{{'label_my_conversations' | trad}}\" " +
    "			data-toggle=\"dropdown\" " +
    "			style=\"display: inline-block;\" " +
    "			ng-click=\"read()\"" +
    "		>" +
    "			{{unReaded}} <i class=\"icon-envelope\"></i>" +
    "		</a>" +
    "	" +
    "		<div class=\"dropdown-menu notifications pull-right padding-top\" role=\"menu\" aria-labelledby=\"navbar-user\">	" +
    "			<div class=\"text-center margin-bottom\" ng-show=\"messages.length == 0\">{{'label_no_user_messages'|trad}}</div>" +
    "			" +
    "			<div class=\"dropdown-container\">" +
    "				<div ng-click=\"seeConversation(message.conversation.id)\" ng-hide=\"messages.length == 0\" class=\"padding text-left border-top link\" ng-repeat=\"message in messages\">" +
    "					<card data-resource=\"message\" data-type=\"messages\" data-format=\"small\"></card>" +
    "				</div>" +
    "			</div>" +
    "						" +
    "			<div class=\"text-center border-top padding-top\"><a href=\"#/conversations/\">{{'label_show_all'|trad}}</a></div>" +
    "		</div>" +
    "	</li>" +
    "</ul>"
  );

  $templateCache.put("assets/dev/views/directives/embeded.html",
    "<div class=\"modal-header\" >" +
    "	<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
    "	" +
    " 	<h3 ng-show=\"type == 'o'\">{{'modal_embed_title_organization'|trad}}</h3>" +
    " 	<h3 ng-show=\"type == 'e'\">{{'modal_embed_title_event'|trad}}</h3>" +
    "</div>" +
    "" +
    "<div class=\"modal-body padding\">" +
    "	" +
    "	<div class=\"alert alert-info\" ng-show=\"type == 'o'\">" +
    "		{{'modal_embed_content_organization'|trad}}" +
    "	</div>" +
    "	" +
    "	<div class=\"alert alert-info\" ng-show=\"type == 'e'\">" +
    "		{{'modal_embed_content_event'|trad}}" +
    "	</div>" +
    "	" +
    "	<div class=\"row-fluid\">" +
    "		<textarea ng-model=\"content\" style=\"resize:none;\" class=\"span12\" rows=\"4\"></textarea>" +
    "		" +
    "		<hr />" +
    "		" +
    "		<div ng-bind-html-unsafe=\"content\"></div>" +
    "	</div>" +
    "</div>" +
    "" +
    "<div class=\"modal-footer\">" +
    "	<button type=\"button\" class=\"btn\" ng-click=\"dismiss()\">{{'label_close'|trad}}</button>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/directives/geolocpicker.html",
    "<!--<div ng-show=\"addressLabel\" class=\"alert alert-success span12\">" +
    "	<div class=\"span10\">{{addressLabel}}</div>" +
    "	<div class=\"\"><a class=\"btn add-on pull-right\" ng-click=\"edit()\" ><i class=\"icon-remove\"></i></a></div>" +
    "</div>-->" +
    "" +
    "<div ng-show=\"addressLabel\">" +
    "	<div class=\"input-append row-fluid\">" +
    "		<input type=\"text\" ng-model=\"addressLabel\" readonly class=\"span12\"/>" +
    "		" +
    "		<div class=\"btn add-on\" tooltip data-title=\"{{'label_edit_address'|trad}}\" ng-click=\"edit()\"><i class=\"icon-edit\"></i></div>" +
    "	</div>" +
    "</div>" +
    "" +
    "<div ng-hide=\"addressLabel\">" +
    "	<div class=\"dropdown {{showDropdown()}}\" ng-init=\"initPicker()\">" +
    "		<div class=\"input-append row-fluid\">" +
    "			<input type=\"text\" 			" +
    "				placeholder=\"{{'label_address_example'|trad}}\" " +
    "				class=\"dropdown-toggle span12\" " +
    "				ng-model=\"search\" 			" +
    "				data-toggle=\"dropdown\" " +
    "				ng-change=\"refresh()\"" +
    "				>" +
    "			<!--tooltip data-title=\"{{'label_my_address'|trad}}\"-->" +
    "			<a class=\"btn add-on\" " +
    "				ng-show=\"showMyAddress()\" " +
    "				ng-click=\"getMyAddress()\"" +
    "				tooltip data-title=\"{{'label_my_address'|trad}}\"" +
    "			><i class=\"icon-home\"></i></a>" +
    "		</div>" +
    "		" +
    "		<ul ng-show=\"currentPlaces.length > 0\" class=\"dropdown-menu\" style=\"\" role=\"menu\" aria-labelledby=\"dLabel\">" +
    "			<li ng-repeat=\"place in places | limitTo:nbResults\">" +
    "				<a href=\"javascript:;\" ng-click=\"setPlace($index)\">{{place}}</a>" +
    "			</li>" +
    "		</ul>" +
    "		" +
    "		<span class=\"clear\"></span>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/directives/loader.html",
    "<button class=\"{{loaderClass}} {{getClass()}}\" ng-click=\"action()\" ng-disabled=\"active\">" +
    "	<custom ng-switch on=\"sending\">" +
    "       	<custom ng-switch-when=\"true\">" +
    "			<i class=\"icon-refresh icon-spin icon-white\"></i> {{'label_loading'|trad}}" +
    "      	</custom>" +
    "      	<custom ng-switch-default>" +
    "      		{{label|trad}}	" +
    "      	</custom>" +
    "    </custom>" +
    "</button>" +
    ""
  );

  $templateCache.put("assets/dev/views/directives/navBar.html",
    "<ng-include src=\"navBarTemplate\"></ng-include>" +
    ""
  );

  $templateCache.put("assets/dev/views/directives/notifications.html",
    "<ul class=\"nav\" role=\"button\" ng-init=\"initNotifications()\" ng-cloak>	" +
    "	<li class=\"dropdown\">" +
    "		<a role=\"button\" class=\"dropdown-toggle {{countUnreaded()}} hover\" " +
    "			tooltip " +
    "			data-placement=\"bottom\" " +
    "			title=\"{{'label_my_notifications' | trad}}\" " +
    "			data-toggle=\"dropdown\" " +
    "			style=\"display: inline-block;\" " +
    "			ng-click=\"read()\"" +
    "		>" +
    "			{{unReaded}} <i class=\"icon-globe\"></i>" +
    "		</a>" +
    "	" +
    "		<div class=\"dropdown-menu notifications pull-right padding-top\" role=\"menu\" aria-labelledby=\"navbar-user\">	" +
    "			<div class=\"text-center margin-bottom\" ng-show=\"notifications.length == 0\">{{'label_no_user_notifications'|trad}}</div>" +
    "			" +
    "			<div class=\"dropdown-container margin-top\">" +
    "				<card data-resource=\"notification\" data-type=\"notifications\" data-format=\"small\" class=\"padding border-top link\" ng-repeat=\"notification in notifications\"></card>" +
    "				<!--" +
    "				<a href=\"{{notification.link}}\" >" +
    "					<div class=\"text-right\">" +
    "						<small>{{[notification.timestamp] |formatedDate}}</small>" +
    "					</div>" +
    "					<div>" +
    "						{{notification.content}}" +
    "					</div>" +
    "				</a>	" +
    "				-->" +
    "			</div>" +
    "						" +
    "			<div class=\"text-center border-top padding-top\"><a href=\"#/notifications\">{{'label_historic'|trad}}</a></div>" +
    "		</div>" +
    "	</li>" +
    "</ul>"
  );

  $templateCache.put("assets/dev/views/directives/price.html",
    "<div class=\"price\">{{value}}</span>"
  );

  $templateCache.put("assets/dev/views/directives/search.html",
    "<!-- TODO Variables non traduites -->" +
    "" +
    "<form class=\"navbar-search\" ng-init=\"initSearch()\">" +
    "	<div class=\"dropdown\">" +
    "  		<!--data-toggle=\"dropdown\"   Active le clavier mais fais bugger la recherche tous les 2 caractères-->" +
    "		<input type=\"search\" placeholder=\"{{'label_search'|trad}}\" 	" +
    "			ng-disabled=\"isSearching\" " +
    "	  		class=\"searchDir\" " +
    "	  		on-enter=\"enterSearch()\"" +
    "	  		ng-model=\"search\" " +
    "	  		ng-change=\"onChange()\"" +
    "	  		ng-click=\"showDropdown()\"	  	" +
    "	  	>" +
    "		<a class='clear-text' ng-show=\"isVisible\" style='cursor:pointer;color:#888;'><i class='icon-remove'></i></a>" +
    "	  " +
    "	  	<ul class=\"dropdown-menu\" ng-show=\"search.length > 0\" role=\"menu\" aria-labelledby=\"dropdownMenu\">" +
    "	   		<!-- tests-->" +
    "	   			{{getCase1()}}" +
    "	   		" +
    "	   		<!-- Tag dans Ville -->" +
    "	   		<li ng-click=\"makeSearch('events',tags[0].value,cities[0])\" " +
    "	   			ng-show=\"cities[0] &&  tags[0] && search.split(' ').length >= 2\"" +
    "	   		>" +
    "	   			<a href=\"javascript:;\">" +
    "	   				1- Rechercher <b>{{tags[0].value}}</b> à proximité de <b>{{cities[0].label}}</b>" +
    "	   			</a>" +
    "	   		</li>" +
    "" +
    "	    	<li class=\"divider\" ng-show=\"cities[0] &&  tags[0] && search.split(' ').length >= 2\"></li>   " +
    "	   " +
    "			<!-- Tag dans Communauté -->" +
    "		   	<li ng-click=\"makeSearch('events',tags[0].value,communities[0])\" " +
    "		   		ng-show=\"tags[0] && communities[0] &&  communities[0] && search.split(' ').length >= 2\"" +
    "		   	>" +
    "		   		<a href=\"javascript:;\">" +
    "		   			2- Rechercher <b>{{tags[0].value}}</b> dans la communauté <b>{{communities[0].name}}</b>" +
    "		   		</a>" +
    "		   	</li>" +
    "	" +
    "		   	<!-- Tag dans Organisation -->" +
    "		   	<li ng-click=\"makeSearch('events',tags[0].value,organizations[0])\" " +
    "		   		ng-show=\"tags[0] && organizations[0] &&  organizations[0] && search.split(' ').length >= 2\"" +
    "		   	>" +
    "		   		<a href=\"javascript:;\">" +
    "		   			3- Rechercher <b>{{tags[0].value}}</b> dans l'organisations <b>{{organizations[0].name}}</b>" +
    "		   		</a>" +
    "		   	</li>" +
    "	 " +
    "		   	<!-- Ville dans Organisation TODO-->" +
    "		   	<li ng-click=\"makeSearch('events',organizations[0].name,cities[0])\"" +
    "		   		ng-show=\"cities[0] &&  organizations[0] && search.split(' ').length >= 2\"" +
    "		   	>" +
    "		   		<a href=\"javascript:;\">" +
    "		   			4- Rechercher à proximité de <b>{{cities[0].label}}</b> pour l'organisation <b>{{organizations[0].name}}</b>" +
    "		   		</a>" +
    "		   	</li>" +
    "" +
    "		   	<!-- Ville dans Communauté TODO -->" +
    "		   	<li ng-click=\"makeSearch('events',communities[0].name,cities[0])\" " +
    "		   		ng-show=\"cities[0] &&  communities[0] && search.split(' ').length >= 2\"" +
    "		   	>" +
    "		   		<a href=\"javascript:;\">" +
    "		   			5- Rechercher à proximité de <b>{{cities[0].label}}</b> pour la communauté <b>{{communities[0].name}}</b>" +
    "		   		</a>" +
    "		   	</li>" +
    "		   	" +
    "		   	<!-- Tag dans les événements -->" +
    "		   	<li ng-click=\"makeSearch('events',tag.value)\" ng-repeat=\"tag in tags | limitTo:5\">" +
    "		   		<a href=\"javascript:;\">" +
    "		   			6- Rechercher <b>{{tag.value}}</b> dans les événements" +
    "		   		</a>" +
    "		   	</li>" +
    "		    " +
    "		   	<li class=\"divider\" ng-show=\"tags.length > 0\"></li>" +
    "		    " +
    "		   	<!-- Evénement dans une ville -->" +
    "		   	<li ng-click=\"makeSearch('events',null,city);\" ng-repeat=\"city in cities | limitTo:3\">" +
    "		   		<a href=\"javascript:;\">" +
    "		   			7- Rechercher un événement à <b>{{city.label}}</b>" +
    "		   		</a>" +
    "		   	</li>" +
    "		    " +
    "		  	<li class=\"divider\" ng-show=\"cities.length > 0\"></li>" +
    "		    " +
    "		   	<!-- Keyword 1 dans événements -->" +
    "		   	<li ng-click=\"makeSearch('events',search.split(' ')[0],null)\" " +
    "		   		ng-show=\"search.split(' ')[0] != tags[0].value\"" +
    "		   	>" +
    "		   		<a href=\"javascript:;\">" +
    "		   			8- Rechercher <strong>{{search.split(\" \")[0]}}</strong> dans les événements" +
    "		   		</a>" +
    "		   	</li>" +
    "		   	" +
    "		   	<!-- Keyword 2 dans événements -->" +
    "		   	<li ng-click=\"makeSearch('events',search.split(' ')[1],null)\" " +
    "		   		ng-show=\"search.split(' ').length == 2 && tags.length == 0 && search.split(' ')[0] != search.split(' ')[1]\"" +
    "		   	>" +
    "		   		<a href=\"javascript:;\">" +
    "		   			9- Rechercher <strong>{{search.split(\" \")[1]}}</strong> dans les événements" +
    "		   		</a>" +
    "		   	</li>" +
    "		   	" +
    "		   	<!-- Evénements -->" +
    "		   	<li ng-click=\"makeSearch('events',search,null)\" " +
    "		   		ng-show=\"search.split(' ').length > 1 && (tags[0] != search)\"" +
    "		   	>" +
    "		   		<a href=\"javascript:;\">" +
    "		   			10- Rechercher <strong>{{search}}</strong> dans les événements" +
    "		   		</a>" +
    "		   	</li>" +
    "		   	" +
    "		   	<li class=\"divider\" ng-show=\"(search.split(' ')[0] != tags[0].value) " +
    "		   		|| (search.split(' ').length == 2 && tags.length == 0 && search.split(' ')[0] != search.split(' ')[1])" +
    "		   		|| (search.split(' ').length > 1)\"></li>" +
    "			" +
    "			<!-- Organisations -->" +
    "			<li ng-click=\"makeSearch('organizations')\" >" +
    "				<a href=\"javascript:;\">" +
    "					11- Rechercher <b>{{search}}</b> dans les organisations" +
    "				</a>" +
    "			</li>" +
    "			" +
    "			<!-- Communauté -->" +
    "			<li ng-click=\"makeSearch('communities')\" >" +
    "				<a href=\"javascript:;\">" +
    "					12- Rechercher <b>{{search}}</b> dans les communautés" +
    "				</a>" +
    "			</li>" +
    "							" +
    "		    <!-- Utilisateurs -->" +
    "		    <li ng-click=\"makeSearch('users')\" >" +
    "		    	<a href=\"javascript:;\">" +
    "		    		13- Rechercher <b>{{search}}</b> dans les utilisateurs" +
    "		    	</a>" +
    "		    </li>" +
    "		</ul>" +
    "	</div>" +
    "</form>"
  );

  $templateCache.put("assets/dev/views/directives/tags.html",
    "<div id=\"tagsDir\" class=\"controls\"> " +
    "	<span class=\"tags\"> " +
    "		<span class=\"tag\" ng-repeat=\"tag in tags\">" +
    "			{{tag}} " +
    "			<a ng-click=\"deleteTag(tag)\">" +
    "				<i class=\"icon-remove\"></i>" +
    "			</a> " +
    "		</span> " +
    "		<input id=\"tagInput\" type=\"text\"  " +
    "			ng-model=\"newTag\" " +
    "			placeholder=\"Tags\" " +
    "			class=\"input-small\"" +
    "			on-keydownpress-fn=\"addTag\"" +
    "		> " +
    "	</span> " +
    "</div>"
  );

  $templateCache.put("assets/dev/views/directives/tagsPicker.html",
    "<div class=\"row-fluid\">" +
    "	<div class=\"tags tags-input span12\" style=\"margin-left: 0;\">" +
    "		<div class=\"tag tag-input label label-info\" ng-repeat=\"tag in tags\">" +
    "			{{tag}} <a ng-click=\"deleteTag(tag)\"><i class=\"icon-remove icon-white\"></i></a>" +
    "		</div>" +
    "	" +
    "		<input id=\"tagInput\" delete-on-select=\"true\" placeholder=\"{{'label_tags'|trad}}\" on-keydownpress-fn=\"addTag\" class=\"listner input-xxlarge\"  type=\"text\" ng-model=\"newTag\" bs-typeahead=\"typeahead\">" +
    "	</div>" +
    "</div>" +
    "" +
    "<span class=\"clear\"></span>" +
    "" +
    "<span class=\"text-error\" ng-show=\"showTagsLimit\">{{\"error_member_tags_limit\"|trad}}</span>" +
    ""
  );

  $templateCache.put("assets/dev/views/directives/tagsPickerSearch.html",
    "<input ng-init=\"initTagsPicker()\"" +
    "	type=\"text\"" +
    "	placeholder=\"{{'label_what_event'|trad}}\" " +
    "	ng-model=\"searchNav\" " +
    "	ng-change=\"updateSearch(searchNav)\"" +
    "	bs-typeahead=\"getTags\"" +
    "	data-min-length=\"1\" " +
    "	bt-clear" +
    "	/>" +
    "        		"
  );

  $templateCache.put("assets/dev/views/directives/userBox.html",
    "<ng-include ng-cloak src=\"userBoxTemplate\"></ng-include>"
  );

  $templateCache.put("assets/dev/views/discover/citypicker.html",
    "<div class=\"btn-group\" ng-init=\"initGeolocDir()\">" +
    "	<div class=\"input-append\">" +
    "	  <input ng-change=\"resetCity()\" " +
    "			placeholder=\"{{'label_city'|trad}}\" " +
    "			class=\"span2\" " +
    "			data-items=\"4\" " +
    "			data-min-length=\"3\" " +
    "			type=\"text\" " +
    "			ng-model=\"typeaheadValue\" " +
    "			bs-typeahead=\"typeaheadFn\"" +
    "			ng-disabled=\"disablePicker\"" +
    "			ng-hide=\"disablePicker\"" +
    "		>" +
    "" +
    "		<div class=\"btn-group\" bs-buttons-radio ng-model=\"geoloc\">" +
    "			<button type=\"button\" class=\"btn\" value=\"city\" tooltip data-placement=\"bottom\" title=\"{{'label_search_city'|trad}}\"><i class=\"icon-list\"></i></button>" +
    "		  	<button type=\"button\" class=\"btn\" value=\"near\" tooltip data-placement=\"bottom\" title=\"{{'label_search_my_position'|trad}}\"><i class=\"icon-map-marker\"></i></button>" +
    "		  	<button type=\"button\" class=\"btn\" value=\"center\" tooltip data-placement=\"bottom\" title=\"{{'label_search_map_center'|trad}}\"><i class=\"icon-certificate\"></i></button>" +
    "		  	<button type=\"button\" class=\"btn\" value=\"home\" tooltip data-placement=\"bottom\" title=\"{{'label_search_my_address'|trad}}\" ng-show=\"showUserGeoloc\"><i class=\"icon-home\"></i></button>" +
    "		</div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/discover/discover.html",
    "<ng-include src=\"Config.templatesPublicURL+'discover/modal.html'\"></ng-include>" +
    "" +
    "<div class=\"row\" ng-init=\"initMapCtrl()\" >		" +
    "	<div id=\"map\" ng-hide=\"loading\" map-box>" +
    "		<a href=\"\" tooltip data-title=\"{{'label_search_map_center'|trad}}\" data-placement=\"right\" class=\"map-refresh-background\" ng-click=\"conditionalRefresh()\"><i  class=\"map-refresh\" ng-class=\"{'map-refresh-active':refresh}\"></i></a>" +
    "	</div>" +
    "	<div class=\"offset8 map-loader\" ng-show=\"loading\"><img class=\"intern-loader\" src=\"assets/images/ajax-loader.gif\"></div>" +
    "</div>" +
    "" +
    "<div id=\"discover\">" +
    "	<!-- Events list -->" +
    "	<event-list ng-hide=\"waiting\"></event-list>" +
    "</div>" +
    "" +
    "	 "
  );

  $templateCache.put("assets/dev/views/discover/events-cards.html",
    "<p class=\"alert alert-info\" ng-show=\"eventsList.length == 0\">{{'label_no_search_events'|trad}}</p>" +
    "" +
    "<div ng-hide=\"eventsList.length == 0\">" +
    "	<div fade class=\"margin-top block block-card\" ng-repeat=\"event in eventsList\" ng-click=\"centerMap(event.id)\" ng-mouseenter=\"showMarker(event.id)\" ng-mouseleave=\"hideMarker(event.id)\">" +
    "		<card		" +
    "			data-resource=\"event\"" +
    "			data-type=\"events\"" +
    "			data-format=\"medium\"" +
    "		></card>" +
    "	</div>	" +
    "</div>" +
    ""
  );

  $templateCache.put("assets/dev/views/discover/events-list.html",
    "<!-- TODO Variables non traduites -->" +
    "" +
    "<p ng-show=\"eventsList.length == 0\" class=\"alert alert-info\">{{'label_no_search_events'|trad}}</p>" +
    "" +
    "<table class=\"table table-striped table-hover\" ng-hide=\"eventsList.length == 0\">		  		" +
    "	<thead >" +
    "		<tr>" +
    "			<th>Catégorie</th>" +
    "  			<th>Date</th>" +
    "  			<th>Titre</th>" +
    " 			<th>Organisateur</th>" +
    " 			<th>Lieu</th>" +
    " 			<th>Prix</th>" +
    "		</tr>" +
    "	</thead>" +
    "	" +
    "	<tbody>" +
    "		<tr ng-repeat=\"event in eventsList\">" +
    "			<td><img ng-src=\"{{event.smallPhoto}}\" width=\"28px\"/></td>" +
    "			<td>{{event.startTimestamp |date: ('internationalization_datehour'|trad)}} {{event.endTimestamp|date: ('internationalization_datehour'|trad)}}</td>" +
    "			<td><a href=\"#/events/{{event.id}}\">{{event.title}}</a></td>" +
    "			<td><a href=\"#/users/{{event.organizer.id}}\">{{event.organizer.fullName}}</a></td>" +
    "			<td>{{event.address.label}}</td>" +
    "			<td><price price=\"event.fullPrice\"></price></td>" +
    "		</tr>" +
    "	</tbody>" +
    "</table>" +
    ""
  );

  $templateCache.put("assets/dev/views/discover/events.html",
    "<div id=\"{{eventsTemplate}}\">" +
    "	<div class=\"padding\">" +
    "		<div class=\"row-fluid \">" +
    "			<div class=\"span6\">" +
    "				<div class=\"btn-group \" ng-model=\"eventsTemplate\" bs-buttons-radio>" +
    "					<button tooltip data-placement=\"bottom\" title=\"\" data-original-title=\"{{'label_display_map' | trad}}\" type=\"button\" class=\"btn\" value=\"events-cards\">" +
    "						<i class=\"icon-map-marker\"></i>" +
    "					</button>" +
    "					<button tooltip data-placement=\"bottom\" title=\"\" data-original-title=\"{{'label_display_list' | trad}}\" type=\"button\" class=\"btn\" value=\"events-list\">" +
    "						<i class=\"icon-list\"></i>" +
    "					</button>" +
    "				</div>" +
    "			</div>" +
    "			<div class=\"span6\">" +
    "				<div class=\"btn-group pull-right\">" +
    "	" +
    "					<button subscribe ng-show=\"isLogged\" ng-click=\"show()\" class=\"btn\" tooltip data-placement=\"bottom\" title=\"{{'label_create_alert'|trad}}\">" +
    "						<i class=\"icon-bell-alt\"></i> {{'label_alerts'|trad}}" +
    "					</button>" +
    "					" +
    "					<button class=\"btn\" share tooltip data-placement=\"bottom\" title=\"{{'label_share'|trad}}\">" +
    "						<i class=\"icon-share\"></i>" +
    "					</button>" +
    "					" +
    "					<!--<button class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" tooltip data-placement=\"bottom\" title=\"{{'label_more'|trad}}\">" +
    "						<span ng-hide=\"isLogged\">{{'label_more'|trad}}</span>" +
    "						<span class=\"caret\"></span>" +
    "					</button>" +
    "" +
    "					<ul class=\"dropdown-menu pull-right\">" +
    "						<li>" +
    "							<a href=\"javascript:;\">{{'label_share'|trad}}</a>" +
    "						</li>" +
    "					</ul>-->" +
    "				</div>" +
    "			</div>" +
    "		</div>" +
    "			" +
    "		<div class=\"margin-top\">" +
    "			<a class=\"btn btn-success btn-block\" ng-show=\"isLogged\" href=\"#/addEvent\">{{'label_organize'|trad}}</a>" +
    "			<a class=\"btn btn-success btn-block\" ng-show=\"!isLogged\" href=\"#/addEvent\">{{'label_organize_login'|trad}}</a>" +
    "		</div>" +
    "		" +
    "		<hr />" +
    "" +
    "		<ng-include src=\"Config.templatesPublicURL+'discover/'+ eventsTemplate +'.html'\"></ng-include>" +
    "	</div>" +
    "</div>" +
    "" +
    "<div class=\"footer-absolute\">" +
    "	<ng-include src=\"Config.templatesPublicURL+'includes/footer.html'\"></ng-include>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/discover/modal.html",
    "<div id=\"presentation\" class=\"block span4 margin-top\" ng-show=\"showPresentation\">" +
    "	<div class=\"modal-header marketing\">" +
    "		<button type=\"button\" class=\"close\" ng-click=\"showPresentation = false;hidePresentation();\">&times;</button>" +
    "	" +
    "		<h2>{{\"modal_presentation_title\"|trad}}</h2>" +
    "	</div>" +
    "	" +
    "	<div class=\"modal-body px15 text-justify\">" +
    "		{{\"modal_presentation_content\" | trad}}" +
    "	</div>" +
    "		" +
    "	<div class=\"modal-footer\">" +
    "		<a class=\"btn btn-info\" href=\"#/about\" ng-click=\"hidePresentation();\">{{'label_about'|trad}}</a>" +
    "		<!--<a class=\"btn btn-success\" ng-click=\"dismiss()\">{{'label_discover'|trad}}</a>-->" +
    "		<a class=\"btn btn-success\" href=\"javascript:;\" ng-click=\"showPresentation = false;hidePresentation();\">{{'label_discover'|trad}}</a>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/errors/404.html",
    "<div id=\"error404\" class=\"block margin-top\">" +
    "	<div class=\"header nav-header padding\">{{'page_404_title'|trad}}</div>" +
    "	" +
    "	<div class=\"padding margin-top\">" +
    "		<p ng-bind-html-unsafe=\"'page_404_content'|trad\"></p>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/errors/500.html",
    "<div id=\"error500\" class=\"block margin-top\">" +
    "	<div class=\"header nav-header padding\">{{'page_500_title'|trad}}</div>" +
    "	" +
    "	<div class=\"padding margin-top\">" +
    "		<p ng-bind-html-unsafe=\"'page_500_content'|trad\"></p>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/errors/maintenance.html",
    "<div id=\"maintenance\" class=\"block margin-top\">	" +
    "	<div class=\"header nav-header padding\">{{'page_maintenance_title'|trad}}</div>" +
    "			" +
    "	<div class=\"padding margin-top\">" +
    "		<p ng-bind-html-unsafe=\"'page_maintenance_content'|trad\"></p>" +
    "	</div>" +
    "</div>" +
    ""
  );

  $templateCache.put("assets/dev/views/events/add.html",
    "<style>" +
    "	#preview-wrapper {" +
    "	    overflow: hidden; " +
    "	    position: relative;" +
    "	}" +
    "	" +
    "	#preview {" +
    "	    position: absolute;" +
    "	}" +
    "	.select2-choice {" +
    "	  max-height: 150px;" +
    "	  overflow-y: auto;" +
    "	}" +
    "</style>" +
    "" +
    "<div id=\"add_event\" class=\"block margin-top\">" +
    "	<div class=\"header nav-header padding\">" +
    "		{{'label_organize'|trad}}" +
    "	</div>" +
    "" +
    "	<div class=\"margin-top\">" +
    "		<form name=\"addEventForm\" novalidate>" +
    "			<div class=\"row-fluid\">" +
    "				<div class=\"span6\">" +
    "					<div class=\"padding-left\">" +
    "						<div class=\"row-fluid\">" +
    "" +
    "							<div ng-switch on=\"photo\" class=\"span4 block control-label\">" +
    "						       <div ng-switch-when=\"true\" id=\"preview-wrapper\">" +
    "						       		<img id=\"preview\" ng-cloak src=\"\" />" +
    "						       </div>" +
    "						       " +
    "						       <div ng-switch-default class=\"padding\">" +
    "						       		<img ng-cloak ng-src=\"{{getCategoryUrlByAbbr(myAddEventForm.category)}}\" />" +
    "						       </div>" +
    "						    </div>" +
    "						    " +
    "    " +
    "							<!--<div id=\"preview-wrapper\" class=\"span4 block control-label\">" +
    "								<img id=\"preview\" ng-cloak ng-src=\"{{getCategoryUrlByAbbr(myAddEventForm.category)}}\" />" +
    "							</div>-->" +
    "							" +
    "							<div class=\"span8\">" +
    "								<div class=\"alert alert-info\" ng-hide=\"photo\">" +
    "									{{'label_event_photo_information'|trad}}" +
    "								</div>" +
    "								" +
    "								<span class=\"btn btn-success fileinput-button\">" +
    "					                <i class=\"icon-plus icon-white\"></i>" +
    "					                <span>{{'label_upload_event'|trad}}</span>" +
    "					                <input file-upload cs-type=\"AddEventCtrl\" id=\"photo\" type=\"file\" name=\"photo\" />" +
    "					                " +
    "					            </span>" +
    "					            " +
    "					            <hr ng-show=\"photo\"/>" +
    "					            " +
    "					            <div ng-show=\"photo\" class=\"alert alert-success\">" +
    "					            	<button type=\"button\" class=\"close\" ng-click=\"files=[];photo=false;\">×</button>" +
    "					            	{{files[0].name}}" +
    "					            </div>" +
    "							</div>" +
    "						</div>" +
    "						" +
    "						<hr />" +
    "						" +
    "						<div class=\"controls controls-row margin-top\">" +
    "							<input ng-blur ng-focus type=\"text\" name=\"title\" ng-model=\"myAddEventForm.title\"" +
    "							placeholder=\"{{'label_title'|trad}}\"" +
    "							required" +
    "							ng-minlength=\"2\"" +
    "							ng-maxlength=\"200\"" +
    "							class=\"span12\"" +
    "							>" +
    "	" +
    "							<span class=\"clear\"></span>" +
    "	" +
    "							<span class=\"text-error\" ng-show=\"!titleshow && csValidate(formSent,addEventForm.title.$error.required,addEventForm.title.$pristine)\">{{'error_event_title_missing'|trad}}</span>" +
    "							<span class=\"text-error\" ng-show=\"!titleshow && csValidate(formSent,addEventForm.title.$error.minlength || addEventForm.title.$error.maxlength,addEventForm.title.$pristine)\">{{'error_event_title_size'|trad}}</span>" +
    "						</div>" +
    "						" +
    "						<!-- Catégorie -->" +
    "						<div class=\"controls margin-top\">" +
    "							<div class=\"margin-bottom btn-group\" name=\"category\" ng-model=\"myAddEventForm.category\" bs-buttons-radio required>" +
    "								<button type=\"button\" class=\"btn padding5 span1\"" +
    "								ng-repeat=\"cat in categoryList\"" +
    "								data-toggle=\"tooltip\"" +
    "								title=\"{{cat.label}}\"" +
    "								data-trigger=\"hover\"" +
    "								value=\"{{cat.abbreviation}}\"" +
    "								tooltip" +
    "								container=\"body\"" +
    "								data-placement=\"bottom\"" +
    "								>" +
    "	" +
    "									<img ng-src=\"{{cat.picture}}\" />" +
    "								</button>" +
    "	" +
    "								<span class=\"clear\"></span>" +
    "							</div>" +
    "	" +
    "							<span class=\"clear\"></span>" +
    "	" +
    "							<span class=\"text-error\" ng-show=\"csValidate(formSent,addEventForm.category.$error.required,addEventForm.category.$pristine)\">{{'error_event_category_missing'|trad}}</span>" +
    "						</div>" +
    "										" +
    "						<hr />" +
    "	" +
    "						<!-- Description -->" +
    "						<div class=\"controls controls-row\">" +
    "							<div ng-blur ng-focus" +
    "							rich-text-editor" +
    "							name=\"description\"" +
    "							ng-model=\"myAddEventForm.description\"" +
    "							placeholder=\"{{'label_description'|trad}}\"" +
    "							required" +
    "							ng-minlength=\"10\"" +
    "							ng-maxlength=\"5000\"" +
    "							></div>" +
    "	" +
    "							<span class=\"clear\"></span>" +
    "	" +
    "							<span class=\"text-error\" ng-show=\"!descriptionshow &&  csValidate(formSent,addEventForm.description.$error.required,addEventForm.description.$pristine)\">{{'error_event_description_missing'|trad}}</span>" +
    "							<span  class=\"text-error\" ng-show=\"!descriptionshow &&  csValidate(formSent,addEventForm.description.$error.length || addEventForm.description.$error.length,addEventForm.description.$pristine)\">{{'error_event_description_size'|trad}}</span>" +
    "						</div>" +
    "	" +
    "						<hr />" +
    "	" +
    "						<!-- Imperative -->" +
    "						<div class=\"controls controls-row\">" +
    "							<textarea type=\"text\" ng-blur ng-focus name=\"imperative\" " +
    "			      				ng-model=\"myAddEventForm.imperative\"" +
    "			      				placeholder=\"{{'label_imperative'|trad}}\"" +
    "			      				rows=\"6\" " +
    "			      				ng-minlength=\"10\" " +
    "			      				ng-maxlength=\"5000\"" +
    "			      				class=\"span12\"" +
    "			      			></textarea>						" +
    "	" +
    "	 						<span class=\"clear\"></span>" +
    "	" +
    "							<span  class=\"text-error\" ng-show=\"!imperativeshow && csValidate(formSent,addEventForm.imperative.$error.minlength || addEventForm.imperative.$error.maxlength,addEventForm.imperative.$pristine)\">{{'error_event_imperative_size'|trad}}</span>" +
    "						</div>" +
    "	" +
    "						<!-- Liste de tags -->" +
    "						<div class=\"controls controls-row\">" +
    "							<tags-picker tags=\"tags\" class=\"span12\"></tags-picker>" +
    "						</div>" +
    "						" +
    "						<hr />" +
    "	" +
    "						<!-- Address -->" +
    "						<div class=\"controls controls-row\">" +
    "							<geoloc-picker " +
    "								formated-address=\"formatedAddress\" " +
    "								address-label=\"search\"" +
    "								my-address=\"true\"" +
    "								class=\"span12\"" +
    "							></geoloc-picker>" +
    "	" +
    "							<span class=\"clear\"></span>" +
    "							<span class=\"text-error\" ng-show=\"formSent &&  !formatedAddress.lat\">{{'error_address_missing'|trad}}</span>" +
    "						</div>" +
    "	" +
    "						<hr />" +
    "	" +
    "						<!-- Date -->" +
    "						<div class=\"controls controls-row\">" +
    "							<div class=\"input-append date form_datetime span6\" style=\"margin-left: 0;\">" +
    "								<input name=\"startTimestamp\" datetimepicker size=\"16\" type=\"text\" value=\"\" readonly" +
    "								ng-model=\"startTimestamp\"" +
    "								placement=\"top\"" +
    "								required" +
    "								placeholder=\"{{'label_startdate'|trad}}\"" +
    "								class=\"hover\"" +
    "								ng-change=\"compareDates()\"" +
    "								>" +
    "	" +
    "								<span class=\"add-on btn\"><i class=\"icon-remove\"></i></span>" +
    "								<span class=\"add-on btn\"><i class=\"icon-calendar\"></i></span>" +
    "							</div>" +
    "	" +
    "							<div class=\"input-append date form_datetime span6 padding-left\" style=\"margin-left: 0;\">" +
    "								<input ng-model=\"endTimestamp\" datetimepicker size=\"16\" type=\"text\"" +
    "								name=\"endTimestamp\"" +
    "								value=\"\"" +
    "								readonly" +
    "								placement=\"top\"" +
    "								placeholder=\"{{'label_enddate'|trad}}\"" +
    "								class=\"hover\"" +
    "								ng-change=\"compareDates()\"" +
    "								>" +
    "	" +
    "								<span class=\"add-on btn\"><i class=\"icon-remove\"></i></span>" +
    "								<span class=\"add-on btn\"><i class=\"icon-calendar\"></i></span>" +
    "							</div>" +
    "	" +
    "							<span class=\"clear\"></span>" +
    "	" +
    "							<span class=\"text-error\" ng-show=\"csValidate(formSent,addEventForm.startTimestamp.$error.required,addEventForm.startTimestamp.$pristine)\">{{'error_event_startTimestamp_missing'|trad}}</span>" +
    "							<span class=\"text-error\" ng-show=\"incorrectDates\">{{'error_event_startTimestamp_superior'|trad}}</span>" +
    "						</div>" +
    "	" +
    "						<hr />" +
    "	" +
    "						<!-- Participants -->" +
    "						<div class=\"controls controls-row\">" +
    "							<div class=\"input-append span6\" style=\"margin-left: 0;\">" +
    "								<input type=\"text\" name=\"minParticipants\" ng-model=\"myAddEventForm.minParticipants\"" +
    "								placeholder=\"{{'label_minparticipants'|trad}}\"" +
    "								placement=\"top\"" +
    "								min=\"2\"" +
    "								ng-change=\"compareParticipants('minParticipants')\"" +
    "								>" +
    "	" +
    "								<a class=\"add-on btn\" ng-click=\"decParticipant('minParticipants')\">-</a>" +
    "								<a class=\"add-on btn\" ng-click=\"incParticipant('minParticipants')\">+</a>" +
    "							</div>" +
    "	" +
    "							<div class=\"input-append span6 padding-left\" style=\"margin-left: 0;\">" +
    "								<input type=\"text\" name=\"maxParticipants\" ng-model=\"myAddEventForm.maxParticipants\"" +
    "								placeholder=\"{{'label_maxparticipants'|trad}}\"" +
    "								placement=\"top\"" +
    "								min=\"2\"" +
    "								ng-change=\"compareParticipants('maxParticipants')\"" +
    "								>" +
    "	" +
    "								<a class=\"add-on btn\" ng-click=\"decParticipant('maxParticipants')\">-</a>" +
    "								<a class=\"add-on btn\" ng-click=\"incParticipant('maxParticipants')\">+</a>" +
    "							</div>" +
    "	" +
    "							<span class=\"clear\"></span>" +
    "	" +
    "							<span class=\"text-error\" ng-show=\"incorrectParticipants\">{{'error_event_minParticipants_superior'|trad}}</span>" +
    "						</div>" +
    "	" +
    "						<!--<hr />-->" +
    "						<!--" +
    "						<div class=\"controls controls-row\">" +
    "							test:{{test}}" +
    "							<input type=\"text\" ng-model=\"test\" >" +
    "						</div>" +
    "						-->" +
    "						<!-- Price -->" +
    "						<div class=\"controls controls-row\">" +
    "							<div class=\"input-append span12\">" +
    "								<input type=\"text\" name=\"price\" ng-model=\"myAddEventForm.price\"" +
    "									ng-change=\"priceControl()\"" +
    "									placeholder=\"{{'label_htprice'|trad}}\"" +
    "									class=\"pricecontrol span10\"" +
    "								>" +
    "	" +
    "								<a class=\"btn\" ng-click=\"decPrice()\">-</a>" +
    "								<a class=\"btn\" ng-click=\"incPrice()\">+</a>" +
    "								<i class=\"icon-question-sign add-on\" popover data-trigger=\"hover\" data-title=\"{{'label_information'|trad}}\" data-content=\"{{'label_htprice_information'|trad}}\"></i>" +
    "							</div>" +
    "" +
    "							<div ng-show=\"myAddEventForm.price\">" +
    "								<span  class=\"label label-success\">" +
    "									{{myAddEventForm.price|fullPrice|currency}} {{\"label_with_ttc\"|trad}}" +
    "								</span>" +
    "								" +
    "								<i class=\"icon-question-sign\" popover data-trigger=\"hover\" data-title=\"{{'label_information'|trad}}\" data-content=\"{{'label_ttcprice_information'|trad}}\"></i>" +
    "							</div>" +
    "	" +
    "							<span class=\"clear\"></span>" +
    "	" +
    "							<span class=\"text-error\" ng-show=\"incorrectPrice\">{{\"error_event_price_invalid\"|trad}}</span>" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "" +
    "				<div class=\"span6\">" +
    "					<div class=\"block margin-right\">" +
    "						<div class=\"header nav-header padding\">{{'label_options'|trad}}</div>" +
    "						" +
    "						<div class=\"padding\">" +
    "							<!-- Organization -->" +
    "							<div class=\"controls\" ng-show=\"organizations.length > 0\">" +
    "								{{'label_organize_as'|trad}} <i class=\"icon-question-sign\" popover data-trigger=\"hover\" data-title=\"{{'label_information'|trad}}\" data-content=\"{{'label_organize_as_information'|trad}}\"></i>" +
    "" +
    "								<input data-searchbox=\"10\" data-placeholder=\"<img width=31 class='padding5' src='{{user.smallPhoto}}'></img><strong>{{user.fullName}}</strong>\" ui-select2=\"organizationsQuery\" ng-model=\"myAddEventForm.organization\" name=\"organization\" data-format=\"true\" style=\"width:100%\" />" +
    "							</div>" +
    "							" +
    "							<hr ng-show=\"organizations.length > 0\" />" +
    "							" +
    "							<div class=\"controls\">" +
    "								<label class=\"checkbox\">" +
    "									<input type=\"checkbox\" name=\"publicPhotos\" checked=\"checked\" ng-model=\"myAddEventForm.publicPhotos\" />" +
    "									{{'label_public_photos'|trad}}" +
    "								</label>" +
    "							</div>" +
    "						" +
    "							<div class=\"controls\">" +
    "								<label class=\"checkbox\">" +
    "									<input type=\"checkbox\" name=\"automaticAcceptance\" checked=\"checked\" ng-model=\"myAddEventForm.automaticAcceptance\" />" +
    "									{{'label_automatic_acceptance'|trad}}" +
    "								</label>" +
    "							</div>" +
    "							" +
    "							<hr ng-show=\"communities.length > 0\" />" +
    "							" +
    "							<!-- Communautés -->" +
    "							<div class=\"controls\" ng-show=\"communities.length > 0\">" +
    "								{{'label_organize_for'|trad}} <i class=\"icon-question-sign\" popover data-trigger=\"hover\" data-title=\"{{'label_information'|trad}}\" data-content=\"{{'label_organize_for_information'|trad}}\"></i>" +
    "" +
    "								<input data-searchbox=\"10\" data-placeholder=\"{{'label_community_none'|trad}}\" ui-select2=\"communitiesQuery\" ng-model=\"myAddEventForm.community\" name=\"community\" data-format=\"true\" style=\"width:100%\" />	" +
    "							</div>" +
    "							" +
    "							<!--<hr />" +
    "							" +
    "							<div class=\"controls\">" +
    "								<label class=\"checkbox\">" +
    "									<input type=\"checkbox\" name=\"virtualPayment\" checked=\"checked\" ng-model=\"myAddEventForm.virtualPayment\" />" +
    "									{{'label_virtual_payment'|trad}}" +
    "									" +
    "									<i class=\"icon-question-sign\" popover data-trigger=\"hover\" data-title=\"{{'label_information'|trad}}\" data-content=\"{{'label_virtual_payment_information'|trad}}\"></i>" +
    "								</label>" +
    "							</div>-->" +
    "							" +
    "							<!--<div class=\"controls\">" +
    "								<label class=\"checkbox\">" +
    "									<input type=\"checkbox\" name=\"publicPhotos\" checked=\"checked\" ng-model=\"myAddEventForm.publicPhotos\" />" +
    "									Evenement privé (seulement les personnes que j'invite)" +
    "								</label>" +
    "							</div>-->" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "			</div>" +
    "" +
    "			<div class=\"form-actions\">" +
    "" +
    "				<div class=\"pull-left\">" +
    "					<loader  data-sending=\"sending\" data-action=\"submit\" data-label=\"label_validate\"></loader>" +
    "				</div>" +
    "						" +
    "				<div ng-show=\"photo\" class=\"pull-left padding5 text-info\">" +
    "			       {{'label_long_time_information'|trad}}" +
    "		      	</div>" +
    "" +
    "				<span class=\"clear\"></span>" +
    "" +
    "			</div>" +
    "		</form>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/events/cards/list.html",
    "<div id=\"{{resource.id}}\">" +
    "	<div class=\"row-fluid\">" +
    "		<div class=\"span1\">" +
    "			<div class=\"margin-left margin-top margin-bottom\">" +
    "				<img ng-src=\"{{resource.smallPhoto}}\" />" +
    "			</div>" +
    "		</div>" +
    "" +
    "		<div class=\"span8\">" +
    "			<div class=\"margin-right margin-top margin-bottom\">" +
    "				<div class=\"px16\"><a href=\"{{'#/events/' + resource.id + '/' + cleanUrl(resource.title)}}\">{{resource.title}}</a></div>" +
    "" +
    "				<span class=\"px13\">{{\"label_by\"|trad}}" +
    "					<a href=\"#/users/{{resource.organizer.id}}\">" +
    "						{{resource.organizer.name}} {{resource.organizer.lastName}}" +
    "					</a>" +
    "				</span>" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		<div class=\"padding span3\">" +
    "			<div ng-switch on=\"status\"> 				" +
    "   				<div ng-switch-when=\"true\">" +
    "   					<span class=\"label label-{{resource.cColor}} pull-right\" tooltip data-title=\"{{resource.cDescription}}\">{{resource.cLabel}}</span>" +
    "   				</div>" +
    "   				<div ng-switch-default>" +
    "   					<price price=\"resource.fullPrice\" class=\"pull-right\"></price>" +
    "   				</div>" +
    "   			</div>" +
    "		</div>" +
    "	</div>" +
    "</div>	"
  );

  $templateCache.put("assets/dev/views/events/cards/medium.html",
    "<div id=\"{{resource.id}}\">" +
    "	<div class=\"row-fluid header\">" +
    "		<div class=\"span2\">" +
    "			<div class=\"margin-left margin-top margin-bottom\">" +
    "				<a href=\"{{'#/events/' + resource.id + '/' + cleanUrl(resource.title)}}\">" +
    "					<img ng-src=\"{{resource.smallPhoto}}\" tooltip data-title=\"{{resource.category.label}}\" />" +
    "				</a>" +
    "			</div>" +
    "		</div>" +
    "" +
    "		<div class=\"span8\">" +
    "			<div class=\"margin-right margin-top margin-bottom\">" +
    "				<div class=\"px16\"><a href=\"{{'#/events/' + resource.id + '/' + cleanUrl(resource.title)}}\">{{resource.title}}</a></div>" +
    "" +
    "				<span class=\"px13\">{{\"label_by\"|trad}}" +
    "					<a href=\"#/users/{{resource.organizer.id}}\">" +
    "						{{resource.organizer.name}} {{resource.organizer.lastName}}" +
    "					</a>" +
    "				</span>" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		<div class=\"padding span2\">" +
    "			<div ng-switch on=\"status\"> 				" +
    "   				<div ng-switch-when=\"true\">" +
    "   					<span class=\"label label-{{resource.cColor}} pull-right\" tooltip title=\"{{resource.cDescription}}\">{{resource.cLabel}}</span>" +
    "   				</div>" +
    "   				<div ng-switch-default>" +
    "   					<price price=\"resource.fullPrice\" class=\"pull-right\"></price>" +
    "   				</div>" +
    "   			</div>" +
    "		</div>" +
    "	</div>" +
    "	    	" +
    "	<div class=\"padding px13\">" +
    "    	<div>" +
    "	    	<div>" +
    "				<span class=\"add-on\"><i class=\"icon-map-marker\"></i></span>" +
    "				<span>{{resource.address.label}}</span>" +
    "			</div>" +
    "			" +
    "			<div>" +
    "				<span class=\"add-on\"><i class=\"icon-calendar\"></i></span>" +
    "				<span>{{[resource.startTimestamp,resource.endTimestamp] |formatedDate}}</span>" +
    "			</div>" +
    "    	</div>" +
    "    	" +
    "    	<div class=\"px12\" ng-bind-html-unsafe=\"resource.description | noHtmlTags | truncate:140\"></div>" +
    "	</div>" +
    "	" +
    "	<div class=\"tags actions row-fluid\">" +
    "		<div class=\"span8 padding\">" +
    "			<span ng-repeat=\"tag in resource.tags\" class=\"label label-info tag\"><i class=\"icon-tag icon-white\"></i>" +
    "				<a ng-click=\"searchTag(resource.id,tag)\" href=\"\">{{tag}}</a>" +
    "			</span>" +
    "		</div>" +
    "				" +
    "		<div class=\"span4\">" +
    "			<div class=\"pull-right\">" +
    "				<a class=\"action padding pull-left hover\" href=\"javascript:;\" " +
    "					share " +
    "					description=\"resource.description\" " +
    "					atitle=\"resource.title\"  " +
    "					url=\"Config.webURL + '#/events/' + resource.id + '/' + cleanUrl(resource.title)\" " +
    "					tooltip " +
    "					data-title=\"{{'label_share'|trad}}\"" +
    "				><i class=\"icon-share\"></i></a>" +
    "			" +
    "				<span class=\"clear\"></span>" +
    "			</div>" +
    "			" +
    "			<span class=\"clear\"></span>" +
    "		</div>" +
    "	</div>" +
    "</div>	"
  );

  $templateCache.put("assets/dev/views/events/cards/small.html",
    "<a href=\"{{'#/events/' + resource.id + '/' + cleanUrl(resource.title)}}\">" +
    "	<img ng-src=\"{{resource.smallPhoto}}\" tooltip title=\"{{resource.title}} {{'label_by'|trad}} {{resource.organizer.fullName}}\" />" +
    "</a>"
  );

  $templateCache.put("assets/dev/views/events/event.html",
    "<div id=\"event\" class=\"block margin-top padding-bottom\" fade ng-init=\"init()\" ng-cloack>" +
    "    <div class=\"row-fluid\">" +
    "    	<!-- Informations -->" +
    "    	<ng-include  src=\"Config.templatesPublicURL+'events/includes/infos.html'\"></ng-include>" +
    "    	" +
    "    	<div class=\"span9 padding-top padding-right\">" +
    "    		<div class=\"alert alert-{{getEventLabel(eventSettings.participation.currentStatus.abbreviation)}}\" ng-show=\"role!='organizer' && eventSettings.participation && eventSettings.currentStatus.abbreviation != 'completed_event'\">" +
    "				<a class=\"close\" data-dismiss=\"alert\" href=\"#\">&times;</a>" +
    "				{{eventSettings.participation.currentStatus.description}}" +
    "			</div>" +
    "			" +
    "			<div class=\"alert alert-{{getEventLabel(eventSettings.currentStatus.abbreviation)}}\" ng-show=\"role=='organizer'\">" +
    "				<a class=\"close\" data-dismiss=\"alert\" href=\"#\">&times;</a>" +
    "				{{eventSettings.currentStatus.description}}" +
    "			</div>" +
    "			" +
    "			<div class=\"alert alert-warning\" ng-show=\"role != 'organizer' && ((!eventSettings.participation && eventSettings.currentStatus.abbreviation == 'full_event') ||(eventSettings.participation && eventSettings.currentStatus.abbreviation == 'completed_event') )\">" +
    "				<a class=\"close\" data-dismiss=\"alert\" href=\"#\">&times;</a>" +
    "				{{eventSettings.currentStatus.description}}" +
    "			</div>" +
    "			" +
    "			<div class=\"alert alert-success\" ng-show=\"role !='organizer' && !eventSettings.participation && eventSettings.currentStatus.abbreviation == 'completed_event'\">" +
    "				{{'label_event_statut_completed'|trad}}" +
    "			</div>" +
    "  " +
    "    		<!-- Menu -->" +
    "    		<ng-include  src=\"Config.templatesPublicURL+'events/includes/menu.html'\"></ng-include>" +
    "	    	" +
    "	    	<div ui-view></div>" +
    "	    </div>" +
    "    </div>   " +
    "</div>"
  );

  $templateCache.put("assets/dev/views/events/includes/general.html",
    "<!-- TODO variables non traduites -->" +
    "<div class=\"span8\" ng-init=\"initGeneral()\">" +
    "	<div class=\"block\">" +
    "		<div id=\"smap\"  map-box-small style=\"min-height: 300px\">" +
    "" +
    "			<div class=\"weather margin-right margin-top padding pull-right\" ng-show=\"showWeather\" fade>" +
    "				<canvas id=\"weatherIcon\" width=\"64\" height=\"64\"></canvas>" +
    "				" +
    "				<div class=\"margin-top text-center\">" +
    "					{{temperature}}°C" +
    "				</div>" +
    "			</div>" +
    "		</div>" +
    "	</div>" +
    "" +
    "	<div class=\"block margin-top\">" +
    "		<div class=\"nav-header header padding\">" +
    "			{{'label_description'|trad}}" +
    "		</div>" +
    "" +
    "		<p class=\"padding text-justify\" ng-bind-html-unsafe=\"eventSettings.description\"></p>" +
    "" +
    "		<hr ng-show=\"{{eventSettings.description}}\" />" +
    "" +
    "		<p class=\"padding\">" +
    "			{{eventSettings.imperative}}" +
    "		</p>" +
    "	</div>" +
    "" +
    "	<div class=\"block margin-top\">" +
    "		<div class=\"nav-header header padding\">" +
    "			{{formatParticipant()}} {{'label_participants'|trad}}" +
    "		</div>" +
    "" +
    "		<div class=\"row-fluid\" ng-show=\"see('participants-hovercard')\" >" +
    "			<!-- affiche l'organisateur de l'événément -->" +
    "			<card class=\"span2\" data-resource=\"eventSettings.organizer\" data-type=\"users\" data-format=\"small\"></card>" +
    "			" +
    "			<card class=\"span2\"" +
    "				data-type=\"users\" " +
    "				data-format=\"small\" " +
    "				data-resource=\"participation.member\" " +
    "				ng-repeat=\"participation in (acceptedParticipant = (participantsList|filter:filterParticipantsList))\">" +
    "			</card>" +
    "			" +
    "			<div class=\"span2 padding \" ng-show=\"getAllGuests() > 0\">" +
    "				<b>+ {{getAllGuests()}} {{\"label_guests\" | trad}}</b>" +
    "			</div>" +
    "		</div>" +
    "	</div>" +
    "	" +
    "	<hr ng-show=\"see('comments')\" />" +
    "	" +
    "	<div ng-show=\"see('comments')\">" +
    "		<form class=\"row-fluid\">" +
    "			<div class=\"controls controls-row\">" +
    "				<div class=\"input-append input-prepend span12\">" +
    "					<textarea name=\"comment\" class=\"span12\" rows=\"3\" style=\"resize: none;\" ng-model=\"newComment\" placeholder=\"{{'label_add_comment'|trad}}\"></textarea>" +
    "" +
    "					<button class=\"btn btn-info\" ng-disabled=\"!newComment || newComment.length < 2\" type=\"button\" ng-click=\"addComment(newComment);newComment = ''\">" +
    "						{{'label_send'|trad}}" +
    "					</button>" +
    "				</div>" +
    "			</div>" +
    "		</form>" +
    "" +
    "		<card class=\"comment margin-bottom\" data-resource=\"comment\" data-type=\"comments\" data-format=\"medium\" ng-repeat=\"comment in commentsList\" fade></card>" +
    "" +
    "	</div>" +
    "</div>" +
    "" +
    "<div class=\"span4\">" +
    "	<div class=\"block\" ng-show=\"see('participate-block')\">" +
    "		<div class=\"nav-header header padding\">" +
    "			<div ng-switch on=\"eventSettings.participation.guests > 0\">" +
    "				<span ng-switch-when=\"true\">{{'label_participate'|trad}} ({{'label_with'|trad}} {{eventSettings.participation.guests}} {{'label_guests'|trad}})</span>" +
    "				<span ng-switch-when=\"false\">{{'label_participate'|trad}}</span>" +
    "			</div>" +
    "		</div>" +
    "" +
    "		<div class=\"padding\">" +
    "			<div class=\"padding-top text-center\">" +
    "				<price price=\"eventSettings.fullPrice\"></price>" +
    "" +
    "				<italic ng-show=\"eventSettings.participation.guests > 0 && eventSettings.fullPrice\" class=\"price\" style=\"font-size: 12px\">" +
    "					({{'label_by_person'|trad}})" +
    "				</italic>" +
    "			</div>" +
    "" +
    "			<hr/>" +
    "" +
    "			<div>" +
    "				<input type=\"button\" class=\"btn btn-success btn-large btn-block\" ng-show=\"see('participate')\" ng-click=\"confirmationParticipation()\" value=\"{{'label_participate'|trad}}\"/>" +
    "				<input type=\"button\" class=\"btn btn-success btn-large btn-block\" ng-show=\"see('participate-requested')\" ng-click=\"confirmationParticipation()\" value=\"{{'label_participate'|trad}}\"/>" +
    "				<input type=\"button\" class=\"btn btn-success btn-large btn-block\" ng-show=\"see('participate-invited')\" ng-click=\"confirmationParticipation()\" value=\"{{'label_participate_invited'|trad}}\"/>" +
    "				" +
    "				" +
    "				<button type=\"button\" class=\"btn btn-danger btn btn-block\" ng-show=\"see('cancel')\"  ng-click=\"confirmationCancelEvent()\">" +
    "					{{'label_cancel_event'|trad}}" +
    "				</button>" +
    "				<button type=\"button\" class=\"btn btn-warning btn-large btn-block\" ng-show=\"see('pay')\" ng-click=\"confirmationPayment()\">" +
    "					{{'label_pay_participation'|trad}}" +
    "				</button>" +
    "				<button type=\"button\" class=\"btn btn-danger btn btn-block\" ng-show=\"see('cancelParticipant')\" ng-click=\"confirmationCancelParticipant()\">" +
    "					{{'label_cancel_participation'|trad}}" +
    "				</button>" +
    "			</div>" +
    "		</div>" +
    "	</div>" +
    "	" +
    "	<div class=\"block \" ng-class=\"{'margin-top': see('participate-block')}\">" +
    "		<div class=\"nav-header header padding\">{{'label_organizer'|trad}}</div>" +
    "		" +
    "		<div ng-hide=\"eventSettings.organization\">" +
    "			<card data-resource=\"eventSettings.organizer\" data-type=\"users\" data-format=\"medium\"></card>" +
    "		</div>" +
    "		" +
    "		<div ng-show=\"eventSettings.organization\">" +
    "			<card data-resource=\"eventSettings.organization\" data-type=\"organizations\" data-format=\"medium\"></card>" +
    "		</div>" +
    "	</div>" +
    "		" +
    "	<div class=\"block margin-top\" ng-show=\"similarEvents.length > 0\">" +
    "		<div class=\"nav-header header padding\">{{'label_similar_events'|trad}}</div>" +
    "		" +
    "		<div class=\"padding\">" +
    "			<div class=\"row-fluid\">" +
    "	       		<custom ng-repeat=\"event in similarEvents\">" +
    "					<custom ng-switch on=\"$index % 2\">" +
    "		            	<custom ng-switch-when=\"0\">" +
    "			                <div class=\"row-fluid\" ng-hide=\"similarEvents.length == 0\">" +
    "			                    <div ng-show=\"similarEvents[$index+0]\" class=\"span4\" ><card fade data-type=\"events\" data-format=\"small\" data-resource=\"similarEvents[$index+0]\"></card></div>" +
    "			                    <div ng-show=\"similarEvents[$index+1]\" class=\"span4\" ><card fade data-type=\"events\" data-format=\"small\" data-resource=\"similarEvents[$index+1]\"></card></div>" +
    "			                    <div ng-show=\"similarEvents[$index+2]\" class=\"span4\" ><card fade data-type=\"events\" data-format=\"small\" data-resource=\"similarEvents[$index+2]\"></card></div>" +
    "			                </div>" +
    "			            </custom>" +
    "			        </custom>" +
    "				</custom>			" +
    "			</div>" +
    "	   </div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/events/includes/infos.html",
    "<div class=\"span3\">" +
    "	<div class=\"margin-left margin-top margin-bottom block\" style=\"color: #333;\">" +
    "		<img ng-src=\"{{eventSettings.mediumPhoto + '?' + d}}\" width=\"100%\" />" +
    "	" +
    "		<div class=\"padding border-top header\">" +
    "			<h4>{{eventSettings.title}}</h4>" +
    "	" +
    "			<div>" +
    "				<div>" +
    "					<span class=\"add-on\"><i class=\"icon-flag\"></i></span>" +
    "					<span>{{eventSettings.category.label}}</span>" +
    "				</div>" +
    "	    		<div>" +
    "					<span class=\"add-on\"><i class=\"icon-map-marker\"></i></span>" +
    "					<span>{{eventSettings.address.label}}</span>" +
    "				</div>" +
    "				<div>" +
    "					<span class=\"add-on\"><i class=\"icon-calendar\"></i></span>" +
    "					<span>{{[eventSettings.startTimestamp, eventSettings.endTimestamp] |formatedDate}}</span>" +
    "				</div>	" +
    "				<!--<div>" +
    "					<span class=\"add-on\"><i class=\"icon-user icon-white\"></i></span>" +
    "					<span>{{eventSettings.ageBracket.label}}</span>" +
    "				</div>-->" +
    "	    		" +
    "	    		<hr ng-show=\"eventSettings.tags\" />" +
    "	    		" +
    "	    		<p class=\"tags\">" +
    "					<span ng-repeat=\"tag in eventSettings.tags\" class=\"label label-info tag\"><i class=\"icon-tag icon-white\"></i> <a href=\"\" ng-click=\"$emit('searchTag',{tag:tag})\">{{tag}}</a></span>" +
    "				</p>" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		<div class>" +
    "			<div class=\"pull-right\">" +
    "				<!--<a class=\"action padding pull-left hover\" href=\"javascript:;\" tooltip title=\"{{'label_clone'|trad}}\"><i class=\"icon-retweet\"></i></a>-->" +
    "				" +
    "				<a class=\"action padding pull-left hover\" href=\"javascript:;\"" +
    "					tooltip" +
    "					embeded" +
    "					data-id=\"eventSettings.id\"" +
    "					data-type=\"e\"" +
    "					data-title=\"{{'label_embed'|trad}}\"" +
    "				><i class=\"icon-bookmark\"></i></a>" +
    "				" +
    "				<a class=\"action padding pull-left hover\" share tooltip title=\"{{'label_share'|trad}}\"><i class=\"icon-share\"></i></a>" +
    "			" +
    "				<span class=\"clear\"></span>" +
    "			</div>" +
    "			" +
    "			<span class=\"clear\"></span>" +
    "		</div>" +
    "	</div>" +
    "	" +
    "	<div class=\"margin-left block padding\" ng-show=\"eventSettings.community\">" +
    "		<div class=\"row-fluid\">" +
    "			<div class=\"span2\">" +
    "				<a href=\"#/organizations/{{eventSettings.community.id}}\"><img ng-src=\"{{eventSettings.community.smallPhoto}}\" /></a>" +
    "			</div>" +
    "			" +
    "			<div class=\"span10\">" +
    "				{{'label_organized_for'|trad}} <a href=\"#/organizations/{{eventSettings.community.id}}\">{{eventSettings.community.name}}</a>" +
    "			</div>" +
    "		</div>" +
    "	</div>" +
    "</div>" +
    ""
  );

  $templateCache.put("assets/dev/views/events/includes/menu.html",
    "<ul class=\"nav nav-tabs\">" +
    "	<li class=\"{{isPageActive('event.general')}}\">" +
    "		<a href=\"{{'#/events/' + eventSettings.id + '/' + cleanUrl(eventSettings.title)}}\">{{'label_information'|trad}}</a>" +
    "	</li>" +
    "	<li class=\"{{isPageActive('event.participations')}}\" ng-show=\"see('event.participations')\">" +
    "		<a href=\"{{'#/events/' + eventSettings.id + '/' + cleanUrl(eventSettings.title) + '/participations'}}\" >{{'label_participations'|trad}}</a>" +
    "	</li>" +
    "	<li class=\"{{isPageActive('event.photos')}}\" ng-show=\"see('event.photos')\">" +
    "		<a href=\"{{'#/events/' + eventSettings.id + '/' + cleanUrl(eventSettings.title) + '/photos'}}\">{{'label_photos'|trad}}</a>" +
    "	</li>" +
    "	<li class=\"{{isPageActive('event.settings')}}\" ng-show=\"see('event.settings')\">" +
    "		<a href=\"{{'#/events/' + eventSettings.id + '/' + cleanUrl(eventSettings.title) + '/settings'}}\">{{'label_settings'|trad}}</a>" +
    "	</li>" +
    "	<span class=\"clear\"></span>" +
    "</ul>" +
    ""
  );

  $templateCache.put("assets/dev/views/events/includes/participants.html",
    "<div administrate-participants class=\"margin-top margin-bottom\" ng-init=\"initParticipations()\">" +
    "	<div ng-show=\"eventSettings.fullPrice > 0\">" +
    "		<div class=\"alert alert-info\" ng-show=\"showRecoltedPrice && participantsList > 0\" angular-html-bind=\"label_recolted\"></div>		" +
    "" +
    "		<hr ng-show=\"showRecoltedPrice && participantsList > 0\"/>" +
    "	</div>" +
    "" +
    "	<div class=\"filter-participants-container\" ng-cloack>" +
    "		<div class=\"alert alert-info\" ng-show=\"participantsList == 0\">" +
    "			{{\"label_no_event_participations\"|trad}}" +
    "		</div>" +
    "		<div class=\"btn-group row-fluid\" ng-model=\"currentFilter\" bs-buttons-radio>" +
    "		    <button type=\"button\" class=\"btn span2\" value=\"\" ng-show=\"countParticipants('') > 0\">" +
    "		    		{{'label_all'|trad}} " +
    "		    		<span class=\"badge badge\">" +
    "		    			{{countParticipants('')}}" +
    "		    		</span>" +
    "		    </button>" +
    "		    <button type=\"button\" class=\"btn span2\" value=\"accepted_participation\" ng-show=\"countParticipants('accepted_participation') > 0\">" +
    "		    	{{'label_accepted'|trad}}" +
    "		    	<span class=\"badge badge-success\">" +
    "		    		{{countParticipants('accepted_participation')}}" +
    "		    	</span>" +
    "		    </button>" +
    "		    <button type=\"button\" class=\"btn span2\" value=\"refused_participation\" ng-show=\"countParticipants('refused_participation') > 0\">" +
    "		    	{{'label_refused'|trad}}" +
    "		    	<span class=\"badge badge-important\">" +
    "		    		{{countParticipants('refused_participation')}}" +
    "		    	</span>" +
    "		    </button>" +
    "		    <button type=\"button\" class=\"btn span2\" value=\"cancelled_participation\" ng-show=\"countParticipants('cancelled_participation') > 0\">" +
    "		    	{{'label_cancelled'|trad}}" +
    "		    	<span class=\"badge badge-success\">" +
    "		    		{{countParticipants('cancelled_participation')}}" +
    "		    	</span>" +
    "		    </button>" +
    "		    <button type=\"button\" class=\"btn span2\" value=\"pending_participation\" ng-show=\"countParticipants('pending_participation') > 0\">" +
    "		    	{{'label_pending'|trad}}" +
    "		    	<span class=\"badge badge-warning\">" +
    "		    		{{countParticipants('pending_participation')}}" +
    "		    	</span>" +
    "		    </button>" +
    "		    <button type=\"button\" class=\"btn span4\" value=\"pending_payment\" ng-show=\"countParticipants('pending_payment') > 0\">" +
    "		    	{{'label_pending_payment'|trad}}" +
    "		    	<span class=\"badge badge-success\" >" +
    "		    		{{countParticipants('pending_payment')}}" +
    "		    	</span>" +
    "		    </button>	" +
    "		    <button type=\"button\" class=\"btn span4\" value=\"requested_participation\" ng-show=\"countParticipants('requested_participation') > 0\">" +
    "		    	{{'label_requested_participation'|trad}}" +
    "		    	<span class=\"badge badge-success\" >" +
    "		    		{{countParticipants('requested_participation')}}" +
    "		    	</span>" +
    "		    </button>		  		  " +
    "		</div>" +
    "	</div>" +
    "	" +
    "	<div class=\"filtered-participants margin-top\">" +
    "		<div ng-repeat=\"participation in (filteredParticipants = (participantsList | filter:filterParticipants))\" class=\"margin-bottom block\">	" +
    "			<div class=\"padding border-bottom\" ng-show=\"showButton(participation)\">" +
    "				" +
    "				<div class=\"alert alert-warning pull-left\" ng-show=\"participation.guests > 0\">" +
    "					<b>{{'label_with'|trad}} {{participation.guests}} {{'label_guests'|trad}}</b>" +
    "				</div>" +
    "				" +
    "				<span class=\"pull-right\" ng-hide=\"seeConfirmation(participation)\">" +
    "					<a class=\"btn btn-danger\" ng-click=\"showConfirmation(participation, 'refuse')\" ng-show=\"showButton(participation) && see('administrate-participants-refuse')\">{{'label_refuse'|trad}}</a>	" +
    "					<a class=\"btn btn-success\" ng-click=\"showConfirmation(participation, 'accept')\" ng-show=\"showButton(participation) && see('administrate-participants-accept')\">{{'label_accept'|trad}}</a>" +
    "				</span>" +
    "				" +
    "				<span class=\"pull-right\" ng-show=\"seeConfirmation(participation)\">" +
    "					{{'label_definitive_information'|trad}}" +
    "					" +
    "					<a class=\"btn btn-warning\" ng-click=\"hideConfirmation(participation)\">{{'label_cancel'|trad}}</a>" +
    "					<a class=\"btn btn-success\" ng-click=\"confirmedAction(participation)\">{{'label_validate'|trad}}</a>" +
    "				</span>" +
    "				" +
    "				<span class=\"clear\"></span>" +
    "			</div>" +
    "" +
    "			<card data-type=\"users\" data-resource=\"participation.member\" data-format=\"medium\"></card>" +
    "" +
    "		</div>" +
    "	</div>" +
    "</div>" +
    "" +
    "<img class=\"loader\" ng-show=\"loading\" src=\"assets/images/ajax-loader.gif\">"
  );

  $templateCache.put("assets/dev/views/events/includes/photos.html",
    "<div class=\"margin-top margin-bottom\" ng-init=\"initPhotos()\" ng-hide=\"loading\">" +
    "	<div class=\"block\" ng-show=\"see('add-photos')\">" +
    "		<div class=\"header nav-header padding\">" +
    "			<div class=\"pull-left\">{{'label_photos'|trad}}</div>" +
    "			" +
    "			<span class=\"clear\"></span>" +
    "		</div>" +
    "		" +
    "		<div class=\"padding\">" +
    "			<form>	" +
    "				<div class=\"controls-row\">" +
    "					<span class=\"btn btn-success fileinput-button span4 pull-left\">" +
    "		                <i class=\"icon-plus icon-white\"></i>" +
    "		                <span>{{'label_upload'|trad}}</span>" +
    "		                <input file-upload type=\"file\" cs-type=\"ShowEventCtrl\" name=\"photo\" multiple>" +
    "		            </span>" +
    "		           " +
    "					<div ng-show=\"showProgress\" id=\"progress\" class=\"progress span8\">" +
    "					    <div class=\"bar\" style=\"width: {{currentProgress}}%; height: 30px;\"></div>" +
    "					</div>" +
    "				</div>" +
    "			</form>" +
    "		</div>" +
    "" +
    "	</div>" +
    "	" +
    "	<hr ng-show=\"see('add-photos')\"/>" +
    "	<div ng-hide=\"photos.length > 0\" class=\"alert alert-info\">{{'label_no_event_photos'|trad}}</div>" +
    "	<div id=\"gallery\" ng-show=\"photos.length > 0\" data-toggle=\"modal-gallery\" data-target=\"#modal-gallery\">" +
    "		<div class=\"row-fluid\">" +
    "			<ul class=\"thumbnails\">" +
    "				<li class=\"span3\" ng-repeat=\"photo in photos\" fade>" +
    "					<div class=\"box size11\">" +
    "						<a href=\"{{photo.mediumUrl+'?token='+ token}}\" class=\"thumbnail\" title=\"{{'label_by'|trad}} {{photo.member.fullName}}\" data-gallery=\"gallery\">" +
    "							<img tooltip data-placement=\"top\" style=\"display: block;\" title=\"{{'label_by'|trad}} {{photo.member.fullName}}\" ng-src=\"{{photo.smallUrl+'?token='+ token}}\" fade />" +
    "						</a>" +
    "					</div>	" +
    "				</li>" +
    "			</ul>	" +
    "		</div>" +
    "	</div>" +
    "</div>" +
    "" +
    "<div class=\"span6 offset4\" ng-show=\"loading\"><img class=\"intern-loader\" src=\"assets/images/ajax-loader.gif\"></div>" +
    "" +
    "<div id=\"modal-gallery\" class=\"modal modal-gallery hide fade\" tabindex=\"-1\">" +
    "    <div class=\"modal-header\">" +
    "        <a class=\"close\" data-dismiss=\"modal\">&times;</a>" +
    "        <h3 class=\"modal-title\"></h3>" +
    "    </div>" +
    "    " +
    "    <div class=\"modal-body\">" +
    "    	<div class=\"modal-image\"></div>" +
    "    </div>" +
    "    " +
    "    <div class=\"modal-footer\">" +
    "        <!--<a class=\"btn btn-primary modal-next\">Next <i class=\"icon-arrow-right icon-white\"></i></a>" +
    "        <a class=\"btn btn-info modal-prev\"><i class=\"icon-arrow-left icon-white\"></i> Previous</a>" +
    "        -->" +
    "       <!-- <button id=\"toggle-fullscreen\" ng-click=\"fullScreen()\" class=\"btn btn-primary\" data-toggle=\"button\">Toggle Fullscreen</button>-->" +
    "        <a class=\"btn btn-success modal-play modal-slideshow\" ng-click=\"slideshow()\" data-slideshow=\"5000\"><i class=\"icon-play icon-white\"></i>{{'label_slideshow'|trad}}</a>" +
    "        <a class=\"btn modal-download\" target=\"_blank\"><i class=\"icon-download\"></i>{{'label_download'|trad}}</a>" +
    "    </div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/events/includes/settings.html",
    "<div class=\"margin-top margin-bottom\" ng-init=\"initSettings()\">" +
    "	" +
    "	<!-- Form photo -->" +
    "	<form>" +
    "		<div class=\"row-fluid\">" +
    "			<div class=\"span3\">" +
    "				<span class=\"btn btn-success fileinput-button\">" +
    "	                <i class=\"icon-plus icon-white\"></i>" +
    "	                <span>{{'label_upload_event_modify'|trad}}</span>" +
    "	                <input file-upload cs-type=\"EventsSettingsCtrl\" id=\"photo\" type=\"file\" name=\"photo\" />" +
    "	                " +
    "	            </span>" +
    "			</div>" +
    "			" +
    "			<div ng-show=\"showProgress\" id=\"progress\" class=\"progress span9\">" +
    "			    <div class=\"bar\" style=\"width: {{currentProgress}}%; height: 30px\"></div>" +
    "			</div>" +
    "		</div>" +
    "	</form>" +
    "	" +
    "	<hr />" +
    "	" +
    "	<form name=\"eventSettingsForm\" novalidate>" +
    "		<div class=\"control-group\">" +
    "	    	<label class=\"control-label\">{{'label_title'|trad}}</label>" +
    "    		" +
    "    		<div class=\"controls\">" +
    "  				<input ng-blur ng-focus type=\"text\" name=\"title\" ng-model=\"myEventSettingsForm.title\"" +
    "					placeholder=\"{{'label_title'|trad}}\"" +
    "					required" +
    "					ng-minlength=\"2\"" +
    "					ng-maxlength=\"200\"" +
    "					class=\"input-xxlarge\"" +
    "				>" +
    "	" +
    "				<span class=\"clear\"></span>" +
    "	" +
    "				<span class=\"text-error\" ng-show=\"!titleshow && csValidate(formSent,eventSettingsForm.title.$error.required,eventSettingsForm.title.$pristine)\">{{'error_event_title_missing'|trad}}</span>" +
    "				<span class=\"text-error\" ng-show=\"!titleshow && csValidate(formSent,eventSettingsForm.title.$error.minlength || eventSettingsForm.title.$error.maxlength,eventSettingsForm.title.$pristine)\">{{'error_event_title_size'|trad}}</span>" +
    "			</div>" +
    "	  	</div>" +
    "		" +
    "		<hr/>" +
    "		" +
    "		<div class=\"control-group\">" +
    "	    	<label class=\"control-label\">{{'label_description'|trad}}</label>" +
    "    		" +
    "    		<div class=\"controls\">		    " +
    "				<div ng-blur ng-focus" +
    "					rich-text-editor" +
    "					name=\"description\"" +
    "					ng-model=\"myEventSettingsForm.description\"" +
    "					placeholder=\"{{'label_description'|trad}}\"" +
    "					required" +
    "					ng-minlength=\"10\"" +
    "					ng-maxlength=\"5000\"" +
    "				></div>" +
    "	" +
    "				<span class=\"clear\"></span>" +
    "	" +
    "				<span class=\"text-error\" ng-show=\"!descriptionshow &&  csValidate(formSent,eventSettingsForm.description.$error.required,eventSettingsForm.description.$pristine)\">{{'error_event_description_missing'|trad}}</span>" +
    "				<span  class=\"text-error\" ng-show=\"!descriptionshow &&  csValidate(formSent,eventSettingsForm.description.$error.length || eventSettingsForm.description.$error.length,eventSettingsForm.description.$pristine)\">{{'error_event_description_size'|trad}}</span>" +
    "			</div>" +
    "		</div>		" +
    "		" +
    "		<!-- Participants -->" +
    "		<p ng-show=\"participantsList && (countParticipants() > 0)\" angular-html-bind=\"label_event_settings_participants_number\" class=\"alert alert-info\"></p>" +
    "		<div class=\"controls controls-row\" ng-show=\"participantsList\">" +
    "			<div class=\"input-append span6\" style=\"margin-left: 0;\">" +
    "				<input type=\"text\" name=\"minParticipants\" ng-model=\"myEventSettingsForm.minParticipants\"" +
    "				placeholder=\"{{'label_minparticipants'|trad}}\"" +
    "				placement=\"top\"" +
    "				min=\"{{$parent.countParticipants() +3}}\"" +
    "				ng-change=\"compareParticipants('minParticipants')\"" +
    "				>" +
    "			" +
    "				<a class=\"add-on btn\" ng-click=\"decParticipant('minParticipants')\">-</a>" +
    "				<a class=\"add-on btn\" ng-click=\"incParticipant('minParticipants')\">+</a>" +
    "			</div>" +
    "		" +
    "			<div class=\"input-append span6 padding-left\" style=\"margin-left: 0;\">" +
    "				<input type=\"text\" name=\"maxParticipants\" ng-model=\"myEventSettingsForm.maxParticipants\"" +
    "				placeholder=\"{{'label_maxparticipants'|trad}}\"" +
    "				placement=\"top\"" +
    "				min=\"2\"" +
    "				ng-change=\"compareParticipants('maxParticipants')\"" +
    "				>" +
    "" +
    "				<a class=\"add-on btn\" ng-click=\"decParticipant('maxParticipants')\">-</a>" +
    "				<a class=\"add-on btn\" ng-click=\"incParticipant('maxParticipants')\">+</a>" +
    "			</div>" +
    "" +
    "			<span class=\"clear\"></span>" +
    "" +
    "			<span class=\"text-error\" ng-show=\"incorrectParticipants\">{{'error_event_minParticipants_superior'|trad}}</span>" +
    "			<br ng-show=\"incorrectParticipants\"/>" +
    "			" +
    "			<span class=\"text-error\" ng-show=\"incorrectMaxParticipants\">{{'error_event_incorrect_max_participants'|trad}}</span>" +
    "			<br/>" +
    "			<span class=\"text-error\" ng-show=\"incorrectMinParticipants\">{{'error_event_incorrect_min_participants'|trad}}</span>" +
    "		</div>" +
    "		" +
    "		<hr />" +
    "" +
    "		<div class=\"controls controls-row\">" +
    "			<label class=\"checkbox\">" +
    "				<input type=\"checkbox\" name=\"publicPhotos\" checked=\"checked\" ng-model=\"myEventSettingsForm.publicPhotos\" />" +
    "				{{'label_public_photos'|trad}}" +
    "			</label>" +
    "		</div>" +
    "		" +
    "		<div class=\"controls controls-row\">" +
    "			<label class=\"checkbox\">" +
    "				<input type=\"checkbox\" name=\"automaticAcceptance\" checked=\"checked\" ng-model=\"myEventSettingsForm.automaticAcceptance\" />" +
    "				{{'label_automatic_acceptance'|trad}}" +
    "			</label>" +
    "		</div>" +
    "		" +
    "		<div class=\"form-actions\">" +
    "			<loader data-classes=\"btn-primary btn\" data-sending=\"sending\" data-action=\"submit\" data-label=\"label_update\"></loader>" +
    "		</div>		" +
    "	</form>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/events/modals/cancelEvent.html",
    "<div class=\"modal-header\" >" +
    "	<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
    "  	<h3>{{'modal_cancel_event_title'|trad}}</h3>" +
    "</div>" +
    "" +
    "<div class=\"modal-body\">" +
    "	<div class=\"alert alert-error\">" +
    "		{{'modal_cancel_event_content1'|trad}}" +
    "	</div>" +
    "	" +
    "	<p>{{'modal_cancel_event_content2'|trad}}</p>" +
    "  	" +
    "  	<hr />" +
    "  	" +
    "  	<p>{{\"modal_cancel_event_content3\"|trad}}</p>" +
    "  	  	" +
    "  	<form class=\"margin-top\">" +
    "  		<div class=\"row-fluid\">" +
    "  			<textarea type=\"text\" class=\"span12\" ng-model=\"reason\" placeholder=\"{{'label_why_cancel_event'|trad}}\"></textarea>" +
    "		</div>" +
    "	</form>" +
    "</div>" +
    "" +
    "<div class=\"modal-footer\">" +
    "	<button class=\"btn btn-success\" ng-click=\"dismiss()\">{{'label_back'|trad}}</button>" +
    "	<input type=\"submit\" class=\"btn btn-danger cancellingEvent\" data-loading-text=\"{{'label_loading'|trad}}\" ng-click=\"confirmedCancelEvent(reason,hide)\" value=\"{{'label_cancel_event'|trad}}\"/>" +
    "</div>" +
    ""
  );

  $templateCache.put("assets/dev/views/events/modals/cancelParticipation.html",
    "<div class=\"modal-header\" >" +
    "	<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
    "  	<h3>{{'modal_cancel_participation_title'|trad}}</h3>" +
    "</div>" +
    "" +
    "<div class=\"modal-body\">" +
    "	<div class=\"alert alert-error\">" +
    "		{{'modal_cancel_participation_content1'|trad}}" +
    "	</div>" +
    "		" +
    "	<div class=\"alert alert-info\">" +
    "		{{'modal_cancel_participation_content2'|trad}}" +
    "	</div>" +
    "	" +
    "	<p ng-bind-html-unsafe=\"'modal_cancel_participation_content3'|trad\"></p>" +
    "  	" +
    "  	<div ng-show=\"role == 'accepted_participation'\">" +
    "	  	<hr />" +
    "	  	" +
    "	  	{{\"modal_cancel_participation_content4\"|trad}}" +
    "	  	  	" +
    "	  	<form class=\"margin-top\">" +
    "	  		<div class=\"row-fluid\">" +
    "	  			<textarea type=\"text\" class=\"span12\" ng-model=\"reason\" placeholder=\"{{'label_why_cancel_participation'|trad}}\"></textarea>" +
    "			</div>" +
    "		</form>" +
    "	</div>" +
    "</div>" +
    "	" +
    "<div class=\"modal-footer\">" +
    "	<button class=\"btn btn-success\" ng-click=\"dismiss()\">{{'label_back'|trad}}</button>" +
    "" +
    "	<input type=\"submit\" class=\"btn btn-danger cancellingParticipant\" data-loading-text=\"{{'label_loading'|trad}}\" ng-click=\"confirmedCancelParticipant(reason,hide)\" value=\"{{'label_cancel_participation'|trad}}\"/>" +
    "</div>" +
    ""
  );

  $templateCache.put("assets/dev/views/events/modals/missingInfos.html",
    "<div class=\"modal-header\" >" +
    "	<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
    "	<h3>{{\"modal_agebracket_title\"|trad}}</h3>" +
    "</div>" +
    "" +
    "<div class=\"modal-body\">" +
    "	<p class=\"alert alert-info\" ng-bind-html-unsafe=\"'modal_agebracket_content'|trad\"></p>" +
    "	" +
    "	<hr />" +
    "		" +
    "	<form name=\"missingInfosForm\">" +
    "		<div class=\"controls controls-row\" ng-show=\"setAgeBracket\">" +
    "			<div class=\"input-prepend\">" +
    "				<span class=\"add-on\"><i class=\"icon-user\"></i></span>" +
    "				<select name=\"ageBracket\" ng-model=\"myMissingInfosForm.ageBracket\" ng-options=\"age.abbreviation as age.label for age in ageBracketList\">" +
    "			    	<option style=\"display:none\" value=\"\">{{\"label_agebracket\"|trad}}</option>" +
    "			 	</select>" +
    "			</div>" +
    "		</div>" +
    "	</form>" +
    "</div>" +
    "" +
    "<div class=\"modal-footer\">" +
    "	<a class=\"btn btn-primary\" ng-click=\"hide()\">{{\"label_back\"|trad}}</a>" +
    "	" +
    "	<button type=\"submit\" ng-click=\"submitMissingInfos(myMissingInfosForm,hide)\" " +
    "		data-loading-text=\"{{'label_loading'|trad}}\" " +
    "		class=\"btn btn-success addingMissingInfos\" 		" +
    "		ng-disabled=\"enableSubmitMissingInfos()\">{{'label_update'|trad}}</button>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/events/modals/participate.html",
    "<div class=\"modal-header\" >" +
    "	<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
    " 	<h3>{{'modal_participation_title'|trad}}</h3>" +
    "</div>" +
    "" +
    "<div class=\"span6 offset2\" ng-show=\"loading\" ><img class=\"intern-loader\" src=\"assets/images/ajax-loader.gif\"></div>" +
    "" +
    "<div class=\"modal-body\">" +
    "	<div class=\"alert alert-warning\" ng-show=\"sameDaysEvents.length > 0\">	" +
    "		{{'modal_participation_same_events'|trad}}" +
    "		" +
    "		<br/>" +
    "		" +
    "		<ul>" +
    "			<li ng-repeat=\"ev in sameDaysEvents\">" +
    "				<a href=\"{{'#/events/' + ev.id + '/' + cleanUrl(ev.title)}}\">{{ev.title}}</a> {{[ev.startTimestamp,ev.endTimestamp] |formatedDate}}" +
    "			</li>" +
    "		</ul>" +
    "				" +
    "		{{'modal_participation_same_events_2'|trad}}" +
    "	</div>" +
    "	" +
    "	<div class=\"alert alert-info\" ng-hide=\"placesArray && placesArray.length > 1\">" +
    "		{{'modal_participation_content_no_guests'|trad}}" +
    "	</div>" +
    "	" +
    "	<div ng-show=\"placesArray && placesArray.length > 1\">" +
    "		<p ng-bind-html-unsafe=\"'modal_participation_content'|trad\"></p>" +
    "	  	" +
    "	  	<hr />" +
    "	  	" +
    "	  	<form class=\"form-horizontal\" ng-show=\"placesArray.length > 1\">" +
    "	  		<div class=\"control-group\">" +
    "		    	<label class=\"control-label\">{{'label_guests_number'|trad}}</label>" +
    "	    		" +
    "	    		<div class=\"controls\" ng-hide=\"eventSettings.places > 0\">" +
    "	  				<input type=\"number\" min=\"0\" max=\"4\" placeholder=\"{{'label_guests_number'|trad}}\" ng-model=\"guests\">" +
    "	  			</div>" +
    "	  		" +
    "	  			<div class=\"controls\" ng-show=\"eventSettings.places > 0\">" +
    "	  				<select ng-model=\"guests\" ng-options=\"value as value for (index, value) in placesArray\">" +
    "			          " +
    "			        </select>" +
    "	  			</div>" +
    "	  		</div>" +
    "	  	</form>" +
    "	 </div>" +
    "</div>" +
    "" +
    "<div class=\"modal-footer\">" +
    "	<button type=\"button\" class=\"btn btn-info\" ng-click=\"dismiss()\">{{'label_back'|trad}}</button>" +
    "	<button ng-show=\"!loading\" class=\"btn btn-success participating\" data-loading-text=\"{{'label_loading'|trad}}\" ng-click=\"participate(guests,hide)\">{{'label_participate'|trad}}</button>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/events/modals/pay.html",
    "<div class=\"modal-header\" >" +
    "	<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
    "	<h3>{{\"modal_payment_title\"|trad}}</h3>" +
    "</div>" +
    "" +
    "<div class=\"modal-body\">" +
    "	<div class=\"alert alert-info\" ng-bind-html-unsafe=\"'modal_payment_content1'|trad\"></div>" +
    "	" +
    "    <div ng-switch on=\"eventSettings.participation.guests > 0\">" +
    "       <div ng-switch-when=\"true\"><p angular-html-bind=\"modal_payment_content2\"></p></div>" +
    "    </div>" +
    "    " +
    "    <hr />" +
    "    " +
    "    <div class=\"row-fluid\">" +
    "    	<div class=\"span8\">" +
    "    		<b>{{\"modal_payment_amount\"|trad}}</b>" +
    "    	</div>" +
    "    	<div class=\"span4\">" +
    "    		<div class=\"padding label label-success pull-right\" style=\"font-size:22px;\">" +
    "    			<div ng-switch on=\"eventSettings.participation.guests > 0\">" +
    "       				<div ng-switch-when=\"true\">{{((eventSettings.participation.guests + 1) * eventSettings.fullPrice)|currency}}</div>" +
    "       				<div ng-switch-when=\"false\">{{eventSettings.fullPrice|currency}}</div>" +
    "       			</div>" +
    "    		</div>" +
    "    	</div>" +
    "    </div>" +
    "</div>" +
    "" +
    "<div class=\"modal-footer\">" +
    "	<a class=\"btn btn-primary\" ng-click=\"dismiss()\">{{\"label_back\"|trad}}</a>" +
    "	<input type=\"submit\" data-loading-text=\"{{'label_loading'|trad}}\" value=\"{{'label_pay_participation'|trad}}\" class=\"btn btn-success paying\" ng-click=\"confirmedPayment(hide)\"/>" +
    "</div>" +
    ""
  );

  $templateCache.put("assets/dev/views/events/modals/rib.html",
    "<div class=\"modal-header\" >" +
    "	<h3>{{'modal_beneficiary_title'|trad}}</h3>" +
    "</div>" +
    "" +
    "<form style=\"margin-bottom: 0;\" name=\"bicInfosForm\" novalidate ng-submit=\"submitBicInfos(hide,bicInfosForm, myBicInfosForm, formatedAddress, search)\">" +
    "	<div class=\"modal-body\">" +
    "		<div class=\"alert alert-info\">" +
    "			<button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button>" +
    "			" +
    "			<!-- Informations pour les organisations -->" +
    "			<p ng-show=\"isOrganization\" ng-bind-html-unsafe=\"'modal_beneficiary_content_organization'|trad\"></p>" +
    "			" +
    "			<p ng-hide=\"isOrganization\" ng-bind-html-unsafe=\"'modal_beneficiary_content'|trad\"></p>" +
    "		</div>" +
    "		<div class=\"controls controls-row\" ng-show=\"!isOrganization\" >" +
    "			<input type=\"text\" name=\"name\" ng-model=\"myBicInfosForm.name\"" +
    "				placeholder=\"{{'label_name'|trad}}\"" +
    "				ng-required=\"!isOrganization\"" +
    "				ng-minlength=\"2\"" +
    "			    ng-maxlength=\"50\"" +
    "			    ng-pattern=\"/^[a-zA-ZÀ-ÿ0-9 -]+$/\"" +
    "				ng-blur" +
    "				ng-focus" +
    "				class=\"span2\"" +
    "			/>" +
    "			<input type=\"text\" name=\"lastName\" ng-model=\"myBicInfosForm.lastName\"" +
    "				placeholder=\"{{'label_lastname'|trad}}\"" +
    "				ng-required=\"!isOrganization\"" +
    "				ng-minlength=\"2\"" +
    "			    ng-maxlength=\"50\"" +
    "			    ng-pattern=\"/^[a-zA-ZÀ-ÿ0-9 -]+$/\"" +
    "				class=\"span2\"" +
    "				ng-blur" +
    "				ng-focus" +
    "				style=\"margin-left: 30px !important;\"" +
    "			/>" +
    "			" +
    "			<span class=\"clear\"></span>" +
    "			<span class=\"text-error\" ng-show=\"!nameshow && csValidate(bicInfosSent,bicInfosForm.name.$error.pattern,bicInfosForm.name.$pristine)\">{{'error_member_name_invalid'|trad}}</span>" +
    "			<span class=\"text-error\" ng-show=\"!nameshow && csValidate(bicInfosSent,bicInfosForm.name.$error.minlength || bicInfosForm.name.$error.maxlength,bicInfosForm.name.$pristine)\">{{'error_member_name_size'|trad}}</span>			" +
    "			<span class=\"text-error\" ng-show=\"!nameshow && csValidate(bicInfosSent,bicInfosForm.name.$error.required,bicInfosForm.name.$pristine)\">{{'error_member_name_missing'|trad}}</span>" +
    "			" +
    "			<span class=\"text-error\" ng-show=\"!lastNameshow && csValidate(bicInfosSent,bicInfosForm.lastName.$error.pattern,bicInfosForm.lastName.$pristine)\">{{'error_member_lastname_invalid'|trad}}</span>" +
    "			<span class=\"text-error\" ng-show=\"!lastNameshow && csValidate(bicInfosSent,bicInfosForm.lastName.$error.minlength || bicInfosForm.lastName.$error.maxlength,bicInfosForm.lastName.$pristine)\">{{'error_member_lastname_size'|trad}}</span>" +
    "			<span class=\"text-error\" ng-show=\"!lastNameshow && csValidate(bicInfosSent,bicInfosForm.lastName.$error.required,bicInfosForm.lastName.$pristine)\">{{'error_member_lastname_missing'" +
    "		</div>	" +
    "		<div class=\"controls controls-row\" ng-show=\"isOrganization\" >" +
    "			<input type=\"text\" name=\"name\" ng-model=\"myBicInfosForm.name\"" +
    "				placeholder=\"{{'label_organization_name'|trad}}\"" +
    "				ng-required=\"isOrganization\"" +
    "				ng-minlength=\"2\"" +
    "			    ng-maxlength=\"50\"" +
    "			    ng-pattern=\"/^[a-zA-ZÀ-ÿ0-9 -]+$/\"" +
    "				ng-blur" +
    "				ng-focus" +
    "				class=\"span4\"" +
    "			/>" +
    "									" +
    "			<span class=\"clear\"></span>" +
    "			<span class=\"text-error\" ng-show=\"!nameshow && csValidate(bicInfosSent,bicInfosForm.name.$error.pattern,bicInfosForm.name.$pristine)\">{{'error_organization_name_invalid'|trad}}</span>" +
    "			<span class=\"text-error\" ng-show=\"!nameshow && csValidate(bicInfosSent,bicInfosForm.name.$error.minlength || bicInfosForm.name.$error.maxlength,bicInfosForm.name.$pristine)\">{{'error_organization_name_size'|trad}}</span>			" +
    "			<span class=\"text-error\" ng-show=\"!nameshow && csValidate(bicInfosSent,bicInfosForm.name.$error.required,bicInfosForm.name.$pristine)\">{{'error_organization_name_missing'|trad}}</span>" +
    "		</div>" +
    "" +
    "		<!-- Adresse -->" +
    "	  	<div class=\"controls controls-row\">	" +
    "	  		<geoloc-picker " +
    "	  			formated-address=\"formatedAddress\" " +
    "				address-label=\"search\"" +
    "				my-address=\"true\"" +
    "				class=\"span4\">" +
    "			</geoloc-picker>" +
    "	  		<span class=\"clear\"></span>" +
    "	  		<span class=\"text-error\" ng-show=\"bicInfosSent &&  !formatedAddress.lat\">{{'error_address_missing'|trad}}</span>	" +
    "		</div>" +
    "	" +
    "		<!-- Bic -->" +
    "	  	<div class=\"controls controls-row\">	" +
    "	  		<input type=\"text\" name=\"bic\" ng-model=\"myBicInfosForm.bic\"" +
    "				placeholder=\"{{'label_bic'|trad}}\"" +
    "				required" +
    "				ng-pattern=\"/([a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?)/\" " +
    "				class=\"span4\"" +
    "				ng-blur" +
    "				ng-focus" +
    "			>" +
    "			<span class=\"clear\"></span>" +
    "			<span class=\"text-error\" ng-show=\"!bicshow && csValidate(bicInfosSent,bicInfosForm.bic.$error.required,bicInfosForm.bic.$pristine)\">{{'error_beneficiary_bic_missing'|trad}}</span>" +
    "			<span class=\"text-error\" ng-show=\"!bicshow && csValidate(bicInfosSent,bicInfosForm.bic.$error.pattern,bicInfosForm.bic.$pristine)\">{{'error_beneficiary_bic_invalid'|trad}}</span>			" +
    "		</div>" +
    "		" +
    "		<!-- Iban -->" +
    "	  	<div class=\"controls controls-row\">	" +
    "	  		<input type=\"text\" name=\"iban\" ng-model=\"myBicInfosForm.iban\"" +
    "				placeholder=\"{{'label_iban'|trad}}\"" +
    "				required" +
    "				class=\"span4\"" +
    "				ng-blur" +
    "				ng-focus" +
    "			>" +
    "			<span class=\"clear\"></span>" +
    "			<span class=\"text-error\" ng-show=\"!ibanshow && csValidate(bicInfosSent,bicInfosForm.iban.$error.required,bicInfosForm.iban.$pristine)\">{{'error_beneficiary_iban_invalid'|trad}}</span>" +
    "			<span class=\"text-error\" ng-show=\"!ibanshow && csValidate(bicInfosSent,bicInfosForm.iban.$error.pattern,bicInfosForm.iban.$pristine)\">{{'error_beneficiary_iban_invalid'|trad}}</span>			" +
    "		</div>" +
    "	</div>" +
    "		" +
    "	<!-- Soumission du formulaire -->	  	" +
    "	<div class=\"modal-footer\">" +
    "		<a class=\"btn btn-warning\" ng-click=\"closeBicInfos(hide)\">{{'label_back'|trad}}</a>" +
    "	  	<input type=\"submit\" class=\"btn btn-primary addingBicInfos\" data-loading-text=\"{{'label_loading'|trad}}\" value=\"{{'label_send'|trad}}\"/>" +
    "	</div>" +
    "</form>"
  );

  $templateCache.put("assets/dev/views/events/modals/subscribe.html",
    "<div class=\"modal-header\">" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
    "  " +
    "  <h4>{{'label_create_alert'|trad}}</h4>" +
    "</div>" +
    "" +
    "<div class=\"modal-body\" style=\"overflow: visible;\">" +
    "	<form >" +
    "		<div ng-show=\"noAddress\">" +
    "			<div class=\"alert alert-info\">" +
    "				{{'label_tags_no_address_information'|trad}}" +
    "			</div>" +
    "			" +
    "			<geoloc-picker formated-address=\"formatedAddress\" address-label=\"search\" my-address=\"false\"></geoloc-picker>" +
    "			<span class=\"text-error\" ng-show=\"formSent && !formatedAddress.lat\">{{'error_address_missing'|trad}}</span>" +
    "			<span class=\"clear\"></span>" +
    "			" +
    "			" +
    "		</div>" +
    "		<div class=\"controls controls-row\"  ng-hide=\"noAddress\">" +
    "			<div class=\"alert alert-info\">" +
    "				{{'label_alerts_information'|trad}}" +
    "			</div>" +
    "			" +
    "            <tags-picker tags=\"tags\"></tags-picker>" +
    "        </div>" +
    "	</form>" +
    "</div>" +
    "" +
    "<div class=\"modal-footer\">" +
    "  	<button type=\"button\" class=\"btn\" ng-click=\"hide()\">{{'label_close'|trad}}</button>" +
    "  	<input ng-show=\"noAddress\" type=\"submit\" ng-click=\"saveAddress(formatedAddress);\" class=\"btn btn-success addressing\" data-loading-text=\"{{'label_loading'|trad}}\" value=\"{{'label_update_profile'|trad}}\" />	" +
    "	<input ng-hide=\"noAddress\" type=\"submit\" ng-click=\"subscribe(hide);\" class=\"btn btn-primary subscribing\" data-loading-text=\"{{'label_loading'|trad}}\" value=\"{{'label_create'|trad}}\" />				    	" +
    "</div>" +
    ""
  );

  $templateCache.put("assets/dev/views/includes/footer.html",
    "<div class=\"footer text-center margin-top margin-bottom\">" +
    "    <a href=\"#/about\">Ottercamp</a> • " +
    "    <a href=\"http://blog.ottercamp.com\" target=\"_blank\">Blog</a> • " +
    "    <a href=\"#/about/press\">{{'label_press'|trad}}</a> • " +
    "    <a href=\"#/about/team\">{{'label_team'|trad}}</a> • " +
    "    <a href=\"#/about/contact\">{{'label_contact'|trad}}</a> • " +
    "    <a href=\"#/about/policies\">{{'label_policies'|trad}}</a> • " +
    "    <a href=\"#/about/privacy\">{{'label_privacy'|trad}}</a> • " +
    "    <a href=\"#/about/help\">{{'label_help'|trad}}</a> • " +
    "    " +
    "    <div class=\"btn-group\" style=\"vertical-align: baseline;line-height: normal\">" +
    "	  <a class=\" dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">" +
    "	    {{'label_social'|trad}}" +
    "	    <span class=\"caret up\" style=\"vertical-align: middle;\"></span>" +
    "	  </a>" +
    "	  <ul class=\"dropdown-menu dropup-menu text-left\" style=\"min-width: auto;\">" +
    "	    <li><a href=\"http://www.facebook.com/ottercamp\" target=\"_blank\">Facebook</a></li>" +
    "	    <li><a href=\"http://www.twitter.com/ottercamp\" target=\"_blank\">Twitter</a></li>" +
    "	    <li><a href=\"http://plus.google.com/115729621882323678117\" target=\"_blank\">Google+</a></li>" +
    "	    <li><a href=\"http://www.github.com/ottercamp\" target=\"_blank\">Github</a></li>" +
    "	  </ul>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/includes/navBar.html",
    "<div class=\"navbar navbar-fixed-top\" ng-cloak ng-show=\"showNav\">" +
    "    <div class=\"navbar-inner\">" +
    "        <div class=\"container text-center\">" +
    "        	<ul class=\"nav\">            	" +
    "                <li tooltip data-placement=\"bottom\" title=\"{{'label_discover'|trad}}\">" +
    "                	<a href=\"#/\" id=\"brand\"></a>" +
    "                </li>" +
    "            </ul>" +
    "        	" +
    "        	<search></search>  " +
    "			" +
    "			<ul class=\"nav\" ng-show=\"user.id != null\">			" +
    "				<li tooltip data-placement=\"bottom\" title=\"{{'label_my_events'|trad}}\"><a href=\"#/users/{{user.id}}/events\"><i class=\"icon-home icon-book icon-white\"></i></a></li>					" +
    "			</ul>" +
    "			" +
    "			<a id=\"typo\" class=\"visible-desktop\"><img src=\"assets/images/typo-40.png\" /></a>" +
    "" +
    "            <div class=\"nav pull-right\">" +
    "                <!-- box utilisateur courrant -->" +
    "                <user-box></user-box>" +
    "        	</div>" +
    "        </div>" +
    "    </div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/messages/cards/medium.html",
    "<div class=\"row-fluid\">" +
    "	<a class=\"span1\" href=\"#/users/{{resource.from.id}}\">" +
    "	    <img class=\"media-object\" ng-src=\"{{resource.from.smallPhoto}}\">" +
    "	</a>" +
    "	" +
    "	<div class=\"span11\">" +
    "		<div class=\"row-fluid\">" +
    "			<div class=\"pull-left span6\">" +
    "				<a href=\"#/users/{{resource.from.id}}\">{{resource.from.fullName}}</a>" +
    "			</div>" +
    "		    " +
    "		    <div class=\"pull-right span6 text-right\">" +
    "		    	<small>{{[resource.timestamp] |formatedDate}}</small>" +
    "		    </div>" +
    "	   </div>" +
    "	   " +
    "	   <p>{{resource.content}}</p>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/messages/cards/small.html",
    "<div class=\"row-fluid\">" +
    "	<div class=\"span2\">" +
    "		<a href=\"#/users/{{resource.from.id}}\">" +
    "			<img ng-src=\"{{resource.from.smallPhoto}}\" />" +
    "		</a>" +
    "	</div>" +
    "	" +
    "	<div class=\"span10\">" +
    "	    <div>" +
    "	    	<a href=\"#/users/{{resource.from.id}}\">{{resource.from.fullName}}</a> <small class=\"pull-right\">({{[resource.timestamp] |formatedDate}})</small>" +
    "	    </div>" +
    "	    " +
    "	    <p>{{resource.content}}</p>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/modals/embeded.html",
    "<div class=\"modal-header\" >" +
    "	<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
    " 	<h3 ng-show=\"type == 'o'\">{{'modal_embeded_title_organization'|trad}}</h3>" +
    " 	<h3 ng-show=\"type == 'e'\">{{'modal_embeded_title_event'|trad}}</h3>" +
    "</div>" +
    "" +
    "<div class=\"modal-body\" >" +
    "" +
    "	<textarea ng-model=\"content\" style=\"width:100%\" rows=\"4\">" +
    "		" +
    "	</textarea>" +
    "  	" +
    "</div>" +
    "" +
    "<div class=\"modal-footer\">" +
    "	<button type=\"button\" class=\"btn btn-info\" ng-click=\"dismiss()\">{{'label_close'|trad}}</button>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/modals/share.html",
    "<div class=\"modal-header\">" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
    "" +
    "  <h4>{{'label_share'|trad}} <span class=\"label label-info\">{{user.fullName}}</span></h4>" +
    "</div>" +
    "" +
    "<div class=\"modal-body\" ng-init=\"initNew()\">" +
    "	<div class=\"alert alert-info\">" +
    "		{{'label_share_information'|trad}}" +
    "	</div>" +
    "	" +
    "	<div class=\"row-fluid\">" +
    "		<input type=\"text\" class=\"span12\" ng-model=\"currentUrl\"/>" +
    "	</div>" +
    "	" +
    "	<hr />" +
    "" +
    "	<div class=\"addthis_toolbox addthis_default_style\" addthis-toolbox addthis:url=\"{{currentUrl}}\" addthis:title=\"{{atitle}}\" addthis:description=\"{{description}}\">" +
    "		<a class=\"addthis_button_facebook_like\" fb:like:layout=\"button_count\" fb:like:href=\"{{currentUrl}}\"></a>" +
    "		<a class=\"addthis_button_tweet\" tw:text=\"{{description}}\" tw:url=\"{{currentUrl}}\"></a>" +
    "		<a class=\"addthis_button_google_plusone\" g:plusone:size=\"medium\" og:title=\"{{atitle}}\" og:description=\"{{description}}\" og:url=\"{{currentUrl}}\"></a>" +
    "		<a class=\"addthis_button_pinterest_pinit\"></a>" +
    "		<a class=\"addthis_counter addthis_pill_style\"></a>" +
    "" +
    "	</div>" +
    "</div>" +
    "" +
    "<div class=\"modal-footer\">" +
    "  	<button type=\"button\" class=\"btn\" ng-click=\"hide()\">{{'label_close'|trad}}</button>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/notifications/cards/line.html",
    "<div class=\"span7\">" +
    "	{{resource.content}}" +
    "</div>" +
    "<div class=\"span3\">" +
    "	{{[resource.timestamp] |formatedDate}}" +
    "</div>" +
    "<div class=\"span1 pull-right\">" +
    "	<a class=\"btn \" href=\"#/{{resource.link}}\"><i class=\"icon-eye-open\"></i></a>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/notifications/cards/small.html",
    "<a href=\"#/{{resource.link}}\" style=\"color:#333;\" >" +
    "	<div class=\"text-right\">" +
    "		<small>{{[resource.timestamp] |formatedDate}}</small>" +
    "	</div>" +
    "	<div>" +
    "		{{resource.content}}" +
    "	</div>" +
    "</a>"
  );

  $templateCache.put("assets/dev/views/notifications/notifications.html",
    "<div id=\"notifications\" class=\"block margin-top\" ng-init=\"init()\">		" +
    "	<div class=\"header nav-header padding\">{{'label_my_notifications'|trad}}</div>" +
    "	" +
    "	<div class=\"padding margin-top \" ng-hide=\"loading\">" +
    "		<p ng-show=\"notifications.length == 0\">" +
    "			{{'label_no_user_notifications'|trad}}" +
    "		</p>" +
    "		<div class=\"row-fluid\">" +
    "			<div class=\"span7\">" +
    "				<strong>{{'label_content'|trad}}</strong>" +
    "			</div>" +
    "			<div class=\"span3\">" +
    "				<strong>{{'label_date'|trad}}</strong>" +
    "			</div>" +
    "			<div class=\"span2\">" +
    "				<strong>{{'label_link'|trad}}</strong>" +
    "			</div>" +
    "		</div>" +
    "		<div class=\"row-fluid\">" +
    "			<card class=\"padding-top\" data-type=\"notifications\" data-format=\"line\" data-resource=\"notification\" ng-repeat=\"notification in notifications\"></card>" +
    "		</div>" +
    "	</div>" +
    "	" +
    "	<div class=\"offset5\" ng-show=\"loading\"><img class=\"intern-loader\" src=\"assets/images/ajax-loader.gif\"></div>" +
    "" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/organizations/add.html",
    "<style>" +
    "	#preview-wrapper {" +
    "	    overflow: hidden; " +
    "	    position: relative;" +
    "	}" +
    "	" +
    "	#preview {" +
    "	    position: absolute;" +
    "	}" +
    "</style>" +
    "" +
    "<div id=\"add_organization\" ng-init=\"initAddOrganization()\">" +
    "	<div class=\"block margin-top\" ng-hide=\"create\">" +
    "		<div class=\"header nav-header padding\" >" +
    "			{{'label_my_organizations'|trad}}" +
    "		</div>" +
    "		" +
    "		<div class=\"padding\" >" +
    "			<div class=\"alert alert-info\">" +
    "				<div>{{'label_organizations_information'|trad}}</div>" +
    "				" +
    "				<button class=\"btn btn-success btn-small margin-top\" ng-click=\"create = true\" ng-hide=\"create\">{{'label_add_organization'|trad}}</button>" +
    "			</div>" +
    "			" +
    "			<div ng-show=\"organizations.length > 0\" class=\"row-fluid\">" +
    "				<custom ng-repeat=\"organization in organizations\">" +
    "					<custom ng-switch on=\"$index % 2\">" +
    "		            	<custom ng-switch-when=\"0\">" +
    "			                <div class=\"row-fluid\" ng-hide=\"userList.length == 0\">							    " +
    "			                    <div ng-show=\"organizations[$index+0]\" class=\"block span6 margin-top\" >" +
    "			                    	<card					" +
    "										data-format=\"medium\" " +
    "										data-type=\"organizations\" " +
    "										data-resource=\"organizations[$index+0]\">" +
    "									</card>" +
    "			                    </div>" +
    "			                    <div ng-show=\"organizations[$index+1]\" class=\"block span6 margin-top\" >" +
    "			                    	<card				" +
    "										data-format=\"medium\" " +
    "										data-type=\"organizations\" " +
    "										data-resource=\"organizations[$index+1]\">" +
    "									</card>" +
    "			                    </div>" +
    "			                </div>" +
    "			            </custom>" +
    "			        </custom>" +
    "				</custom>" +
    "			</div>" +
    "			" +
    "			<div ng-show=\"organizations.length == 0 && !loading\" class=\"alert alert-info\">" +
    "				{{'label_no_organization_information'|trad}}" +
    "			</div>" +
    "		</div>" +
    "		<div class=\"span6 offset5 margin-top\" ng-show=\"loading\" ><img class=\"intern-loader\" src=\"assets/images/ajax-loader.gif\"></div>" +
    "	</div>" +
    "		" +
    "	<div class=\"block margin-top\" ng-show=\"create\">" +
    "		<div class=\"header nav-header padding\">" +
    "			{{'label_add_organization'|trad}}" +
    "		</div>" +
    "		" +
    "		<div class=\"margin-top\">" +
    "			<form name=\"organizationForm\" novalidate>" +
    "				<div class=\"row-fluid\">" +
    "					<div class=\"span6\">" +
    "						<div class=\"padding-left\">" +
    "							<div class=\"row-fluid\">" +
    "								<div ng-switch on=\"photo\" class=\"span4 block control-label\">" +
    "							       <div ng-switch-when=\"true\" id=\"preview-wrapper\">" +
    "							       		<img id=\"preview\" ng-cloak src=\"\" />" +
    "							       </div>" +
    "							    </div>" +
    "			" +
    "								<div class=\"span8\">" +
    "									<span class=\"btn btn-success fileinput-button\">" +
    "						                <i class=\"icon-plus icon-white\"></i>" +
    "						                <span>{{'label_upload_event'|trad}}</span>" +
    "						                <input file-upload cs-type=\"OrganizationCtrl\" id=\"photo\" type=\"file\" name=\"photo\" />				                " +
    "						            </span>" +
    "						            " +
    "						            <hr ng-show=\"photo\" />" +
    "						            " +
    "						            <div ng-show=\"photo\" class=\"alert alert-success\">" +
    "						            	<button type=\"button\" class=\"close\" ng-click=\"files=[];photo=false;\">×</button>" +
    "						            	{{files[0].name}}" +
    "						            </div>" +
    "								</div>" +
    "							</div>" +
    "							" +
    "							<hr />" +
    "							" +
    "							<div class=\"row-fluid\">" +
    "								<div class=\"controls controls-row margin-top\">" +
    "									<input ng-blur ng-focus type=\"text\" name=\"name\" ng-model=\"organization.name\"" +
    "										placeholder=\"{{'label_organization_name'|trad}}\"" +
    "										required" +
    "										ng-minlength=\"2\"" +
    "										ng-maxlength=\"50\"" +
    "										class=\"span12\"" +
    "									>" +
    "					" +
    "									<span class=\"clear\"></span>" +
    "					" +
    "									<span class=\"text-error\" ng-show=\"!nameshow && csValidate(formSent,organizationForm.name.$error.required,organizationForm.name.$pristine)\">{{'error_organization_name_missing'|trad}}</span>" +
    "									<span class=\"text-error\" ng-show=\"!nameshow && csValidate(formSent,organizationForm.name.$error.minlength || organizationForm.name.$error.maxlength,organizationForm.name.$pristine)\">{{'error_organization_name_size'|trad}}</span>" +
    "								</div>" +
    "								" +
    "								<div class=\"controls controls-row margin-top\">" +
    "									<input ng-blur ng-focus type=\"text\" name=\"website\" ng-model=\"organization.website\"" +
    "										placeholder=\"{{'label_website'|trad}}\"" +
    "										class=\"span12\"" +
    "										ng-pattern=\"/((http:\\/\\/|https:\\/\\/)?(www.)?(([a-zA-Z0-9-]){2,}\\.){1,4}([a-zA-Z]){2,6}(\\/([a-zA-Z-_\\/\\.0-9#:?=&;,]*)?)?)/\"" +
    "									>" +
    "									" +
    "									<span class=\"clear\"></span>" +
    "									" +
    "									<span class=\"text-error\" ng-show=\"!websiteshow && csValidate(formSent,organizationForm.website.$error.pattern,organizationForm.website.$pristine)\">{{'error_website_invalid'|trad}}</span>" +
    "								</div>" +
    "								" +
    "								<hr/>" +
    "								" +
    "								<!-- Description -->" +
    "								<div class=\"controls controls-row\">" +
    "									<div ng-blur ng-focus" +
    "									rich-text-editor" +
    "									name=\"description\"" +
    "									ng-model=\"organization.description\"" +
    "									placeholder=\"{{'label_description'|trad}}\"" +
    "									required" +
    "									ng-minlength=\"10\"" +
    "									ng-maxlength=\"5000\"" +
    "									></div>" +
    "				" +
    "									<span class=\"clear\"></span>" +
    "				" +
    "									<span class=\"text-error\" ng-show=\"!descriptionshow &&  csValidate(formSent,organizationForm.description.$error.required,organizationForm.description.$pristine)\">{{'error_organization_description_missing'|trad}}</span>" +
    "									<span  class=\"text-error\" ng-show=\"!descriptionshow &&  csValidate(formSent,organizationForm.description.$error.length || organizationForm.description.$error.length,organizationForm.description.$pristine)\">{{'error_organization_description_size'|trad}}</span>" +
    "								</div>" +
    "								" +
    "								<hr />" +
    "								" +
    "								<!-- Address -->" +
    "								<div class=\"controls controls-row\">" +
    "									<geoloc-picker " +
    "										formated-address=\"formatedAddress\" " +
    "										address-label=\"search\"" +
    "										my-address=\"true\"" +
    "										class=\"span12\"" +
    "									></geoloc-picker>" +
    "								</div>" +
    "							</div>" +
    "						</div>" +
    "					</div>" +
    "					" +
    "					<div class=\"span6\">" +
    "						<div class=\"block margin-right\">" +
    "							<div class=\"header nav-header padding\">{{'label_options'|trad}}</div>" +
    "							" +
    "							<div class=\"padding\">" +
    "								<div class=\"controls\">" +
    "									<label class=\"checkbox\">" +
    "										<input type=\"checkbox\" name=\"asCommunity\" checked=\"checked\" ng-model=\"organization.asCommunity\" />" +
    "										{{'label_add_organization_community'|trad}}" +
    "										" +
    "										<i class=\"icon-question-sign\" popover data-trigger=\"hover\" data-title=\"{{'label_information'|trad}}\" data-content=\"{{'label_asCommunity_information'|trad}}\"></i>" +
    "									</label>" +
    "								</div>" +
    "							</div>" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "				" +
    "				<div class=\"form-actions\">" +
    "					<div class=\"pull-left\">" +
    "						<button class=\"btn\" ng-click=\"create = false\" ng-show=\"create\">{{'label_cancel'|trad}}</button>" +
    "						<loader data-classes=\"btn btn-primary\" data-sending=\"sending\" data-action=\"submit\" data-label=\"label_validate\"></loader>" +
    "					</div>" +
    "							" +
    "					<div ng-show=\"photo\" class=\"pull-left padding5 text-info\">" +
    "				       {{'label_long_time_information_organization'|trad}}" +
    "			      	</div>" +
    "	" +
    "					<span class=\"clear\"></span>" +
    "				</div>" +
    "			</form>" +
    "		</div>" +
    "	</div>" +
    "</div>	"
  );

  $templateCache.put("assets/dev/views/organizations/administrateOrganizations.html",
    "<style>" +
    "	#preview-wrapper {" +
    "	    overflow: hidden; " +
    "	    position: relative;" +
    "	}" +
    "	" +
    "	#preview {" +
    "	    position: absolute;" +
    "	}" +
    "</style>" +
    "" +
    "<div id=\"add_organization\" ng-init=\"initAddOrganization()\">" +
    "	<div class=\"block margin-top\" ng-hide=\"create\">" +
    "		<div class=\"header nav-header padding\">" +
    "			{{'label_my_organizations'|trad}}" +
    "		</div>" +
    "" +
    "		<div class=\"padding\">" +
    "			<div class=\"alert alert-info\">" +
    "				<div>{{'label_organizations_information'|trad}}</div>" +
    "				" +
    "				<button class=\"btn btn-success btn-small margin-top\" ng-click=\"create = true\" ng-hide=\"create\">{{'label_add_organization'|trad}}</button>" +
    "			</div>" +
    "		" +
    "			<div ng-show=\"organizations.length > 0\" class=\"row-fluid\">" +
    "				<custom ng-repeat=\"organization in organizations\">" +
    "					<custom ng-switch on=\"$index % 2\">" +
    "		            	<custom ng-switch-when=\"0\">" +
    "			                <div class=\"row-fluid\" ng-hide=\"userList.length == 0\">							    " +
    "			                    <div ng-show=\"organizations[$index+0]\" class=\"block span6 margin-top\" >" +
    "			                    	<card					" +
    "										data-format=\"medium\" " +
    "										data-type=\"organizations\" " +
    "										data-resource=\"organizations[$index+0]\">" +
    "									</card>" +
    "			                    </div>" +
    "			                    <div ng-show=\"organizations[$index+1]\" class=\"block span6 margin-top\" >" +
    "			                    	<card				" +
    "										data-format=\"medium\" " +
    "										data-type=\"organizations\" " +
    "										data-resource=\"organizations[$index+1]\">" +
    "									</card>" +
    "			                    </div>" +
    "			                </div>" +
    "			            </custom>" +
    "			        </custom>" +
    "				</custom>" +
    "			</div>" +
    "	" +
    "			<div ng-show=\"organizations.length == 0 && !loading\" class=\"alert alert-info\">" +
    "				{{'label_no_organization_information'|trad}}" +
    "			</div>" +
    "			" +
    "			<div class=\"span6 offset5 margin-top\" ng-show=\"loading\" ><img class=\"intern-loader\" src=\"assets/images/ajax-loader.gif\"></div>" +
    "		</div>" +
    "	</div>" +
    "		" +
    "	<div class=\"block margin-top\" ng-show=\"create\">" +
    "		<div class=\"header nav-header padding\">" +
    "			{{'label_add_organization'|trad}}" +
    "		</div>" +
    "		" +
    "		<div class=\"margin-top\">" +
    "			<form name=\"organizationForm\" novalidate>" +
    "				<div class=\"row-fluid\">" +
    "					<div class=\"span6\">" +
    "						<div class=\"padding-left\">" +
    "							<div class=\"row-fluid\">" +
    "								<div ng-switch on=\"photo\" class=\"span4 block control-label\">" +
    "							       <div ng-switch-when=\"true\" id=\"preview-wrapper\">" +
    "							       		<img id=\"preview\" ng-cloak src=\"\" />" +
    "							       </div>" +
    "							    </div>" +
    "			" +
    "								<div class=\"span8\">" +
    "									<span class=\"btn btn-success fileinput-button\">" +
    "						                <i class=\"icon-plus icon-white\"></i>" +
    "						                <span>{{'label_upload_event'|trad}}</span>" +
    "						                <input file-upload cs-type=\"OrganizationCtrl\" id=\"photo\" type=\"file\" name=\"photo\" />				                " +
    "						            </span>" +
    "						            " +
    "						            <hr ng-show=\"photo\" />" +
    "						            " +
    "						            <div ng-show=\"photo\" class=\"alert alert-success\">" +
    "						            	<button type=\"button\" class=\"close\" ng-click=\"files=[];photo=false;\">×</button>" +
    "						            	{{files[0].name}}" +
    "						            </div>" +
    "								</div>" +
    "							</div>" +
    "							" +
    "							<hr />" +
    "							" +
    "							<div class=\"row-fluid\">" +
    "								<div class=\"controls controls-row margin-top\">" +
    "									<input ng-blur ng-focus type=\"text\" name=\"name\" ng-model=\"organization.name\"" +
    "										placeholder=\"{{'label_organization_name'|trad}}\"" +
    "										required" +
    "										ng-minlength=\"2\"" +
    "										ng-maxlength=\"50\"" +
    "										class=\"span12\"" +
    "									>" +
    "					" +
    "									<span class=\"clear\"></span>" +
    "					" +
    "									<span class=\"text-error\" ng-show=\"!nameshow && csValidate(formSent,organizationForm.name.$error.required,organizationForm.name.$pristine)\">{{'error_organization_name_missing'|trad}}</span>" +
    "									<span class=\"text-error\" ng-show=\"!nameshow && csValidate(formSent,organizationForm.name.$error.minlength || organizationForm.name.$error.maxlength,organizationForm.name.$pristine)\">{{'error_organization_name_size'|trad}}</span>" +
    "								</div>" +
    "								" +
    "								<div class=\"controls controls-row margin-top\">" +
    "									<input ng-blur ng-focus type=\"text\" name=\"website\" ng-model=\"organization.website\"" +
    "										placeholder=\"{{'label_website'|trad}}\"" +
    "										class=\"span12\"" +
    "										ng-pattern=\"/((http:\\/\\/|https:\\/\\/)?(www.)?(([a-zA-Z0-9-]){2,}\\.){1,4}([a-zA-Z]){2,6}(\\/([a-zA-Z-_\\/\\.0-9#:?=&;,]*)?)?)/\"" +
    "									>" +
    "									" +
    "									<span class=\"clear\"></span>" +
    "									" +
    "									<span class=\"text-error\" ng-show=\"!websiteshow && csValidate(formSent,organizationForm.website.$error.pattern,organizationForm.website.$pristine)\">{{'error_website_invalid'|trad}}</span>" +
    "								</div>" +
    "								" +
    "								<hr/>" +
    "								" +
    "								<!-- Description -->" +
    "								<div class=\"controls controls-row\">" +
    "									<div ng-blur ng-focus" +
    "									rich-text-editor" +
    "									name=\"description\"" +
    "									ng-model=\"organization.description\"" +
    "									placeholder=\"{{'label_description'|trad}}\"" +
    "									required" +
    "									ng-minlength=\"10\"" +
    "									ng-maxlength=\"5000\"" +
    "									></div>" +
    "				" +
    "									<span class=\"clear\"></span>" +
    "				" +
    "									<span class=\"text-error\" ng-show=\"!descriptionshow &&  csValidate(formSent,organizationForm.description.$error.required,organizationForm.description.$pristine)\">{{'error_organization_description_missing'|trad}}</span>" +
    "									<span  class=\"text-error\" ng-show=\"!descriptionshow &&  csValidate(formSent,organizationForm.description.$error.length || organizationForm.description.$error.length,organizationForm.description.$pristine)\">{{'error_organization_description_size'|trad}}</span>" +
    "								</div>" +
    "								" +
    "								<hr />" +
    "								" +
    "								<!-- Address -->" +
    "								<div class=\"controls controls-row\">" +
    "									<geoloc-picker " +
    "										formated-address=\"formatedAddress\" " +
    "										address-label=\"search\"" +
    "										my-address=\"true\"" +
    "										class=\"span12\"" +
    "									></geoloc-picker>" +
    "								</div>" +
    "							</div>" +
    "						</div>" +
    "					</div>" +
    "					" +
    "					<div class=\"span6\">" +
    "						<div class=\"block margin-right\">" +
    "							<div class=\"header nav-header padding\">{{'label_options'|trad}}</div>" +
    "							" +
    "							<div class=\"padding\">" +
    "								<div class=\"controls\">" +
    "									<label class=\"checkbox\">" +
    "										<input type=\"checkbox\" name=\"asCommunity\" checked=\"checked\" ng-model=\"organization.asCommunity\" />" +
    "										{{'label_add_organization_community'|trad}}" +
    "										" +
    "										<i class=\"icon-question-sign\" popover data-trigger=\"hover\" data-title=\"{{'label_information'|trad}}\" data-content=\"{{'label_asCommunity_information'|trad}}\"></i>" +
    "									</label>" +
    "								</div>" +
    "							</div>" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "				" +
    "				<div class=\"form-actions\">" +
    "					<div class=\"pull-left\">" +
    "						<button class=\"btn\" ng-click=\"create = false\" ng-show=\"create\">{{'label_cancel'|trad}}</button>" +
    "						<loader data-classes=\"btn btn-primary\" data-sending=\"sending\" data-action=\"submit\" data-label=\"label_validate\"></loader>" +
    "					</div>" +
    "							" +
    "					<div ng-show=\"photo\" class=\"pull-left padding5 text-info\">" +
    "				       {{'label_long_time_information_organization'|trad}}" +
    "			      	</div>" +
    "	" +
    "					<span class=\"clear\"></span>" +
    "				</div>" +
    "			</form>" +
    "		</div>" +
    "	</div>" +
    "</div>	"
  );

  $templateCache.put("assets/dev/views/organizations/cards/medium.html",
    "<div id=\"{{resource.id}}\" class=\"organization medium\">" +
    "	<div>" +
    "		<div class=\"padding\">" +
    "			<div class=\"row-fluid\">" +
    "				<div class=\"span2\">" +
    "					<a href=\"#/organizations/{{resource.id}}\">" +
    "						<img ng-src=\"{{resource.smallPhoto}}\" />" +
    "					</a>" +
    "				</div>" +
    "				" +
    "				<div class=\"span10\">" +
    "					<a href=\"#/organizations/{{resource.id}}\">{{resource.name}}</a>" +
    "					" +
    "					<div class=\"px12\">" +
    "						<a href=\"{{resource.website}}\" target=\"_blank\">{{resource.website}}</a>" +
    "					</div>" +
    "					" +
    "					<div ng-show=\"{{resource.address.shortLabel}}\">" +
    "						<span class=\"add-on\"><i class=\"icon-map-marker\"></i></span>" +
    "						<span>{{resource.address.shortLabel}}</span>" +
    "					</div>" +
    "					" +
    "					<div class=\"px12\">" +
    "						{{resource.description | noHtmlTags | truncate:140}}" +
    "					</div>" +
    "				</div>" +
    "			</div>" +
    "		</div>" +
    "	</div>" +
    "	" +
    "	<div class=\"border-top background\">" +
    "		<div class=\"pull-right\">" +
    "			<custom ng-show=\"resource.asCommunity\">" +
    "				<a  class=\"action padding pull-left hover\" " +
    "					follow " +
    "					community=\"resource\"" +
    "					tooltip" +
    "					data-title=\"{{label|trad}}\"" +
    "				><i class=\"icon-star icon-{{followed}}\"></i>" +
    "				</a>" +
    "			</custom>" +
    "			<a class=\"action padding pull-left hover\" href=\"javascript:;\" " +
    "				share " +
    "				description=\"resource.description\" " +
    "				atitle=\"resource.title\"  " +
    "				url=\"Config.webURL + '#/organizations/' + resource.id\" " +
    "				tooltip " +
    "				data-title=\"{{'label_share'|trad}}\"" +
    "			><i class=\"icon-share\"></i></a>" +
    "						" +
    "			<span class=\"clear\"></span>" +
    "		</div>" +
    "		" +
    "		<span class=\"clear\"></span>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/organizations/cards/small.html",
    "<a href=\"#/organizations/{{resource.id}}\"><img ng-src=\"{{resource.smallPhoto}}\" tooltip title=\"{{resource.name}}\"/></a>"
  );

  $templateCache.put("assets/dev/views/organizations/includes/administrators.html",
    "<div id=\"administrators\" ng-init=\"initAdministrators()\">" +
    "	<div ng-hide=\"loading\" ng-show=\"!add\">" +
    "		" +
    "		<div class=\"alert alert-info\" >" +
    "			{{'label_administrators_information'|trad}}" +
    "		</div>" +
    "		" +
    "		<form name=\"administratorForm\" novalidate>" +
    "			<div class=\"controls\">" +
    "				<div>" +
    "					Pour ajouter un administrateur, veuillez entrer son pseudo dans le champ ci-dessous. Pour connaitre le pseudo d'un utilisateur, vous pouvez vous rendre sur son profil et le consulter juste en dessous de son nom." +
    "				</div>" +
    "				" +
    "				<div class=\"input-append margin-top\">" +
    "	  				<input type=\"text\" name=\"administrator\" ng-blur ng-focus" +
    "	  					ng-model=\"administrator\" " +
    "	  					placeholder=\"{{'label_username'|trad}}\"" +
    "	  					required " +
    "	  					ng-minlength=\"4\" " +
    "	  					ng-maxlength=\"30\"" +
    "	  					ng-pattern=\"/^[a-zA-Z0-9 -.]/\"" +
    "	  					class=\"input-xlarge\"" +
    "	  				>" +
    "	  				<button class=\"btn ng-binding\" ng-click=\"add = false\" ng-show=\"add\" style=\"\">{{'label_cancel'|trad}}</button>" +
    "	  				<loader data-classes=\"btn btn-primary\" data-sending=\"sending\" data-action=\"submit\" data-label=\"label_add\"></loader>	" +
    "				</div>" +
    "      			" +
    "      			<span class=\"clear\"></span>" +
    "      			" +
    "      			<span class=\"text-error\" ng-show=\"!administratorshow && csValidate(formSent,administratorForm.administrator.$error.pattern,administratorForm.administrator.$pristine)\">{{'error_member_login_invalid'|trad}}</span>" +
    "		      	<span class=\"text-error\" ng-show=\"!administratorshow && csValidate(formSent,administratorForm.administrator.$error.required,administratorForm.administrator.$pristine)\">{{'error_member_login_missing'|trad}}</span>" +
    "	    		<span class=\"text-error\" ng-show=\"!administratorshow && csValidate(formSent,administratorForm.administrator.$error.minlength || administratorForm.administrator.$error.maxlength,administratorForm.administrator.$pristine)\">{{'error_member_login_size'|trad}}</span>" +
    "			</div>" +
    "		</form>" +
    "		" +
    "		<hr />" +
    "		" +
    "		<div ng-show=\"!administrators || administrators.length == 0\" class=\"alert alert-success\">" +
    "			{{'label_no_administrator_information'|trad}}" +
    "		</div>" +
    "		" +
    "		<div ng-show=\"administrators.length > 0\" class=\"row-fluid\" ng-hide=\"add\">" +
    "			<custom ng-repeat=\"organization in administrators\">" +
    "				<custom ng-switch on=\"$index % 2\">" +
    "	            	<custom ng-switch-when=\"0\">" +
    "		                <div class=\"row-fluid\" ng-hide=\"userList.length == 0\">" +
    "		                    <div ng-show=\"administrators[$index+0]\" class=\"block span6 margin-top\">" +
    "		                    	<button type=\"button\" class=\"close margin-top margin-right\"" +
    "		                    		ng-click=\"deleteAdministrator(administrators[$index+0].id)\"" +
    "		                    		tooltip" +
    "		                    		data-trigger=\"hover\"" +
    "		                    		data-title=\"{{'label_delete_administrator'|trad}}\"" +
    "		                    	>" +
    "		                    		×" +
    "		                    	</button>" +
    "		                    	" +
    "		                    	<card" +
    "									data-format=\"medium\" " +
    "									data-type=\"users\" " +
    "									data-resource=\"administrators[$index+0]\">" +
    "								</card>" +
    "		                    </div>" +
    "		                    " +
    "		                    <div ng-show=\"administrators[$index+1]\" class=\"block span6 margin-top\">" +
    "								<button type=\"button\" class=\"close margin-top margin-right\"" +
    "		                    		ng-click=\"deleteAdministrator(administrators[$index+1].id)\"" +
    "		                    		tooltip" +
    "		                    		data-trigger=\"hover\"" +
    "		                    		data-title=\"{{'label_delete_administrator'|trad}}\"" +
    "		                    	>" +
    "		                    		×" +
    "		                    	</button>		                    " +
    "		                    	<card				" +
    "									data-format=\"medium\" " +
    "									data-type=\"users\" " +
    "									data-resource=\"administrators[$index+1]\">" +
    "								</card>" +
    "		                    </div>" +
    "		                </div>" +
    "		            </custom>" +
    "		        </custom>" +
    "			</custom>" +
    "		</div>" +
    "	</div>" +
    "	" +
    "	<div class=\"span6 offset5 margin-top\" ng-show=\"loading\" ><img class=\"intern-loader\" src=\"assets/images/ajax-loader.gif\"></div>" +
    "</div>	"
  );

  $templateCache.put("assets/dev/views/organizations/includes/general.html",
    "<div class=\"row-fluid margin-top margin-bottom\" ng-init=\"initGeneral()\">" +
    "	<div class=\"block margin-bottom\" ng-show=\"organization.description\">" +
    "		<div class=\"header nav-header padding\">{{'label_description'|trad}}</div>" +
    "		" +
    "		<p class=\"padding margin-top text-justify\" ng-bind-html-unsafe=\"organization.description\"></p>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/organizations/includes/infos.html",
    "<div class=\"span3\">" +
    "	<div class=\"margin-left margin-top margin-bottom block\" style=\"color: #333;\">" +
    "		<img ng-src=\"{{organization.mediumPhoto + '?' + d}}\" width=\"100%\" />" +
    "		" +
    "		<div class=\"padding border-top header\">" +
    "			<div class=\"row-fluid\">" +
    "				<div class=\"span9\">" +
    "		    		<h4>{{organization.name}}</h4>" +
    "				</div>" +
    "			</div>" +
    "			" +
    "			<div>" +
    "				<div ng-show=\"organization.website\">" +
    "					<span class=\"add-on\"><i class=\"icon-link\"></i></span>" +
    "		    		<a href=\"{{organization.website}}\" target=\"_blank\">{{organization.website}}</a>" +
    "				</div>" +
    "				" +
    "				<div ng-show=\"organization.address.label\">" +
    "					<span class=\"add-on\"><i class=\"icon-map-marker\"></i></span>" +
    "					<span>{{organization.address.label}}</span>" +
    "				</div>" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		<div>" +
    "			<div class=\"pull-right\">" +
    "				<a class=\"action padding pull-left hover\" href=\"javascript:;\"" +
    "					tooltip" +
    "					embeded" +
    "					data-id=\"organization.id\"" +
    "					data-type=\"o\"" +
    "					data-title=\"{{'label_embed'|trad}}\"" +
    "				><i class=\"icon-bookmark\"></i></a>" +
    "				" +
    "				<a class=\"action padding pull-left hover\" href=\"javascript:;\" " +
    "					share " +
    "					description=\"organization.description\" " +
    "					atitle=\"organization.title\"  " +
    "					url=\"Config.webURL + '#!/organizations/' + organization.id\" " +
    "					tooltip " +
    "					data-title=\"{{'label_share'|trad}}\"" +
    "				><i class=\"icon-share\"></i></a>" +
    "				<custom ng-show=\"organization.asCommunity\">	" +
    "					<a class=\"action padding pull-left hover\" " +
    "						follow " +
    "						community=\"organization\"" +
    "						tooltip" +
    "						data-title=\"{{label|trad}}\"" +
    "					><i class=\"icon-star icon-{{followed}}\"></i>" +
    "					</a>	" +
    "				</custom>" +
    "				<span class=\"clear\"></span>" +
    "			</div>" +
    "			" +
    "			<span class=\"clear\"></span>" +
    "		</div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/organizations/includes/menu.html",
    "<ul class=\"nav nav-tabs\">" +
    "	<li class=\"{{isPageActive('organization.general')}}\">" +
    "		<a href=\"#/organizations/{{organization.id}}\">{{'label_information'|trad}}</a>" +
    "	</li>	" +
    "	" +
    "	<li class=\"{{isPageActive('organization.administrators')}}\" ng-show=\"see('organization.administrators')\">" +
    "		<a href=\"#/organizations/{{organization.id}}/administrators\">{{'label_administrators'|trad}}</a>" +
    "	</li>" +
    "	" +
    "	<li class=\"{{isPageActive('organization.settings')}}\" ng-show=\"see('organization.settings')\">" +
    "		<a href=\"#/organizations/{{organization.id}}/settings\">{{'label_settings'|trad}}</a>" +
    "	</li>" +
    "	<span class=\"clear\"></span>" +
    "</ul>"
  );

  $templateCache.put("assets/dev/views/organizations/includes/settings.html",
    "<div class=\"margin-top margin-bottom\" ng-init=\"initSettings()\">" +
    "	" +
    "	<!-- Form photo -->" +
    "	<form>" +
    "		<div class=\"row-fluid\">" +
    "			<div class=\"span3\">" +
    "				<span class=\"btn btn-success fileinput-button\">" +
    "	                <i class=\"icon-plus icon-white\"></i>" +
    "	                <span>{{'label_upload_event_modify'|trad}}</span>" +
    "	                <input file-upload cs-type=\"organizationSettingsCtrl\" id=\"photo\" type=\"file\" name=\"photo\" />" +
    "	                " +
    "	            </span>" +
    "			</div>" +
    "			" +
    "			<div ng-show=\"showProgress\" id=\"progress\" class=\"progress span9\">" +
    "			    <div class=\"bar\" style=\"width: {{currentProgress}}%; height: 30px\"></div>" +
    "			</div>" +
    "		</div>" +
    "	</form>" +
    "	" +
    "	<hr />" +
    "	" +
    "	<form name=\"organizationSettingsForm\" novalidate>" +
    "		<div class=\"control-group\">" +
    "	    	<label class=\"control-label\">{{'label_organization_name'|trad}}</label>" +
    "    		" +
    "    		<div class=\"controls\">" +
    "  				<input ng-blur ng-focus type=\"text\" name=\"name\" ng-model=\"organizationSettings.name\"" +
    "					placeholder=\"{{'label_organization_name'|trad}}\"" +
    "					required" +
    "					ng-minlength=\"2\"" +
    "					ng-maxlength=\"50\"" +
    "					class=\"input-xlarge\"" +
    "				>" +
    "	" +
    "				<span class=\"clear\"></span>" +
    "	" +
    "				<span class=\"text-error\" ng-show=\"!nameshow && csValidate(formSent,organizationForm.name.$error.required,organizationForm.name.$pristine)\">{{'error_organization_name_missing'|trad}}</span>" +
    "				<span class=\"text-error\" ng-show=\"!nameshow && csValidate(formSent,organizationForm.name.$error.minlength || organizationForm.name.$error.maxlength,organizationForm.name.$pristine)\">{{'error_organization_name_size'|trad}}</span>" +
    "			</div>" +
    "	  	</div>" +
    "	  	" +
    "	  	<div class=\"control-group\">" +
    "	    	<label class=\"control-label\">{{'label_website'|trad}}</label>" +
    "    		" +
    "    		<div class=\"controls\">" +
    "  				<input ng-blur ng-focus type=\"text\" name=\"website\" ng-model=\"organizationSettings.website\"" +
    "					placeholder=\"{{'label_website'|trad}}\"" +
    "					ng-pattern=\"/((http:\\/\\/|https:\\/\\/)?(www.)?(([a-zA-Z0-9-]){2,}\\.){1,4}([a-zA-Z]){2,6}(\\/([a-zA-Z-_\\/\\.0-9#:?=&;,]*)?)?)/\"" +
    "					class=\"input-xlarge\"" +
    "				>" +
    "				<span class=\"clear\"></span>" +
    "					" +
    "				<span class=\"text-error\" ng-show=\"!websiteshow && csValidate(formSent,organizationForm.website.$error.pattern,organizationForm.website.$pristine)\">{{'error_website_invalid'|trad}}</span>" +
    "			</div>" +
    "	  	</div>" +
    "		" +
    "		<hr/>" +
    "		" +
    "		<div class=\"control-group\">" +
    "	    	<label class=\"control-label\">{{'label_description'|trad}}</label>" +
    "    		" +
    "    		<div class=\"controls\">		    " +
    "  				<div ng-blur ng-focus" +
    "					rich-text-editor" +
    "					name=\"description\"" +
    "					ng-model=\"organizationSettings.description\"" +
    "					placeholder=\"{{'label_description'|trad}}\"" +
    "					required" +
    "					ng-minlength=\"10\"" +
    "					ng-maxlength=\"5000\"" +
    "				></div>" +
    "	" +
    "				<span class=\"clear\"></span>" +
    "	" +
    "				<span class=\"text-error\" ng-show=\"!descriptionshow &&  csValidate(formSent,organizationForm.description.$error.required,organizationForm.description.$pristine)\">{{'error_organization_description_missing'|trad}}</span>" +
    "				<span  class=\"text-error\" ng-show=\"!descriptionshow &&  csValidate(formSent,organizationForm.description.$error.length || organizationForm.description.$error.length,organizationForm.description.$pristine)\">{{'error_organization_description_size'|trad}}</span>" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		<hr />" +
    "		" +
    "		<div class=\"control-group\">" +
    "	  		<label class=\"control-label\">{{'label_address'|trad}}</label>" +
    "	  		" +
    "	  		<div class=\"controls controls-row\">		" +
    "	  			<geoloc-picker " +
    "					formated-address=\"formatedAddress\" " +
    "					address-label=\"search\"" +
    "					my-address=\"true\"" +
    "					class=\"span11\"" +
    "				></geoloc-picker>" +
    "	  		</div>			  		" +
    "	  	</div>	" +
    "" +
    "		<hr />" +
    "		" +
    "		<div class=\"controls controls-row\">" +
    "			<label class=\"checkbox\">" +
    "				<input type=\"checkbox\" name=\"asCommunity\" checked=\"checked\" ng-model=\"organizationSettings.asCommunity\" />" +
    "				{{'label_add_organization_community'|trad}}" +
    "				<i class=\"icon-question-sign\" popover data-trigger=\"hover\" data-title=\"{{'label_information'|trad}}\" data-content=\"{{'label_asCommunity_information'|trad}}\"></i>" +
    "			</label>" +
    "		</div>" +
    "		" +
    "		<div class=\"form-actions\">" +
    "			<loader  data-classes=\"btn-primary btn\" data-sending=\"sending\" data-action=\"submit\" data-label=\"label_update\"></loader>" +
    "		</div>	" +
    "	</form>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/organizations/organizations.html",
    "<div id=\"organization\" class=\"block margin-top padding-bottom\" fade ng-init=\"initOrganization()\">" +
    "	<div class=\"row-fluid\">" +
    "    	<!-- Informations -->" +
    "    	<ng-include  src=\"Config.templatesPublicURL+'organizations/includes/infos.html'\"></ng-include>" +
    "    	" +
    "    	<div class=\"span9 margin-top padding-right\">" +
    "		    <!-- Menu -->" +
    "    		<ng-include  src=\"Config.templatesPublicURL+'organizations/includes/menu.html'\"></ng-include>" +
    "    		" +
    "		    <div ui-view></div>" +
    "	    </div>" +
    "	</div>		    " +
    "</div>"
  );

  $templateCache.put("assets/dev/views/password/change.html",
    "<div id=\"change\" class=\"row-fluid\" ng-init=\"init()\">" +
    "	<div class=\"span9 block margin-top\">" +
    "		<div class=\"header nav-header padding\">{{'label_change_password'|trad}}</div>" +
    "			" +
    "		<form class=\"form-horizontal\" name=\"passwordForm\" novalidate ng-submit=\"submitChangePassword()\">					" +
    "			<div class=\"padding margin-top\">" +
    "				<div class=\"control-group\" ng-hide=\"raz\">" +
    "					<div class=\"controls\">" +
    "		  				<input type=\"password\" name=\"old\" ng-model=\"old\" " +
    "		  					placeholder=\"{{'label_password_old'|trad}}\"" +
    "		  					ng-required=\"!raz\"" +
    "		  					ng-blur ng-focus" +
    "		  					class=\"input-xlarge\"" +
    "		  				>" +
    "		  				<span class=\"clear\"></span>" +
    "		  				<span class=\"text-error\" ng-show=\"!oldshow && csValidate(formSent,passwordForm.old.$error.required,passwordForm.old.$pristine)\">{{'error_member_password_missing'|trad}}</span>" +
    "					</div>" +
    "				</div>" +
    "				" +
    "			  	<div class=\"control-group\">" +
    "			  		<div class=\"controls\">" +
    "		  				<input type=\"password\" name=\"password1\" ng-model=\"password1\" " +
    "		  					placeholder=\"{{'label_password_new'|trad}}\"" +
    "		  					required" +
    "		  					ng-minlength=\"6\"" +
    "				  			ng-maxlength=\"100\"" +
    "				  			ng-blur ng-focus" +
    "				  			class=\"input-xlarge\"" +
    "		  				>" +
    "		  				<span class=\"clear\"></span>" +
    "		  				" +
    "		  				<span class=\"text-error\" ng-show=\"!password1show && csValidate(formSent,passwordForm.password1.$error.required,passwordForm.password1.$pristine)\">{{'error_member_password_missing'|trad}}</span>" +
    "				    	<span class=\"text-error\" ng-show=\"!password1show && csValidate(formSent,passwordForm.password1.$error.minlength || passwordForm.password1.$error.maxlength,passwordForm.password1.$pristine)\">{{'error_member_password_size'|trad}}</span>" +
    "					</div>" +
    "				</div>" +
    "				" +
    "				<!-- Mot de passe 2 -->" +
    "				<div class=\"control-group\">" +
    "					<div class=\"controls\">" +
    "				  		<input type=\"password\" name=\"password2\" ng-model=\"password2\" " +
    "				  			placeholder=\"{{'label_password_confirmation'|trad}}\"	  			   " +
    "				  			password-validator=\"password1\"" +
    "				  			ng-blur ng-focus" +
    "				  			class=\"input-xlarge\"" +
    "				  		>" +
    "				  		<span class=\"clear\"></span>" +
    "				  		<span class=\"text-error\" ng-show=\"!password2show && csValidate(formSent,passwordForm.password2.$error.MATCH,passwordForm.password2.$pristine)\">{{'error_member_passwords_differents'|trad}}</span>						" +
    "					</div>" +
    "				</div>				" +
    "			</div>" +
    "			" +
    "			<div class=\"form-actions\">" +
    "				<input type=\"submit\" class=\"btn btn-primary changing\" data-loading-text=\"{{'label_loading'|trad}}\" value=\"{{'label_update'|trad}}\"/>" +
    "			</div>" +
    "		</form>" +
    "	</div>" +
    "	" +
    "	<ng-include src=\"Config.templatesPublicURL+'settings/includes/menu.html'\" class=\"span3 margin-top\"></ng-include>	" +
    "</div>		"
  );

  $templateCache.put("assets/dev/views/password/forgotten.html",
    "<div id=\"forgot\" class=\"block row-fluid margin-top\">" +
    "	<div class=\"header nav-header padding\">{{'label_forgot_password'|trad}}</div>" +
    "	    		" +
    "	<form name=\"passwordForm\" novalidate ng-submit=\"submitForgottenPassword()\">" +
    "		<div class=\"padding margin-top\">" +
    "			<div class=\"control-group\">" +
    "	    		<span class=\"help-block\">{{'label_forgot_password_information'|trad}}</span>" +
    "	    		" +
    "	    		<div class=\"controls\">" +
    "	    			<div class=\"input-prepend\">" +
    "	    				<span class=\"add-on pop\"><i class=\"icon-envelope\"></i></span>" +
    "	    				" +
    "	      				<input type=\"email\" class=\"input-xlarge\" name=\"email\" ng-model=\"myForgottenForm.email\" " +
    "	      					placeholder=\"{{'label_email'|trad}}\"" +
    "	      					required" +
    "	      					ng-blur ng-focus" +
    "	      				>" +
    "	      			</div>" +
    "	      			<span class=\"clear\"></span>" +
    "	      			" +
    "	      			<span class=\"text-error\" ng-show=\"!emailshow && csValidate(formSent,passwordForm.email.$error.required,passwordForm.email.$pristine)\">{{'error_member_email_missing'|trad}}</span>" +
    "			    	<span class=\"text-error\" ng-show=\"!emailshow && csValidate(formSent,passwordForm.email.$error.email,passwordForm.email.$pristine)\">{{'error_member_email_invalid'|trad}}</span>" +
    "				</div>" +
    "			</div>" +
    "		</div>" +
    "					" +
    "		<div class=\"form-actions\">" +
    "			<input type=\"submit\" class=\"btn btn-primary changing\" data-loading-text=\"{{'label_loading'|trad}}\" value=\"{{'label_send'|trad}}\"/>" +
    "		</div>" +
    "	</form>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/password/forgottenChange.html",
    "<div id=\"change\" class=\"row-fluid\" ng-init=\"init()\">" +
    "	<div class=\"span12 block margin-top\">" +
    "		<div class=\"header nav-header padding\">{{'label_change_password'|trad}}</div>" +
    "			" +
    "		<form class=\"form-horizontal\" name=\"passwordForm\" novalidate ng-submit=\"submitChangePassword()\">					" +
    "			<div class=\"padding margin-top\">" +
    "			  	<div class=\"control-group\">" +
    "			  		<div class=\"controls\">" +
    "		  				<input type=\"password\" name=\"password1\" ng-model=\"password1\" " +
    "		  					placeholder=\"{{'label_password_new'|trad}}\"" +
    "		  					required" +
    "		  					ng-minlength=\"6\"" +
    "				  			ng-maxlength=\"100\"" +
    "				  			ng-blur ng-focus" +
    "				  			class=\"input-xlarge\"" +
    "		  				>" +
    "		  				<span class=\"clear\"></span>" +
    "		  				" +
    "		  				<span class=\"text-error\" ng-show=\"!password1show && csValidate(formSent,passwordForm.password1.$error.required,passwordForm.password1.$pristine)\">{{'error_member_password_missing'|trad}}</span>" +
    "				    	<span class=\"text-error\" ng-show=\"!password1show && csValidate(formSent,passwordForm.password1.$error.minlength || passwordForm.password1.$error.maxlength,passwordForm.password1.$pristine)\">{{'error_member_password_size'|trad}}</span>" +
    "					</div>" +
    "				</div>" +
    "				" +
    "				<!-- Mot de passe 2 -->" +
    "				<div class=\"control-group\">" +
    "					<div class=\"controls\">" +
    "				  		<input type=\"password\" name=\"password2\" ng-model=\"password2\" " +
    "				  			placeholder=\"{{'label_password_confirmation'|trad}}\"	  			   " +
    "				  			password-validator=\"password1\"" +
    "				  			ng-blur ng-focus" +
    "				  			class=\"input-xlarge\"" +
    "				  		>" +
    "				  		<span class=\"clear\"></span>" +
    "				  		<span class=\"text-error\" ng-show=\"!password2show && csValidate(formSent,passwordForm.password2.$error.MATCH,passwordForm.password2.$pristine)\">{{'error_member_passwords_differents'|trad}}</span>						" +
    "					</div>" +
    "				</div>				" +
    "			</div>" +
    "			" +
    "			<div class=\"form-actions\">" +
    "				<input type=\"submit\" class=\"btn btn-primary changing\" data-loading-text=\"{{'label_loading'|trad}}\" value=\"{{'label_update'|trad}}\"/>" +
    "			</div>" +
    "		</form>" +
    "	</div>	" +
    "</div>		"
  );

  $templateCache.put("assets/dev/views/payments/includes/beneficiaries.html",
    "<div id=\"beneficiaries\" class=\"span9 block margin-top\" ng-init=\"initBeneficiaries()\">" +
    "	<div class=\"header nav-header padding\">{{'label_beneficiaries'|trad}}</div>" +
    "" +
    "	<div class=\"padding margin-top\" ng-hide=\"loading\">" +
    "		<div class=\"alert alert-info\">" +
    "			{{'label_beneficiaries_information'|trad}}" +
    "			" +
    "			<p ng-bind-html-unsafe=\"'label_policies_consultation'|trad\"></p>" +
    "		</div>" +
    "		" +
    "		<hr />" +
    "		" +
    "		<div class=\"alert alert-success\" ng-show=\"beneficiaries.length == 0\">" +
    "			{{'label_no_user_beneficiaries'|trad}}" +
    "		</div>" +
    "		" +
    "		<table class=\"table table-striped\" ng-hide=\"beneficiaries.length == 0\">		  		" +
    "	  		<thead>" +
    "	    		<tr>" +
    "	      			<th>{{'label_owner'|trad}}</th>" +
    "	      			<th>{{'label_address'|trad}}</th>" +
    "	     			<th>{{'label_iban'|trad}}</th>" +
    "	     			<th>{{'label_bic'|trad}}</th>" +
    "	    		</tr>" +
    "	  		</thead>" +
    "	  		" +
    "	  		{{beneficiary.ID}} {{beneficiary.Tag}} {{beneficiary.CreationDate}} " +
    "		" +
    "	  		<tbody>" +
    "	    		<tr ng-repeat=\"beneficiary in beneficiaries\">" +
    "	    			<td>{{beneficiary.BankAccountOwnerName}}</td>" +
    "	    			<td>{{beneficiary.BankAccountOwnerAddress}}</td>" +
    "	    			<td>{{beneficiary.BankAccountIBAN}}</td>" +
    "	    			<td>{{beneficiary.BankAccountBIC}}</td>" +
    "	    		</tr>" +
    "	    	</tbody>" +
    "		</table>" +
    "	</div>" +
    "	<div class=\"span6 offset5 margin-top\" ng-show=\"loading\" ><img class=\"intern-loader\" src=\"assets/images/ajax-loader.gif\"></div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/payments/includes/cards.html",
    "" +
    "<div id=\"cards\" class=\"span9 block margin-top\" ng-init=\"initCards()\">" +
    "	<div class=\"header nav-header padding\">{{'label_cards'|trad}}</div>" +
    "	" +
    "	<div ng-hide=\"loading\">" +
    "		<div class=\"padding margin-top\">" +
    "			<div class=\"alert alert-info\">" +
    "				{{'label_cards_information'|trad}}" +
    "				" +
    "				<p ng-bind-html-unsafe=\"'label_policies_consultation'|trad\"></p>" +
    "			</div>" +
    "			" +
    "			<hr />" +
    "			" +
    "			<div class=\"alert alert-success\" ng-show=\"cards.length == 0\">" +
    "				{{'label_no_user_cards'|trad}}" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		<table class=\"table table-striped\" ng-hide=\"cards.length == 0\"></table>" +
    "	</div>	" +
    "	<div class=\"span6 offset5 margin-top\" ng-show=\"loading\"><img class=\"intern-loader\"  src=\"assets/images/ajax-loader.gif\"></div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/payments/includes/menu.html",
    "<ul class=\"nav nav-list block\">" +
    "	<li class=\"nav-header header padding\">{{'label_navigation'|trad}}</li>" +
    "	<li><a href=\"#/payments/operations\">{{'label_operations'|trad}}</a></li>" +
    "	<li><a href=\"#/payments/cards\">{{'label_cards'|trad}}</a></li>" +
    "	<li><a href=\"#/payments/beneficiaries\">{{'label_beneficiaries'|trad}}</a></li>" +
    "</ul>"
  );

  $templateCache.put("assets/dev/views/payments/includes/operations.html",
    "<div id=\"operations\" class=\"span9 block margin-top\" ng-init=\"initOperations()\">" +
    "	<div class=\"header nav-header padding\">{{'label_operations'|trad}}</div>" +
    "		" +
    "	<div class=\"padding margin-top\" ng-hide=\"loading\">" +
    "		<div class=\"alert alert-info\">" +
    "			<p>{{'label_operations_information'|trad}}</p>" +
    "			" +
    "			<p ng-bind-html-unsafe=\"'label_policies_consultation'|trad\"></p>" +
    "		</div>" +
    "		" +
    "		<hr />" +
    "		" +
    "		<div class=\"alert alert-success\" ng-show=\"operations.length == 0\">" +
    "			{{'label_no_user_operations'|trad}}" +
    "		</div>" +
    "" +
    "		<table class=\"table table-striped\" ng-hide=\"operations.length == 0\">		  		" +
    "	  		<thead>" +
    "	    		<tr>" +
    "	      			<th>{{'label_type'|trad}}</th>" +
    "	      			<th>{{'label_events'|trad}}</th>" +
    "	     			<th>{{'label_date'|trad}}</th>" +
    "	     			<th>{{'label_amount'|trad}}</th>" +
    "	    		</tr>" +
    "	  		</thead>" +
    "	  		" +
    "	  		<tbody>" +
    "	    		<tr ng-repeat=\"operation in operations\">" +
    "	    			<td>{{operation.TransactionType}}</td>" +
    "	    			<td>{{operation.event.title}}</td>" +
    "	    			<td>{{[operation.CreationDate] |formatedDate}}</td>" +
    "	    			<td>{{operation.Amount / 100}}€</td>" +
    "	    		</tr>" +
    "	    	</tbody>" +
    "		</table>" +
    "	</div>	" +
    "	<div class=\"span5 offset5 margin-top\" ng-show=\"loading\"><img class=\"intern-loader\"  src=\"assets/images/ajax-loader.gif\"></div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/payments/payment.html",
    "<div  class=\"row-fluid\" >	" +
    "	<div ui-view></div>" +
    "	" +
    "	<ng-include src=\"Config.templatesPublicURL+'payments/includes/menu.html'\" class=\"span3 margin-top\"></ng-include>" +
    "</div>	"
  );

  $templateCache.put("assets/dev/views/search/search.html",
    "<div id=\"search\" class=\"block margin-top\" fade ng-init=\"initSearchCtrl()\" ng-cloack>	" +
    "	<div class=\"header nav-header padding\">{{userList.length}} {{'label_search_results'|trad}} \"{{keyword}}\"</div>" +
    "" +
    "	<div class=\"padding margin-top\" ng-hide=\"loading\">" +
    "		<!-- utilisateurs -->" +
    "		<custom ng-switch on=\"kind\">" +
    "			<custom ng-switch-when=\"users\">" +
    "				<div class=\"alert alert-info margin-top\" ng-show=\"!userList || userList.length == 0\">" +
    "					{{'label_no_search_users'|trad}}" +
    "				</div>" +
    "	       		<custom ng-repeat=\"user in userList\">" +
    "					<custom ng-switch on=\"$index % 2\">" +
    "		            	<custom ng-switch-when=\"0\">" +
    "			                <div class=\"row-fluid\" ng-hide=\"userList.length == 0\">" +
    "			                    <div ng-show=\"userList[$index+0]\" class=\"block span6 margin-top\" ><card fade data-type=\"users\" data-format=\"medium\" data-resource=\"userList[$index+0]\"></card></div>" +
    "			                    <div ng-show=\"userList[$index+1]\" class=\"block span6 margin-top\" ><card fade data-type=\"users\" data-format=\"medium\" data-resource=\"userList[$index+1]\"></card></div>" +
    "			                </div>" +
    "			            </custom>" +
    "			        </custom>" +
    "				</custom>" +
    "	       	</custom>" +
    "	       	" +
    "	       	<!-- Organisations -->" +
    "	       	<custom ng-switch-when=\"organizations\">" +
    "	       		<div class=\"alert alert-info margin-top\" ng-show=\"!organizationsList || organizationsList.length == 0\">" +
    "					{{'label_no_search_organizations'|trad}}" +
    "				</div>" +
    "	       		<custom ng-repeat=\"organization in organizationsList\">" +
    "					<custom ng-switch on=\"$index % 2\">" +
    "		            	<custom ng-switch-when=\"0\">			                " +
    "			                <div class=\"row-fluid\" ng-hide=\"organizationsList.length == 0\">" +
    "			                    <div ng-show=\"organizationsList[$index+0]\" class=\"block span6 margin-top\" ><card fade data-type=\"organizations\" data-format=\"medium\" data-resource=\"organizationsList[$index+0]\"></card></div>" +
    "			                    <div ng-show=\"organizationsList[$index+1]\" class=\"block span6 margin-top\" ><card fade data-type=\"organizations\" data-format=\"medium\" data-resource=\"organizationsList[$index+1]\"></card></div>" +
    "			                </div>" +
    "			            </custom>" +
    "			        </custom>" +
    "				</custom>" +
    "	       	</custom>" +
    "	       	" +
    "	       	<!-- Communautés -->" +
    "	       	<custom ng-switch-when=\"communities\">" +
    "	       		<div class=\"alert alert-info margin-top\" ng-show=\"!communitiesList || communitiesList.length == 0\">" +
    "					{{'label_no_search_communities'|trad}}" +
    "				</div>" +
    "	       		<custom ng-repeat=\"community in communitiesList\">" +
    "					<custom ng-switch on=\"$index % 2\">" +
    "		            	<custom ng-switch-when=\"0\">			                " +
    "			                <div class=\"row-fluid\" ng-hide=\"communitiesList.length == 0\">" +
    "			                    <div ng-show=\"communitiesList[$index+0]\" class=\"block span6 margin-top\" ><card fade data-type=\"organizations\" data-format=\"medium\" data-resource=\"communitiesList[$index+0]\"></card></div>" +
    "			                    <div ng-show=\"communitiesList[$index+1]\" class=\"block span6 margin-top\" ><card fade data-type=\"organizations\" data-format=\"medium\" data-resource=\"communitiesList[$index+1]\"></card></div>" +
    "			                </div>" +
    "			            </custom>" +
    "			        </custom>" +
    "				</custom>" +
    "	       	</custom>" +
    "	    </custom>" +
    "		" +
    "	</div>" +
    "	" +
    "	<div class=\"offset5\" ng-show=\"loading\"><img class=\"intern-loader\" src=\"assets/images/ajax-loader.gif\"></div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/settings/includes/communities.html",
    "<div class=\"span9 margin-top\" ng-init=\"initCommunities()\">" +
    "	<div class=\"block\">" +
    "		<div class=\"header nav-header padding\">{{'label_my_communities'|trad}}</div>" +
    "		" +
    "		<div class=\"margin-top padding\">" +
    "			<div ng-show=\"!communities || communities.length == 0\" class=\"alert alert-info\">" +
    "				{{'label_no_communities_information'|trad}}" +
    "			</div>" +
    "			" +
    "			<div ng-show=\"communities.length > 0\" class=\"row-fluid\">" +
    "				<custom ng-repeat=\"community in communities\">" +
    "					<custom ng-switch on=\"$index % 2\">" +
    "		            	<custom ng-switch-when=\"0\">" +
    "			                <div class=\"row-fluid\" ng-hide=\"userList.length == 0\">							    " +
    "			                    <div ng-show=\"communities[$index+0]\" class=\"block span6 margin-top\" >" +
    "			                    	<card					" +
    "										data-format=\"medium\" " +
    "										data-type=\"organizations\" " +
    "										data-resource=\"communities[$index+0]\">" +
    "									</card>" +
    "			                    </div>" +
    "			                    <div ng-show=\"communities[$index+1]\" class=\"block span6 margin-top\" >" +
    "			                    	<card				" +
    "										data-format=\"medium\" " +
    "										data-type=\"organizations\" " +
    "										data-resource=\"communities[$index+1]\">" +
    "									</card>" +
    "			                    </div>" +
    "			                </div>" +
    "			            </custom>" +
    "			        </custom>" +
    "				</custom>" +
    "			</div>" +
    "		</div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/settings/includes/hobbies.html",
    "" +
    "<div class=\"span9 margin-top\" ng-init=\"initHobbies()\">" +
    "	<div class=\"block\">" +
    "		<div class=\"header nav-header padding\">{{'label_my_hobbies'|trad}}</div>" +
    "		" +
    "		<div class=\"margin-top padding\" ng-hide=\"loading\">" +
    "			<div class=\"alert alert-info\">{{'label_hobbies_information'|trad}}</div>" +
    "			" +
    "			<hr />" +
    "			" +
    "			<div class=\"alert alert-success\" ng-show=\"hobbies.length == 0\">{{'label_no_user_hobbies'|trad}}</div>" +
    "			" +
    "			<div class=\"row-fluid\">" +
    "				<ul class=\"thumbnails\">" +
    "					<li class=\"span2\" class=\"event\" ng-repeat=\"hobby in hobbies\"fade>" +
    "						<div>" +
    "							<div class=\"thumbnail\">" +
    "								<button type=\"button\" class=\"close\" ng-click=\"deleteHobby(hobby)\" class=\"pull-right\">×</button>" +
    "								" +
    "								<img ng-src=\"{{hobby.picture}}\" fade>" +
    "							</div>" +
    "							" +
    "							<div class=\"caption text-center\">" +
    "								<h5>{{hobby.label}}</h5>" +
    "							</div>	" +
    "						</div>	" +
    "					</li>" +
    "				</ul>" +
    "			</div>		" +
    "		</div>" +
    "		" +
    "		<div class=\"offset5 margin-top\" ng-show=\"loading\" ><img class=\"intern-loader\" src=\"assets/images/ajax-loader.gif\"></div>" +
    "	</div>" +
    "	" +
    "	<div class=\"block margin-top\" ng-hide=\"loading\">" +
    "		<div class=\"header nav-header padding\">{{'label_all_hobbies'|trad}}</div>" +
    "		" +
    "		<div class=\"margin-top padding\">" +
    "			<div class=\"row-fluid\">" +
    "				<ul class=\"thumbnails\">" +
    "					<li class=\"span2\"" +
    "						ng-repeat=\"hob in hobbiesList | filter: existant\"" +
    "						ng-click=\"addHobby(hob)\" " +
    "						fade" +
    "					>" +
    "						<div>" +
    "							<a href=\"javascript:;\" class=\"thumbnail\"><img ng-src=\"{{hob.picture}}\" fade></a>" +
    "							" +
    "							<div class=\"caption text-center\">" +
    "								<h5>{{hob.label}}</h5>" +
    "							</div>	" +
    "						</div>	" +
    "					</li>" +
    "				</ul>	" +
    "			</div>	" +
    "		</div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/settings/includes/menu.html",
    "<ul class=\"nav nav-list block\">" +
    "	<li class=\"nav-header header padding\">{{'label_navigation'|trad}}</li>" +
    "  	<li class=\"nav-header\">{{'label_general'|trad}}</li>" +
    " 	<li><a href=\"#/settings\">{{'label_profile'|trad}}</a></li>" +
    "	<li><a href=\"#/settings/hobbies\">{{'label_hobbies'|trad}}</a></li>" +
    "	<li><a href=\"#/settings/talents\">{{'label_talents'|trad}}</a></li>" +
    "" +
    "	<li class=\"nav-header\">{{'label_privacy'|trad}}</li>" +
    "	<li><a href=\"#/settings/password\">{{'label_password'|trad}}</a></li>" +
    "	<!--" +
    "	<li><a href=\"\">{{'settings_button_socials_network'|trad}}</a></li>								" +
    "	<li><a href=\"\">{{'settings_button_applications'|trad}}</a></li>" +
    "	<li><a href=\"notifications\">{{'label_notifications'|trad}}</a></li>-->" +
    "</ul>"
  );

  $templateCache.put("assets/dev/views/settings/includes/settings.html",
    "<div id=\"settings\" class=\"span9 block margin-top\">		" +
    "	<div class=\"header nav-header padding\">{{'label_modify_profile'|trad}}</div>" +
    "	" +
    "	<div ng-hide=\"loading\">" +
    "	" +
    "		<div class=\"margin-top padding\">" +
    "			<form class=\"form-horizontal\">		" +
    "				<div class=\"control-group\">" +
    "					<img ng-cloak ng-src=\"{{mySettingsForm.smallPhoto}}?{{d.getTime()}}\" class=\"img-polaroid control-label\" />" +
    "	" +
    "					<div class=\"controls controls-row\">" +
    "						<span class=\"btn btn-success fileinput-button span5\">" +
    "			                <i class=\"icon-plus icon-white\"></i>" +
    "			                <span>{{'label_upload_profile'|trad}}</span>" +
    "			                <input file-upload cs-type=\"ParameterCtrl\"  id=\"photo\" type=\"file\" name=\"photo\" />" +
    "			            </span>" +
    "		" +
    "						<div ng-show=\"showProgress\" id=\"progress\" class=\"progress span7\">" +
    "						    <div class=\"bar\" style=\"width: {{currentProgress}}%; height: 30px\"></div>" +
    "						</div>" +
    "					</div>" +
    "				</div>" +
    "			</form>" +
    "		</div>" +
    "		" +
    "		<div class=\"padding\">" +
    "			<hr />" +
    "		</div>" +
    "		" +
    "		<!-- Formulaire Paramètres -->" +
    "		<form class=\"form-horizontal form-{{formSent}}\" name=\"settingsForm\" novalidate>						" +
    "			<div class=\"padding\">" +
    "				<!-- Prénom -->" +
    "				<div class=\"control-group\">" +
    "			    	<label class=\"control-label\">{{'label_name'|trad}}</label>" +
    "		    		" +
    "		    		<div class=\"controls\">" +
    "	      				<input type=\"text\" ng-blur ng-focus name=\"name\" ng-model=\"mySettingsForm.name\"" +
    "	      					placeholder=\"{{'label_name'|trad}}\"" +
    "	      					required " +
    "	      					ng-minlength=\"2\" " +
    "	      					ng-maxlength=\"50\"" +
    "	      					ng-pattern=\"/^[a-zA-ZÀ-ÿ0-9 -]+$/\"" +
    "	      					class=\"input-xlarge\"" +
    "	      				>" +
    "	      				" +
    "		      			<span class=\"clear\"></span>" +
    "		      			" +
    "		      			<span class=\"text-error\" ng-show=\"!nameshow && csValidate(formSent,settingsForm.name.$error.pattern,settingsForm.name.$pristine)\">{{'error_member_name_invalid'|trad}}</span>	    				" +
    "		      			<span class=\"text-error\" ng-show=\"!nameshow && csValidate(formSent,settingsForm.name.$error.required,settingsForm.name.$pristine)\">{{'error_member_name_missing'|trad}}</span>" +
    "	    				<span class=\"text-error\" ng-show=\"!nameshow && csValidate(formSent,settingsForm.name.$error.minlength || settingsForm.name.$error.maxlength,mySettingsForm.name.$pristine)\">{{'error_member_name_size'|trad}}</span>" +
    "	    			</div>" +
    "			  	</div>" +
    "			  	" +
    "			  	<!-- Nom -->" +
    "				<div class=\"control-group\">" +
    "			    	<label class=\"control-label\">{{'label_lastname'|trad}}</label>" +
    "		    		" +
    "		    		<div class=\"controls\">" +
    "	      				<input type=\"text\" ng-blur ng-focus name=\"lastname\" ng-model=\"mySettingsForm.lastName\" " +
    "	      					placeholder=\"{{'label_lastname'|trad}}\"" +
    "	      					required " +
    "	      					ng-minlength=\"2\" " +
    "	      					ng-maxlength=\"50\"" +
    "	      					ng-pattern=\"/^[a-zA-ZÀ-ÿ0-9 -]+$/\"" +
    "	      					class=\"input-xlarge\"" +
    "	      				>" +
    "" +
    "		      			<span class=\"clear\"></span>" +
    "		      			" +
    "		      			<span class=\"text-error\" ng-show=\"!lastnameshow && csValidate(formSent,settingsForm.lastname.$error.pattern,settingsForm.lastname.$pristine)\">{{'error_member_lastname_invalid'|trad}}</span>		" +
    "		      			<span class=\"text-error\" ng-show=\"!lastnameshow && csValidate(formSent,settingsForm.lastname.$error.required,settingsForm.lastname.$pristine)\">{{'error_member_lastname_missing'|trad}}</span>" +
    "	    				<span class=\"text-error\" ng-show=\"!lastnameshow && csValidate(formSent,settingsForm.lastname.$error.minlength || settingsForm.lastname.$error.maxlength,mySettingsForm.lastname.$pristine)\">{{'error_member_lastname_size'|trad}}</span>" +
    "	    			</div>" +
    "			  	</div>" +
    "			  	" +
    "			  	<!-- Email -->" +
    "			  	<div class=\"control-group\">" +
    "			    	<label class=\"control-label\">{{'label_email'|trad}}</label>" +
    "		    		" +
    "		    		<div class=\"controls\">" +
    "	      				<input ng-blur ng-focus type=\"email\" name=\"email\" ng-model=\"mySettingsForm.email\" " +
    "	      					placeholder=\"{{'label_email'|trad}}\"" +
    "	      					required" +
    "	      					class=\"input-xlarge pop\"" +
    "	      					data-show=\"{{emailshow}}\"" +
    "	      					popover" +
    "	      					data-trigger=\"hover\" " +
    "	      					data-title=\"{{'label_information'|trad}}\" " +
    "	      					data-content=\"{{'label_email_information'|trad}}\"" +
    "	      				>" +
    "" +
    "		      			<span class=\"clear\"></span>" +
    "		      			" +
    "		      			<span class=\"text-error\" ng-show=\"!emailshow && csValidate(formSent,settingsForm.email.$error.required,settingsForm.email.$pristine)\">{{'error_member_email_missing'|trad}}</span>" +
    "	    				<span class=\"text-error\" ng-show=\"!emailshow && csValidate(formSent,settingsForm.email.$error.email,mySettingsForm.email.$pristine)\">{{'error_member_email_invalid'|trad}}</span>" +
    "	    			</div>			    			" +
    "			  	</div>" +
    "			  	" +
    "			  	<!-- Téléphone -->" +
    "			  	<div class=\"control-group\">" +
    "			    	<label class=\"control-label\">{{'label_phone'|trad}}</label>" +
    "		    		" +
    "		    		<div class=\"controls\">" +
    "	      				<input type=\"text\" ng-blur ng-focus name=\"phone\" ng-model=\"mySettingsForm.phone\"" +
    "	      					placeholder=\"{{'label_phone'|trad}}\"      					" +
    "	      					ng-pattern=\"/^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/\"" +
    "	      					class=\"input-xlarge pop\"" +
    "	      					data-show=\"{{phoneshow}}\" " +
    "	      					popover" +
    "	      					data-trigger=\"hover\" " +
    "	      					data-title=\"{{'label_information'|trad}}\" " +
    "	      					data-content=\"{{'label_phone_information'|trad}}\" " +
    "	      				>" +
    "		      				" +
    "		      			<span class=\"clear\"></span>" +
    "		      			" +
    "		      			<span class=\"text-error\" ng-show=\"!phoneshow && csValidate(formSent,settingsForm.phone.$error.pattern,settingsForm.phone.$pristine)\">{{'error_member_phone_invalid'|trad}}</span>" +
    "	    			</div>" +
    "			  	</div>" +
    "			  	" +
    "			  	<hr />" +
    "			  	" +
    "			  	<!-- Langue -->" +
    "			  	<div class=\"control-group\">" +
    "			  		<label class=\"control-label\">{{'label_language'|trad}}</label>	" +
    "					" +
    "					<div class=\"controls\">" +
    "					    <select name=\"language\" class=\"input-xlarge\" ng-model=\"mySettingsForm.language\" ng-options=\"lang.code as lang.label for lang in languageList\">" +
    "					    	<option style=\"display:none\" value=\"\">{{'label_language'|trad}}</option>" +
    "					    </select>" +
    "					</div>    					" +
    "			  	</div>" +
    "			  	" +
    "			  	<!-- Tranche d'âge -->" +
    "			  	<div class=\"control-group\">" +
    "			  		<label class=\"control-label\">{{'label_agebracket'|trad}}</label>	" +
    "					" +
    "					<div class=\"controls\">" +
    "					    <select name=\"ageBracket\" class=\"input-xlarge\" ng-model=\"mySettingsForm.ageBracket\" ng-options=\"age.abbreviation as age.label for age in ageBracketList\">" +
    "					    	<option style=\"display:none\" value=\"\">{{'label_agebracket'|trad}}</option>" +
    "					    </select>" +
    "					</div>    " +
    "			  	</div>" +
    "	" +
    "			  	<hr />" +
    "			  	" +
    "			  	<div class=\"control-group\">" +
    "			    	<label class=\"control-label\">{{'label_description'|trad}}</label>" +
    "		    		" +
    "		    		<div class=\"controls\">		    " +
    "	      				<div ng-blur ng-focus" +
    "	      					name=\"description\"" +
    "	      					ng-minlength=\"10\" " +
    "	      					ng-maxlength=\"5000\"" +
    "	      					rich-text-editor" +
    "	      					ng-model=\"mySettingsForm.description\"" +
    "	      				></div> " +
    "	      				<span class=\"clear\"></span>" +
    "	      				<span class=\"text-error\" ng-show=\"!descriptionshow &&  csValidate(formSent,settingsForm.description.$error.length || settingsForm.description.$error.length,settingsForm.description.$pristine)\">{{'error_member_description.size'|trad}}</span>" +
    "	    			</div>	    			" +
    "			  	</div>" +
    "			  	" +
    "			  	" +
    "			  	<hr />" +
    "			  	" +
    "			  	<div class=\"control-group\">" +
    "			  		<label class=\"control-label\">{{'label_address'|trad}}</label>" +
    "			  		<div class=\"controls\">		" +
    "			  			<geoloc-picker class=\"span12\"" +
    "		      				formated-address=\"formatedAddress\"" +
    "		      				address-label=\"search\"" +
    "			  			></geoloc-picker>" +
    "			  		</div>			  		" +
    "			  	</div>	" +
    "			</div>" +
    "								" +
    "			<div class=\"form-actions\">" +
    "				<loader data-sending=\"sending\" data-action=\"submit\" data-label=\"label_update_profile\"></loader>" +
    "			</div>" +
    "		</form>" +
    "	</div>" +
    "	<div class=\"span6 offset4 margin-top\" ng-show=\"loading\" ><img class=\"intern-loader\" src=\"assets/images/ajax-loader.gif\"></div>	" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/settings/includes/talents.html",
    "" +
    "<div class=\"span9 margin-top\" ng-init=\"initTalents()\">" +
    "	<div class=\"block\">" +
    "		<div class=\"header nav-header padding\">{{'label_my_talents'|trad}}</div>" +
    "		" +
    "		<div class=\"margin-top padding\" ng-hide=\"loading\">" +
    "			<div class=\"alert alert-info\">{{'label_talents_information'|trad}}</div>" +
    "			" +
    "			<hr />" +
    "			" +
    "			<div class=\"alert alert-success\" ng-show=\"talents.length == 0\">{{'label_no_user_talents'|trad}}</div>" +
    "				" +
    "			<ul class=\"thumbnails\">" +
    "				<li class=\"span2\" class=\"event\" ng-repeat=\"talent in talents\"fade>" +
    "					<div>" +
    "						<div class=\"thumbnail\">" +
    "							<button type=\"button\" class=\"close\" ng-click=\"deleteTalent(talent)\" class=\"pull-right\">×</button>" +
    "							" +
    "							<img ng-src=\"{{talent.picture}}\" fade>" +
    "						</div>" +
    "						" +
    "						<div class=\"caption text-center\">" +
    "							<h5>{{talent.label}}</h5>" +
    "						</div>	" +
    "					</div>" +
    "				</li>" +
    "			</ul>" +
    "		</div>	" +
    "			" +
    "		<div class=\"offset5 margin-top\" ng-show=\"loading\" ><img class=\"intern-loader\" src=\"assets/images/ajax-loader.gif\"></div>" +
    "	</div>" +
    "			" +
    "	<div class=\"block margin-top\" ng-hide=\"loading\">" +
    "		<div class=\"header nav-header padding\">{{'label_all_talents'|trad}}</div>" +
    "		" +
    "		<div class=\"margin-top padding\">" +
    "			<ul class=\"thumbnails\">" +
    "				<li class=\"span2\"" +
    "					ng-repeat=\"tal in talentsList | filter: existant\"" +
    "					ng-click=\"addTalent(tal)\" " +
    "					fade" +
    "				>" +
    "					<div>" +
    "						<a href=\"\" class=\"thumbnail\"><img ng-src=\"{{tal.picture}}\" fade></a>" +
    "						" +
    "						<div class=\"caption text-center\">" +
    "							<h5>{{tal.label}}</h5>" +
    "						</div>	" +
    "					</div>	" +
    "				</li>" +
    "			</ul>	" +
    "		</div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/settings/settings.html",
    "<div class=\"row-fluid\">" +
    "	<div ui-view></div>" +
    "	<ng-include src=\"Config.templatesPublicURL+'settings/includes/menu.html'\" class=\"span3 margin-top\"></ng-include>	" +
    "</div>	"
  );

  $templateCache.put("assets/dev/views/users/cards/hover.html",
    ""
  );

  $templateCache.put("assets/dev/views/users/cards/large.html",
    ""
  );

  $templateCache.put("assets/dev/views/users/cards/list.html",
    ""
  );

  $templateCache.put("assets/dev/views/users/cards/medium.html",
    "<div id=\"{{resource.id}}\" class=\"user medium\">" +
    "	<div>" +
    "		<div class=\"padding\">" +
    "			<div class=\"row-fluid\">" +
    "				<div class=\"span2\">" +
    "					<a href=\"#/users/{{resource.id}}\">" +
    "						<img ng-src=\"{{resource.smallPhoto}}\" />" +
    "					</a>" +
    "				</div>" +
    "				" +
    "				<div class=\"span9\">" +
    "					<a href=\"#/users/{{resource.id}}\">{{resource.fullName}}</a> <small ng-show=\"resource.login\">({{resource.login}})</small>" +
    "					" +
    "					<div ng-show=\"{{resource.address.shortLabel}}\">" +
    "						<span class=\"add-on\"><i class=\"icon-map-marker\"></i></span>" +
    "						<span>{{resource.address.shortLabel}}</span>" +
    "					</div>" +
    "					" +
    "					<div class=\"px12\">" +
    "						{{resource.description | noHtmlTags | truncate:140}}" +
    "					</div>" +
    "				</div>" +
    "				" +
    "				<div class=\"span1\">" +
    "					<span tooltip title=\"{{'label_karma_information'|trad}}\" class=\"label label-success padding5 label pull-right\">{{resource.karma}}</span>" +
    "				</div>" +
    "			</div>" +
    "		</div>" +
    "	</div>" +
    "	" +
    "	<div class=\"border-top background\">" +
    "		<div class=\"pull-right\">						" +
    "			<a class=\"action padding pull-left hover\" ng-show=\"available()\" invite user=\"resource\" ng-click=\"show()\" tooltip title=\"{{'label_invite_to'|trad}}\"><i class=\"icon-plus\"></i></a>" +
    "			<a class=\"action padding pull-left hover\" ng-show=\"available()\" message user=\"resource\" ng-click=\"show()\" tooltip title=\"{{'label_send_message'|trad}}\"><i class=\"icon-envelope\"></i></a>" +
    "		" +
    "			<span class=\"clear\"></span>" +
    "		</div>" +
    "		" +
    "		<span class=\"clear\"></span>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/users/cards/small.html",
    "<a href=\"#/users/{{resource.id}}\"><img ng-src=\"{{resource.smallPhoto}}\" tooltip title=\"{{resource.fullName}}\"/></a>"
  );

  $templateCache.put("assets/dev/views/users/confirm.html",
    "<div ng-hide=\"loading\" id=\"confirmation\" class=\"block margin-top\" fade ng-show=\"confirmed\">" +
    "	<div class=\"header nav-header padding\">{{'page_confirmation_title'|trad}}</div>" +
    "	" +
    "	<div class=\"padding margin-top\">" +
    "		<p ng-bind-html-unsafe=\"'page_confirmation_content'|trad\"></p>" +
    "		" +
    "		<hr />" +
    "		" +
    "		<div class=\"row-fluid\">" +
    "			<a href=\"#/settings\" class=\"btn btn-success span4\">{{'label_update_profile'|trad}}</a>" +
    "			<a href=\"#/\" class=\"btn btn-success span4\">{{'label_discover'|trad}}</a>" +
    "			<a href=\"#/addEvent\" class=\"btn btn-success span4\">{{'label_organize'|trad}}</a>" +
    "		</div>" +
    "	</div>" +
    "</div>" +
    "" +
    "<img class=\"loader\" ng-show=\"loading\" src=\"assets/images/ajax-loader.gif\">"
  );

  $templateCache.put("assets/dev/views/users/includes/comments.html",
    "<div class=\"row-fluid margin-top margin-bottom\" ng-init=\"initUserComments()\" ng-hide=\"loading\">" +
    "	<div class=\"alert alert-success padding margin-bottom\" ng-show=\"userComments.length == 0\">" +
    "		<p>{{'label_no_user_comments'|trad}}</p>" +
    "	</div>" +
    "	" +
    "	<div class=\"comment margin-bottom\" ng-repeat=\"comment in userComments\" fade>" +
    "		<div class=\"row-fluid\">" +
    "			<div class=\"span2\">" +
    "		 		<a href=\"#/users/{{userInfos.id}}\">" +
    "		 			<img class=\"media-object\" ng-src=\"{{userInfos.smallPhoto}}\">" +
    "		  		</a>" +
    "		  	</div>" +
    "" +
    "		  	<card class=\"span10\" data-resource=\"comment\" data-type=\"comments\" data-format=\"large\"></card>		  		" +
    "	  	</div>" +
    "" +
    "		<hr />" +
    "	</div>" +
    "</div>" +
    "" +
    "<div class=\"span6 offset4\" ng-show=\"loading\" ><img class=\"intern-loader\" src=\"assets/images/ajax-loader.gif\"></div>"
  );

  $templateCache.put("assets/dev/views/users/includes/communities.html",
    "<div id=\"communities\" ng-init=\"initCommunities()\">" +
    "	<div class=\"block margin-top\" ng-hide=\"create\">" +
    "		<div class=\"header nav-header padding\" >" +
    "			{{'label_communities'|trad}}" +
    "		</div>" +
    "		" +
    "		<div class=\"padding\" >" +
    "			<div ng-show=\"communities.length > 0\" class=\"row-fluid\">" +
    "				<custom ng-repeat=\"community in communities\">" +
    "					<custom ng-switch on=\"$index % 2\">" +
    "		            	<custom ng-switch-when=\"0\">" +
    "			                <div class=\"row-fluid\">							    " +
    "			                    <div ng-show=\"communities[$index+0]\" class=\"block span6 margin-top\" >" +
    "			                    	<card					" +
    "										data-format=\"medium\" " +
    "										data-type=\"organizations\" " +
    "										data-resource=\"communities[$index+0]\">" +
    "									</card>" +
    "			                    </div>" +
    "			                    <div ng-show=\"communities[$index+1]\" class=\"block span6 margin-top\" >" +
    "			                    	<card				" +
    "										data-format=\"medium\" " +
    "										data-type=\"organizations\" " +
    "										data-resource=\"communities[$index+1]\">" +
    "									</card>" +
    "			                    </div>" +
    "			                </div>" +
    "			            </custom>" +
    "			        </custom>" +
    "				</custom>" +
    "			</div>" +
    "			" +
    "			<div ng-show=\"!communities || communities.length == 0\" class=\"alert alert-info\">" +
    "				{{'label_no_communities_information'|trad}}" +
    "			</div>" +
    "		</div>" +
    "	</div>" +
    "</div>	"
  );

  $templateCache.put("assets/dev/views/users/includes/events.html",
    "<!-- TODO variables non traduites -->" +
    "" +
    "<div ng-show=\"!loading\" ng-init=\"initAgenda()\">" +
    "	<div class=\"alert alert-success padding margin-bottom\" ng-show=\"archivedEvents.length == 0 && nextEvents.length == 0 && importantEvents.length == 0\">" +
    "		<p>{{'label_no_user_events'|trad}}</p>" +
    "		" +
    "		<hr />" +
    "		" +
    "		<div class=\"row-fluid\">" +
    "			<div class=\"span6\">" +
    "				<a href=\"#/\" class=\"btn btn-success btn-block\">{{'label_discover'|trad}}</a>" +
    "			</div>" +
    "			<div class=\"span6\">" +
    "				<a href=\"#/addEvent\" class=\"btn btn-success btn-block\">{{'label_organize'|trad}}</a>" +
    "			</div>" +
    "		</div>" +
    "	</div>" +
    "	" +
    "	<div class=\"row-fluid\" ng-hide=\"nextEvents.length == 0 && importantEvents.length == 0\">" +
    "		<div class=\"span6\">" +
    "			<div class=\"header border nav-header padding\">{{\"label_current\"|trad}}</div>" +
    "			" +
    "			<card fade class=\"margin-top block\" data-type=\"events\" data-format=\"medium\" data-resource=\"events\" ng-repeat=\"events in nextEvents\" status=\"true\" ></card>" +
    "		</div>" +
    "		" +
    "		<div class=\"span6\">" +
    "			<div class=\"header border nav-header padding\">{{\"label_urgent\"|trad}}</div>" +
    "			" +
    "			<card fade class=\"margin-top block\" data-type=\"events\" data-format=\"medium\" data-resource=\"events\" ng-repeat=\"events in importantEvents\" status=\"true\"></card>" +
    "		</div>" +
    "	</div>" +
    "		" +
    "	<div ng-hide=\"archivedEvents.length == 0\" class=\"margin-top\">" +
    "		<div class=\"header border nav-header padding\">{{\"label_archived\"|trad}}</div>" +
    "		" +
    "		<card fade class=\"margin-top block\" data-type=\"events\" data-format=\"list\" data-resource=\"events\" ng-repeat=\"events in archivedEvents\" status=\"true\"></card>" +
    "	</div>" +
    "</div>	" +
    "" +
    "<div class=\"span6 offset4\" ng-show=\"loading\"><img class=\"intern-loader\"  src=\"assets/images/ajax-loader.gif\"></div>"
  );

  $templateCache.put("assets/dev/views/users/includes/general.html",
    "<div class=\"row-fluid margin-top margin-bottom\">" +
    "	<div class=\"span8\">" +
    "		<div class=\"alert alert-success padding margin-bottom\" ng-hide=\"anotherUser || userInfos.description\">" +
    "			<p>{{'label_no_user_description'|trad}}</p>" +
    "			" +
    "			<hr />" +
    "			" +
    "			<a href=\"#/settings\" class=\"btn btn-success btn-block\">{{'label_update_profile'|trad}}</a>" +
    "		</div>" +
    "		" +
    "		<div class=\"alert alert-success padding margin-bottom\" ng-hide=\"!anotherUser || userInfos.description\">" +
    "			{{'label_no_profile_description'|trad}}	" +
    "		</div>" +
    "				" +
    "		<div class=\"block margin-bottom\" ng-show=\"userInfos.description\">" +
    "			<div class=\"header nav-header padding\">{{'label_description'|trad}}</div>" +
    "			" +
    "			<p class=\"padding margin-top text-justify\" ng-bind-html-unsafe=\"userInfos.description\"></p>" +
    "		</div>" +
    "		" +
    "		<hr ng-show=\"userInfos.description\"/>" +
    "    	" +
    "    	<div class=\"block\" ng-show=\"similarUsers.length > 0\">" +
    "			<div class=\"header nav-header padding\">{{'label_similar_users'|trad}}</div>" +
    "			" +
    "			<div class=\"row-fluid cell-content\">" +
    "				<div class=\"row-fluid\">" +
    "					<card " +
    "						ng-repeat=\"user in similarUsers\"" +
    "						class=\"span2\" " +
    "						data-type=\"users\" " +
    "						data-resource=\"user\"" +
    "						data-format=\"small\"" +
    "					></card>" +
    "				</div>" +
    "		   </div>" +
    "		</div>" +
    "    </div>" +
    "    " +
    "    <div class=\"span4\">" +
    "		<div class=\"block margin-bottom\" ng-show=\"userInfos.talents.length > 0\">" +
    "			<div class=\"header nav-header padding\">{{'label_talents'|trad}}</div>" +
    "    		" +
    "    		<div class=\"padding\">" +
    "	    		<div class=\"row-fluid\">" +
    "		    		<img ng-repeat=\"talent in userInfos.talents |limitTo:3\" " +
    "		    			ng-src=\"{{talent.picture}}\" " +
    "		    			class=\"span4\" " +
    "		    			fade" +
    "		    			tooltip" +
    "		    			data-title=\"{{talent.label}}\"" +
    "		    		>" +
    "	    		</div>" +
    "	    	</div>" +
    "		</div>" +
    "				" +
    "		<div class=\"block margin-bottom\" ng-show=\"userInfos.hobbies.length > 0\">" +
    "			<div class=\"header nav-header padding\">{{'label_hobbies'|trad}}</div>" +
    "    		" +
    "    		<div class=\"padding\">" +
    "	    		<div class=\"row-fluid\">" +
    "	    			<img ng-repeat=\"hobby in userInfos.hobbies  |limitTo:3\" " +
    "		    			ng-src=\"{{hobby.picture}}\" " +
    "		    			class=\"span4\" " +
    "		    			fade" +
    "		    			tooltip" +
    "		    			data-title=\"{{hobby.label}}\"" +
    "		    		>" +
    "	    		</div>" +
    "	    	</div>" +
    "    	</div>" +
    "    	" +
    "    	<div class=\"block margin-bottom\" ng-show=\"userInfos.badges.length > 0\">" +
    "    		<div class=\"header nav-header padding\">{{'label_badges'|trad}}</div>" +
    "			" +
    "			<div class=\"padding\">" +
    "				<div class=\"row-fluid cell-content\">	    		" +
    "			    	<img  ng-repeat=\"badge in userInfos.badges  |limitTo:6\" " +
    "		    			ng-src=\"{{badge.picture}}\" " +
    "		    			class=\"span2 img-circle hobby_small\" " +
    "		    			fade" +
    "		    			tooltip" +
    "		    			data-title=\"{{badge.label}}\"" +
    "		    		>" +
    "			   </div>" +
    "			</div>" +
    "    	</div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/users/includes/infos.html",
    "<div class=\"span3\">" +
    "	<div class=\"margin-left margin-top margin-bottom block\" style=\"color: #333;\">" +
    "		<img ng-src=\"{{userInfos.mediumPhoto}}\" width=\"100%\" />" +
    "		" +
    "		<div class=\"padding border-top header\">" +
    "			<div class=\"row-fluid\">" +
    "				<div class=\"span9\">" +
    "		    		<h4>{{userInfos.fullName}}</h4>" +
    "		    		<h5>{{userInfos.login}}</h5>" +
    "				</div>" +
    "				<div class=\"span3\">" +
    "					<span tooltip title=\"{{'label_karma_information'|trad}}\" class=\"label label-success label margin-top padding pull-right\">{{userInfos.karma}}</span>" +
    "				</div>" +
    "			</div>" +
    "			" +
    "			<div>" +
    "				<div ng-show=\"userInfos.ageBracket.label\">" +
    "					<span class=\"add-on\"><i class=\"icon-user\"></i></span>" +
    "					<span>{{userInfos.ageBracket.label}}</span>" +
    "				</div>" +
    "				<div ng-show=\"userInfos.address.label\">" +
    "					<span class=\"add-on\"><i class=\"icon-map-marker\"></i></span>" +
    "					<span>{{userInfos.address.shortLabel}}</span>" +
    "				</div>" +
    "			</div>" +
    "		</div>" +
    "		" +
    "		<div>" +
    "			<div class=\"pull-right\">" +
    "				<a class=\"action padding pull-left hover\" ng-hide=\"anotherUser\" href=\"#/settings\" tooltip title=\"{{'label_update_profile'|trad}}\"><i class=\"icon-edit\"></i></a>" +
    "				<a class=\"action padding pull-left hover\" ng-show=\"available()\" invite user=\"userInfos\" ng-click=\"show()\" tooltip title=\"{{'label_invite_to'|trad}}\"><i class=\"icon-plus\"></i></a>" +
    "				<a class=\"action padding pull-left hover\" ng-show=\"available()\" message user=\"userInfos\" ng-click=\"show()\" tooltip title=\"{{'label_send_message'|trad}}\"><i class=\"icon-envelope\"></i></a>" +
    "			" +
    "				<span class=\"clear\"></span>" +
    "			</div>" +
    "			" +
    "			<span class=\"clear\"></span>" +
    "		</div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/users/includes/menu.html",
    "<ul class=\"nav nav-tabs\">" +
    "	<li class=\"{{isPageActive('profile.general')}}\">" +
    "		<a href=\"#/users/{{userInfos.id}}\">{{'label_profile'|trad}}</a>" +
    "	</li>	" +
    "	" +
    "	<li ng-hide=\"anotherUser\" class=\"{{isPageActive('profile.events')}}\">" +
    "		<a href=\"#/users/{{userInfos.id}}/events\">{{'label_events'|trad}}</a>" +
    "	</li>" +
    "	" +
    "	<li ng-hide=\"anotherUser\" class=\"{{isPageActive('profile.communities')}}\">" +
    "		<a href=\"#/users/{{userInfos.id}}/communities\">{{'label_communities'|trad}}</a>" +
    "	</li>" +
    "	" +
    "	<li ng-hide=\"anotherUser\" class=\"{{isPageActive('profile.comments')}}\">" +
    "		<a href=\"#/users/{{userInfos.id}}/comments\">{{'label_comments'|trad}}</a>" +
    "	</li>" +
    "	" +
    "	<li ng-hide=\"anotherUser\" class=\"{{isPageActive('profile.photos')}}\">" +
    "		<a href=\"#/users/{{userInfos.id}}/photos\">{{'label_photos'|trad}}</a>" +
    "	</li>" +
    "	" +
    "	<span class=\"clear\"></span>" +
    "</ul>"
  );

  $templateCache.put("assets/dev/views/users/includes/photos.html",
    "<div class=\"row-fluid margin-top margin-bottom\" ng-init=\"initUserPhotos()\" ng-hide=\"loading\">" +
    "	<div class=\"alert alert-success padding margin-bottom\" ng-show=\"userPhotos.length == 0\">" +
    "		<p>{{'label_no_user_photos'|trad}}</p>" +
    "	</div>" +
    "	" +
    "	<div id=\"gallery\" data-toggle=\"modal-gallery\" data-target=\"#modal-gallery\">" +
    "		" +
    "		<div class=\"row-fluid\">" +
    "			<ul class=\"thumbnails\">" +
    "				<li class=\"span3\" ng-repeat=\"photo in userPhotos\" fade>" +
    "					<div>" +
    "						<a href=\"{{photo.mediumUrl+'?token='+ token}}\" class=\"thumbnail\" title=\"{{'label_in'|trad}} {{photo.event.title}}\" data-gallery=\"gallery\">" +
    "							<img tooltip data-placement=\"top\" style=\"display: block;\" title=\"{{'label_in'|trad}} {{photo.event.title}}\" ng-src=\"{{photo.smallUrl+'?token='+ token}}\" fade />" +
    "						</a>" +
    "					</div>	" +
    "				</li>" +
    "			</ul>	" +
    "		</div>" +
    "	</div>" +
    "</div>" +
    "" +
    "<div class=\"span6 offset4\" ng-show=\"loading\" ><img class=\"intern-loader\" src=\"assets/images/ajax-loader.gif\"></div>" +
    "" +
    "<div id=\"modal-gallery\" class=\"modal modal-gallery hide fade\" tabindex=\"-1\">" +
    "    <div class=\"modal-header\">" +
    "        <a class=\"close\" data-dismiss=\"modal\">&times;</a>" +
    "        <h3 class=\"modal-title\"></h3>" +
    "    </div>" +
    "    " +
    "    <div class=\"modal-body\">" +
    "    	<div class=\"modal-image\"></div>" +
    "    </div>" +
    "    " +
    "    <div class=\"modal-footer\">" +
    "        <!--<a class=\"btn btn-primary modal-next\">Next <i class=\"icon-arrow-right icon-white\"></i></a>" +
    "        <a class=\"btn btn-info modal-prev\"><i class=\"icon-arrow-left icon-white\"></i> Previous</a>" +
    "        -->" +
    "       <!-- <button id=\"toggle-fullscreen\" ng-click=\"fullScreen()\" class=\"btn btn-primary\" data-toggle=\"button\">Toggle Fullscreen</button>-->" +
    "        <a class=\"btn btn-success modal-play modal-slideshow\" ng-click=\"slideshow()\" data-slideshow=\"5000\"><i class=\"icon-play icon-white\"></i>{{'label_slideshow'|trad}}</a>" +
    "        <a class=\"btn modal-download\" target=\"_blank\"><i class=\"icon-download\"></i>{{'label_download'|trad}}</a>" +
    "    </div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/users/login.html",
    "<div id=\"login\" class=\"margin-top block\" fade>" +
    "	<div class=\"header nav-header padding\">{{'label_login'|trad}}</div>" +
    "	" +
    "	<div class=\"padding\">" +
    "	    <div class=\"row-fluid\">" +
    "	    	<div class=\"span6 marketing\">" +
    "				<img src=\"assets/images/climbing.jpg\" class=\"margin-bottom\" />" +
    "					" +
    "				<p class=\"marketing-byline margin-top text-left\">" +
    "					Avez-vous déjà essayé des activités inhabituelles ?<br />" +
    "					" +
    "					<br />" +
    "					" +
    "					De nouvelles personnes à rencontrer, de nouveaux souvenirs à se créer. C'est l'occasion d'en profiter." +
    "				</p>" +
    "			</div>" +
    "			" +
    "	    	<div class=\"span6 border-left padding-left\">" +
    "	    		<form class=\"form-vertical form-{{formSent}}\" name=\"loginForm\" novalidate>" +
    "			    	<div class=\"padding margin-top\">" +
    "				    	<div class=\"control-group\">				    	" +
    "					    	<div class=\"controls\">" +
    "					    		<a class=\"btn-auth btn-facebook large FBlogining\" href=\"javascript:;\" " +
    "									data-loading-text=\"{{'label_loading'|trad}}\"" +
    "									ng-click=\"FBUser.login()\">" +
    "								    {{'label_facebook_login'|trad}}" +
    "								</a>" +
    "							</div>" +
    "					  	</div>" +
    "					  	" +
    "					  	<div class=\"row-fluid margin-top margin-bottom padding-top padding-bottom\">" +
    "							<div class=\"span3\">" +
    "								<hr />" +
    "							</div>" +
    "							" +
    "							<div class=\"span1 padding-top text-center\">" +
    "								<i>{{'label_or'|trad}}</i>" +
    "							</div>" +
    "							" +
    "							<div class=\"span8\">	" +
    "								<hr />" +
    "							</div>" +
    "						</div>" +
    "					  					    	" +
    "				    	<div class=\"controls\">" +
    "				  			<input type=\"email\" name=\"email\" ng-model=\"myLoginForm.email\" " +
    "				  				ng-blur ng-focus" +
    "				  				placeholder=\"{{'label_email'|trad}}\"" +
    "				  				required" +
    "				  				class=\"input-xlarge\"" +
    "				  			>" +
    "				  			" +
    "				  			<span class=\"clear\"></span>" +
    "				  			" +
    "				  			<span class=\"text-error\" ng-show=\"!emailshow && csValidate(formSent,loginForm.email.$error.required,loginForm.email.$pristine)\">{{'error_member_email_missing'|trad}}</span>" +
    "				    		<span class=\"text-error\" ng-show=\"!emailshow && csValidate(formSent,loginForm.email.$error.email,loginForm.email.$pristine)\">{{'error_member_email_invalid'|trad}}</span>			    	" +
    "				    	</div>" +
    "					  	" +
    "				    	<div class=\"controls\">" +
    "				 			<input type=\"password\" name=\"password\" ng-model=\"password\" " +
    "				 				ng-blur ng-focus" +
    "				 				placeholder=\"{{'label_password'|trad}}\"  " +
    "				 				required" +
    "				 				class=\"input-xlarge\"" +
    "				 			>" +
    "				 			<span class=\"clear\"></span>" +
    "				 			<span class=\"text-error\" ng-show=\"!passwordshow && csValidate(formSent,loginForm.password.$error.required,loginForm.password.$pristine)\">{{'error_member_password_missing'|trad}}</span>" +
    "				    	</div>" +
    "				    </div>" +
    "			    	" +
    "			    	<div class=\"form-actions\">" +
    "			    		<loader data-sending=\"sending\" data-action=\"submit\" data-label=\"label_login\"></loader>" +
    "" +
    "				    	<a href=\"#/forgottenPassword\">{{'label_forgot_password'|trad}}</a>" +
    "				    </div>" +
    "				</form>" +
    "			</div>" +
    "		</div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/users/modals/invite.html",
    "<div class=\"modal-header\">" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
    "  " +
    "  <h4>{{'label_invite_to'|trad}}</h4>" +
    "</div>" +
    "" +
    "<div class=\"modal-body\" ng-init=\"initNew()\">" +
    "	<div class=\"row-fluid\">" +
    "		<div class=\"span6 offset4\" ng-show=\"loadingEvents\"><img class=\"intern-loader\" src=\"assets/images/ajax-loader.gif\"></div>" +
    "	</div>" +
    "	" +
    "	<div ng-show=\"events.length == 0 && !loadingEvents\">" +
    "		<div class=\"alert alert-info\">" +
    "			{{'label_invitation_no_events'|trad}}" +
    "		</div>" +
    "		" +
    "		<div class=\"row-fluid\">" +
    "			<a href=\"javascript:;\" class=\"btn btn-success span6\" >{{'label_discover'|trad}}</a>" +
    "			<a href=\"#/addEvent\" class=\"btn btn-success span6\" >{{'label_organize'|trad}}</a>" +
    "		</div>" +
    "	</div>" +
    "	" +
    "	<div ng-show=\"!loadingEvents && (events.length > 0) && (events | filter:{available:true}).length == 0\">" +
    "		<div class=\"alert alert-info\">" +
    "			{{'label_invitation_no_events_guest'|trad}}" +
    "		</div>" +
    "		" +
    "		<div class=\"row-fluid\">" +
    "			<a href=\"javascript:;\" class=\"btn btn-success span6\">{{'label_discover'|trad}}</a>" +
    "			<a href=\"#/addEvent\" class=\"btn btn-success span6\">{{'label_organize'|trad}}</a>" +
    "		</div>" +
    "	</div>" +
    "		" +
    "	<form ng-show=\"(events | filter:{available:true}).length > 0\">" +
    "		<div ng-repeat=\"event in events | filter:{available:true}\" class=\"row-fluid margin-bottom border-bottom padding-bottom\">" +
    "			<div class=\"span1 padding-top\">" +
    "				<input type=\"checkbox\" name=\"\" ng-checked=\"event.checked\" ng-model=\"event.checked\" value=\"{{event.id}}\" />" +
    "			</div>" +
    "			" +
    "			<card class=\"span11\" data-type=\"events\" data-format=\"list\" data-resource=\"event\"></card>" +
    "		</div>" +
    "	</form>" +
    "</div>" +
    "" +
    "<div class=\"modal-footer\">" +
    "  	<button type=\"button\" class=\"btn\" ng-click=\"hide()\">{{'label_close'|trad}}</button>" +
    "	<input ng-disabled=\"!(events | filter:{checked:true}).length > 0\" type=\"submit\" ng-click=\"invite(hide);\" class=\"btn btn-primary inviting\" data-loading-text=\"{{'label_loading'|trad}}\" value=\"{{'label_invite'|trad}}\" />				    	" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/users/register.html",
    "<div id=\"register\" class=\"margin-top block\" ng-init=\"FBUser.initFacebook()\" fade>" +
    "	<div class=\"header nav-header padding\">{{'label_register'|trad}}</div>" +
    "	" +
    "	<!--<iframe src=\"http://www.facebook.com/plugins/facepile.php? " +
    "		app_id={125408324323674}\" scrolling=\"no\" frameborder=\"0\" style=\"border:none;  " +
    "		overflow:hidden; width:100%;\" allowTransparency=\"true\">" +
    "	</iframe> -->" +
    "	" +
    "	<div class=\"padding\">" +
    "		<div class=\"row-fluid\">" +
    "			<div class=\"span6 marketing\">" +
    "				<img src=\"assets/images/cooking.jpg\" class=\"margin-bottom\" />" +
    "					" +
    "				<p class=\"marketing-byline margin-top text-left\">" +
    "					Grâce à Ottercamp, découvrez des activités de proximité avec des personnes proches de chez vous.<br />" +
    "					" +
    "					<br />" +
    "					" +
    "					Gérez l'organisation, partagez vos photos et amusez-vous. C'est gratuit, autant en profiter !" +
    "				</p>" +
    "			</div>" +
    "			" +
    "	    	<div class=\"span6 border-left padding-left\">" +
    "	    		<form class=\"form-vertical form-{{formSent}}\" name=\"registerForm\" novalidate>" +
    "					<div class=\"padding margin-top\">" +
    "				    	<div class=\"controls\">" +
    "							<a class=\"btn-auth btn-facebook large FBlogining\" href=\"javascript:;\"" +
    "								data-loading-text=\"{{'label_loading'|trad}}\"" +
    "								ng-click=\"FBUser.register()\">" +
    "							    {{'label_facebook_register'|trad}}" +
    "							</a>" +
    "						</div>" +
    "					  						  						  	" +
    "					  	<div class=\"row-fluid margin-top margin-bottom padding-top padding-bottom\">" +
    "							<div class=\"span3\">" +
    "								<hr />" +
    "							</div>" +
    "							" +
    "							<div class=\"span1 padding-top text-center\">" +
    "								<i>{{'label_or'|trad}}</i>" +
    "							</div>" +
    "							" +
    "							<div class=\"span8\">	" +
    "								<hr />" +
    "							</div>" +
    "						</div>" +
    "						" +
    "			    		<div class=\"controls\">" +
    "		      				<input type=\"text\" name=\"login\" ng-blur ng-focus" +
    "		      					ng-model=\"myRegisterForm.login\" " +
    "		      					placeholder=\"{{'label_username'|trad}}\"" +
    "		      					required " +
    "		      					ng-minlength=\"4\" " +
    "		      					ng-maxlength=\"30\"" +
    "		      					ng-pattern=\"/^[a-zA-Z0-9 -.]/\"" +
    "		      					class=\"input-xlarge\"" +
    "		      				>" +
    "			      			" +
    "			      			<span class=\"clear\"></span>" +
    "			      			<span class=\"text-error\" ng-show=\"!loginshow && csValidate(formSent,registerForm.login.$error.pattern,registerForm.login.$pristine)\">{{'error_member_login_invalid'|trad}}</span>" +
    "					      	<span class=\"text-error\" ng-show=\"!loginshow && csValidate(formSent,registerForm.login.$error.required,registerForm.login.$pristine)\">{{'error_member_login_missing'|trad}}</span>" +
    "				    		<span class=\"text-error\" ng-show=\"!loginshow && csValidate(formSent,registerForm.login.$error.minlength || registerForm.login.$error.maxlength,registerForm.login.$pristine)\">{{'error_member_login_size'|trad}}</span>" +
    "		    			</div>" +
    "					  	" +
    "			    		<div class=\"controls\">" +
    "		      				<input type=\"text\" name=\"name\" ng-model=\"myRegisterForm.name\"" +
    "		      					ng-blur ng-focus" +
    "			      				placeholder=\"{{'label_name'|trad}}\" " +
    "			      				required " +
    "			      				ng-minlength=\"2\" " +
    "			      				ng-maxlength=\"50\"" +
    "			      				ng-pattern=\"/^[a-zA-ZÀ-ÿ0-9 -]+$/\"" +
    "			      				class=\"input-xlarge\"" +
    "			      			>" +
    "			      			" +
    "			      			<span class=\"clear\"></span>" +
    "					      	<span class=\"text-error\" ng-show=\"!nameshow && csValidate(formSent,registerForm.name.$error.pattern,registerForm.name.$pristine)\">{{'error_member_name_invalid'|trad}}</span>			    		" +
    "					      	<span class=\"text-error\" ng-show=\"!nameshow && csValidate(formSent,registerForm.name.$error.required,registerForm.name.$pristine)\">{{'error_member_name_missing'|trad}}</span>" +
    "				    		<span class=\"text-error\" ng-show=\"!nameshow && csValidate(formSent,registerForm.name.$error.minlength || registerForm.name.$error.maxlength,registerForm.name.$pristine)\">{{'error_member_name_size'|trad}}</span>" +
    "		    			</div>" +
    "					  	" +
    "			    		<div class=\"controls\">" +
    "		      				<input type=\"text\" name=\"lastName\" ng-model=\"myRegisterForm.lastName\" " +
    "								ng-blur ng-focus" +
    "			      				placeholder=\"{{'label_lastname'|trad}}\" " +
    "			      				required " +
    "			      				ng-minlength=\"2\" " +
    "			      				ng-maxlength=\"50\"" +
    "			      				ng-pattern=\"/^[a-zA-ZÀ-ÿ0-9 -]+$/\"" +
    "			      				class=\"input-xlarge\"" +
    "		      				>" +
    "			      			" +
    "			      			<span class=\"clear\"></span>" +
    "					      	<span class=\"text-error\" ng-show=\"!lastNameshow && csValidate(formSent,registerForm.lastName.$error.pattern,registerForm.lastName.$pristine)\">{{'error_member_lastname_invalid'|trad}}</span>" +
    "					      	<span class=\"text-error\" ng-show=\"!lastNameshow && csValidate(formSent,registerForm.lastName.$error.required,registerForm.lastName.$pristine)\">{{'error_member_lastname_missing'|trad}}</span>" +
    "				    		<span class=\"text-error\" ng-show=\"!lastNameshow && csValidate(formSent,registerForm.lastName.$error.minlength || registerForm.lastName.$error.maxlength,registerForm.lastName.$pristine)\">{{'error_member_name_size'|trad}}</span>" +
    "		    			</div>" +
    "					  	" +
    "						<div class=\"controls\">" +
    "				  			<input type=\"email\" name=\"email\" ng-model=\"myRegisterForm.email\" " +
    "				  				ng-blur ng-focus" +
    "				  				placeholder=\"{{'label_email'|trad}}\" " +
    "				  				required" +
    "				  				class=\"input-xlarge\"" +
    "				  			>" +
    "					  		" +
    "					  		<span class=\"clear\"></span>" +
    "					      	" +
    "					      	<span class=\"text-error\" ng-show=\"!emailshow && csValidate(formSent,registerForm.email.$error.required,registerForm.email.$pristine)\">{{'error_member_email_missing'|trad}}</span>" +
    "				    		<span class=\"text-error\" ng-show=\"!emailshow && csValidate(formSent,registerForm.email.$error.email,registerForm.email.$pristine)\">{{'error_member_email_invalid'|trad}}</span>" +
    "					  	</div>" +
    "	" +
    "						<div class=\"controls\">" +
    "					  		<input type=\"password\" name=\"password1\" ng-model=\"password1\" " +
    "					  			ng-blur ng-focus" +
    "					  			placeholder=\"{{'label_password'|trad}}\"" +
    "					  			required " +
    "					  			ng-minlength=\"6\"" +
    "					  			ng-maxlength=\"100\"" +
    "					  			class=\"input-xlarge\"" +
    "					  		>" +
    "					  		" +
    "					  		<span class=\"clear\"></span>" +
    "					  		      	" +
    "				    		<span class=\"text-error\" ng-show=\"!password1show && csValidate(formSent,registerForm.password1.$error.required,registerForm.password1.$pristine)\">{{'error_member_password_missing'|trad}}</span>" +
    "				    		<span class=\"text-error\" ng-show=\"!password1show && csValidate(formSent,registerForm.password1.$error.minlength || registerForm.password1.$error.maxlength,registerForm.password1.$pristine)\">{{'error_member_password_size'|trad}}</span>" +
    "					  	</div>" +
    "	" +
    "						<div class=\"controls\">" +
    "					  		<input type=\"password\" name=\"password2\" ng-model=\"password2\" " +
    "					  			ng-blur ng-focus" +
    "								password-validator2=\"password1\"" +
    "					  			placeholder=\"{{'label_password_confirmation'|trad}}\"" +
    "					  			class=\"input-xlarge\"" +
    "					  		>" +
    "					  		" +
    "					  		<span class=\"clear\"></span>" +
    "					  			      	" +
    "				    		<span class=\"text-error\" ng-show=\"!password2show && csValidate(formSent,registerForm.password2.$error.MATCH,registerForm.password2.$pristine)\">{{'error_member_passwords_differents'|trad}}</span>" +
    "						</div>" +
    "											" +
    "						<div class=\"controls margin-top\">" +
    "							<label class=\"checkbox\">				" +
    "								<input type=\"checkbox\" value=\"J'accepte les CGU'\" ng-model=\"acceptedCGU\">" +
    "								" +
    "								<p ng-bind-html-unsafe=\"'label_policies_acceptation'|trad\"></p>" +
    "							</label>				" +
    "						</div>" +
    "					</div>" +
    "					" +
    "					<div class=\"form-actions\">" +
    "						<loader data-active=\"!acceptedCGU\" data-sending=\"sending\" data-action=\"submit\" data-label=\"label_register\"></loader>					 " +
    "					</div>" +
    "				</form>" +
    "			</div>" +
    "		</div>" +
    "	</div>" +
    "</div>"
  );

  $templateCache.put("assets/dev/views/users/user.html",
    "<div id=\"profile\" class=\"block margin-top padding-bottom\" fade ng-init=\"init()\">" +
    "	<div class=\"row-fluid\">" +
    "    	<!-- Informations -->" +
    "    	<ng-include  src=\"Config.templatesPublicURL+'users/includes/infos.html'\"></ng-include>" +
    "    	" +
    "    	<div class=\"span9 margin-top padding-right\">" +
    "    		<!-- Menu -->" +
    "    		<ng-include  src=\"Config.templatesPublicURL+'users/includes/menu.html'\"></ng-include>" +
    "		    " +
    "		    <div ui-view></div>" +
    "	    </div>" +
    "	</div>		    " +
    "</div>"
  );

  $templateCache.put("assets/dev/views/users/userBoxConnected.html",
    "<inbox></inbox>" +
    "<notifications></notifications>	" +
    "" +
    "<div class=\"nav\" role=\"menu\">" +
    "	<div class=\"btn-group noSelection\">" +
    "		<a id=\"navbar-user\" class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" ng-click=\"hideAlert()\">" +
    "			{{user.name}} <b class=\"caret\"></b>" +
    "		</a>" +
    "		" +
    "		<ul class=\"dropdown-menu pull-right\">	" +
    "			<li ng-click=\"$emit('changePage','infos')\"><a href=\"#/users/{{user.id}}\">{{'label_my_profile'|trad}}</a></li>" +
    "			<li><a href=\"#/conversations/\">{{'label_my_conversations'|trad}}</a></li>" +
    "" +
    "			<li class=\"divider\"></li>" +
    "			" +
    "			<li><a href=\"#/payments/operations\">{{'label_my_operations'|trad}}</a></li>" +
    "			<li><a href=\"#/organizations\">{{'label_my_organizations'|trad}}</a></li>" +
    "			" +
    "			<li class=\"divider\"></li>" +
    "" +
    "			<li><a href=\"#/settings\">{{'label_settings'|trad}}</a></li>" +
    "			<li><a ng-click=\"logout()\" href=\"#/\">{{'label_logout'|trad}}</a></li>" +
    "		</ul>" +
    "	</div>" +
    "	  	" +
    "	<a tooltip data-placement=\"bottom\" title=\"{{'label_organize'|trad}}\" href=\"#/addEvent\" class=\"btn btn-success\"><i class=\"icon-plus\"></i></a>" +
    "</div>" +
    ""
  );

  $templateCache.put("assets/dev/views/users/userBoxDisconnected.html",
    "<a fade href=\"#/register\" class=\"btn btn-info\">{{\"label_register\" | trad}}</a>                    " +
    "<a fade href=\"#/login\" class=\"btn btn-success\">{{\"label_login\" | trad}}</a>"
  );

}]);
