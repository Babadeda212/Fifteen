function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;
//currentIndex-текущий индекс,array.length-длинна массива,temporaryValue-временная переменная, randomIndex-рандомный индекс.

    while (0 !== currentIndex) {


        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;


        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
var arra = [];
for (var i = 0 ; i <=14; i++)
    arra.push(i+1);
console.log(arra);
shuffle(arra);
arra.push(16);
console.log(arra);

    var arr = new Array(),num=0;
    for( i=0; i<4; i++){
        arr[i] = new Array();
        for(var j=0; j<4; j++){
            arr[i][j]=arra[num];
            num++;
        }
    }
console.log(arr);
class Cell {
    constructor(number,position){
        this.number=number;
        this.position=position;
    }
    getX() {
        return(this.position % 4);
    }
    getY(){
        return(Math.floor(this.position/4));
    }
    drawCell(){
        context.fillStyle = "#FFD700";
        context.fillRect(this.getX() * 100 + 5, this.getY() * 100 + 5, 90, 90);
        context.fillStyle = "#165";
        context.fillText(this.number, this.getX() * 100 + 35, this.getY() * 100 + 40);
        if(this.number===16){
            context.fillStyle="#125";
            context.fillRect(this.getX()*100+5,this.getY()*100+5,90,90);
        }
    }
}
var canvas=document.getElementById("Pazl");
canvas.width=400;
canvas.height=400;
var context=canvas.getContext("2d");
context.fillStyle="#125";
context.fillRect(0,0,400,400);
context.font="30px Ariel";
var click=0,point;
var go= new Image ();
go.src="1.png";
context.drawImage(go,39,141);
Pazl.onclick=function (e) {
    var pY, pX, button = 0;
    pY = Math.floor(e.clientY / 100);
    pX = Math.floor(e.clientX / 100);
    if (1 <= pX <= 8)
        if (1 <= pY)
            button += 1;
    if (button === 1) {
        context.fillStyle = "#125";
        context.fillRect(0, 0, 400, 400);
        var fps = 60;
        var timer = setInterval(function () {
            for(i=0;i<=15;i++){

                    let cell = new Cell(arra[i],i);
                    cell.drawCell();
                }


            Pazl.onclick = function (e) {
                var poY, poX, zamena, numbArr, zamenaArr;
                poY = Math.floor(e.clientY / 100);
                poX = Math.floor(e.clientX / 100);
                numbArr = poY * 4 + poX;
                console.log("R",arra[numbArr+1],"L",arra[numbArr-1],"me",arra[numbArr]);
                console.log(numbArr-3*poY);
                if (arra[numbArr + 1] === 16&&numbArr!==poY * 4 + 3&&arra[numbArr]!==undefined) {
                    let cell = new Cell(poX, poY, arra[numbArr]);
                    zamenaArr = arra[numbArr + 1];
                    arra[numbArr + 1] = arra[numbArr];
                    arra[numbArr] = zamenaArr;
                    click++;
                    console.log(numbArr-3*poY);
                }
                if (arra[numbArr - 1] === 16&&numbArr!==poY*4&&arra[numbArr]!==undefined) {
                    let cell = new Cell(poX, poY, arra[numbArr]);
                    zamenaArr = arra[numbArr - 1];
                    arra[numbArr - 1] = arra[numbArr];
                    arra[numbArr] = zamenaArr;
                    click++;
                }
                if (arra[numbArr + 4] === 16) {
                    let cell = new Cell(poX, poY, arra[numbArr]);
                    zamenaArr = arra[numbArr + 4];
                    arra[numbArr + 4] = arra[numbArr];
                    arra[numbArr] = zamenaArr;
                    click++;
                }
                if (arra[numbArr - 4] === 16) {
                    let cell = new Cell(poX, poY, arra[numbArr]);
                    zamenaArr = arra[numbArr - 4];
                    arra[numbArr - 4] = arra[numbArr];
                    arra[numbArr] = zamenaArr;
                    click++;
                }
                point = click;

            };

            var endGame=document.getElementById("endGame");
            endGame.onclick=function (e) {
                var trueReply=0;
                for(i=0;i<=15;i++)
                if(arra[i]===i+1) {
                    trueReply++;
                    console.log(trueReply, arra[i], i + 1);
                }
                if(trueReply===16){
                clearInterval(timer);
                context.fillStyle = "#125";
                context.fillRect(0, 0, 400, 400);
                context.font="30px Ariel";
                context.fillStyle = "#FFFFFF";
                context.fillText("Ура,ты собрал все",40,140);
                context.fillText("Количество кликов:",40,180);
                context.fillText(point,300,180);
                }
            }
        }, 1000 / fps);




    }

};



