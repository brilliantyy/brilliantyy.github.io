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
    _initQueue: function () {
        var list = document.querySelectorAll('.queue li');
        for (var i = 0, len = list.length; i < len; i += 1) {
            this.queueData.push(list[i].textContent);
            list[i].style.height = this.queueData[i] * 2 + 'px';
        }
        this.addEvent();
    },
    /**
     * 队列重绘
     */
    renderQueue: function () {
        var parent = document.querySelector('ul');
        var list = document.querySelectorAll('.queue li');
        for (var i = 0, len = list.length; i < len; i += 1) {
            parent.removeChild(list[i]);
        }

        for (i = 0, len = this.queueData.length; i < len; i += 1) {
            var child = document.createElement('li');
            child.innerHTML = this.queueData[i];
            child.style.height = this.queueData[i] * 2 + 'px';
            parent.appendChild(child);
        }

    },
    /**
     * 处理输入
     * @returns {string}
     */
    processInput: function () {
        var inp = document.getElementById('num').value.trim();
        var reg = new RegExp('^-?\\d+$');
        if (!reg.test(inp)) {
            alert('请输入整数!');
            return;
        } else if (Number(inp) > 100 || Number(inp) < 10) {
            alert('请输入10-100之间的整数!');
            return;
        }
        return inp;
    },
    pushLeft: function () {
        if (this.queueData.length == 60) {
            alert('队列数量过多!');
            return;
        }
        var num = this.processInput();
        if (num)
            this.queueData.unshift(num);
        this.renderQueue();
    },
    popLeft: function () {
        var num = this.queueData.shift();
        this.renderQueue();
        alert('删除数值 : ' + num);
    },
    pushRight: function () {
        if (this.queueData.length == 60) {
            alert('队列数量过多!');
            return;
        }
        var num = this.processInput();
        if (num)
            this.queueData.push(num);
        this.renderQueue();
    },
    popRight: function () {
        var num = this.queueData.pop();
        this.renderQueue();
        alert('删除数值 : ' + num);
    },
    addEvent: function () {
        var pushLeftBtn = document.getElementById('push-left');
        var pushRightBtn = document.getElementById('push-right');
        var popLeftBtn = document.getElementById('pop-left');
        var popRightBtn = document.getElementById('pop-right');
        var parent = document.querySelector('.queue');
        var sortBtn = document.getElementById('sort');
        var self = this;

        pushLeftBtn.addEventListener('click', function () {
            self.pushLeft();
        });

        pushRightBtn.addEventListener('click', function () {
            self.pushRight();
        });

        popLeftBtn.addEventListener('click', function () {
            self.popLeft();
        });

        popRightBtn.addEventListener('click', function () {
            self.popRight();
        });

        sortBtn.addEventListener('click', function () {
            self.bubbleSort();

        });

        /**
         * 添加事件代理
         */
        parent.addEventListener('click', function (e) {
            if (e.target && e.target.nodeName.toUpperCase() == "LI") {
                var index = Array.from(this.querySelectorAll('li')).indexOf(e.target);
                self.queueData.splice(index, 1);
                self.renderQueue();
            }
        })
    },
    bubbleSort: function() {
        var len = this.queueData.length, self = this;
        var timer;
        var i=0;
        var j=0;
        timer = setInterval(function(){
            var list = document.querySelectorAll('.queue li');
            if(i<len){
                if(j<len-i-1){

                    setTimeout(function(){
                        if(self.queueData[j]>self.queueData[j+1]){

                            var b = list.item(j);
                            var l = list.item(j+1);

                            var a = self.queueData[j];
                            self.queueData[j]=self.queueData[j+1];
                            self.queueData[j+1]=a;
                            b.style.height = self.queueData[j] * 2 + 'px';
                            l.style.height = self.queueData[j+1] * 2 + 'px';
                            b.textContent = self.queueData[j];
                            l.textContent = self.queueData[j+1];
                        }
                        j++;
                    },50)

                }else{
                    list.item(j).style.backgroundColor = 'red';
                    i++;
                    j=0;
                }
            }
            else{
                clearInterval(timer);
            }
        },100);

    }

}
