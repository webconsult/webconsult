( function( window ) {
	var paper;
	paper = {

		options: {
			targetElement: $( '.paper-background' ),
			numberOfGradients: 2, //default value, actual value will be calculated
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
				moz: true,
				webkit: true,
				webkit_old: false,
				opera: true,
				IE: true,
				IE7: false
			}
		},

		/*
		 * Takes the colorstops and opacity defined above and joins it into proper rgba-format
		 */
		getColorStopsRgba: function( ) {

			var ColorStopsRgba = {};

			for ( var key in this.options.colorStops ) {
				ColorStopsRgba[ key ] = 'rgba(' + this.options.colorStops[ key ] + ', ' + this.options.opacity + ')';
			}
			return ColorStopsRgba;
		},

		/*
		 * Calculates number of gradient stops
		 */
		getNumberOfGradients: function( ) {

			if ( this.options.targetElement.height( ) >= this.options.gradientMinHeight ) {
				//Makes sure that gradients are not shorter than gradientMinHeight
				var num = Math.floor( this.options.targetElement.height( ) / this.options.gradientMinHeight );

				return num;
			} else {
				console.log( 'content is smaller than minimum gradient height' );
			}
		},

		/*
		 * Injects correct number of shadow elements into the DOM
		 */
		injectShadows: function( ) {

			//Injects the appropriate number of shadow elements
			for ( var i = 0; i < this.options.numberOfGradients; i++ ) {
				$( '#shadow-container' ).append( '<div class="round-shadow"></div>' );
			}

			this.setShadowContainerHeight( );
		},

		/*
		 * Sets the shadow container height to the height of the paper
		 */
		setShadowContainerHeight: function( ) {

			var t = this.options.targetElement;

			$( '#shadow-container' ).css( 'height', this.options.targetElement.height( ) + 'px' );

			var height = ( ( 1 / this.options.numberOfGradients ) * this.options.targetElement.height( ) ) -15; // -20 is the total margin

			height += 'px';
			$( '#shadow-container .round-shadow' ).css( 'height', height );
		},
		renderGradients: function( ) {

			if ( this.options.browserPrefixes.W3C ) {
				this.renderW3C( );
			}
			if ( this.options.browserPrefixes.webkit ) {
				this.renderWebkit( );
			}
			if ( this.options.browserPrefixes.moz ) {
				this.renderMoz( );
			}
			if ( this.options.browserPrefixes.opera ) {
				this.renderOpera( );
			}
			if ( this.options.browserPrefixes.IE ) {
				this.renderIE( );
			}


		},

		/*
		 * This one is good for IE, Opera and Firefox - just need to swap the prefix
		 */
		mainRender: function(prefix){
			var output = '';
			var cStop = this.getColorStopsRgba( );
			var range = this.calcRange( );
			var elementCount = 0;

			output += prefix;

			for ( var n = 0; n < this.options.numberOfGradients; n++ ) {
				output += cStop[ 'bright' ] + ' ' + ( range[ elementCount++ ] * 100 ) + '%,';
				output += cStop[ 'medium' ] + ' ' + ( range[ elementCount++ ] * 100 ) + '%,';
				output += cStop[ 'dark' ] + ' ' + ( range[ elementCount++ ] * 100 ) + '%,';
				output += cStop[ 'medium' ] + ' ' + ( range[ elementCount++ ] * 100 ) + '%';
				if ( n + 1 !== this.options.numberOfGradients ) {
					output += ',';
				} else {
					output += '),url("../img/paper_background.jpg")';
				}
			}

			//Writes the CSS class
			this.options.targetElement.css( {
				'background': output
			} );
		},

		/*
		 * Render webkit
		 */
		renderWebkit: function( ) {
			var output = '';
			var cStop = this.getColorStopsRgba( );
			var range = this.calcRange( );

			//BEFORE

			output += '-webkit-gradient(linear, 0% 0%, 0% 100%,';
			output += 'from(' + cStop.bright + '),\n';

			var elementCount = 0;

			for ( var n = 0; n < this.options.numberOfGradients; n++ ) {
				output += '\tcolor-stop(' + range[ ++elementCount ] + ', ' + cStop.medium + '),\n';
				output += '\tcolor-stop(' + range[ ++elementCount ] + ', ' + cStop.dark + '),\n';
				output += '\tcolor-stop(' + range[ ++elementCount ] + ', ' + cStop.medium + '),\n';
				if ( n + 1 !== this.options.numberOfGradients ) {
					output += '\tcolor-stop(' + range[ ++elementCount ] + ', ' + cStop.bright + '),\n';
				} else {
					output += 'to(' + cStop.bright + ')),';
				}
			}

			//AFTER

			output += "url('img/paper_background.jpg')";

			this.options.targetElement.css( {
				'background': output
			} );
		},

		renderW3C: function(){
			this.mainRender("linear-gradient(to bottom, ");
		},

		/*
		 * Render for Mozilla Firefox
		 */
		renderMoz: function( ) {
			this.mainRender("-moz-linear-gradient(top, ");
		},

		/*
		 * Render for Mozilla Firefox
		 */
		renderOpera: function( ) {
			//-moz-linear-gradient(top, #1e5799 0%, #2989d8 50%, #207cca 51%, #7db9e8 100%); /* FF3.6+ */
			this.mainRender("-o-linear-gradient(top, ");
		},

		/*
		 * Render for IE10+ ...the rest is hopeless! :(
		 */
		renderIE: function(){
			this.mainRender("-ie-linear-gradient(top, ");
		},


		/*
		 * Calculates the range of the colorstops
		 */
		calcRange: function( ) {
			// var initialRange = [0, 0.245, 0.25, 0.495, 0.50, 0.745, 0.75, 1];
			var initialRange = [ 0, 0.48, 0.50, 0.98 ];
			var outputRange = [ ];
			var numberOfGradients = this.getNumberOfGradients( );


			for ( var i = 0; i < numberOfGradients; i++ ) {
				for ( var n in initialRange ) {
					outputRange.push( ( initialRange[ n ] / numberOfGradients ) + ( i / numberOfGradients ) )
				}
			}
			return outputRange;
		}
	}
	window.paper = paper;
} )( window );

( function init( ) {
	paper.options.numberOfGradients = paper.getNumberOfGradients( );
	paper.renderGradients( );
	paper.injectShadows( );

	paper.options.targetElement.resize( function( ) {
		paper.setShadowContainerHeight( );
	} )
} )( )
