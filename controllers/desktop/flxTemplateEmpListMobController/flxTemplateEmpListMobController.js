define({ 

  showSegmentData:function(widget, context){
    //debugger;

      this.executeOnParent("expandEmployeeDetailMob",context);
  },
  
   onEditEmployee:function(widget,context){
    
    this.executeOnParent("processEditIcon",context.widgetInfo.selectedItems);
  },
  onRemoveEmployee:function(widget,context){
    this.executeOnParent("processRemoveIcon",context.widgetInfo.selectedItems);
  }

});

