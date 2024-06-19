define({ 

  showSegmentData:function(widget, context){

    this.executeOnParent("expandLocationDetail",context);
  },

  onEditLocation:function(widget,context){
    debugger;
    this.executeOnParent("editLocation",context.widgetInfo.selectedItems[0]);
  },
  onRemoveLocation:function(widget,context){
    var locationObj={
      "rowItem":context.widgetInfo.selectedItems[0],
      "rowIndex":context.rowIndex
    }
    this.executeOnParent("removeLocation",locationObj);
  }

});
