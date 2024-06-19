function AS_TextField_e1120709298a4988b19b9bb926fd3912(eventobject, changedtext) {
    var self = this;
    //kony.print("changedtext is :"+changedtext);
    var searchStr = eventobject.text;
    this.processSearch(searchStr);
}