/**
 * State Factory for Line Commands
 * @extends StateFactory
 */
class LcStateFactory extends StateFactory{
    /**
     * Return the Idle CommandState
     * @abstract
     * @param command - An instance inherited from {@link LineCommand}
     * @return {LcState}
     */
    getIdleState(command){ throw new Error("Cannot invoke an abstract method") };

    /**
     * Return the Point CommandState
     * @abstract
     * @param command - An instance inherited from {@link LineCommand}
     * @return {LcState}
     */
    getPointState(command){ throw new Error("Cannot invoke an abstract method") };

    /**
     * Return the Line CommandState
     * @abstract
     * @param command - An instance inherited from {@link LineCommand}
     * @return {LcState}
     */
    getLineState(command){ throw new Error("Cannot invoke an abstract method") };

    /**
     * Return the Polygon CommandState
     * @abstract
     * @param command - An instance inherited from {@link LineCommand}
     * @return {LcState}
     */
    getPolygonState(command){ throw new Error("Cannot invoke an abstract method") };

    /**
     * Return the Close CommandState
     * @abstract
     * @param command - An instance inherited from {@link LineCommand}
     * @return {LcState}
     */
    getCloseState(command){ throw new Error("Cannot invoke an abstract method") };

    /**
     * Return the Finalize CommandState
     * @abstract
     * @param command - An instance inherited from {@link LineCommand}
     * @return {LcState}
     */
    getFinalizeState(command){ throw new Error("Cannot invoke an abstract method") };

}