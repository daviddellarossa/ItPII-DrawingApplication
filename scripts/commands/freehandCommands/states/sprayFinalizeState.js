/**
 * Finalize state for the [Spray Command]{@link SprayCommand}
 * @extends FcState
 */
class SprayFinalizeState extends FcState {
    constructor(command) {
        super(command);
    }

    /**
     * Draw the final trace of the spray command
     */
    draw() {
        console.log("SprayFinalizeState: In draw");
        this.command.context.chain.updatePixels();
        if(this.command.points.length > 0) {
            this.command.context.chain.strokeWeight(this.command.thickness);

            //Set the color for the point being drawn
            let colour = colourPicker.selectedColour;
            let p5Colour = p5Instance.color(colour.r, colour.g, colour.b, colour.a);
            this.command.context.chain.stroke(p5Colour);

            for (let point of this.command.points) {
                this.command.context.chain.point(point.x, point.y);
            }

            this.command.onBeforeCommitAction();
            this.command.context.chain.loadPixels();
            this.command.onAfterCommitAction()
        }
    }
    /**
     * Change status to Idle
     * @param event
     */
    onEpsilon(event){
        this.draw(); //final draw
        this.command.state = this.command.stateFactory.getIdleState(this.command);
    }
}