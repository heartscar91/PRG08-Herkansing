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
    function Game(type) {
        var _this = this;
        this.enemies = new Array();
        this.heroes = new Array();
        var interval = setInterval(function () { return _this.spawnEnemy(); }, 3000);
        if (type) {
            var paladin = heroFactory.createHero(this, 'Paladin', 900, 650, 67, 67, 10, 3, 2);
            this.heroes.push(paladin);
            var priest = heroFactory.createHero(this, 'Priest', 600, 350, 67, 67, 10, 3, 2);
            this.heroes.push(priest);
        }
        else {
            var hero = heroFactory.createHero(this, 'Paladin', 900, 650, 67, 67, 10, 3, 2);
            this.heroes.push(hero);
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.spawnEnemy = function () {
        var randomX = Math.floor((Math.random() * (window.innerWidth)) - 50);
        var randomY = Math.floor((Math.random() * (window.innerHeight)) - 50);
        this.enemies.push(enemyFactory.createEnemy(this, 'Kamek', randomX, randomY, 75, 105, 10, 3, 1, 100, 5));
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update(this.heroes[i], this.enemies[i]);
        }
        for (var _i = 0, _a = this.enemies; _i < _a.length; _i++) {
            var enemy = _a[_i];
            for (var _b = 0, _c = this.heroes; _b < _c.length; _b++) {
                var hero = _c[_b];
                if (Utils.checkCollision(hero, enemy) && enemy.health > 0) {
                    enemy.hit(hero.getPower());
                }
            }
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.getInstance = function (type) {
        if (!Game.instance) {
            Game.instance = new Game(type);
        }
        return Game.instance;
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = Game.getInstance(false);
});
var Utils = (function () {
    function Utils() {
    }
    Utils.checkCollision = function (g1, g2) {
        if (g1 && g2) {
            return (g1.x < g2.x + g2.width &&
                g1.x + g1.width > g2.x &&
                g1.y < g2.y + g1.height &&
                g1.height + g1.y > g2.y);
        }
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
        function Calculator(defense, power) {
            this.damage = this.calcDamage(defense, power);
        }
        Calculator.prototype.calcDamage = function (defense, power) {
            this.damage = power - defense;
            return this.damage;
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
var enemyFactory = (function (_super) {
    __extends(enemyFactory, _super);
    function enemyFactory(game, name, x, y, height, width, health, power, defense, movement, speed) {
        var _this = _super.call(this, 'enemy') || this;
        _this.game = game;
        _this.name = name;
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
    enemyFactory.createEnemy = function (game, name, x, y, height, width, health, power, defense, movement, speed) {
        return new enemyFactory(game, name, x, y, width, height, health, power, defense, movement, speed);
    };
    enemyFactory.prototype.update = function (g1, g2) {
        if (Utils.checkCollision(g1, g2) && this.health > 0) {
            this.hit();
        }
    };
    enemyFactory.prototype.statusUpdate = function () {
        if (this.health <= 0) {
            this.behaviour.enemyUpdate(false);
        }
        else if (this.health > 0) {
            this.behaviour.enemyUpdate(true);
        }
    };
    enemyFactory.prototype.move = function (min, max) {
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
    enemyFactory.prototype.hit = function (heroPower) {
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
        var calc = new Utils.Calculator(this.defense, heroPower);
        this.health -= calc.damage;
        this.showHealth();
    };
    enemyFactory.prototype.showHealth = function () {
        var healthBar = new Healthbar(this.div, this.health);
        if (this.health <= 0) {
            this.div.remove();
            healthBar.innerHTML = this.health;
        }
        healthBar.innerHTML = this.health;
        this.statusUpdate();
    };
    enemyFactory.prototype.subscribe = function (o) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o_1 = _a[_i];
            console.log(o_1);
        }
    };
    enemyFactory.prototype.unsubscribe = function (o) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o_2 = _a[_i];
            o_2.notify();
        }
    };
    return enemyFactory;
}(gameObject));
var heroFactory = (function (_super) {
    __extends(heroFactory, _super);
    function heroFactory(game, name, x, y, height, width, health, power, defense) {
        var _this = _super.call(this, 'hero') || this;
        _this.equipped = false;
        _this.game = game;
        _this.name = name;
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
    heroFactory.prototype.introduce = function () {
        console.log("Hello, I am " + this.name + ". Pleasure to meet you.");
    };
    heroFactory.createHero = function (game, name, x, y, height, width, health, power, defense) {
        return new heroFactory(game, name, x, y, height, width, health, power, defense);
    };
    heroFactory.prototype.statusUpdate = function () {
        if (this.health <= 0) {
            this.behaviour.update(false);
        }
        else if (this.health > 0) {
            this.behaviour.update(true);
        }
    };
    heroFactory.prototype.onKeyDown = function (event) {
        if (this.name === 'Paladin')
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
        else
            switch (event.keyCode) {
                case 87:
                    this.y -= 10;
                    this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
                    this.div.style.background = "url(./images/hero-front.png)";
                    break;
                case 68:
                    this.x += 10;
                    this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
                    this.div.style.background = "url(./images/hero.png) -66px -134px";
                    break;
                case 40:
                    this.y += 10;
                    this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
                    this.div.style.background = "url(./images/hero-front.png)";
                    break;
                case 65:
                    this.x -= 10;
                    this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
                    this.div.style.background = "url(./images/hero.png) -66px -68px";
                    break;
                case 18:
                    this.attack();
                    break;
            }
    };
    heroFactory.prototype.powerCalc = function () {
        return this.power;
    };
    heroFactory.prototype.showHealth = function () {
        var healthBar = new Healthbar(this.div, this.health);
        if (this.health == 0) {
            healthBar.innerHTML = this.health;
        }
        healthBar.innerHTML = this.health;
        this.statusUpdate();
    };
    heroFactory.prototype.attack = function () {
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
    heroFactory.prototype.hit = function () {
        var audio = new Audio('./sounds/punch.mp3');
        var percent = document.getElementById('percent');
        audio.play();
        this.health -= 1;
        this.showHealth();
    };
    heroFactory.prototype.equip = function () {
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
            this.power -= 5;
        }
    };
    heroFactory.prototype.inventory = function () {
        var inventory = document.getElementById('inventory');
        if (inventory.className == 'closed') {
            inventory.className = 'open';
        }
        else if (inventory.className == 'open') {
            inventory.className = 'closed';
        }
    };
    heroFactory.prototype.notify = function () {
        console.log('lol');
    };
    heroFactory.prototype.getPower = function () {
        return this.power;
    };
    return heroFactory;
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
var Healthbar = (function () {
    function Healthbar(parent, health) {
        this.div = document.createElement("healthbar");
        this.div.id = 'healthbar';
        parent.appendChild(this.div);
        this.p = document.createElement('p');
        this.div.appendChild(this.p);
        this.p.innerHTML = health.toString();
    }
    return Healthbar;
}());
//# sourceMappingURL=main.js.map