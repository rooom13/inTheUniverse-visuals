var debug
var N, speed0, speed1, speed, startTime, timePrev, timeNow, dt, canvas, ctx
var songStarted = false
let farBackStars = !true

const SHOWSQUARES = 0
const SHOWCIRCLES = 1

let starsShape = 0

//Objects
var starsFront = [];
var starsBack = [];
var starsFarBack = [];

let iLyrics;
let player;
let times = new Times()

let sizePoingOscillation = 0

let tremolo = {
  size: 0,
  tStart: times.tTremolos
}

let shouldDrawQuieroVolar = false

let sizeFrontMax = 18
let sizeBackMax = 84

const cvw = document.body.clientWidth
const cvh = document.body.clientHeight

let sizeoscillator = 0
function saveSpeeds() {
  speeds.saved = {
    start: player.timeSong,
    end: player.timeSong + 2000,
    vertical: speeds.vertical.speed,
    horizontal: speeds.horizontal.speed,
    radius: speeds.radius.speed,
    angular: speeds.angular.speed,
    oscillatorySpeedX: speeds.oscillatorySpeedX.speed,
    oscillatorySpeedY: speeds.oscillatorySpeedY.speed
  }
}


let colors =  Values.colors()
let speeds = Values.speeds()

const lyrics = {
  test: false,
  isFadingOut: false,
  color: colors.lyrics0,
  position: { x: 0, y: 0, noise: 5 },
  t: []
}

const secondaryLyrics = {
  speed: -3,
  content: [
    {
      text: 'Ven conmigo',
      alpha: 1,
      tStart: times.tStartSecondaryLyrics,
      position: { x: cvw / 5, y: cvh }
    },
    {
      text: 'Ven conmigo',
      alpha: 1,
      tStart: times.tStartSecondaryLyrics_2,
      position: { x: cvw / 2, y: cvh }
    },
    {
      text: 'Ven conmigo',
      alpha: 1,
      tStart: times.tStartSecondaryLyrics_3,
      position: { x: 4 * cvw / 5, y: cvh }
    },
    {
      text: 'Al universo',
      alpha: 1,
      tStart: times.tStartSecondaryLyrics_4,
      position: { x: cvw / 2, y: cvh }

    },
    {
      text: 'ven conmigo',
      alpha: 1,
      tStart: times.tStartSecondaryLyrics_5,
      position: { x: cvw / 2, y: cvh }

    },
    // ROUND 2
    {
      text: 'Ven conmigo',
      alpha: 1,
      tStart: times.tStartSecondaryLyrics2,
      position: { x: cvw / 5, y: cvh }
    },
    {
      text: 'Ven conmigo',
      alpha: 1,
      tStart: times.tStartSecondaryLyrics2_2,
      position: { x: cvw / 2, y: cvh }
    },
    {
      text: 'Ven conmigo',
      alpha: 1,
      tStart: times.tStartSecondaryLyrics2_3,
      position: { x: 4 * cvw / 5, y: cvh }
    },
    {
      text: 'Al universo',
      alpha: 1,
      tStart: times.tStartSecondaryLyrics2_4,
      position: { x: cvw / 2, y: cvh }

    },
    {
      text: 'ven conmigo',
      alpha: 1,
      tStart: times.tStartSecondaryLyrics2_5,
      position: { x: cvw / 2, y: cvh }

    },

  ]
}

const ternaryLyrics = {
  text: 'Quiero volar',
  alpha: 1,
  position: { x: null, y: cvh / 2 },
  tStart: times.tTernaryLyrics
}

var keyPressedMap = {};







function init() {
  N = 50
  timePrev = 0
  player = new Player('music/hello.mp3')
  initCanvas()
  debug = new DebugWindow(ctx)
  initStars()
  iLyrics = new InteractiveLyrics()
  window.requestAnimationFrame(() => { update(); render() })
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
    starsFront.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: 0.5 + Math.random() * 2,
    });
  }
  for (var i = 0; i < N; ++i) {
    starsBack.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: 4 + Math.random() * 1
    });
  }
  for (var i = 0; i < 8000; ++i) {
    starsFarBack.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: 80 + Math.random() * 1
    });
  }
}



