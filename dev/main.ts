/// <reference path="./factory/enemyFactory.ts" />


class Game {

    private static instance: Game;
    private container : HTMLElement;
    private hero  : Hero
    private enemy : Enemy;

    public enemiesArray = [];
    public heroesArray = [];

    constructor() {
        const kamek = enemyFactory.createEnemy(this, 'Kamek', 200, 650, 75, 105, 10, 3, 1, 100, 5);
        this.enemiesArray.push(kamek);

        const hero = heroFactory.createHero(this, 'Paladin', 900, 650, 67, 67, 10, 3, 2);
        this.heroesArray.push(hero);

        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        for(let i = 0; i < this.enemiesArray.length; i++) {
            this.enemy.update(this.heroesArray[i], this.enemiesArray[i]);
        }

        //collision
        if(Utils.checkCollision(this.heroesArray[0], this.enemiesArray[0])) {
            
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    public static getInstance() {
        if (! Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
} 


// load
window.addEventListener("load", function() {
    let g : Game = Game.getInstance();
});