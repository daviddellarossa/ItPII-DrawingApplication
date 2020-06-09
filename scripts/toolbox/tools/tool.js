/**
 * Base class for the tools managed by the toolbar.
 * Each tool is rendered an an HTML control
 */
class Tool{
    /**
     * @param {string} id - Unique identifier for the tool
     * @param {string} name - Name of the tool
     * @param {url} icon - Icon displayed on the UI
     */
    constructor(id, name, icon){
        this.id = id;
        this.name = name;
        this.icon = icon;
    }
    /** Virtual method for Render */
    render(){ }
    /** Event fired when the tool is selected by a User action */
    onSelectEvent(){ }
    /** Event fired when the tool is deselected by a User action */
    onDeselectEvent(){ }
}
