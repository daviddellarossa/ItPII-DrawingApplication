/**
 * Idle CommandState for the [Eraser Command]{@link EraserCommand}
 * @extends FcState
 */
class EraserIdleState extends FcState {
    /**
     * Create a new instance of EraserIdleState
     * Initialize the array of points and invoke LoadPixels
     * @param {EraserCommand} command
     */
    constructor(command){
        super(command);

        this.command.points.length = 0;
        // this.draw(); //needed to clean after Escape
        this.command.context.chain.loadPixels();  //without this line the canvas is not refreshed
    }

    /**
     * In Idle state, only the mouse pointer is drawn
     */
    draw() {
        super.draw();
        this.command.context.chain.push();

        this.command.context.chain.strokeWeight(1);
        let p5Colour = p5Instance.color(255, 255, 255, 255);
        this.command.context.chain.stroke(p5Colour);
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
        this.command.points.push({x: event.offsetX, y: event.offsetY}); //inject the start point
        this.command.points.push({x: event.offsetX, y: event.offsetY}); //inject the end point
        this.command.state = this.command.stateFactory.getDrawState(this.command, { x: event.offsetX, y: event.offsetY });
        this.command.state.onMousePressed(event);
    }

    /**
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return "Click and drag on the canvas to erase.<br />" +
            "Release the mouse to finalize.";
    }
}