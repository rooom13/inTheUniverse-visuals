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
            'Quiero volar'
        ]


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


    get currentTextBuffer() {return this._currentTextBuffer}

    get currentVerse() { return this._content[this._currentVerseIndex] }

}
