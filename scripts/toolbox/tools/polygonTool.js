/**
 * This class manages the interaction between the Toolbox and the [Polygon Command]{@link PolygonCommand}
 * @extends ToolButton
 */
class PolygonTool extends  ToolButton{
    renderOptions(){

        let div = document.getElementById(`div_${this.id}`);
        if(div) return;

        let thicknessDefault = 1;
        let minThickness = 1;
        let maxThickness = 5;
        let numOfVerticesDefault = 3;
        let minNumOfVertices = 3;
        let maxNumOfVertices = 12;

        let html =
            `
            <div class="tb_option">
                <label for="ctrl_${this.id}_thickness">Thickness:</label>
                <input type="range" min="${minThickness}" max="${maxThickness}" value="${thicknessDefault}" class="slider" id="ctrl_${this.id}_thickness">
                <output id="out_${this.id}_thickness">${thicknessDefault}</output>
            </div>
            <div class="tb_option">
                <label for="ctrl_${this.id}_numOfVertices">Number of vertices:</label>
                <input type="range" min="${minNumOfVertices}" max="${maxNumOfVertices}" value="${numOfVerticesDefault}" class="slider" id="ctrl_${this.id}_numOfVertices">
                <output id="out_${this.id}_numOfVertices">${numOfVerticesDefault}</output>
            </div>
            <div class="tb_option">
            <label for="ctrl_${this.id}_filled">Fill</label>
                <input type="checkbox" id="ctrl_${this.id}_filled">
            </div>
            `;

        div = document.createElement("div");
        div.id = `div_${this.id}`;
        div.className = 'tb_option_container';
        div.innerHTML = html;

        let options = document.getElementById('options');
        options.appendChild(div);

        //Set thickness controls
        let thicknessSlider = document.getElementById(`ctrl_${this.id}_thickness`);
        let thicknessOutput = document.getElementById(`out_${this.id}_thickness`);

        thicknessSlider.oninput = (event) => {             //arrow function
            thicknessOutput.value = event.target.value;
            this.command.context.chain.strokeWeight(event.target.value);
        };

        //Set Number of vertices controls
        let numOfVerticesSlider = document.getElementById(`ctrl_${this.id}_numOfVertices`);
        let numOfVerticesOutput = document.getElementById(`out_${this.id}_numOfVertices`);

        numOfVerticesSlider.oninput = (event) => {             //arrow function
            numOfVerticesOutput.value = event.target.value;
            this.command.numberOfVertices = event.target.value;
        };

        //Set Fill controls
        let fillCheckbox = document.getElementById(`ctrl_${this.id}_filled`);
        fillCheckbox.onclick = (event)=> {
            this.command.isPolygonFilled = event.target.checked === true;
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
        this.command.numberOfVertices = numOfVerticesSlider.value;
        this.command.context.chain.strokeWeight(thicknessSlider.value);
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