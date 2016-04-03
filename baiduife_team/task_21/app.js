/**
 * 队列类, queueData为存放队列数值的数组
 * @constructor
 */
var MoniQueue = function () {
    this._initQueue();
};

MoniQueue.prototype = {
    /**
     * 初始化事件监听
     * @private
     */
    _initQueue: function () {
        this.addTagEvent();
        this.addAreaEvent();
    },
    /**
     * 处理输入
     * @returns {string}
     */
    processInput: function (id) {
        var source, input;
        if (id == 'tag-input') {                                // 处理input输入
            source = document.getElementById(id);
            input = source.value;
            if (/[,， ]/.test(input.slice(-1))) {
                input = input.slice(0, input.length - 1);
            } else {
                input = input.slice();
            }
            this.renderTag(input);
            source.value = '';
        } else if (id == undefined) {                           // 处理textarea输入
            source = document.getElementById('hobby-input');
            input = source.value;
            var arr = input.split(/[\r,，、\s]+/);
            this.renderArea(arr);
            source.value = '';
        }
    },
    renderTag: function (input) {
        var parent = document.querySelector('.tag-box');
        for (var i in parent.childNodes) {
            if (parent.childNodes[i].innerHTML === input) return;
        }

        if (parent.childNodes.length < 10) {
            var child = document.createElement('span');
            child.innerHTML = input;
            parent.appendChild(child);
        } else {
            parent.removeChild(parent.firstChild);
            var child = document.createElement('span');
            child.innerHTML = input;
            parent.appendChild(child);
        }
    },
    getTagInput: function (event) {
        event = event || window.event;
        var tagInput = document.getElementById('tag-input').value;
        var lastChar = tagInput.slice(-1);
        if (/[,， ]/.test(lastChar) || event.keyCode == 13) {
            this.processInput('tag-input');
        }
    },
    renderArea: function (arr) {
        var parent = document.querySelector('.hobby-box');
        var a = [];
        for (var i = 0, len = parent.childNodes.length; i < len; i += 1) {
            a.push(parent.childNodes[i].innerHTML);
        }
        for (var i = 0, len = arr.length; i < len; i += 1) {
            a.push(arr[i]);
        }
        var s = new Set(a);                                     // Set去重
        a = Array.from(s);
        var newLen = a.length;
        parent.innerHTML = "";
        if (newLen > 10) {
            for (var j = newLen - 10; j < newLen; j += 1) {
                if (a[j] !== "") {
                    var child = document.createElement('span');
                    child.innerHTML = a[j];
                    parent.appendChild(child);
                }
            }
        } else {
            a.forEach(function (v) {
                if (v !== "") {
                    var child = document.createElement('span');
                    child.innerHTML = v;
                    parent.appendChild(child);
                }
            })
        }
    },
    addTagEvent: function () {
        var parent = document.querySelector('.tag-box');
        var tagInput = document.getElementById('tag-input');
        var self = this;

        if (document.addEventListener) {
            tagInput.addEventListener('keyup', function (e) {
                self.getTagInput(e);
            });
        } else if (document.attachEvent) {
            tagInput.attachEvent("onkeyup", function (e) {
                self.getTagInput(e);
            });
        } else {
            tagInput.onkeyup = function (e) {
                self.getTagInput(e);
            };
        }

        /**
         * 添加悬停事件代理
         */
        parent.addEventListener('mouseover', function (e) {
            if (e.target && e.target.nodeName.toUpperCase() == "SPAN") {
                var text = e.target.innerHTML;
                text = '删除' + text;
                e.target.innerHTML = text;
                e.target.style.backgroundColor = 'red';
            }
        });
        /**
         * 添加离开事件代理
         */
        parent.addEventListener('mouseout', function (e) {
            if (e.target && e.target.nodeName.toUpperCase() == "SPAN") {
                e.target.innerHTML = e.target.innerHTML.slice(2);
                e.target.style.backgroundColor = '#8BE6FF';
            }
        });
        /**
         * 添加点击事件代理
         */
        parent.addEventListener('click', function (e) {
            if (e.target && e.target.nodeName.toUpperCase() == "SPAN") {
                e.target.parentNode.removeChild(e.target);
            }
        });

    },
    addAreaEvent: function () {
        var addBtn = document.getElementById('add');
        var self = this;
        addBtn.addEventListener('click', function () {
            self.processInput();
        })
    }
};


