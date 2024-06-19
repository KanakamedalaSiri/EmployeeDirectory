define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      isFilterEnabled=false;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    toggleProfile: function(){
      if(this.onUserFlxClick!==null&&this.onUserFlxClick!==undefined){
        this.onUserFlxClick("userProfile");
      }

    },

  };


});