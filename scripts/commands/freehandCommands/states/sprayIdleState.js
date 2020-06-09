/**
 * Idle CommandState for the [Spray Command]{@link SprayCommand}
 * @extends FcState
 */
class SprayIdleState extends FcState {

    /**
     * Create a new instance of PenIdleState
     * Initialize the array of points and invoke LoadPixels
     * @param {SprayCommand} command
     */
    constructor(command){
        super(command);

        this.command.points.length = 0;
        this.command.context.chain.loadPixels();  //without this line the canvas is not refreshed
    }

    /**
     * In Idle state only the mouse pointer is drawn
     */
    draw() {
        super.draw();
        this.command.context.chain.push();
        this.command.context.chain.strokeWeight(1);

        //The mouse pointer for this tool has always alpha max.
        let colour = colourPicker.selectedColour;
        let p5Colour = p5Instance.color(colour.r, colour.g, colour.b, 255);
        this.command.context.chain.stroke(p5Colour);

        this.command.context.chain.circle(
            this.command.context.chain.mouseX,
            this.command.context.chain.mouseY,
            2 * this.command.spread,
        );
        this.command.context.chain.pop();
    }
    /**
     * Handler for the MousePressed event.
     * Add the point where the mouse is pressed to the array of points and change state to DrawState
     * @param event
     */
    onMousePressed(event){
        /**
         * From p5 documentation for curveVertex {@link https://p5js.org/reference/#/p5/curveVertex}:
         * The first and last points in a series of curveVertex() lines will be used to guide the beginning
         * and end of a the curve.
         * A minimum of four points is required to draw a tiny curve between the second and third points.
         * This is why the first point is being added twice
         */
        this.command.points.push({x: event.offsetX, y: event.offsetY}); //inject the start point
        this.command.points.push({x: event.offsetX, y: event.offsetY}); //inject the end point
        this.command.state =
            this.command.stateFactory.getDrawState(this.command, { x: event.offsetX, y: event.offsetY });
        this.command.state.onMousePressed(event);
    }

    /**
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return "Click and drag on the canvas to spray.<br />" +
            "Release the mouse to finalize the draw.";
    }
}