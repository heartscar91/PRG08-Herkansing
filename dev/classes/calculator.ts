namespace Utils {
    export class Calculator {
        public damage : number;

        constructor(defense: number, power : number) {
            console.log(defense, power)
            this.damage = this.calcDamage(defense, power);
        }

        private calcDamage(defense: number, power: number) : number{
            this.damage = power - defense;
            // console.log(power + ' - ' + defense + ' = ' + this.damage);
            return this.damage;
        }
    }
}