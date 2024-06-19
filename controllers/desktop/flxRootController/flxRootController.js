define({ 

  //Type your controller code here 
  onEdit:function(widget,context){
     
    voltmx.print("Widget: "+widget);
    var parent=widget.parent;
    parent.flxRemove.setVisibility(false);
    parent.lblName.setVisibility(false);
    parent.flxEdit.setVisibility(false);
    
    parent.flxSave.setVisibility(true);   
    parent.txtBoxName.setVisibility(true);
    this.view.forceLayout();
  },
  onSave:function(widget,context){
    var parent=widget.parent;
    parent.flxSave.setVisibility(false);   
    parent.txtBoxName.setVisibility(false);
    
    parent.flxEdit.setVisibility(true);
    parent.flxRemove.setVisibility(true);
    parent.lblName.setVisibility(true);
  },
  onRemove:function(widget,context){
    
  }
});