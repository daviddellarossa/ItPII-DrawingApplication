/**
 * Filter is a base class for the Filters. It implements the interface {@link P5Proxy} in order to provide the same
 * interface of the p5 class and be used in the Chain of Responsibility design pattern implementation.
 * Filters are thought as actions performed on the canvas before or after a drawing action is performed.
 * Many Filters can be combined in a chain and perform their actions one after the other.
 * This action can be depending on the particular drawing action being performed, or completely independent from it.
 * Every drawing action is targeted to the so-called Target, which is the actual p5 instance.
 * The filters implement a similar interface (at least) for the p5's drawing commands used by this application and each
 * filter can contain another filter, in so building a chain. The last link of the chain is the Target. So, each drawing
 * action is first intercepted by the first filter, which invokes the same drawing action on the following filter and so
 * on. Eventually, the Target's drawing action is invoked and the control is returned, link by link to the caller.
 *
 * Take the mirror as an example.
 * The chain-of-responsibility will be made of an instance of the mirror tool, implementing the p5Proxy interface
 * and having the next reference pointing to the p5 instance.
 * When the line command is executed, it will be provided with an instance of a p5Proxy,
 * which can be the p5 instance itself, or an instance of another class implementing p5Proxy, it does not really
 * matter as they both have the same interface.
 * The line command will then execute the line method on the p5Proxy, which happens to be the mirror filter.
 * This will read the coordinates of the line to be drawn and will generate another line command
 * drawing a new mirrored line. The two line commands will be then forwarded to the next in the chain,
 * which will eventually end up being, at the end of the chain, the p5 instance, which will actually draw the lines.
 *
 * See {@link MirrorFilter} for more details on a real implementation of Filter.
 *
 * For more information about the rationale behind Filters and their usage, please look at the following:
 * [FilterManager]{@link FilterManager}
 * [p5Proxy]{@link P5Proxy}
 *
 * @extends P5Proxy
 */
class Filter extends P5Proxy{
    /** Enable the filter */
    enable(){
        this._enabled = true;
    }
    /** Disable the filter */
    disable(){
        this._enabled = false;
    }
    /** Return the next link in the Chain of responsibility */
    get next() { return this._next; }   //Linked list implementation
    /** Set the next link in the Chain of responsibility */
    set next(value) {
        this._next = value;
    }       //Linked list implementation

    /**
     * Create a new instance of Filter
     * @param {string} id - Unique identifier for the Filter
     * @param {P5Proxy} next - Next link in the chain. Needs to implement P5Proxy or be a p5 instance.
     */
    constructor(id, next){
        super();
        this._enabled = false;
        this.id = id;
        this.next = next;       //Linked list implementation
    }

    //All the following methods, transparently call the same method on the next link.
    //Before and after the call on the next link, each filter can perform its business.
    //As the last link in the chain is the real P5 implementation, the wanted drawing action is eventually executed.
    line(x1, y1, x2, y2){
        this.next.line(x1, y1, x2, y2);
    };
    point(x, y){
        this.next.point(x, y);
    };
    beginShape(){
        this.next.beginShape();
    };
    vertex(x, y){
        this.next.vertex(x, y);
    };
    curveVertex(x, y){
        this.next.curveVertex(x, y);
    };
    endShape(close){
        this.next.endShape(close);
    };
    rect(x, y, w, h) {
        this.next.rect(x, y, w, h);
    }
    circle(x, y, d) {
        this.next.circle(x, y, d);
    }

    loadPixels(){
        this.next.loadPixels();
    };
    updatePixels(){
        this.next.updatePixels();
    };
    image(img, x, y) {
        this.next.image(img, x, y);
    }
    fill(colour){
        this.next.fill(colour);
    };
    fill(r, g, b, a){
        this.next.fill(r, g, b, a);
    }
    stroke(colour){
        this.next.stroke(colour);
    };
    noStroke(){
        this.next.noStroke();
    }
    strokeWeight(weight){
        this.next.strokeWeight(weight);
    };
    style(property, value) {
        this.next.style(property, value);
    }

    pop() {
        this.next.pop();
    }
    push(){
        this.next.push();
    }
    createVector(x, y){
        return this.next.createVector(x, y);
    }

    get mouseX(){ return this.next.mouseX; }
    get mouseY(){ return this.next.mouseY; }

    get width(){ return this.next.width; }
    get height(){ return this.next.height; }

    get(x, y, width, height) {
        return this.next.get(x, y, width, height);
    }

    cursor(type){
        this.next.cursor(type);
    }
    /** Called when the draw starts */
    onDrawStart(){}
    /** Called when the draw ends */
    onDrawEnd(){}
}
