/**
 * 队列类, queueData为存放队列数值的数组
 * @constructor
 */
var MoniQueue = function() {
    this.queueData = [];
    this._initQueue();
};

MoniQueue.prototype = {
    /**
     * 初始化
     * @private
     */
    _initQueue: function() {
        this.addEvent();
    },
    /**
     * 队列重绘
     */
    //renderQueue: function() {
    //    var parent = document.querySelector('ul');
    //    var list = document.querySelectorAll('.queue li');
    //    for (var i = 0, len = list.length; i < len; i += 1) {
    //        parent.removeChild(list[i]);
    //    }
    //
    //    for (i = 0, len = this.queueData.length; i < len; i += 1) {
    //        var child = document.createElement('li');
    //        child.innerHTML = this.queueData[i];
    //        parent.appendChild(child);
    //    }
    //
    //},
    /**
     * 处理输入
     * @returns {string}
     */
    processInput: function() {
        var inp = document.getElementById('content').value.trim();
        var arr = inp.split(/[\r,，、\s]+/);
        var reg = new RegExp('^\\d*\\d$|^[A-Za-z]*[A-Za-z]$|^[\u4E00-\u9FFF]*[\u4E00-\u9FFF]$');

        for (var i = 0, len = arr.length; i < len; i += 1) {
            if (!reg.test(arr[i])) {
                alert('请输入数字, 中文或者英文!');
                return;
            }
        }
        return arr;
    },
    pushLeft: function() {
        var arr = this.processInput();
        var parent = document.querySelector('.queue');
        if (arr) {
            for (var i = 0, len = arr.length; i < len; i += 1) {
                var c = document.createElement('li');
                c.innerHTML = arr[i];
                parent.insertBefore(c, parent.firstChild);
            }
        }
    },
    popLeft: function() {
        var parent = document.querySelector('.queue');
        var firstChild = parent.firstChild;
        parent.removeChild(firstChild);
        alert('删除数值 : ' + firstChild.innerHTML);
    },
    pushRight: function() {
        var arr = this.processInput();
        var parent = document.querySelector('.queue');
        if (arr) {
            for (var i = 0, len = arr.length; i < len; i += 1) {
                var c = document.createElement('li');
                c.innerHTML = arr[i];
                parent.appendChild(c);
            }
        }
    },
    popRight: function() {
        var parent = document.querySelector('.queue');
        var lastChild = parent.lastChild;
        parent.removeChild(lastChild);
        alert('删除数值 : ' + lastChild.innerHTML);
    },
    addEvent: function() {
        var pushLeftBtn = document.getElementById('push-left');
        var pushRightBtn = document.getElementById('push-right');
        var popLeftBtn = document.getElementById('pop-left');
        var popRightBtn = document.getElementById('pop-right');
        var searchBtn = document.getElementById('search');
        var parent = document.querySelector('.queue');
        var self = this;

        pushLeftBtn.addEventListener('click', function() {
            self.pushLeft();
        });

        pushRightBtn.addEventListener('click', function() {
            self.pushRight();
        });

        popLeftBtn.addEventListener('click', function() {
            self.popLeft();
        });

        popRightBtn.addEventListener('click', function() {
            self.popRight();
        });

        /**
         * 添加事件代理
         */
        parent.addEventListener('click', function(e) {
            if (e.target && e.target.nodeName.toUpperCase() == "LI") {
                //var index = Array.from(this.querySelectorAll('li')).indexOf(e.target);
                //self.queueData.splice(index, 1);
                var parent = document.querySelector('.queue');
                parent.removeChild(e.target);
                alert('删除数值 : ' + e.target.innerHTML);
            }
        });

        /**
         * 查询事件
         */
        searchBtn.addEventListener('click', function() {
            var searchContent = document.getElementById('search-input').value.trim();
            var allContent = document.querySelectorAll('.queue li');

            for (var i = 0, len = allContent.length; i < len; i += 1) {
                allContent[i].className = "";
            };

            for (var i = 0, len = allContent.length; i < len; i += 1) {
                if (allContent[i].innerHTML.indexOf(searchContent) !== -1) {
                    allContent[i].style.backgroundColor = '#4DC8FF';
                }
            }
        });
    }
}
