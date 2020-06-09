/**
 * This class implements a Strategy to horizontally (centre-right) resize a Bounding Box
 * @extends ResizeStrategy
 */
class CentreRightResizeStrategy extends ResizeStrategy{
    /**
     * Resize diagonally a Bounding Box based on the mouseEvent.
     * This strategy resizes diagonally, updating the right and bottom of the Bounding Box
     * @param {BBox} bbox
     * @param  mouseEvent
     */
    resize(bbox, mouseEvent) {
        bbox.width = mouseEvent.offsetX - bbox.x;
    }
}

/**
 * This class implements a Strategy to horizontally (centre-left) resize a Bounding Box
 * @extends ResizeStrategy
 */
class CentreLeftResizeStrategy extends ResizeStrategy{
    /**
     * Resize diagonally a Bounding Box based on the mouseEvent.
     * This strategy resizes diagonally, updating the right and bottom of the Bounding Box
     * @param {BBox} bbox
     * @param  mouseEvent
     */
    resize(bbox, mouseEvent) {
        bbox.width += bbox.x - mouseEvent.offsetX;
        bbox.x = mouseEvent.offsetX;
    }
}