const cvw = document.body.clientWidth
const cvh = document.body.clientHeight

let N, timePrev, timeNow, dt, canvas, ctx



//Objects

let stars = Values.stars()


const SHOWSQUARES = 0
const SHOWCIRCLES = 1
let starsShape = 0




let myplayer;
let debug
let times = new Times()


let tremolo = {
  size: 0,
  tStart: times.tTremolos
}



// Values
let colors = Values.colors()
let speeds = Values.speeds()
let sizes = Values.sizes()

// Lyrics
const lyrics = Values.primaryLyrics()
const secondaryLyrics = Values.secondaryLyrics()
const ternaryLyrics = Values.ternaryLyrics()


let keyPressedMap = {}






function init() {
  N = 50
  timePrev = 0
  myplayer = new Player('music/hello.mp3')
  initCanvas()
  debug = new DebugWindow(ctx)
  initStars()
  window.requestAnimationFrame(() => { update(); render() })
  lyrics.t = times.primaryLyrics

  
}

// INITATORS
function initCanvas() {
  canvas = document.querySelector("canvas");
  canvas.width = cvw;
  canvas.height = cvh;
  ctx = canvas.getContext("2d");
}

function initStars() {
  for (var i = 0; i < N; ++i) {
    stars.front.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: 0.5 + Math.random() * 2,
    });
  }
  for (var i = 0; i < N; ++i) {
    stars.back.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: 4 + Math.random() * 1
    });
  }
  for (var i = 0; i < 8000; ++i) {
    stars.far.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: 80 + Math.random() * 1
    });
  }
}


function saveSpeeds() {
  speeds.saved = {
    start: myplayer.timeSong,
    end: myplayer.timeSong + 2000,
    vertical: speeds.vertical.speed,
    horizontal: speeds.horizontal.speed,
    radius: speeds.radius.speed,
    angular: speeds.angular.speed,
    oscillatorySpeedX: speeds.oscillatorySpeedX.speed,
    oscillatorySpeedY: speeds.oscillatorySpeedY.speed
  }
}

// UPDATORS
function updateStarsFront(dt) {
  for (star in stars.front) {
    var star = stars.front[star];

    const constantHorizontalSpeed = speeds.horizontal.speed / star.z
    const constantVerticalSpeed = speeds.vertical.speed / star.z

    speeds.oscillatorySpeedX.speed = speeds.radius.speed * Math.cos(speeds.angular.speed * timeNow / 1000)
    speeds.oscillatorySpeedY.speed = speeds.radius.speed * Math.sin(speeds.angular.speed * timeNow / 1000)

    star.x += constantHorizontalSpeed * dt + speeds.oscillatorySpeedX.speed
    star.y += constantVerticalSpeed * dt + speeds.oscillatorySpeedY.speed

    if (star.y > canvas.height) { star.y = star.y % canvas.height } else if (star.y < 0) { star.y = canvas.height + (star.y % canvas.height) }
    if (star.x > canvas.width) { star.x = star.x % canvas.width } else if (star.x < 0) { star.x = canvas.width + (star.x % canvas.width) }
  }
}

function updateStarsBack(dt) {
  for (star in stars.back) {
    var star = stars.back[star];

    const constantHorizontalSpeed = speeds.horizontal.speed / star.z
    const constantVerticalSpeed = speeds.vertical.speed / star.z

    speeds.oscillatorySpeedX.speed = speeds.radius.speed * Math.cos(speeds.angular.speed * timeNow / 1000)
    speeds.oscillatorySpeedY.speed = speeds.radius.speed * Math.sin(speeds.angular.speed * timeNow / 1000)

    star.x += constantHorizontalSpeed * dt + speeds.oscillatorySpeedX.speed
    star.y += constantVerticalSpeed * dt + speeds.oscillatorySpeedY.speed

    if (star.y > canvas.height) { star.y = star.y % canvas.height } else if (star.y < 0) { star.y = canvas.height + (star.y % canvas.height) }
    if (star.x > canvas.width) { star.x = star.x % canvas.width } else if (star.x < 0) { star.x = canvas.width + (star.x % canvas.width) }
  }
}

