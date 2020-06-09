/**
 * Finalize state for the [Eraser Command]{@link EraserCommand}
 * @extends FcState
 */
class EraserFinalizeState extends FcState {
    constructor(command){
        super(command);
    }

    /**
     * Draw the final trace of the eraser
     */
    draw(){
        /**
         * From p5 documentation for curveVertex {@link https://p5js.org/reference/#/p5/curveVertex}:
         * The first and last points in a series of curveVertex() lines will be used to guide the beginning
         * and end of a the curve.
         * A minimum of four points is required to draw a tiny curve between the second and third points.
         * This is why the last point is being added twice
         */
        this.command.points.push(this.command.points[this.command.points.length - 1]);
        this.command.points.push(this.command.points[this.command.points.length - 1]);

        p5Instance.push();

        this.command.context.chain.stroke(255, 255, 255, 255);
        super.draw();

        p5Instance.pop();

        this.command.onBeforeCommitAction();
        this.command.context.chain.loadPixels();
        this.command.onAfterCommitAction()
    };

    /**
     * Change status to Idle
     * @param event
     */
    onEpsilon(event){
        this.draw(); //final draw
        this.command.state = this.command.stateFactory.getIdleState(this.command);
    }
}