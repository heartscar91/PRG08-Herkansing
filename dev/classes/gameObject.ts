class gameObject implements iDrawable {

    public div : HTMLElement;
    public body : HTMLElement;
    public name: string;
    public x : number;
    public y : number;
    public height : number;
    public width : number;
    public health : number;
    public power : number;
    public defense : number;
    public game : Game;
    public healthbar : Healthbar;
    public behaviour: Status;

    constructor(tag : string) {
        this.createDiv(tag);
    }

    public createDiv(tag : string) {
        //Maakt het element aan
        let container : HTMLElement = document.getElementById("container");
        this.div = document.createElement(tag);
        this.div.id = tag;
        container.appendChild(this.div);
        this.draw();
    }

    public draw() {
        // 'tekend' de div
        this.div.style.transform ="translate(" + this.x + "px," + this.y + "px)";
    }

    public hasCollision(obj : gameObject) : boolean {
        return (this.x < obj.x + obj.width &&
                this.x + this.width > obj.x &&
                this.y < obj.y + obj.height &&
                this.y + this.height > obj.y);
    }
}
