/**
 * This class manages the interaction between the Toolbox and the [Selection Command]{@link SelectionCommand}
 * @extends ToolButton
 */
class SelectionTool extends ToolButton{
    renderOptions() {
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
    }

    clearOptions() {
        //clear tips div
        let tipDiv = document.getElementById(`tip_${this.id}`);
        if(tipDiv){
            tipDiv.remove();
        }
    }
}