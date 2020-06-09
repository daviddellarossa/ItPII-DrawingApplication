/**
 * Finalize CommandState for the [Line Command]{@link LineCommand}
 * @extends LcState
 */
class LcFinalizeState extends LcState{
    /**
     * Create an instance of LcFinalizeState
     * @param {LineCommand} command
     */
    constructor(command){
        super(command);
    }

    /**
     * Draw the polyline on the canvas using beginShape/vertex/endShape functions of p5's.
     */
    draw() {
        this.command.context.chain.updatePixels();
        if(this.command.points.length > 0){
            this.command.context.chain.strokeWeight(this.command.thickness);
            this.command.context.chain.beginShape();
            for(let point of this.command.points){
                this.command.context.chain.vertex(point.x, point.y);
            }
            this.command.context.chain.endShape();
        }
        this.command.onBeforeCommitAction();
        this.command.context.chain.loadPixels();
        this.command.onAfterCommitAction()
    };

    /**
     * Final draw of the polyline, invoking the {@link draw} method and change of the state to [Idle CommandState]{@link LcIdleState}
     * @param event
     */
    onEpsilon(event){
        this.draw(); //final draw
        this.command.state = this.command.stateFactory.getIdleState(this.command);
    }
}