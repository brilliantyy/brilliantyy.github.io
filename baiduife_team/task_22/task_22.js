/**
 * 定义遍历二叉树类
 * @constructor
 */
function TraverseTree() {
    this.stack = [];
    this.isTraversing = false;
}

/**
 * 前序遍历
 * @param node
 */
TraverseTree.prototype.preOrder = function(node) {
    if (node) {
        this.stack.push(node);
        this.preOrder(node.firstElementChild);
        this.preOrder(node.lastElementChild);
    }
};

/**
 * 中序遍历
 * @param node
 */
TraverseTree.prototype.inOrder = function(node) {
    if (node) {
        this.inOrder(node.firstElementChild);
        this.stack.push(node);
        this.inOrder(node.lastElementChild);
    }
};

/**
 * 后序遍历
 * @param node
 */
TraverseTree.prototype.postOrder = function(node) {
    if (node) {
        this.postOrder(node.firstElementChild);
        this.postOrder(node.lastElementChild);
        this.stack.push(node);
    }
};

/**
 * 动画
 */
TraverseTree.prototype.animation = function() {
    var stack = this.stack,
        index = 0,
        self = this,
        timer;

    self.stack = [];
    if (!self.isTraversing) {
        self.isTraversing = true;
        stack[index].style.backgroundColor = '#CD97FF';
        timer = setInterval(function() {
            if (index == stack.length - 1) {
                stack[index].style.backgroundColor = '#fff';
                self.isTraversing = false;
                clearInterval(timer);
            } else {
                stack[index++].style.backgroundColor = '#fff';
                stack[index].style.backgroundColor = '#CD97FF';
            }
        }, 400);
    }
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

var traverser = new TraverseTree(),
    btns = document.querySelectorAll('button'),
    preBtn = btns[0],
    inBtn = btns[1],
    postBtn = btns[2],
    root = document.querySelector('.root');

addEventHandler(preBtn, 'click', function() {
    traverser.preOrder(root);
    traverser.animation();
});

addEventHandler(inBtn, 'click', function() {
    traverser.inOrder(root);
    traverser.animation();
});

addEventHandler(postBtn, 'click', function() {
    traverser.postOrder(root);
    traverser.animation();
});



