// UPDATORS
function updateStarsFront(dt) {
  for (star in starsFront) {
    var star = starsFront[star];

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
  for (star in starsBack) {
    var star = starsBack[star];

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
  for (star in starsFarBack) {
    var star = starsFarBack[star];
    const starSpeed = speeds.vertical.to / star.z

    star.y += starSpeed * 10 * dt
    if (star.y > canvas.height) { star.y = star.y % canvas.height } else if (star.y < 0) { star.y = canvas.height + (star.y % canvas.height) }
    if (star.x > canvas.width) { star.x = star.x % canvas.width } else if (star.x < 0) { star.x = canvas.width + (star.x % canvas.width) }
  }
}


function drawLyrics() {
  ctx.fillStyle = lyrics.color.rgb
  ctx.font = "70px arial";
  ctx.textAlign = "start"

  const textSize = ctx.measureText(iLyrics.currentVerse).width
  ctx.fillText(iLyrics.currentTextBuffer, lyrics.position.x - textSize / 2, lyrics.position.y);
}

function drawSecondaryLyrics() {
  if (player.timeSong >= times.tStartSecondaryLyrics && player.timeSong <= times.tEndSecondaryLyrics ||
    player.timeSong >= times.tStartSecondaryLyrics2 && player.timeSong <= times.tEndSecondaryLyrics2
  ) {
    ctx.font = "50px arial";
    ctx.textAlign = "center"
    for (i in secondaryLyrics.content) {
      const lyric = secondaryLyrics.content[i]
      if (player.timeSong >= lyric.tStart) {
        ctx.fillStyle = "rgb(102, 0, 204," + lyric.alpha + ")";
        ctx.fillText(lyric.text, lyric.position.x, lyric.position.y);
      }
    }
  }
}

function isAnyOfThisIntervals(intervals) {
  var veredicto = false
  intervals.forEach(t => { if (player.timeSong >= t && player.timeSong <= t + 1500) veredicto = t })
  return veredicto

}

function drawTernaryLyrics() {
  if (shouldDrawQuieroVolar) {
    ctx.font = "40px arial";
    ctx.textAlign = "center"
    ctx.fillStyle = "rgb(01, 255, 1," + ternaryLyrics.alpha + ")";
    ctx.fillText(ternaryLyrics.text, ternaryLyrics.position.x, ternaryLyrics.position.y);
  }
}

function drawStarsFront(stars) {
  ctx.fillStyle = colors.starsFront.color.rgb;
  for (i in stars) {
    ctx.fillStyle = colors.starsFront.color.rgb;
    var star = stars[i];

    const oscillation = Math.cos(player.timeSong / 100 + Math.PI)

    const constantoscillation = sizeoscillator * Math.cos(player.timeSong / 100 + i * Math.PI / 2)
    const poingOscillation = tremolo.size * oscillation
    const size = sizeFrontMax / star.z + constantoscillation + poingOscillation

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

    const oscillation = Math.cos(player.timeSong / 100 + Math.PI)
    const constantoscillation = sizeoscillator * Math.cos(player.timeSong / 100 + i * Math.PI / 2)
    const poingOscillation = tremolo.size * oscillation
    const size = sizeBackMax / star.z + constantoscillation + poingOscillation

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
    var star = stars[star];
    ctx.fillRect(star.x, star.y, 0.3, 0.3);
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

  if (player.timeSong > end) speeds.reset = false
}

function transition(from, to, start, end) {
  const acceleration = (to - from) / (end - start)
  return from + (acceleration * (Math.min(Math.max(parseFloat(player.timeSong), start), end) - start))
}

function colorTransition(from, to, start, end) {
  const colorSpeed = to.minus(from).divided(end - start)
  return from.plus(colorSpeed.multiplied(Math.min(Math.max(parseFloat(player.timeSong), start), end) - start))
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

function updateOscillatorySpeeds(){
  speeds.angular.speed = speeds.keys.angular + transition(speeds.angular.from, speeds.angular.to, times.tEndTremolo, times.tEndTremolo + 10000)
  speeds.radius.speed = speeds.keys.radius + transition(speeds.radius.from, speeds.radius.to, times.tEndTremolo, times.tEndTremolo + 20000)

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
  if (player.timeSong <= times.tStartChangeColor2) {
    colors.background.color = colorTransition(colors.background.from, colors.background.to, times.tStartChangeColor, times.tEndChangeColor)
    colors.starsFront.color = colorTransition(colors.starsFront.from, colors.starsFront.to, times.tStartChangeColor, times.tEndChangeColor)
    colors.starsBack.color = colorTransition(colors.starsBack.from, colors.starsBack.to, times.tStartChangeColor, times.tEndChangeColor)
  } else if (player.timeSong <= times.tStartChangeColor3) {
    // 2n transition (white - blue)
    colors.background.color = colorTransition(colors.background.to, colors.background.to2, times.tStartChangeColor2, times.tEndChangeColor2)
    colors.starsFront.color = colorTransition(colors.starsFront.to, colors.starsFront.to2, times.tStartChangeColor2, times.tEndChangeColor2)
    colors.starsBack.color = colorTransition(colors.starsBack.to, colors.starsBack.to2, times.tStartChangeColor2, times.tEndChangeColor2)
  } else if (player.timeSong <= times.tStartChangeColor4) {
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
  if (player.timeSong >= times.tChangeShape && player.timeSong <= times.tChangeShape2) {
    shape = 1
  } else if (player.timeSong >= times.tChangeShape2) {
    shape = 0
  }
  starsShape = shape
}

function triggerNextLyric() {
  iLyrics.nextWord()
  lyrics.isFadingOut = true
  lyrics.color.alpha = 1
}

function updateLyrics() {
  if (lyrics.test && player.timeSong >= lyrics.t[0]) {
    lyrics.t.shift()
    triggerNextLyric()
  }

  if (lyrics.isFadingOut) {
    lyrics.color.alpha -= 0.01
    if (lyrics.color.alpha <= 0) lyrics.isFadingOut = false
  }
  lyrics.position.x = canvas.width / 2 + Math.cos(timeNow / 1000) * 20
  lyrics.position.y = canvas.height / 2 + Math.sin(timeNow / 1000) * 10
}

function updateSecondaryLyrics() {
  if (player.timeSong >= times.tStartSecondaryLyrics && player.timeSong <= times.tEndSecondaryLyrics ||
    player.timeSong >= times.tStartSecondaryLyrics2 && player.timeSong <= times.tEndSecondaryLyrics2
  ) {
    for (i in secondaryLyrics.content) {
      const lyric = secondaryLyrics.content[i]
      const start = lyric.tStart
      const end = start + 2500
      if (player.timeSong >= start) {
        lyric.position.y = transition(cvh, cvh-500, start, end)
        lyric.alpha = transition(1, 0, start, end)
      }
    }
  }
}

function updateTremoloSize() {
  const maxSizeoscillator = 6

  if (player.timeSong <= times.tClimaxTremolo)
    sizeoscillator = transition(0, maxSizeoscillator, times.tStartTremolo, times.tClimaxTremolo)
  else
    sizeoscillator = transition(maxSizeoscillator, 0, times.tClimaxTremolo, times.tEndTremolo)

  shouldTremolo = isAnyOfThisIntervals(tremolo.tStart)
  if (shouldTremolo) {
    const start = shouldTremolo
    const end = start + 1600
    if (player.timeSong >= start) {
      tremolo.size = transition(3, 0, start, end)
    }
  }
}

function updateTernaryLyrics() {
  shouldDrawQuieroVolar = isAnyOfThisIntervals(ternaryLyrics.tStart)

  if (ternaryLyrics.position.x == null) {
    ternaryLyrics.position.x = cvw / 3 + Math.random() * cvw * 2 / 3
  }
  if (!shouldDrawQuieroVolar) ternaryLyrics.position.x = null

  if (shouldDrawQuieroVolar) {
    const start = shouldDrawQuieroVolar
    const end = start + 1500
    if (player.timeSong >= start) {
      ternaryLyrics.position.y = transition(cvh, cvh-200, start,end)
      ternaryLyrics.alpha = transition(1,0,start, end) 
    }
  }
}


//UPDATE
function update() {
  timeNow = performance.now()
  dt = timeNow - timePrev
  timePrev = timeNow

  player.update(timeNow)

  if (player.started) {
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
  if (farBackStars)
    updateStarsFarBack(dt)
  updateStarsBack(dt)
  updateStarsFront(dt)
}

//RENDER
function render() {
  drawBackground()
  if (farBackStars) drawStarsFarBack(starsFarBack)
  drawStarsBack(starsBack)
  drawLyrics()
  drawStarsFront(starsFront)
  drawSecondaryLyrics()
  drawTernaryLyrics()
  debug.render()
  window.requestAnimationFrame(() => { update(); render() });
}

init()