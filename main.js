const img = document.getElementsByTagName('img');
let seconds;
let time;

let mX, mY, distance, 
    $distance = $('#distancia span'), 
    $element = $('#img-messi');

function calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.width() / 2)), 2) + Math.pow(mouseY - (elem.offset().top + (elem.height() / 2)), 2)));
}

function initGame() {

    seconds = 60;
    document.getElementById('initGame').style.display = 'none';

    const numberBottom = parseInt(Math.random() * 800);
    const numberLeft = parseInt(Math.random() * 850);
    const numberRight = parseInt(Math.random() * 1850);
    const numberForArr = parseInt(Math.random() * 2);
    const arrLR = ['left', 'right'];

    img[0].style.bottom = numberBottom + 'px';
    img[0].style[arrLR[numberForArr]] = arrLR[numberForArr] === 'left' ? (numberLeft + 'px') : (numberRight + 'px');

    $(document).mousemove(function (e) {
        mX = e.pageX;
        mY = e.pageY;
        distance = calculateDistance($element, mX, mY);
        const messi = document.getElementsByTagName('audio')[2];
        
        if(distance > 1500){
            messi.play();
            messi.volume = 0.01;
        }else if(distance > 1000 && distance < 1500){
            messi.play();
            messi.volume = 0.1;
        }else if(distance > 700 && distance < 1000){
            messi.play();
            messi.volume = 0.2;
        }else if(distance > 400 && distance < 700){
            messi.play();
            messi.volume = 0.3;
        }else if(distance > 200 && distance < 400){
            messi.play();
            messi.volume = 0.4;
        }else if(distance > 50 && distance < 200){
            messi.play();
            messi.volume = 0.5;
        }else if(distance > 20 && distance < 50){
            messi.play();
            messi.volume = 0.6;
        }else{
            messi.play();
            messi.volume = 1;
        }
    });

    img[0].addEventListener('click', () => {
        img[0].style.opacity = 1;
        const audio = document.getElementsByTagName('audio')[0];
        const win = document.getElementById("win");
        audio.play();
        win.style.display = 'block';
        document.getElementById('time').style.display = 'none';
        document.getElementsByTagName('audio')[2].remove();
        window.clearTimeout(time);
    })

    refreshTime();
}

function refreshTime() {

    document.getElementById('time').innerText = seconds + " segundos";

    if (seconds === 0) {
        const container = document.getElementById('container-img');
        document.getElementById('lost').style.display = 'block';
        document.getElementById('time').style.display = 'none';
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        document.getElementById('lost-messi').style.display = 'block';
        document.getElementsByTagName('audio')[1].play();
        document.getElementsByTagName('audio')[2].remove();
    } else {
        seconds--;
        time = setTimeout(() => {
            refreshTime()
        }, 1000);
    }

}

document.getElementById('initGame').addEventListener('click', initGame);
