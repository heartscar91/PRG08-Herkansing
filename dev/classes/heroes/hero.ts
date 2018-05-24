class Hero extends gameObject implements Observer {

    private equipped: boolean = false;

    constructor(game : Game, x : number, y : number, height : number, width : number, health : number, power : number, defense : number) {
        super('hero');
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = health;
        this.power = power;
        this.defense = defense;
        this.behaviour = new Status();

        this.showHealth();
        this.draw();
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        this.div.addEventListener("click", (e) => this.hit());

        let sword = document.getElementById('sword');
        sword.addEventListener("click", (e) => this.equip());
    }

    public statusUpdate() {
        if(this.health <= 0) {
            this.behaviour.update(false);
        } else if(this.health > 0) {
            this.behaviour.update(true);   
        }
    }

    // keyboard input zorgt dat de snelheid wordt aangepast
    protected onKeyDown(event:KeyboardEvent) : void {

        // console.log(event.keyCode); (Om key te checken)
        switch(event.keyCode){
            case 38: //Omhoog (pijltijestoetsen)
                this.y -= 10;
                this.div.style.transform ="translate(" + this.x + "px," + this.y + "px)";
                this.div.style.background = "url(./images/hero-front.png)";
            break;
            case 39: //Rechts
                this.x += 10;
                this.div.style.transform ="translate(" + this.x + "px," + this.y + "px)";
                this.div.style.background = "url(./images/hero.png) -66px -134px";
            break;
            case 40: //Naar beneden
                this.y += 10;
                this.div.style.transform ="translate(" + this.x + "px," + this.y + "px)";
                this.div.style.background = "url(./images/hero-front.png)";
            break;
            case 37: //Links
                this.x -= 10;
                this.div.style.transform ="translate(" + this.x + "px," + this.y + "px)";
                this.div.style.background = "url(./images/hero.png) -66px -68px";
            break;
            case 32:
                //Valt aan met Spatie
                this.attack();
            break;
            case 73:
                //Opent/sluit inventory
                this.inventory();
            break;
        }
    }

    public powerCalc() {
        return this.power;
    }

    private showHealth() : void {
        let healthBar = new Healthbar(this.div, this.health);
        
        if (this.health == 0) {
            healthBar.innerHTML = this.health;
        }
        healthBar.innerHTML = this.health;
        this.statusUpdate();
    }

    private attack() : void {
        let sword = document.getElementById('sword');

        if(sword.className == 'unequipped') {
            let audio = new Audio('./sounds/punch.mp3');
            audio.play();
        } else if(sword.className == 'equipped') {
            let myAni = TweenMax.to('sword', 1, {right: 30});
            setTimeout(function() {
                let myAni = TweenMax.to('sword', 1, {right: 0});
            }, 300);

            let audio = new Audio('./sounds/swordswing2.mp3');
            audio.play();
        }
    }

    private hit() : void {
        let audio = new Audio('./sounds/punch.mp3');
        let percent = document.getElementById('percent');

        audio.play();
        this.health -= 1;
        this.showHealth();
    }

    private equip() {
        let sword = document.getElementById('sword');
        let equipSword = document.getElementById('equipSword');
        
        if(sword.className == 'unequipped') {
            let SwordE = new Sword(this.div, this.health);
            this.power += 5;
            sword.className = 'equipped';
        } else if(sword.className == 'equipped') {
            sword.className = 'unequipped';
            equipSword.remove();
        }
    }

    private inventory() : void {
        //Opent de inventory d.m.v. classes toe te voegen/te verwijderen
        let inventory = document.getElementById('inventory');
        if(inventory.className == 'closed') {
            inventory.className = 'open';
        } else if (inventory.className == 'open') {
            inventory.className = 'closed';
        }
    }

    public notify() : void {
        console.log('lol');
    }
}