class Player {
    constructor(src) {
        this._music = new Audio(src)
        this._music.playbackRate = 1

        this.started = false
        this.paused = true
        this.timeSong = 0
    }

    goTo(toTime_ms) {
        this._music.currentTime = toTime_ms / 1000
    }

    update() {
        this.timeSong = this._music.currentTime * 1000// timeNow - this._startTime
    }

    togglePaused() {
        if (this._music.paused) {
            if (this._music.currentTime == 0) {
            }
            this._music.play().then(() => {
                this.started = true
            });
        }
        else {
            this._music.pause()
            this.started = false
        }
    }
}