/**
 * Draw CommandState for the [Eraser Command]{@link EraserCommand}
 * @extends FcState
 */
class EraserDrawState extends FcState {

    /**
     * Create an instance of EraserDrawState
     * @param {EraserCommand} command
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
        //save current stroke and colour, set the new values and finally reset to the previous value
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
     * Draw a white segment on the canvas
     * Expect to find two points in the array, the index 0 will be the start point, the index 1 will be the end point
     */
    draw() {
        p5Instance.push();

        //draw the eraser trace
        this.command.context.chain.stroke(255, 255, 255, 255);
        super.draw();
        p5Instance.pop();
        this.command.context.chain.push();

        //draw the mouse pointer
        this.command.context.chain.strokeWeight(1);
        this.command.context.chain.stroke(100);
        this.command.context.chain.circle(
            this.command.context.chain.mouseX,
            this.command.context.chain.mouseY,
            this.command.thickness,
        );
        this.command.context.chain.pop();
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
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return "Click and drag on the canvas to erase.<br />" +
            "Release the mouse to finalize.";
    }
}