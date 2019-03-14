class Values {

    static colors(){
        return {
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
    }

    static speeds(){
        return {
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
                to: -4.15
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
    }
}