function updateStarsFarBack(dt) {
  for (star in stars.far) {
    var star = stars.far[star];
    const starSpeed = speeds.vertical.to / star.z

    star.y += starSpeed * 10 * dt
    if (star.y > canvas.height) { star.y = star.y % canvas.height } else if (star.y < 0) { star.y = canvas.height + (star.y % canvas.height) }
    if (star.x > canvas.width) { star.x = star.x % canvas.width } else if (star.x < 0) { star.x = canvas.width + (star.x % canvas.width) }
  }
}


function drawLyrics() {
  ctx.font = "70px arial";
  ctx.textAlign = "start"

  const textSize = ctx.measureText(lyrics.iLyrics.currentVerse).width



  const d = 0
  const colors = [lyrics.color3.rgb, lyrics.color2.rgb, lyrics.color.rgb]

  for (c in colors) {
    ctx.fillStyle = colors[c]
    const x = lyrics.positions[c].x - textSize / 2 + d * c
    const y = lyrics.positions[c].y + d * c
    ctx.fillText(lyrics.iLyrics.currentTextBuffer, x, y);

  }


}

function drawSecondaryLyrics() {
  if (myplayer.timeSong >= times.tStartSecondaryLyrics && myplayer.timeSong <= times.tEndSecondaryLyrics ||
    myplayer.timeSong >= times.tStartSecondaryLyrics2 && myplayer.timeSong <= times.tEndSecondaryLyrics2
  ) {
    ctx.font = "50px arial";
    ctx.textAlign = "center"
    for (i in secondaryLyrics.content) {
      const lyric = secondaryLyrics.content[i]
      if (myplayer.timeSong >= lyric.tStart) {
        ctx.fillStyle = secondaryLyrics.color.rgb_a(lyric.alpha)
        ctx.fillText(lyric.text, lyric.position.x, lyric.position.y);
      }
    }
  }
}

function isAnyOfThisIntervals(intervals) {
  var veredicto = false
  intervals.forEach(t => { if (myplayer.timeSong >= t && myplayer.timeSong <= t + 1500) veredicto = t })
  return veredicto

}

function drawTernaryLyrics() {
  if (ternaryLyrics.shouldDraw) {
    ctx.font = "40px arial";
    ctx.textAlign = "center"
    ctx.fillStyle = ternaryLyrics.color.rgb_a(ternaryLyrics.alpha);
    ctx.fillText(ternaryLyrics.text, ternaryLyrics.position.x, ternaryLyrics.position.y);
  }
}

function drawStarsFront(stars) {
  ctx.fillStyle = colors.starsFront.color.rgb;
  for (i in stars) {
    ctx.fillStyle = colors.starsFront.color.rgb;
    var star = stars[i];

    const oscillation = Math.cos(myplayer.timeSong / 100 + Math.PI)

    const constantoscillation = sizes.oscillator * Math.cos(myplayer.timeSong / 100 + i * Math.PI / 2)
    const poingOscillation = tremolo.size * oscillation
    const size = sizes.frontMax / star.z + constantoscillation + poingOscillation

    switch (starsShape) {
      case SHOWSQUARES:
        ctx.fillRect(star.x - size / 2, star.y - size / 2, size, size);
        break
      case SHOWCIRCLES:
        drawCircle(star.x, star.y, size / 2, colors.starsFront.color.rgb)
        break

    }
  }
}

