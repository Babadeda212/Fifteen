var canvas=document.getElementById("Pazl");
var go=document.getElementById("Go");
var end=document.getElementById("End");
var context=canvas.getContext("2d");
var click=0;
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
        var _that=this,i ; this.cellArr=[];
        this.model= new GameModel();
        this.model.shuffle();
        this.field();

        go.onclick= function() {
            _that.field();
            for (i = 0; i <= 15; i++) {
                _that.cell=new Cell();
                _that.cellArr.push(_that.cell);
                cell=0;
                _that.cell.drawCell(_that.model.arr[i],i);
            }
            console.log(_that.model.arr);
            console.log(_that.cellArr);
        };
        end.onclick= function() {
            var end=0;
         for(var i=0;i<15;i++)
             if(_that.model.arr[i]===i+1)
                 end++;
         if(end===16) {
             _that.field();
             context.fillStyle = "White";
             context.fillText("Ура,ты собрал все",30,100);
             context.fillText("Количиство кликов=",30,130);
             context.fillText(click,300,130);
         }
         else{
             alert("Еще не все, найди ошибку!");
             console.log(end);
         }
         };
        Pazl.onclick=function (e) {
            _that.handle(e);
        };

    }
    field() {
        canvas.width = 400;
        canvas.height = 400;
        context.fillStyle = "#125";
        context.fillRect(0, 0, 400, canvas.height);
        context.font = "30px Ariel";
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
    let game = new GameField();