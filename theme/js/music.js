var audioName = [];
var audioList = [];

var audioMode = "随机";
var audioState = "播放";
var audioIndex = 0;
var audioTitle;
var audioKeys = "＜MPNB0＞";
var player = document.createElement("audio");

function audioInfo() {
    return audioKeys + audioMode + audioState + " " + (audioIndex+1).toString() + " " + audioName[audioIndex];
}

function audioPlay() {
    audioTitle.innerHTML = audioInfo();
    player.src = audioList[audioIndex];
    player.play();
}

function audioPause() {
    player.pause();
}

function audioStart() {
    player.onended = function() {
        if (audioMode == "随机") {
            audioIndex = Math.floor((Math.random()*audioList.length));
        } else {
            audioIndex++;
        }
        if (audioIndex >= audioList.length) {
            audioIndex = 0;
        }
        audioPlay();
    };
    if (audioMode == "随机") {
        audioIndex = Math.floor((Math.random()*audioList.length));
    }
    audioPlay();
}

function audioInit() {
    audioTitle = document.getElementById("orgheadline1");

    var list = document.getElementById("text-orgheadline1");
    var ols = list.childNodes;
    for (var i = 0; i < ols.length; i++) {
        var lis = ols.item(i).childNodes;
        for (var j = 0; j < lis.length; j++) {
            var li = lis.item(j).childNodes;
            if (li.length != 1) {
                continue;
            }
            var name = lis.item(j).innerHTML;
            var url = li.item(0);
            audioName.push(name);
            audioList.push(url);
        }
    }
    audioStart();
}
$(document).ready(audioInit);

this.key_0 = 48;
this.key_next = 78;
this.key_back = 66;
this.key_pause = 80;
this.key_mode = 77;
document.onkeydown=function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey && e.keyCode == key_next) {
        if (audioMode == "随机") {
            audioIndex = Math.floor((Math.random()*audioList.length));
        } else {
            audioIndex++;
        }
        if (audioIndex > audioList.length - 1) {
            audioIndex = 0;
        }
        audioPlay();
    }
    else if (e && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey && e.keyCode == key_back) {
        if (audioMode == "随机") {
            audioIndex = Math.floor((Math.random()*audioList.length));
        } else {
            audioIndex--;
        }
        if (audioIndex < 0) {
            audioIndex = audioList.length - 1;
        }
        audioPlay();
    }
    else if (e && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey && e.keyCode == key_0) {
        audioIndex = 0;
        audioPlay();
    }
    else if (e && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey && e.keyCode == key_pause) {
        if (audioState == "暂停") {
            audioState = "播放";
            audioPlay();
        } else {
            audioState = "暂停";
            audioPause();
        }
    }
    else if (e && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey && e.keyCode == key_mode) {
        if (audioMode == "顺序") {
            audioMode = "随机";
            audioTitle.innerHTML = audioInfo();
        } else {
            audioMode = "顺序";
            audioTitle.innerHTML = audioInfo();
        }
    }
}
