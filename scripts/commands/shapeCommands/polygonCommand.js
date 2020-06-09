/**
 * This command draws a polygon on the canvas.
 * @extends ShapeCommand
 */
class PolygonCommand extends ShapeCommand{

    /**
     * @param {number} value
     */
    set numberOfVertices(value){
        this._numberOfVertices = value;
        this.calculatePoints();
    }

    /**
     * @returns {number} - Number of vertices of the polygon
     */
    get numberOfVertices() { return this._numberOfVertices; }

    /**
     * Return whether the polygon is going to be filled with solid colour
     * @return {boolean}
     */
    get isPolygonFilled () { return this._isPolygonFilled; }

    /**
     * Set whether the polygon is going to be filled with solid colour
     * @param {boolean} value
     */
    set isPolygonFilled(value) { this._isPolygonFilled = value; }
    /**
     * Array of vertices
     * @returns {p5.Vector[]}
     */
    get vertices(){
        return this._vertices;
    }

    /**
     * Array of mid-points on the edges of the vertices
     * @returns {p5.Vector[]}
     */
    get midPoints(){
        return this._midPoints;
    }

    /**
     * Distance from centre to vertices
     * @param {number} value
     */
    set radius(value){
        this._radius = value;
        this.calculatePoints();
    }
    get radius(){ return this._radius; }

    /**
     * @returns {number} - Angle at the centre between to adjacent vertices
     */
    get alpha(){ return (2* Math.PI) / this.numberOfVertices; }
    get rotation() { return this._rotation; }
    set rotation(value) {
        this._rotation = value;
    }

    /**
     *
     * @param {p5.Vector} point
     */
    set centre(point){
        this._centre = point;
        this.calculatePoints();
    }
    /**
     *
     * @returns {p5.Vector} - Centre of polygon
     */
    get centre(){ return this._centre; }

    /**
     * Return the selection box around the polygon
     * @return {BBox}
     */
    get selectionBBox() { return this._selectionBBox;}

    /**
     * Set the selection box around the polygon
     * @param value {BBox}
     */
    set selectionBBox(value){
        this._selectionBBox = value;
        this._updateHandles();
    }

    /**
     * Getter for the SelectionBox handles property.
     * Return the handles for the selection Bounding Box
     * @return {Handle[]}
     */
    get selectionBBoxHandles() { return this._selectionBBoxHandles; }
    /**
     * Getter for the Polygon handles property.
     * Return the handles for the Polygon mid-points control
     * @return {Handle[]}
     */
    get polygonHandles() { return this._polygonHandles; }

    /**
     * Getter for the Handles property, returning the handles for the selection Bounding Box
     * If CTRL is pressed, the PolygonHandles are returned, otherwise the SelectionBox handles
     * @return {Handle[]}
     */
    get handles() {
        if(p5Instance.keyIsDown(17)){
            return this.polygonHandles;
        }else{
            return this.selectionBBoxHandles;
        }
    }

    /**
     * Create a new instance of PolygonCommand
     * Initialize the base class with a new instance of {@link PolygonStateFactory}
     * @param {FilterManager} context  - FilterManager for the command's context
     */
    constructor(context){
        super(context, new PolygonStateFactory());
        /**
         * StateFactory for PolygonCommand
         * @type {PolygonStateFactory}
         * @private
         */
        this._stateFactory = new PolygonStateFactory();
        this.state = this.stateFactory.getIdleState(this);

        /**
         * Selection bounding box
         * @type {BBox}
         */
        this.selectionBBox = new BBox(0, 0, 0, 0);
        this.selectionBBox.boxSizeChanged = () => {
            this._handles = GetSelectionHandles(this._selectionBBox, this.handleSize);
        };

        /**
         * Centre of the polygon
         * @type {p5.Vector}
         * @private
         */
        this._centre = this.context.chain.createVector(0, 0);

        this._rotation = 0;

        /**
         * @type {p5.Vector[]}
         * @private
         */
        this._vertices = [];
        /**
         * @type {p5.Vector[]}
         * @private
         */
        this._midPoints = [];
        /**
         * Number of vertices of the polygon
         * @type {number}
         */
        this._numberOfVertices = 4;
        /**radius of the polygon
         *
         * @type {number}
         */
        this._radius = 0;

        /**
         *
         * @type {Handle[]}
         * @private
         */
        this._polygonHandles = [];

        /**
         *
         * @type {Handle[]}
         * @private
         */
        this._selectionBBoxHandles = null;

        /**
         *
         * @type {Handle[]}
         * @private
         */
        this._activeHandles = null;

        this.calculatePoints();

    }
    _updateHandles(){
        this._handles = GetSelectionHandles(this._selectionBBox, this.handleSize);
    }

    /**
     * Size in px of the handle squares around the Bounding box
     * @type {number}
     * @default
     * @private
     */
    get handleSize() { return 8; }

    /** {@link ToolCommand.stateFactory() */
    get stateFactory() { return this._stateFactory; }

    /**
     * {@link PolygonCommand.state}
     * @returns {ScState} - Current state of the Command
     */
    get state() { return this._state; }

