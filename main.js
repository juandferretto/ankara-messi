const img = document.getElementsByTagName('img');
let seconds;

let mX, mY, distance, $distance = $('#distancia span'), $element = $('#img-messi');

function calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.width() / 2)), 2) + Math.pow(mouseY - (elem.offset().top + (elem.height() / 2)), 2)));
}

$(document).mousemove(function (e) {
    mX = e.pageX;
    mY = e.pageY;
    distance = calculateDistance($element, mX, mY);
    $distance.text(distance);
});

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

    img[0].addEventListener('click', () => {
        img[0].style.opacity = 1;
        const audio = document.getElementsByTagName('audio')[0];
        const win = document.getElementById("win");
        audio.play();
        win.style.display = 'block';
        document.getElementById('time').style.display = 'none';
    })

    refreshTime();
}

function refreshTime() {

    document.getElementById('time').innerText = seconds + " segundos";

    if (seconds === 0) {
        document.getElementById('lost').style.display = 'block';
        document.getElementById('time').style.display = 'none';
        img[0].style.opacity = 1;
    } else {
        seconds--;
        setTimeout(() => {
            refreshTime()
        }, 1000);
    }

}

document.getElementById('initGame').addEventListener('click', initGame);
