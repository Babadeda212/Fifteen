var canvas=document.getElementById("Pazl");
canvas.width=500;
canvas.height=400;
var context=canvas.getContext("2d");
context.fillStyle="#125";
context.fillRect(0,0,400,canvas.height);
context.font="30px Ariel";
class Cell{
    constructor(){

        this.model = new GameModel();
    }
    getX() {
        return(this.position % 4);
    }
    getY(){
        return(Math.floor(this.position/4));
    }

    drawCell(position){
        this.position=position;
        context.fillStyle = "#FFD700";
        context.fillRect(this.getX() * 100 + 5, this.getY() * 100 + 5, 90, 90);
        context.fillStyle = "#165";
        context.fillText(this.model.arr[this.position], this.getX() * 100 + 35, this.getY() * 100 + 40);
        if(this.model.arr[this.position]===16){
            context.fillStyle="#125";
            context.fillRect(this.getX()*100+5,this.getY()*100+5,90,90);
        }
        console.log(this);
    }

}
class GameField{

}
class GameModel{
    constructor(){
        this.shuffle();
        console.log(this);
     }
    fillingArr(){
     this.arr=[];
     var i=0;
        while(i<=14) {
          this.arr.push(i+1);
         i++;
         }
        this.arr.push(16);
    }
    shuffle() {
        var currentIndex = 15, temporaryValue, randomIndex ;
        //currentIndex-текущий индекс,array.length-длинна массива,temporaryValue-временная переменная, randomIndex-рандомный индекс.
            this.fillingArr();
        while (0 !== currentIndex) {


            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;


            temporaryValue = this.arr[currentIndex];
            this.arr[currentIndex] = this.arr[randomIndex];
            this.arr[randomIndex] = temporaryValue;
        }

        return this.arr;
    }

}
var i=0;
let cell = new Cell();
while(i<=15) {
    cell.drawCell(i);
    i++;

}
