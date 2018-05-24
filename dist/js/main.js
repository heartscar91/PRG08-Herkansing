var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game = (function () {
    function Game() {
        var _this = this;
        this.hero = new Hero(this, 900, 650, 67, 67, 10, 3, 2);
        this.enemy = new Enemy(this, 200, 650, 75, 105, 10, 3, 1, 80, 2);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.enemy.update(this.hero, this.enemy);
        if (Utils.checkCollision(this.hero, this.enemy)) {
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = Game.getInstance();
});
var Utils = (function () {
    function Utils() {
    }
    Utils.checkCollision = function (g1, g2) {
        return (g1.x < g2.x + g2.width &&
            g1.x + g1.width > g2.x &&
            g1.y < g2.y + g1.height &&
            g1.height + g1.y > g2.y);
    };
    return Utils;
}());
var Status = (function () {
    function Status() {
    }
    Status.prototype.update = function (alive) {
        if (alive) {
            console.log("You're alive!");
        }
        else if (!alive) {
            alert("YOU DIED, GAME OVER");
            location.reload();
        }
    };
    Status.prototype.enemyUpdate = function (alive) {
        if (alive) {
            document.getElementById('status').innerHTML = 'Defeat the enemy!';
            console.log("Defeat the enemy!");
        }
        else if (!alive) {
            document.getElementById('status').innerHTML = "You've slain the enemy!";
            console.log("You've slain the enemy!");
        }
    };
    return Status;
}());
var Utils;
(function (Utils) {
    var Calculator = (function () {
        function Calculator() {
            this.calcDamage();
        }
        Calculator.prototype.calcDamage = function () {
        };
        return Calculator;
    }());
    Utils.Calculator = Calculator;
})(Utils || (Utils = {}));
var gameObject = (function () {
    function gameObject(tag) {
        this.createDiv(tag);
    }
    gameObject.prototype.createDiv = function (tag) {
        var container = document.getElementById("container");
        this.div = document.createElement(tag);
        this.div.id = tag;
        container.appendChild(this.div);
        this.draw();
    };
    gameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    gameObject.prototype.hasCollision = function (obj) {
        return (this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y);
    };
    return gameObject;
}());
var Healthbar = (function () {
    function Healthbar(parent, health) {
        this.div = document.createElement("healthbar");
        this.div.id = 'healthbar';
        parent.appendChild(this.div);
        this.p = document.createElement('p');
        this.div.appendChild(this.p);
        this.p.innerHTML = health;
    }
    return Healthbar;
}());
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(game, x, y, height, width, health, power, defense, movement, speed) {
        var _this = _super.call(this, 'enemy') || this;
        _this.game = game;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        _this.health = health;
        _this.power = power;
        _this.defense = defense;
        _this.speed = speed;
        _this.movement = movement;
        _this.behaviour = new Status();
        _this.showHealth();
        _this.draw();
        _this.div.addEventListener("click", function (e) { return _this.hit(); });
        return _this;
    }
    Enemy.prototype.update = function (g1, g2) {
        if (Utils.checkCollision(g1, g2)) {
            this.hit();
        }
    };
    Enemy.prototype.statusUpdate = function () {
        if (this.health <= 0) {
            this.behaviour.enemyUpdate(false);
        }
        else if (this.health > 0) {
            this.behaviour.enemyUpdate(true);
        }
    };
    Enemy.prototype.move = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        var n = Math.floor(Math.random() * (max - min + 1)) + min;
        switch (n) {
            case 1:
                this.movement += this.speed;
                TweenMax.to('enemy', 2, { left: this.movement });
                break;
            case 2:
                this.movement += this.speed;
                TweenMax.to('enemy', 2, { right: this.movement });
                break;
            case 3:
                this.movement += this.speed;
                TweenMax.to('enemy', 2, { top: this.movement });
                break;
            case 4:
                this.movement += this.speed;
                TweenMax.to('enemy', 2, { bottom: this.movement });
                break;
        }
    };
    Enemy.prototype.hit = function () {
        var sword = document.getElementById('sword');
        if (this.health >= 1) {
            if (sword.className == 'unequipped') {
                var audio = new Audio('./sounds/punch.mp3');
                audio.play();
            }
            else if (sword.className == 'equipped') {
                var audio = new Audio('./sounds/swordswing2.mp3');
                audio.play();
            }
        }
        else if (this.health <= 0) {
            var audio = new Audio('./sounds/defeat.wav');
            audio.play();
        }
        this.health -= 2;
        this.showHealth();
    };
    Enemy.prototype.showHealth = function () {
        var healthBar = new Healthbar(this.div, this.health);
        if (this.health <= 0) {
            this.div.remove();
            healthBar.innerHTML = this.health;
        }
        healthBar.innerHTML = this.health;
        this.statusUpdate();
    };
    Enemy.prototype.subscribe = function (o) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o_1 = _a[_i];
            console.log(o_1);
        }
    };
    Enemy.prototype.unsubscribe = function (o) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o_2 = _a[_i];
            this.observers.notify();
        }
    };
    return Enemy;
}(gameObject));
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(game, x, y, height, width, health, power, defense) {
        var _this = _super.call(this, 'hero') || this;
        _this.equipped = false;
        _this.game = game;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        _this.health = health;
        _this.power = power;
        _this.defense = defense;
        _this.behaviour = new Status();
        _this.showHealth();
        _this.draw();
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        _this.div.addEventListener("click", function (e) { return _this.hit(); });
        var sword = document.getElementById('sword');
        sword.addEventListener("click", function (e) { return _this.equip(); });
        return _this;
    }
    Hero.prototype.statusUpdate = function () {
        if (this.health <= 0) {
            this.behaviour.update(false);
        }
        else if (this.health > 0) {
            this.behaviour.update(true);
        }
    };
    Hero.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 38:
                this.y -= 10;
                this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
                this.div.style.background = "url(./images/hero-front.png)";
                break;
            case 39:
                this.x += 10;
                this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
                this.div.style.background = "url(./images/hero.png) -66px -134px";
                break;
            case 40:
                this.y += 10;
                this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
                this.div.style.background = "url(./images/hero-front.png)";
                break;
            case 37:
                this.x -= 10;
                this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
                this.div.style.background = "url(./images/hero.png) -66px -68px";
                break;
            case 32:
                this.attack();
                break;
            case 73:
                this.inventory();
                break;
        }
    };
    Hero.prototype.powerCalc = function () {
        return this.power;
    };
    Hero.prototype.showHealth = function () {
        var healthBar = new Healthbar(this.div, this.health);
        if (this.health == 0) {
            healthBar.innerHTML = this.health;
        }
        healthBar.innerHTML = this.health;
        this.statusUpdate();
    };
    Hero.prototype.attack = function () {
        var sword = document.getElementById('sword');
        if (sword.className == 'unequipped') {
            var audio = new Audio('./sounds/punch.mp3');
            audio.play();
        }
        else if (sword.className == 'equipped') {
            var myAni = TweenMax.to('sword', 1, { right: 30 });
            setTimeout(function () {
                var myAni = TweenMax.to('sword', 1, { right: 0 });
            }, 300);
            var audio = new Audio('./sounds/swordswing2.mp3');
            audio.play();
        }
    };
    Hero.prototype.hit = function () {
        var audio = new Audio('./sounds/punch.mp3');
        var percent = document.getElementById('percent');
        audio.play();
        this.health -= 1;
        this.showHealth();
    };
    Hero.prototype.equip = function () {
        var sword = document.getElementById('sword');
        var equipSword = document.getElementById('equipSword');
        if (sword.className == 'unequipped') {
            var SwordE = new Sword(this.div, this.health);
            this.power += 5;
            sword.className = 'equipped';
        }
        else if (sword.className == 'equipped') {
            sword.className = 'unequipped';
            equipSword.remove();
        }
    };
    Hero.prototype.inventory = function () {
        var inventory = document.getElementById('inventory');
        if (inventory.className == 'closed') {
            inventory.className = 'open';
        }
        else if (inventory.className == 'open') {
            inventory.className = 'closed';
        }
    };
    Hero.prototype.notify = function () {
        console.log('lol');
    };
    return Hero;
}(gameObject));
var Inventory = (function () {
    function Inventory() {
    }
    return Inventory;
}());
var Sword = (function () {
    function Sword(parent, health) {
        this.div = document.createElement("sword");
        this.div.id = 'equipSword';
        parent.appendChild(this.div);
    }
    return Sword;
}());
//# sourceMappingURL=main.js.map