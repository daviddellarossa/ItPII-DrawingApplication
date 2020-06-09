/**
 * The purpose of the History is to provide the application of the capability of undo one or more action,
 * or redo one just ondo-ed, leaving the canvas in the same state it had before executing the undo-ed action.
 *
 * Structure
 * The HistoryManager object is made of two stacks. The first one contains the commands previously executed,
 * along with the information required to bring the canvas back to the state prior the command execution,
 * and is thereby called the undo-stack. When an action is undo-ed, the undo-ed command and its undo state are
 * popped out of the undo-stack and pushed into the second stack, which we will refer to as the redo-stack.
 * Not all the actions executed on the canvas can be undo-ed.
 * Undo-ing an action means popping out the top of the undo-stack, revert its effect on the canvas and push
 * the same action in the redo stack.
 * Redo-ing an action means popping out the top of the redo-stack, re-apply its effect on the canvas and
 * pushing it in the undo stack.
 * Note that if in the middle of an undo-redo sequence of operation a new action is performed, the redo-stack gets
 * invalidated and the actions still contained get lost.
 *
 * Implementation:
 * As the Originator is the canvas, and the information therein contained is an array of pixels,
 * saving the entire array for each command executed could be expensive in terms of memory consumption.
 * The approach hereby followed will be to save a copy of the array of pixels before applying the command
 * (with the p5js function loadPixels()), then apply the command, load again the array of pixels (loadPixels()),
 * calculate the difference of the two arrays pixel-by-pixel, compress this array of differences with a
 * lossless compression algorithm (Run-Length Encoding) and save it as the state.
 * In this way, the difference-array should contain information only in the positions of those pixels actually
 * altered by the executed action, leaving all the untouched pixels as 0.
 * A lossless compression algorithm should be able to reasonably compress the image and save some space at the expenses
 * of the execution time of the calculation, difference and compression.
 * When restoring the state, the previous state of the canvas should be reached subtracting the uncompressed state
 * from the current array.
 *
 * The History class has four public methods:
 * done: adds an executed command to the history's undo-stack. This flushes the redo-stack;
 * undo: reverts the effects of the execution of the command at the top of the undo-stack and pushes it into the redo-stack;
 * redo: Re-executes the command at the top of the redo-stack (if any), pops it and pushes it into the undo-stack;
 * flushRedos: deletes the content of the _redos stack
 *
 * It also exposes two properties:
 *
 * _undos: the list of commands in the undo-stack (useful for the undo/redo list of items in the Edit menu);
 * _redos: the list of commands in the redo-stack (useful for the undo/redo list of items in the Edit menu).
 *
 * Usage:
 * Undo: CTRL + Z
 * Redo: CTRL + Y
 */
class HistoryManager{

    /**
     * Max Number of actions saved in history
     * @type {number}
     * @private
     */
    _maxBufferLength = 10;
    /**
     *
     * @param {p5Instance} p5
     */
    constructor(p5) {
        this._p5Instance = p5;
    }

    /**
     * Stack of HistoryItems containing the information required to undo an action
     * @type {HistoryItem[]}
     * @private
     */
    _undos = [];

    /**
     * Stack of HistoryItems, initially empty.
     * When an action is undone, it is put into the redos stack so that it can be redone.
     * If the redos stack contains items when a new command is executed, the redos stack is flushed
     * @type {HistoryItem[]}
     * @private
     */
    _redos = [];

    /**
     *
     * @param {ToolCommand} command
     * @param {number[]} pixelsBefore - Pixel status before the action is committed
     * @param {number[]} pixelsAfter - Pixel status after the action is committed
     */
    done(command, pixelsBefore, pixelsAfter){

        //add the action to undos;

        /**
         * Array of difference byte-by-byte between pixelsAfter and pixelsBefore
         * @type {number[]}
         */
        let difference = [];

        //save the difference After-Before into difference
        for(let i = 0; i < pixelsBefore.length; i++){
            if(pixelsBefore !== pixelsAfter){
                difference[i] = pixelsAfter[i] - pixelsBefore[i];
            }
        }
        //instantiate the RunLengthEncoding algorithm
        let rle = new RunLengthEncoding();
        //encode the difference with the RunLengthEncoding algorithm
        let compressedData = rle.encode(difference);
        //create a new historyItem object
        let historyItem = new HistoryItem(command, compressedData);
        //add the historyItem object to the _Undos array
        this._undos.push(historyItem);

        //always keep the _undos array no longer than the _maxBufferLength
        while(this._undos.length >this._maxBufferLength){
            this._undos.shift();
        }

        //flush redos
        this.flushRedos();
    }

    /**
     * Revert the effects of the last executed command
     */
    undo(){
        //if the _undos array is empty, return
        if(this._undos.length === 0)
            return;

        //retrieve the action to be undone from the _undos array
        let historyItem = this._undos.pop();

        //undo the action

        //instantiate the RunLengthEncoding algorithm
        let rle = new RunLengthEncoding();
        //decode the difference array
        let difference = rle.decode(historyItem.data);

        //reset the canvas' pixels to the status pre-action
        for(let i = 0; i < difference.length; i++){
            this._p5Instance.pixels[i] = this._p5Instance.pixels[i] - difference[i];
        }
        //commit the changes to the canvas
        this._p5Instance.updatePixels();
        //move the historyItem into redos
        this._redos.push(historyItem);

        console.log(`Undoing ${historyItem.command.toString()}`);
    }

    /**
     * Re-applies the effect of the last undone command
     */
    redo(){
        //if the _redos array is empty, return
        if(this._redos.length === 0)
            return;
        //retrieve the action to be re-done from the _redos array
        let historyItem = this._redos.pop();
        //redo the action

        //instantiate the RunLengthEncoding algorithm
        let rle = new RunLengthEncoding();
        let difference = rle.decode(historyItem.data);

        //apply the changes of the action directly to the pixels array
        for(let i = 0; i < difference.length; i++){
            this._p5Instance.pixels[i] = this._p5Instance.pixels[i] + difference[i];
        }
        //commit the changes to the canvas
        this._p5Instance.updatePixels();

        //move the historyItem into undos
        this._undos.push(historyItem);

        console.log(`Redoing ${historyItem.command.toString()}`);
    }

    /**
     * Empty out the _redos array
     */
    flushRedos(){
        this._redos.length = 0;
    }
}