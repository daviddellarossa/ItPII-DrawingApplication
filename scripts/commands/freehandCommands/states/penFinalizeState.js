/**
 * Finalize state for the [Pen Command]{@link PenCommand}
 * @extends FcState
 */
class PenFinalizeState extends FcState {
    /**
     *
     * @param command
     */
    constructor(command){
        super(command);
    }

    draw() {
            /**
             * From p5 documentation for curveVertex {@link https://p5js.org/reference/#/p5/curveVertex}:
             * The first and last points in a series of curveVertex() lines will be used to guide the beginning
             * and end of a the curve.
             * A minimum of four points is required to draw a tiny curve between the second and third points.
             * This is why the last point is being added twice
             */
            this.command.points.push(this.command.points[this.command.points.length - 1]);
            this.command.points.push(this.command.points[this.command.points.length - 1]);

            super.draw();

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