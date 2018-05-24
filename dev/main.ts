class Game {

    private static instance: Game;
    private container : HTMLElement;

    public enemiesArray = [];
    public heroesArray = [];

    constructor(type : boolean) {
        console.log(type);
        if(type) {
            const kamek = enemyFactory.createEnemy(this, 'Kamek', 200, 650, 75, 105, 10, 3, 1, 100, 5);
            this.enemiesArray.push(kamek);
    
            const paladin = heroFactory.createHero(this, 'Paladin', 900, 650, 67, 67, 10, 3, 2);
            this.heroesArray.push(paladin);

            const priest = heroFactory.createHero(this, 'Priest', 600, 350, 67, 67, 10, 3, 2);
            this.heroesArray.push(priest);
        }

        else {
            const kamek = enemyFactory.createEnemy(this, 'Kamek', 200, 650, 75, 105, 10, 3, 1, 100, 5);
            this.enemiesArray.push(kamek);

            const hero = heroFactory.createHero(this, 'Paladin', 900, 650, 67, 67, 10, 3, 2);
            this.heroesArray.push(hero);
        }

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

    public static getInstance(type : boolean) {
        if (! Game.instance) {
            Game.instance = new Game(type);
        }
        return Game.instance;
    }
} 


// load
window.addEventListener("load", function() {
    let g : Game = Game.getInstance(confirm('Multiplayer?'));
});