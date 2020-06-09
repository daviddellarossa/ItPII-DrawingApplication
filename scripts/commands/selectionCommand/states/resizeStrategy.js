/**
 * Base class for ResizeStrategy classes, containing the logic to resize a bounding box
 * @abstract
 */
class ResizeStrategy{
    /**
     * Perform the resizing of the Bounding Box based on the mouseEvent.
     * The logic to do the resizing is further specified in the derived classes.
     * @param {BBox} bbox
     * @param mouseEvent
     * @abstract
     */
    resize(bbox, mouseEvent){ throw Error('Cannot invoke an abstract method');}
}