/**
 * @extends ScState
 */
class ScStarSetState extends ScState{
    /**
     * Create an instance of the class
     * @param {PolygonCommand} command
     */
    constructor(command) {
        super(command);
    }

    /**
     * Draw the polygon. In this state, as the midpoints have been moved, additional points, the mid-points,
     * are needed to draw the polygon.
     */
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
            //add a vertex
            this.command.context.chain.vertex(
                this.command.vertices[i].x,
                this.command.vertices[i].y
            );
            //add the midpoint next to it
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
     * Dragging in this state moves the polygon following the mouse position.
     * This requires recalculating the vertices and the mid-points
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
            //Click in handle and CTRL not pressed: resize/rotate
            newState = this.command.stateFactory.getResizeAndRotateStarState(this.command);
            newState.previousClickPosition = point;
            this.command.state = newState;
        }else if (!isInHandles && !isInBBox){
            //Click outside handles and BBox: reset the centre and redraw
            newState = this.command.stateFactory.getSetCentreState(this.command);
            this.command.state = newState;
            this.command.state.onMousePressed(event);
        }else if (!isInHandles && isInBBox){
            //Click not in handles but in BBox: move the polygon
            newState = this.command.stateFactory.getMoveSelectionState(this.command);
            newState.returnToState = this.command.stateFactory.getStarSetState(this.command);
            newState.previousClickPosition = point;
            this.command.state = newState;
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
     * Handler for the KeyPressed event
     * Pressing the Enter key changes state to Finalize
     * Pressing the Escape key cancels the current drawing and reset to Idle state
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