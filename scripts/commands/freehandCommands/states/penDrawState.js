/**
 * Draw CommandState for the [Pen Command]{@link PenCommand}
 * @extends FcState
 */
class PenDrawState extends FcState {
    /**
     * Create a new instance of PenDrawState
     * @param {PenCommand} command
     */
    constructor(command){
        super(command);
    }

    /**
     * Handler for the MouseDragged event.
     * Set the start point of the new segment to the last point of the previous segment and the end point to the current
     * mouse position
     * @param event
     */
    onMouseDragged(event){
        let lastPoint = this.command.points[this.command.points.length - 1];
        if(p5Instance.dist(lastPoint.x ,lastPoint.y, event.offsetX, event.offsetY)> 4){
            this.command.points.push({x: event.offsetX, y: event.offsetY});
        }
    }

    /**
     * Handler for the MouseReleased event.
     * If the mouse is released, move to the Finalize state
     * @param event
     */
    onMouseReleased(event){
        this.command.state = this.command.stateFactory.getFinalizeState(this.command);
        this.command.state.onEpsilon();
    }

    /**
     * Handler for the KeyPressed event
     * Pressing the Enter key changes state to Finalize
     * Pressing the Escape key cancels the current drawing and reset to Idle state
     * @param event
     */
    onKeyPressed(event){
        switch(event.keyCode){
            case 13: /** ENTER */
                this.command.state = this.command.stateFactory.getFinalizeState(this.command);
                this.command.state.onEpsilon();
                break;
            case 27: /** ESCAPE */
                this.command.state = this.command.stateFactory.getIdleState(this.command);
                break;
        }
    }
    /**
     * Draw the content of the command's array of points on the canvas using the Line command
     * First invoke UpdatePixels on the context, second draw, finally invoke LoadPixels
     */
    draw() {
        //draw the pen trace
        let colour = colourPicker.selectedColour;
        let p5Colour = p5Instance.color(colour.r, colour.g, colour.b, colour.a);
        this.command.context.chain.stroke(p5Colour);
        super.draw();

        this.command.context.chain.push();

        //draw the mouse pointer
        this.command.context.chain.strokeWeight(1);
        this.command.context.chain.circle(
            this.command.context.chain.mouseX,
            this.command.context.chain.mouseY,
            this.command.thickness,
        );
        this.command.context.chain.pop();
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