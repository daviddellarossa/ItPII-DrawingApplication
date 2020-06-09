/** Icons from https://material.io/resources/icons */

/** Reference to the Colour Palette */
let colourPicker = null;

/**
 * Setup function used to create an instance of p5.
 * This is passed as input parameter for the p5 constructor
 * @param p - Managed by the p5 constructor
 */
let p5jsApp = function(p) {

    /**
     * Selected command from the toolbox. When the user selects a button on the toolbox, a reference
     * to the associated command is put into this variable.
     * @type {ToolCommand}
     */
    let selectedCommand = null;

    /**
     * Reference to the Toolbox containing the Commands {@link Toolbox}
     * @type {Toolbox}
     */
    let tbCommands = null;

    /**
     * Reference to the Toolbox containing the Filters {@link Toolbox}
     * @type {Toolbox}
     */
    let tbFilters = null;

    /**
     * Reference to the {@link FilterManager} class
     * @type {FilterManager}
     */
    let filterManager = null;

    /**
     * Reference to the {@link HistoryManager} class
     * @type {HistoryManager}
     */
    let historyManager = null;


    p.setup = function() {
        let canvasContainer = p.select('#content');
        let canvas = p.createCanvas(canvasContainer.size().width, canvasContainer.size().height);
        canvas.parent("content");

        //create helper functions and the colour palette
        colourPicker = new ColourPicker();
        colourPicker.colourChangedObserver = (color)=>
        {
            let p5Colour = p.color(color.r, color.g, color.b, color.a);
            p5Instance.fill(p5Colour);
            p5Instance.stroke(p5Colour);
        };

        //create an instance of the HistoryManager
        historyManager = new HistoryManager(this);

        //create an instance of the FilterManager
        filterManager = new FilterManager(this);

        //create a toolbox for storing the command tools
        tbCommands = new Toolbox();

        //populate the command Toolbox adding the ToolButtons

        //ToolButton for PolylineCommand
        tbCommands.addTool(
            new PolylineTool("tbLineTool",
                "Line tool",
                "assets/polyline-24px.svg",
                new PolylineCommand(filterManager)
            )
        );

        //ToolButton for PenCommand
        tbCommands.addTool(
            new PolylineTool("tbFreehandTool",
                "Freehand tool",
                "assets/freehand-24px.svg",
                new PenCommand(filterManager)
            )
        );

        //ToolButton for EraserCommand
        tbCommands.addTool(
            new PolylineTool("tbEraserTool",
                "Eraser tool",
                "assets/eraser.svg",
                new EraserCommand(filterManager)
            )
        );

        //ToolButton for SprayCommand
        tbCommands.addTool(
            new SprayTool("tbSprayTool",
                "Spray tool",
                "assets/spraycan-24px.svg",
                new SprayCommand(filterManager)
            )
        );
        //ToolButton for SelectionCommand - Icon from https://material.io/resources/icons/?search=copy&icon=file_copy&style=baseline
        tbCommands.addTool(
            new SelectionTool("tbSelectionTool",
                "Select-copy-paste tool",
                "assets/file_copy-24px.svg",
                new SelectionCommand(filterManager)
            )
        );
        //ToolButton for PolygonCommand
        tbCommands.addTool(
            new PolygonTool("tbPolygonTool",
                "Polygon tool",
                "assets/polygon.svg",
                new PolygonCommand(filterManager)
            )
        );


        //add a separator between the Command toolbar and the Filter toolbar
        tbCommands.addTool(
            new ToolSeparator("tbSeparator",
                "Separator",
                "assets/separator-64.png"
            )
        );

        //event handler for selection events on the command toolbox
        tbCommands.onSelectEvent =
            (source) => {            //arrow function
                selectedCommand = source;
                //store the pixel status before an action is committed by the selectedCommand.
                //This is saved by the onBeforeCommitAction event and reused byt the onAfterCommitAction event
                let pixelsBefore = null;
                //event handler for the onBeforeCommitAction event.
                // Saves the pixel status before the commit of an action
                selectedCommand.onBeforeCommitAction = ()=>{
                    pixelsBefore = p5Instance.pixels;
                };
                //event handler for the onAfterCommitAction event.
                //retrieve the current pixel status after the commit and pass it along with pixelBefore
                //(previously saved by onBeforeCommitAction, to the historyManager.
                //Finally, it clears the pixelsBefore variable.
                selectedCommand.onAfterCommitAction = ()=>{
                    if(!pixelsBefore)
                        throw new Error('Error creating a HistoryItem: pixelsBefore array is empty.');
                    let pixelsAfter = p5Instance.pixels;

                    historyManager.done(selectedCommand, pixelsBefore, pixelsAfter);
                    pixelsBefore = null;
                };

            };

        //select the default command
        tbCommands.selectIndex(0);

        //create a toolbox for storing the filter tools
        tbFilters = new Toolbox();

        //this toolbar allows multiple selection
        tbFilters.allowMultipleSelection = true;

        //populate the command Toolbox adding the ToolButtons

        //ToolButton for the Mirror filter
        tbFilters.addTool(
            new MirrorTool("tbMirrorTool1",
                "Mirror tool",
                "assets/flip-24px.svg",
                new MirrorFilter('mirrorFilter1', this)
            )
        );

        //event handler for the selection event on the filter toolbox
        tbFilters.onSelectEvent =
            (source) => {     //arrow function
                filterManager.addFilter(source);
            };

        //event handler for the deselection event on the filter toolbox
        tbFilters.onDeselectEvent =
            (source) => {     //arrow function
                filterManager.removeFilter(source);
            };

        //add a separator between the Command toolbar and the Filter toolbar
        tbCommands.addTool(
            new ToolSeparator("tbSeparator2",
                "Separator",
                "assets/separator-64.png"
            )
        );

        //set the background
        p.background(255);

        //event handler for the click event on the clearButton
        this.select("#clearButton").mouseClicked(function(){
            tbCommands.selectedTool.command.reset();
            p5Instance.background(255, 255, 255);
            p5Instance.loadPixels();
        });

        //event handler for the click event on the saveImageButton
        this.select("#saveImageButton").mouseClicked(function(){
            p5Instance.saveCanvas("myPicture", "jpg");
        });

        this.select('#undoButton').mouseClicked(function(){
            historyManager.undo();
        })

        this.select('#redoButton').mouseClicked(function(){
            historyManager.redo();
        })

    };

    p.draw = function() {
        p.noFill();

        //invokes the draw method on the selected command
        tbCommands.selectedTool.command.draw();
    };

    //The following event listeners invoke the correspondent method onto the selected command
    p.mouseClicked = (e) =>{     //arrow function
        //if canvas not found, return
        let canvas = $('#content canvas')[0];
        if(!canvas) return;

        //if this event is not for the canvas, return
        if(e.target.id !== canvas.id) return;

        selectedCommand.onMlbClicked(e);
    };
    p.mousePressed = (e) =>{     //arrow function
        //if canvas not found, return
        let canvas = $('#content canvas')[0];
        if(!canvas) return;

        //if this event is not for the canvas, return
        if(e.target.id !== canvas.id) return;

        selectedCommand.onMousePressed(e);
    };
    p.mouseReleased = (e) =>{     //arrow function
        //The mouseReleased is always sent to the command, in order to be able to execute the finalization even when the
        //mouse is out of the canvas.
        //if(e.target.id != $('#content canvas')[0].id) return;

        selectedCommand.onMouseReleased(e);
    };
    p.mouseMoved = (e) => {     //arrow function
        //if canvas not found, return
        let canvas = $('#content canvas')[0];
        if(!canvas) return;

        //if this event is not for the canvas, return
        if(e.target.id !== canvas.id) return;

        selectedCommand.onMouseMoved(e);
    };
    p.mouseWheel = (e) => {     //arrow function
        //if canvas not found, return
        let canvas = $('#content canvas')[0];
        if(!canvas) return;

        //if this event is not for the canvas, return
        if(e.target.id !== canvas.id) return;

        selectedCommand.onMouseWheel(e);
    };
    p.doubleClicked = (e) => {     //arrow function
        //if canvas not found, return
        let canvas = $('#content canvas')[0];
        if(!canvas) return;

        //if this event is not for the canvas, return
        if(e.target.id !== canvas.id) return;

        selectedCommand.onDoubleClicked(e);
    } ;
    p.mouseDragged = (e) => {     //arrow function
        //if canvas not found, return
        let canvas = $('#content canvas')[0];
        if(!canvas) return;

        //if this event is not for the canvas, return
        if(e.target.id !== canvas.id) return;

        selectedCommand.onMouseDragged(e);
    } ;
    p.keyPressed = (e) => {     //arrow function
        //History Management
        //intercept events CTRL+Z (undo) and CTRL+Y(redo)
        if (e.keyCode === 90 /*Z*/ && e.ctrlKey) {
            historyManager.undo();
        }
        if (e.keyCode === 89 /*Y*/ && e.ctrlKey) {
            historyManager.redo();
        }

        //The keyPressed is always sent to the command, in order to be able to execute the finalization even when the
        //mouse is out of the canvas.
        selectedCommand.onKeyPressed(
            {
                keyCode: p.keyCode,
                isCtrlDown: p.keyIsDown(p.CONTROL),
                isShiftDown: p.keyIsDown(p.SHIFT)
            }
        )
    }

};

/** Instance of p5 */
let p5Instance = new p5(p5jsApp);
