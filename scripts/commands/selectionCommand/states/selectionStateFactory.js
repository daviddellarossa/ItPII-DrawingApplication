/**
 * State Factory for Selection Command
 * @extends StateFactory
 */
class SelectionStateFactory extends StateFactory{
    /**
     * Return the Idle CommandState
     * @param {SelectionCommand} command
     * @return {SlIdleState}
     */
    getIdleState(command){ return new SlIdleState(command) };
    /**
     * Return the StartSelection CommandState
     * @param {SelectionCommand} command
     * @return {SlStartSelectionState}
     */
    getStartSelectionState(command){ return new SlStartSelectionState(command) };
    /**
     * Return the ResizeSelection CommandState
     * @param {SelectionCommand} command
     * @param {ResizeStrategy} resizeStrategy
     * @return {SlResizeSelectionState}
     */
    getResizeSelectionState(command, resizeStrategy){
        return new SlResizeSelectionState(command, resizeStrategy)
    };
    /**
     * Return the SelectionComplete CommandState
     * @param {SelectionCommand} command
     * @return {SlSelectionCompleteState}
     */
    getSelectionCompleteState(command){ return new SlSelectionCompleteState(command) };
    /**
     * Return the MoveSelection CommandState
     * @param {SelectionCommand} command
     * @return {SlMoveSelectionState}
     */
    getMoveSelectionState(command){ return new SlMoveSelectionState(command) };
    /**
     * Return the Paste CommandState
     * @param {SelectionCommand} command

     * @return {SlPasteState}
     */
    getPasteState(command){ return new SlPasteState(command) };
    /**
     * Return the MovePastedSelection CommandState
     * @param {SelectionCommand} command
     * @return {SlMovePastedSelectionState}
     */
    getMovePastedSelectionState(command){ return new SlMovePastedSelectionState(command) };

    /**
     * Return the FinalizeState CommandState
     * @param {SelectionCommand} command
     * @return {SlFinalizeState}
     */
    getFinalizeState(command) { return new SlFinalizeState(command) };
}