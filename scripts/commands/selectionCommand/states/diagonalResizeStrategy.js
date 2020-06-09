/**
 * This class implements a Strategy to diagonally (bottom-right) resize a Bounding Box
 * @extends ResizeStrategy
 */
class BottomRightResizeStrategy extends ResizeStrategy{
    /**
     * Resize diagonally a Bounding Box based on the mouseEvent.
     * This strategy resizes diagonally, updating the right and bottom of the Bounding Box
     * @param {BBox} bbox
     * @param  mouseEvent
     */
    resize(bbox, mouseEvent) {
        bbox.width = mouseEvent.offsetX - bbox.x;
        bbox.height = mouseEvent.offsetY - bbox.y;
    }
}

/**
 * This class implements a Strategy to diagonally (bottom-left) resize a Bounding Box
 * @extends ResizeStrategy
 */
class BottomLeftResizeStrategy extends ResizeStrategy{
    /**
     * Resize diagonally a Bounding Box based on the mouseEvent.
     * This strategy resizes diagonally, updating the right and bottom of the Bounding Box
     * @param {BBox} bbox
     * @param  mouseEvent
     */
    resize(bbox, mouseEvent) {
        bbox.width += bbox.x - mouseEvent.offsetX;
        bbox.x = mouseEvent.offsetX;
        bbox.height = mouseEvent.offsetY - bbox.y;
    }
}

/**
 * This class implements a Strategy to diagonally (top-left) resize a Bounding Box
 * @extends ResizeStrategy
 */
class TopLeftResizeStrategy extends ResizeStrategy{
    /**
     * Resize diagonally a Bounding Box based on the mouseEvent.
     * This strategy resizes diagonally, updating the right and bottom of the Bounding Box
     * @param {BBox} bbox
     * @param  mouseEvent
     */
    resize(bbox, mouseEvent) {
        bbox.width += bbox.x - mouseEvent.offsetX;
        bbox.x = mouseEvent.offsetX;
        bbox.height += bbox.y - mouseEvent.offsetY;
        bbox.y = mouseEvent.offsetY;
    }
}

/**
 * This class implements a Strategy to diagonally (top-right) resize a Bounding Box
 * @extends ResizeStrategy
 */
class TopRightResizeStrategy extends ResizeStrategy{
    /**
     * Resize diagonally a Bounding Box based on the mouseEvent.
     * This strategy resizes diagonally, updating the right and bottom of the Bounding Box
     * @param {BBox} bbox
     * @param  mouseEvent
     */
    resize(bbox, mouseEvent) {
        bbox.width = mouseEvent.offsetX - bbox.x;
        bbox.height += bbox.y - mouseEvent.offsetY;
        bbox.y = mouseEvent.offsetY;
    }
}