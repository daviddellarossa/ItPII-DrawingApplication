/**
 * Container of buttons on the UI.
 * Manages the user interaction with the UI, notifying the {@link p5Instance} of the changes in the tools selected.
 *
 * ToolCommands implement the action associated to the tools displayed on the toolbox.
 * Each tool in the toolbox has an associated command and, when selected, notifies the p5App (with an observer pattern)
 * of the change in selection.
 * The p5App then changes its state, assigning to its property selectedCommand a reference to the new command.
 * When the command is assigned to selectedCommand property, it starts receiving all the mouse and key events
 * from the p5App.
 * As soon as another Tool is selected from the user interface, the selectedCommand is changed and the previous command
 * no longer receives the mouse events.
 */
class Toolbox{
    /** Returns the currently selected tool */
    get selectedTool(){
        for(let tool of this.tools){
            if (tool.selected === true) return tool;
        }
        return null;
    }

    /**
     * Create a new instance of Toolbox
     */
    constructor(){
        /** Controls Multiple Selection on the toolbar. By default Multiple Selection is set to false */
        this.allowMultipleSelection = false;
        /** Collection of tools managed by the toolbox */
        this.tools = [];

        //Observer pattern: the observers (only one in this case) will be notified when a tool is
        //selected or deselected
        /** Observer for the Select event */
        this.onSelectEvent = null;
        /** Observer for the Deselect event */
        this.onDeselectEvent = null;
    }

    /**
     * Add a {@link Tool} to the toolbar
     * @param {Tool} tool - The tool being added to the toolbar
     */
    addTool(tool){
        //Check that the tool is an instance of Tool
        if(!(tool instanceof Tool)){
            throw new Error("Parameter 'tool' must be a valid instance of Tool class");
        }

        this.tools.push(tool);

        //html render the tool on the toolbox
        tool.render();

        //attach an event handler for the onSelectEvent on the tool
        //this event is fired when the user selects the tool
        tool.onSelectEvent =
            (source) =>     //arrow function
            {
                if(!this.allowMultipleSelection){
                    for(let tool of this.tools){
                        if(!(tool instanceof ToolButton)) //skip non clickable tools like ToolSeparators
                            continue;

                        if(tool !== source){
                            tool.unselect(true); //unselect all others
                        }
                    }
                }
                //Observer pattern: Notification of the Select event
                if(this.onSelectEvent !== undefined)
                    this.onSelectEvent(source.command);

            };

        //attach an event handler for the onDeselectEvent on the tool
        //this event is fired when the user deselects the tool
        tool.onDeselectEvent =
            (source) =>     //arrow function
            {
                //Observer pattern: Notification of the Deselect event
                if(this.onDeselectEvent !== undefined)
                    this.onDeselectEvent(source.command);

            };
    }

    /**
     * Select the tool at position index
     * @param {int} index - index of the tool in the tools collection been selected
     */
    selectIndex(index){
        this.tools[index].select();
    }
}