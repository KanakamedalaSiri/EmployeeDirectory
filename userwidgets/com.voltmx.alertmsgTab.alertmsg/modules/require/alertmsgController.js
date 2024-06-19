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
  }

  };






});