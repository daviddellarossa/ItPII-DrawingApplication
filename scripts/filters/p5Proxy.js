/**
 * P5Proxy is the implementation of the Proxy design pattern as described in
 * [Design patterns : elements of reusable object-oriented software]
 * {@link https://read.amazon.co.uk/kp/embed?asin=B000SEIBB8&preview=newtab&linkCode=kpe&ref_=cm_sw_r_kb_dp_iaAcEbYEYF0RK}
 * This is a virtual class implemented by the {@link Filter} class and its derived classes.
 * P5Proxy replicates (part of) the interface of p5, in order to be able to implement the Chain of Responsibility
 * design pattern, also described in the aforementioned book.
 * See {@link Filter} and {@link FilterManager} for more information about the implementation of the
 * Chain of Responsibility design pattern.
 * @abstract
 */
class P5Proxy{
    line(x1, y1, x2, y2){};
    point(x, y){};
    beginShape(){};
    vertex(x, y){};
    curveVertex(x, y){}
    endShape(close){};
    rect(x, y, w, h){};
    loadPixels(){};
    updatePixels(){};
    image(img, x, y){};
    circle(x, y, d){};
    push(){};
    pop(){};

    fill(colour){};
    fill(r, g, b, a){};
    stroke(colour){};
    noStroke(){};
    strokeWeight(weight){};
    style(property, value){};

    get mouseX() { }
    get mouseY() { }

    get width(){}
    get height(){}

    get(x, y, width, height){}

    cursor(type){};

    createVector(x, y){};
}


