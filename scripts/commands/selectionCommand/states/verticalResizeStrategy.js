/**
 * This class implements a Strategy to vertically (bottom-centre) resize a Bounding Box
 * @extends ResizeStrategy
 */
class BottomCentreResizeStrategy extends ResizeStrategy{
    /**
     * Resize diagonally a Bounding Box based on the mouseEvent.
     * This strategy resizes diagonally, updating the right and bottom of the Bounding Box
     * @param {BBox} bbox
     * @param  mouseEvent
     */
    resize(bbox, mouseEvent) {
        bbox.height = mouseEvent.offsetY - bbox.y;
    }
}

/**
 * This class implements a Strategy to vertically (top-centre) resize a Bounding Box
 * @extends ResizeStrategy
 */
class TopCentreResizeStrategy extends ResizeStrategy{

    /**
     * Resize diagonally a Bounding Box based on the mouseEvent.
     * This strategy resizes diagonally, updating the right and bottom of the Bounding Box
     * @param {BBox} bbox
     * @param  mouseEvent
     */
    resize(bbox, mouseEvent) {
        bbox.height += bbox.y - mouseEvent.offsetY;
        bbox.y = mouseEvent.offsetY;

    }
}
