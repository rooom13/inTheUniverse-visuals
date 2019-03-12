const tEndIntro = 22700
const tStartChangeColor = 46600
const tEndChangeColor = 54500

const tStartChangeColor2 = 92600
const tEndChangeColor2 = 94600

const tStartChangeColor3 = 222600
const tEndChangeColor3 = 230600

const tStartChangeColor4 = 251600
const tEndChangeColor4 = 254500

const tStartSecondaryLyrics = tStartChangeColor
const tEndSecondaryLyrics = 54600

const tStartSecondaryLyrics2 = tStartChangeColor3
const tEndSecondaryLyrics2 = tEndChangeColor3

const tPlatillos = 102700

const tChangeShape = 119100
const tChangeShape2 = 182649

const tToLeftSpeed = 150565
const tToLeftSpeed2 = 158575
const tToLeftSpeed3 = 166602
const tToLeftSpeed4 = 174584
const tToDown = 182592
const tToLeftSpeedEnd = 198635

const tToLeftSpeedFinal = 286600
const tToLeftSpeedFinalEnd = 294600

const tStartTremolo = 254636
const tEndTremolo = 270656
const tClimaxTremolo = (tStartTremolo + tEndTremolo) /2

const tTornado = 286656
const tFinal = 303000



let sizePoingOscillation = 0

let tremolo = {
  size: 0,
  tStart: [102600, 110500, tChangeShape, tChangeShape2, tStartTremolo ]

}

let shouldDrawQuieroVolar = false
const onKeyDown = (e) => {
  // console.log(e)
  switch (e.code) {
    case 'Digit0':
      travelTo(0)
      iLyrics.reset()
      break;
    case 'Digit1':
      travelTo(tStartChangeColor)
      break;
    case 'Digit2':
      travelTo(ternaryLyrics.tStart[0] - 500)
      break;
    case 'Digit3':
      travelTo(tStartChangeColor2 - 500)
      break;
    case 'Digit4':
      travelTo(tPlatillos - 1000)
      break;
      case 'Digit5':
      travelTo(tToLeftSpeed - 1000)
      break;
      case 'Digit6':
      travelTo(tStartTremolo - 1000)
      break;
      case 'Digit7':
      travelTo(tEndTremolo - 1000)
      break;
      case 'Digit8':
      travelTo(tTornado - 1000)
      break;
    case 'Space':
    numbersInput.value = numbersInput.value + ' ' + timeSong.toFixed(0)
      iLyrics.nextWord()
      lyrics.isFadingOut = true
      lyrics.color.alpha = 1
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
      speeds.saved = {
        start: timeSong,
        end: timeSong + 2000,
        vertical: speeds.vertical.speed,
        horizontal: speeds.horizontal.speed,
        radius: speeds.radius.speed,
        angular: speeds.angular.speed,
        oscillatorySpeedX: speeds.oscillatorySpeedX.speed,
        oscillatorySpeedY: speeds.oscillatorySpeedY.speed
      }
      speeds.reset = true
      break
  }
}

var debug
var N, speed0, speed1, speed, startTime, timePrev, timeNow, timeSong = 0, dt, canvas, ctx
var songStarted = false
let farBackStars = true

const SHOWSQUARES = 0
const SHOWCIRCLES = 1
const SHOWIMAGE = 2

let starsShape = 0

var starsFront = [];
var starsBack = [];
var starsFarBack = [];

var iLyrics;

function start() {
  if (music.paused) {
    if (music.currentTime == 0) {
      music.currentTime += 0.096
      // speed = speed0
    }
    startTime = performance.now() - (timeSong || 0)
    music.play().then(songStarted = true);
    music.playbackRate = 1;
  }
  else {
    music.pause()
    songStarted = false
  }
}

function init() {
  N = 50
  timePrev = 0
  music = new Audio('music/hello.mp3');
  img = document.getElementById("asteroid")
  initCanvas()
  debug = new DebugWindow(ctx)
  initStars()
  iLyrics = new InteractiveLyrics()
  window.requestAnimationFrame(() => { update(); render() })
}

