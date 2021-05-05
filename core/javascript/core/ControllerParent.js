class ControllerParent
{
    model;
    view;
    controllerElements=[];


    setModel(model) {
        this.model=new model();
    }

    setView(view) {
        this.view= new view();
    }


    // static modelValueChange(res)
    // {
    //     this.view.bindHTMLObjectValue(res[0],res[1],res[2],false)
    // }
}
