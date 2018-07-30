var canvas=document.getElementById("Pazl");
var go=document.getElementById("Go");
var end=document.getElementById("End");
var context=canvas.getContext("2d");
var click=0;
class Cell{
    constructor(){

        this.model = new GameModel();
        this.model.shuffle();
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
        context.fillStyle = "Black";
        context.fillText(this.model.arr[this.position], this.getX() * 100 + 35, this.getY() * 100 + 40);
        if(this.model.arr[this.position]===16){
            context.fillStyle="#125";
            context.fillRect(this.getX()*100+5,this.getY()*100+5,90,90);
        }

}

}
class GameField{
    constructor() {
        var _that=this;
        this.model = new GameModel();
        go.onclick= function() {
            _that.model.field();
            _that.cell = new Cell();
            _that.cell.model.shuffle();
            for (var i = 0; i <= 15; i++) {
                _that.cell.drawCell(i);
            }
        };
        end.onclick= function() {
            var end=0;
         for(var i=0;i<14;i++)
             if(_that.cell.model.arr[i]===i+1)
                 end++;
         if(end===1) {
             _that.model.field();
             context.fillStyle = "White";
             context.fillText("Ура,ты собрал все",30,100);
             context.fillText("Количиство кликов=",30,130);
             context.fillText(click,300,130);
         }
         };
        console.log(this);
        Pazl.onclick=function (e) {
            _that.handle(e);
        };
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
             if(this.cell.model.arr[numberArr+1]===16&& numberArr !==this.y * 4 + 3){
                click++;
                zamena=this.cell.model.arr[numberArr+1];
                this.cell.model.arr[numberArr+1]=this.cell.model.arr[numberArr];
                this.cell.model.arr[numberArr]=zamena;
                 for(var i=0;i<=15;i++)
                     this.cell.drawCell(i);

         }

    }
    swapLeft(numberArr){
        var zamena;
        if(this.cell.model.arr[numberArr-1]===16&&numberArr !==this.y * 4 ){
            click++;
            zamena=this.cell.model.arr[numberArr-1];
            this.cell.model.arr[numberArr-1]=this.cell.model.arr[numberArr];
            this.cell.model.arr[numberArr]=zamena;
            for(var i=0;i<=15;i++)
                this.cell.drawCell(i);

        }

    }
    swapUp(numberArr){
        var zamena;
        if(this.cell.model.arr[numberArr+4]===16){
            click++;
            zamena=this.cell.model.arr[numberArr+4];
            this.cell.model.arr[numberArr+4]=this.cell.model.arr[numberArr];
            this.cell.model.arr[numberArr]=zamena;
            for(var i=0;i<=15;i++)
                this.cell.drawCell(i);

        }
    }
    swapDown(numberArr){
        var zamena;
        if(this.cell.model.arr[numberArr-4]===16){
            click++;
            zamena=this.cell.model.arr[numberArr-4];
            this.cell.model.arr[numberArr-4]=this.cell.model.arr[numberArr];
            this.cell.model.arr[numberArr]=zamena;
            for(var i=0;i<=15;i++)
                this.cell.drawCell(i);
        }

    }
}
class GameModel {
    constructor() {
        this.field();
    }
    field() {
        canvas.width = 400;
        canvas.height = 400;
        context.fillStyle = "#125";
        context.fillRect(0, 0, 400, canvas.height);
        context.font = "30px Ariel";
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
        return this.arr;
    }

}
    let game = new GameField();