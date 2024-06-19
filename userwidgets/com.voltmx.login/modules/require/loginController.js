define(function() {
  var voltmxLoggerModule = require('com/voltmx/login/voltmxLogger');
  var voltmxL = voltmxL || {};
  voltmxL.logger = (new voltmxLoggerModule("Login Component")) || function() {};
  voltmxL.logger.setLogLevel("DEBUG");
  voltmxL.logger.enableServerLogging = true;
  constants.DEFAULT_MINIMUM_CHAR_LENGTH = 8;
  constants.DEFAULT_MAX_LENGTH = 30;
  //   constants.USERNAME_VALIDATION_MESSAGE = "Username too small";
  //   constants.PASSWORD_VALIDATION_MESSAGE = "Password too small";
  constants.USERNAME_VALIDATION_MESSAGE = "Please Enter Valid Username";
  constants.PASSWORD_VALIDATION_MESSAGE = "Please Enter Valid Password";
  constants.DEFAULT_PROVIDER_NAME = "userIdentityService";
  constants.MF_ALERT_MESSAGE = "Please connect to MobileFabric";
  constants.DEFAULT_SUCCESS_MESSAGE = "Login Success";
  constants.DEFAULT_FAILURE_MESSAGE = "The Username and Password combination you entered is not valid. Please try again.";
  return {
    /**
         * @constructor constructor
         * @param basicConfig
         * @param layoutConfig
         * @param pspConfig
         */
    constructor: function(basicConfig, layoutConfig, pspConfig) {
      voltmxL.logger.trace("In Component constructor", voltmxL.logger.FUNCTION_ENTRY);
      this._usernameMinimumChar = constants.DEFAULT_MINIMUM_CHAR_LENGTH;
      this._passwordMinimumChar = constants.DEFAULT_MINIMUM_CHAR_LENGTH;
      this._usernameValidationMsg = constants.USERNAME_VALIDATION_MESSAGE;
      this._passwordValidationMsg = constants.PASSWORD_VALIDATION_MESSAGE;
      this._providerName = constants.DEFAULT_PROVIDER_NAME;
      this._encryptCredentials = true;
      this._userName="";
      this._password="";
    },
    /**
         * @function initGettersSetters
         * @description contains getters/setters for custom properties
         */
    initGettersSetters: function() {
      defineGetter(this, "usernameMinimumChar", function() {
        voltmxL.logger.trace("----------Entering usernameMinimumCharacter Getter---------", voltmxL.logger.FUNCTION_ENTRY);
        return this._usernameMinimumChar;
      });

      defineSetter(this, "usernameMinimumChar", function(val) {
        voltmxL.logger.trace("----------Entering usernameMinimumCharacter Setter---------", voltmxL.logger.FUNCTION_ENTRY);
        try {
          if (val == null || val == undefined) {
            voltmxL.logger.warn("Username Min Char is undefined");
            throw {
              "Error": "LoginComponent",
              "message": "Username Min Char is undefined"
            };
          }
          if (isNaN(val)) {
            voltmxL.logger.warn("Invalid datatype for Username Min Characters Property");
            throw {
              "Error": "LoginComponent",
              "message": "Invalid datatype for Username Min Characters Property"
            };
          }
          if (this.usernameMaxChar < val) {
            voltmxL.logger.warn("usernameMaxChar is less than usernameMinimumChar");
            throw {
              "Error": "LoginComponent",
              "message": "username Max Char is less than Username Min Character propert"
            };
          }
          this._usernameMinimumChar = val;
        } catch (exception) {
          if (exception["Error"] === "LoginComponent")
            alert(JSON.stringify(exception));
        }
      });
      defineGetter(this, "passwordMinimumChar", function() {
        voltmxL.logger.trace("----------Entering passwordMinimumCharacter Getter---------", voltmxL.logger.FUNCTION_ENTRY);
        return this._passwordMinimumChar;
      });
      defineSetter(this, "passwordMinimumChar", function(val) {
        voltmxL.logger.trace("----------Entering passwordMinimumCharacter Setter---------", voltmxL.logger.FUNCTION_ENTRY);
        try {
          if (val == null || val == undefined) {
            voltmxL.logger.warn("Password Min Char is undefined");
            throw {
              "Error": "LoginComponent",
              "message": "Password Min Char is undefined"
            };
          }
          if (isNaN(val)) {
            voltmxL.logger.warn("Invalid datatype for Password Min Characters Property");
            throw {
              "Error": "LoginComponent",
              "message": "Invalid datatype for Password Min Characters Property"
            };
          }
          if (this.passwordMaxChar < val) {
            voltmxL.logger.warn("passwordMaxChar is less than password Min Character");
            throw {
              "Error": "LoginComponent",
              "message": "Password Max Char is less than Password Min Character propert"
            };
          }
          this._passwordMinimumChar = val;
        } catch (exception) {
          if (exception["Error"] == "LoginComponent") {
            alert(JSON.stringify(exception));
          }
        }
      });
      defineGetter(this, "usernameValidationMsg", function() {
        voltmxL.logger.trace("----------Entering usernameValidationMsg Getter---------", voltmxL.logger.FUNCTION_ENTRY);
        return this._usernameValidationMsg;
      });
      defineSetter(this, "usernameValidationMsg", function(val) {
        voltmxL.logger.trace("----------Entering usernameValidationMsg Setter---------", voltmxL.logger.FUNCTION_ENTRY);
        this._usernameValidationMsg = val;
      });
      defineGetter(this, "passwordValidationMsg", function() {
        voltmxL.logger.trace("----------Entering passwordValidationMsg Getter---------", voltmxL.logger.FUNCTION_ENTRY);
        return this._passwordValidationMsg;
      });
      defineSetter(this, "passwordValidationMsg", function(val) {
        voltmxL.logger.trace("----------Entering passwordValidationMsg Setter---------", voltmxL.logger.FUNCTION_ENTRY);
        this._passwordValidationMsg = val;
      });
      defineGetter(this, "providerName", function() {
        voltmxL.logger.trace("----------Entering providerName Getter---------", voltmxL.logger.FUNCTION_ENTRY);
        return this._providerName;
      });
      defineSetter(this, "providerName", function(val) {
        voltmxL.logger.trace("------------Entering providerName Setter---------", voltmxL.logger.FUNCTION_ENTRY);
        this._providerName = val;
      });
      defineGetter(this, "encryptCredentials", function() {
        voltmxL.logger.trace("----------Entering encryptCredentials Getter---------", voltmxL.logger.FUNCTION_ENTRY);
        return this._encryptCredentials;
      });
      defineSetter(this, "encryptCredentials", function(val) {
        voltmxL.logger.trace("------------Entering encryptCredentials Setter---------", voltmxL.logger.FUNCTION_ENTRY);
        this._encryptCredentials = val;
        if (val == true) {
          this.getRememberMe();
        }
        this.checkTouchIdSupoort();
      });
    },
    /**
         * @function invokeTouch
         * @description This function is used to invoke animation
         * @private
         * @param {string} value
         * @param {string} top
         */
    invokeTouch: function(value, top) {
      voltmxL.logger.trace("---------------Entering invoke touch function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        value.animate(
          voltmx.ui.createAnimation({
            "100": {
              "left": "5%",
              "top": top,
              "stepConfig": {
                "timingFunction": voltmx.anim.EASE
              },
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
          }, {
            "animationEnd": this.focus(value, top)
          });
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting invoke touch function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function focus
         * @description This function is invoked after invokeTouch animation success
         * @private
         * @param {Object} value
         * @param {string} top
         * @callback invokeTouchCallback
         */
    focus: function(value, top) {
      voltmxL.logger.trace("---------------Entering focus function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        if (value.id == "lblUsername" && top == "-1%") {
          this.view.tbxUsername.setFocus(true);
          this.view.flxLblUsername.isVisible = false;
          this.view.forceLayout();
          value.skin = "sknAnimate";
        } else if (value.id == "lblPassword" && top == "16%") {
          this.view.tbxPassword.setFocus(true);
          this.view.flxLblPassword.isVisible = false;
          this.view.forceLayout();
          value.skin = "sknAnimate";
        } else {
          value.skin = "sknLblAnimate";
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting focus function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function onDoneCredentials
         * @description Common onDone function for username and password textboxes
         * @private
         * @param {Object} view
         * @event usernameOnDone
         * @event passwordOnDone
         */
    onDoneCredentials: function(view) {

      voltmxL.logger.trace("---------------Entering onDoneCredentials function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        if (view.id == "lblUsername") {
          this.invokeTouch(this.view.lblPassword, "16%");
          if (this.view.tbxUsername.text === "") {
            alert("Username or Password should not be Empty");
            this.invokeTouch(view, "6%");
            this.view.flxLblUsername.isVisible = true;

          }
          if (this.usernameOnDone !== null && this.usernameOnDone !== undefined) {
            voltmxL.logger.info("Invoking usernameOnDone event");
            this.usernameOnDone();
          } else {
            this.validateUsername();
          }
        } else if (view.id == "lblPassword") {
          if (this.view.tbxPassword.text === "") {
            alert("Username or Password should not be Empty");
            this.invokeTouch(view, "23%");
            this.view.flxLblPassword.isVisible = true;
          }
          if (this.passwordOnDone !== null && this.passwordOnDone !== undefined) {
            voltmxL.logger.info("Invoking passwordOnDone event");
            this.passwordOnDone();
          } else {
            this.validatePassword();
          }
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting onDoneCredentials function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function getUsername
         * @description Returns username entered by the user
         * @public
         * @return {string} username
         */
    getUsername: function() {
      voltmxL.logger.trace("---------------Entering getUsername api---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        return this.view.tbxUsername.text;
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
    },
    /**
         * @function getPassword
         * @description Returns password entered by the user
         * @public
         * @return {string} password
         */
    getPassword: function() {
      voltmxL.logger.trace("---------------Entering getPassword api---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        return this.view.tbxPassword.text;
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
    },
    /**
         * @function invokeIdentityService
         * @description Invokes identity service provided by the user
         * @public
         * @param {string} providername
         */
    invokeIdentityService: function(providername) {
      voltmxL.logger.trace("---------------Entering invokeIdentityService api---------------", voltmxL.logger.FUNCTION_ENTRY);
      if (!voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        alert("No Internet Connection Available");
        return;
      }
      try {
        var argument = {};
        var authorizationClient = null;
        voltmx.application.showLoadingScreen(null, "Loading...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
        var sdkClient = new voltmx.sdk.getCurrentInstance();
        if (Object.keys(sdkClient).length !== 0) {
          authorizationClient = sdkClient.getIdentityService(providername);
        }
        if (authorizationClient === null || authorizationClient === undefined) {
          voltmx.application.dismissLoadingScreen();
          voltmxL.logger.info("Authorization object null - Connect to MF");
          alert(constants.MF_ALERT_MESSAGE);
          return;
        }
        if (providername === constants.DEFAULT_PROVIDER_NAME || providername ==="EmpDirectryAD") {
          voltmx.store.setItem("inputType", "password");
          argument.userid = this.getUsername();
          argument.password = this.getPassword();
        } else {
          this.view.flxIdentity.isVisible = true;
          this.view.forceLayout();
          argument.browserWidget = this.view.brwsrIdentity;
          voltmx.application.dismissLoadingScreen();
        }
        voltmxL.logger.info("Network call to MF for identity authentication", voltmxL.logger.SERVICE_CALL);
        authorizationClient.login(argument, this.successWrapper.bind(this), this.failureWrapper.bind(this));
      } catch (exception) {
        voltmx.application.dismissLoadingScreen();
        alert("raised" + JSON.stringify(exception));
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting invokeIdentityService api---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function successWrapper
         * @description Success callback for invokeIdentityService
         * @private
         * @param {Object} response
         * @callback invokeIdentityServiceCallback
         * @event loginSuccessEvent
         */
    successWrapper: function(response) {
      voltmxL.logger.trace("---------------Entering successWrapper function---------------", voltmxL.logger.FUNCTION_ENTRY);
      voltmxL.logger.info("Invoke identity service success---" + JSON.stringify(response), voltmxL.logger.SUCCESS_CALLBACK);
      try {
        var inputType = voltmx.store.getItem("inputType");
        voltmx.application.dismissLoadingScreen();
        if (inputType === "social") {
          this.view.flxIdentity.isVisible = false;
          if (this.loginSuccessEvent !== null && this.loginSuccessEvent !== undefined) {
            this.loginSuccessEvent(response);
          }
          else {
            alert(constants.DEFAULT_SUCCESS_MESSAGE);
          }
        }else{
          if (this.remembermeProperty == true) {
            this.rememberMe();
          }
          if (this.touchIDProperty == true && (voltmx.store.getItem("touchID") == false || voltmx.store.getItem("touchID") == null) && this.getTouchSupport()) {
            this.enableTouchID();
          } else if (this.loginSuccessEvent !== null && this.loginSuccessEvent !== undefined) {
            voltmxL.logger.info("Invoking Login Success event");
            this.loginSuccessEvent();
          } else {
            alert(constants.DEFAULT_SUCCESS_MESSAGE);
          }
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting successWrapper function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function failureWrapper
         * @description Failure callback for invokeIdentityService
         * @private
         * @param {Object} response
         * @callback invokeIdentityServiceCallback
         * @event loginFailureEvent
         */
    failureWrapper: function(response) {
      voltmxL.logger.trace("---------------Entering failureWrapper function---------------", voltmxL.logger.FUNCTION_ENTRY);
      voltmxL.logger.info("Invoke identity service failure" + JSON.stringify(response), voltmxL.logger.ERROR_CALLBACK);
      try {
        voltmx.application.dismissLoadingScreen();
        this.view.flxIdentity.isVisible = false;
        if (this.loginFailureEvent !== null && this.loginFailureEvent !== undefined) {
          voltmxL.logger.info("Invoking Login Failure event");
          this.loginFailureEvent();
        } else {
          voltmx.ui.Alert( {
            message: constants.DEFAULT_FAILURE_MESSAGE,

            alertType: constants.ALERT_TYPE_INFO,

          }, {
            "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
          });

        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting failureWrapper function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function getTouchSupport
         * @description Return touch ID support for device
         * @private
         * @return {boolean} true/false
         */
    getTouchSupport: function() {
      voltmxL.logger.trace("---------------Entering getTouchSupport function---------------", voltmxL.logger.FUNCTION_ENTRY);
      return false;
      //       try {
      //         //#ifdef winphone8
      //         alert("Touch ID not supported");
      //         return false;
      //         //#endif
      //         var status = voltmx.localAuthentication.getStatusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);
      //         if (status == 5000)
      //           return true;
      //         return false;
      //       } catch (exception) {

      //         voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      //       }
      //      voltmxL.logger.trace("---------------Exiting getTouchSupport function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function enableTouchID
         * @description Turns on visibility for Touch ID popup
         * @public
         * @param {string} input
         */
    enableTouchID: function(input) {
      voltmxL.logger.trace("---------------Entering enableTouchID api---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        if (this.view.flxTouchId.isVisible == true && voltmx.store.getItem("inputType") === "password") {
          if (this.loginSuccessEvent !== null && this.loginSuccessEvent !== undefined && input !== true) {
            this.view.flxPopups.flxEnableTouchIDPopup.btnCancel.onClick = this.touchCancelAction.bind(this, true);
            this.view.flxPopups.flxEnableTouchIDPopup.btnEnable.onClick = this.touchEnableAction.bind(this, true);
          }
          this.view.flxPopups.isVisible = true;
          this.view.flxEnableTouchIDPopup.isVisible = true;
          this.view.forceLayout();
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting enableTouchID api---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function touchCancelAction
         * @description Action associated with cancel button of Touch ID popup
         * @private
         * @param {boolean} input
         * @event loginSuccessEvent
         */
    touchCancelAction: function(input) {
      voltmxL.logger.trace("---------------Entering touchCancelAction function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        this.view.flxPopups.isVisible = false;
        this.view.flxPopups.flxEnableTouchIDPopup.isVisible = false;
        if (input === true) {
          this.loginSuccessEvent();
        } else {
          alert(constants.DEFAULT_SUCCESS_MESSAGE);
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting touchCancelAction function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function touchEnableAction
         * @description Action associated with enable button of Touch ID popup
         * @private
         * @param {boolean} input
         * @event loginSuccessEvent
         */
    touchEnableAction: function(input) {
      voltmxL.logger.trace("---------------Entering touchEnableAction function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        this.view.flxPopups.isVisible = false;
        this.view.flxPopups.flxEnableTouchIDPopup.isVisible = false;
        voltmx.store.setItem("touchID", true);
        if (input == true) {
          voltmxL.logger.info("Invoking Login success event");
          this.loginSuccessEvent();
        } else {
          alert(constants.DEFAULT_SUCCESS_MESSAGE);
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting touchEnableAction function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function invokeTouchID
         * @description invokes touch ID for the device
         * @private
         */
    invokeTouchID: function() {
      voltmxL.logger.trace("---------------Entering invokeTouchID function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        if (voltmx.store.getItem("touchID") !== true) {
          alert("Login using Username and Password to enable touch ID");
          return;
        }
        if (this.touchIDProperty == false) {
          alert("Enable touch ID");
          return;
        }
        //#ifdef winphone8
        alert("Touch ID not supported");
        return false;
        //#endif
        var status = voltmx.localAuthentication.getStatusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);
        if (status == "5000") {
          //#ifdef android
          this.view.flxTouchIDPopup.isVisible = true;
          this.view.flxPopups.isVisible = true;
          //#endif
          var configMap = {
            "promptMessage": "Swipe your finger"
          };
          voltmx.localAuthentication.authenticate(
            constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID,
            this.touchAuthenticationCallback.bind(this),
            configMap);
        } else {
          alert("Device doesnt support Touch ID");
        }
      } catch (exception) {
        voltmxL.logger.error("Catch  in authenticateThroughTouch : " + JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting invokeTouchID function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function touchAuthenticationCallback
         * @description Callback function for invokeTouch ID
         * @private
         * @param {Object} code
         * @callback invokeTouchIDCallback
         * @event loginSuccessEvent
         */
    touchAuthenticationCallback: function(code) {
      voltmxL.logger.trace("---------------Entering touchAuthenticationCallback function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        if (code == 5000) {
          //#ifdef android
          this.view.flxTouchIDPopup.isVisible = false;
          this.view.flxPopups.isVisible = false;
          //#endif
          if (this.loginSuccessEvent !== null && this.loginSuccessEvent !== undefined) {
            voltmxL.logger.info("Invoking Login Success event");
            this.loginSuccessEvent();
          } else {
            alert(constants.DEFAULT_SUCCESS_MESSAGE);
          }
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting touchAuthenticationCallback function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function cancelTouchID
         * @description Action associated with cancel button of Touch ID popup
         * @private
         */
    cancelTouchID: function() {
      voltmxL.logger.trace("---------------Entering cancelTouchID function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        voltmx.localAuthentication.cancelAuthentication();
        this.view.flxTouchIDPopup.isVisible = false;
        this.view.flxPopups.isVisible = false;
        this.view.forceLayout();
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting cancelTouchID function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function generatePassword
         * @description Generates a random string
         * @private
         * @param {string} length
         * @return {string} retVal
         */
    generatePassword: function(length) {
      voltmxL.logger.trace("---------------Entering generatePassword function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
          retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting generatePassword function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function getrememberKey
         * @description Creates a keyobject from the key that is generated by generatePassword
         * @private
         */
    getrememberKey: function() {
      voltmxL.logger.trace("---------------Entering getrememberKey function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        if (voltmx.store.getItem("key") === null) {
          var encryptDecryptKey = voltmx.crypto.newKey("passphrase", 128, {
            passphrasetext: [this.generatePassword(32)],
            subalgo: "aes",
            passphrasehashalgo: "md5"
          });
          var myUniqueIDKey = voltmx.crypto.saveKey("encryptionKey", encryptDecryptKey);
          voltmx.store.setItem("key", myUniqueIDKey);
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting getrememberKey function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function encryptData
         * @description Encrypts data with keyobject
         * @private
         * @param {string} data
         * @return {string} encrpytedData
         */
    encryptData: function(data) {
      voltmxL.logger.trace("---------------Entering encryptData function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        if (voltmx.store.getItem("key") === null) {
          this.getrememberKey();
        }
        var rememberKey = voltmx.store.getItem("key");
        var myUniqueKey = voltmx.crypto.readKey(rememberKey);
        var properties = {
          padding: "pkcs5",
          mode: "cbc",
          initializationvector: "1234567890123456"
        };
        var encryptedData = voltmx.crypto.encrypt("aes", myUniqueKey, data, properties);
        return (voltmx.convertToBase64(encryptedData));
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting encryptData function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function decryptData
         * @description Decrypts data with keyobject
         * @private
         * @param {string} data
         * @return {string} decryptedData
         */
    decryptData: function(data) {
      voltmxL.logger.trace("---------------Entering decryptData function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        if (voltmx.store.getItem("key") === null) {
          this.getrememberKey();
        }
        var rememberKey = voltmx.store.getItem("key");
        var myUniqueKey = voltmx.crypto.readKey(rememberKey);
        var properties = {
          padding: "pkcs5",
          mode: "cbc",
          initializationvector: "1234567890123456"
        };
        var decryptedData = voltmx.crypto.decrypt("aes", myUniqueKey, voltmx.convertToRawBytes(data), properties);
        return decryptedData;
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting decryptData function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function changeImage
         * @description Invoked when user toggles remember me icon
         * @private
         */
    changeImage: function() {
      voltmxL.logger.trace("---------------Entering changeImage function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        if (this.view.imgRememberme.isVisible == true) {
          this.view.imgRememberme.isVisible = false;
          this.view.imgUnselected.isVisible = true;
        } else {
          this.view.imgRememberme.isVisible = true;
          this.view.imgUnselected.isVisible = false;
        }
        this.view.forceLayout();
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting changeImage function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function getRememberMe
         * @description Checks if any user credentials exist already
         * @private
         */
    getRememberMe: function() {
      voltmxL.logger.trace("---------------Entering getRememberMe function---------------", voltmxL.logger.FUNCTION_ENTRY);
      voltmxL.logger.info("Retrieving Username and password locally", voltmxL.logger.DATA_STORE);
      try {
        var Username = "";
        var Password = "";
        Username = voltmx.store.getItem("loginUsername");
        Password = voltmx.store.getItem("loginPassword");
        if (Username !== null && Password !== null) {
          if (Username !== "" && Password !== "") {
            this.view.lblPassword.top = "16%";
            this.view.lblPassword.skin = "sknAnimate";
            this.view.lblUsername.top = "-1%";
            this.view.lblUsername.skin = "sknAnimate";
            this.view.flxLblUsername.isVisible = false;
            this.view.flxLblPassword.isVisible = false;

          }
          if (this.encryptCredentials) {
            //#ifdef android
            Username = this.decryptData(voltmx.store.getItem("loginUsername"));
            Password = this.decryptData(voltmx.store.getItem("loginPassword"));
            //#endif

            //#ifdef iphone
            Username = this.decryptData(voltmx.store.getItem("loginUsername"));
            Password = this.decryptData(voltmx.store.getItem("loginPassword"));
            //#endif

            //#ifdef winphone8
            Username = voltmx.store.getItem("loginUsername");
            Password = voltmx.store.getItem("loginPassword");
            //#endif
          } else {
            Username = voltmx.store.getItem("loginUsername");
            Password = voltmx.store.getItem("loginPassword");
          }
          this.view.tbxUsername.text = Username;
          this.view.tbxPassword.text = Password;
        } else {
          this.view.flxLblUsername.isVisibile = true;
          this.view.flxLblPassword.isVisible = true;
          this.view.lblPassword.top = "23%";
          this.view.lblPassword.skin = "sknLblAnimate";
          this.view.lblUsername.top = "6%";
          this.view.lblUsername.skin = "sknLblAnimate";
          this.view.tbxUsername.text = "";
          this.view.tbxPassword.text = "";
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting getRememberMe function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function rememberMe
         * @description Stores user credentials by encrypting them
         * @public
         */
    rememberMe: function() {
      voltmxL.logger.trace("---------------Entering rememberMe api---------------", voltmxL.logger.FUNCTION_ENTRY);
      voltmxL.logger.info("Storing Username and password locally", voltmxL.logger.DATA_STORE);
      try {
        if (this.view.imgUnselected.isVisible == true) {
          voltmx.store.setItem("loginUsername", "");
          voltmx.store.setItem("loginPassword", "");
        } else if (voltmx.store.getItem("inputType") === "password" && this.view.imgRememberme.isVisible == true) {
          if (this.encryptCredentials) {
            //#ifdef android
            voltmx.store.setItem("loginUsername", this.encryptData(this.getUsername()));
            voltmx.store.setItem("loginPassword", this.encryptData(this.getPassword()));
            //#endif

            //#ifdef iphone
            voltmx.store.setItem("loginUsername", this.encryptData(this.getUsername()));
            voltmx.store.setItem("loginPassword", this.encryptData(this.getPassword()));
            //#endif

            //#ifdef winphone8
            voltmx.store.setItem("loginUsername", this.getUsername());
            voltmx.store.setItem("loginPassword", this.getPassword());
            //#endif
          } else {
            voltmx.store.setItem("loginUsername", this.getUsername());
            voltmx.store.setItem("loginPassword", this.getPassword());
          }
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting rememberMe api---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function invokeButtonClick
         * @description invoked when user clicks on submit button
         * @private
         * @event submitOnClick
         */
    invokeButtonClick: function() {
      voltmxL.logger.trace("---------------Entering invokeButtonClick function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        voltmx.store.setItem("inputType", "password");
        if (this.submitOnClick !== null && this.submitOnClick !== undefined) {
          this.submitOnClick();
        } else {
          if (this.validate()) {
            if (this.providerName !== null || this.providerName !== undefined || this.providerName !== "") {
              voltmxL.logger.info("Invoking identity service of providername - - - " + this.providerName);
              this.invokeIdentityService(this.providerName);
            } else {
              this.invokeIdentityService("userIdentityService");
            }
            //                     } else {
            //                         alert("Please enter valid username and password");
          }
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting invokeButtonClick function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function remembermeSelection
         * @description Event triggered when user sets remember me action event
         * @private
         * @event remembermeOnSelection
         */
    remembermeSelection: function() {
      voltmxL.logger.trace("---------------Entering remembermeSelection function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        this.changeImage();
        if (this.remembermeOnSelection !== null && this.remembermeOnSelection !== undefined) {
          voltmxL.logger.info("Invoking rememberOnSelection event");
          this.remembermeOnSelection();
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting remembermeSelection function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function validateUsername
         * @description Validates username entered by the user
         * @private
         * @returns {boolean} true/false
         */
    validateUsername: function() {
      voltmxL.logger.trace("---------------Entering validateUsername function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        if (parseInt(this.usernameMinimumChar) > this.getUsername().length) {
          voltmx.ui.Alert( {
            message: this._usernameValidationMsg,
            alertType: constants.ALERT_TYPE_INFO,

          }, {
            "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
          });
          return false;
        }
        return true;
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting validateUsername function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function validatePassword
         * @description Validates password entered by the user
         * @private
         * @returns {boolean} true/false
         */
    validatePassword: function() {
      voltmxL.logger.trace("---------------Entering validatePassword function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        if (parseInt(this.passwordMinimumChar) > this.getPassword().length) {
          voltmx.ui.Alert( {
            message: this._passwordValidationMsg,
            alertType: constants.ALERT_TYPE_INFO,

          }, {
            "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
          });

          return false;
        }
        return true;
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting validatePassword function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function validate
         * @description validates username and password
         * @private
         * @return {boolean} true/false
         */
    validate: function() {
      voltmxL.logger.trace("---------------Entering validate function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        //                 if (this.getUsername() !== "" && this.getUsername() !== null && this.getPassword() !== null && this.getPassword() !== "" && this.validateUsername() !== false && this.validatePassword !== false) {
        //                     return true;
        //                 }
        if(this.getUsername!=="" &&this.getUsername() !== null &&this.validateUsername()){

          if(this.getPassword() !== null && this.getPassword() !== "" && this.validatePassword() !== false){
            return true;
          }
        }
        return false;
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting validate function---------------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function checkTouchIdSupoort
         * @description validates username and password
         * @private
         * @return {boolean} true/false
         */
    checkTouchIdSupoort: function() {
      voltmxL.logger.trace("---------------Entering checkTouchIdSupoort function---------------", voltmxL.logger.FUNCTION_ENTRY);
      try {
        //#ifdef winphone8
        this.touchIDProperty = false;
        this.view.flxOr.isVisible = false;
        //#endif
        //#ifdef android
        var status = voltmx.localAuthentication.getStatusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);
        if (status != "5006" && status != "5008") {
          if (this.touchIDProperty == true) {
            this.touchIDProperty = true;
            this.view.forceLayout();

          } else {
            this.touchIDProperty = false;
            this.view.flxOr.isVisible = false;
            this.view.forceLayout();
          }
        } else {
          this.touchIDProperty = false;
          this.view.flxOr.isVisible = false;
        }
        //#endif
        //#ifdef iphone
        var status = voltmx.localAuthentication.getStatusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);
        if (status != "5006" && status != "5008") {
          if (this.touchIDProperty == true) {
            this.touchIDProperty = true;
          } else {
            this.touchIDProperty = false;
            this.view.flxOr.isVisible = false;
          }
        } else {
          this.touchIDProperty = false;
          this.view.flxOr.isVisible = false;
        }
        //#endif
      } catch (exception) {
        alert(JSON.stringify(exception));
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("---------------Exiting checkTouchIdSupoort function---------------", voltmxL.logger.FUNCTION_ENTRY);
    }
  };
});