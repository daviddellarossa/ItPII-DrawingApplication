/**
 * State Factory for Shape Commands
 * @extends StateFactory
 */
class ScStateFactory extends StateFactory{
    /**
     * Return the [Idle CommandState]{@link ScIdleState}
     * @abstract
     * @param command - An instance inherited from {@link ShapeCommand}
     * @return {ScState}
     */
    getIdleState(command){ throw new Error("Cannot invoke an abstract method") };

    /**
     * Return the [Finalize CommandState]{@link ScFinalizeState}
     * @abstract
     * @param command - An instance inherited from {@link ShapeCommand}
     * @return {ScState}
     */
    getFinalizeState(command){ throw new Error("Cannot invoke an abstract method") };

    /**
     * Return the [PolygonSet CommandState]{@link ScPolygonSetState}
     * @abstract
     * @param command - An instance inherited from {@link ShapeCommand}
     * @return {ScState}
     */
    getPolygonSetState(command){ throw new Error("Cannot invoke an abstract method") };

    /**
     * Return the [SetCentre CommandState]{@link ScSetCentreState}
     * @abstract
     * @param command - An instance inherited from {@link ShapeCommand}
     * @return {ScState}
     */
    getSetCentreState(command){ throw new Error("Cannot invoke an abstract method") };

    /**
     * Return the [MoveCtrlPoint CommandState]{@link ScMoveCtrlPointsState}
     * @abstract
     * @param command - An instance inherited from {@link ShapeCommand}
     * @return {ScState}
     */
    getMoveCtrlPointState(command){ throw new Error("Cannot invoke an abstract method") };

    /**
     * Return the [SetSize CommandState]{@link ScSetSizeState}
     * @abstract
     * @param command - An instance inherited from {@link ShapeCommand}
     * @param {ResizeStrategy} resizeStrategy
     * @return {ScState}
     */
    getSetSizeState(command, resizeStrategy){ throw new Error("Cannot invoke an abstract method") };

    /**
     * @abstract
     * @param command - An instance inherited from {@link ShapeCommand}
     * @return {ScState}
     */
    getStarSetState(command){ throw new Error("Cannot invoke an abstract method") };

    /**
     * @abstract
     * @param command - An instance inherited from {@link ShapeCommand}
     * @return {ScState}
     */
    getResizeAndRotateStarState(command){ throw new Error("Cannot invoke an abstract method") };
}