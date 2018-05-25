class Sword {
    protected div : HTMLElement;
    protected p : HTMLElement;


    constructor(parent:HTMLElement, health : number) {

        this.div = document.createElement("sword");
        this.div.id = 'equipSword';
        parent.appendChild(this.div);
    }
}