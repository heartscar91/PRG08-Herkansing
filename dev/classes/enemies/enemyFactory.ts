  class enemyFactory extends gameObject implements Observable {

  protected speed : number;
  protected movement : number;
  public observers : Array<Observer>;

  constructor(game : Game, name: string, x : number, y : number, height : number, width : number, health : number, power : number, defense : number, movement: number, speed: number) {
      super('enemy');
      this.game = game;
      this.name = name;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.health = health;
      this.power = power;
      this.defense = defense;
      this.speed = speed;
      this.movement = movement;
      this.behaviour = new Status();

      this.showHealth();
      this.draw();

      // setInterval( (() => this.move(1,4)), 100);
      this.div.addEventListener("click", (e) => this.hit());
  }

  public static createEnemy(game : Game, name: string, x : number, y : number, height : number, width : number, health : number, power : number, defense : number, movement: number, speed: number) {
      return new enemyFactory(game, name, x, y, width, height, health, power, defense, movement, speed);
  }

  public update(g1: gameObject, g2: gameObject) {
      if(Utils.checkCollision(g1, g2) && this.health > 0) {
          this.hit();
      }
  }

  public statusUpdate() {
      if(this.health <= 0) {
          this.behaviour.enemyUpdate(false);
          let g : Game = Game.getInstance();
          
          let enemy = new enemyFactory(g, 'Kamek', 100, 250, 75, 105, 10, 3, 1, 100, 5);
      } else if(this.health > 0) {
          this.behaviour.enemyUpdate(true);   
      }
  }

  public move(min : number, max : number){
      min = Math.ceil(min);
      max = Math.floor(max);
      let n = Math.floor(Math.random() * (max - min + 1)) + min;

      switch(n) {
          case 1:
              this.movement += this.speed;
              TweenMax.to('enemy', 2, {left: this.movement});
          break;
          case 2:
              this.movement += this.speed;
              TweenMax.to('enemy', 2, {right: this.movement});
          break;
          case 3:
              this.movement += this.speed;
              TweenMax.to('enemy', 2, {top: this.movement});
          break;
          case 4:
              this.movement += this.speed;
              TweenMax.to('enemy', 2, {bottom: this.movement});
          break;
      }
  }

  private hit() : void {
      let sword = document.getElementById('sword');

      if(this.health >= 1) {
          if(sword.className == 'unequipped') {
              let audio = new Audio('./sounds/punch.mp3');
              audio.play();
          } else if(sword.className == 'equipped') {
              let audio = new Audio('./sounds/swordswing2.mp3');
              audio.play();
          }
      } else if (this.health <= 0) {
          let audio = new Audio('./sounds/defeat.wav');
          audio.play();
      }

      console.log(heroFactory.getPower());
  
      let calc = new Utils.Calculator(this.defense, heroFactory.getPower())

      this.health -= calc.damage;
      this.showHealth();
  }

  private showHealth() : void {
      let healthBar = new Healthbar(this.div, this.health);

      if (this.health <= 0) {
          this.div.remove();
          healthBar.innerHTML = this.health;
      }
      healthBar.innerHTML = this.health;
      this.statusUpdate();
  }

  public subscribe(o : Observer) : void {
      for(let o of this.observers) {
          console.log(o);
      }
  }

  public unsubscribe(o : Observer) : void {
      for(let o of this.observers) {
          this.observers.notify();
      }
  }
}