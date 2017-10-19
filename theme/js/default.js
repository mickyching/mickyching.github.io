
$("#table-of-contents").hide();       // default hide toc

// http://stackoverflow.com/questions/19291873/window-width-not-the-same-as-media-query
function is_laptop() {
  return window.matchMedia('(max-width: 1200px)').matches;
}

function hide_sidebar() {
  if (is_laptop()) {
    // skip
  }
  else {
    $(".sidebar").hide();
    $(".sidebar-toggler").css("left", "0");
    $("body").css("margin-left", "20px");
  }

  localStorage.sidebar_hidden = 1;
}

function show_sidebar() {
  $(".sidebar").show();
  if (is_laptop()) {
    $(".sidebar-toggler").css("left", "0px");
    $("body").css("margin-left", "0px");
  }
  else {
    $(".sidebar-toggler").css("left", "320px");
    $("body").css("margin-left", "350px");
  }

  localStorage.sidebar_hidden = 0;
}

var last_width = $(window).width();
function resize_func() {
  if ($(window).width() != last_width)
    show_sidebar();
  last_width = $(window).width();
}

function do_toggle_sidebar() {
  if (localStorage.sidebar_hidden != 1)
    hide_sidebar();
  else
    show_sidebar();
}

function toggle_sidebar() {
  var hidden = localStorage.sidebar_hidden;
  if (hidden != 1)
    show_sidebar();
  else
    hide_sidebar();
  $(".sidebar-toggler").click(do_toggle_sidebar);
  window.onresize=resize_func;
}

function css_hi_curlink() {
    if (this.href == window.location.href) {
      $(this).css('background-color', '#EECC55');
    }
}

function init_document() {
  $(".side-nav").each(css_hi_curlink);

    var toc = document.getElementById("text-table-of-contents");
    if (toc != null) {
        document.getElementById("sidebar-toc").innerHTML = toc.innerHTML;
        $("#sidebar-toc ul ul ul ul").hide();
    }
}

$(toggle_sidebar);
$(document).ready(init_document);
