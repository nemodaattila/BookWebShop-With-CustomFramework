/**
 * class ControllerParent
 * JS kontroller-ek ősosztálya
 */
class ControllerParent {
    model;
    view;

    setModel(model) {
        this.model = new model();
    }

    setView(view) {
        this.view = new view();
    }
}
