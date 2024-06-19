define({ 
  /**
	 * @function onNavigate
	 * @description - This function will call disable error function to disable the error label visibility
	 **/
  userEmail:null,

  onNavigate : function(){
    this.disableError();
    voltmx.store.setItem("isAdmin", false);
  },

  /**
	 * @function doUserStoreLogin
	 * @description - This function will make userstore identity service call with user name and password
     * @param {String - username} - username entered in username text box
     * @param {String - password} - password entered in password text box
	 **/
  doUserStoreLogin : function(username,password){
   
    username=this.view.txtUser.text;
    password=this.view.txtPassWord.text;
    this.userEmail=username;
    if(username === null || username === "" || password === null || password === ""){
      this.enableError("Username or Password should not be Empty");
      return;
    }
    showLoadingScreen(this.view);
    var sdkInstance = new voltmx.sdk.getCurrentInstance();
    try{
      var  userStoreAuth = sdkInstance.getIdentityService("userIdentityService");
      var userCred = {
        "userid" : username,
        "password" : password
      };
      userStoreAuth.login(userCred,
                          this.userStoreLoginSuccss.bind(this,userStoreAuth),
                          this.userStoreLoginFailure.bind(this)
                         );
    }catch(error){
      dismissLoadingScreen();
      this.enableError("something went wrong please try later");
    }
  },
  userFetchSuccess:function(result){
   
    if(result!==undefined && result.groups!==undefined){
      var groupLength=result.groups.length;
      for(i=0;i<groupLength;i++){
        if(result.groups[i]=="Admin"){
          voltmx.store.setItem("isAdmin", true);
          break;
        }
      }
    }
    var navToCreateEvent = new voltmx.mvc.Navigation("frmEmpList");
    navToCreateEvent.navigate();

  },
  userFetchFailure:function(result){
   
  },

  /**
	 * @function userStoreLoginSuccss
	 * @description - This function will get the user attributes after successfull login
     * @param {JSON - response} - success response from the back end
	 **/
  userStoreLoginSuccss : function(userStoreAuth,response){
   
    userStoreAuth.getUserAttributes(this.userFetchSuccess.bind(this),this.userFetchFailure.bind(this));
    return;
  },

 

  /**
	 * @function userStoreLoginFailure
	 * @description - This function is the failure callback of login
     * this function will call enable error label in UI
     * @param {JSON - error} - error response from the back end
	 **/
  userStoreLoginFailure : function(error){
    this.enableError("The Username and Password combination you entered is not valid. Please try again.");
    this.view.txtPassWord.text="";
    this.view.txtPasswordShow.text="";
  },

  /**
	 * @function enableError
	 * @description - This function will enable error label in the UI with given message
     * @param {String - msg} - Message to be displayed
	 **/
  enableError : function(msg){
    voltmx.application.dismissLoadingScreen();
    this.view.lblError.text = msg;
    this.view.lblError.isVisible = true;
    this.view.forceLayout();
  },

  /**
	 * @function disableError
	 * @description - This function will make the error label invisible
	 **/
  disableError : function(){
    this.view.lblError.isVisible = false;
    this.view.forceLayout();
  },

  /**
	 * @function showLoading
	 * @description - This function will show loading screen
	 **/
  showLoading : function(){
    voltmx.application.showLoadingScreen("sknloading",
                                       "",
                                       constants.LOADING_SCREEN_POSITION_FULL_SCREEN, 
                                       true,
                                       false,
                                       {
      enableMenuKey: false,
      enableBackKey: false,
      progressIndicatorColor: "000000"
    });
    this.view.forceLayout();
  },
});