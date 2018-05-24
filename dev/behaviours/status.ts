class Status implements Behaviour {

    public update(alive : boolean) : void {
        
        if(alive) {
            console.log("You're alive!");
        } else if (!alive) {
            alert("YOU DIED, GAME OVER");
            location.reload();
        }
    }

    public enemyUpdate(alive : boolean){
        if(alive) {
            document.getElementById('status').innerHTML = 'Defeat the enemy!';
            console.log("Defeat the enemy!");
        } else if (!alive) {
            document.getElementById('status').innerHTML = "You've slain the enemy!";
            console.log("You've slain the enemy!");
        }
    }
}