function drawCircle(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawStarsBack(stars) {
  ctx.fillStyle = colors.starsBack.color.rgb
  for (i in stars) {
    var star = stars[i];

    const oscillation = Math.cos(myplayer.timeSong / 100 + Math.PI)
    const constantoscillation = sizes.oscillator * Math.cos(myplayer.timeSong / 100 + i * Math.PI / 2)
    const poingOscillation = tremolo.size * oscillation
    const size = sizes.backMax / star.z + constantoscillation + poingOscillation

    switch (starsShape) {
      case SHOWSQUARES:
        ctx.fillRect(star.x - size / 2, star.y - size / 2, size, size);
        break
      case SHOWCIRCLES:
        drawCircle(star.x, star.y, size / 2, colors.starsFront.color.rgb)
        break

    }
  }
}

function drawStarsFarBack(stars) {
  ctx.fillStyle = colors.starsFront.color.rgb
  for (star in stars) {

    // ROMAN here bitte
    const size = 0.3
    star = stars[star];
    ctx.fillRect(star.x, star.y, size, size);
  }
}

function drawBackground() {
  ctx.fillStyle = colors.background.color.rgb;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateResetAllSpeedsTransition() {
  const start = speeds.saved.start
  const end = start + 5000

  speeds.keys.vertical = transition(speeds.saved.vertical, 0, start, end)
  speeds.keys.horizontal = transition(speeds.saved.horizontal, 0, start, end)
  speeds.keys.radius = transition(speeds.saved.radius, 0, start, end)
  speeds.keys.angular = transition(speeds.saved.angular, 0, start, end)
  speeds.keys.oscillatorySpeedX = transition(speeds.saved.oscillatorySpeedX, 0, start, end)
  speeds.keys.oscillatorySpeedY = transition(speeds.saved.oscillatorySpeedY, 0, start, end)

  if (myplayer.timeSong > end) speeds.reset = false
}

function transition(from, to, start, end) {
  const acceleration = (to - from) / (end - start)
  return from + (acceleration * (Math.min(Math.max(parseFloat(myplayer.timeSong), start), end) - start))
}

function colorTransition(from, to, start, end) {
  const colorSpeed = to.minus(from).divided(end - start)
  return from.plus(colorSpeed.multiplied(Math.min(Math.max(parseFloat(myplayer.timeSong), start), end) - start))
}

function updateHorizontalSpeed() {
  const toLeft1 = transition(0, speeds.horizontal.increment, times.tToLeftSpeed, times.tToLeftSpeed + 3000)
  const toLeft2 = transition(0, speeds.horizontal.increment, times.tToLeftSpeed2, times.tToLeftSpeed2 + 3000)
  const toLeft3 = transition(0, speeds.horizontal.increment, times.tToLeftSpeed3, times.tToLeftSpeed3 + 3000)
  const toLeft4 = transition(0, speeds.horizontal.increment, times.tToLeftSpeed4, times.tToLeftSpeed4 + 3000)
  const resetToLeft = transition(0, -4 * speeds.horizontal.increment, times.tToDown, times.tToLeftSpeedEnd)
  const leftTransition1 = toLeft1 + toLeft2 + toLeft3 + toLeft4 + resetToLeft

  // FINAL
  const toLeftFinal = transition(0, 3, times.tTornado, times.tToLeftSpeedFinalEnd)
  const resetToLeftFinal = transition(0, -3, times.tToLeftSpeedFinalEnd, times.tFinal)
  const leftTransition2 = toLeftFinal + resetToLeftFinal
  speeds.horizontal.speed = speeds.keys.horizontal + leftTransition1 + leftTransition2
}

function updateVerticalSpeed() {
  const introSpeed = transition(speeds.vertical.from, speeds.vertical.to, 0, times.tEndIntro)
  const goDown = transition(0, +0.02, times.tToDown, times.tToLeftSpeedEnd)
  const goUp = transition(0, -3, times.tToLeftSpeedFinalEnd, times.tFinal + 1000)
  speeds.vertical.speed = introSpeed + speeds.keys.vertical + goDown + goUp
}

function updateOscillatorySpeeds() {
  speeds.angular.speed = speeds.keys.angular + transition(speeds.angular.from, speeds.angular.to, times.tEndTremolo , times.tEndTremolo + 10000)
  speeds.radius.speed = speeds.keys.radius + transition(speeds.radius.from, speeds.radius.to, times.tEndTremolo , times.tEndTremolo + 40000)
  // speeds.angular.speed = speeds.keys.angular + transition(speeds.angular.from, 0, times.tEndTremolo, times.tEndTremolo + 10000)
  // speeds.radius.speed = speeds.keys.radius + transition(speeds.radius.from, 0, times.tEndTremolo, times.tEndTremolo + 20000)

  speeds.oscillatorySpeedX.speed = speeds.keys.oscillatorySpeedX
  speeds.oscillatorySpeedY.speed = speeds.keys.oscillatorySpeedX
}

function updateSpeeds() {

  updateSpeedsKeyPressed()
  if (speeds.reset) updateResetAllSpeedsTransition()

  updateVerticalSpeed()
  updateHorizontalSpeed()
  updateOscillatorySpeeds()

}
function updateColors() {

  // 1st transition (black - white)
  if (myplayer.timeSong <= times.tStartChangeColor2) {
    colors.background.color = colorTransition(colors.background.from, colors.background.to, times.tStartChangeColor, times.tEndChangeColor)
    colors.starsFront.color = colorTransition(colors.starsFront.from, colors.starsFront.to, times.tStartChangeColor, times.tEndChangeColor)
    colors.starsBack.color = colorTransition(colors.starsBack.from, colors.starsBack.to, times.tStartChangeColor, times.tEndChangeColor)
  } else if (myplayer.timeSong <= times.tStartChangeColor3) {
    // 2n transition (white - blue)
    colors.background.color = colorTransition(colors.background.to, colors.background.to2, times.tStartChangeColor2, times.tEndChangeColor2)
    colors.starsFront.color = colorTransition(colors.starsFront.to, colors.starsFront.to2, times.tStartChangeColor2, times.tEndChangeColor2)
    colors.starsBack.color = colorTransition(colors.starsBack.to, colors.starsBack.to2, times.tStartChangeColor2, times.tEndChangeColor2)
  } else if (myplayer.timeSong <= times.tStartChangeColor4) {
    // 3rd transition (black - white)
    colors.background.color = colorTransition(colors.background.to2, colors.background.to, times.tStartChangeColor3, times.tEndChangeColor3)
    colors.starsFront.color = colorTransition(colors.starsFront.to2, colors.starsFront.to, times.tStartChangeColor3, times.tEndChangeColor3)
    colors.starsBack.color = colorTransition(colors.starsBack.to2, colors.starsBack.to, times.tStartChangeColor3, times.tEndChangeColor3)
  } else {
    colors.background.color = colorTransition(colors.background.to, colors.background.from, times.tStartChangeColor4, times.tEndChangeColor4)
    colors.starsFront.color = colorTransition(colors.starsFront.to, colors.starsFront.from, times.tStartChangeColor4, times.tEndChangeColor4)
    colors.starsBack.color = colorTransition(colors.starsBack.to, colors.starsBack.from, times.tStartChangeColor4, times.tEndChangeColor4)
  }
}

function updateSpeedsKeyPressed() {
  const ctrlPressed = keyPressedMap[17] || false
  const leftPressed = keyPressedMap[37] || false
  const upPressed = keyPressedMap[38] || false
  const rightPressed = keyPressedMap[39] || false
  const downPressed = keyPressedMap[40] || false

  const boost = 0.005

  if (!ctrlPressed) {
    speeds.vertical.speed +=
      speeds.keys.vertical += boost * (downPressed - upPressed)
    speeds.keys.horizontal += boost * (rightPressed - leftPressed)
  } else {
    speeds.keys.radius += boost * (downPressed - upPressed)
    speeds.keys.angular += boost * (rightPressed - leftPressed)
  }
}

function updateShape() {
  let shape = 0
  if (myplayer.timeSong >= times.tChangeShape && myplayer.timeSong <= times.tChangeShape2) {
    shape = 1
  } else if (myplayer.timeSong >= times.tChangeShape2) {
    shape = 0
  }
  stars.shape = shape
}

function triggerNextLyric() {
  lyrics.iLyrics.nextWord()
  lyrics.isFadingOut = true
  lyrics.color.alpha = 1
  lyrics.color2.alpha = 1
  lyrics.color3.alpha = 1
  lyrics.index++
}

function updateLyrics() {
  if (lyrics.test && myplayer.timeSong >= lyrics.t[0]) {
    lyrics.t.shift()
    triggerNextLyric()
  }

  if (lyrics.isFadingOut) {
    lyrics.color.alpha -= 0.01
    lyrics.color2.alpha -= 0.009
    lyrics.color3.alpha -= 0.008
    if (lyrics.color3.alpha <= 0) lyrics.isFadingOut = false
  }
  const pos = []
  for (i = 0; i < 3; ++i) {
    const t = timeNow + i * 150
    pos.push({
      x: canvas.width / 2 + Math.cos(t / 1000) * 20,
      y: canvas.height / 2 + Math.sin(t / 1000) * 10

    })
  }
  lyrics.positions = pos

}

function updateSecondaryLyrics() {
  if (myplayer.timeSong >= times.tStartSecondaryLyrics && myplayer.timeSong <= times.tEndSecondaryLyrics ||
    myplayer.timeSong >= times.tStartSecondaryLyrics2 && myplayer.timeSong <= times.tEndSecondaryLyrics2
  ) {
    for (i in secondaryLyrics.content) {
      const lyric = secondaryLyrics.content[i]
      const start = lyric.tStart
      const end = start + 2500
      if (myplayer.timeSong >= start) {
        lyric.position.y = transition(cvh + 20, cvh - 500, start, end)
        lyric.alpha = transition(1, 0, start, end)
      }
    }
  }
}

function updateTremoloSize() {
  const maxSizeoscillator = 6

  if (myplayer.timeSong <= times.tClimaxTremolo)
    sizes.oscillator = transition(0, maxSizeoscillator, times.tStartTremolo, times.tClimaxTremolo)
  else
    sizes.oscillator = transition(maxSizeoscillator, 0, times.tClimaxTremolo, times.tEndTremolo)

  shouldTremolo = isAnyOfThisIntervals(tremolo.tStart)
  if (shouldTremolo) {
    const start = shouldTremolo
    const end = start + 1600
    if (myplayer.timeSong >= start) {
      tremolo.size = transition(3, 0, start, end)
    }
  }
}

function updateTernaryLyrics() {
  ternaryLyrics.shouldDraw = isAnyOfThisIntervals(ternaryLyrics.tStart)

  if (ternaryLyrics.position.x == null) {
    ternaryLyrics.position.x = cvw / 3 + Math.random() * cvw * 2 / 3
  }
  if (!ternaryLyrics.shouldDraw) ternaryLyrics.position.x = null

  if (ternaryLyrics.shouldDraw) {
    const start = ternaryLyrics.shouldDraw
    const end = start + 1500
    if (myplayer.timeSong >= start) {
      ternaryLyrics.position.y = transition(cvh, cvh - 200, start, end)
      ternaryLyrics.alpha = transition(1, 0, start, end)
    }
  }
}


//UPDATE
function update() {
  timeNow = performance.now()
  dt = timeNow - timePrev
  timePrev = timeNow

  myplayer.update(timeNow)

  if (myplayer.started) {
    updateSpeeds()
    updateColors()
  }

  // UPDATE LYRICS
  updateLyrics()
  updateSecondaryLyrics()
  updateTernaryLyrics()

  updateTremoloSize()
  updateShape()


  // UPDATE STARS
  if (stars.drawFar)
    updateStarsFarBack(dt)
  updateStarsBack(dt)
  updateStarsFront(dt)
}

//RENDER
function render() {
  drawBackground()
  if (stars.drawFar) drawStarsFarBack(stars.far)
  drawStarsBack(stars.back)
  drawLyrics()
  drawStarsFront(stars.front)
  drawSecondaryLyrics()
  drawTernaryLyrics()
  debug.render()
  capturer.capture(canvas);
  window.requestAnimationFrame(() => { update(); render() });
}


isRecording = false
var capturer = new CCapture({ format: 'webm' });


// document.addEventListener('mousedown', () => {
//   if (!isRecording) {
//     capturer.start()
//     console.log('Recording')
//   }
//   else {
//     console.log('Saving...')
//     capturer.stop()
//     capturer.save()
//     console.log('Saved')
//   }
//   isRecording = !isRecording
// })

init()