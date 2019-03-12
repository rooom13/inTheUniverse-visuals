class InteractiveLyrics {

    constructor() {
        this._content = [
            'Fly',
            'In the universe',
            'I want to',
            'Fly',
            'There is no war',
            'There is no',
            'Crime',
            'Please come with me',
            'And take my',
            'Hand',
            'Sal ahora mismo y déjalo',
            'Vente al universo conmigo',
            'Escápate y olvídalo',
            'Vente al universo conmigo',
            'Prepárate y vámonos',
            'Vente al universo conmigo',
            'In the universe I want to fly',
            'Far away from civilization',
            'Please come with me',
            'And take my hand',
            'Let\'s abandon this constellation',
            "Let's start from scratch",
            "Let's build the home",
            'The home of our imagination',
            "There won't be guns",
            "There won't be walls",
            "There won't be any countries or nations",
            "Just you and me",
            "In our new world", "In our new world", "In the universe", "I want to fly", "Far away from civilization", "Please come with me", "And take my hand", "Let's abandon this constellation", "In the universe I want to fly", 'Far away from civilization', 'Please come with me', 'And take my hand', "Let's abandon this constellation", 'In the universe I want to fly', "Far away from civilization", "Please come with me", 'And take my hand', "Let's abandon this constellation", 'In the universe I want to fly', 'Far away from civilization', 'Please come with me', 'And take my hand', "Let's abandon this constellation", 'IN', 'THE', 'UNIVERSE', 'I', 'WANT', 'TO', 'FLY', 'FAR', 'AWAY', 'FROM', 'CIVILIZATION', 'PLEASE', 'COME', 'WITH', 'ME', 'AND', 'TAKE', 'MY', 'HAND', "LET'S", 'ABANDON', 'THIS', 'CONSTELLATION', 'Fly', 'In the universe', 'I want to', 'Fly', 'There is no war', 'There is no', 'Crime', 'Please come with me and take my', 'Hand', 'Sal ahora mismo y déjalo', 'Vente al universo conmigo', 'Escápate y olvídalo', 'Vente al universo conmigo', 'Prepárate y vámonos', 'Vente al universo conmigo', 'IN', 'THE', 'UNIVERSE', 'I', 'WANT', 'TO', 'FLY', 'FAR', 'AWAY', 'FROM', 'CIVILIZATION', 'PLEASE', 'COME', 'WITH', 'ME', 'AND', 'TAKE', 'MY', 'HAND', "LET'S", 'ABANDON', 'THIS', 'CONSTELLATION', 'In the universe I want to fly', 'Far away from civilization', 'Please come with me', 'And take my hand', "Let's abandon this constellation", 'In the universe', 'I want to fly', 'Far away from civilization', 'Please come with me ', 'And take my hand',
            "Let's abandon this constellation"
        ]


        this._currentVerseIndex = 0
        this._currentWordIndex = 0
        this._currentVerseList = this._content[0].split(' ')
        this._currentWord = this._currentVerseList[0]
        this._currentTextBuffer = ''
        this._toWrite = ''

    }

    reset(){
        this._currentVerseIndex = 0
        this._currentWordIndex = 0
        this._currentVerseList = this._content[0].split(' ')
        this._currentWord = this._currentVerseList[0]
        this._currentTextBuffer = ''
        this._toWrite = ''

    }


    nextWord() {
        if (this._currentWordIndex > this._currentVerseList.length - 1) {
            this._currentWordIndex = 0
            this._currentVerseIndex++
            this._currentVerseList = this._content[this._currentVerseIndex].split(' ')
            this._currentTextBuffer = ''
        }
        this._currentWord = this._currentVerseList[this._currentWordIndex]
        this._currentTextBuffer += this._currentWord + (this._currentWordIndex == this._currentVerseList.length - 1 ? '' : ' ')
        this._currentWordIndex++
    }


    get currentTextBuffer() { return this._currentTextBuffer }

    get currentVerse() { return this._content[this._currentVerseIndex] }

}
