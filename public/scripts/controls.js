const onKeyDown = (e) => {
    // console.log(e)
    switch (e.code) {
        case 'Digit0':
            travelTo(0)
            iLyrics.reset()
            break;
        case 'Digit1':
            travelTo(times.tStartChangeColor)
            break;
        case 'Digit2':
            travelTo(ternaryLyrics.tStart[0] - 500)
            break;
        case 'Digit3':
            travelTo(times.tStartChangeColor2 - 500)
            break;
        case 'Digit4':
            travelTo(times.tPlatillos - 1000)
            break;
        case 'Digit5':
            travelTo(times.tToLeftSpeed - 1000)
            break;
        case 'Digit6':
            travelTo(times.tStartTremolo - 1000)
            break;
        case 'Digit7':
            travelTo(times.tEndTremolo - 1000)
            break;
        case 'Digit8':
            travelTo(times.tTornado - 1000)
            break;
        case 'Space':
            numbersInput.value = numbersInput.value + ' ' + timeSong.toFixed(0)
            triggerNextLyric()
            break;
        case 'KeyB':
            farBackStars = !farBackStars
            break;
        case 'KeyM':
            lyrics.position.noise -= 0.5
            break;
        case 'KeyN':
            lyrics.position.noise += 0.5
            break;
        case 'KeyT':
            console.log(timeSong)
            break;
        case 'KeyD':
            debug.toggle()
            break;
        case 'KeyL':
            lyrics.test = !lyrics.test
            break;
        case 'KeyQ':
            // sizeFrontMax += 3
            sizeoscillator += 0.5
            break;
        case 'KeyA':
            sizeoscillator -= 0.5
            // sizeFrontMax-=3
            break;
        case 'KeyS':
            start()
            break;
        case 'KeyC':
            starsShape = (starsShape + 1) % 2
            break
        case 'KeyP':
            travelTo(timeSong + 3000)
            break
        case 'KeyO':
            travelTo(timeSong - 3000)
            break
        case 'KeyR':
            saveSpeeds()
            speeds.reset = true
            break
    }
}
document.addEventListener("keydown", onKeyDown);
onkeydown = onkeyup = function (e) {
    e = e || event; // to deal with IE
    keyPressedMap[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
}

