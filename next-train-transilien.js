/* global Module */

/* Magic Mirror
 * Module: next-train-transilien
 *
 * By 
 * MIT Licensed.
 */

Module.register("next-train-transilien", {

	defaults: {
		updateInterval: 30000,
		retryDelay: 5000,
		title: "prochains départs",
		defaultURL:
		  "https://www.horaires-de-trains.fr/prochains-departs-Stade_de_France_Saint_Denis-Chatelet_Les_Halles.html",
		libDepart: "Stade de France Saint-Denis",
		libDirection: "Châtelet les Halles"
	  },

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;
		var dataRequest = null;
		var dataNotification = null;

		//Flag for check if module is loaded
		this.loaded = false;

		// Schedule update timer.
		this.processData();
		setInterval(function() {
			self.processData();
		}, this.config.updateInterval);
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		if (this.dataRequest) {
			var titleDiv = document.createElement("header");
			titleDiv.innerHTML = this.dataRequest.title;

			var libDepartDiv = document.createElement("div");
			libDepartDiv.classList.add("libDepart");
			libDepartDiv.innerHTML = 'de '+this.dataRequest.libDepart;
			var libDirectionDiv = document.createElement("div");
			libDirectionDiv.classList.add("libDirection");
			libDirectionDiv.innerHTML = 'vers '+this.dataRequest.libDirection
			//libDepartDiv.classList.add("header");



			wrapper.appendChild(titleDiv);
			wrapper.appendChild(libDepartDiv);
			wrapper.appendChild(libDirectionDiv);
		}

		// Data from helper
		if (this.dataNotification) {
			this.dataNotification.forEach((element,nb) => {
				
			var lineHour = document.createElement("div");
			lineHour.classList.add("lineHour");
			lineHour.innerHTML =  "<img src='"+element.icon+"' height = 18> "+element.heure;

			var mission = document.createElement("span");
			mission.classList.add("mission");
			mission.innerHTML = " - "+ element.mission;

			lineHour.appendChild(mission)
			wrapper.appendChild(lineHour);
			});
			
		}
		return wrapper;
	},

	getScripts: function() {
		return [];
	},

	getStyles: function () {
		return [
			"next-train-transilien.css",
		];
	},


	processData: function() {
		var self = this;
		const {title, defaultURL, libDepart, libDirection} = this.config
		this.dataRequest = {title, defaultURL, libDepart, libDirection}
		if (this.loaded === false) { self.updateDom(self.config.animationSpeed) ; }
		this.loaded = true;
		this.sendSocketNotification("next-train-transilien-NOTIFICATION_TEST", {defaultURL});
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if(notification === "next-train-transilien-NOTIFICATION_TEST") {
			this.dataNotification = payload;
			this.updateDom();
		}
	},
});
