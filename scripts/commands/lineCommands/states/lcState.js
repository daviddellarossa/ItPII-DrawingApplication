/**
 * Base class for States of [Line Commands]{@link LineCommand}
 * @extends CommandState
 * @abstract
 */
class LcState extends CommandState{
    /**
     * Create a new instance of LcState
     * @param {LineCommand} command
     */
    constructor(command){
        super();
        if(command instanceof LineCommand){
            this.command = command;
        } else {
            throw new Error("Parameter 'command' must be an instance of LineCommand");
        }
    }

    /**
     * Draw the content of the command's array of points on the canvas using the BeginShape/Vertex/EndShape command
     * First invoke UpdatePixels on the context, second draw, finally it does NOT invoke LoadPixels
     */
    draw() {
        this.command.context.chain.updatePixels();
        if(this.command.points.length > 0){
            this.command.context.chain.strokeWeight(this.command.thickness);
            this.command.context.chain.beginShape();
            for(let point of this.command.points){
                this.command.context.chain.vertex(point.x, point.y);
            }
            this.command.context.chain.vertex(this.command.context.chain.mouseX, this.command.context.chain.mouseY);
            this.command.context.chain.endShape();
        }
    }
}