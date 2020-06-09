/**
 * Polygon Set CommandState  for the [Shape Command]{@link PolygonCommand}
 * In this state, the information collected, centre and radius, is enough to draw the polygon
 * The command is also ready to perform additional actions on the polygon, like move, resize...
 * Pressing the CTRL command while in this state shows the polygon handles, that allow to move the mid-point
 * of the polygon and create star like shapes.
 * @extends ScState
 */
class ScPolygonSetState extends ScState {
    /**
     * Create an instance of ScPolygonSetState
     * @param {PolygonCommand} command
     */
    constructor(command){
        super(command);
    }

    draw() {
        this.command.context.chain.updatePixels();

        if(this.command.isPolygonFilled){
            let colour = p5Instance.color(
                colourPicker.selectedColour.r,
                colourPicker.selectedColour.g,
                colourPicker.selectedColour.b,
                colourPicker.selectedColour.a);
            p5Instance.fill(colour);
        }
        else{
            p5Instance.noFill();
        }

        //draw the polygon
        this.command.context.chain.beginShape();
        for(let i = 0; i < this.command.numberOfVertices; i++){
            this.command.context.chain.vertex(
                this.command.vertices[i].x,
                this.command.vertices[i].y
            );
            this.command.context.chain.vertex(
                this.command.midPoints[i].x,
                this.command.midPoints[i].y
            );
        }
        //add the closure vertex
        this.command.context.chain.vertex(
            this.command.vertices[0].x,
            this.command.vertices[0].y
        );
        this.command.context.chain.endShape(p5Instance.CLOSE);

        //draw handles
        this.command.context.chain.push();
        this.command.context.chain.stroke("black");
        this.command.context.chain.strokeWeight(1);
        this.command.context.chain.fill(255, 255, 255, 200);

        //if CTRL is pressed, draw polygon handles instead of selection handles
        if(!p5Instance.keyIsDown(17)) { /** CTRL */
            for(let handle of this.command.selectionBBoxHandles){
                handle.draw();
            }
        }else {
            for(let i=0; i< this.command.polygonHandles.length; i++){
                this.command.polygonHandles[i].draw();
            }
        }
        this.command.context.chain.pop();
    }

    /**
     * Handler of the Mouse Dragged event (Mouse moved while a button is pressed)
     * If the Drag event starts on one of the handles, the selection is resized. The proper resize logic is injected
     * in the ResizeSelection state, depending on which handle is being used.
     * If the Drag event starts within the selection box, a move operation starts.
     * @param event
     */
    onMouseDragged(event) {
        let point = p5Instance.createVector(event.offsetX, event.offsetY);
        let newState;

        let isInHandles = false;
        for(let handle of this.command.handles){
            isInHandles |= handle.contains({ x: event.offsetX, y: event.offsetY});
        }
        let isInBBox = this.command.selectionBBox.contains({x: event.offsetX, y: event.offsetY});


        if(isInHandles && p5Instance.keyIsDown(17)){
            //Click in handle and CTRL pressed: move control point
            newState = this.command.stateFactory.getMoveCtrlPointState(this.command);
            newState.previousClickPosition = point;
            this.command.state = newState;
        }else if(isInHandles && !p5Instance.keyIsDown(17)){
            //Click in handle and CTRL not pressed: reset the centre and redraw
            newState = this.command.stateFactory.getSetCentreState(this.command);
            this.command.state = newState;
        }else if (!isInHandles && !isInBBox){
            //Click outside handles and BBox: reset the centre and redraw
            newState = this.command.stateFactory.getSetCentreState(this.command);
            this.command.state = newState;
            this.command.state.onMousePressed(event);

        }else if (!isInHandles && isInBBox){
            //within the shape: move the shape
            newState = this.command.stateFactory.getMoveSelectionState(this.command);
            newState.previousClickPosition = point;
            this.command.state = newState;
        }
    }

    /**
     * Handler for the KeyPressed event
     * Pressing the Enter key changes state to Finalize
     * Pressing the Escape key cancels the current drawing and reset to Idle state
     * @param event
     */
    onKeyPressed(event){
        switch(event.keyCode){
            case 27: /** ESCAPE */
                this.command.reset();
                break;
            case 13: /** ENTER */
                this.command.state = this.command.stateFactory.getFinalizeState(this.command);
                this.command.state.onEpsilon();
                break;
        }
    }

    /**
     * Change the mouse cursor depending on where on the selection it is hovering
     * @param event
     */
    onMouseMoved(event) {
        let point = {x: event.offsetX, y: event.offsetY};

        let handleFound;
        for(let handle of this.command.handles){
            if(handle.contains(point))
            {
                handleFound = handle;
                break;
            }
        }
        //change mouse cursor
        if(handleFound)
            this.command.context.chain.cursor(handleFound.cursor);
        else if(this.command.selectionBBox.contains(point)) {
            this.command.context.chain.cursor("move");
        }else{
            this.command.context.chain.cursor("default");
        }
    }

    /**
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return  "Click and drag on the polygon to reposition.<br />" +
            "Click and drag on the handles to resize the polygon.<br />" +
            "Press CTRL to enable the Control Handles and change the shape of the polygon.<br />" +
            "Press Escape to cancel.<br />" +
            "Press Enter to finalize.";
    }
}