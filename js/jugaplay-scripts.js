// Player select checkmark | Toggle Buton
$( ".btn-player-select" ).click(function() {
  $( this ).toggleClass( "selected" );
});



// Remove selected filter
$( ".filter-item" ).click(function() {
  $( this ).remove();
});



// Adds margin-top dynamically to players list
/*$(document).ready(function() {
	$(".players-list").css("margin-top", $(".players-top-container").height() + "px");
}); 

$(window).resize(function() {
	$(".players-list").css("margin-top", $(".players-top-container").height() + "px");       
});*/



// Select Filters | Toggle Buton
$( ".list-style1 a" ).click(function() {
  $( this ).toggleClass( "selected" );
});


