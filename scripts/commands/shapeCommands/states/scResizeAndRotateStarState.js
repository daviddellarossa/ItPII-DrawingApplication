/**
 * In this state it is possible to resize and rotate the polygon, maintaining the centre
 * @extends ScState
 */
class ScResizeAndRotateStarState extends ScState{
    /**
     * Create an instance of the class
     * @param {PolygonCommand} command
     */
    constructor(command) {
        super(command);
        /**
         * Previous mouse position
         * @type {p5.Vector}
         */
        this.previousClickPosition = null;
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

        //draw the vertices
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

        //draw the closure vertex
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
     * Move the selection box
     * @param event
     */
    onMouseDragged(event) {

        //this method assigns properties to _rotation and _radius, instead of rotation and radius, to avoid having
        //calculatePoints called multiple times. Instead, it calls it directly once at the end

        let newRotation;

        //If ctrl is pressed, rotate in steps of 15 degrees
        if(p5Instance.keyIsDown(17)){ //CTRL
            let rotationSlowingFactor = 20;
            //Rotate in steps of 15 degrees
            newRotation = (Math.PI/12) *
                (Math.floor((this.command.centre.x - event.offsetY)/rotationSlowingFactor));
        }else{
            let rotationSlowingFactor = 90;
            newRotation = (this.previousClickPosition.y - event.offsetY)/rotationSlowingFactor; //Rotate freely
        }

        //If shift is pressed, do not rotate
        if(p5Instance.keyIsDown(16)) { //SHIFT
            newRotation = 0;
        }
        let newRadius = this.command._radius;
        if(!p5Instance.keyIsDown(18)){ //if alt is pressed, do not scale
            newRadius = p5Instance.dist(
                this.command.centre.x,
                this.command.centre.y,
                event.offsetX,
                this.command.centre.y);
        }

        this.previousClickPosition = p5Instance.createVector(event.offsetX, event.offsetY);

        this.command.scaleAndRotate(newRadius, newRotation);
    }

    /**
     * When the mouse is released, the move operation is terminated and the state returns to PolygonSet state
     * @param event
     */
    onMouseReleased(event) {
        this.command.state = this.command.stateFactory.getStarSetState(this.command);
    }

    /**
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return  "Click and drag on the polygon to reposition.<br />" +
            "Click and drag on the handles to resize the selection.<br />" +
            "Press CTRL to enable the Control Handles and change the shape of the polygon.<br />" +
            "Press Escape to cancel.<br />" +
            "Press Enter to finalize.";
    }
}