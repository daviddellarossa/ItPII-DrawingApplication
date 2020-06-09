/**
 * This class manages the interaction between the Toolbox and the [Spray Command]{@link SprayCommand}
 * @extends ToolButton
 */
class SprayTool extends ToolButton{
    renderOptions(){
        let div = document.getElementById(`div_${this.id}`);
        if(div) return;

        let numOfPointsDefault = 15;
        let maxNumOfPoints = 500;
        let minNumOfPoints = 10;
        let spreadDefault = 15;
        let maxSpread = 50;
        let minSpread = 5;
        let thicknessDefault = 1;
        let minThickness = 1;
        let maxThickness = 5;
        let html =
            `
            <div class="tb_option">
                <label for="ctrl_${this.id}_thickness">Thickness:</label>
                <input type="range" min="${minThickness}" max="${maxThickness}" value="${thicknessDefault}" class="slider" id="ctrl_${this.id}_thickness">
                <output id="out_${this.id}_thickness">${thicknessDefault}</output>
            </div>
            <div class="tb_option">
                <label for="ctrl_${this.id}_numOfPoints">Number of points:</label>
                <input type="range" min="${minNumOfPoints}" max="${maxNumOfPoints}" value="${numOfPointsDefault}" class="slider" id="ctrl_${this.id}_numOfPoints">
                <output id="out_${this.id}_numOfPoints">${numOfPointsDefault}</output>
            </div>
            <div class="tb_option">
                <label for="ctrl_${this.id}_spread">Spread:</label>
                <input type="range" min="${minSpread}" max="${maxSpread}" value="${spreadDefault}" class="slider" id="ctrl_${this.id}_spread">
                <output id="out_${this.id}_spread">${spreadDefault}</output>
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
            this.command.thickness = event.target.value;
                // this.command.context.chain.strokeWeight(event.target.value);
        };


        //Set Number of points controls
        let numOfPointsSlider = document.getElementById(`ctrl_${this.id}_numOfPoints`);
        let numOfPointsOutput = document.getElementById(`out_${this.id}_numOfPoints`);

        numOfPointsSlider.oninput = (event) => {             //arrow function
            numOfPointsOutput.value = event.target.value;
            this.command.numOfPoints = event.target.value;
        };

        //set spread controls
        let spreadSlider = document.getElementById(`ctrl_${this.id}_spread`);
        let spreadOutput = document.getElementById(`out_${this.id}_spread`);

        spreadSlider.oninput = (event) => {             //arrow function
            spreadOutput.value = event.target.value;
            this.command.spread = event.target.value;
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

        this.command.numOfPoints = numOfPointsSlider.value;
        this.command.spread = spreadSlider.value;
        this.command.thickness = thicknessSlider.value;
        // this.command.context.chain.strokeWeight(thicknessSlider.value);
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