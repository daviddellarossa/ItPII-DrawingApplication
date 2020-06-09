/**
 * Base class for States of [Freehand Commands]{@link FreehandCommand}
 * @extends CommandState
 * @abstract
 */
class FcState extends CommandState{
    /**
     * Create a new instance of FcState
     * @param {FreehandCommand} command
     */
    constructor(command){
        super();
        if(! command instanceof FreehandCommand){
            throw new Error("Parameter 'command' must be an instance of FreehandCommand");
        }
        this.command = command;
    }

    /**
     * Draw the content of the command's array of points on the canvas using the Line command
     * First invoke UpdatePixels on the context, second draw, finally invoke LoadPixels
     */
    draw() {
        this.command.context.chain.updatePixels();
        if(this.command.points.length > 0) {
            this.command.context.chain.strokeWeight(this.command.thickness);
            this.command.context.chain.beginShape();
            for (let point of this.command.points) {
                this.command.context.chain.curveVertex(point.x, point.y);
            }
            this.command.context.chain.endShape();
        }
    }
}