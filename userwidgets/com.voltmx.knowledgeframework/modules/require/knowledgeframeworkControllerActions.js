define({
    /*
        This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_Button_a94d38979aa64fa887f5245e9ac16c27: function AS_Button_a94d38979aa64fa887f5245e9ac16c27(eventobject) {
        var self = this;
        this.onClickPlayButton(eventobject.id);
    },
    AS_Button_eec28d7b7ac24740bcdf2adb238813f6: function AS_Button_eec28d7b7ac24740bcdf2adb238813f6(eventobject) {
        var self = this;
        this.onClickPlayButton(eventobject.id);
    },
    AS_FlexContainer_ebae57a728d14d38a05969aef1338c0e: function AS_FlexContainer_ebae57a728d14d38a05969aef1338c0e(eventobject) {
        var self = this;
        // if(this.view.rchTextDesc.isVisible === true)
        //   this.onClickDisappear(eventobject);
        // else
        //   this.onClickDisplay(eventobject);
        this.showAccord(eventobject.id);
    },
    AS_FlexContainer_caa7643d7ce94306b3237d4429cf9db1: function AS_FlexContainer_caa7643d7ce94306b3237d4429cf9db1(eventobject) {
        var self = this;
        // if(this.view.lblCodeSnippet.isVisible === true)
        //   this.onClickDisappear(eventobject);
        // else
        //   this.onClickDisplay(eventobject);
        this.showAccord(eventobject.id);
    },
    AS_FlexContainer_f7da2e9fb3734b149d4d0d5c94601563: function AS_FlexContainer_f7da2e9fb3734b149d4d0d5c94601563(eventobject) {
        var self = this;
        // if(this.view.rchtextDoc.isVisible === true)
        //   this.onClickDisappear(eventobject);
        // else
        //   this.onClickDisplay(eventobject);
        this.showAccord(eventobject.id);
    },
    AS_FlexContainer_h3c069b1145b415696fabe00b508ba97: function AS_FlexContainer_h3c069b1145b415696fabe00b508ba97(eventobject) {
        var self = this;
        this.onClickBack();
    },
    AS_FlexContainer_eacf9dd3df0244ca91e5b61dd6d913ea: function AS_FlexContainer_eacf9dd3df0244ca91e5b61dd6d913ea(eventobject) {
        var self = this;
        this.closeWhenDone();
    },
    AS_FlexContainer_i9406b4218454c6e8c13e2c6fe0fbc3e: function AS_FlexContainer_i9406b4218454c6e8c13e2c6fe0fbc3e(eventobject) {
        var self = this;
        this.onLinkClick();
    },
    AS_Segment_f4aba72c55a74a019f72161199eea78c: function AS_Segment_f4aba72c55a74a019f72161199eea78c(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.onRowClick();
    }
});