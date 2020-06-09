/**
 * Idle CommandState for the [Polygon Command]{@link PolygonCommand}
 * Starts the Polygon drawing process
 * @extends ScState
 */
class ScIdleState extends ScState {

    /**
     * Create an instance of ScIdleState
     * @param {PolygonCommand} command
     */
    constructor(command){
        super(command);
        this.draw(); //needed to clean after Escape
        this.command.context.chain.loadPixels();  //without this line the canvas is not refreshed
    }

    /**
     * Handler for the Mouse Left Button Click event.
     * A click on the canvas, when PolygonCommand is in Idle state, starts the polygon drawing process,
     * changes the state to [SetCentreState]{@link ScSetCentreState} and passes the MousePressed event to it
     * @param event
     */
    onMousePressed(event){
        this.command.state = this.command.stateFactory.getSetCentreState(this.command);
        this.command.state.onMousePressed(event);
    }

    /**
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return "Click on the canvas to set the centre of the polygon.";
    }
}