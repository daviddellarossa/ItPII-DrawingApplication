/**
 * Finalize CommandState for the [Selection Command]{@link SelectionCommand}
 * @extends SlState
 */
class SlFinalizeState extends SlState{
    /**
     * Create an instance of slFinalizeState
     * @param {SelectionCommand} command
     */
    constructor(command){
        super(command);
    }

    /**
     * Draw the polyline on the canvas using beginShape/vertex/endShape functions of p5's.
     */
    draw() {
        this.command.context.chain.updatePixels();
        for(let selection of this.command.pastedSelections){
            this.command.context.chain.image(this.command.selectedData, selection.x, selection.y);
        }
        this.command.onBeforeCommitAction();
        this.command.context.chain.loadPixels();
        this.command.onAfterCommitAction()
    };

    /**
     * Final draw of the polyline, invoking the {@link draw} method and reset of the command
     * @param event
     */
    onEpsilon(event){
        this.draw(); //final draw
        this.command.reset();
    }
}