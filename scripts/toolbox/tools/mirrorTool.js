/**
 * This tool splits the screen in two or more parts.
 * Being implemented as a Filter instead of a Command, it can be applied after the selected command has done its action
 * and can therefore work with any available drawing command. Note: this is different from how this works in the
 * provided template application, where the mirror is a tool like Pen and they are all mutually exclusive.
 * Usage:
 * Enable the mirror tool. Select a drawing tool like the line tool. After this selection, the mirror tool
 * is still active and both tools look active at the same time. Now draw. The effect of the mirror tool is of mirroring
 * whatever line the line tool creates, on the other side of the mirror line. If at this point I want to change
 * drawing tool and select a polygon tool, the line tool will be deselected, as line and polygon tools are mutually
 * exclusive, but the mirror tool will still be active.
 *
 * For more information about the Mirror Filter, please look at the following:
 * [MirrorFilter]{@link MirrorFilter}
 *
 * For more information about Commands, please look at the following:
 * [ToolCommand]{@link ToolCommand}
 *
 * @extends ToolToggle
 */
class MirrorTool extends ToolToggle{
    /**
     * Renders the options specific for the Tool.
     * As at the moment there is only one type of toolToggle, for test purpose, the logic of the renderOptions is
     * contained herein.
     * In case of multiple different Toggles needed, this needs to be made independent from the ToolToggle class and
     * either injected when the toggle is created, or defined in a derived class.
     */
    renderOptions(){
        let div = document.getElementById(`div_${this.id}`);
        if(div) return;

        let html = `
            <button id='btn_${this.id}_directionButton'>Make Horizontal</button>
        `;
        div = document.createElement("div");
        div.id = `div_${this.id}`;
        div.className = 'tb_option_container';
        div.innerHTML = html;

        let options = document.getElementById('options');
        options.appendChild(div);

        //click handler
        p5Instance.select(`#btn_${this.id}_directionButton`).mouseClicked(
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
    clearOptions() {
        let element = p5Instance.select(`#div_${this.id}`);
        if (element) {
            element.remove();
        }
    }
}