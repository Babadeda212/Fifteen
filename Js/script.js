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
var arr = [];
for (var i = 0 ; i <=14; i++)
    arr.push(i+1);
console.log(arr);
shuffle(arr);
arr.push(16);
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
    context.fillRect(0,0,canvas.width,canvas.height);
    context.font="30px Ariel";
var button=0;
    context.fillStyle="#FFD700";
    context.fillRect(98,100,200,100);
    context.fillStyle="#165";
    context.fillText("Начать игру",110,150,200);

Pazl.onclick=function (e) {
    var pY, pX, button = 0;
    pY = Math.floor(e.clientY / 100);
    pX = Math.floor(e.clientX / 100);
    console.log("Начать игру",pX,pY,e.clientX,e.clientY );
    if (pX === 1 || pX === 2 )
        if(pY===1)
        button += 1;
    if (button === 1) {
        context.fillStyle="#125";
        context.fillRect(0,0,canvas.width,canvas.height);
        var fps = 60;
        var timer = setInterval(function () {
            var numb;
            for (numb = 0; numb <= 15; numb++) {
                let cell = new Cell(arr[numb], numb);
                cell.drawCell();
            }
        }, 1000 / fps);

        Pazl.onclick = function (e) {
            var poY, poX, zamena, numbArr;
            poY = Math.floor(e.clientY / 100);
            poX = Math.floor(e.clientX / 100);
            numbArr = poY * 4 + poX;
            console.log("Квадрат ", poY, poX, arr[numbArr]);
            //Лево
            if (arr[numbArr + 1] === 16) {
                let cell = new Cell(arr[numbArr], numbArr );
                zamena = arr[numbArr + 1];
                arr[numbArr + 1] = arr[numbArr];
                arr[numbArr] = zamena;
            }
            //Право
            if (arr[numbArr - 1] === 16) {
                let cell = new Cell(arr[numbArr], numbArr );
                zamena = arr[numbArr - 1];
                arr[numbArr - 1] = arr[numbArr];
                arr[numbArr] = zamena;
            }
            //Низ
            if (arr[numbArr + 4] === 16) {
                let cell = new Cell(arr[numbArr], numbArr );
                zamena = arr[numbArr + 4];
                arr[numbArr + 4] = arr[numbArr];
                arr[numbArr] = zamena;
            }
            //Верх
            if (arr[numbArr - 4] === 16) {
                let cell = new Cell(arr[numbArr], numbArr);
                zamena = arr[numbArr - 4];
                arr[numbArr - 4] = arr[numbArr];
                arr[numbArr] = zamena;
            }
        }
    }
};
