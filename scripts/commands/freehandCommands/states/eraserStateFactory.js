/**
 * StateFactory for the {@link EraserCommand}
 * @extends FcStateFactory
 */
class EraserStateFactory extends FcStateFactory{
    /**
     * @see FcStateFactory
     * @param {EraserCommand} command
     * @returns {EraserIdleState}
     */
    getIdleState(command){ return new EraserIdleState(command); }

    /**
     * @see FcStateFactory
     * @param {EraserCommand} command
     * @param startPoint
     * @return {EraserDrawState}
     */
    getDrawState(command, startPoint){ return new EraserDrawState(command); }

    /**
     * @see FcStateFactory
     * @param {EraserCommand} command
     * @return {EraserFinalizeState}
     */
    getFinalizeState(command){ return new EraserFinalizeState(command); }
}