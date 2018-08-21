var canvas=document.getElementById("Pazl");
var context=canvas.getContext("2d");
var go=document.getElementById("go");
var end=document.getElementById("end");
var click=0,sec=0,min=0,tenSec=0,timerId;
class Cell{
    constructor(){

    }
    getX(num) {
        return(num % 4);
    }
    getY(num){
        return(Math.floor(num/4));
    }

    drawCell(position,num){
        this.position=position;
        context.fillStyle = "#FFD700";
        context.fillRect(this.getX(num) * 100 + 5, this.getY(num) * 100 + 5, 90, 90);
        context.fillStyle = "Black";
        context.fillText(this.position, this.getX(num) * 100 + 35, this.getY(num) * 100 + 40);
        if(this.position===16){
            context.fillStyle="#125";
            context.fillRect(this.getX(num)*100+5,this.getY(num)*100+5,90,90);
        }

}

}
class GameField{
    constructor() {

        var cell;
        var _that=this,i ;
        this.cellArr=[];
        this.model= new GameModel();
        this.model.shuffle();
        this.field();
            for (i = 0; i <= 15; i++) {
                _that.cell=new Cell();
                _that.cellArr.push(_that.cell);
                cell=0;
                _that.cell.drawCell(_that.model.arr[i],i);
            }
        Pazl.onclick=function (e) {
            _that.handle(e);
        };

    }
    field() {
        canvas.width = 600;
        canvas.height = 400;
        context.fillStyle = "#125";
        context.fillRect(0, 0, 400, canvas.height);
        context.font = "30px Ariel";
    }
    timer(){
        if(sec===9){
            sec=0;
            tenSec++;
            context.fillStyle="white";
            context.fillText(tenSec,480,385);
        }
        context.fillStyle = "black";
        context.fillRect(410,350,100,50);
        context.fillStyle="white";
        context.font = "30px Ariel";
        context.fillText(sec,485,385);
        context.fillText(tenSec,465,385);
        context.fillText(":",445,385);
        context.fillText(min,425,385);

        if(tenSec===6){
            tenSec=0;
            sec=0;
            min++;
        }
        if(min===10){

        }
        sec++;
    }

    handle (e) {
        this.x=Math.floor(e.clientX/100);
        this.y=Math.floor(e.clientY/100);
        this.numberArr=(this.y*4+this.x);
        this.swapRight(this.numberArr);
        this.swapLeft(this.numberArr);
        this.swapDown(this.numberArr);
        this.swapUp(this.numberArr);
    }
    swapRight(numberArr){
        var zamena;
             if(this.model.arr[numberArr+1]===16&& numberArr !==this.y * 4 + 3){
                 console.log(this.model.arr);
                click++;
                zamena=this.model.arr[numberArr+1];
                this.model.arr[numberArr+1]=this.model.arr[numberArr];
                this.model.arr[numberArr]=zamena;
                 for(var i=0;i<=15;i++)
                     this.cell.drawCell(this.model.arr[i],i);

         }

    }
    swapLeft(numberArr){
        var zamena;
        if(this.model.arr[numberArr-1]===16&&numberArr !==this.y * 4 ){
            console.log(this.model.arr);
            click++;
            zamena=this.model.arr[numberArr-1];
            this.model.arr[numberArr-1]=this.model.arr[numberArr];
            this.model.arr[numberArr]=zamena;
            for(var i=0;i<=15;i++)
                this.cell.drawCell(this.model.arr[i],i);

        }

    }
    swapUp(numberArr){
        var zamena;
        if(this.model.arr[numberArr+4]===16){
            console.log(this.model.arr);
            click++;
            zamena=this.model.arr[numberArr+4];
            this.model.arr[numberArr+4]=this.model.arr[numberArr];
            this.model.arr[numberArr]=zamena;
            for(var i=0;i<=15;i++)
                this.cell.drawCell(this.model.arr[i],i);

        }
    }
    swapDown(numberArr){
        var zamena;
        if(this.model.arr[numberArr-4]===16){
            console.log(this.model.arr);
            click++;
            zamena=this.model.arr[numberArr-4];
            this.model.arr[numberArr-4]=this.model.arr[numberArr];
            this.model.arr[numberArr]=zamena;
            for(var i=0;i<=15;i++)
                this.cell.drawCell(this.model.arr[i],i);
        }

    }
}
class GameModel {
    constructor() {
        this.fillingArr();
    }
    fillingArr() {
        this.arr = [];
        var i = 0;
        while (i <= 14) {
            this.arr.push(i + 1);
            i++;
        }
        this.arr.push(16);
    }

    shuffle() {
        var currentIndex = 15, temporaryValue, randomIndex;
        this.fillingArr();
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = this.arr[currentIndex];
            this.arr[currentIndex] = this.arr[randomIndex];
            this.arr[randomIndex] = temporaryValue;
        }
       // return this.arr;
    }

}
class GameMenu{
    constructor(){
        this.model=new GameModel();
        var _that=this;
        go.onclick=function () {
            _that.game = new GameField();
            timerId=setInterval(function () {
                _that.game.timer();
            },300);

        };
        end.onclick= function() {
            var end=0;
            for(var i=0;i<15;i++)
                if(_that.model.arr[i]===i+1)
                    end++;
            if(end===15) {
                clearInterval(timerId);
                _that.game.field();
                context.fillStyle = "White";
                context.fillText("Ура,ты собрал все",30,100);
                context.fillText("Количиство кликов =",30,130);
                context.fillText(click,300,130);
                context.fillText("Время =",30,160);
                context.fillText(min,150,160);
                context.fillText(":",165,160);
                context.fillText(tenSec,175,160);
                context.fillText(sec,190,160);
            }
            else{
                alert("Еще не все, найди ошибку!");
                console.log(end);
            }
        };
    }
}
new GameMenu();