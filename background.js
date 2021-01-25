// 拡張機能アイコンクリック時にAmazonサイトを開く初期処理
chrome.browserAction.onClicked.addListener(function(activeTab){
    // ↓今はAmazonのトップページを開くだけになっているが、キーワードを渡して商品を検索した状態のページを直接開くことも可能
    // var keyword = "鬼滅の刃"
    // var newURL = "https://www.amazon.co.jp/s/?field-keywords=" + keyword;
    var newURL = "https://www.amazon.co.jp/"
    chrome.tabs.create({ selected: true,
                         url: newURL 
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    // 読み込み時（loading）と読み込み完了時（complete）の内、
    // 読み込み完了時のみ実行する。
    if (info.status==='complete') {
        // アクティブタブがAmazonのURLならContent.jsの処理を実行する。
        if (tab.url.match("https://www.amazon.co.jp/*")!==null){
            chrome.tabs.sendMessage(tabId, {command: 'update'});
        }
    }
});