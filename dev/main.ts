class Game {

    private static instance: Game;
    private container : HTMLElement;

    public enemies : Array<enemyFactory> = new Array<enemyFactory>();
    public heroes : Array<heroFactory> = new Array<heroFactory>();

    constructor(type : boolean) {
        let interval = setInterval(()=> this.spawnEnemy(), 3000);

        // Multiplayer spawns two heroes
        if(type) {    
            const paladin = heroFactory.createHero(this, 'Paladin', 900, 650, 67, 67, 10, 3, 2);
            this.heroes.push(paladin);

            const priest = heroFactory.createHero(this, 'Priest', 600, 350, 67, 67, 10, 3, 2);
            this.heroes.push(priest);
        }

        // Singleplayer spawns a single heroes
        else {
            const hero = heroFactory.createHero(this, 'Paladin', 900, 650, 67, 67, 10, 3, 2);
            this.heroes.push(hero);
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    public spawnEnemy(){
        let randomX = Math.floor((Math.random() * (window.innerWidth)) - 50);
        let randomY = Math.floor((Math.random() * (window.innerHeight)) - 50);
        this.enemies.push(
            enemyFactory.createEnemy(this, 'Kamek', randomX, randomY, 75, 105, 10, 3, 1, 100, 5)
        );
    }

    private gameLoop(){
        for(let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update(this.heroes[i], this.enemies[i]);
        }
      
        for(let enemy of this.enemies){
            for(let hero of this.heroes){
                if(Utils.checkCollision(hero, enemy) && enemy.health > 0) {
                    enemy.hit(hero.getPower());
                }
            }
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
    let g : Game = Game.getInstance(false);
    // let g : Game = Game.getInstance(confirm('Multiplayer?'));
});