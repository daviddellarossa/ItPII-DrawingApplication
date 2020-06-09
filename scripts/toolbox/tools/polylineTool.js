/**
 * This class manages the interaction between the Toolbox and the [Polyline Command]{@link PolylineCommand}
 * @extends ToolButton
 */
class PolylineTool extends  ToolButton{

    renderOptions(){
        let thicknessDefault = 10;
        let minThickness = 1;
        let maxThickness = 50;

        let div = document.getElementById(`div_${this.id}`);
        if(div) return;

        let html =
            `<div class="tb_option">
                <label for="ctrl_${this.id}">Thickness:</label>
                <input type="range" min=${minThickness}" max=${maxThickness}" value="${thicknessDefault}" class="slider" id="ctrl_${this.id}">
                <output id="out_${this.id}">${thicknessDefault}</output>
            </div>`;

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
            //this.command.context.chain.strokeWeight(event.target.value);
            this.command.thickness = event.target.value;
        };

        //get the tips div
        let tips = document.getElementById('tip_content');
        //prepare the html to inject into the tips div
        let tipHtml = (tip)=> { return `<div id="tip_${this.id}">${tip}</div>`; };
        //attach an observer to the command to detect changes in the current Tip
        if(!this.command.newTipAvailableObserver){
            this.command.newTipAvailableObserver = (tip)=>{
                tips.innerHTML = tipHtml(tip);
            };
        }
        //read the initial value for the tip
        tips.innerHTML = tipHtml(this.command.currentTip);

        //set default value
        //this.command.context.chain.strokeWeight(slider.value);
        this.command.thickness = slider.value;
    }
    /** Clear the placeholder for the Options in the dedicated space in the UI. */
    clearOptions(){
        let element = p5Instance.select(`#div_${this.id}`);
        if(element){
            element.remove();
            this.command.context.chain.strokeWeight(1);
        }

        //clear tips div
        let tipDiv = document.getElementById(`tip_${this.id}`);
        if(tipDiv){
            tipDiv.remove();
        }

    }
}