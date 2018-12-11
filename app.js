new Vue({
  el:'#app',
  data:{
    playerHealth:100,
    monsterHealth : 100,
    gameRunning : false,
    specialAttackCounter:3,
    flag0: false,
    flag1:false,
    healCounter:2,
    turns:[]
  },
  methods:{
    startGame:function(){
        this.gameRunning = true
        this.playerHealth = 100,
        this.monsterHealth = 100,
        this.specialAttackCounter = 3,
        this.healCounter = 2,
        this.flag0 = this.flag1 = false,
        this.turns=[]
    },
    // attack
    attack:function(){
      var damageM = this.damageCalculate(3,10)
      this.monsterHealth -= damage
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damageM
      })
      if (this.checkWin()) {
        return
      }
      var damageP = this.damageCalculate(5,12)
      this.playerHealth -= damageP
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damageP
      })
      this.checkWin()
    },
// specialAttack
    specialAttack:function(){
    this.specialAttackCounter -=1
    if (this.specialAttackCounter >= 0) {
      var damageM,damageP
      damageM = this.damageCalculate(8,12)
      this.monsterHealth -= damageM
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damageM
      })
      if (this.checkWin()) {
        return
      }
      damageP = this.damageCalculate(6,11)
      this.playerHealth -= damageP
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damageP
      })
      this.checkWin()
    }else {
      alert("You can't use that")
      this.specialAttackCounter = 0
      this.flag0 = true
    }

    },
// HEAL
    heal:function(){
      this.healCounter -=1
      if (this.healCounter >=0 ) {
        if(this.playerHealth <= 90){
          this.playerHealth += 15
        }else {
          this.playerHealth = 100
        }
      }else {
        alert("You can't use that")
        this.healCounter = 0
        this.flag1 = true
      }
      var damageP = this.damageCalculate(5,12)
      this.playerHealth -= damageP
      this.turns.unshift({
        isPlayer: true,
        text: 'Monster hits Player for ' + damageP
      })
      this.checkWin()
    },
// giveUp
    giveUp:function(){
      this.gameRunning = false
    },
// damageCalculate
    damageCalculate:function(min,max){
      damage = Math.max(Math.floor(Math.random() * max) + 1, min)
      return damage
    },
// checkWin
    checkWin:function(){
      if (this.monsterHealth <= 0) {
        if (confirm("You won!New Game?")) {
          this.startGame()
        }else {
          this.gameRunning = false
        }
        return true
      }else if (this.playerHealth <= 0) {
        if (confirm("You lost!New Game?")) {
          this.startGame()
        }else {
          this.gameRunning = false
        }
        return true
      }
return false
    }
  }





})
