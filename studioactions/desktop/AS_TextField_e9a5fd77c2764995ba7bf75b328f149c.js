function AS_TextField_e9a5fd77c2764995ba7bf75b328f149c(eventobject, changedtext) {
    var self = this;
    //kony.print("changedtext is :"+changedtext);
    var searchStr = eventobject.text;
    this.processSearch(searchStr);
}