/**
 * MoveSelectionState for the [Polygon Command]{@link PolygonCommand}
 * In this state the polygon is repositioned in the canvas based on the mouse position
 * @extends ScState
 */
class ScMoveSelectionState extends ScState {
    /**
     * Create an instance of ScMoveSelectionState
     * @param command
     */
    constructor(command) {
        super(command);
        /**
         * Previous mouse position
         * @type {p5.Vector}
         */
        this.previousClickPosition = null;
        /**
         *
         * @type {ScState}
         */
        this.returnToState = this.command.stateFactory.getPolygonSetState(this.command);
    }

    /**
     * Draw on canvas
     */
    draw(){
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

        //draw closure vertex
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


        for(let handle of this.command.selectionBBoxHandles){
            handle.draw();
        }

        this.command.context.chain.pop();
    }

    /**
     * Move the polygon following the mouse position
     * @param event
     */
    onMouseDragged(event) {
        let delta = p5Instance.createVector(
            event.offsetX - this.previousClickPosition.x,
            event.offsetY - this.previousClickPosition.y
        );
        let newCentre = p5.Vector.add(this.command.centre, delta);
        this.command.moveCentre(newCentre);

        this.previousClickPosition.x = event.offsetX;
        this.previousClickPosition.y = event.offsetY;
    }

    /**
     * When the mouse is released, the move operation is terminated and the state returns to PolygonSet state
     * @param event
     */
    onMouseReleased(event) {
        this.command.state = this.returnToState;
    }

    /**
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return "Drag the mouse around to reposition the polygon.<br />" +
            "Release the mouse when the selection is done.";
    }
}