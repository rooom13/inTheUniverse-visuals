
const tEndIntro = 22700
const tStartChangeColor = 46600
const tEndChangeColor = 54500

const tStartChangeColor2 = 92600
const tEndChangeColor2 = 94600

const tStartSecondaryLyrics = tStartChangeColor
const tEndSecondaryLyrics = 54600

let shouldDrawQuieroVolar = false
const onKeyDown = (e) => {
  // console.log(e)
  switch (e.code) {
    case 'Digit1':
      travelTo(tEndIntro)
      break;
    case 'Digit2':
      travelTo(tStartChangeColor)
      break;
    case 'Digit3':
      travelTo(tEndChangeColor)
      break;
    case 'Digit4':
      travelTo(ternaryLyrics.tStart[0] - 1000)
      break;
    case 'Space':
      iLyrics.nextWord()
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
    case 'KeyQ':
      sizeFrontMax++
      break;
    case 'KeyS':
      start()
      break;
    case 'KeyC':
      starsShape = (starsShape + 1) % 3
      break
    case 'KeyD':
      debug.toggle()
      break
  }
}

var debug
var N, speed0, speed1, speed, startTime, timePrev, timeNow, timeSong = 0, dt, canvas, ctx
var songStarted = false
let farBackStars = false

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
      speed = speed0
    }
    startTime = performance.now() - (timeSong || 0)
    music.play().then(songStarted = true);
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

    oscillatorySpeedX = speeds.radius.speed * Math.cos(speeds.angular.speed * timeNow / 1000)
    oscillatorySpeedY = speeds.radius.speed * Math.sin(speeds.angular.speed * timeNow / 1000)

    star.x += constantHorizontalSpeed * dt + oscillatorySpeedX
    star.y += constantVerticalSpeed * dt + oscillatorySpeedY

    if (star.y > canvas.height) { star.y = star.y % canvas.height } else if (star.y < 0) { star.y = canvas.height + (star.y % canvas.height) }
    if (star.x > canvas.width) { star.x = star.x % canvas.width } else if (star.x < 0) { star.x = canvas.width + (star.x % canvas.width) }
  }
}

function updateStarsBack(dt) {
  for (star in starsBack) {
    var star = starsBack[star];

    const constantHorizontalSpeed = speeds.horizontal.speed / star.z
    const constantVerticalSpeed = speeds.vertical.speed / star.z

    oscillatorySpeedX = speeds.radius.speed * Math.cos(speeds.angular.speed * timeNow / 1000)
    oscillatorySpeedY = speeds.radius.speed * Math.sin(speeds.angular.speed * timeNow / 1000)

    star.x += constantHorizontalSpeed * dt + oscillatorySpeedX
    star.y += constantVerticalSpeed * dt + oscillatorySpeedY

    if (star.y > canvas.height) { star.y = star.y % canvas.height } else if (star.y < 0) { star.y = canvas.height + (star.y % canvas.height) }
    if (star.x > canvas.width) { star.x = star.x % canvas.width } else if (star.x < 0) { star.x = canvas.width + (star.x % canvas.width) }
  }
}

function updateStarsFarBack(dt) {
  for (star in starsFarBack) {
    var star = starsFarBack[star];
    const starSpeed = speeds.vertical.speed / star.z

    star.y += starSpeed * 10 * dt
    if (star.y > canvas.height) { star.y = star.y % canvas.height } else if (star.y < 0) { star.y = canvas.height + (star.y % canvas.height) }
    if (star.x > canvas.width) { star.x = star.x % canvas.width } else if (star.x < 0) { star.x = canvas.width + (star.x % canvas.width) }
  }
}

const sizeFrontMax = 18
const sizeBackMax = 84

const cvw = document.body.clientWidth
const cvh = document.body.clientHeight

