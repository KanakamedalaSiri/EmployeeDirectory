define({
    /*
          This is an auto generated file and any modifications to it may result in corruption of the action sequence.
        */
    /** onClick defined for flxEdit **/
    AS_FlexContainer_adefe6c5b5814dddb6d0db5326039bbb: function AS_FlexContainer_adefe6c5b5814dddb6d0db5326039bbb(eventobject, context) {
        var self = this;
        this.onEditEmployee(eventobject, context);
    },
    /** onClick defined for flxImageContainer **/
    AS_FlexContainer_dac923f885f04875a7827d380da599f6: function AS_FlexContainer_dac923f885f04875a7827d380da599f6(eventobject, context) {
        var self = this;
        return self.showSegmentData.call(this, eventobject, context);
    },
    /** onClick defined for flxRemove **/
    AS_FlexContainer_e33201cac38a4986814e0e7a8f0f60ab: function AS_FlexContainer_e33201cac38a4986814e0e7a8f0f60ab(eventobject, context) {
        var self = this;
        kony.print("clicked the remove icon in the segment");
        this.executeOnParent("processRemoveIcon", context.widgetInfo.selecteditems[0]);
    }
});