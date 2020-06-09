/**
 * Implement a Button control for the {@link Toolbox}
 * ToolButton is a class used for the UI. The action performed on the canvas is delegated to an object
 * of type {@link ToolCommand} owned by the ToolButton, implementing the Command design pattern as described in
 * [Design patterns : elements of reusable object-oriented software]
 * {@link https://read.amazon.co.uk/kp/embed?asin=B000SEIBB8&preview=newtab&linkCode=kpe&ref_=cm_sw_r_kb_dp_iaAcEbYEYF0RK}
 * @extends Tool
 */
class ToolButton extends Tool{
    /**
     * Render the options specific for the Tool.
     * These options will vary from Tool to Tool, therefore this method will be either defined when the ToolButton
     * instance is created, or defined in a derived class for the particular ToolButton.
     */
    renderOptions(){}
    /** Clear the placeholder for the Options in the dedicated space in the UI. */
    clearOptions(){}

    /**
     * Create a new instance of ToolButton
     * @param {string} id - Unique identifier for the tool
     * @param {string} name - Name of the tool
     * @param {url} icon - Icon displayed on the UI
     * @param {ToolCommand} command - Command executed when the tool is selected
     */
    constructor(id, name, icon, command){
        super(id, name, icon);
        this.command = command;
    }
    /** Render the ToolButton as an Html control */
    render(){
        const toolBarItem = p5Instance.createDiv(`<button class='btn btn-dark toolButton' id='btn_${this.id}'><img title='${this.name}' alt='${this.name}' src='${this.icon}'></button></div>`);
        toolBarItem.class('toolBarItem');
        toolBarItem.id(this.id);
        toolBarItem.parent('toolbar');

        //add an event listener for the mouse clicked event
        toolBarItem.mouseClicked(
            () => {          //arrow function
                this.select();

                //notifies the Observer of the Select event
                if(this.onSelectEvent)
                    this.onSelectEvent(this);
            }
        );
    }

    /**
     * Select this ToolButton.
     * It can be invoked by the Click event handler or by the Toolbox.
     * @param {boolean} suppressEvent - Control whether the onSelectEvent has to be fired. Default is false.
     */
    select(suppressEvent = false){
        //draw the tool selected
        this.selected = true;
        const htmlObj = p5Instance.select(`#${this.id}`); // Template literal
        if(htmlObj){
            htmlObj.style("border", "2px solid #cccccc");
        }

        //render the options in the specific area in the UI
        this.renderOptions();

        //if required, notify the observer of the select event
        if(!suppressEvent && this.onSelectEvent)
            this.onSelectEvent(this);

        console.log(`Active command: ${this.command.toString()}`);

    }

    /**
     * Unselect this ToolButton.
     * @param {boolean} suppressEvent - Control whether the onSelectEvent has to be fired. Default is false.
     */
    unselect(suppressEvent = false){
        //draw the tool unselected
        this.selected = false;

        const htmlObj = p5Instance.select(`#${this.id}`);
        if(htmlObj){
            htmlObj.style("border", "0");
        }

        //clear the options placeholder in the UI
        this.clearOptions();

        //if required, notify the observer of the deselect event
        if(!suppressEvent && this.onDeselectEvent)
            this.onDeselectEvent(this);
    }
}
