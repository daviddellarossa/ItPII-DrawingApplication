/**
 * Set Size CommandState for the [Shape Command]{@link ShapeCommand}
 * Dragging the mouse in this state sets the polygon radius
 * @extends ScState
 */
class ScSetSizeState extends ScState {

    /**
     * Create an instance of ScSetSizeState
     * @param {PolygonCommand} command
     * @param {ResizeStrategy} resizeStrategy
     */
    constructor(command, resizeStrategy){
        super(command);
        if(resizeStrategy === null)
            resizeStrategy = new BottomRightResizeStrategy();

        /**
         * Contains the Strategy delegated to execute the resize logic. This depends on where the user started the
         * drag operation in the previous state.
         * @type {ResizeStrategy}
         */
        this.resizeStrategy = resizeStrategy;
    }

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

        //draw vertices
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
        //add closure vertex
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
     * Handler of the Mouse Dragged event (Mouse moved while a button is pressed)
     * While this event is raised, the resizing is ongoing and the actual resize operation is delegated to the
     * resizeStrategy object.
     * If SHIFT is pressed, no rotation is performed, only scaling
     * If ALT is pressed, no scaling is performed, only rotation
     * If CTRL is pressed, the rotation is performed in steps of 15 degrees
     * If CTRL is not pressed, the rotation is continue
     * @param event
     */
    onMouseDragged(event){
        //this method assigns properties to _rotation and _radius, instead of rotation and radius, to avoid having
        //calculatePoints called multiple times. Instead, it calls it directly once at the end

        //If ctrl is pressed, rotate in steps of 15 degrees
        if(p5Instance.keyIsDown(17)){ /** CTRL */
            let rotationSlowingFactor = 20;
            //Rotate in steps of 15 degrees
            this.command._rotation =(Math.PI/12) *
                (Math.floor((this.command.centre.x - event.offsetY)/rotationSlowingFactor));
        }else{
            let rotationSlowingFactor = 90;
            this.command._rotation = (this.command.centre.y - event.offsetY)/rotationSlowingFactor; //Rotate freely
        }

        // console.log(`rotation ${this.command._rotation}`);
        //If shift is pressed, do not rotate
        if(p5Instance.keyIsDown(16)) { /** SHIFT */
            this.command._rotation = 0;
        }

        if(!p5Instance.keyIsDown(18)){ //if alt is pressed, do not scale
            this.command._radius = p5Instance.dist(
                this.command.centre.x,
                this.command.centre.y,
                event.offsetX,
                this.command.centre.y);
        }

        this.command.calculatePoints();
    }

    /**
     * Releasing the mouse in this state sets the command in [PolygonSet]{@link ScPolygonSetState}
     * @param event
     */
    onMouseReleased(event){
        this.command.state = this.command.stateFactory.getPolygonSetState(this.command);
    }

    /**
     * Handler for the KeyPressed event
     * Pressing the Escape key cancels the current drawing and reset to Idle state
     * @param event
     * @param event
     */
    onKeyPressed(event){
        if(event.keyCode === 27 /** ESCAPE */ ){
            this.command.state = new ScIdleState(this.command);
        }
    }

    /**
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return "Drag the mouse over the canvas to resize the selection.<br />" +
            "Dragging in the X direction will resize the polygon. Press ALT to block the Size.<br />" +
            "Dragging in the Y direction will rotate the polygon. Press Shift to block the Rotation.<br />" +
            "Press CTRL to rotate in steps of 15&#176;<br />" +
            "Release the mouse when the selection is done.";
    }
}