/*!
 * Custom scripts for JugaPlay
 */

 
/* -- TOP NAV VAR OVERLAP CONTENT -- */
function adjust_body_offset() {
    $('body').css('padding-top', $('.navbar-default').outerHeight(true) + 'px' );
}

$(window).resize(adjust_body_offset);

$(document).ready(adjust_body_offset);