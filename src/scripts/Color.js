class Color {
    constructor(r, g, b, alpha) {
      this.r = r
      this.g = g
      this.b = b
      this.alpha = alpha || 1

    }

    plus(col) {
      return new Color(this.r + col.r, this.g + col.g, this.b + col.b, this.alpha)
    }

    minus(col) {
      return new Color(this.r - col.r, this.g - col.g, this.b - col.b, this.alpha)
    }

    divided(value) {
      return new Color(this.r / value, this.g / value, this.b / value, this.alpha)
    }

    multiplied(value) {
      return new Color(this.r * value, this.g * value, this.b * value, this.alpha)
    }



    increment(i) {
      this.r += i
      this.g += i
      this.b += i

    }

    incrementAlpha(i){
        this.alpha += i
    }



    get rgb() {
      return `rgb(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`
    }
  }