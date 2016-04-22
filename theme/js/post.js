function h_toggle() {
  $("#table-of-contents").hide();       // default hide toc
  $("h2").click(function() {$(this).parent().children().not("h2").toggle();});
  $("h3").click(function() {$(this).parent().children().not("h3").toggle();});
  $("h4").click(function() {$(this).parent().children().not("h4").toggle();});
  $("h5").click(function() {$(this).parent().children().not("h5").toggle();});
  $("h6").click(function() {$(this).parent().children().not("h6").toggle();});
}

this.hide = 0;
document.onkeydown=function(event) {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if (e && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey &&
      e.keyCode == 70) {                // f: fold/unfold content
    if (!this.hide) {
      this.hide = 1;
      $("h2").parent().children().not("h2").hide();
    }
    else {
      this.hide = 0;
      $("h2").parent().children().not("h2").show();
    }
  }
  else if (e && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey &&
           e.keyCode == 84) {           // t: toggle toc
    $("#table-of-contents").toggle();
  }
}

$(h_toggle)
