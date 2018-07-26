var canvas=document.getElementById("Pazl");
var context=canvas.getContext("2d");
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
    constructor() {
        _that=this;
        this.model = new GameModel();
        this.model.field();
        this.cell = new Cell();
        var i = 0;
        while (i <= 15) {
            this.cell.drawCell(i);
            i++;
        }
        console.log("before", this);
        Pazl.onclick=function () {
            _that.handle();
        }
    }
    handle (e) {
        console.log("after",this);
        var x,y;
        x=Math.floor(e.clientX/100);
        y=Math.floor(e.clientY/100);
        this.swapRight(x,y);
    }
    swapRight(x,y){
        /* this.numberArr=(y*4+x);
         if(this.model.arr[this.numberArr+1]===16)*/
        console.log(x,y);
    }
}
class GameModel{
    constructor(){
        this.field();
        this.shuffle();
        console.log(this);
     }
    field(){
            canvas.width=500;
            canvas.height=400;
            context.fillStyle="#125";
            context.fillRect(0,0,400,canvas.height);
            context.font="30px Ariel";
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
let game=new GameField();
