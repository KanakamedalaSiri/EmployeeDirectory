define({
    /*
          This is an auto generated file and any modifications to it may result in corruption of the action sequence.
        */
    /** onClick defined for clearAll **/
    AS_Button_a8a2951345324586826d4bc6752f8f74: function AS_Button_a8a2951345324586826d4bc6752f8f74(eventobject) {
        var self = this;
        return self.ClearFilter.call(this);
    },
    /** onClick defined for CopybtnClearAll0f386a0c1196b46 **/
    AS_Button_c602b9c7701944598172099a66e71de1: function AS_Button_c602b9c7701944598172099a66e71de1(eventobject) {
        var self = this;
        return self.ClearFilter.call(this);
    },
    /** onClick defined for btnClearAll **/
    AS_Button_f0d5f4ee4ced403bb7cf7e860e03f42d: function AS_Button_f0d5f4ee4ced403bb7cf7e860e03f42d(eventobject) {
        var self = this;
        return self.ClearFilter.call(this);
    },
    /** onClick defined for btnApplyFilter **/
    AS_Button_fdd8d95f53f6445c871c5e80705bd63b: function AS_Button_fdd8d95f53f6445c871c5e80705bd63b(eventobject) {
        var self = this;
        return self.applyFilter.call(this);
    },
    /** onClick defined for btnFilter **/
    AS_Button_ffd8b2bf409644cda6fd159611c385c5: function AS_Button_ffd8b2bf409644cda6fd159611c385c5(eventobject) {
        var self = this;
        this.toggleFilterMob();
    },
    /** onClick defined for btnAddNewEmp **/
    AS_Button_j1d1039aa86d49609975db187fb56503: function AS_Button_j1d1039aa86d49609975db187fb56503(eventobject) {
        var self = this;
        this.createNewEmployee();
    },
    /** onClick defined for MessageMenu **/
    AS_FlexContainer_a34715dd3d804d16a35c52e8c46ad1e3: function AS_FlexContainer_a34715dd3d804d16a35c52e8c46ad1e3(eventobject) {
        var self = this;
        voltmx.ui.Alert({
            message: "Messages",
            alertType: constants.ALERT_TYPE_INFO,
        }, {
            "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        });
    },
    /** onClick defined for flxUserInfo **/
    AS_FlexContainer_b403f300ff1a4c16847155653101e350: function AS_FlexContainer_b403f300ff1a4c16847155653101e350(eventobject) {
        var self = this;
        this.toggleProfile("userProfile");
    },
    /** onClick defined for flxClose **/
    AS_FlexContainer_bd8f054127b14faa96ae4b6f5829a2d4: function AS_FlexContainer_bd8f054127b14faa96ae4b6f5829a2d4(eventobject) {
        var self = this;
        this.view.flxFilterMain.setVisibility(false);
        this.view.empHeader1.setVisibility(true);
        //this.view.flxFilterMob.setVisibility(false);
        this.onPostShow();
    },
    /** onClick defined for flxLogout **/
    AS_FlexContainer_c1b4c672c23742c78bf15faf6c35eff3: function AS_FlexContainer_c1b4c672c23742c78bf15faf6c35eff3(eventobject) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmLogin");
        ntf.navigate();
    },
    /** onClick defined for EventsmenuItem **/
    AS_FlexContainer_c8dd32f14dc147beb1ccddf54175d849: function AS_FlexContainer_c8dd32f14dc147beb1ccddf54175d849(eventobject) {
        var self = this;
        voltmx.ui.Alert({
            message: "Events",
            alertType: constants.ALERT_TYPE_INFO,
        }, {
            "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        });
    },
    /** onClick defined for flxImage **/
    AS_FlexContainer_cd10fed2732541fe922a34a93e0d119c: function AS_FlexContainer_cd10fed2732541fe922a34a93e0d119c(eventobject) {
        var self = this;
        this.view.flxMobFilter.setVisibility(false);
    },
    /** onClick defined for flxBtnAddNewEmployee **/
    AS_FlexContainer_d1bc044b274f44e7b14f7d33f5bd5bec: function AS_FlexContainer_d1bc044b274f44e7b14f7d33f5bd5bec(eventobject) {
        var self = this;
        this.createNewEmployee();
        // var navObj = new kony.mvc.Navigation("frmEmpDetails");
        // globEmpOperatioMode = "add";
        // navObj.navigate();
    },
    /** onClick defined for DirectoryMenuItemMouseover **/
    AS_FlexContainer_d1fb2ab8b8f94128913da5ec9205e531: function AS_FlexContainer_d1fb2ab8b8f94128913da5ec9205e531(eventobject) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation("frmEmpList");
        ntf.navigate();
    },
    /** onClick defined for Group **/
    AS_FlexContainer_e07a6bcf0b634231a496361ca5cf2c37: function AS_FlexContainer_e07a6bcf0b634231a496361ca5cf2c37(eventobject) {
        var self = this;
        this.toggleFilter(eventobject);
    },
    /** onClick defined for flexGreyBg **/
    AS_FlexContainer_e254c6dc73194ff08b1f6ca0fd070f27: function AS_FlexContainer_e254c6dc73194ff08b1f6ca0fd070f27(eventobject) {
        var self = this;
        this.animateLeftMenu();
    },
    /** onClick defined for flxHamburger **/
    AS_FlexContainer_e6aeb8b083a34fb9a160d3a680e8cd18: function AS_FlexContainer_e6aeb8b083a34fb9a160d3a680e8cd18(eventobject) {
        var self = this;
        this.animateLeftMenu.call(this);
    },
    /** onClick defined for ColleaguesMenuItem **/
    AS_FlexContainer_f425d1cea38d4eab96ee2121655aae9f: function AS_FlexContainer_f425d1cea38d4eab96ee2121655aae9f(eventobject) {
        var self = this;
        voltmx.ui.Alert({
            message: "Colleagues",
            alertType: constants.ALERT_TYPE_INFO,
        }, {
            "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        });
    },
    /** onClick defined for flxCloseSearch **/
    AS_FlexContainer_fa1547aabf9b4fca9cd7a8f9d33762b0: function AS_FlexContainer_fa1547aabf9b4fca9cd7a8f9d33762b0(eventobject) {
        var self = this;
        this.view.flxSearch.setVisibility(false);
    },
    /** onClick defined for flxSearch **/
    AS_FlexContainer_g93588a3aec24223bd55f423ab75c869: function AS_FlexContainer_g93588a3aec24223bd55f423ab75c869(eventobject) {
        var self = this;
        this.view.flxSearch.setVisibility(false);
    },
    /** onClick defined for flxAlertContainer **/
    AS_FlexContainer_h18737e83f0742b8aa5c2f4e861668b1: function AS_FlexContainer_h18737e83f0742b8aa5c2f4e861668b1(eventobject) {
        var self = this;
        this.hideALertComponentCallBack();
    },
    /** onClick defined for flxOverlay **/
    AS_FlexContainer_h80782c1af084f609cc0457d4f9ef348: function AS_FlexContainer_h80782c1af084f609cc0457d4f9ef348(eventobject) {
        var self = this;
        this.view.flxOverlay.setVisibility(false);
    },
    /** postShow defined for frmEmpList **/
    AS_Form_j61627ee7e5e4e0f80c7aa8bb08b343c: function AS_Form_j61627ee7e5e4e0f80c7aa8bb08b343c(eventobject) {
        var self = this;
        return self.onPostShow.call(this);
    },
    /** onBreakpointChange defined for frmEmpList **/
    AS_Form_j95cd5e623b14b06a4bf11558cbe6438: function AS_Form_j95cd5e623b14b06a4bf11558cbe6438(eventobject, breakpoint) {
        var self = this;
        this.onBreakpointChange(eventobject, breakpoint);
        this.view.flxOverlay.setVisibility(false);
    },
    /** onTouchStart defined for Settings **/
    AS_Label_caa6db6fd91e4c4b93a4049ded5de68b: function AS_Label_caa6db6fd91e4c4b93a4049ded5de68b(eventobject, x, y) {
        var self = this;
        voltmx.ui.Alert({
            message: "Settings",
            alertType: constants.ALERT_TYPE_INFO,
        }, {
            "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        });
        this.navigateToFormSetting();
    },
    /** onTouchEnd defined for segEmployeeList **/
    AS_Segment_a36db9b5894c4a58a9d8c1ebc524bf49: function AS_Segment_a36db9b5894c4a58a9d8c1ebc524bf49(eventobject, x, y) {
        var self = this;
    },
    /** onRowClick defined for segEmployeeList **/
    AS_Segment_c4a2518e57c44fb7a31977f35340c512: function AS_Segment_c4a2518e57c44fb7a31977f35340c512(eventobject, sectionNumber, rowNumber) {
        var self = this;
    },
    /** onRowClick defined for segDept **/
    AS_Segment_d9774190f1114a0a94011eaf84896df4: function AS_Segment_d9774190f1114a0a94011eaf84896df4(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.onSegmenFilterClick.call(this, null);
    },
    /** onRowClick defined for segDesignation **/
    AS_Segment_e897f7298a33440b87c656b99e719415: function AS_Segment_e897f7298a33440b87c656b99e719415(eventobject, sectionNumber, rowNumber) {
        var self = this;
        return self.onSegmenFilterClick.call(this, null);
    },
    /** onTextChange defined for txtSearchInput **/
    AS_TextField_h89e419e2de146a383212536de22f9e5: function AS_TextField_h89e419e2de146a383212536de22f9e5(eventobject, changedtext) {
        var self = this;
        //kony.print("changedtext is :"+changedtext);
        var searchStr = eventobject.text;
        this.processSearch(searchStr);
    },
    /** onTextChange defined for txtBxSearch **/
    AS_TextField_ja9150d585e0480abb910b1324296030: function AS_TextField_ja9150d585e0480abb910b1324296030(eventobject, changedtext) {
        var self = this;
        var searchStr = eventobject.text;
        this.processSearch(searchStr);
        this.view.flxSearch.setVisibility(false);
        this.view.empHeader1.imgSearchMob.setVisibility(false);
        this.view.empHeader1.btnCancelsearch.setVisibility(true);
    }
});