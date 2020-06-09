/**
 * Point CommandState for the [Line Command]{@link LineCommand}
 * The command is in Point CommandState after only one click on the canvas from the Idle state
 * @extends LcState
 */
class LcPointState extends LcState{
    /**
     * Create an instance of LcPointState
     * @param {LineCommand} command
     */
    constructor(command){
        super(command);
    }

    /**
     * Handler for the Mouse Left Button Click event
     * A click on the canvas when LineCommand is in Point state, adds the current point to the points array and
     * changes the state to [Line CommandState]{@link LcLineState}
     * @param event
     */
    onMlbClicked(event){
        this.command.points.push({x: event.offsetX, y: event.offsetY});
        this.command.state = this.command.stateFactory.getLineState(this.command);
    }

    /**
     * Handler for the Mouse Left Button Double Click event
     * A Double Click in PointState resets the Command to Idle state
     * @param event
     */
    onDoubleClicked(event){
        this.command.state = this.command.stateFactory.getIdleState(this.command);
    }

    /**
     * Handler for the KeyPressed event
     * Pressing the Enter key changes state to Finalize
     * Pressing the Escape key cancels the current drawing and reset to Idle state
     * Pressing the Backspace key removes the previous point from the points array and resets the command in Idle state.
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
                this.command.state = this.command.stateFactory.getIdleState(this.command);
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
        "Press Escape to cancel<br />" +
        "Press Enter to finalize the line";
    }
}