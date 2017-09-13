function h_toggle() {
  $("#table-of-contents").hide();       // default hide toc
  $("h2").click(function() {$(this).parent().children().not("h2").toggle();});
  $("h3").click(function() {$(this).parent().children().not("h3").toggle();});
  $("h4").click(function() {$(this).parent().children().not("h4").toggle();});
  $("h5").click(function() {$(this).parent().children().not("h5").toggle();});
  $("h6").click(function() {$(this).parent().children().not("h6").toggle();});
}
this.key_fold = 70;                          // f: hide/show content
this.key_toc  = 84;                          // t: hide/show table-of-content
this.hide_level = 0;
document.onkeydown=function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey && e.keyCode == key_fold) {
        if (hide_level < 2) {
            hide_level = 2;
            $("h2").parent().children().not("h2").hide();
        } else if (hide_level < 3) {
            hide_level = 3;
            $("h2").parent().children().not("h2").show();
            $("h3").parent().children().not("h3").hide();
        } else {
            hide_level = 0;
            $("h2").parent().children().not("h2").show();
            $("h3").parent().children().not("h3").show();
        }
    }
    else if (e && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey && e.keyCode == key_toc) {
        $("#table-of-contents").toggle();
    }
}
$(h_toggle)
