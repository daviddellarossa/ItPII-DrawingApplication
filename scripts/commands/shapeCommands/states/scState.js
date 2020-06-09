/**
 * Base class for States of [Shape Commands]{@link ShapeCommand}
 * @abstract
 * @extends CommandState
 * @todo
 */
class ScState extends CommandState{
    /**
     * Create a new instance of ScState
     * @param {PolygonCommand} command
     */
    constructor(command){
        super();
        if(command instanceof PolygonCommand){
            this.command = command;
        } else {
            throw new Error("Parameter 'command' must be an instance of PolygonCommand");
        }
    }
    /**
     * Draw the content of the command's array of points on the canvas using the BeginShape/Vertex/EndShape command
     * First invoke UpdatePixels on the context, second draw, finally it does NOT invoke LoadPixels
     */
    draw() {
        this.command.context.chain.updatePixels();
    }
}