var colors = {
  background: {
    color: new Color(0, 0, 0),
    from: new Color(0, 0, 0),
    to: new Color(255, 255, 255),
    to2:  new Color(0, 2, 53)
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
  isFadingOut: false,
  color: colors.lyrics0,
  position: { x: 0, y: 0, noise: 5 },
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
  vertical: {
    speed: - 0.01,
    from: - 2.8,
    to: - 0.01
  },
  horizontal: {
    speed: 0.01 * 0
  },
  radius: {
    speed: 0.1 * 0
  },
  angular: {
    speed: 0.5 * 0
  }
}
var oscillatorySpeedX = 0
var oscillatorySpeedY = 0

function travelTo(toTime_ms) {
  const toTime = toTime_ms / 1000
  music.currentTime = toTime
  startTime = timeNow - toTime_ms
}

function drawLyrics() {
  ctx.fillStyle = lyrics.color.rgb
  ctx.font = "70px arial";
  ctx.textAlign = "start"

  const textSize = ctx.measureText(iLyrics.currentVerse).width
  ctx.fillText(iLyrics.currentTextBuffer, lyrics.position.x - textSize / 2, lyrics.position.y);
}

function drawSecondaryLyrics() {
  if (timeSong >= tStartSecondaryLyrics && timeSong <= tEndSecondaryLyrics) {
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

function isAnyOfThisIntervals() {
  var veredicto = false
  ternaryLyrics.tStart.forEach(t => { if (timeSong >= t && timeSong <= t + 1500) veredicto = t })
  if (ternaryLyrics.position.x == null){ 
    ternaryLyrics.position.x =  cvw  / 3 + Math.random()*cvw*2/3}
  if(!veredicto) ternaryLyrics.position.x = null
    return veredicto
}

function drawTernaryLyrics() {
  if (shouldDrawQuieroVolar) {
    ctx.font = "25px arial";
    ctx.textAlign = "center"
    ctx.fillStyle = "rgb(01, 255, 1," + ternaryLyrics.alpha + ")";
    ctx.fillText(ternaryLyrics.text, ternaryLyrics.position.x, ternaryLyrics.position.y);

  }
}

function drawStarsFront(stars) {
  ctx.fillStyle = colors.starsFront.color.rgb;
  for (star in stars) {
    ctx.fillStyle = colors.starsFront.color.rgb;
    var star = stars[star];
    const size = sizeFrontMax / star.z

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
  for (star in stars) {
    var star = stars[star];
    const size = sizeBackMax / star.z

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

function updateSpeedTransition(speeds, start, end) {
  const acceleration = (speeds.to - speeds.from) / (end - start)
  speeds.speed = speeds.from + (acceleration * (Math.min(Math.max(parseFloat(timeSong), start), end) - start))
}

function updateColorTransition(colors, start, end) {
  const colorSpeed = colors.to.minus(colors.from).divided(end - start)
  colors.color = colors.from.plus(colorSpeed.multiplied(Math.min(Math.max(parseFloat(timeSong), start), end) - start))
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
    speeds.vertical.speed += boost * (downPressed - upPressed)
    speeds.horizontal.speed += boost * (rightPressed - leftPressed)
  } else {
    const radiusBoost = 0.05
    const angularSpeedBoost = 0.05
    speeds.radius.speed += radiusBoost * (downPressed - upPressed)
    speeds.angular.speed += angularSpeedBoost * (rightPressed - leftPressed)
  }
  if (spacePressed) {
    lyrics.isFadingOut = true
    lyrics.color.alpha = 1
  }
}

function updateLyrics() {
  if (lyrics.isFadingOut) {
    lyrics.color.alpha -= 0.01
    if (lyrics.color.alpha <= 0) lyrics.isFadingOut = false
  }
  lyrics.position.x = canvas.width / 2 + Math.cos(timeNow / 1000) * 20
  lyrics.position.y = canvas.height / 2 + Math.sin(timeNow / 1000) * 10
  if (timeSong >= tEndChangeColor) lyrics.Color = new Color
}

function updateSecondaryLyrics() {
  if (timeSong >= tStartSecondaryLyrics && timeSong <= tEndSecondaryLyrics) {
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

function updateTernaryLyrics() {
  shouldDrawQuieroVolar = isAnyOfThisIntervals()

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

  updateSpeedsKeyPressed()

  if (songStarted) {
    timeSong = timeNow - startTime
    // 1 transition, reduce speed
    updateSpeedTransition(speeds.vertical, 0, tEndIntro)
    // 2 transition, colors  inverted
    updateColorTransition(colors.background, tStartChangeColor, tEndChangeColor)
    updateColorTransition(colors.starsFront, tStartChangeColor, tEndChangeColor)
    updateColorTransition(colors.starsBack, tStartChangeColor, tEndChangeColor)
  
    // updateColorTransition(colors.background, tStartChangeColor2, tEndChangeColor2)
    // updateColorTransition(colors.starsFront, tStartChangeColor2, tEndChangeColor2)
    // updateColorTransition(colors.starsBack, tStartChangeColor2, tEndChangeColor)
  

  }
  // UPDATE LYRICS
  updateLyrics()
  updateSecondaryLyrics()
  updateTernaryLyrics()
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