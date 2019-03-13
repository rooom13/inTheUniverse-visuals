class Player {
    constructor(src){
        this.music = new Audio('music/hello.mp3');
        this._songStarted = false
        this.paused = true
        this.timeSong = 0
        this.paused.current
    }

    init(){

    }

    set currentTime (toTime_ms){
        const toTime = toTime_ms / 1000
        this.music.currentTime = toTime
        this._starTime = this._timeNow - toTime_ms
        this.timeSong = toTime_ms
    }

    togglePaused(){
        if(this.paused){
            if(this.currentTime == 0){
                this.currentTime += 0.096
            }

        }

    }



    update(){

    }

}