( function init () {
    var element = $('.paper-background');

    console.log(element.height());

    // $('.paper-background.container:before').css('min-height','6000px');

    //List of browsers to provide vendor-prefixed gradients for
    var browserList = ["W3C",'webkit_new','webkit_old',"moz",'opera','IE'];

    //Creates the gradients for each browser
    for (var i in browserList){
        element.css(createGradients(element,browserList[i])); 
    }
})();