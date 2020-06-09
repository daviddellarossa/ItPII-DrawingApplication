/**
 * This class manages the interaction between the Toolbox and the [Pen Command]{@link PenCommand}
 * @extends ToolButton
 */
class PenTool extends  ToolButton{


    renderOptions(){
        let div = document.getElementById(`div_${this.id}`);
        if(div) return;

        let html =
            `
            <div class="tb_option">
                <label for="ctrl_${this.id}">Thickness:</label>
                <input type="range" min="1" max="30" value="10" class="slider" id="ctrl_${this.id}">
                <output id="out_${this.id}">10</output>
            </div>
            `;

        div = document.createElement("div");
        div.id = `div_${this.id}`;
        div.className = 'tb_option_container';
        div.innerHTML = html;

        let options = document.getElementById('options');
        options.appendChild(div);

        let slider = document.getElementById(`ctrl_${this.id}`);
        let output = document.getElementById(`out_${this.id}`);

        slider.oninput = (event) => {             //arrow function
            output.value = event.target.value;
            this.command.context.chain.strokeWeight(event.target.value);
        };

        //set default value
        this.command.context.chain.strokeWeight(slider.value);
    }
    /** Clear the placeholder for the Options in the dedicated space in the UI. */
    clearOptions(){
        let element = p5Instance.select(`#div_${this.id}`);
        if(element){
            element.remove();
            this.command.context.chain.strokeWeight(1);
        }
    }
}