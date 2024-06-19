define({
    /*
          This is an auto generated file and any modifications to it may result in corruption of the action sequence.
        */
    /** onClick defined for btnEdiSaveBottom **/
    AS_Button_b00de17b99154f149d03e3182159e3ed: function AS_Button_b00de17b99154f149d03e3182159e3ed(eventobject) {
        var self = this;
        this.processSaveOrEditButton();
    },
    /** onClick defined for btnSaveMode **/
    AS_Button_f8d8991d67d64e3da1811c1b37cdc8df: function AS_Button_f8d8991d67d64e3da1811c1b37cdc8df(eventobject) {
        var self = this;
        return self.processSaveOrEditButton.call(this);
    },
    /** onClick defined for btnEdit **/
    AS_Button_fb29d64d7a6a4206bd198597c4496451: function AS_Button_fb29d64d7a6a4206bd198597c4496451(eventobject) {
        var self = this;
        self.changeUIForEditMode.call(this);
        this.view.flxEditHeader.setVisibility(true);
    },
    /** postShow defined for frmEmpDetails **/
    AS_d19e3990: function AS_d19e3990(eventobject) {
        var self = this;
        this.onFormPostShow();
        //kony_rotate(kony.application.getCurrentForm().Path3,-180);kony_rotate(kony.application.getCurrentForm().Path3140304942388160,-180);kony_rotate(kony.application.getCurrentForm().Path3140305061921568,-180);kony_rotate(kony.application.getCurrentForm().Path3140305061921856,-180);kony_rotate(kony.application.getCurrentForm().Path3,-180);kony_rotate(kony.application.getCurrentForm().Path3140304942388160,-180);kony_rotate(kony.application.getCurrentForm().Path3140305061921568,-180);kony_rotate(kony.application.getCurrentForm().Path3140305061921856,-180);kony_rotate(kony.application.getCurrentForm().Path3,-180);kony_rotate(kony.application.getCurrentForm().Path3140304942388160,-180);kony_rotate(kony.application.getCurrentForm().Path3140305061921568,-180);kony_rotate(kony.application.getCurrentForm().Path3140305061921856,-180);kony_rotate(kony.application.getCurrentForm().Path3,-180);kony_rotate(kony.application.getCurrentForm().Path3140304942388160,-180);kony_rotate(kony.application.getCurrentForm().Path3140305061921568,-180);kony_rotate(kony.application.getCurrentForm().Path3140305061921856,-180);kony_rotate(kony.application.getCurrentForm().Path3,-180);kony_rotate(kony.application.getCurrentForm().Path3140304942388160,-180);kony_rotate(kony.application.getCurrentForm().Path3140305061921568,-180);kony_rotate(kony.application.getCurrentForm().Path3140305061921856,-180);
    },
    /** onClick defined for EventsmenuItem **/
    AS_FlexContainer_a59b35bd852d4626914ad9a39ead6e4f: function AS_FlexContainer_a59b35bd852d4626914ad9a39ead6e4f(eventobject) {
        var self = this;
        voltmx.ui.Alert({
            message: "Events",
            alertType: constants.ALERT_TYPE_INFO,
        }, {
            "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        });
    },
    /** onClick defined for flxAlertContainer **/
    AS_FlexContainer_a5f3ee6c3fba4645a931e6fc41cb0e38: function AS_FlexContainer_a5f3ee6c3fba4645a931e6fc41cb0e38(eventobject) {
        var self = this;
        this.hideALertComponentCallBack();
    },
    /** onClick defined for flxHamburger **/
    AS_FlexContainer_b3db4c4af0da42948e358cb5a0457730: function AS_FlexContainer_b3db4c4af0da42948e358cb5a0457730(eventobject) {
        var self = this;
        this.animateLeftMenu();
    },
    /** onClick defined for flxUserInfo **/
    AS_FlexContainer_b403f300ff1a4c16847155653101e350: function AS_FlexContainer_b403f300ff1a4c16847155653101e350(eventobject) {
        var self = this;
        this.toggleProfile("userProfile");
    },
    /** onClick defined for flexGreyBg **/
    AS_FlexContainer_bde9283e30d3409a876e1782d56250ac: function AS_FlexContainer_bde9283e30d3409a876e1782d56250ac(eventobject) {
        var self = this;
        this.animateLeftMenu();
    },
    /** onClick defined for flxLogout **/
    AS_FlexContainer_bf0e3552f7da49e3a72d795b03d899f9: function AS_FlexContainer_bf0e3552f7da49e3a72d795b03d899f9(eventobject) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmLogin");
        ntf.navigate();
    },
    /** onClick defined for DirectoryMenuItemMouseover **/
    AS_FlexContainer_d1fb2ab8b8f94128913da5ec9205e531: function AS_FlexContainer_d1fb2ab8b8f94128913da5ec9205e531(eventobject) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmEmpList");
        ntf.navigate();
    },
    /** onClick defined for flxCloseDetails **/
    AS_FlexContainer_d2649519210d4fceaccaa75088ea00ed: function AS_FlexContainer_d2649519210d4fceaccaa75088ea00ed(eventobject) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmEmpList");
        ntf.navigate();
    },
    /** onClick defined for flxEditSave **/
    AS_FlexContainer_d477d4ea05d14d128e141547fc97d4f6: function AS_FlexContainer_d477d4ea05d14d128e141547fc97d4f6(eventobject) {
        var self = this;
        return self.processSaveOrEditButton.call(this);
    },
    /** onClick defined for flxCloseEditMode **/
    AS_FlexContainer_dc2182d8240c400f8ad7ef54654fcd65: function AS_FlexContainer_dc2182d8240c400f8ad7ef54654fcd65(eventobject) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmEmpList");
        ntf.navigate();
    },
    /** onClick defined for MessageMenu **/
    AS_FlexContainer_e15a9bed2cc4462cb8aa048fcdf9179e: function AS_FlexContainer_e15a9bed2cc4462cb8aa048fcdf9179e(eventobject) {
        var self = this;
        voltmx.ui.Alert({
            message: "Messages",
            alertType: constants.ALERT_TYPE_INFO,
        }, {
            "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        });
    },
    /** onClick defined for flxHamburger **/
    AS_FlexContainer_e6aeb8b083a34fb9a160d3a680e8cd18: function AS_FlexContainer_e6aeb8b083a34fb9a160d3a680e8cd18(eventobject) {
        var self = this;
        this.animateLeftMenu.call(this);
    },
    /** onClick defined for SettingsMenu **/
    AS_FlexContainer_ec998c0f4ad54fe5893c6aed47e65bf3: function AS_FlexContainer_ec998c0f4ad54fe5893c6aed47e65bf3(eventobject) {
        var self = this;
        voltmx.ui.Alert({
            message: "Settings",
            alertType: constants.ALERT_TYPE_INFO,
        }, {
            "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        });
        this.navigateToFormSetting();
    },
    /** onClick defined for ColleaguesMenuItem **/
    AS_FlexContainer_f86731242d6649ac89938368d1c4ff3b: function AS_FlexContainer_f86731242d6649ac89938368d1c4ff3b(eventobject) {
        var self = this;
        voltmx.ui.Alert({
            message: "Colleagues",
            alertType: constants.ALERT_TYPE_INFO,
        }, {
            "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        });
    },
    /** onClick defined for flxOverlay **/
    AS_FlexContainer_hdb2384aecd343e5b59944a15403dc35: function AS_FlexContainer_hdb2384aecd343e5b59944a15403dc35(eventobject) {
        var self = this;
        this.view.flxOverlay.setVisibility(false);
    },
    /** onBreakpointChange defined for frmEmpDetails **/
    AS_Form_fad6611de20d4ba4830a9fb1f6d5ae26: function AS_Form_fad6611de20d4ba4830a9fb1f6d5ae26(eventobject, breakpoint) {
        var self = this;
        this.onBreakpointChange2(eventobject, breakpoint);
        this.view.flxOverlay.setVisibility(false);
    },
    /** onAlertFlexClick defined for alertmsg **/
    AS_UWI_j026c7d502e743ff87894936e1be76c9: function AS_UWI_j026c7d502e743ff87894936e1be76c9() {
        var self = this;
        this.hideALertComponentCallBack();
    }
});