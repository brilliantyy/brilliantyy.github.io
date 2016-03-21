/**
 * 定义游戏类
 * @constructor
 */
function Game() {
    this.map = null;
    this.gameCanvas = null;
    this.gameCtx = null;
    this.block = null;
    this.fps = 20;
    this.startPosition = {x: 5, y: 5};
}

// 初始化函数, 生成网格地图和移动小方块
Game.prototype.initialize = function(canvas) {
    this.gameCanvas = canvas;
    this.map = new Array(10);
    for (var i = 0; i < 10; i += 1) {
        this.map[i] = new Array(10);
    }
    this.block = new Block(this.startPosition.x, this.startPosition.y);
};

//游戏开始, 定时刷新
Game.prototype.start = function() {
    var self = this;
    self.gameCtx = self.gameCanvas.getContext('2d');
    setInterval(function() {
        self.update();
    }, 10000 / self.fps);
};

Game.prototype.update = function() {
    this.draw();
};

// 绘制函数, 绘制地图和小方块
Game.prototype.draw = function() {
    this.drawStage(this.gameCtx);
    this.drawBlock(this.gameCtx);
};

Game.prototype.drawStage = function(ctx) {

    ctx.beginPath();
    ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    ctx.lineWidth = 1;
    ctx.font = "18px Arial";
    ctx.textAlign = 'center';

    // Draw the stage border
    ctx.strokeRect(46, 46, 450, 450);


    // Draw inner lines
    for (var i = 2; i < 11; i += 1) {
        ctx.moveTo(46, i * 45 + 1);
        ctx.lineTo(496, i * 45 + 1);
        ctx.moveTo(i * 45 + 1, 46);
        ctx.lineTo(i * 45 + 1, 496);
    }

    // Draw numbers
    for (var j = 1; j < 11; j += 1) {
        ctx.strokeText(j, 22, j * 45 + 30);
        ctx.strokeText(j, j * 45 + 24, 26);
    }
    ctx.stroke();
};

Game.prototype.drawBlock = function(ctx) {
    this.block.draw(ctx);
};

Game.prototype.setCommand = function(command) {

    switch (command.trim()) {
        case 'GO':
            go(this);
            break;
        case 'TUN LEF':
            this.block.direction = (this.block.direction - 1 + 4) % 4;
            break;
        case 'TUN RIG':
            this.block.direction = (this.block.direction + 1) % 4;
            break;
        case 'TUN BAC':
            this.block.direction = (this.block.direction + 2) % 4;
            break;
        default:
            break;
    }

    function go(self) {

        switch (self.block.direction) {

            case 0:
                if (self.block.y > 1) {
                    self.block.y--;
                }
                break;
            case 1:
                if (self.block.x < 10) {
                    self.block.x++;
                }
                break;
            case 2:
                if (self.block.y < 10) {
                    self.block.y++;
                }
                break;
            case 3:
                if (self.block.x > 1) {
                    self.block.x--;
                }
                break;
            default:
                break;
        }
    }

    this.draw();
};

/**
 * 定义小方块
 * @param x 小方块行号
 * @param y 小方块列号
 * @constructor
 */
function Block(x, y) {
    this.x = x;
    this.y = y;
    //小方块方向, 0代表向上, 1代表向右, 2代表向下, 3代表向左
    this.direction = 3;
}
Block.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'rgb(255,0,0)';
    ctx.fillRect(this.x * 45 + 2, this.y * 45 + 2, 43,43);
    ctx.fillStyle = 'rgb(0,0,255)';
    switch (this.direction ) {
        case 0:
            ctx.fillRect(this.x * 45 + 2, this.y * 45 + 2, 43, 10);
            break;
        case 1:
            ctx.fillRect(this.x * 45 + 35, this.y * 45 + 2, 10, 43);
            break;
        case 2:
            ctx.fillRect(this.x * 45 + 2, this.y * 45 + 35, 43, 10);
            break;
        case 3:
            ctx.fillRect(this.x * 45 + 2, this.y * 45 + 2, 10, 43);
            break;
        default:
            break;
    }
    ctx.fill();
};


