/**
 * Idle CommandState for the [Pen Command]{@link PenCommand}
 * @extends FcState
 */
class PenIdleState extends FcState {

    /**
     * Create a new instance of PenIdleState
     * Initialize the array of points and invoke LoadPixels
     * @param {PenCommand} command
     */
    constructor(command){
        super(command);

        this.command.points.length = 0;
        //this.draw(); //needed to clean after Escape
        this.command.context.chain.loadPixels();  //without this line the canvas is not refreshed
    }

    /**
     * In idle state only the mouse pointer is drawn
     */
    draw() {
        super.draw();
        this.command.context.chain.push();
        this.command.context.chain.strokeWeight(1);
        this.command.context.chain.circle(
            this.command.context.chain.mouseX,
            this.command.context.chain.mouseY,
            this.command.thickness,
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
        return "Click and drag on the canvas to draw a line.<br />" +
            "Release the mouse to finalize the line.";
    }
}