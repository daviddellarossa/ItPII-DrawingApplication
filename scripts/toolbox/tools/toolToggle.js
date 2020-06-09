/**
 * Implement a ToggleButton for the {@link Toolbox}
 * Clicking once, the ToolToggle is activated, clicking again it is deactivated.
 * @extends ToolButton
 */
class ToolToggle extends ToolButton{
    /**
     * Create a new instance of ToolToggle
     * @param {string} id - Unique identifier for the tool
     * @param {string} name - Name of the tool
     * @param {url} icon - Icon displayed on the UI
     * @param {ToolCommand} command - Command executed when the tool is selected
     */
    constructor(id, name, icon, command){
        super(id, name, icon, command);
        this.command = command;
    }

    /** Render the ToolToggle as an Html control */
    render(){
        const toolBarItem = p5Instance.createDiv(`<button class='btn toolToggle' id='btn_${this.id}'><img title="Mirror tool" alt='Mirror tool' src='${this.icon}'></button></div>`);
        toolBarItem.class('toolBarItem');
        toolBarItem.id(this.id);
        toolBarItem.parent('toolbar');

        toolBarItem.mouseClicked(
            () => {          //arrow function
                if(this.selected){
                    this.unselect();
                }
                else{
                    this.select();
                }
            }
        );
    }

    /**
     * Renders the options specific for the Tool.
     * As at the moment there is only one type of toolToggle, for test purpose, the logic of the renderOptions is
     * contained herein.
     * In case of multiple different Toggles needed, this needs to be made independent from the ToolToggle class and
     * either injected when the toggle is created, or defined in a derived class.
     */
    renderOptions(){
        p5Instance.select(".options").html(
            "<button id='directionButton'>Make Horizontal</button>");

        //click handler
        p5Instance.select("#directionButton").mouseClicked(
            (event) => {             //arrow function
                const axis = this.command.toggleAxis();
                if (axis.x === 1 && axis.y === 0) {
                    event.currentTarget.innerText = 'Make Vertical';
                } else {
                    event.currentTarget.innerText = 'Make Horizontal';
                }
            });
    }

    /** Clear the placeholder for the Options in the dedicated space in the UI. */
    clearOptions(){
        p5Instance.select(".options").html("");
    }
}