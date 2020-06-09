/**
 * This implements an element on the Toolbox having the sole purpose to separate other tools on the User Interface.
 * It is not selectable, nor clickable
 * @extends Tool
 */
class ToolSeparator extends Tool {
    /**
     * Create a new ToolSeparator instance
     * @param {string} id - Unique identifier for the tool
     * @param {string} name - Name of the tool
     * @param {url} icon - Icon displayed on the UI
     */
    constructor(id, name, icon) {
        super(id, name, icon)
    }

    /** Render the Tool as an Html object in the toolbox */
    render() {
        const toolBarItem = p5Instance.createDiv();
        toolBarItem.class('toolBarItem toolBarSeparator');
        toolBarItem.id(this.id);
        toolBarItem.parent('toolbar');
    }
}