var fileName = "/a.mkv"
var progress = document.getElementById("progress");
var progressText = document.getElementById("progress-text");

var downloadProgressText = document.getElementById("download-progress-text");
const btn = document.getElementById("download-button");

function startBtnLoader() {
  btn.classList.add("button--loading");
}
function endBtnLoader() {
  btn.classList.remove("button--loading");
}

function download() {
    startBtnLoader();
    var startTime = new Date().getTime();
    //// previous code in download button click listener
    request = new XMLHttpRequest();
    request.responseType = 'blob';
    request.open('get', fileName, true);
    request.send();
    request.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var obj = window.URL.createObjectURL(this.response);
            document.getElementById('save-file').setAttribute('href', obj);

            document.getElementById('save-file').setAttribute('download', fileName);
            setTimeout(function() {
                window.URL.revokeObjectURL(obj);
            }, 60 * 1000);
        }
    };
    request.onprogress = function(e) {
        progress.ariaValueMax = e.total;
        progress.value = e.loaded;

        var percent_complete = (e.loaded / e.total) * 100;
        percent_complete = Math.floor(percent_complete);

        var duration = ( new Date().getTime() - startTime ) / 1000;
        var bps = e.loaded / duration;
        var kbps = bps / 1024;
        kbps = Math.floor(kbps);

        var time = (e.total - e.loaded) / bps;
        var seconds = time % 60;
        var minutes = time / 60;

        seconds = Math.floor(seconds);
        minutes = Math.floor(minutes);

        progress.setAttribute("aria-valuemax", e.total);
        progress.setAttribute("aria-valuenow", e.loaded);
        progress.style.width = percent_complete + "%";
        progress.innerHTML = percent_complete + "%";

        downloadProgressText.innerHTML = kbps + " KB / s" + "<br>" + minutes + " min " + seconds + " sec remaining";

    };
};