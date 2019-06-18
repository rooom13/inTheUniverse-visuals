const onKeyDown = (e) => {
    // console.log(e)
    switch (e.code) {
        case 'Digit0':
            myplayer.goTo(0)
            lyrics.iLyrics.reset()
            lyrics.index = 0

            break;
        case 'Digit1':
            myplayer.goTo(times.tStartChangeColor)
            break;
        case 'Digit2':
            myplayer.goTo(ternaryLyrics.tStart[0] - 500)
            break;
        case 'Digit3':
            myplayer.goTo(times.tStartChangeColor2 - 500)
            break;
        case 'Digit4':
            myplayer.goTo(times.tPlatillos - 1000)
            break;
        case 'Digit5':
            myplayer.goTo(times.tToLeftSpeed - 1000)
            break;
        case 'Digit6':
            myplayer.goTo(times.tStartTremolo - 1000)
            break;
        case 'Digit7':
            myplayer.goTo(times.tEndTremolo - 1000)
            break;
        case 'Digit8':
            myplayer.goTo(times.tTornado - 1000)
            break;
        case 'Space':
            numbersInput.value = numbersInput.value + ' ' + myplayer.timeSong.toFixed(0)
            triggerNextLyric()
            break;
        case 'KeyB':
            stars.drawFar = !stars.drawFar
            break;
        case 'KeyM':
            lyrics.noise -= 0.5
            break;
        case 'KeyN':
            lyrics.noise += 0.5
            break;
        case 'KeyT':
            console.log(myplayer.timeSong)
            break;
        case 'KeyD':
            debug.toggle()
            break;
        case 'KeyL':
            lyrics.test = !lyrics.test
            break;
        case 'KeyS':
            myplayer.togglePaused(timeNow)
            break;
        case 'KeyC':
            starsShape = (starsShape + 1) % 2
            break
        case 'KeyP':
            myplayer.goTo(myplayer.timeSong + 3000)
            break
        case 'KeyO':
            myplayer.goTo(myplayer.timeSong - 3000)
            break
        case 'KeyR':
            saveSpeeds()
            speeds.reset = true
            break
        case 'KeyA':
            myplayer._music.playbackRate += 0.1
            console.log(myplayer._music.playbackRate)

            break
        case 'KeyZ':
            myplayer._music.playbackRate -= 0.1
            console.log(myplayer._music.playbackRate)
            break
    }
}

document.addEventListener('mousedown', () => myplayer.togglePaused(timeNow))
document.addEventListener("keydown", onKeyDown);
onkeydown = onkeyup = function (e) {
    e = e || event; // to deal with IE
    keyPressedMap[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
}

