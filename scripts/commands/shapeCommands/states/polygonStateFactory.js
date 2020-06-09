/**
 * StateFactory for the {@link PolygonCommand}
 * @extends ScStateFactory
 */
class PolygonStateFactory extends ScStateFactory{
    /**
     * @see ScStateFactory
     * @param {PolygonCommand} command
     * @return {ScIdleState}
     */
    getIdleState(command){ return new ScIdleState(command); };

    /**
     * @see ScStateFactory
     * @param {PolygonCommand} command
     * @return {ScFinalizeState}
     */
    getFinalizeState(command){ return new ScFinalizeState(command); };

    /**
     * @see ScStateFactory
     * @param {PolygonCommand} command
     * @return {ScPolygonSetState}
     */
    getPolygonSetState(command){ return new ScPolygonSetState(command); };

    /**
     * @see ScStateFactory
     * @param {PolygonCommand} command
     * @return {ScSetCentreState}
     */
    getSetCentreState(command){ return new ScSetCentreState(command); };

    /**
     * @see ScStateFactory
     * @param {PolygonCommand} command
     * @return {ScMoveCtrlPointsState}
     */
    getMoveCtrlPointState(command){ return new ScMoveCtrlPointsState(command); };

    /**
     * @see ScStateFactory
     * @param {PolygonCommand} command
     * @param {ResizeStrategy} resizeStrategy
     * @return {ScSetSizeState}
     */
    getSetSizeState(command, resizeStrategy){ return new ScSetSizeState(command, resizeStrategy); };

    /**
     * @see ScStateFactory
     * @param {PolygonCommand} command
     * @return {ScMoveSelectionState}
     */
    getMoveSelectionState(command){ return new ScMoveSelectionState(command); };

    /**
     * @see ScStateFactory
     * @param {PolygonCommand} command
     * @return {ScStarSetState}
     */
    getStarSetState(command){ return new ScStarSetState(command); };

    /**
     * @see ScStateFactory
     * @param {PolygonCommand} command
     * @return {ScResizeAndRotateStarState}
     */
    getResizeAndRotateStarState(command){ return new ScResizeAndRotateStarState(command) };
}