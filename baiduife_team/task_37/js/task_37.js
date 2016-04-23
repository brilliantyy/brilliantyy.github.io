(function() {
    var PopUp = function(config) {
        this.init(config);
    };

    PopUp.prototype = {
        init: function(config) {
            if (!config) {
                config = {};
            }
            this.width = config.width || 450;
            this.height = config.height || 300;
            this.title = config.title || '提示';
            this.content = config.content || '这是一条默认消息';
            this.confirm = config.confirm || '确定';
            this.cancel = config.cancel || '取消';
            this.dragable = config.dragable === false ? false : true;
            this.canDrag = false;
            this.wrap = null;
            this.box = null;
        },
        show: function() {
            this.wrap = document.createElement('div');
            this.wrap.className = 'mask';
            this.wrap.style.width = document.documentElement.clientWidth + 'px';
            this.wrap.style.height = document.documentElement.clientHeight + 'px';

            this.box = document.createElement('div');
            this.box.className = 'pop-up';
            this.box.style.cssText = "width: " + this.width + "px;height: " + this.height + "px;";

            var title = document.createElement('div');
            title.innerHTML = this.title;
            title.className = 'header';

            var content = document.createElement('div');
            content.className = 'content';
            content.innerHTML = this.content;
            content.style.height = (this.height - 90) + 'px';

            var footer = document.createElement('div');
            var confirmBtn = document.createElement('button');
            var cancelBtn = document.createElement('button');
            confirmBtn.setAttribute('id', 'confirm');
            confirmBtn.innerHTML = this.confirm;
            cancelBtn.setAttribute('id', 'cancel');
            cancelBtn.innerHTML = this.cancel;
            footer.className = 'footer';
            footer.appendChild(confirmBtn);
            footer.appendChild(cancelBtn);

            this.box.appendChild(title);
            this.box.appendChild(content);
            this.box.appendChild(footer);

            this.wrap.appendChild(this.box);
            document.body.appendChild(this.wrap);
            document.body.style.overflow = 'hidden';                    // 阻止底部页面滚动

            this.addMouseEvent();
        },
        close: function() {
            document.body.removeChild(this.wrap);
            document.body.style.overflow = 'auto';
            this.wrap = null;
        },
        addMouseEvent: function() {
            var self = this, startPosition = {x: 0, y: 0}, startOffset = {left: 0, top: 0},target;

            if (self.wrap) {
                self.wrap.addEventListener('click', function (event) {
                    target = event.target;
                    if (target === self.wrap) {
                        self.close();
                    }
                }, false);
            }
            if (self.box) {
                self.box.addEventListener('mousedown', function(event) {

                    if (self.dragable) {
                        self.canDrag = true;
                        startPosition.x = event.clientX;
                        startPosition.y = event.clientY;
                        startOffset.left = self.box.offsetLeft;
                        startOffset.top = self.box.offsetTop;
                    }
                }, false);

                self.box.addEventListener('mousemove', function(event) {
                    if (self.canDrag) {
                        var curX = startOffset.left + event.clientX - startPosition.x;
                        var curY = startOffset.top + event.clientY - startPosition.y;

                        if (curX < self.box.offsetWidth / 2) {
                            curX = self.box.offsetWidth / 2;
                        } else if (curX > (self.box.offsetWidth / 2) + self.wrap.offsetWidth - self.box.offsetWidth) {
                            curX = (self.box.offsetWidth / 2) + self.wrap.offsetWidth - self.box.offsetWidth
                        }

                        if (curY < self.box.offsetHeight / 2) {
                            curY = self.box.offsetHeight / 2;
                        } else if (curY > (self.box.offsetHeight / 2) + self.wrap.offsetHeight - self.box.offsetHeight) {
                            curY = (self.box.offsetHeight / 2) + self.wrap.offsetHeight - self.box.offsetHeight
                        }

                        self.box.style.left = curX + 'px';
                        self.box.style.top = curY + 'px';
                    }
                }, false);

                self.box.addEventListener('mouseup', function() {
                    self.canDrag = false;
                }, false);
            }


        }

    }


    var defaultBtn = document.getElementById('default');
    var customBtn = document.getElementById('custom');
    defaultBtn.addEventListener('click', function() {
        var popUp = new PopUp();
        popUp.show();
    });

    customBtn.addEventListener('click', function() {
        var popUp = new PopUp({'width': 500, 'height': 400, 'title': 'Hello World!',
                            'content': '这是一个定制弹出层!', 'confirm': 'OK', 'cancel': 'Cancel',
                            'dragable': false});
        popUp.show();
    });
})();
