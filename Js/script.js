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
    
}
/*let cell=new Cell(9,4);
console.log(cell.getX()*100+5);
console.log(cell.getY()*100+5);
*/
var canvas=document.getElementById("Pazl");
    canvas.width=400;
    canvas.height=400;
    var context=canvas.getContext("2d");
    context.fillStyle="#125";
    context.fillRect(0,0,canvas.width,canvas.height);
    var x,y;
function drawCell(x,y,a) {

        context.fillStyle = "#FFD700";
        context.fillRect(x * 100 + 5, y * 100 + 5, 90, 90);
        context.fillStyle = "#165";
        context.fillText(a, x * 100 + 35, y * 100 + 40);
        if(a===16){
            context.fillStyle="#125";
            context.fillRect(x*100+5,y*100+5,90,90);
        }


}
    context.font="30px Ariel";
var fps=60;
var timer=setInterval(function () {
    var numb = 0;
    // console.log("Перерисовка",arr);
    for (y = 0; y <= 3; y++) {
        for (x = 0; x <= 3; x++) {
                let cell=new Cell(arr[numb],numb);
                drawCell(cell.getX(), cell.getY(), arr[numb]);
                numb += 1;
        }
    }

},1000/fps);
Pazl.onclick=function (e) {
    var poY,poX,zamena,numbArr;
    poY=Math.floor(e.clientY/100);
    poX=Math.floor(e.clientX/100);
    numbArr=poY*4+poX;
    console.log("Квадрат ",poY,poX,arr[numbArr]);
    //Лево
    if(arr[poY*4+poX+1]===16){
        console.log("Работает",poX,poY);
       drawCell(poX+1,poY,arr[numbArr]);
       zamena=arr[numbArr+1];
       arr[numbArr+1]=arr[numbArr];
       arr[numbArr]=zamena;
    }
    //Право
    if(arr[numbArr-1]===16){
        console.log("Работает",poX,poY);
        drawCell(poX-1,poY,arr[numbArr]);
        zamena=arr[numbArr-1];
        arr[numbArr-1]=arr[numbArr];
        arr[numbArr]=zamena;
    }
    //Низ
    if(arr[numbArr+4]===16){
        console.log("Работает",poX,poY);
        drawCell(poX,poY+1,arr[numbArr]);
        zamena=arr[numbArr+4];
        arr[numbArr+4]=arr[numbArr];
        arr[numbArr]=zamena;
    }
    //Верх
    if(arr[numbArr-4]===16){
        console.log("Работает",poX,poY);
        drawCell(poX,poY-1,arr[numbArr]);
        zamena=arr[numbArr-4];
        arr[numbArr-4]=arr[numbArr];
        arr[numbArr]=zamena;
    }
};
