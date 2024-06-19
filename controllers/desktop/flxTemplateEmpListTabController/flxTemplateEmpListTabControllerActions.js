define({
    /*
          This is an auto generated file and any modifications to it may result in corruption of the action sequence.
        */
    /** onClick defined for flxRemove **/
    AS_FlexContainer_a9f83f95b8854f26bd6a6e1f3e111c70: function AS_FlexContainer_a9f83f95b8854f26bd6a6e1f3e111c70(eventobject, context) {
        var self = this;
        kony.print("clicked the remove icon in the segment");
        this.executeOnParent("processRemoveIcon", context.widgetInfo.selecteditems[0]);
    },
    /** onClick defined for flxImageContainer **/
    AS_FlexContainer_c92eaf7cab8049fe8e319b6c611a9a47: function AS_FlexContainer_c92eaf7cab8049fe8e319b6c611a9a47(eventobject, context) {
        var self = this;
        return self.showSegmentData.call(this, eventobject, context);
    },
    /** onClick defined for flxEdit **/
    AS_FlexContainer_dfb034d354ad4fc3868ca81f34e426ee: function AS_FlexContainer_dfb034d354ad4fc3868ca81f34e426ee(eventobject, context) {
        var self = this;
        this.onEditEmployee(eventobject, context);
    }
});