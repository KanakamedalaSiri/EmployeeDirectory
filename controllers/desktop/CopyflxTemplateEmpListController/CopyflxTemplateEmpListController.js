define({ 

  //Type your controller code here 
  onEditEmployee:function(widget,context){
     
    this.executeOnParent("processEditIcon",context.widgetInfo.selectedItems);
  },
  onRemoveEmployee:function(widget,context){
    this.executeOnParent("processRemoveIcon",context.widgetInfo.selectedItems);
  }


});