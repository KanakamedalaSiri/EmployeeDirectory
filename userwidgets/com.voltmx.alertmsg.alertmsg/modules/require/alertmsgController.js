define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      

    },


    setTitle:function(title){

      if(title!==undefined && title!==null){
        this.view.lblTitle.text=title;
      }

    },

    setMessage:function(msg){

      if(msg!==undefined && msg!==null){
        this.view.lblMsgDescription.text=msg;
      }
    },

    hideAlert:function(){
      if(this.onAlertFlexClick!==null && this.onAlertFlexClick!==undefined){
        this.onAlertFlexClick();
      }
    },
    
    setUIForChannel:function(channel){
      switch(channel){
          
        case "desktop":
          this.view.flxAlertMsg.height="180px";
          this.view.flxAlertMsg.width="500px";
          this.view.flxAlertTitle.lblTitle.txt="desktop";
          break;
          
          case "tablet":
          this.view.flxAlertMsg.height="160px";
          this.view.flxAlertMsg.width="350px";
          this.view.flxAlertTitle.lblTitle.txt="desktop";
          break;
          
          case "mobile":
          this.view.flxAlertMsg.height="150px";
          this.view.flxAlertMsg.width="250px";
          this.view.flxAlertTitle.lblTitle.txt="desktop";
      }
      this.view.forceLayout();
    }

  };






});