/**
 * Set Ctrl Point CommandState for the [Shape Command]{@link ShapeCommand}
 * In this state the Control points can be moved, changing the shape of the polygon
 * @extends ScState
 */
class ScMoveCtrlPointsState extends ScState {

    /**
     * Create an instance of ScMoveCtrlPointsState
     * @param {PolygonCommand} command
     */
    constructor(command){
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

        for(let handle of this.command.handles){
            handle.draw();
        }

        this.command.context.chain.pop();
    }

    /**
     * Move the Control point based on the mouse location
     * @param event
     */
    onMouseDragged(event) {

        for(let handle of this.command.polygonHandles){
            if(handle.contains({x: event.offsetX, y: event.offsetY})){
                this._handleMoved = handle;
            }
        }
        let points;
        if(this._handleMoved.tag === "midpoint"){ //if the handle is a 'midpoint'
            points = this.command.midPoints;
        }else{ //if the handle is a 'vertex'
            points = this.command.vertices;
        }

        let delta = p5Instance.createVector(
            event.offsetX - this.previousClickPosition.x,
            event.offsetY - this.previousClickPosition.y
        );

        /*
        O origin of the coordinate system O(0,0)
        C coordinates of the centre of the polygon
        P new position
         */

        //position of the centre of polygon respect to the origin
        let OC = this.command.centre;

        //distance of the point P from the centre C of the polygon
        let CP = p5.Vector.sub(this.previousClickPosition, OC);

        //factor of scale
        let c = p5.Vector.add(CP, delta).mag()/CP.mag();

        //relocate each point doing a translation/scaling
        for(let point of points){
            point.sub(OC).mult(c).add(OC);
        }

        this.previousClickPosition.x = event.offsetX;
        this.previousClickPosition.y = event.offsetY;

        this.command.reCalculateBBox();
        this.command.calculateHandles();
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
        return "Drag the mouse around to reshape of the polygon.<br />" +
            "Release the mouse when the reshaping is done.";
    }
}