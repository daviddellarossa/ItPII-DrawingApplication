/**
 * Base class for States of [Selection Commands]{@link SelectionCommand}
 * @extends CommandState
 * @abstract
 */
class SlState extends CommandState{
    /**
     * Create a new instance of SlState
     * @param {SelectionCommand} command
     */
    constructor(command){
        super();
        if(command instanceof SelectionCommand){
            this.command = command;
        } else {
            throw new Error("Parameter 'command' must be an instance of SelectionCommand");
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

