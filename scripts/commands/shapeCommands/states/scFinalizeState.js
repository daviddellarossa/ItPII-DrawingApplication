/**
 * Finalize CommandState for the [Shape Command]{@link ShapeCommand}
 * @extends ScState
 */
class ScFinalizeState extends ScState {

    /**
     * Create an instance of ScFinalizeState
     * @param {ShapeCommand} command
     */
    constructor(command){
        super(command);
    }

    /**
     * Draw the final Polygon on the canvas
     */
    draw() {
        this.command.context.chain.updatePixels();

        if(this.command.isPolygonFilled){
            let colour = p5Instance.color(colourPicker.selectedColour.r, colourPicker.selectedColour.g, colourPicker.selectedColour.b, colourPicker.selectedColour.a);
            p5Instance.fill(colour);
        }
        else{
            p5Instance.noFill();
        }

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
        this.command.context.chain.vertex(
            this.command.vertices[0].x,
            this.command.vertices[0].y
        );
        this.command.context.chain.endShape(p5Instance.CLOSE);

        this.command.onBeforeCommitAction();
        this.command.context.chain.loadPixels();
        this.command.onAfterCommitAction()
    };

    /**
     * After finalization, this method resets the command and set the Idle status
     * @param event
     */
    onEpsilon(event){
        this.command.context.chain.cursor("default");
        this.draw();
        this.command.reset();
    }
}