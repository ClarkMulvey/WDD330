let isXTurn = false;
// let clickCell = () =>{
//     cell0.addEventListener('click', function user(){
//         players(cell0);
//     });
// }

let cell0 = document.querySelector(".cell0");
let cell1 = document.querySelector(".cell1");
let cell2 = document.querySelector(".cell2");
let cell3 = document.querySelector(".cell3");
let cell4 = document.querySelector(".cell4");
let cell5 = document.querySelector(".cell5");
let cell6 = document.querySelector(".cell6");
let cell7 = document.querySelector(".cell7");
let cell8 = document.querySelector(".cell8");

let plyers=(cell)=>{
    if(isXTurn == false){
        cell.innerHTML = "X";
        isXTurn = !isXTurn;
    }else{
        cell.innerHTML = "O";
        isXTurn = !isXTurn;
    }
}

//cell0.addEventListener('click',plyers(cell0));

cell0.addEventListener('click', ()=>{
if(isXTurn == false){
    cell0.innerHTML = "X";
    isXTurn = !isXTurn;
}else{
    cell0.innerHTML = "O";
    isXTurn = !isXTurn;
}});

cell1.addEventListener('click', ()=>{
    if(isXTurn == false){
        cell1.innerHTML = "X";
        isXTurn = !isXTurn;
    }else{
        cell1.innerHTML = "O";
        isXTurn = !isXTurn;
    }});
cell2.addEventListener('click', ()=>{
    if(isXTurn == false){
        cell2.innerHTML = "X";
        isXTurn = !isXTurn;
    }else{
        cell2.innerHTML = "O";
        isXTurn = !isXTurn;
    }});
cell3.addEventListener('click', ()=>{
    if(isXTurn == false){
        cell3.innerHTML = "X";
        isXTurn = !isXTurn;
    }else{
        cell3.innerHTML = "O";
        isXTurn = !isXTurn;
    }});
cell4.addEventListener('click', ()=>{
    if(isXTurn == false){
        cell4.innerHTML = "X";
        isXTurn = !isXTurn;
    }else{
        cell4.innerHTML = "O";
        isXTurn = !isXTurn;
    }});
cell5.addEventListener('click', ()=>{
    if(isXTurn == false){
        cell5.innerHTML = "X";
        isXTurn = !isXTurn;
    }else{
        cell5.innerHTML = "O";
        isXTurn = !isXTurn;
    }});
cell6.addEventListener('click', ()=>{
    if(isXTurn == false){
        cell6.innerHTML = "X";
        isXTurn = !isXTurn;
    }else{
        cell6.innerHTML = "O";
        isXTurn = !isXTurn;
    }});
cell7.addEventListener('click', ()=>{
    if(isXTurn == false){
        cell7.innerHTML = "X";
        isXTurn = !isXTurn;
    }else{
        cell7.innerHTML = "O";
        isXTurn = !isXTurn;
    }});
cell8.addEventListener('click', ()=>{
    if(isXTurn == false){
        cell8.innerHTML = "X";
        isXTurn = !isXTurn;
    }else{
        cell8.innerHTML = "O";
        isXTurn = !isXTurn;
    }});

let resetGame = () =>{
    cell0.innerHTML = "";
    cell1.innerHTML = "";
    cell2.innerHTML = "";
    cell3.innerHTML = "";
    cell4.innerHTML = "";
    cell5.innerHTML = "";
    cell6.innerHTML = "";
    cell7.innerHTML = "";
    cell8.innerHTML = "";

}