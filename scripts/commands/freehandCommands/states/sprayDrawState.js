/**
 * Draw CommandState for the [Spray Command]{@link SprayCommand}
 * @extends FcState
 */
class SprayDrawState extends FcState {
    /**
     * Create an instance of PenDrawState
     * Set default values for Number of Points and Spread radius
     * @param {SprayCommand} command
     */
    constructor(command){
        super(command);
    }

    /**
     * Handler for the MousePressed event
     * Spray uses MousePressed event instead of MouseDragged like other Freehand commands
     * On every occurrence of MousePressed event, invoke draw
     * @param event
     */
    onMousePressed(event){

    }

    /**
     * Draw a group of points randomly positioned around the current mouse position.
     * The number of points is controlled by the variable points.
     * The max distance from the centre is controlled by the variable spread.
     * Expect to find two points in the array, the index 0 will be the start point, the index 1 will be the end point
     */
    draw() {
        let colour = colourPicker.selectedColour;
        for(let i = 0; i < this.command.numOfPoints; i++) {
            let radius = this.command.spread * Math.random();
            let theta = 2 * Math.PI * Math.random();
            this.command.points.push({
                x: p5Instance.mouseX + radius * Math.cos(theta),
                y: p5Instance.mouseY + radius * Math.sin(theta)
            });
        }

        this.command.context.chain.updatePixels();

        // Draw the points of the spray
        //Set the color for the points being drawn
        let p5Colour = p5Instance.color(colour.r, colour.g, colour.b, colour.a);
        this.command.context.chain.stroke(p5Colour);

        if(this.command.points.length > 0) {
            this.command.context.chain.strokeWeight(this.command.thickness);
            for (let point of this.command.points) {
                this.command.context.chain.point(point.x, point.y);
            }
        }

        this.command.context.chain.push();

        // Draw the mouse pointer
        this.command.context.chain.strokeWeight(1);

        //The mouse pointer for this tool has always alpha max.
        p5Colour = p5Instance.color(colour.r, colour.g, colour.b, 255);
        this.command.context.chain.stroke(p5Colour);

        this.command.context.chain.circle(
            this.command.context.chain.mouseX,
            this.command.context.chain.mouseY,
            2 * this.command.spread,
        );
        this.command.context.chain.pop();
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
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return "Click and drag on the canvas to spray.<br />" +
            "Release the mouse to finalize the draw.";
    }
}