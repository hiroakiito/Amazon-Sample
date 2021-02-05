chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command=='inputAddress') {
        // 国/地域自動選択
        changeList(0, "address-ui-widgets-countryCode-dropdown-nativeId", request.countryCode);
        // 都道府県自動選択
        changeList(1, "address-ui-widgets-enterAddressStateOrRegion-dropdown-nativeId", request.region);
        // テキストボックスへの自動入力
        document.getElementById("address-ui-widgets-enterAddressFullName").value = request.userName;
        document.getElementById("address-ui-widgets-enterAddressPostalCodeOne").value = request.postalCodeTop;
        document.getElementById("address-ui-widgets-enterAddressPostalCodeTwo").value = request.postalCodeUnder;
        document.getElementById("address-ui-widgets-enterAddressLine1").value = request.addrress1;
        document.getElementById("address-ui-widgets-enterAddressLine2").value = request.addrress2;
        document.getElementById("address-ui-widgets-enterAddressLine3").value = request.addrress3;
        document.getElementById("address-ui-widgets-enterAddressPhoneNumber").value = request.tell;
    }
});

// プルダウンリスト選択値変更の関数
function changeList(listNo, selectId, optionName) {
    if (optionName === null){
        // 指定された値がない場合、プルダウンの変更は行わず処理終了
        return;
    }
    pullDownList = document.getElementById(selectId);
    pulldown_option = pullDownList.getElementsByTagName('option');
    for(i=0; i<pulldown_option.length;i++){
        if(pulldown_option[i].value == optionName){
            // プルダウンの選択内容を変更
            pulldown_option[i].selected = true;
            // 選択内容を変えても画面表示の国、県名は変わらないため選択されているoption要素のテキストを表示させる
            selectedItem = document.getElementsByClassName("a-dropdown-prompt");
            selectedItem[listNo].textContent = pulldown_option[i].textContent
            break;
        }
    }
}