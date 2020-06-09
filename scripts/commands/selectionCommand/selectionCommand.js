/**
 * This class implements a Selection tool that allows to cut/copy and paste rectangular selections
 * from the canvas
 * @extends ToolCommand
 */
class SelectionCommand extends ToolCommand{
    /**
     * Create an instance of SelectionCommand
     * Initialize the base class with a new instance of {@link SelectionStateFactory}
     * @param {FilterManager} context - FilterManager for the command's context
     */
    constructor(context) {
        super(context);
        /**
         * StateFactory for SelectionCommand
         * @type {SelectionStateFactory}
         * @private
         */
        this._stateFactory = new SelectionStateFactory();
        this.state = this.stateFactory.getIdleState(this);

        /**
         * Selection bounding box
         * @type {BBox}
         */
        this.selectionBBox = new BBox(0, 0, 0, 0);
        this.selectionBBox.boxSizeChanged = () => {
            this._handles = GetSelectionHandles(this._selectionBBox, this.handleSize);
        };
        /**
         * Array containing the points where the user has pasted the selection. Being multiple pastes allowed,
         * this is an array of points.
         * @type {{x: number, y:number}[]}
         */
        this.pastedSelections = [];

        /**
         * This is the image copied from the canvas
         * @type {p5.Image}
         */
        this.selectedData = null;
    }

    _updateHandles(){
        this._handles = GetSelectionHandles(this._selectionBBox, this.handleSize);
    }

    /**
     * Size in px of the handle squares around the Bounding box
     * @type {number}
     * @default
     * @private
     */
    get handleSize() { return 8; }

    /** {@link ToolCommand.stateFactory() */
    get stateFactory() { return this._stateFactory; }


    /**
     * {@link ToolCommand.state}
     * @returns {SlState} - Current state of the Command
     */
    get state() { return this._state; }

    /**
     * {@link ToolCommand.state}
     * @param {SlState} value - The current state to set for the command
     */
    set state(value){
        if(value instanceof SlState){
            this._state = value;
            console.log("Transition to state " + value.toString());
        } else {
            throw new Error("value is expected to be an instance of SlState");
        }
        if(this.newTipAvailableObserver)
            this.newTipAvailableObserver(value.tip);
    }
    /**
     * Getter for the Handles property, returning the handles for the selection Bounding Box
     * @return {Handle[]}
     * @constructor
     */
    get handles() { return this._handles; }

    get selectionBBox() { return this._selectionBBox;}
    set selectionBBox(value){
        this._selectionBBox = value;
        this._updateHandles();
    }
    /**
     * Reset the command, clearing the content of its variables and changing the state to Idle.
     * {@link ToolCommand.reset}
     */
    reset(){
        this.selectionBBox.reset(0,0,0,0);
        this.selectedData = null;
        this.pastedSelections = [];
        this.state = this.stateFactory.getIdleState(this);
    }
}