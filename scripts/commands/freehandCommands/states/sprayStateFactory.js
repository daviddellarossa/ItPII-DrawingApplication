/**
 * StateFactory for the {@link SprayCommand}
 * @extends FcStateFactory
 */
class SprayStateFactory extends FcStateFactory{
    /**
     * @see FcStateFactory
     * @param {SprayCommand} command
     * @return {PenIdleState}
     */
    getIdleState(command){ return new SprayIdleState(command); };

    /**
     * @see FcStateFactory
     * @param {SprayCommand} command
     * @param startPoint
     * @return {SprayDrawState}
     */
    getDrawState(command, startPoint){ return new SprayDrawState(command); };

    /**
     * @see FcStateFactory
     * @param {SprayCommand} command
     * @return {SprayFinalizeState}
     */
    getFinalizeState(command){ return new SprayFinalizeState(command); };
}