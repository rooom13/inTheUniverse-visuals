class DebugWindow {
    constructor(c) {
        this.ctx = c
        this.show = true
        this.pairs = []

    }




    toggle() {

        this.show = !this.show
    }

    render() {
        if (!this.show) return

        var ctx = this.ctx

        ctx.fillRect(10,10,10,10)
        const what =
`dt:
map :
music.currentTime : 
timeSong :
startTime:
timeNow:
horizontalSpeed:
verticalSpeed:
radiusSpeed:
angularSpeed:
oscillatorySpeedX:
oscillatorySpeedY:
lyrics.noise:
lyrics.isFadingOut:
`
        const value =
`${dt.toFixed(2)}
${JSON.stringify(keyPressedMap)}
${music.currentTime.toFixed(2)}
${(timeSong / 1000 || 0).toFixed(2)}
${(startTime || 0).toFixed(0)}
${timeNow.toFixed(0)}
${speeds.horizontal.speed.toFixed(2)}
${speeds.vertical.speed.toFixed(2)}
${speeds.radius.speed.toFixed(2)}
${speeds.angular.speed.toFixed(2)}
${speeds.oscillatorySpeedX.speed.toFixed(2)}
${speeds.oscillatorySpeedY.speed.toFixed(2)}
${lyrics.position.noise}
${lyrics.isFadingOut}
`
        const lines = what.split('\n');
        const lines2 = value.split('\n');

        const Nlines = lines.length

        const lineHeight = 16
        const lenghtWhat = 120
        const lenghtValue = 60

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, lenghtWhat, Nlines * lineHeight)
        ctx.fillRect(lenghtWhat, 0, lenghtValue, Nlines * lineHeight)

        ctx.fillStyle = "cyan";
        ctx.font = "10px courier";
        ctx.textAlign = "start"

        for (var i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], 5, 10 + (i * lineHeight));
            ctx.fillText(lines2[i], lenghtWhat, 10 + (i * lineHeight));
        }

        // Red point to check time variance between frames
        ctx.fillStyle = 'red'
        ctx.fillRect(canvas.width / 2, canvas.height / 2 + dt, 4, 4)
    }

}
