/**
 * Base class for the Commands' states
 * Each implementation of [ToolCommand]{@link ToolCommand} implement a custom set of States for its internal state
 * machine through a specialization of [StateFactory]{@link StateFactory}.
 *
 * Derived classes:
 * [FcState]{@link FcState} for Freehand Command's State Machine
 * [LcState]{@link LcState} for Line Command's State Machine
 * [SlState]{@link SlState} for Selection Command's State Machine
 * [ScState]{@link ScState} for Shape Command's State Machine
 *
 */
class CommandState{
    /**
     * empty constructor
     */
    constructor() {
    }
    /**
     * Draw on canvas
     */
    draw(){ }

    /**
     * Handler of the Mouse Left Button Click event
     * @param event
     */
    onMlbClicked(event){
        //console.log('No change in state on onMlbClicked')
    }

    /**
     * Handler of the Mouse Right Button Click event
     * @param event
     */
    onMrbClicked(event){
        //console.log('No change in state on onMrbClicked')
    }

    /**
     * Handler of the Mouse Double Click event
     * @param event
     */
    onDoubleClicked(event){
        //console.log('No change in state on onDoubleClicked')
    }

    /**
     * Handler of the Mouse Button Pressed event
     * @param event
     */
    onMousePressed(event){
        //console.log('No change in state on onMousePressed')
    }

    /**
     * Handler of the Mouse Button Release event
     * @param event
     */
    onMouseReleased(event){
        //console.log('No change in state on onMouseReleased')
    }

    /**
     * Handler of the Mouse Wheel event
     * @param event
     */
    onMouseWheel(event){
        //console.log('No change in state on onMouseWheel')
    }

    /**
     * Handler of the Mouse Moved event
     * @param event
     */
    onMouseMoved(event){
        //console.log('No change in state on onMouseMoved')
    }

    /**
     * Handler of the Mouse Dragged event (Mouse moved while a button is pressed)
     * @param event
     */
    onMouseDragged(event){
        //console.log('No change in state on onMouseDragged')
    }

    /**
     * Handler of the Key Pressed event
     * @param event
     */
    onKeyPressed(event){
        //console.log('No change in state on onKeyPressed')
    }

    /**
     * Function invoked when a change in state is required without a mouse or keyboard event involved.
     * It is like an epsilon link in Non-deterministic Finite CommandState automata
     * @param event
     */
    onEpsilon(event){
        //console.log('No change in state on onEpsilon')
    }

    /**
     * Return the name of the CommandState for debug purpose
     * @return {string}
     */
    toString = () => {
        return this.constructor.name;
    };

    /**
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return "";
    }
}