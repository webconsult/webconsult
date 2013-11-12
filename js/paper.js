(function (window) {
	var paper;
	paper = {

		options: {
			targetElement: $('.paper-background'), 
			numberOfGradients : 2, //default value, actual value will be calculated
			gradientMinHeight: 400, //px
			textureUrl: "url('img/paper_background.jpg')",
			opacity: 0.75,
			colorStops: {
				bright: "255, 255, 255",
				medium: "247, 247, 247",
				dark: "227, 227, 227"
			},
			browserPrefixes: {
				W3C: true,
				moz: false,
				webkit_new: false,
				webkit_old: false,
				opera: false,
				IE: false,
				IE7: false
			}
		},

		hello: function(){
			alert('hello');
		},

		/*
		 * Takes the colorstops and opacity defined above and joins it into proper rgba-format
		 */
		getColorStopsRgba: function() {

			var ColorStopsRgba = {};

			for (var key in this.options.colorStops){
				ColorStopsRgba[key] = 'rgba(' + this.options.colorStops[key] + ', ' + this.options.opacity + ')';
			}
			return ColorStopsRgba;
		},

		/*
		 * Calculates number of gradient stops
		 */
		getNumberOfGradients: function() {

			if (this.options.targetElement.height() >= this.options.gradientMinHeight) {
				//Makes sure that gradients are not shorter than gradientMinHeight
				var num = Math.floor(this.options.targetElement.height() / this.options.gradientMinHeight);

				return num;
			} else {
				//TODO: there is a bug so it always ends up in this clause
				debugger;
				console.log('content is smaller than minimum gradient height');
			}
		},

		/*
		 * Injects correct number of shadow elements into the DOM
		 */
		 injectShadows: function() {

		 	//Injects the appropriate number of shadow elements
		 	for (var i=0; i < this.options.numberOfGradients; i++) {
		 		$('#shadow-container').append('<div class="round-shadow"></div>');
		 	}

		 	this.setShadowContainerHeight();
		 },

		 /*
		  * Sets the shadow container height to the height of the paper
		  */
		 setShadowContainerHeight: function() {
		 	$('#shadow-container').css('height',this.options.targetElement.height()+'px');

		 	var height = ((1 / this.options.numberOfGradients) * this.options.targetElement.height()) -20; // -20 is the total margin

		 	height += 'px';
		 	$('#shadow-container .round-shadow').css('height',height);
		 },
		 /*
		  * Render gradients
		  */
		  renderGradients: function(){
		  	var output = '';
		  	var cStop = this.getColorStopsRgba();
		  	var range = this.calcRange();

		  	//webkit_new
		  	
		  	//BEFORE

		  	output += '-webkit-gradient(linear, 0% 0%, 0% 100%,';
		  	output += 'from(' + cStop['bright'] + '),\n';

		  	var elementCount = 0;

		  	for (var n=0; n < this.options.numberOfGradients; n++) {
	  			output += '\tcolor-stop(' + range[1 + elementCount] + ', ' + cStop['medium'] + '),\n';
			  	output += '\tcolor-stop(' + range[2 + elementCount] + ', ' + cStop['dark'] + '),\n';
			  	output += '\tcolor-stop(' + range[3 + elementCount] + ', ' + cStop['medium'] + '),\n';
			if (n+1 !== this.options.numberOfGradients) {
			  	output += '\tcolor-stop(' + range[4 + elementCount] + ', ' + cStop['bright'] + '),\n';
		  	} else {
		  		output += 'to(' + cStop['bright'] + ')),';
		  	}

			  	elementCount += 4;
		  	}
		  	

		  	//AFTER
		  	
 			output += "url('img/paper_background.jpg')";

		  	this.options.targetElement.css({'background': output});


// background: 
// 	-webkit-gradient(linear, 0% 0%, 0% 100%,
// 		from(rgba(255, 255, 255, 0.7)),
// 			color-stop(0.332333, rgba(247, 247, 247, 0.7)),
// 			color-stop(0.333333, rgba(227, 227, 227, 0.7)),
// 			color-stop(0.665667, rgba(247, 247, 247, 0.7)),
// 			color-stop(0.666667, rgba(255, 255, 255, 0.7)),
// 		to(rgba(247, 247, 247, 0.7))),
// 	url('../img/paper_background.jpg');
		  },

		  /*
		   * Calculates the range of the colorstops
		   */
		   calcRange: function(){
		   	
		   	// var initialRange = [0, 0.245, 0.25, 0.495, 0.50, 0.745, 0.75, 1];
		   	var initialRange = [0, 0.48, 0.50, 0.98];
		   	var outputRange = [];
		   	var numberOfGradients = this.getNumberOfGradients();


		   	for (var i=0; i < numberOfGradients; i++){
		   		for (var n in initialRange) {
		   			outputRange.push(( initialRange[n] / numberOfGradients ) + (i/numberOfGradients))
		   		}
		   	}
		   	return outputRange;
		   }
	}
	window.paper = paper;
})(window);

(function init() {
	paper.options.numberOfGradients = paper.getNumberOfGradients();
	paper.renderGradients();
	paper.injectShadows();

	paper.options.targetElement.resize(function(){
		paper.setShadowContainerHeight();
	})
})()