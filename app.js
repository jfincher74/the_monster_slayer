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
        },
        attack: function(){
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= this.calculateDamage(3, 10);
            this.turns.unshift({
                isPlayer: true,
                text: 'Players hits Monster for' + damage + ' damage.'
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
            this.monsterAttacks();
        },
        specialAttack: function(){
            this.monsterHealth -= this.calculateDamage(10, 20);
                if(this.checkWin()){
                    return;
                }
            this.monsterAttacks();
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        giveUp: function(){
            this.gameIsRunning = !this.gameIsRunning;
            this.playerHealth = 0;
            this.gameResults();
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