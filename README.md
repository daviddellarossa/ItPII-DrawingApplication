# ItPII-DrawingApplication
Final project for the course Introduction to programming II at the University of London - BSc Computer Science

The assignment was something like:
Based on a given template, write a drawing application in javascript, using the graphic library P5.js.
Some basic tools and functionalities were given, asking to improve them and implement more features.
This is an extract from my submission.

In my application, drawing tools are implemented using the Command design pattern. Through a
sequence of states, the commands draw on the canvas. The output of a command is then passed to a
sequence of filters, implemented as a Chain of Responsibility, where each filter performes an action onto
the input and sends the result to the next in chain and eventually to the canvas.
1. Polygon tool:
Draws a regular polygon. The user can choose the number of edges, move, scale, rotate the
polygon.
It is also possible to move the edges' midpoints and transform the polygon into a regular star.
Each state of the command controls one of the operations that can be possibly done on the
polygon, like SetCentre, Move, Rotate, etc.
2. History Management:
Implements Undo/Redo operations. This is useful as every drawing operation is permanently
merged into the canvas. With this feature it is possible to undo or redo a configurable number of
actions.

Before committing any action, the difference-array between the after-the-action and the before-
the-action arrays is calculated, compressed using the RLE algorithm and saved into a stack. To

undo, the last action is popped from the stack, uncompressed and re-apply to the canvas, and
finally pushed into a second array of the redo-able actions.
3. Colour Picker:
UI control to select any possible colour and set transparency for the current drawing action.
An external library has been used, which did not support transparency. Therefore, I added this
functionality by myself.
4. Selection tool (Scissor tool):
allows selection of a rectangular portion of the canvas, copy and paste multiple times.
5. Freehand tools:
This is a group of tools, Pen, Spray and Eraser. They work similarly. The difference is that Pen
draws a continuous trait using colour and transparency set in the Colour-Picker. It provides a
control for the width of the trait; Spray creates a circular array of points of which Spread, Number
of Points and Size of Points can be controlled from the UI, along with colour and transparency.
Eraser is like Pen, but it always uses the background colour.
6. Polyline tool:
Draws a polyline on the screen adding an additional point at every click on the canvas. Double
clicking near the starting point closes the polyline.
7. Mirror tool:
It is implemented as a Filter and can therefore be used with any of the drawing commands.
