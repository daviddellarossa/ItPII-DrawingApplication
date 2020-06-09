/**
 * Handle object used for control points in selection boxes or polygons.
 * Dragging a handle changes the object controlled by the handle, such as moving or scaling the object.
 */
class Handle{
    /**
     *
     * @param {BBox} bbox - the bounding box defining the handle
     * @param {function} drawHandler - function that actually draw the handler
     * @param {ResizeStrategy} resizeStrategy - function that performs the resizing
     * @param {string} cursor - The cursor to display when hovering the handle
     * @param {object} tag - Additional information, for example the type of handle
     */
    constructor(bbox, drawHandler, resizeStrategy, cursor, tag = null) {
        /**
         * @type {BBox}
         * @private
         */
        this._BBox = bbox;
        this._drawHandler = drawHandler;

        this._resizeStrategy = resizeStrategy;

        this._cursor = cursor;
        this._tag = tag;
    }

    /**
     * Return a reference to the delegate set to perform the resizing
     * @return {ResizeStrategy}
     */
    get resizeStrategy(){ return this._resizeStrategy; }

    /**
     * Return the cursor name used when hovering the handle
     * @return {string}
     */
    get cursor(){ return this._cursor; }

    /**
     * Return the additional information contained in this variable
     * @return {Object}
     */
    get tag(){return this._tag;}

    /**
     * @return {BBox}
     * @constructor
     */
    get BBox(){ return this._BBox; }

    /**
     * Return whether the handle contains a point. Used to determine if the mouse is hovering the handle
     * @param point - Point to verify
     * @return {boolean} - Is the point contained within the handle bounding box
     */
    contains(point){
        return this.BBox.contains(point);
    }

    draw(){
        this._drawHandler(this);
    }
}

/**
 * Return a collection of handlers for a polygon defined by the vertices collection
 * @param {p5.Vector[]} vertices - Vertices defining the polygon
 * @param {p5.Vector[]} midpoints - Midpoints of the polygon's edges
 * @param {number} handleSize - Size of the handles
 * @return {Handle[]} - Collection of handles
 * @constructor
 */
function GetPolygonHandles(vertices, midpoints, handleSize){
    //handler for the draw event of the handle
    let polygonHandleDraw = (obj) => {
        p5Instance.rect(
            obj.BBox.x,
            obj.BBox.y,
            obj.BBox.width,
            obj.BBox.height
        );
    };
    /**
     *
     * @type {Handle[]}
     */
    let handles = [];
    for(let vertex of vertices) {

         handles.push(
             new Handle(
                new BBox(
                    vertex.x - handleSize / 2,
                    vertex.y - handleSize /2,
                    handleSize ,
                    handleSize
                ),
                polygonHandleDraw,
                new TopLeftResizeStrategy(),
                "crosshair",
                 "vertex"
            )
         );
    }
    for(let vertex of midpoints) {

        handles.push(
            new Handle(
                new BBox(
                    vertex.x - handleSize / 2,
                    vertex.y - handleSize /2,
                    handleSize ,
                    handleSize
                ),
                polygonHandleDraw,
                new TopLeftResizeStrategy(),
                "crosshair",
                "midpoint"
            )
        );
    }
    return handles;
}

/**
 * Return a collection of handlers for the bounding box passed as input parameter
 * @param bbox - Bounding box to generate the handles for
 * @param handleSize - Size of the handles
 * @return {(Handle|BBox)[]} - Collection of handles
 * @constructor
 */
function GetSelectionHandles(bbox, handleSize){
    //handler for the draw event of the handle
    let polygonHandleDraw = (obj) => {
        p5Instance.rect(
            obj.BBox.x,
            obj.BBox.y,
            obj.BBox.width,
            obj.BBox.height
        );

    };

    return [
        new Handle(
            new BBox(
                bbox.x - handleSize / 2,
                bbox.y - handleSize /2,
                handleSize,
                handleSize
            ),
            polygonHandleDraw,
            new TopLeftResizeStrategy(),
            "crosshair"
        ),
        new Handle(
            new BBox(
                bbox.x + bbox.width - handleSize / 2,
                bbox.y - handleSize /2,
                handleSize,
                handleSize
            ),
            polygonHandleDraw,
            new TopRightResizeStrategy(),
            "crosshair"
        ),
        /**
         * Handle on the bottom-left vertex
         * @type {BBox}
         */
        new Handle(
            new BBox(
                bbox.x - handleSize / 2,
                bbox.y + bbox.height - handleSize /2,
                handleSize,
                handleSize
            ),
            polygonHandleDraw,
            new BottomLeftResizeStrategy,
            "crosshair"
        ),
        /**
         * Handle on the bottom-right vertex
         * @type {BBox}
         */
        new Handle(
            new BBox(
                bbox.x + bbox.width - handleSize / 2,
                bbox.y + bbox.height - handleSize /2,
                handleSize,
                handleSize
            ),
            polygonHandleDraw,
            new BottomRightResizeStrategy(),
            "crosshair"
        ),
        /**
         * Handle on the top-centre edge
         * @type {BBox}
         */
        new Handle(
            new BBox(
                bbox.x + (bbox.width / 2) - handleSize / 2,
                bbox.y - handleSize /2,
                handleSize,
                handleSize
            ),
            polygonHandleDraw,
            new TopCentreResizeStrategy(),
            "crosshair"
        ),
        /**
         * Handle on the bottom-centre edge
         * @type {BBox}
         */
        new Handle(
            new BBox(
                bbox.x + (bbox.width / 2) - handleSize / 2,
                bbox.y + bbox.height - handleSize /2,
                handleSize,
                handleSize
            ),
            polygonHandleDraw,
            new BottomCentreResizeStrategy(),
            "crosshair"
        ),
        /**
         * Handle on the centre-left edge
         * @type {BBox}
         */
        new Handle(
            new BBox(
                bbox.x - handleSize / 2,
                bbox.y + (bbox.height / 2) - handleSize /2,
                handleSize,
                handleSize
            ),
            polygonHandleDraw,
            new CentreLeftResizeStrategy(),
            "crosshair"
        ),
        /**
         * Handle on the centre-right edge
         * @type {BBox}
         */
        new Handle(
            new BBox(
                bbox.x + bbox.width - handleSize / 2,
                bbox.y + (bbox.height / 2) - handleSize /2,
                handleSize,
                handleSize
            ),
            polygonHandleDraw,
            new CentreRightResizeStrategy(),
            "crosshair"
        )
    ];
}