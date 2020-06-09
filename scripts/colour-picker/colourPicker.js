/**
 * This class is an adapter for the pick-a-color  modified version integrated in this application
 */
class ColourPicker{
    /**
     * Creates an instance of ColourPicker.
     * Creates an instance of pickAColour and attaches to event listeners to the events 'change' and 'alphaChanged'
     */
    constructor() {
        $(document).ready(function () {
            let pickACol = $(".pick-a-color").pickAColor({
                showSpectrum            : true,
                showSavedColors         : true,
                saveColorsPerElement    : true,
                fadeMenuToggle          : true,
                showAdvanced		    : true,
                showBasicColors         : true,
                showAlpha               : true,
                showHexInput            : false,
                allowBlank		        : true,
                inlineDropdown		    : true
            });
        });

        /**
         * This event listener is fired when the selected colour is changed
         */
        $("#fore-colour").on("change", (e) => {
            if(this.colourChangedObserver){
                let r = parseInt(`0x${e.target.value.substring(0, 2)}`);
                let g = parseInt(`0x${e.target.value.substring(2, 4)}`);
                let b = parseInt(`0x${e.target.value.substring(4, 6)}`);
                this._selectedColour.r = r;
                this._selectedColour.g = g;
                this._selectedColour.b = b;
                this.colourChangedObserver(this._selectedColour);
            }
        }) ;

        /**
         * This event listener is fired when the alpha value is changed
         */
        $("#fore-colour").on("alphaChanged", (e, myData) => {
            //now set alpha
            this._selectedColour.a = myData;
            this.colourChangedObserver(this._selectedColour);
        });

        this._selectedColour = {r:0, g:0, b:0, a:255};
        this.colourChangedObserver(this._selectedColour);
    }

    /**
     * Return the current selected colour
     * @return {{r: number, g: number, b: number, a: number}}
     */
    get selectedColour() { return this._selectedColour; }

    /**
     * Return the current background colour
     * @return {{r: number, g: number, b: number, a: number}}
     */
    get backgroundColour(){ return  { r: 255, g: 255, b: 255, a: 255}; }

    get handlersColour() { return  { r: 128, g: 128, b: 128, a: 255};}

    /**
     * This delegate function notifies the caller that the selected colour has changed
     * @type {function({r: number, g: number, b: number, a:number})}
     */
    colourChangedObserver = (color)=>{};
}
