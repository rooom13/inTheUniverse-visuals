class Values {

    static colors() {
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
            // lyrics00: new Color(255, 255, 0),
            // lyrics01: new Color(255, 152, 0),
            // lyrics02: new Color(255, 0, 0),
            lyrics00: new Color(0, 24, 99),
            lyrics01: new Color(90, 10, 71),
            lyrics02: new Color(255, 25, 212),
            lyric1: new Color(52, 0, 54),
            lyric2: new Color(90, 10, 75)
        }
    }

    static speeds() {
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
    static sizes() {
        return {
            frontMax: 18,
            backMax: 84,
            oscillator: 0


        }

    }

    static secondaryLyrics() {
        return {
            color: colors.lyric1,
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
    }
    static ternaryLyrics() {
        return {
            shouldDraw: false,
            text: 'Quiero volar',
            alpha: 1,
            position: { x: null, y: cvh / 2 },
            tStart: times.tTernaryLyrics,
            color: colors.lyric2,

        }
    }

    static primaryLyrics() {
        return {
            iLyrics : new InteractiveLyrics(),
            test: true,
            isFadingOut: false,
            color: colors.lyrics00,
            color2: colors.lyrics01,
            color3: colors.lyrics02,
            positions: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
            noise: 5,
            t: []
        }

    }

     static stars() {
        return {
            front: [],
            back: [],
            far: [],
            shape: 0,
            drawFar: true
        }
    }
}