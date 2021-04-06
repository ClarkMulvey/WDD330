function playSound(e){
    const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
    const key = document.querySelector(`div[data-key='${e.keyCode}']`);

    addPlaying(key);
    if(!audio) return;
    // key.style.marginTop = '10px';
    audio.currentTime = 0;
    audio.play();
}

function addPlaying(key){
    key.classList.add('playing');
}

function removePlaying(e){
    const key = document.querySelector(`div[data-key='${e.keyCode}']`);
    key.classList.remove('playing');
}


// function buttonDown(e){
//     const key = document.querySelector(`div[data-key='${e.keyCode}']`);
//     if(i != 10){
//         //margin-top +10;
//         top +=10;
//         key.style.marginTop =  top.toString() + "px";
//     }else{
//         i = 0;
//         //reset the margin;
//         key.style.marginTop = 0;
//     }
// }

window.addEventListener('keyup', removePlaying)
window.addEventListener('keydown', playSound);
//window.addEventListener('keydown', buttonDown);