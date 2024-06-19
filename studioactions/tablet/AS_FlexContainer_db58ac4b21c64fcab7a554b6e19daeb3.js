function AS_FlexContainer_db58ac4b21c64fcab7a554b6e19daeb3(eventobject) {
    var self = this;
    voltmx.store.setItem("inputType", "social");
    this.invokeIdentityService("reusableGoogleLogin");
}