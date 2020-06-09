/**
 * Close CommandState for the [Line Command]{@link LineCommand}
 * The command is in Close CommandState after three or more clicks on the canvas from the Idle state and either a double click
 * or the Enter key is pressed.
 * Close CommandState is a transition before the [Finalize state]{@link LcFinalizeState}
 * @extends LcState
 */
class LcCloseState extends LcState{
    /**
     * Create an instance of LcCloseState
     * @param {LineCommand} command
     */
    constructor(command){
        super(command);
    }

    /**
     * Handler for the Mouse Left Button Double Click event
     * This method is invoked by the [Polygon CommandState]{@link LcPolygonState}
     * If the last point was close enough to the first point, the polyline gets closed into a polygon
     * The p5's dist function is used to measure the distance between first and last point.
     * The distance is compared with the value contained in the variable closeThreshold.
     * If the polygon has to be closed, an additional point is added to the points array and the isClosed variable
     * is set to true.
     * This will be used in the Finalize state to draw the polyline as closed.
     * @param event
     */
    onDoubleClicked(event){
        //Workaround: the double click event is fired after the click event. This means that transitioning from the
        //lcPolygonState with a double-click, the point double-clicked is added twice to the collection point.
        //Let's pop out those two points.
        this.command.points.pop();
        this.command.points.pop();
        //--------------------------------

        if(p5Instance.dist(
            this.command.points[0].x,
            this.command.points[0].y,
            event.offsetX,
            event.offsetY
        ) < this.command.closeThreshold ){
            this.command.points.push({x: this.command.points[0].x, y: this.command.points[0].y });
            this.command.isClosed = true;
        }

        this.command.state = this.command.stateFactory.getFinalizeState(this.command);
        this.command.state.onEpsilon();
    }

    /**
     * Handler for the KeyPressed event
     * Pressing the Escape key cancels the current drawing and reset to Idle state
     * @param event
     */
    onKeyPressed(event){
        if(event === 27 /** ESCAPE */ ){
            this.command.state = this.command.stateFactory.getIdleState(this.command);
        }
    }
}