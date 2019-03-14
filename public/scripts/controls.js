const onKeyDown = (e) => {
    // console.log(e)
    switch (e.code) {
        case 'Digit0':
            player.goTo(0)
            iLyrics.reset()
            break;
        case 'Digit1':
            player.goTo(times.tStartChangeColor)
            break;
        case 'Digit2':
            player.goTo(ternaryLyrics.tStart[0] - 500)
            break;
        case 'Digit3':
            player.goTo(times.tStartChangeColor2 - 500)
            break;
        case 'Digit4':
            player.goTo(times.tPlatillos - 1000)
            break;
        case 'Digit5':
            player.goTo(times.tToLeftSpeed - 1000)
            break;
        case 'Digit6':
            player.goTo(times.tStartTremolo - 1000)
            break;
        case 'Digit7':
            player.goTo(times.tEndTremolo - 1000)
            break;
        case 'Digit8':
            player.goTo(times.tTornado - 1000)
            break;
        case 'Space':
            numbersInput.value = numbersInput.value + ' ' + player.timeSong.toFixed(0)
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
            console.log(player.timeSong)
            break;
        case 'KeyD':
            debug.toggle()
            break;
        case 'KeyL':
            lyrics.test = !lyrics.test
            break;
        case 'KeyQ':
            sizeoscillator += 0.5
            break;
        case 'KeyA':
            sizeoscillator -= 0.5
            break;
        case 'KeyS':
            player.togglePaused(timeNow)
            break;
        case 'KeyC':
            starsShape = (starsShape + 1) % 2
            break
        case 'KeyP':
            player.goTo(player.timeSong + 3000)
            break
        case 'KeyO':
            player.goTo(player.timeSong - 3000)
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

