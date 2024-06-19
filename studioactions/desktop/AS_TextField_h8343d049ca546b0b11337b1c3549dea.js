function AS_TextField_h8343d049ca546b0b11337b1c3549dea(eventobject, changedtext) {
    var self = this;
    //kony.print("changedtext is :"+changedtext);
    var searchStr = eventobject.text;
    this.processSearch(searchStr);
}