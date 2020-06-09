/**
 * Idle state for the [Line Command]{@link LineCommand}
 * @extends LcState
 */
class LcIdleState extends LcState {
    /**
     * Create an instance of LcIdleState
     * @param {LineCommand} command
     */
    constructor(command){
        super(command);
        this.command.points.length = 0;
        this.command.isClosed = false;
        this.draw(); //needed to clean after Escape
        this.command.context.chain.loadPixels();  //without this line the canvas is not refreshed
    }

    /**
     * Handler for the Mouse Left Button Click event.
     * A click on the canvas when LineCommand is in Idle state, adds the current point to the points array and
     * changes the state to [Point CommandState]{@link LcPointState}
     * @param event
     */
    onMlbClicked(event){
        this.command.points.push({x: event.offsetX, y: event.offsetY});
        this.command.state = this.command.stateFactory.getPointState(this.command);
    }

    /**
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return "Click on the canvas to set the initial point of the line.";
    }
}