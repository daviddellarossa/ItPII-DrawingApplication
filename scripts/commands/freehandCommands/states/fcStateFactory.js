/**
 * State Factory for Freehand Commands
 * @extends StateFactory
 */
class FcStateFactory extends StateFactory{
    /**
     * Return the Idle CommandState
     * @abstract
     * @param command - An instance inherited from {@link FreehandCommand}
     * @return {FcState}
     */
    getIdleState(command){ throw new Error("Cannot invoke an abstract method") };

    /**
     * Return the Draw CommandState
     * @abstract
     * @param command - An instance inherited from {@link FreehandCommand}
     * @param startPoint - Start point, intercepted by the Idle CommandState
     * @return {FcState}
     */
    getDrawState(command, startPoint){ throw new Error("Cannot invoke an abstract method") };

    /**
     * Return the Finalize CommandState
     * @abstract
     * @param command - An instance inherited from {@link FreehandCommand}
     * @return {FcState}
     */
    getFinalizeState(command){ throw new Error("Cannot invoke an abstract method") };
}