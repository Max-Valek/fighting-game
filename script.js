// ** Grabs elements from the DOM and stores them into variables **
let playButton = document.getElementById('play')
let resetButton = document.getElementById('reset')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

const updateGame = (p1, p2) => {
    p1NameDiv.innerText = p1.name
    p2NameDiv.innerText = p2.name
    p1HealthDiv.innerText = p1.hp
    p2HealthDiv.innerText = p2.hp
    if (p1.hp <= 0){
        game.setIsOver(true)
        game.declareWinner(p2.name)
    }
    else if (p2.hp <= 0){
        game.setIsOver(true)
        game.declareWinner(p1.name)
    }
}
class Player {
    constructor(name, hp, strength){
        this.name = name
        this.hp = hp
        this.strength = strength
    }
    strike(player, enemy, amount){
        let randomHit = Math.round(Math.random() * amount) + 1
        enemy.hp -= randomHit
        resultDiv.innerText = player.name+' hit '+enemy.name+' for '+randomHit
        updateGame(p1, p2)
    }
    heal(player){
        let randomHeal = Math.round(Math.random() * 5) + 1
        player.hp += randomHeal
        resultDiv.innerText = player.name+' healed for '+randomHeal
        updateGame(p1,p2)
    }
}

class Game {
    constructor() {
        this.isOver = false
    }
    play(p1, p2){
        while(!this.isOver){
            p1.strike(p1,p2,p1.strength)
            if(!this.getIsOver()){
                p2.strike(p2,p1,p2.strength)
            }
            if(!this.getIsOver()){
                p1.heal(p1)
            }
            if(!this.getIsOver()){
                p2.heal(p2)
            }
        }
    }
    getIsOver(){
        return this.isOver
    }
    setIsOver(over){
        this.isOver = over
    }
    declareWinner(winner){
        resultDiv.innerText = winner+' WINS!'
        document.getElementById('victory').play()
    }
    reset(){
        p1.hp = 100
        p2.hp = 100
        this.isOver = false
        resultDiv.innerText = ''
        updateGame(p1, p2)
    }

}

let p1 = new Player('Max', 100, 10)
let p2 = new Player('Boof', 100, 10)

let game = new Game()
updateGame(p1,p2)

playButton.addEventListener('click', function(){
    game.play(p1,p2)
})

resetButton.addEventListener('click', function(){
    game.reset()
})

document.addEventListener('keydown', function(e) {
    if (e.key == 'q' && !game.getIsOver()){
        p1.strike(p1,p2,p1.strength)
        document.getElementById('p1attack').play()
    }
})

document.addEventListener('keydown', function(e) {
    if (e.key == 'a' && !game.getIsOver()){
        p1.heal(p1)
        document.getElementById('p1heal').play()
    }
})
document.addEventListener('keydown', function(e) {
    if (e.key == 'p' && !game.getIsOver()){
        p2.strike(p2,p1,p2.strength)
        document.getElementById('p2attack').play()
    }
})

document.addEventListener('keydown', function(e) {
    if (e.key == 'l' && !game.getIsOver()){
        p2.heal(p2)
        document.getElementById('p2heal').play()
    }
})

