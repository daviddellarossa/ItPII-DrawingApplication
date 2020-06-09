/**
 * MirrorFilter extends the Filter class and implements the P5Proxy interface
 * The Mirror tool of the prototype application has been converted into a Filter, requiring the implementation of the
 * Chain of responsibility design pattern, because, differently from how it was there implemented, it is actually
 * independent from the drawing tool used, being it a spray, or a pen or a line.
 * This independence led to rethinking the tool and opting for a different approach.
 *
 * For more information about the rationale behind Filters and their usage, please look at the following:
 * [Filter]{@link Filter}
 * [FilterManager]{@link FilterManager}
 * [p5Proxy]{@link P5Proxy}
 * @extends Filter
 */
class MirrorFilter extends Filter{
    /** Return the next link in the Chain of responsibility */
    get next() { return this._next; }
    /** Set the next link in the Chain of responsibility */
    set next(value) {
        this._next = value;
    }

    /** Enable the filter */
    enable(){
        super.enable();
    }
    /** Disable the filter */
    disable(){
        super.disable();
    }

    /**
     * Calculate the reflection of a Point respect to the mirror axis
     * @param {int} x - X-coordinate of the Point
     * @param {int} y - Y-coordinate of the Point
     * @param {p5.Vector} axis - Unary vector identifying the mirror axis
     * @param {p5.Vector} centre - Vector identifying the centre of the mirror axis
     * @returns {p5.Vector} - Vector identifying the mirrored image of the point
     */
    reflectPoint(x, y, axis, centre){
        return p5Instance.createVector(
            x + 2 * (centre.x - x) * axis.y,
            y + 2 * (centre.y - y) * axis.x
        );
    }
    /** Toggle the mirror axis between Horizontal and Vertical */
    toggleAxis(){
        if(this.axis.x === 1 && this.axis.y === 0){
            this.axis = p5Instance.createVector(0, 1);  //vertical axis
        } else{
            this.axis = p5Instance.createVector(1, 0);  //horizontal axis
        }
        this.calculateAxisPoints();
        return this.axis;
    }

    /**
     * Set visibility of the mirror axis
     * @param {boolean} value - Visibility of the mirror axis
     */
    set isAxisVisible(value) { this._isAxisVisible = value; }
    get isAxisVisible() { return this._isAxisVisible; }

    /** Calculate start and end point to draw the mirror axis */
    calculateAxisPoints(){
        this.axisStartPoint = p5Instance.createVector(
            this.axisCentre.x * this.axis.y,
            this.axisCentre.y * this.axis.x
        );

        this.axisEndPoint = p5Instance.createVector(
            this.axisCentre.x * this.axis.y + (p5Instance.width) * this.axis.x,
            this.axisCentre.y * this.axis.x + (p5Instance.height) * this.axis.y
        );
    }

    /** Draw the axis */
    drawAxis(){
        p5Instance.push();
        this.next.strokeWeight(3);
        this.next.stroke("red");
        if(this._isAxisVisible === false) return;
        this.next.line(this.axisStartPoint.x, this.axisStartPoint.y, this.axisEndPoint.x, this.axisEndPoint.y);
        p5Instance.pop();
    };

    /**
     * Creates a new instance of MirrorFilter
     * @param {string} id - Unique identifier for the Filter
     * @param {P5Proxy} next - Next link in the chain. Needs to implement P5Proxy or be a p5 instance.
     */
    constructor(id, next){
        super(id, next);
        //cannot enforce type check on next because it accepts instances of p5 and p5Proxy,
        // but p5 and the p5Proxy do not actually share the interface.

        this.axis = p5Instance.createVector(0, 1);
        this.axisCentre = p5Instance.createVector(p5Instance.width / 2, p5Instance.height / 2);
        this.calculateAxisPoints();
        this._isAxisVisible = true;
    }

    /*
    All the following methods intercept calls addressed to the p5 instance to draw something on the screen,
    but before handing the call over to the next in chain, the calculate the mirrored imaged and call the next in chain
    twice, once for the original call, once for the mirrored one.
     */

    /**
     * This method intercepts a call to draw a line from the point (x1, y1) to the point (x2, y2) but, before
     * handing the call to the next filter in chain, it calculates the mirror image of the line respect to the
     * mirror axis, and calls the next in chain twice, once for the original line, once for the mirrored line
     */
    line(x1, y1, x2, y2){
        if(!this._enabled)
            return super.line(x1, y1, x2, y2);

        const p1 = this.reflectPoint(x1, y1, this.axis, this.axisCentre);
        const p2 = this.reflectPoint(x2, y2, this.axis, this.axisCentre);
        this.next.line(p1.x, p1.y, p2.x, p2.y);
        this.next.line(x1, y1, x2, y2);
    };
    point(x, y){
        if(!this._enabled)
            return super.point(x, y);

        const p = this.reflectPoint(x, y, this.axis, this.axisCentre);
        this.next.point(p.x, p.y);
        this.next.point(x, y);
    };
    beginShape(){
        if(!this._enabled)
            return super.beginShape();

        this.next.beginShape();

        this.buffer = [];
    };
    vertex(x, y){
        if(!this._enabled)
            return super.vertex(x, y);

        this.buffer.push(this.reflectPoint(x, y, this.axis, this.axisCentre));
        this.next.vertex(x, y);
    };
    curveVertex(x, y){
        if(!this._enabled)
            return super.curveVertex(x, y);

        this.buffer.push(this.reflectPoint(x, y, this.axis, this.axisCentre));
        this.next.curveVertex(x, y);
    }

    endShape(close){
        if(!this._enabled)
            return super.endShape(close);

        this.next.endShape(close);

        this.next.beginShape();
        for(let p of this.buffer){
            this.next.vertex(p.x, p.y);
        }
        this.next.endShape(close);
    };
    loadPixels(){
        if(!this._enabled)
            return super.loadPixels();
        this.next.loadPixels();
    };
    updatePixels(){
        if(!this._enabled)
            return super.updatePixels();

        this.next.updatePixels();
    };
    fill(colour){
        this.next.fill(colour);
    };
    stroke(colour){
        this.next.stroke(colour);
    };
    strokeWeight(weight){
        this.next.strokeWeight(weight);
    };

    get mouseX(){ return this.next.mouseX; }
    get mouseY(){ return this.next.mouseY; }

    onDrawEnd(){
        this.drawAxis();
    }
}
