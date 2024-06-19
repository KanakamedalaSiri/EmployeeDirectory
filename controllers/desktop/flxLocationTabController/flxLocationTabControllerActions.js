define({
    /*
          This is an auto generated file and any modifications to it may result in corruption of the action sequence.
        */
    /** onClick defined for flxImageContainer **/
    AS_FlexContainer_d2b9fe1f74eb49b488ce96ddaf73ad4a: function AS_FlexContainer_d2b9fe1f74eb49b488ce96ddaf73ad4a(eventobject, context) {
        var self = this;
        return self.showSegmentData.call(this, eventobject, context);
    },
    /** onClick defined for flxRemove **/
    AS_FlexContainer_f806a52ead084348bfbf3598a713cb72: function AS_FlexContainer_f806a52ead084348bfbf3598a713cb72(eventobject, context) {
        var self = this;
        return self.onRemoveLocation.call(this, eventobject, context);
    },
    /** onClick defined for flxEdit **/
    AS_FlexContainer_gbc5182aa70d4ad5b530dacc4f967be8: function AS_FlexContainer_gbc5182aa70d4ad5b530dacc4f967be8(eventobject, context) {
        var self = this;
        this.onEditLocation(eventobject, context);
    }
});