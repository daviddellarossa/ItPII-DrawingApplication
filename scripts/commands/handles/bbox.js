/**
 * Class implementing a Bounding Box
 */
class BBox {
    /**
     * Create an instance of BBox, which models a Bounding Box
     * @param {number} x - coordinate of the left edge of the BBox
     * @param {number} y - coordinate of the top edge of the BBox
     * @param {number} width - width of the BBox
     * @param {number} height - height of the BBox
     * @param {function} boxSizeChangedEventHandler - event handler for boxSizeChanged event
     */
    constructor(x, y, width, height, boxSizeChangedEventHandler = null) {
        this.reset(x, y, width, height);
        this.boxSizeChanged = boxSizeChangedEventHandler;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        if (this._x !== value) {
            this._x = value;
            if (this.boxSizeChanged) this.boxSizeChanged();
        }
    }

    get y() {
        return this._y;
    }

    set y(value) {
        if (this._y !== value) {
            this._y = value;
            if (this.boxSizeChanged) this.boxSizeChanged();
        }
    }

    get width() {
        return this._width;
    }

    set width(value) {
        if (this._width !== value) {
            this._width = value;
            if (this.boxSizeChanged) this.boxSizeChanged();
        }
    }

    get height() {
        return this._height;
    }

    set height(value) {
        if (this._height !== value) {
            this._height = value;
            if (this.boxSizeChanged) this.boxSizeChanged();
        }
    }

    /**
     * Check whether a point is contained in the Bounding Box
     * @param point - A point (x, y)
     * @return {boolean}
     */
    contains(point) {
        return this._x <= point.x
            && this._x + this._width >= point.x
            && this._y <= point.y
            && this._y + this._height >= point.y;
    }

    /**
     * Reset size and location of a Bounding Box
     * @param {number} x - left coordinate of the Bounding Box
     * @param {number} y - top coordinate of the Bounding Box
     * @param {number} w - width of the Bounding Box
     * @param {number} h - height of the Bounding Box
     */
    reset(x, y, w, h) {
        this._x = x;
        this._y = y;
        this._width = w;
        this._height = h;

    }

    /**
     * Return a string describing the BBox
     * @return {string}
     */
    toString() {
        return `(x: ${this._x}, y: ${this._y}, width: ${this._width}, height:${this._height})`;
    }
}