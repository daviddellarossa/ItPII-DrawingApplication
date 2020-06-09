/**
 * StateFactory for the {@link PenCommand}
 * @extends FcStateFactory
 */
class PenStateFactory extends FcStateFactory{
    /**
     * @see FcStateFactory
     * @param {PenCommand} command
     * @return {PenIdleState}
     */
    getIdleState(command){ return new PenIdleState(command); };

    /**
     * @see FcStateFactory
     * @param {PenCommand} command
     * @param startPoint
     * @return {PenDrawState}
     */
    getDrawState(command, startPoint){ return new PenDrawState(command, startPoint); };

    /**
     * @see FcStateFactory
     * @param {PenCommand} command
     * @return {PenFinalizeState}
     */
    getFinalizeState(command){ return new PenFinalizeState(command); };
}