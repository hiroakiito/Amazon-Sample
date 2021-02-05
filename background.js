// 自動入力する項目と値を設定   
const asinCode = "B01AFS9Q38/";                    //(任意)ASIN(Amazon商品ページのコード)  
const params = { command: 'inputAddress',          //※処理に使う値の為固定
                 countryCode: "JP",                //(任意)国/地域 ※日本の場合固定
                 userName: "甘存 太郎",             //(必須)氏名 
                 postalCodeTop: "153",             //(必須)郵便番号上3桁
                 postalCodeUnder: "0064",          //(必須)郵便番号下4桁
                 region: "東京都",                 //(必須)都道府県
                 addrress1: "目黒区下目黒",         //(必須)住所1
                 addrress2: "1丁目8番1号",          //(任意)住所2
                 addrress3: "Amazon.co.jp",        //(任意)会社名
                 tell: "01234567890" };            //(必須)電話番号

// 拡張機能アイコンクリック時に新規タブでAmazonサイトを開く初期処理
chrome.browserAction.onClicked.addListener(function(activeTab){
    var newURL = "https://www.amazon.co.jp/gp/product/" + asinCode;
    chrome.tabs.create({ selected: true, url: newURL });
});

// 右クリックメニューの定義
chrome.runtime.onInstalled.addListener(function(){
    chrome.contextMenus.create({
        id: "autoInput",
        title: "Amazon住所自動入力",
        contexts: ["all"],
        type: "normal",
    })
})
//右クリックメニューから「Amazon住所自動入力」がクリックされた時のコード
chrome.contextMenus.onClicked.addListener(function(event) {
    if(event.menuItemId === "autoInput"){
        chrome.tabs.query({ active: true, lastFocusedWindow:true }, tabs => {
            if (tabs[0].url.match("https://www.amazon.co.jp/*")!==null){
                chrome.tabs.sendMessage(tabs[0].id, params);
            }
        });
    }
})
