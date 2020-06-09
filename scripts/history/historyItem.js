/**
 * This class model a single item in the history of commands executed during the current drawing session
 * If contains the necessary data to rollback an action executed
 */
class HistoryItem{

    /**
     * Command executed
     * @return {ToolCommand}
     */
    get command(){ return this._command; }

    /**
     * Data necessary to rollback the action
     * @return {number[]}
     */
    get data(){ return this._data; }

    /**
     * Create an instance of the class
     * @param {ToolCommand} command - Command performed
     * @param {number[]} data - Change respect to before the command execution
     */
    constructor(command, data) {
        this._command = command;
        this._data = data;
    }

    undo(){}
    redo(){}
}