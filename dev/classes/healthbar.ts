class Healthbar {
    
    protected div : HTMLElement;
    protected p : HTMLElement;

    constructor(parent:HTMLElement, health : number) {

        this.div = document.createElement("healthbar");
        this.div.id = 'healthbar';
        parent.appendChild(this.div);

        this.p = document.createElement('p');
        this.div.appendChild(this.p);
        this.p.innerHTML = health;
    }

    // public change() {
    //     this.div.style.width = '90%';
    // }
}