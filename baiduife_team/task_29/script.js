(function() {
    var inputEl = document.getElementsByTagName('input')[0],
        subBtn = document.getElementsByTagName('button')[0],
        spanEl = document.getElementsByTagName('span')[0];

    function addEventHandler(element, type, callback) {
        if (element.addEventListener) {
            element.addEventListener(type, callback, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, callback);
        } else {
            element['on' + type] = callback;
        }
    }

    function validation() {
        event.preventDefault();
        var inputText = inputEl.value.trim(),
            finalText = inputText.replace(/[^x00-xff]/g, "aa");

        if (!finalText) {
            inputEl.style.borderColor = 'red';
            spanEl.style.color = 'red';
            spanEl.innerHTML = '姓名不能为空';
        } else if (finalText.length < 4 || finalText.length > 16) {
            inputEl.style.borderColor = 'red';
            spanEl.style.color = 'red';
            spanEl.innerHTML = '长度为4~16个字符';
        } else {
            inputEl.style.borderColor = 'green';
            spanEl.style.color = 'green';
            spanEl.innerHTML = '姓名格式正确';
        }
    }

    addEventHandler(subBtn, 'click', validation);
})();