    /**
     * {@link PolygonCommand.state}
     * @param {ScState} value - The current state to set for the command
     */
    set state(value){
        if(value instanceof ScState){
            this._state = value;
            console.log("Transition to state " + value.toString());
        } else {
            throw new Error("value is expected to be an instance of ScState");
        }
        if(this.newTipAvailableObserver)
            this.newTipAvailableObserver(value.tip);
    }

    /**
     * Move the centre of the polygon performing a translation of each vertex and mid-point
     * then recalculate the surrounding BBox and the handles
     * @param newCentre
     */
    moveCentre(newCentre){
        for(let point of this.vertices){
            point.sub(this._centre).add(newCentre);
        }
        for(let point of this.midPoints){
            point.sub(this._centre).add(newCentre);
        }

        this._centre = newCentre;

        this.reCalculateBBox();
        this.calculateHandles();
    }

    /**
     * Scale the polygon to the new radius and rotate it based on newRotation
     * @param newRadius - New radius of the polygon. All vertices will be relocated based on this value
     * @param newRotation - Angle of the rotation. All vertices will be relocated based on this value
     */
    scaleAndRotate(newRadius, newRotation){
        p5Instance.angleMode(p5Instance.RADIANS);

        let scaleFactor = newRadius / this.radius;
        if(this.vertices.length === 0){
            this.calculatePoints();
        }

        //relocate vertices
        for(let point of this.vertices){
            point.sub(this.centre);     //translate the point to the origin
            point.rotate(newRotation);  //rotate the point
            point.mult(scaleFactor);    //scale the point
            point.add(this.centre);     //translate back in position
        }
        //relocate mid-points
        for(let point of this.midPoints){
            point.sub(this.centre);     //translate the point to the origin
            point.rotate(newRotation);  //rotate the point
            point.mult(scaleFactor);    //scale the point
            point.add(this.centre);     //translate back in position
        }
        this._radius = newRadius;
        this._rotation = newRotation;
        this.reCalculateBBox();

        this.calculateHandles();
    }

    /**
     * Calculate polygon's vertices and mid-points as p5.Vertex objects
     */
    calculatePoints(){
        this._vertices.length = 0;
        this._midPoints.length = 0;

        for(let i = 0; i < this.numberOfVertices; i++){
            this._vertices.push(
                this.context.chain.createVector(
                    this.centre.x + this.radius * Math.cos(i * this.alpha + this._rotation),
                    this.centre.y + this.radius * Math.sin(i * this.alpha + this._rotation)
                )
            );
            this._midPoints.push(
                this.context.chain.createVector(
                    this.centre.x + this.radius *
                        Math.cos(Math.PI/this.numberOfVertices) *
                        Math.cos((i + 0.5)* this.alpha + this._rotation),
                    this.centre.y + this.radius *
                        Math.cos(Math.PI/this.numberOfVertices) *
                        Math.sin((i + 0.5) * this.alpha + this._rotation)
                )
            );
        }

        this.reCalculateBBox();

        this.calculateHandles();

    }

    /**
     * Recalculate the selection Bounding Box
     */
    reCalculateBBox(){
        //calculate BBox
        let minX = this.vertices[0].x;
        let maxX = this.vertices[0].x;
        let minY = this.vertices[0].y;
        let maxY = this.vertices[0].y;

        //Set boundaries of the Bounding Box around the vertices
        for(let i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i].x < minX)
                minX = this.vertices[i].x;
            if (this.vertices[i].x > maxX)
                maxX = this.vertices[i].x;
            if (this.vertices[i].y < minY)
                minY = this.vertices[i].y;
            if (this.vertices[i].y > maxY)
                maxY = this.vertices[i].y;
        }

        //Set boundaries of the Bounding Box around the mid-points
        for(let i = 0; i < this.midPoints.length; i++) {
            if (this.midPoints[i].x < minX)
                minX = this.midPoints[i].x;
            if (this.midPoints[i].x > maxX)
                maxX = this.midPoints[i].x;
            if (this.midPoints[i].y < minY)
                minY = this.midPoints[i].y;
            if (this.midPoints[i].y > maxY)
                maxY = this.midPoints[i].y;
        }

        this._selectionBBox.reset(
            minX,
            minY,
            maxX - minX,
            maxY - minY
        );
    }

    /**
     * Calculate the handles for the selection BBox and for the Polygon control points
     */
    calculateHandles(){
        //build the selection handles
        this._selectionBBoxHandles = GetSelectionHandles.call(this, this.selectionBBox, this.handleSize);
        //builds the polygon handles
        this._polygonHandles = GetPolygonHandles(this.vertices, this.midPoints, this.handleSize);
    }
    /**
     * Reset the command, clearing the content of its variables and changing the state to Idle.
     * {@link ShapeCommand.reset}
     */
    reset(){
        this.centre = this.context.chain.createVector(
            this.context.chain.width / 2,
            this.context.chain.height / 2
        );
        this.radius = 0;
        this.state = this.stateFactory.getIdleState(this);
    }
}