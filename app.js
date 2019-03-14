new Vue({
	el:'#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startNewGame: function() {
            this.gameIsRunning = !this.gameIsRunning;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function(){
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= this.calculateDamage(3, 10);
            this.turns.unshift({
                isPlayer: true,
                text: 'Players hits Monster for ' + damage + ' damage.'
            });
                if(this.checkWin()){
                    return;
                }
            this.monsterAttacks();
        },
        monsterAttacks: function(){
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage + ' damage.'
            });
            this.checkWin();
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        heal: function(){
            if(this.playerHealth <=90){
                this.playerHealth += 10;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Players heals by 10.'
            });
            this.monsterAttacks();
        },
        specialAttack: function(){
            if(confirm("You can only use once per game. Want to use?")){
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
                if(this.checkWin()){
                    return;
                }
            this.turns.unshift({
                isPlayer: true,
                text: 'Players hits Monster HARD for ' + damage + ' damage.'
            });
            this.monsterAttacks();
            document.getElementById("special-attack").disabled = true;
            } else {
                return
            }
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        giveUp: function(){
            this.gameIsRunning = !this.gameIsRunning;
            this.playerHealth = 0;
            this.checkWin();
        },
        checkWin: function() {
            if(this.playerHealth <= 0){
                if(confirm("You lose. Play Again?")){
                    this.startNewGame();
                } else {
                    this.gameIsRunning = !this.gameIsRunning;
                } return true
            } else if(this.monsterHealth <=0){
                if(confirm("You WIN! Play Again?")){
                    this.startNewGame();
                } else {
                    this.gameIsRunning = !this.gameIsRunning;
                } return true
            } return false
        }
    }
})