// INITATORS
function initCanvas() {
  canvas = document.querySelector("canvas");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  canvas.addEventListener('click', start)
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

let sizeFrontMax = 18
let sizeBackMax = 84

const cvw = document.body.clientWidth
const cvh = document.body.clientHeight

let sizeoscillator = 0

var colors = {
  background: {
    color: new Color(0, 0, 0),
    from: new Color(0, 0, 0),
    to: new Color(255, 255, 255),
    to2: new Color(0, 2, 53)
  },
  starsFront: {
    color: new Color(255, 255, 255),
    from: new Color(255, 255, 255),
    to: new Color(0, 0, 0),
    to2: new Color(255, 240, 197)

  },
  starsBack: {
    color: new Color(220, 220, 220),
    from: new Color(220, 220, 220),
    to: new Color(35, 35, 35),
    to2: new Color(251, 231, 173)
  },
  lyrics0: new Color(255, 255, 0),
  lyric1: new Color(255, 255, 0)
}

const lyrics = {
  test: false,
  isFadingOut: false,
  color: colors.lyrics0,
  position: { x: 0, y: 0, noise: 5 },
  t: [
    22566, 27138, 27376, 27681, 29130, 29623, 30117, 30645 ]
}

const secondaryLyrics = {
  speed: -3,
  content: [
    {
      text: 'Ven conmigo',
      alpha: 1,
      tStart: tStartSecondaryLyrics,
      position: { x: cvw / 5, y: cvh }
    },
    {
      text: 'Ven conmigo',
      alpha: 1,
      tStart: 48600,
      position: { x: cvw / 2, y: cvh }
    },
    {
      text: 'Ven conmigo',
      alpha: 1,
      tStart: 50500,
      position: { x: 4 * cvw / 5, y: cvh }
    },
    {
      text: 'Al universo',
      alpha: 1,
      tStart: 52600,
      position: { x: cvw / 2, y: cvh }

    },
    {
      text: 'ven conmigo',
      alpha: 1,
      tStart: 53600,
      position: { x: cvw / 2, y: cvh }

    },
    // ROUND 2
    {
      text: 'Ven conmigo',
      alpha: 1,
      tStart: tStartSecondaryLyrics2,
      position: { x: cvw / 5, y: cvh }
    },
    {
      text: 'Ven conmigo',
      alpha: 1,
      tStart: 224663,
      position: { x: cvw / 2, y: cvh }
    },
    {
      text: 'Ven conmigo',
      alpha: 1,
      tStart: 226655,
      position: { x: 4 * cvw / 5, y: cvh }
    },
    {
      text: 'Al universo',
      alpha: 1,
      tStart: 228630,
      position: { x: cvw / 2, y: cvh }

    },
    {
      text: 'ven conmigo',
      alpha: 1,
      tStart: 229608,
      position: { x: cvw / 2, y: cvh }

    },
    
  ]
}

const ternaryLyrics = {
  text: 'Quiero volar',
  alpha: 1,
  position: { x: null, y: cvh / 2 },
  tStart: [77890, 85900, 133900, 141900, 149900, 157900, 165900, 173900, 181900, 253900, 261800, 269800, 277900, 285900, 293800]
}

var keyPressedMap = {}; // You could also use an array
document.addEventListener("keydown", onKeyDown);
onkeydown = onkeyup = function (e) {
  e = e || event; // to deal with IE
  keyPressedMap[e.keyCode] = e.type == 'keydown';
  /* insert conditional here */
}

var speeds = {
  keys: {
    radius: 0,
    angular: 0,
    vertical: 0,
    horizontal: 0,
  },
  vertical: {
    speed: - 0.01,
    from: - 2.8,
    to: - 0.01
  },
  horizontal: {
    speed: 0,
    from: 0,
    increment: 0.25

  },
  radius: {
    speed: 0,
    from: 0,
    to : -4.15
  },
  angular: {
    speed: 0,
    from: 0,
    to: 1.75
  },
  oscillatorySpeedX: {
    speed: 10
  },
  oscillatorySpeedY: {
    speed: 0
  },
  saved: {
    start: null,
    end: null,
    vertical: null,
    horizontal: null,
    radius: null,
    angular: null,
    oscillatorySpeedX: null,
    oscillatorySpeedY: null
  },
  reset: false
}

function travelTo(toTime_ms) {
  const toTime = toTime_ms / 1000
  music.currentTime = toTime
  startTime = timeNow - toTime_ms
  timeSong = toTime_ms
}

function drawLyrics() {
  ctx.fillStyle = lyrics.color.rgb
  ctx.font = "70px arial";
  ctx.textAlign = "start"

  const textSize = ctx.measureText(iLyrics.currentVerse).width
  ctx.fillText(iLyrics.currentTextBuffer, lyrics.position.x - textSize / 2, lyrics.position.y);
}

function drawSecondaryLyrics() {
  if (timeSong >= tStartSecondaryLyrics && timeSong <= tEndSecondaryLyrics ||
    timeSong >= tStartSecondaryLyrics2 && timeSong <= tEndSecondaryLyrics2
    ) {
    ctx.font = "50px arial";
    ctx.textAlign = "center"
    for (i in secondaryLyrics.content) {
      const lyric = secondaryLyrics.content[i]
      if (timeSong >= lyric.tStart) {
        ctx.fillStyle = "rgb(102, 0, 204," + lyric.alpha + ")";
        ctx.fillText(lyric.text, lyric.position.x, lyric.position.y);
      }
    }
  }
}

function isAnyOfThisIntervals(intervals) {
  var veredicto = false
  intervals.forEach(t => { if (timeSong >= t && timeSong <= t + 1500) veredicto = t })
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

    const oscillation = Math.cos(timeSong / 100 + Math.PI)

    const constantoscillation = sizeoscillator * Math.cos(timeSong / 100 + i * Math.PI / 2)
    const poingOscillation = tremolo.size * oscillation
    const size = sizeFrontMax / star.z + constantoscillation + poingOscillation

    switch (starsShape) {
      case SHOWSQUARES:
        ctx.fillRect(star.x - size / 2, star.y - size / 2, size, size);
        break
      case SHOWCIRCLES:
        drawCircle(star.x, star.y, size / 2, colors.starsFront.color.rgb)
        break
      case SHOWIMAGE:
        ctx.fillRect(star.x - size / 2, star.y - size / 2, size, size);
        ctx.drawImage(img, star.x - size / 2, star.y - size / 2, size, size);
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

    const oscillation = Math.cos(timeSong / 100 + Math.PI)
    const constantoscillation = sizeoscillator * Math.cos(timeSong / 100 + i * Math.PI / 2)
    const poingOscillation = tremolo.size * oscillation
    const size = sizeBackMax / star.z + constantoscillation + poingOscillation

    switch (starsShape) {
      case SHOWSQUARES:
        ctx.fillRect(star.x - size / 2, star.y - size / 2, size, size);
        break
      case SHOWCIRCLES:
        drawCircle(star.x, star.y, size / 2, colors.starsFront.color.rgb)
        break
      case SHOWIMAGE:
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

  speeds.keys.vertical = speedTransition(speeds.saved.vertical, 0, start, end)
  speeds.keys.horizontal = speedTransition(speeds.saved.horizontal, 0, start, end)
  speeds.keys.radius = speedTransition(speeds.saved.radius, 0, start, end)
  speeds.keys.angular = speedTransition(speeds.saved.angular, 0, start, end)
  speeds.keys.oscillatorySpeedX = speedTransition(speeds.saved.oscillatorySpeedX, 0, start, end)
  speeds.keys.oscillatorySpeedY = speedTransition(speeds.saved.oscillatorySpeedY, 0, start, end)

  if (timeSong > end) speeds.reset = false
}

function speedTransition(from, to, start, end) {
  const acceleration = (to - from) / (end - start)
  return from + (acceleration * (Math.min(Math.max(parseFloat(timeSong), start), end) - start))
}

function colorTransition(from, to, start, end) {
  const colorSpeed = to.minus(from).divided(end - start)
  return from.plus(colorSpeed.multiplied(Math.min(Math.max(parseFloat(timeSong), start), end) - start))
}

function updateSpeeds() {

  updateSpeedsKeyPressed()
  if (speeds.reset) updateResetAllSpeedsTransition()

  //vertical

  
  const introSpeed = speedTransition(speeds.vertical.from, speeds.vertical.to, 0, tEndIntro)
  const goDown = speedTransition(0, +0.02, tToDown, tToLeftSpeedEnd)

  const goUp = speedTransition(0, -3, tToLeftSpeedFinalEnd,tFinal + 1000)

  speeds.vertical.speed = introSpeed + speeds.keys.vertical + goDown + goUp

  const toLeft1 = speedTransition(0, speeds.horizontal.increment, tToLeftSpeed, tToLeftSpeed + 3000)
  const toLeft2 = speedTransition(0, speeds.horizontal.increment, tToLeftSpeed2, tToLeftSpeed2 + 3000)
  const toLeft3 = speedTransition(0, speeds.horizontal.increment, tToLeftSpeed3, tToLeftSpeed3 + 3000)
  const toLeft4 = speedTransition(0, speeds.horizontal.increment, tToLeftSpeed4, tToLeftSpeed4 + 3000)
  const resetToLeft = speedTransition(0, -4*speeds.horizontal.increment, tToDown, tToLeftSpeedEnd)
  const leftTransition1 = toLeft1 +  toLeft2 + toLeft3 + toLeft4 + resetToLeft
  
  // FINAL
  const toLeftFinal = speedTransition(0, 3, tTornado, tToLeftSpeedFinalEnd)
  const resetToLeftFinal = speedTransition(0, -3, tToLeftSpeedFinalEnd, tFinal)
  const leftTransition2 = toLeftFinal + resetToLeftFinal
  speeds.horizontal.speed = speeds.keys.horizontal + leftTransition1 + leftTransition2  
  
  speeds.angular.speed = speeds.keys.angular + speedTransition(speeds.angular.from, speeds.angular.to, tEndTremolo, tEndTremolo + 10000)
  speeds.radius.speed = speeds.keys.radius + speedTransition(speeds.radius.from, speeds.radius.to, tEndTremolo , tEndTremolo + 20000)

  speeds.oscillatorySpeedX.speed = speeds.keys.oscillatorySpeedX
  speeds.oscillatorySpeedY.speed = speeds.keys.oscillatorySpeedX
}
function updateColors() {

  // 1st transition (black - white)
  if (timeSong <= tStartChangeColor2) {
    colors.background.color = colorTransition(colors.background.from, colors.background.to, tStartChangeColor, tEndChangeColor)
    colors.starsFront.color = colorTransition(colors.starsFront.from, colors.starsFront.to, tStartChangeColor, tEndChangeColor)
    colors.starsBack.color = colorTransition(colors.starsBack.from, colors.starsBack.to, tStartChangeColor, tEndChangeColor)
  } else if(timeSong <= tStartChangeColor3) {
    // 2n transition (white - blue)
    colors.background.color = colorTransition(colors.background.to, colors.background.to2, tStartChangeColor2, tEndChangeColor2)
    colors.starsFront.color = colorTransition(colors.starsFront.to, colors.starsFront.to2, tStartChangeColor2, tEndChangeColor2)
    colors.starsBack.color = colorTransition(colors.starsBack.to, colors.starsBack.to2, tStartChangeColor2, tEndChangeColor2)
  } else if(timeSong <= tStartChangeColor4) {
    // 3rd transition (black - white)
    colors.background.color = colorTransition(colors.background.to2, colors.background.to, tStartChangeColor3, tEndChangeColor3)
    colors.starsFront.color = colorTransition(colors.starsFront.to2, colors.starsFront.to, tStartChangeColor3, tEndChangeColor3)
    colors.starsBack.color = colorTransition(colors.starsBack.to2, colors.starsBack.to, tStartChangeColor3, tEndChangeColor3)
  } else {
    colors.background.color = colorTransition(colors.background.to, colors.background.from, tStartChangeColor4, tEndChangeColor4)
    colors.starsFront.color = colorTransition(colors.starsFront.to, colors.starsFront.from, tStartChangeColor4, tEndChangeColor4)
    colors.starsBack.color = colorTransition(colors.starsBack.to, colors.starsBack.from, tStartChangeColor4, tEndChangeColor4)

  }
}

function updateSpeedsKeyPressed() {
  const ctrlPressed = keyPressedMap[17] || false
  const leftAltPressed = keyPressedMap[18] || false
  const spacePressed = keyPressedMap[32] || false
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

function updateShape(){
  let shape = 0
  if(timeSong >= tChangeShape && timeSong <= tChangeShape2 ){
    shape = 1  
  } else if(timeSong >= tChangeShape2 ){
    shape = 0  

  }

  starsShape = shape
}

function updateLyrics() {


  if(lyrics.test && timeSong >= lyrics.t[0]){
    lyrics.t.shift()
    iLyrics.nextWord()
    lyrics.isFadingOut = true
    lyrics.color.alpha = 1

  }


  if (lyrics.isFadingOut) {
    lyrics.color.alpha -= 0.01
    if (lyrics.color.alpha <= 0) lyrics.isFadingOut = false
  }
  lyrics.position.x = canvas.width / 2 + Math.cos(timeNow / 1000) * 20
  lyrics.position.y = canvas.height / 2 + Math.sin(timeNow / 1000) * 10

  if (timeSong >= tEndChangeColor) lyrics.Color = new Color
}

function updateSecondaryLyrics() {
  if (timeSong >= tStartSecondaryLyrics && timeSong <= tEndSecondaryLyrics ||
    timeSong >= tStartSecondaryLyrics2 && timeSong <= tEndSecondaryLyrics2
    ) {
    for (i in secondaryLyrics.content) {
      const lyric = secondaryLyrics.content[i]
      const start = lyric.tStart
      const end = start + 3000
      if (timeSong >= start) {
        // I'm not refactoring this
        lyric.position.y = cvh + (-0.2 * (Math.min(Math.max(parseFloat(timeSong), start), end) - start))
        const acceleration = (0 - 1) / (end - start)
        lyric.alpha = 1 + (acceleration * (Math.min(Math.max(parseFloat(timeSong), start), end) - start))
      }
    }
  }
}

function updateTremoloSize() {
  const maxSizeoscillator = 6

  if(timeSong <= tClimaxTremolo)
  sizeoscillator = speedTransition(0,maxSizeoscillator, tStartTremolo, tClimaxTremolo)
  else 
  sizeoscillator = speedTransition(maxSizeoscillator,0, tClimaxTremolo, tEndTremolo)

  shouldTremolo = isAnyOfThisIntervals(tremolo.tStart)
  if (shouldTremolo) {
    const start = shouldTremolo
    const end = start + 1600
    if (timeSong >= start) {
      // I'm not refactoring this
      const acceleration = (0 - 3) / (end - start)
      tremolo.size = 3 + (acceleration * (Math.min(Math.max(parseFloat(timeSong), start), end) - start))
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
    if (timeSong >= start) {
      // I'm not refactoring this
      // ternaryLyrics.position.y = cvh + (-0.2 * (Math.min(Math.max(parseFloat(timeSong), start), end) - start))
      const acceleration = (0 - 1) / (end - start)
      ternaryLyrics.position.y = cvh + (-0.05 * (Math.min(Math.max(parseFloat(timeSong), start), end) - start))
      ternaryLyrics.alpha = 1 + (acceleration * (Math.min(Math.max(parseFloat(timeSong), start), end) - start))
    }
  }
}


//UPDATE
function update() {
  timeNow = performance.now()
  dt = timeNow - timePrev
  timePrev = timeNow

  if (songStarted) {
    timeSong = timeNow - startTime

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