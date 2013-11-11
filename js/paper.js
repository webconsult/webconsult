/**
*	Creates the height of the paper based on the content-element in 400px increments
**/
function createPaper(){
	//TODO
}

/**
*	Creates the appropriate amount of shadow elements based on the height of the paper
**/
function createShadows(){
	//TODO
}



/**
*	Takes an element as parameter, gets the height of the element, 
*	divides it into an appropriate number of gradient segments and
*	finally adds the generated gradient as a background.
**/
function createGradients(element, browser) {

	var output;
	var elementHeight = element.height();
	var gradientMinHeight = 300;
	var numberOfGradients = 1;

	//Calculate number of gradient stops
	if (elementHeight >= gradientMinHeight) {
		numberOfGradients = Math.floor(elementHeight / gradientMinHeight);
	}

	var colorSequence = ["#ffffff","#f7f7f7",
							"#e3e3e3","#f7f7f7",
							"#ffffff","#f7f7f7",
							"#e3e3e3","#f7f7f7"];

	//Generate color-stop array
	var colorStops = generateColorStops(numberOfGradients);

	switch (browser) {
		case 'W3C':
			output = generateW3C();
			break;
		case 'moz':
			output = generateMoz();
			break;
		case 'webkit_new':
			output = generateWebkitNew();
			break;
		case 'webkit_old':
			output = generateWebkitOld();
			break;
		case 'opera':
			output = generateOpera();
			break;
		case 'IE':
			output = generateIE();
			break;
		case 'IE7':
			output = generateIE7();
			break;
		default:
			console.log("wrong browser prefix assigned");
	}

	return output;

	function generateIE(){
		// IE
		var IE = "-ms-linear-gradient(top,";

		//Generates the appropriate color-stops
		for (var i=0;i<colorStops.length;i++){
			IE += colorSequence[i%colorSequence.length] + " "+ colorStops[i] + "%";
			if (i != colorStops.length -1){
				IE += ", ";
			}
		}
		IE += ")"
		return {background: IE};
	}

	function generateIE7(){
		// IE
		var IE = "progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#f7f7f7',GradientType=0 )";
		return {filter: IE};
	}

	function generateOpera(){
		// Opera
		var opera = "-o-linear-gradient(top,";

		//Generates the appropriate color-stops
		for (var i=0;i<colorStops.length;i++){
			opera += colorSequence[i%colorSequence.length] + " "+ colorStops[i] + "%";
			if (i != colorStops.length -1){
				opera += ", ";
			}
		}
		opera += ")"
		return {background: opera};
	}

	function generateWebkitOld(){
		// Chrome,Safari4+
		var webkit_old = "-webkit-gradient(linear, left top, left bottom, ";

		//Generates the appropriate color-stops
		for (var i=0;i<colorStops.length;i++){
			webkit_old += "color-stop(" + colorStops[i] + "%, " + colorSequence[i] + ")";
			if (i != colorStops.length -1){
				webkit_old += ", ";
			}
		}
		webkit_old += ")"
		return {background: webkit_old};
	}

	function generateWebkitNew(){
		// Chrome10+,Safari5.1+
		var webkit_new = "-webkit-linear-gradient(top,";

		for (var i=0;i<colorStops.length;i++){
			webkit_new += colorSequence[i%colorSequence.length] + " "+ colorStops[i] + "%";
			if (i != colorStops.length -1){
				webkit_new += ",";
			}
		}
		webkit_new += ")";
		return {background: webkit_new};
	}

	function generateW3C() {

		var W3C = "linear-gradient(to bottom,";

		for (var i=0;i<colorStops.length;i++){
			W3C += colorSequence[i%colorSequence.length] + " "+ colorStops[i] + "%";
			if (i != colorStops.length -1){
				W3C += ",";
			}
		}
		W3C += ")"
		return {background: W3C};

	}
	function generateMoz(){

		//value element of key/value pair
		var moz = "-moz-linear-gradient(top,";

		for (var i=0;i<colorStops.length;i++){
			moz += colorSequence[i%colorSequence.length] + " "+ colorStops[i] + "%";
			if (i != colorStops.length -1){
				moz += ",";
			}
		}
		moz += ")";
		//key: background
		return {background: moz};
	}
}

function generateColorStops(sections){
	//Sets initial bounds for colorStop
	var lowerBound = 0;
	var upperBound = 100;
	var colorStops = [];

	//Figures out the range of the colorstop
	var intervalRange = 100/sections;

	//Iterates for as many times as 100 can be divided by the range...
	for (var n=0;n<(100/intervalRange);n++){

		//Stores the lowerBound as the first colorstop value
		colorStops.push(lowerBound);

		//Calculates the upper bound of the interval			
		upperBound = lowerBound+intervalRange;

		//Since the lower bound of the next interval will be the upperBoundof the current...
		lowerBound = upperBound;

		//Adjusts the upperbound so it do not collide with the lower bound of the next interval
		if (upperBound != 100){
			upperBound += -0.1;
		}

		//Stores the upper bound colorstop value
		colorStops.push(upperBound);
	}
	return colorStops;
}

function matchElementDimensions(sourceElement, destinationElement) {
	destinationElement.css('height',sourceElement.height);
	destinationElement.css('width',sourceElement.width);
}


