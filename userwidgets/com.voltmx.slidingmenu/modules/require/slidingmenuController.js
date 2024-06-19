define(function () {
  var voltmxL = voltmxL || {};
  var voltmxLoggerModule = require("com/voltmx/slidingmenu/voltmxLogger");
  voltmxL.logger = (new voltmxLoggerModule("Sliding Menu Component")) || function () {};
  return {
    /**
		 * @function
		 * @param baseConfig
		 * @param layoutConfig
		 * @param pspConfig
		 */
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this.view.lblContent.isVisible = false;
      this.view.lblMenuContent.isVisible = false;
      this.view.flxMainSlidingMenu.zIndex = "1";
    },
    _enableSegmentAnimation:true,
    _busyState:0,
    _headerAnimationType: 'No Animation',
    _hamburgerDirection: 'Left',
    _hamburgerMenuType: 0,
    _hamburgerPosition: 0,
    _hamburgerAnimation: 'Push',
    _menuItemSkin: "voltmxmpsmsknlblSanFranciscoFFFFFF129",
    onShowSlidingMenu: function () {},
    onHideSlidingMenu: function () {},
    onMenuItemClick: function () {},
    _options:[],
    _suboptions:[],
    _animSpeed:0.5,
    _enableSeparator:false,
    //Logic for getters/setters of custom properties
    /**
		 * @function
		 *
		 */
    initGettersSetters: function () {

      defineSetter(this,'enableMenuItemAnimation',function(val){
        voltmxL.logger.trace("----------------------------- Start Setting enableMenuItemAnimation", voltmxL.logger.FUNCTION_ENTRY);
        if(val!==undefined && val!==null &&  val!=="" && typeof val === 'boolean')
        {
          this._enableSegmentAnimation = val;
        }else
        {
          throw {message:'wrong data passed for enableMenuItemAnimation of slidingMenu',Error:'Wrong enableMenuItemAnimation' };
        }
        voltmxL.logger.trace("----------------------------- End Setting enableMenuItemAnimation", voltmxL.logger.FUNCTION_EXIT);  
      });
      defineSetter(this,'enableSeparator',function(val){
        voltmxL.logger.trace("----------------------------- Start Setting enableSeparator", voltmxL.logger.FUNCTION_ENTRY);
        if(val!==undefined && val!==null &&  val!=="" && typeof val === 'boolean')
        {
          this._enableSeparator = val;
        }else
        {
          throw {message:'wrong data passed for enableSeparator of slidingMenu',Error:'Wrong enableSeparator' };
        }
        voltmxL.logger.trace("----------------------------- End Setting enableSeparator", voltmxL.logger.FUNCTION_EXIT);  
      });
      defineSetter(this,'animationSpeed',function(val){
        voltmxL.logger.trace("----------------------------- Start Setting animationSpeed", voltmxL.logger.FUNCTION_ENTRY);
        if(val!==undefined && val!==null &&  val!=="")
        {
          this._animSpeed = val;
        }else
        {
          throw {message:'wrong data passed for animationSpeed of slidingMenu',Error:'Wrong animationSpeed' };
        }
        voltmxL.logger.trace("----------------------------- End Setting animationSpeed", voltmxL.logger.FUNCTION_EXIT);  
      });
      defineSetter(this,'headerVisibility',function(val){
        voltmxL.logger.trace("----------------------------- Start Setting animationSpeed", voltmxL.logger.FUNCTION_ENTRY);
        if(val!==undefined && val!==null &&  val!=="")
        {
          this.view.flxHeader.isVisible=val;
          if(val === false){
            this.view.flxMenuControl.height="91%";
          }
        }else
        {
          throw {message:'wrong data passed for animationSpeed of slidingMenu',Error:'Wrong animationSpeed' };
        }
        voltmxL.logger.trace("----------------------------- End Setting animationSpeed", voltmxL.logger.FUNCTION_EXIT);  
      });
      defineSetter(this, "menuOptions", function (x) {
        voltmxL.logger.trace("----------------------------- Start Setting menuItemTextSkin", voltmxL.logger.FUNCTION_ENTRY);
        this._options = x.data;
        voltmxL.logger.trace("----------------------------- End Setting menuItemTextSkin", voltmxL.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "subMenuOptions", function (x) {
        voltmxL.logger.trace("----------------------------- Start Setting menuItemTextSkin", voltmxL.logger.FUNCTION_ENTRY);
        this._suboptions = x.data;
        voltmxL.logger.trace("----------------------------- End Setting menuItemTextSkin", voltmxL.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "footerStyle", function (x) {
        try {
          voltmxL.logger.trace("----------------------------- Start Setting footerStyle", voltmxL.logger.FUNCTION_ENTRY);
          switch (x.replace(/"/g, "")) {
            case 'No Footer': {
              this.view.flxBotom.isVisible = false;
              break;
            }
            case 'only Text': {
              this.view.flxBotom.isVisible = true;
              this.view.imgFooter.isVisible = false;
              this.view.textFooter.left = "10%";
              this.view.textFooter.isVisible = true;
              break;
            }
            case 'only Image': {
              this.view.flxBotom.isVisible = true;
              this.view.imgFooter.left = "10%";
              this.view.imgFooter.isVisible = true;
              this.view.textFooter.isVisible = false;
              break;
            }
            case 'Image & Text': {
              this.view.flxBotom.isVisible = true;
              this.view.imgFooter.isVisible = true;
              this.view.textFooter.isVisible = true;
              break;
            }
            default: {
              throw {
                error: "InvalidFooterStyle",
                message: "InValid Footer Style"
              };
            }
          }
        } catch (e) {
          voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
          if (e.error === "InvalidFooterStyle") {
            throw e;
          }
        }
        voltmxL.logger.trace("----------------------------- End Setting footerStyle", voltmxL.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "profileImageType", function (x) {
        try {
          voltmxL.logger.trace("----------------------------- Start Setting profileImageType", voltmxL.logger.FUNCTION_ENTRY);
          switch (x.replace(/"/g, "")) {
            case 'Regular': {
              break;
            }
            case 'Rounded Corner': {
              this.view.flxImage.skin = "voltmxmpsmsknSlidingMenuRoundedCornerImage";
              break;
            }
            case 'Circle': {
              this.view.flxImage.skin = "voltmxmpsmSknSlidingMenuCircleImage";
              break;
            }
            default: {
              throw {
                error: "InvalidprofileImageType",
                message: "Profile Image Type Does'nt Exist"
              };
            }
          }
        } catch (e) {
          voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
          if (e.error === "InvalidprofileImageType") {
            throw e;
          }
        }
        voltmxL.logger.trace("----------------------------- End Setting profileImageType", voltmxL.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "headerAnimation", function (x) {
        try {

          voltmxL.logger.trace("----------------------------- Start Setting headerAnimation", voltmxL.logger.FUNCTION_ENTRY);
          if (x !== null) {

            this._headerAnimationType = x;

          } else {
            throw {
              error: "InvalidAnimation",
              message: "InValid Header Animation"
            };
          }
        } catch (e) {
          voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
          if (e.error === "InvalidAnimation") {
            throw e;
          }
        }
        voltmxL.logger.trace("----------------------------- End Setting headerAnimation", voltmxL.logger.FUNCTION_EXIT);

      });
      defineSetter(this, "slidingMenuDirection", function (x) {
        try {
          voltmxL.logger.trace("----------------------------- Start Setting slidingMenuDirection", voltmxL.logger.FUNCTION_ENTRY);
          this.view.flxMainSlidingMenu.left = "-100%";
          switch (x.replace(/"/g, "")) {
            case 'Right': {
              this._hamburgerDirection = "Right";
              this.view.flxMenuControl.left = "5%";
              this.view.flxHamParent.left = "88%";
              break;
            }
            case 'Left': {
              this._hamburgerDirection = "Left";
              this.view.flxHamParent.left = "0%";
              break;
            }
            default: {
              throw {
                error: "InvalidSlidingMenuDirection",
                message: "InValid Sliding Menu Direction 1"
              };
            }
          }
        } catch (e) {
          voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
          if (e.error === "InvalidSlidingMenuDirection") {
            throw e;
          }
        }
        voltmxL.logger.trace("----------------------------- End Setting slidingMenuDirection", voltmxL.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "slidingMenuAnimation", function (x) {
        try {
          voltmxL.logger.trace("----------------------------- Start Setting slidingMenuDirection", voltmxL.logger.FUNCTION_ENTRY);

          switch (x.replace(/"/g, "")) {
            case 'Reveal': {
              this.view.flxMainSlidingMenu.left = "0%";
              this._hamburgerAnimation = "Reveal";
              this.view.flxTargetContainer.zIndex = 3;
              this.view.flxMainSlidingMenu.zIndex = 1;
              break;
            }
            case 'Overlay': {
              this.view.flxTargetContainer.left = "0%";
              this._hamburgerAnimation = "Overlay";
              this.view.flxTargetContainer.zIndex = 1;
              this.view.flxMainSlidingMenu.zIndex = 3;
              break;
            }
            case 'Push': {
              this.view.flxMainSlidingMenu.left = "-100%";
              this.view.flxBotom.left = '20%';
              this._hamburgerAnimation = "Push";
              this.view.flxTargetContainer.zIndex = 3;
              this.view.flxMainSlidingMenu.zIndex = 3;
              break;
            }
            case 'Squeeze':{
              this._hamburgerAnimation = 'Squeeze';
              this.view.flxMainSlidingMenu.left = "0%";
              this.view.flxMenuControl.verticalScrollIndicator = false;
              this.view.flxTargetContainer.zIndex = 3;
              this.view.flxMainSlidingMenu.zIndex = 1;
              break;
            }
            default: {
              throw {
                error: "InvalidSlidingMenuTransition",
                message: "InValid Sliding Menu Transition 1"
              };
            }
          }
        } catch (e) {
          voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
          if (e.error === "InvalidSlidingMenuDirection") {
            throw e;
          }
        }
        voltmxL.logger.trace("----------------------------- End Setting slidingMenuDirection", voltmxL.logger.FUNCTION_EXIT);
      });
    },
    headerAnimations: function () {
      try {
        voltmxL.logger.trace("----------------------------- Start headerAnimations", voltmxL.logger.FUNCTION_ENTRY);
        switch (this._headerAnimationType) {
          case 'No Animation': {
            break;
          }
          case 'Zoom Out': {
            this.zoomOutAnimation();
            break;
          }
          case 'Slide In': {
            this.slideInAnimation();
            break;
          }
        }
        voltmxL.logger.trace("---------------------------------- End headerAnimations", voltmxL.logger.FUNCTION_EXIT);
      } catch (e) {
        voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
        if (e.error === "InvalidSlidingMenuDirection") {
          throw e;
        }
      }
    },
    zoomOutAnimation: function () {
      var transformObject1 = voltmx.ui.makeAffineTransform();
      transformObject1.scale(0.1, 0.1);
      var transformObject4 = voltmx.ui.makeAffineTransform();
      transformObject4.scale(0.3, 0.3);
      var transformObject2 = voltmx.ui.makeAffineTransform();
      transformObject2.scale(1.1, 1.1);
      var transformObject3 = voltmx.ui.makeAffineTransform();
      transformObject3.scale(1, 1);
      var imgAnim = voltmx.ui.createAnimation({
        "0": {
          "stepConfig": {
            "timingFunction": voltmx.anim.EASE
          },
          "transform": transformObject4
        },
        "80": {
          "stepConfig": {
            "timingFunction": voltmx.anim.EASE
          },
          "transform": transformObject2
        },
        "100": {
          "stepConfig": {
            "timingFunction": voltmx.anim.EASE
          },
          "transform": transformObject3
        }
      });
      var lblAnim = voltmx.ui.createAnimation({
        "0": {
          "stepConfig": {
            "timingFunction": voltmx.anim.EASE
          },
          "transform": transformObject1
        },
        "80": {
          "stepConfig": {
            "timingFunction": voltmx.anim.EASE
          },
          "transform": transformObject2
        },
        "100": {
          "stepConfig": {
            "timingFunction": voltmx.anim.EASE
          },
          "transform": transformObject3
        }
      });
      var animConfig1 = {
        "delay": 0.1,
        "iterationCount": 1,
        "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
        "duration": 0.5
      };
      var animConfig = {
        "delay": 0.3,
        "iterationCount": 1,
        "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
        "duration": 0.4
      };

      this.view.flxImage.animate(imgAnim, animConfig1);
      animConfig.delay = 0.3;
      this.view.lblHeaderText1.animate(lblAnim, animConfig);
      animConfig.delay = 0.4;
      this.view.lblHeaderText2.animate(lblAnim, animConfig);
    },
    slideInAnimation: function () {
      var imgTop = this.view.flxImage.top;
      var lbl1Top = this.view.lblHeaderText1.top;
      var lbl2Top = this.view.lblHeaderText2.top;
      var animImgLeft = voltmx.ui.createAnimation({
        "0": {
          "left": this._hamburgerDirection === 'Left' ? "-" + this.view.flxImage.width : Number(this.view.flxImage.left.split("%")[0]) + 100 + "%",
          "stepConfig": {
            "timingFunction": voltmx.anim.EASE
          }
        },
        "100": {
          "left": this.view.flxImage.left,
          "stepConfig": {
            "timingFunction": voltmx.anim.EASE
          }
        }
      });
      var animLbl1Left = voltmx.ui.createAnimation({
        "0": {
          "left": this._hamburgerDirection === 'Left' ? "0%" : "100%",
          "stepConfig": {
            "timingFunction": voltmx.anim.EASE
          }
        },
        "100": {
          "left": this.view.lblHeaderText1.left,
          "stepConfig": {
            "timingFunction": voltmx.anim.EASE
          }
        }
      });
      var animLbl2Left = voltmx.ui.createAnimation({
        "0": {
          "left": this._hamburgerDirection === 'Left' ? "0%" : "100%",
          "stepConfig": {
            "timingFunction": voltmx.anim.EASE
          }
        },
        "100": {
          "left": this.view.lblHeaderText2.left,
          "stepConfig": {
            "timingFunction": voltmx.anim.EASE
          }
        }
      });
      var animationConfig = {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
        "duration": 0.5
      };
      switch (this._hamburgerDirection) {
        case 'Left': {
          this.view.lblHeaderText1.animate(animLbl1Left, animationConfig,{});
          this.view.lblHeaderText2.animate(animLbl2Left, animationConfig,{});
          this.view.flxImage.animate(animImgLeft, animationConfig, {});
          break;
        }
        case 'Right': {
          this.view.flxImage.animate(animImgLeft, animationConfig, {});
          this.view.lblHeaderText1.animate(animLbl1Left, animationConfig, {});
          this.view.lblHeaderText2.animate(animLbl1Left, animationConfig, {});
          break;
        }
        default: {
          throw {
            error: "InvalidSlidingMenuDirection",
            message: "InValid Sliding Menu Direction 2"
          };
        }
      }

    },
    segmentAnimation: function () {
      try {
        voltmxL.logger.trace("----------------------------- Start  segmentAnimations", voltmxL.logger.FUNCTION_ENTRY);
        var alldata = this.view.flxMenuControl.widgets();
        if (alldata === null || alldata.length === 0) {
          return;
        }
        var animationDef = {
          "100": {
            "left": "5%",
            "stepConfig": {
              "timingFunction": voltmx.anim.EASE
            }
          }
        };
        var animationDef2 = {
          "100": {
            "left": "10%",
            "stepConfig": {
              "timingFunction": voltmx.anim.EASE
            }
          }
        }; 
        var logoutLeft = {
          "100": {
            'left':'10%',
            "stepConfig": {
              "timingFunction": voltmx.anim.EASE
            }
          }
        };
        var allwidleft = '';
        logoutLeft['100'].left = '4%';
        if (this._hamburgerDirection === "Left") {
          allwidleft = '-100%';
          this.view.flxBotom.left = "-120%";
          if(this._hamburgerAnimation==='Squeeze')
          {

            logoutLeft['100'].left = '10%';
          }
          else if(this._hamburgerAnimation ==='Push'||this._hamburgerAnimation ==='Overlay' )
          {
            logoutLeft['100'].left = '20%';
          }
        }
        else if (this._hamburgerDirection === "Right") {
          this.view.flxBotom.left = "100%";
          allwidleft = '100%';
          if(this._hamburgerAnimation==='Squeeze')
          {
            logoutLeft['100'].left = '40%';    
          }

        }
        for (var i = 0;i<alldata.length;i++) {
          if(alldata.id ==='lblMenuContent')
          {
            return;
          }
          alldata[i].left = allwidleft ;
        }
        for (var i = 0 ;i<alldata.length;i++) {
          if(alldata.id ==='lblMenuContent')
          {
            return;
          }
          var animationDefObject = voltmx.ui.createAnimation(animationDef);
          var aniationDefObject2 =  voltmx.ui.createAnimation(animationDef2);
          var animConfig = {
            "delay": 0.07 * i,
            "iterationCount": 1,
            "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
            "duration": 0.5
          };
          if (alldata[i].id.indexOf("flxflxOptions") === -1) {
            alldata[i].animate(
              animationDefObject, animConfig, {});
          } else {
            alldata[i].animate(aniationDefObject2, animConfig, {});
          }
          if (i == (alldata.length - 1)) {
            var bottomAnimConfig = voltmx.ui.createAnimation(logoutLeft);
            var bottomAnimDef = {
              "delay": 0.2,
              "iterationCount": 1,
              "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
              "duration": 0.5
            };
            this.view.flxBotom.animate(bottomAnimConfig, bottomAnimDef, {});
          }
        }
        voltmxL.logger.trace("----------------------------- End segmentAnimations", voltmxL.logger.FUNCTION_EXIT);
      } catch (e) {
        voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
      }

    },

    /**
		 * @function
		 * Desc : Shows Sliding Menu
		 * {inbuilt function : Not exposed to user}
		 */
    _setFlxHeader: function(direction,animation){
      switch(direction){
        case 'Left':{
          switch(animation){
            case 'Push' || 'Overlay':{
              this.view.flxHeader.left = "20%";
              break;
            }
            case 'Reveal' || 'Squeeze':{
              this.view.flxHeader.left = "0%";
              break;
            }
            default:{
              this.view.flxHeader.left = "0%";
            }

          }
          break;
        }
        case 'Right':{
          switch(animation){
            case 'Push'|| 'Reveal':{
              this.view.flxHeader.left = "0%";
              break;
            }
            case 'Squeeze':{
              this.view.flxHeader.left = "30%";
              this.view.forceLayout();
              break;
            }
            default:{
              this.view.flxHeader.left = "0%";
            }
          }
          break;
        }
        default:{} 
      }
    },
    showSlidingMenu: function () {

      try {
        voltmxL.logger.trace("----------------------------- Start showSlidingMenu", voltmxL.logger.FUNCTION_ENTRY);
        this._setFlxHeader(this._hamburgerDirection,this._hamburgerAnimation);
       this._hamburgerPosition = 1;
        try {
          this.onShowSlidingMenu();
        } catch (e) {
          voltmx.print("-------------Error While Calling onShowSlidingMenu" + JSON.stringify(e));
          throw e;
        }
        this.view.flxHamParent.onClick = function () {};
        this.showSlidingMenuAnimation(this._hamburgerDirection);
        this.headerAnimations();
        if(this._enableSegmentAnimation === true)
        {
          this.segmentAnimation();
        }
        this._showFlxCoverAnimation();
        voltmxL.logger.trace("----------------------------- End showSlidingMenu", voltmxL.logger.FUNCTION_EXIT);
      } catch (e) {
        voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
        if (e.error === "InvalidSlidingMenuDirection") {
          throw e;
        }
      }
    },
    _flxSlidingMenuShowAnimation: function (left1, left2, animDef, animEnd) {
      if(left1 !== ""){
        this.view.flxMainSlidingMenu.left = left1;
      }
      var animConfig1 = voltmx.ui.createAnimation({
        "100": {
          "left": left2,
          "stepConfig": {
            "timingFunction": voltmx.anim.EASE
          }
        }
      });
      this.view.flxMainSlidingMenu.animate(animConfig1, animDef, animEnd);
    },
    _flxTargetContainerShowAnimation: function (left1, left2, animDef, animEnd,trans) {
      this.view.flxTargetContainer.left = left1;
      var config = {
        "100": {
          "left": left2,
          "stepConfig": {
            "timingFunction": voltmx.anim.EASE
          }
        }
      };
      if(trans!==undefined)
      {
        config['100'].rectified = true;
        config['100'].transform = trans;
      }
      var animConfig = voltmx.ui.createAnimation(config);
      this.view.flxTargetContainer.animate(animConfig, animDef, animEnd);
    },
    showSlidingMenuAnimation: function (direction) {
      this.view.flxMainSlidingMenu.isVisible = true;
      var animDef = {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
        "duration": Number(this._animSpeed)
      };
      var animEnd1 = {
        "animationEnd":function(){}        
      };
      var animEnd2 = {
        "animationEnd": function () {
          this.view.flxCover.onClick = this.hideSlidingMenu.bind(this);
          this.view.flxHamParent.onClick = this.hideSlidingMenu.bind(this);
        }.bind(this)
      };
      switch (this._hamburgerAnimation) {
        case 'Push': {
          this.view.flxCover.skin = 'slFbox';
          switch (direction) {
            case 'Right': {
              if(this._enableSegmentAnimation===false)
              {
                this.view.flxBotom.left = '5%';
              }
              this._flxSlidingMenuShowAnimation("100%", "20%", animDef, animEnd1);
              this._flxTargetContainerShowAnimation("0%", "-80%", animDef, animEnd2);
              break;
            }
            case 'Left': {
              this.view.flxMenuControl.left = '20%';
              this._flxSlidingMenuShowAnimation("-100%", "-20%", animDef, animEnd1);
              this._flxTargetContainerShowAnimation("0%", "80%", animDef, animEnd2);
              break;
            }
            default: {
              throw {
                error: "InvalidSlidingMenuDirection",
                message: "InValid Sliding Menu Direction 3"
              };
            }
          }
          break;
        }
        case 'Reveal': {

          this.view.flxCover.skin = 'voltmxmpsmflxCoverSkin';
          switch (direction) {
            case 'Right': {
              this.view.flxMainSlidingMenu.left="20%";
              this._flxTargetContainerShowAnimation("0%", "-80%", animDef, animEnd2);
              break;
            }
            case 'Left': {
              //    this.view.flxMainSlidingMenu.left="-20%";
              this._flxTargetContainerShowAnimation("0%", "80%", animDef, animEnd2);
              break;
            }
            default: {
              throw {
                error: "InvalidSlidingMenuDirection",
                message: "InValid Sliding Menu Direction "
              };
            }
          }
          break;
        }
        case 'Overlay': {
          this.view.flxCover.skin = 'voltmxmpsmflxCoverSkin'; 
          switch (direction) {
            case 'Right': {
              this.view.flxTargetContainer.left="0%";
              if(this._enableSegmentAnimation===false)
              {
                this.view.flxBotom.left = '0%';
              }
              this._flxSlidingMenuShowAnimation("100%", "20%", animDef, animEnd2);
              break;
            }
            case 'Left': {
              this.view.flxHeader.left = '20%';
              this.view.flxMenuControl.left = '20%';
              if(this._enableSegmentAnimation===false)
              {
                this.view.flxBotom.left = '18%';
              }
              this.view.flxTargetContainer.left="0%";
              this._flxSlidingMenuShowAnimation("-100%", "-20%", animDef, animEnd2);
              break;
            }
            default: {
              throw {
                error: "InvalidSlidingMenuDirection",
                message: "InValid Sliding Menu Direction "
              };
            }
          }
          break;
        }
        case 'Squeeze':{
          this.view.flxCover.skin = 'voltmxmpsmflxCoverSkin';

          var trans100 = voltmx.ui.makeAffineTransform();
          trans100.scale(0.8, 0.8);
          switch (direction) {
            case 'Right': {
              if(this._enableSegmentAnimation===false)
              {
                this.view.flxBotom.left = '40%';
              }
              //               this.view.flxMenuControl.left = '40%';
              this.view.flxMenuControl.left = '20%';
              this._flxSlidingMenuShowAnimation("0%", "0%", animDef, animEnd1);
              this._flxTargetContainerShowAnimation("0%", "-70%", animDef, animEnd2, trans100);
              //               this._flxTargetContainerShowAnimation("0%", "-50%", animDef, animEnd2, trans100);
              break;
            }
            case 'Left': {
              if(this._enableSegmentAnimation===false)
              {
                this.view.flxBotom.left = '3%';
              }
              this.view.flxMenuControl.left = '5%';
              this._flxSlidingMenuShowAnimation("0%", "0%", animDef, animEnd1);
              this._flxTargetContainerShowAnimation("0%", "50%", animDef, animEnd2, trans100);
              break;
            }
            default: {
              throw {
                error: "InvalidSlidingMenuDirection",
                message: "InValid Sliding Menu Direction 3"
              };
            }
          }
          break;
        }
        default: {
          throw {
            error: "InvalidSlidingMenuTransition",
            message: "InValid Sliding Menu Transition"
          };
        }
      }
    },
    /**
		 * @function
		 * Desc : onShowing Sliding Menu
		 * {inbuilt function}
		 */
    hideSlidingMenu: function () {


      try {
        voltmxL.logger.trace("----------------------------- Start hideSlidingMenu", voltmxL.logger.FUNCTION_ENTRY);
        this.view.flxHamParent.onClick = function () {};
        this.view.flxCover.onClick = function () {};
        this._hamburgerPosition = 0;
        try {
          this.onHideSlidingMenu();
        } catch (e) {
          voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
          throw(e);
        }
        this._hideFlxCoverAnimation();
        this.hideSlidingMenuAnimation(this._hamburgerDirection);
        voltmxL.logger.trace("----------------------------- End hideSlidingMenu", voltmxL.logger.FUNCTION_EXIT);
      } catch (e) {

        voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
        if (e.error === "InvalidSlidingMenuDirection") {
          throw e;
        }
      }
    },
    hideSlidingMenuAnimation: function (direction) {

      var animDef = {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
        "duration": Number(this._animSpeed)
      };
      var animEnd1 = {"animationEnd":function(){}};
      var animEnd2 = {
        "animationEnd": function () {
          this.view.flxCover.onClick = function(){};
          this.view.flxHamParent.onClick = this.showSlidingMenu.bind(this);
          this.view.flxMainSlidingMenu.isVisible = false;
        }.bind(this)
      };
      switch (this._hamburgerAnimation) {
        case 'Push': {
          switch (direction) {
            case 'Right': {
              this._flxSlidingMenuShowAnimation("20%", "100%", animDef, animEnd1);
              this._flxTargetContainerShowAnimation("-80%", "0%", animDef, animEnd2);
              break;
            }
            case 'Left': {
              this._flxSlidingMenuShowAnimation("-20%", "-100%", animDef, animEnd1);
              this._flxTargetContainerShowAnimation("80%", "0%", animDef, animEnd2);
              break;
            }
            default: {
              throw {
                error: "InvalidSlidingMenuDirection",
                message: "InValid Sliding Menu Direction 3"
              };
            }
          }
          break;
        }
        case 'Reveal': {
          switch (direction) {
            case 'Right': {
              this._flxTargetContainerShowAnimation("-80%", "0%", animDef, animEnd2);
              break;
            }
            case 'Left': {
              this._flxTargetContainerShowAnimation("80%", "0%", animDef, animEnd2);
              break;
            }
            default: {
              throw {
                error: "InvalidSlidingMenuDirection",
                message: "InValid Sliding Menu Direction "
              };
            }
          }
          break;
        }
        case 'Overlay': {
          switch (direction) {
            case 'Right': {
              this._flxSlidingMenuShowAnimation("", "100%", animDef, animEnd2);
              break;
            }
            case 'Left': {
              this._flxSlidingMenuShowAnimation("", "-100%", animDef, animEnd2);
              break;
            }
            default: {
              throw {
                error: "InvalidSlidingMenuDirection",
                message: "InValid Sliding Menu Direction "
              };
            }
          }
          break;
        }
        case 'Squeeze':{
          var trans100 = voltmx.ui.makeAffineTransform();
          trans100.scale(1, 1);
          switch (direction) {
            case 'Right': {
              this._flxSlidingMenuShowAnimation("0%", "0%", animDef, animEnd1);
              this._flxTargetContainerShowAnimation("-50%", "0%", animDef, animEnd2, trans100);
              break;
            }
            case 'Left': {
              this._flxSlidingMenuShowAnimation("0%", "0%", animDef, animEnd1);
              this._flxTargetContainerShowAnimation("50%", "0%", animDef, animEnd2, trans100);
              break;
            }
            default: {
              throw {
                error: "InvalidSlidingMenuDirection",
                message: "InValid Sliding Menu Direction 3"
              };
            }
          }
          break;
        }
        default: {
          throw {
            error: "InvalidSlidingMenuTransition",
            message: "InValid Sliding Menu Transition"
          };
        }
      }
    },
    _hideFlxCoverAnimation: function () {

      this.view.flxCover.isVisible = false;

    },
    _showFlxCoverAnimation: function () {
      this.view.flxCover.isVisible = true;
      this.view.flxCover.onClick = this.hideSlidingMenu.bind(this);

    },

    /**
		 * @function
		 *
		 */
    removeAllMenuItem: function () {
      try {
        voltmxL.logger.trace("----------------------------- Start removeAllMenuItem", voltmxL.logger.FUNCTION_ENTRY);
        this.view.flxMenuControl.removeAll();
        voltmxL.logger.trace("----------------------------- End removeAllMenuItem", voltmxL.logger.FUNCTION_EXIT);
      } catch (e) {
        voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
      }
    },
    /**
		 *function
		 *menu Items : Array of JSON[{img:"",text:""}]
		 */
    addMenuItems: function (menuItem,submenuItem) {
      try {
        voltmxL.logger.trace("----------------------------- Start addMenuItems", voltmxL.logger.FUNCTION_ENTRY);
        if (menuItem === undefined || menuItem === null || menuItem === "") {
          throw {
            message: "empty or undefined parameter"
          };
        }      
        this.view.flxMenuControl.removeAll();
        if(submenuItem===undefined||submenuItem===null||submenuItem==='')
        {this._createMenuItems(menuItem);
        }else
        {
          var newdata = this.modifyDataFromDataGrid(submenuItem,menuItem);
          this._createMenuItems(newdata);
        }
        voltmxL.logger.trace("----------------------------- End addMenuItems ", voltmxL.logger.FUNCTION_EXIT);
      } catch (e) {
        voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
      }
    },
    _createMenuItems: function (data) {
      try {
        voltmxL.logger.trace("----------------------------- Start _createMenuItems", voltmxL.logger.FUNCTION_ENTRY);
        for (var i = 0; i < data.length; i++) {
          if (Array.isArray(data[i])) {
            this._addwithsubItem(data[i], "menu" + i, i);
            voltmx.print("--added from array" + JSON.stringify(data[i]));
          } else if (typeof data[i] == 'object') {
            var wid1 = this._createOption(data[i], "menu" + i, "option", [i]);
            voltmx.print("--added from json" + JSON.stringify(data[i]));
            this.view.flxMenuControl.add(wid1);
          } else {
            throw {
              message: "wrong data passed while creatng hamburger.",
              error: "reusable widget error"
            };
          }
        }
        voltmxL.logger.trace("----------------------------- End _createMenuItems", voltmxL.logger.FUNCTION_EXIT);
      } catch (e) {
        voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
      }
    },
    _addwithsubItem: function (data, id, index) {
      try {
        voltmxL.logger.trace("----------------------------- Start _addwithsubItem", voltmxL.logger.FUNCTION_ENTRY);
        var flxHeaderData = new voltmx.ui.FlexContainer({
          height:'38dp',
          "clipBounds": true,
          "enableCache": false,
          "top": 60*index+'dp',
          "id": "flxHeaderData" + id.trim(),
          "isVisible": true,
          "skin":"slFbox",
          "width": "80%",
          "zIndex": 3,
          "layoutType": voltmx.flex.FLOW_HORIZONTAL,
        }, {}, {});
        flxHeaderData.setDefaultUnit(voltmx.flex.DP);
        var suboptimgProp = {
          "enableCache": false,
          "height": "30dp",
          "id": "Sectionimg" + id,
          "isVisible": true,
          "left": "-95%",
          "skin": "slImage",
          "top": "3dp",
          "width": "30dp",
          "zIndex": 1
        };
        var imgOpt1 = new voltmx.ui.Image2(suboptimgProp, {
          "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
          "padding": [0, 0, 0, 0],
          "paddingInPixel": false
        }, {});
        if(typeof data[1] === 'string')
        {
          imgOpt1.src = data[1];
        }else
        {
          imgOpt1.base64 = data[1].base64;
        }

        var lblHeadText = new voltmx.ui.Label({
          "enableCache": false,
          "id": "lblHeadText" + id.trim(),
          "isVisible": true,
          "left": "0dp",
          'top': "6dp",
          "skin": this.view.lblnunito.skin,
          "text": data[0],
          "width": voltmx.flex.USE_PREFFERED_SIZE,
          "zIndex": 1
        }, {
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "padding": [0, 0, 0, 0],
          "paddingInPixel": false
        }, {});
        var lblseparator = new voltmx.ui.Label({
          "enableCache": false,
          "id": "lblseparator" + id.trim(),
          "isVisible": true,
          "left": "0%",
          'bottom': "2dp",
          "skin": this._enableSeparator?this.view.lblSeparatorSkin.skin:'slLabel',
          "height": "1px",
          "width":'100%',
          "zIndex": 1
        }, {
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "padding": [0, 0, 0, 0],
          "paddingInPixel": false
        }, {});
        var imgShowSubmenu = new voltmx.ui.Image2({
          "enableCache": false,
          "height": "20dp",
          "id": "imgShowSubmenu" + id.trim(),
          "isVisible": true,
          "left": "5%",
          "skin": "slImage",
          "src": "voltmxmp_sm_chevron_right_1.png",
          "top": "10dp",
          "width": "20dp",
          "zIndex": 1,
          //"centerY":"50%"
        }, {
          "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
          "padding": [0, 0, 0, 0],
          "paddingInPixel": false
        }, {});
        var _showhideSubOption = this._showhideSubOption;
        flxHeaderData.add(lblseparator, imgOpt1, lblHeadText, imgShowSubmenu);        
        this.view.flxMenuControl.add(flxHeaderData);
        var allid = [];
        for (var i in data[2]) {
          try {
            this.view.flxMenuControl.add(this._createOption(data[2][i], "flxOptions" + id + i, "suboption",[index,i]));
            allid.push("flxflxOptions" + id + i);
          } catch (e) {
            voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
          }
        }
        this.view.flxMenuControl[flxHeaderData.id].onClick = _showhideSubOption.bind(this, allid);
        voltmxL.logger.trace("----------------------------- End _addwithsubItem", voltmxL.logger.FUNCTION_EXIT);
      } catch (e) {
        voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
      }
    },
    /**
     * @function
     *
     * @param suboptionIds 
     * @param context 
     */
    _showhideSubOption:function(suboptionIds, context){
      try {
        voltmxL.logger.trace("----------------------------- Start _showhideSubOption", voltmxL.logger.FUNCTION_ENTRY);
        this.view.flxBlockContext.isVisible = true;
        const show = this.view["" + suboptionIds[0]].isVisible;
        if (show === false) {
          this._showSubOption(suboptionIds, context);
        } 
        else {
          this._hideSubOption(suboptionIds,context);
        }
        voltmxL.logger.trace("----------------------------- End _showhideSubOption", voltmxL.logger.FUNCTION_ENTRY);
      } catch (e) {
        voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
      }

    },
    /**
     * @function
     *
     * @param suboptionIds 
     * @param context 
     */
    _showSubOption:function(suboptionIds,context){
      var transformObject = "",callback,transformobj;
      var imgWid = context.widgets()[3];
      var allwid = this.view.flxMenuControl.widgets();
      var lastid = suboptionIds[suboptionIds.length -1];
      var temp  = 0;
      var lastindex = allwid.findIndex(function(item, i){
        if(item.id === lastid){
          return item; }});
      transformObject = voltmx.ui.makeAffineTransform();
      transformObject.rotate(-90);
      for (var j = 0; j<suboptionIds.length; j++) {
        this.view["" + suboptionIds[j]].top = parseInt(context.top)+j*36+'dp';
        this.view["" + suboptionIds[j]].isVisible = true;      
        this.view["" + suboptionIds[j]].left = "5%";      
        this.view[suboptionIds[j]].anchorPoint = {
          "x": 0.5,
          "y": 0
        };
        var animend = {animationEnd:function(){}};
        if(lastindex+1===allwid.length)
        {
          animend.animationEnd = function(){
            this.view.flxBlockContext.isVisible = false;
          }.bind(this);
        }
        this.view[suboptionIds[j]].animate(voltmx.ui.createAnimation({
          "100": {
            top:parseInt(context.top)+36*(j+1)+'dp',
            "opacity": 1,
            "stepConfig": {
              "timingFunction": voltmx.anim.EASE
            },
          },
          "0": {
            "opacity": 0,
            "stepConfig": {
              "timingFunction": voltmx.anim.EASE
            },
          }
        }), {
          "delay": 0.05 * j,
          "iterationCount": 1,
          "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
          "duration": 0.4
        },animend);
      }
      imgWid.animate(voltmx.ui.createAnimation({
        "100": {
          "stepConfig": {
            "timingFunction": voltmx.anim.EASE
          },
          "transform": transformObject
        }
      }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
        "duration": 0.4
      }, {
        "animationEnd": function (){
        }
      });
      var tmp = lastindex+1;
      var enableClick = {};
      for(tmp;tmp<allwid.length;tmp++)
      {
        if(tmp===allwid.length-1)
        {

          enableClick.animationEnd = function(){
            this.view.flxBlockContext.isVisible = false;
          }.bind(this);
        }
        allwid[tmp].animate(voltmx.ui.createAnimation({
          "100": {
            "top": (parseInt(allwid[tmp].top)+36*suboptionIds.length)+'dp',
            "stepConfig": {
              "timingFunction": voltmx.anim.EASE
            },
          }
        }), {
          "delay": 0.02 *(tmp-lastindex) ,
          "iterationCount": 1,
          "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
          "duration": 0.4
        }, enableClick);		
      }
    },
    /**
	 * @function
	 *
	 * @param suboptionIds 
	 * @param context 
	 */
    _hideSubOption:function(suboptionIds,context){
      var imgWid = context.widgets()[3];
      var allwid = this.view.flxMenuControl.widgets();
      var lastid = suboptionIds[suboptionIds.length -1];
      var temp  = 0;
      var lastindex = allwid.findIndex(function(item, i){
        if(item.id === lastid){
          return item; }});
      var transformObject = voltmx.ui.makeAffineTransform();
      transformObject.rotate(0);
      var callback = function (widget) {
        widget.isVisible = false;
      };

      var callback2 = function(widget) {
        widget.isVisible = false;
        this.view.flxBlockContext.isVisible = false;
      };	
      for (var j = 0; j<suboptionIds.length; j++){
        var animend = {
          "animationEnd": callback.bind(this, this.view[suboptionIds[j]])
        };
        if((lastindex+1)===allwid.length)
        {
          animend.animationEnd = callback2.bind(this, this.view[suboptionIds[j]]);
        }
        this.view[suboptionIds[j]].animate(voltmx.ui.createAnimation({
          "100": {
            top :context.top,
            "opacity": 0,
            "stepConfig": {
              "timingFunction": voltmx.anim.EASE
            },
          },
          "0": {
            "opacity": 1,
            "stepConfig": {
              "timingFunction": voltmx.anim.EASE
            },
          }
        }), {
          "delay": 0.07 * j,
          "iterationCount": 1,
          "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
          "duration": 0.4
        }, animend);
      }
      imgWid.animate(voltmx.ui.createAnimation({
        "100": {
          "stepConfig": {
            "timingFunction": voltmx.anim.EASE
          },
          "transform": transformObject
        }
      }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
        "duration": 0.4
      }, {
      });
      var tmp = lastindex+1;
      for(tmp;tmp<allwid.length;tmp++){
        var enableclick = {};

        if(tmp===allwid.length-1)
        {

          enableclick.animationEnd = function(){
            this.view.flxBlockContext.isVisible = false;
          }.bind(this);
        }
        allwid[tmp].animate(voltmx.ui.createAnimation({

          "100": {
            "top": (parseInt(allwid[tmp].top) -36*(suboptionIds.length))+'dp',
            "stepConfig": {
              "timingFunction": voltmx.anim.EASE
            },
          }
        }), {
          "delay": 0.02 *(tmp-lastindex) ,
          "iterationCount": 1,
          "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
          "duration": 0.4
        }, enableclick);
      }


    },

    /**
		 * @function
		 *
		 * @param data
		 * @param id
		 */
    _createOption: function (data, id, type,index) {
      try {
        voltmxL.logger.trace("----------------------------- Start _createOption ", voltmxL.logger.FUNCTION_ENTRY);

        var flxOpt1 = new voltmx.ui.FlexContainer({
          "autogrowMode": voltmx.flex.AUTOGROW_HEIGHT,
          //"height": "80dp",
          "height": "38dp",
          "clipBounds": true,
          "enableCache": false,
          "id": "flx" + id,
          "opacity": type !== "option" ? 0 : 1,
          "isVisible": type !== "option" ? false : true,
          "layoutType": voltmx.flex.FLOW_HORIZONTAL,
          //           "left": type !== "option" ? "10%" : "0%",
          //           "left": type !== "option" ? "1%" : "0%",
          "left": type !== "option" ? "1%" : "0%",
          "skin": "slFbox",
          "focusSkin": "voltmxmpsmflxfocusSkin",
          "top": 60*index+'dp',
          //           "width": "80%",
          "width": "100%",
          //           "width": "80%",
          "onClick":function(menuId){this.onMenuItemClick(menuId)}.bind(this,index),
          "zIndex": 1
        }, {}, {});
        flxOpt1.setDefaultUnit(voltmx.flex.DP);
        var imgprop = {
          "enableCache": false,
          "height": "30dp",
          "id": "img" + id,
          "isVisible": true,
          "left": type !== "option" ? "-98%" : "-97%",
          "skin": "slImage",
          "top": "15dp",
          "width": "20dp",
          "zIndex": 1,
          "centerY":"50%"
        };
        var lblseparator = new voltmx.ui.Label({
          "enableCache": false,
          "id": "lblseparator" + id.trim(),
          "isVisible": true,
          "left": "2%",
          'bottom': "2dp",
          "skin": this._enableSeparator?this.view.lblSeparatorSkin.skin:'slLabel',
          "height": "1px",
          "width":'100%',
          "zIndex": 1
        }, {
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "padding": [0, 0, 0, 0],
          "paddingInPixel": false
        }, {});
        var imgOpt1 = new voltmx.ui.Image2(imgprop, {
          "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
          "padding": [0, 0, 0, 0],
          "paddingInPixel": false
        }, {});
        if(data.base64===undefined||data.base64===null)
        {
          imgOpt1.src =  type !== "option" ? data.submenuItemIcon :data.menuItemIcon;
        }
        else
        {
          imgOpt1.base64 = data.base64;     
        }
        var lblOpt1 = new voltmx.ui.Label({

          "enableCache": false,
          "id": "lbl" + id,
          "isVisible": true,
          "left": "10dp",
          // "skin": this.view.lblnunito.skin,
          "skin":"CopyvoltmxmpsmsknlblSanFranciscoFFFFFF",
          "text": type !== "option" ? data.submenuItemName :data.menuItemName,
          "centerY": "50%",
          "width": voltmx.flex.USE_PREFFERED_SIZE,
          //           "width": "62%",
          //  "width": "62%",
          "Height":"100%",
          // "zIndex": 1
        }, {
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "padding": [0, 0, 0, 0],
          "paddingInPixel": false
        }, {});
        flxOpt1.add(lblseparator, imgOpt1, lblOpt1);
        voltmxL.logger.trace("----------------------------- End _createOption", voltmxL.logger.FUNCTION_EXIT);
        return flxOpt1;

      } catch (e) {
        voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
      }
    },
    
    setOptionImg: function(id,image){
      this.view[id].src=image;
      
    },
    
    /**
		 * @function
		 *
		 * @param r1a
		 * @param opacity
		 * @param o1
		 * @param o2
		 * @param d1
		 * @param d2
		 */
    hamIconAnim: function (r1a, opacity, o1, o2, d1, d2) {
      try {
        voltmxL.logger.trace("----------------------------- Start hamIconAnim", voltmxL.logger.FUNCTION_ENTRY);
        this.view.imgHamIconClose.isVisible = true;
        var r1 = voltmx.ui.makeAffineTransform();
        r1.rotate(r1a);
        this.view.imgHamIcon.animate(
          voltmx.ui.createAnimation({
            "100": {
              "stepConfig": {
                "timingFunction": voltmx.anim.EASE
              },
              "transform": r1,
              "opacity": parseFloat(opacity)
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
            "duration": d1
          }, {
            "animationEnd": function () {}
          });
        this.view.imgHamIconClose.animate(
          voltmx.ui.createAnimation({
            "0": {
              "stepConfig": {
                "timingFunction": voltmx.anim.EASE
              },
              "opacity": parseFloat(o1)
            },
            "100": {
              "stepConfig": {
                "timingFunction": voltmx.anim.EASE
              },
              "transform": r1,
              "opacity": parseFloat(o2)
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
            "duration": d2
          }, {
            "animationEnd": function () {}
          });
        voltmxL.logger.trace("----------------------------- End hamIconAnim", voltmxL.logger.FUNCTION_EXIT);
      } catch (e) {
        voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
      }
    },
    /**
     * @function
     *
     */
    _checkForSubOptionVisibility: function () {    
      try {
        voltmxL.logger.trace("----------------------------- Start _checkForSubOptionVisibility", voltmxL.logger.FUNCTION_ENTRY);
        var allWidgets = this.view.flxMenuControl.widgets();
        for (var i in allWidgets) {
          if (allWidgets[i].widgets()[1].id.includes("flx")) {
            allWidgets[i].widgets()[1].isVisible = false;
            allWidgets[i].forceLayout();
          }
        }
        voltmxL.logger.trace("----------------------------- End _checkForSubOptionVisibility", voltmxL.logger.FUNCTION_EXIT);
      } catch (e) {
        voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
      }
    },
    /**
     * @function
     *
     * @param suboptions 
     * @param options 
     */
    modifyDataFromDataGrid: function (suboptions, options) { 
      try{
        var _filter = function (menuItem, obj) {
          if (obj.menuItemName === menuItem) {
            return obj;
          }
        };
        var data = [];
        for (var i in options) {
          var suboption = suboptions.filter(_filter.bind(this, options[i].menuItemName));
          if (suboption.length > 0 && suboption[0] !== null) {
            if(options[i].base64!==undefined)
              data.push([options[i].menuItemName,{base64: options[i].base64}, suboption]);
            else
              data.push([options[i].menuItemName,options[i].menuItemIcon, suboption]); 
          } else {
            data.push(options[i]);
          }
        }
        return data;
      }
      catch(e)
      {
        voltmxL.logger.error(JSON.stringify(e), voltmxL.logger.EXCEPTION);
      }},
  };
});
