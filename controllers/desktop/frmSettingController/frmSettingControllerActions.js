define({
    /*
          This is an auto generated file and any modifications to it may result in corruption of the action sequence.
        */
    /** onClick defined for btnCancel **/
    AS_Button_d43289ef88c34a2c95ef6027b5707ad6: function AS_Button_d43289ef88c34a2c95ef6027b5707ad6(eventobject) {
        var self = this;
        this.hideLocationEditor();
    },
    /** onClick defined for btnSave **/
    AS_Button_d45b8de6e5d843d0a828f429ca99ebb5: function AS_Button_d45b8de6e5d843d0a828f429ca99ebb5(eventobject) {
        var self = this;
        this.createUpdateLocation();
    },
    /** onClick defined for EventsmenuItem **/
    AS_FlexContainer_a32c6f5fcb534ff2b3a54e1c44f065c1: function AS_FlexContainer_a32c6f5fcb534ff2b3a54e1c44f065c1(eventobject) {
        var self = this;
        voltmx.ui.Alert({
            message: "Events",
            alertType: constants.ALERT_TYPE_INFO,
        }, {
            "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        });
    },
    /** onClick defined for flxOverlay **/
    AS_FlexContainer_ae2bb3a1207f4803b183e5b6bd38b982: function AS_FlexContainer_ae2bb3a1207f4803b183e5b6bd38b982(eventobject) {
        var self = this;
        this.view.flxOverlay.setVisibility(false);
    },
    /** onClick defined for flxUserInfo **/
    AS_FlexContainer_b403f300ff1a4c16847155653101e350: function AS_FlexContainer_b403f300ff1a4c16847155653101e350(eventobject) {
        var self = this;
        this.toggleProfile("userProfile");
    },
    /** onClick defined for flxRemoveSample **/
    AS_FlexContainer_bbda4be0d80c4dea8082428ca8955999: function AS_FlexContainer_bbda4be0d80c4dea8082428ca8955999(eventobject, context) {
        var self = this;
        return self.removeItem.call(this, null);
    },
    /** onClick defined for flxAlertContainer2 **/
    AS_FlexContainer_c11c871d7c4a44ae929b042361d7b1b7: function AS_FlexContainer_c11c871d7c4a44ae929b042361d7b1b7(eventobject) {
        var self = this;
        this.hideALertComponentCallBack();
    },
    /** onClick defined for flxSaveTop0 **/
    AS_FlexContainer_c20c9fe33f934be1a68d00b2449edc6a: function AS_FlexContainer_c20c9fe33f934be1a68d00b2449edc6a(eventobject, context) {
        var self = this;
        this._createCommonMaster(0);
    },
    /** onClick defined for MessageMenu **/
    AS_FlexContainer_c545abcd70f54580bf0fed9fca752ddf: function AS_FlexContainer_c545abcd70f54580bf0fed9fca752ddf(eventobject) {
        var self = this;
        voltmx.ui.Alert({
            message: "Messages",
            alertType: constants.ALERT_TYPE_INFO,
        }, {
            "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        });
    },
    /** onClick defined for flxSaveSample **/
    AS_FlexContainer_ca38196eba05474d98b92a94ac7b5fba: function AS_FlexContainer_ca38196eba05474d98b92a94ac7b5fba(eventobject, context) {
        var self = this;
        return self.saveItem.call(this, null);
    },
    /** onClick defined for flxCancelEdit **/
    AS_FlexContainer_ccfc3d114fe047ae8e7615dbde4daded: function AS_FlexContainer_ccfc3d114fe047ae8e7615dbde4daded(eventobject, context) {
        var self = this;
        return
    },
    /** onClick defined for DirectoryMenuItemMouseover **/
    AS_FlexContainer_d1fb2ab8b8f94128913da5ec9205e531: function AS_FlexContainer_d1fb2ab8b8f94128913da5ec9205e531(eventobject) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmEmpList");
        ntf.navigate();
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
    /** onClick defined for flxLogout **/
    AS_FlexContainer_fa8ed801e4994f4b9282f110189399ad: function AS_FlexContainer_fa8ed801e4994f4b9282f110189399ad(eventobject) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmLogin");
        ntf.navigate();
    },
    /** onClick defined for ColleaguesMenuItem **/
    AS_FlexContainer_fd6b940e25e041c78f80f4ddfc283d28: function AS_FlexContainer_fd6b940e25e041c78f80f4ddfc283d28(eventobject) {
        var self = this;
        voltmx.ui.Alert({
            message: "Colleagues",
            alertType: constants.ALERT_TYPE_INFO,
        }, {
            "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        });
    },
    /** onClick defined for flexGreyBg **/
    AS_FlexContainer_h58b08dc22604bd688d7075d47731bdc: function AS_FlexContainer_h58b08dc22604bd688d7075d47731bdc(eventobject) {
        var self = this;
        this.animateLeftMenu();
    },
    /** onClick defined for flxDelete **/
    AS_FlexContainer_i2f7da20270c4f7fb59a3bdda30534da: function AS_FlexContainer_i2f7da20270c4f7fb59a3bdda30534da(eventobject, context) {
        var self = this;
        // this._createCommonMaster(0);
        this.removeAddedItem();
    },
    /** onClick defined for flxEditSample **/
    AS_FlexContainer_i809066d3a8f4ab2acb04ddb9cfd119b: function AS_FlexContainer_i809066d3a8f4ab2acb04ddb9cfd119b(eventobject, context) {
        var self = this;
        return self.editItem.call(this, null);
    },
    /** onScrollEnd defined for flxSCCommon **/
    AS_FlexScrollContainer_a7dc81ecd1d04f5986f7998b8373fac4: function AS_FlexScrollContainer_a7dc81ecd1d04f5986f7998b8373fac4(eventobject) {
        var self = this;
        this.view.forceLayout();
    },
    /** init defined for frmSetting **/
    AS_Form_abb767961f5a43babc569906f7cfaa6d: function AS_Form_abb767961f5a43babc569906f7cfaa6d(eventobject) {
        var self = this;
        return self.onFormInit.call(this);
    },
    /** postShow defined for frmSetting **/
    AS_Form_d1ceb8b49e804c958faa2d003436a973: function AS_Form_d1ceb8b49e804c958faa2d003436a973(eventobject) {
        var self = this;
        this.onPostShow();
    },
    /** onBreakpointChange defined for frmSetting **/
    AS_Form_f2e5af38e3714b5b884688797fdc35d2: function AS_Form_f2e5af38e3714b5b884688797fdc35d2(eventobject, breakpoint) {
        var self = this;
        return self.onBreakpointChange.call(this, eventobject, breakpoint);
    },
    /** onSelection defined for lstBoxMaster **/
    AS_ListBox_d5d5fa572b0d432eadb553da25218390: function AS_ListBox_d5d5fa572b0d432eadb553da25218390(eventobject) {
        var self = this;
        return self.onMasterDataSelected.call(this, null);
    },
    /** onDone defined for txtBoxSearch **/
    AS_TextField_a87dda1f114e48b08df77a965b423330: function AS_TextField_a87dda1f114e48b08df77a965b423330(eventobject, changedtext) {
        var self = this;
        this.textDone();
    },
    /** onTextChange defined for txtBoxSearch **/
    AS_TextField_b1124cd29221441498bc106460120707: function AS_TextField_b1124cd29221441498bc106460120707(eventobject, changedtext) {
        var self = this;
        this.textChange();
    },
    /** onAlertFlexClick defined for alertmsg **/
    AS_UWI_c461c3cbdfc141278c12f02d116ae401: function AS_UWI_c461c3cbdfc141278c12f02d116ae401() {
        var self = this;
        this.hideALertComponentCallBack();
    },
    /** onUserFlxClick defined for empheader **/
    AS_UWI_gd88ff8da7144d8fbeffcad2acdfde27: function AS_UWI_gd88ff8da7144d8fbeffcad2acdfde27(eventobject) {
        var self = this;
        return self.toggleProfile.call(this, eventobject);
    }
});