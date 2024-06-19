function AS_FlexContainer_d9c4242bcedc4d09a7a66faf05a04bdb(eventobject) {
    var self = this;
    voltmx.store.setItem("inputType", "social");
    this.invokeIdentityService("reusableLinkedinLogin");
}