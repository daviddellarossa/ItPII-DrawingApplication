/**
 * State Factory for the {@link PolylineCommand}
 * @extends LcStateFactory
 */
class PolylineStateFactory extends LcStateFactory{
    /**
     * @see LcStateFactory
     * @param {PolylineCommand} command
     * @return {LcIdleState}
     */
    getIdleState(command){ return new LcIdleState(command) };

    /**
     * @see LcStateFactory
     * @param {PolylineCommand} command
     * @return {LcPointState}
     */
    getPointState(command){ return new LcPointState(command) };

    /**
     * @see LcStateFactory
     * @param {PolylineCommand} command
     * @return {LcLineState}
     */
    getLineState(command){ return new LcLineState(command) };

    /**
     * @see LcStateFactory
     * @param {PolylineCommand} command
     * @return {LcPolygonState}
     */
    getPolygonState(command){ return new LcPolygonState(command) };

    /**
     * @see LcStateFactory
     * @param {PolylineCommand} command
     * @return {LcCloseState}
     */
    getCloseState(command){ return new LcCloseState(command) };

    /**
     * @see LcStateFactory
     * @param {PolylineCommand} command
     * @return {LcFinalizeState}
     */
    getFinalizeState(command){ return new LcFinalizeState(command) };
}