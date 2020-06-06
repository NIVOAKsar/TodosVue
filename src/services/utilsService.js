import mongoose from 'mongoose'

export function loadStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function saveStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function makeObjectId() {
    return new mongoose.Types.ObjectId().toHexString()
}

export function makeId(length = 4) {
    let txt = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}



export function setCountDown(ms) {
    let print = () => {
        min = min < 10 ? '0' + min : '' + min;
        sec = sec < 10 ? '0' + sec : '' + sec;
        console.log(`${min}:${sec}`);
    }
    let sec = Math.floor(ms / 1000);
    let min = Math.floor(ms / 60000);
    let timer = setInterval(() => {
        if (ms <= 0) clearInterval(timer)
        print(min, sec)
        ms -= 1000
        sec = Math.floor(ms / 1000);
        min = Math.floor(ms / 60000);
    }, 1000)
}

export function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function setLoader(prm, timer = 0) {
    let timerPRM = new Promise((_, reject) => setTimeout(reject, timer));
    return Promise.race([prm, timerPRM]);
}

export function copyToClipBoard(str) {
    let el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}