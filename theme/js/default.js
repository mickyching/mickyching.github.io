
$("#table-of-contents").hide();       // default hide toc

// http://stackoverflow.com/questions/19291873/window-width-not-the-same-as-media-query
function is_laptop() {
  return window.matchMedia('(max-width: 1000px)').matches;
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
    $(".sidebar-toggler").css("left", "370px");
    $("body").css("margin-left", "400px");
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
      $(this).css('color', '#CC0000');
    }
}

function init_sidebar() {
    var toc = document.getElementById("text-table-of-contents");
    if (toc != null) {
        document.getElementById("sidebar-toc").innerHTML = toc.innerHTML;
        $("#sidebar-toc ul ul ul ul ul").hide();
    }
}

function init_all() {
    $('#table-of-contents').hide();
    $(".side-nav").each(css_hi_curlink);
    init_sidebar();
}

function preline_number() {
    var pre = document.getElementsByTagName('pre');
    for (var i = 0; i < pre.length; i++) {
        pre[i].innerHTML = '<span class="line-number"></span>' + pre[i].innerHTML + '<span class="cl"></span>';
        var num = pre[i].innerHTML.split(/\n/).length;
        for (var j = 0; j < num-1; j++) {
            var line_num = pre[i].getElementsByTagName('span')[0];
            line_num.innerHTML += '<span>' + (j + 1) + '</span>';
        }
    }
}

$(toggle_sidebar);
$(document).ready(init_all);
$(document).ready(preline_number);
$(document).ready(function() {
    $(window).scroll(function() {
        init_sidebar();
        $("#table-of-contents a").removeClass('toc-current');
        currentAnchor().addClass('toc-current');
    });
});

function tocItem(anchor) {
    return $("[href=\"" + anchor + "\"]");
}

function heading(anchor) {
    return $("[id=" + anchor.substr(1) + "]");
}

var _anchors = null;
function anchors() {
    if (!_anchors) {
        _anchors = $("#table-of-contents a").map(function() {
            return $(this).attr("href");
        });
    }
    return _anchors;
}

function currentAnchor() {
    var winY = window.pageYOffset;
    var currAnchor = null;
    anchors().each(function() {
        var y = heading(this).position().top;
        if (y < winY + window.innerHeight * 0.3) {
            currAnchor = this;
            return;
        }
    });
    return tocItem(currAnchor);
}

document.onkeydown=function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey && e.keyCode == 84) {
        $("#table-of-contents").toggle();
    }
}
