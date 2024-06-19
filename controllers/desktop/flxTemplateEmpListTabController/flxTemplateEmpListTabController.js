define({ 

  showSegmentData:function(widget, context){
    //debugger;
//     if(this.view.imgDropDown.src=="drop_down.png"){
//       this.view.imgDropDown.src="drop_down_arrow_orange.png";
//     }else{
//       this.view.imgDropDown.src="drop_down.png";
//     }
      this.executeOnParent("expandEmployeeDetail",context);
  },
  
   onEditEmployee:function(widget,context){
     
    this.executeOnParent("processEditIcon",context.widgetInfo.selectedItems);
  },
  onRemoveEmployee:function(widget,context){
    this.executeOnParent("processRemoveIcon",context.widgetInfo.selectedItems);
  }

});