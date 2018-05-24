class Game {

    private static instance: Game;
    private container : HTMLElement;
    private hero  : Hero
    private enemy : Enemy;

    constructor() {
        this.hero = new Hero(this, 900, 650, 67, 67, 10, 3, 2);
        this.enemy = new Enemy(this, 200, 650, 75, 105, 10, 3, 1, 80, 2);

        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        this.enemy.update(this.hero, this.enemy);

        //collision
        if(Utils.checkCollision(this.hero, this.enemy)) {
            
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