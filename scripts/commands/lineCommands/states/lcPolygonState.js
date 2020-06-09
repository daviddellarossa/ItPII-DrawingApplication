/**
 * Polygon CommandState for the [Line Command]{@link LineCommand}
 * The command is in Polygon CommandState after three or more clicks on hte canvas from the Idle state.
 * @extends LcState
 */
class LcPolygonState extends LcState{
    /**
     * Create an instance of LcPolygonState
     * @param {LineCommand} command
     */
    constructor(command){
        super(command);
    }

    /**
     * Handler for the Mouse Left Button Click event
     * A click on the canvas when LineCommand is in Polygon CommandState adds the current point to the points array and
     * changes the state to [Close CommandState]{@link LcCloseState}
     * @param event
     */
    onMlbClicked(event){
        this.command.points.push({x: event.offsetX, y: event.offsetY});
    }

    /**
     * Handler for the Mouse Left Button Double Click event
     * A Double Click commits the current polyline and moves the Command to Close state
     * @param event
     */
    onDoubleClicked(event){
        this.command.state = this.command.stateFactory.getCloseState(this.command);
        this.command.state.onDoubleClicked(event);
    }

    /**
     * Handler for the KeyPressed event
     * Pressing the Enter key changes state to Finalize
     * Pressing the Escape key cancels the current drawing and reset to Idle state
     * Pressing the Backspace key removes the previous point from the points array and, if the number of remaining
     * points is 2, it changes state to Line state.
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
            case 8: /** BACKSPACE */
                this.command.points.pop();
                if(this.command.points.length === 2)
                    this.command.state = this.command.stateFactory.getLineState(this.command);
                break;
        }
    }

    /**
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return "Click again on the canvas to add another point.<br />" +
            "Press Backspace to delete the last point inserted.<br />" +
            "Double click near the initial point to close and finalize the line.<br />" +
            "Double click anywhere else to finalize the line without closing. <br />" +
            "Press Escape to cancel.<br />" +
            "Press Enter to finalize the line.";
    }
}