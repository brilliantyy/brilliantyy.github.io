/**
 * 定义节点类, this.dom保存节点对于的DOM元素的引用
 * @param data
 * @constructor
 */
function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
    this.dom = null;
}

/**
 * 定义树类,以node为根节点
 * @param node
 * @constructor
 */
function Tree(node) {
    this._root = node;
    this.trace = [];
}

/**
 * 深度优先遍历树
 */
Tree.prototype.traverseDF = function() {
    var stack = [],
        curNode = null;
    this.trace = [];
    stack.push(this._root);
    while(stack.length > 0) {
        curNode = stack.pop();
        this.trace.push(curNode);
        if (curNode.children.length > 0) {
            for (var i = curNode.children.length - 1; i >= 0; i--) {
                stack.push(curNode.children[i]);
            }
        }
    }

};

/**
 * 广度优先遍历树
 */
Tree.prototype.traverseBF = function() {
    this.trace = [];
    var queue = [];
    var curNode = this._root;
    while(curNode) {
        for (var i = 0, len = curNode.children.length; i < len; i++) {
            queue.push(curNode.children[i]);
        }
        this.trace.push(curNode);
        curNode = queue.shift();
    }
};

/**
 * 查找
 * @param data
 */
Tree.prototype.search = function(data) {
    this.trace = [];
    var found = false,
        curNode = this._root,
        queue = [];

    while(!found && curNode) {
        for (var i = 0, len = curNode.children.length; i < len; i++) {
            queue.push(curNode.children[i]);
        }
        this.trace.push(curNode);
        if (curNode.data === data) {
            found = true;
        } else {
            curNode = queue.shift();
        }
    }

    var self = this,
        len = self.trace.length,
        index = 0;

    self.trace[index].dom.style.backgroundColor = '#FFB820';
    var timer = setInterval(function() {
        if (index === len - 1) {
            if (found) {
                self.trace[index].dom.style.backgroundColor = 'red';
            } else {
                self.trace[index].dom.style.backgroundColor = '#fff';
                alert('未找到节点!');
            }
            clearInterval(timer);
        } else {
            self.trace[index++].dom.style.backgroundColor = '#fff';
            self.trace[index].dom.style.backgroundColor = '#FFB820';
        }
    }, 500);
};

/**
 * 动画
 */
Tree.prototype.animation = function() {
    var self = this,
        len = self.trace.length,
        index = 0;

    self.trace[index].dom.style.backgroundColor = '#FFB820';
    var timer = setInterval(function() {
        if (index === len - 1) {
            self.trace[index].dom.style.backgroundColor = '#fff';
            clearInterval(timer);
        } else {
            self.trace[index++].dom.style.backgroundColor = '#fff';
            self.trace[index].dom.style.backgroundColor = '#FFB820';
        }
    }, 500);
};

/**
 * 清楚查找痕迹
 */
Tree.prototype.clear = function() {
    if (this.trace.length > 0) {
        for (var i = 0, len = this.trace.length; i < len; i++) {
            this.trace[i].dom.style.backgroundColor = '#fff';
        }
    }
};

/**
 * 根据DOM结构构造多叉树
 * @returns {Tree}
 */
function createTree() {
    var root = document.getElementById('root'),
        stack = [],
        nodeStack = [],
        parentNode = null;

    stack.push(root);
    var curDOM = stack.shift(),
        child = curDOM.firstElementChild,
        node = new Node(child.innerHTML),
        len = curDOM.childElementCount;

    node.dom = root;
    nodeStack.push(node);
    while(curDOM) {
        if (len > 1) {
            child = child.nextElementSibling;
            parentNode = nodeStack[0];
            for (var i = 1; i < len; i++) {
                stack.push(child);
                var newChild = new Node(child.firstElementChild.innerHTML);
                newChild.dom = child;
                newChild.parent = parentNode;
                nodeStack.push(newChild);
                parentNode.children.push(newChild);
                child = child.nextElementSibling;
            }
        }

        nodeStack.shift();
        if (stack.length > 0) {
            curDOM = stack.shift();
            child = curDOM.firstElementChild;
            len = curDOM.childElementCount;
        } else {
            break;
        }
    }
    return new Tree(node);
}

function addEventHandler(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
    } else {
        element['on' + type] = handler;
    }
}


var tree = createTree(),
    btns = document.querySelectorAll('button'),
    dfsBtn = btns[0],
    bfsBtn = btns[1],
    srcBtn = btns[2] ;

addEventHandler(dfsBtn, 'click', function () {
    tree.clear();
    tree.traverseDF();
    tree.animation();
});

addEventHandler(bfsBtn, 'click', function () {
    tree.clear();
    tree.traverseBF();
    tree.animation();
});

addEventHandler(srcBtn, 'click', function () {
    tree.clear();
    var input = document.querySelector('input').value.trim();
    if (input.length === 0) {
        alert('查找内容不能为空!');
        return;
    }
    tree.search(input);
});

