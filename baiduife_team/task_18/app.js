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
     * 初始化, 读取现有队列到queueData中
     * @private
     */
    _initQueue: function() {
        var list = document.querySelectorAll('.queue li');
        for (var i = 0, len = list.length; i < len; i += 1) {
            this.queueData.push(list[i].textContent);
        }
        this.addEvent();
    },
    /**
     * 队列重绘
     */
    renderQueue: function() {
        var parent = document.querySelector('ul');
        var list = document.querySelectorAll('.queue li');
        for (var i = 0, len = list.length; i < len; i += 1) {
            parent.removeChild(list[i]);
        }

        for (i = 0, len = this.queueData.length; i < len; i += 1) {
            var child = document.createElement('li');
            child.innerHTML = this.queueData[i];
            parent.appendChild(child);
        }

    },
    /**
     * 处理输入
     * @returns {string}
     */
    processInput: function() {
        var inp = document.getElementById('num').value.trim();
        var reg = new RegExp('^-?\\d+$');
        if (!reg.test(inp)) {
            alert('Invalid input!');
            return;
        }
        return inp;
    },
    pushLeft: function() {
        var num = this.processInput();
        if (num)
            this.queueData.unshift(num);
        this.renderQueue();
    },
    popLeft: function() {
        var num = this.queueData.shift();
        this.renderQueue();
        alert('删除数值 : ' + num);
    },
    pushRight: function() {
        var num = this.processInput();
        if (num)
            this.queueData.push(num);
        this.renderQueue();
    },
    popRight: function() {
        var num = this.queueData.pop();
        this.renderQueue();
        alert('删除数值 : ' + num);
    },
    addEvent: function() {
        var pushLeftBtn = document.getElementById('push-left');
        var pushRightBtn = document.getElementById('push-right');
        var popLeftBtn = document.getElementById('pop-left');
        var popRightBtn = document.getElementById('pop-right');
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
                var index = Array.from(this.querySelectorAll('li')).indexOf(e.target);
                self.queueData.splice(index, 1);
                self.renderQueue();
            }
        })

    }
}
