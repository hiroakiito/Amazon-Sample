chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command=='update') {
        // 初期化処理
        var saerch_form = document.getElementById("twotabsearchtextbox");
        saerch_form.value = "鬼滅の刃"
    }
});
