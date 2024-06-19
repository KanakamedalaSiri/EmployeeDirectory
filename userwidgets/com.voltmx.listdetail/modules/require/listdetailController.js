define(function() {


  var voltmxLoggerModule = require('com/voltmx/listdetail/voltmxLogger');
  var voltmxL = {};
  voltmxL.logger = new voltmxLoggerModule("List Detail Component");
  return {
    /**
         * @function constructor
         * @private
         * @param {Object} baseConfig
         * @param {Object} layoutConfig
         * @param {Object} pspConfig
         */
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      voltmxL.logger.trace("----------Entering constructor---------", voltmxL.logger.FUNCTION_ENTRY);
      this.SCREEN_DP = "320";
      this.SCREEN_HEIGHT_IN_DP = "548";
      this.startedAnimation = true;
      this.imageOriginalDP = "";
      this.imageAnimatedDP = "";
      this.translationX = "";
      this.translationY = "";
      this.prev = "";
      this._defaultProfile = "";
      this._defaultCover = "";
      this._defaultStatus = "";
      this._searchList = true;
      this._segClickFlag = 0;
      this.globalData = [];
      this.profilePicsBinarydataMap={};
      this.parsedEmployeeList=[];
      voltmxL.logger.trace("----------Exiting constructor ---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function initGettersSetters
         * @private
         */
    initGettersSetters: function() {
      voltmxL.logger.trace("----------Entering initGettersSetters Function---------", voltmxL.logger.FUNCTION_ENTRY);
      defineSetter(this, "searchList", function(value) {
        voltmxL.logger.trace("----------Entering searchList Setter---------", voltmxL.logger.FUNCTION_ENTRY);
        if (value === false) {
          this.view.flxSearch.isVisible = false;
          this.view.flxList.height = "90%";
          this.view.flxHeader.height = "10%";
          this.view.flxFilter.centerY = "50%";
          this.view.flxMenu.centerY = "50%";
          this.view.lblHeader.centerY = "50%";
          this.view.flxList.top = "10%";
          this._searchList = false;
          this.view.forceLayout();
          voltmxL.logger.trace("----------Exiting searchList Setter---------", voltmxL.logger.FUNCTION_EXIT);
        } else {
          this._searchList = true;
        }
      });
      defineSetter(this, "defaultProfile", function(value) {
        voltmxL.logger.trace("----------Entering defaultProfile Setter---------", voltmxL.logger.FUNCTION_ENTRY);
        if (value.search(".png") != -1) {
          this._defaultProfile = value;
        } else {
          this._defaultProfile = value + ".png";
        }
        voltmxL.logger.trace("----------Exiting defaultProfile Setter---------", voltmxL.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "defaultCover", function(value) {
        voltmxL.logger.trace("----------Entering defaultCover Setter---------", voltmxL.logger.FUNCTION_ENTRY);
        if (value.search(".png") != -1) {
          this._defaultCover = value;
        } else {
          this._defaultCover = value + ".png";
        }
        voltmxL.logger.trace("----------Exiting defaultCover Setter---------", voltmxL.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "defaultStatus", function(value) {
        voltmxL.logger.trace("----------Entering defaultStatus Setter---------", voltmxL.logger.FUNCTION_ENTRY);
        this._defaultStatus = value;
        voltmxL.logger.trace("----------Exiting defaultStatus Getter---------", voltmxL.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "hideHeader", function(value) {
        voltmxL.logger.trace("----------Entering hideHeader Setter---------", voltmxL.logger.FUNCTION_ENTRY);
        if (value == false) {
          if (!this._searchList) {
            this.view.flxList.top = "0%";
            this.view.flxList.height = "100%";
            this.view.flxHeader.isVisible = false;
          } else {
            this.view.flxSearch.isVisible = true;
            this.view.flxHeader.height = "10%";
            this.view.flxSearch.height = "50%";
            this.view.flxSearch.centerY = "50%";
            this.view.flxMenu.isVisible = false;
            this.view.flxFilter.isVisible = false;
            this.view.lblHeader.isVisible = false;
            this.view.flxList.top = "10%";
            this.view.flxList.height = "90%";
            this.view.forceLayout();
          }
        }
        voltmxL.logger.trace("----------Exiting hideHeader Getter---------", voltmxL.logger.FUNCTION_EXIT);
      });
    },
    /**
         * @function sortSectionData
         * @description Sorts array data provided (compared with key)
         * @private
         * @param {Object} array 
         * @param {string} key 
         * @return {Object} array
         */
    sortSectionData: function(array, key) {
      try {
        voltmxL.logger.trace("----------Entering sortSectionData Function---------", voltmxL.logger.FUNCTION_ENTRY);
        return array.sort(function(a, b) {
          var x = a[key];
          var y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting sortSectionData Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function fetchAllDetails
         * @description Service call to fetch All employee details
         * @private
         */
    fetchAllDetails: function() {
      try {

        voltmxL.logger.trace("----------Entering fetchAllDetails Function---------", voltmxL.logger.FUNCTION_ENTRY);
        var objectInstance = null;
        var sdkClient = new voltmx.sdk.getCurrentInstance();
        if (Object.keys(sdkClient).length !== 0) {
          objectInstance = sdkClient.getObjectService("StorageObjectServices", {
            "access": "online"
          });
        }
        if (objectInstance === null || objectInstance === undefined) {
          voltmx.application.dismissLoadingScreen();
          voltmxL.logger.info("Authorization object null - Connect to MF");
          alert("Please connect app to MF");
          return;
        }
        var dataObject = new voltmx.sdk.dto.DataObject("getAllDetails");
        var options = {
          "dataObject": dataObject,
          "headers": {},
          "queryParams": {}
        };
        voltmx.application.showLoadingScreen("", "Fetching Data ...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
        if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
          objectInstance.fetch(options, this.fetchAllDetailsSuccess.bind(this), this.fetchAllDetailsFailure.bind(this));
        } else {
          voltmx.application.dismissLoadingScreen();
          alert("No Network connected");
        }
      } catch (exception) {
        voltmx.application.dismissLoadingScreen();
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting fetchAllDetails Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    fetchAllDetailsSuccess: function(response) {
      try {
        voltmx.print("----------Entering fetchAllDetailsSuccess Function---------");
        if(response!==null && response!==undefined && response.records!==null && response.records!==undefined && response.records[0]!==undefined){
          this.parsedEmployeeList=this.parseRecords(response.records[0]);
          this.department=response.records[0].Department;
          this.departmentList=this.department;
          this.designation=response.records[0].Designation;
          this.locationList=response.records[0].Location;
          this.mediaList=response.records[0].Media;
          this.employeeList=response.records[0].Employee;
          if(this.parsedEmployeeList===undefined||this.parsedEmployeeList===null)return;
          this.populateDataToSegment(this.parsedEmployeeList);
          voltmx.application.dismissLoadingScreen();
          if(this.mediaList.length>0){
            this.getBinarydataFromMediaObjects(this.mediaList);
          }
        }
      } catch (exception) {
        voltmx.application.dismissLoadingScreen();
        voltmx.print(JSON.stringify(exception));
        alert(exception.toString() );
      }
      voltmx.print("----------Exiting fetchAllDetailsSuccess Function---------");
    },
    /**
         * @function fetchAllDetailsSuccess
         * @description Success Callback for fetchAllDetails
         * @private
         * @param {Object} response 
         * @callback fetchAllDetails
         */
    fetchAllDetailsFailure: function(response) {
      try {
        voltmxL.logger.trace("----------Entering fetchAllDetailsFailure Function---------", voltmxL.logger.FUNCTION_ENTRY);
        voltmx.application.dismissLoadingScreen();
        alert("Service call failed" + JSON.stringify(response));
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting fetchAllDetailsFailure Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function fetchImageAndMap
         * @description Fetches image and maps to profile images in segment
         * @private
         * @param {int} id 
         */
    fetchImageAndMap: function(id) {
      try {
        voltmxL.logger.trace("----------Entering fetchImageAndMap Function---------", voltmxL.logger.FUNCTION_ENTRY);
        var integrationObj = new voltmx.sdk.getCurrentInstance().getIntegrationService("fetchImageService");
        var operationName = "getImage";
        var data = {
          "Id": "" + this.profilePics[parseInt(id)].Media_id,
          "fieldName": "Image",
          "type": "bytes"
        };
        var headers = {
          "Content-Type": "application/x-www-urlencoded",
          "X-voltmx-Authorization": voltmx.sdk.getCurrentInstance().currentClaimToken
        };
        integrationObj.invokeOperation(operationName, headers, data, this.fetchImageAndMapSuccess.bind(this), this.fetchImageAndMapFailure.bind(this));
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting fetchImageAndMap Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function fetchImageAndMapSuccess
         * @description Success callback for fetchImageAndMap
         * @private
         * @param {Object} response
         * @callback fetchImageAndMap 
         */
    fetchImageAndMapSuccess: function(response) {
      try {
        voltmxL.logger.trace("----------Entering fetchImageAndMapSuccess Function---------", voltmxL.logger.FUNCTION_ENTRY);
        this.setImageToWidget(this.profilePics[this.currentProfilePicCount].Media_id, response.data);
        this.currentProfilePicCount++;
        if (this.currentProfilePicCount == this.noOfProfilePics) {
          return;
        } else {
          this.fetchImageAndMap(this.currentProfilePicCount);
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting fetchImageAndMapSuccess Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function fetchImageAndMapFailure
         * @description Failure callback for fetchImageAndMap
         * @private
         * @param {Object} response
         * @callback fetchImageAndMap 
         */
    fetchImageAndMapFailure: function(response) {
      try {
        voltmxL.logger.trace("----------Entering fetchImageAndMapFailure Function---------", voltmxL.logger.FUNCTION_ENTRY);
        voltmx.print("Error fetching Images");
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting fetchImageAndMapFailure Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function setImageToWidget
         * @description maps image to segment 
         * @param {int} profilemedia_id 
         * @param {Object} data 
         * @private
         */
    setImageToWidget: function(profile_media_id, data) {
      try {
        voltmxL.logger.trace("----------Entering setImageToWidget Function---------", voltmxL.logger.FUNCTION_ENTRY);
        var segData = this.view.segEmployees.data;
        for (i = 0; i < segData.length; i++) {
          if (segData[i].profile_media_id == profile_media_id && segData[i].profile_media_id != "") {
            segData[i].image = {};
            segData[i].image.base64 = data;
            break;
          }
        }
        this.globalData = segData;
        this.view.segEmployees.setData([]);
        this.view.segEmployees.setData(segData);
        this.view.forceLayout();
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting setImageToWidget Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function scrollSegmentToSelectedAlphabetIndex
         * @description Scrolls segment to selected alphabet
         * @private
         * @param {Object} alphabetClicked 
         */
    scrollSegmentToSelectedAlphabetIndex: function(alphabetClicked) {
      try {
        voltmxL.logger.trace("----------Entering scrollSegmentToSelectedAlphabetIndex Function---------", voltmxL.logger.FUNCTION_ENTRY);
        this.scrollEmployeeDetails(alphabetClicked.id);
        this.changeButtonSkin(null, alphabetClicked);
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting scrollSegmentToSelectedAlphabetIndex Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function changeButtonSkin
         * @description changes button skin on click
         * @private
         * @param {string} key 
         */
    changeButtonSkin: function(key, btnClicked) {
      try {
        voltmxL.logger.trace("----------Entering changeButtonSkin Function---------", voltmxL.logger.FUNCTION_ENTRY);
        var buttons = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (i = 0; i < 26; i++) {
          var character = buttons.charAt(i);
          this.view[character].skin = "voltmxmpsortbuttonskin1";
        }
        if (key != null && key != undefined) {
          this.view[key].skin = "sknAssignBeforeAfter";
          return;
        }
        if (btnClicked != null && btnClicked != undefined) {
          btnClicked.skin = "sknAssignBeforeAfter";
          return;
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting changeButtonSkin Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function getScrolledSection
         * @description gets the current scrolled section of employee listdetail
         * @private
         * @param {string} key 
         */
    getScrolledSection: function() {
      try {
        voltmxL.logger.trace("----------Entering getScrolledSection Function---------", voltmxL.logger.FUNCTION_ENTRY);
        var visibleSection = this.view.segEmployees.getFirstVisibleRow();
        var data = this.view.segEmployees.data;
        if (data !== null && data !== undefined && visibleSection.sectionIndex !== null) {
          if (data[visibleSection.sectionIndex] !== null && data[visibleSection.sectionIndex] !== undefined) {
            this.changeButtonSkin(data[visibleSection.sectionIndex].key, null);
          }
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting getScrolledSection Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function onTouchStartOfTbxSearch
         * @description This function is invoked on click on search text box
         * @private
         */
    onTouchStartOfTbxSearch: function() {
      try {
        voltmxL.logger.trace("----------Entering onTouchStartOfTbxSearch Function---------", voltmxL.logger.FUNCTION_ENTRY);
        this.view.tbxSearch.width = "83%";
        this.view.flxSearchBg.width = "83%";
        this.view.lblSearchPlaceholder.setVisibility(false);
        this.view.lblNoSegmentDataFound.setVisibility(false);
        this.view.imgSearchCenter.setVisibility(false);
        this.view.imgSearchLeft.setVisibility(true);
        this.view.btnSearchCancel.setVisibility(true);
        this.view.forceLayout();
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting onTouchStartOfTbxSearch Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function onClickOfBtnCancelSearch
         * @description This function is invoked on click on cancel button on search text box
         * @private
         */
    onClickOfBtnCancelSearch: function() {
      try {
        voltmxL.logger.trace("----------Entering onClickOfBtnCancelSearch Function---------", voltmxL.logger.FUNCTION_ENTRY);
        this.view.tbxSearch.width = "100%";
        this.view.flxSearchBg.width = "100%";
        this.view.tbxSearch.text = null;
        this.view.lblSearchPlaceholder.setVisibility(true);
        this.view.imgSearchCenter.setVisibility(true);
        this.view.imgSearchLeft.setVisibility(false);
        this.view.btnSearchCancel.setVisibility(false);
        this.view.segEmployees.setVisibility(true);
        this.view.lblNoSegmentDataFound.setVisibility(false);
        this.view.flxDictionary.setVisibility(true);
      //  this.view.btnCancel.isVisible=false;
        /*this.view.segEmployees.widgetDataMap = {
          "empname": "name",
          "designation": "designation",
          "department": "department",
          "empimage": "image",
          "lblInvisible": "key"
        };
        this.view.segEmployees.setData(this.globalData);*/
        this.populateDataToSegment(this.parsedEmployeeList);
        //this.view.segEmployees.setData(this.parsedEmployeeList);
        this.view.forceLayout();
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting onClickOfBtnCancelSearch Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function getSearchResult
         * @description Returns list of matched employees
         * @private
         * @param {Object} mData
         * @param {string} searchValue 
         * @returns {Object} sData
         */
    getSearchResult: function(mData, searchValue) {
      try {
        voltmxL.logger.trace("----------Entering getSearchResult Function---------", voltmxL.logger.FUNCTION_ENTRY);
        var i, j;
        var length = mData.length;
        var sData = [];
        for (var i = 0; i < length; i++) {
          if (mData[i] != null || mData[i] != undefined) {
            var txt1 = "",
                txt2 = "";
            if (mData[i].First_name !== null && mData[i].First_name !== undefined) {
              txt1 = mData[i].First_name.toLocaleLowerCase();
            }
            if (mData[i].Last_name !== null && mData[i].Last_name !== undefined) {
              txt2 = mData[i].Last_name.toLocaleLowerCase();
            }
            var pattern = searchValue.toLocaleLowerCase();
            if (txt1.search(pattern.trim()) !== -1 || txt2.search(pattern.trim()) !== -1) {
              sData.push(mData[i]);
              var dataLength = sData.length - 1;
              sData[dataLength].lblSeperator = {
                skin: "sknLblColor"
              };
            }
          }
        }
        length = sData.length - 1;
        if (length >= 0) {
          sData[length].lblSeperator = {
            skin: "sknLblInvisible"
          };
        }
        return sData;
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting getSearchResult Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function onTextChangeAndDoneOfTbxSearch
         * @description this function is triggered when text is changed or done on click of search box
         * @private
         */
    onTextChangeAndDoneOfTbxSearch: function() {
      try {
        voltmxL.logger.trace("----------Entering onTextChangeAndDoneOfTbxSearch Function---------", voltmxL.logger.FUNCTION_ENTRY);
        var searchText = this.view.tbxSearch.text;
        this.view.imgSearchLeft.isVisible = true;
        if (this.view.tbxSearch.text !== null || this.view.tbxSearch.text.length !== 0) {
          this.view.imgSearchCenter.isVisible = false;
         // this.view.btnCancel.isVisible=true;
          this.view.lblSearchPlaceholder.isVisible = false;
          this.view.forceLayout();
        } 
        
        else {
          this.view.imgSearchCenter.isVisible = true;
          
          this.view.lblSearchPlaceholder.isVisible = true;
          this.view.forceLayout();
        }
        this.view.lblNoSegmentDataFound.isVisible = false;
        this.view.forceLayout();
        if (searchText === "" || searchText.length === 0 || searchText === " ") {
          this.view.lblNoSegmentDataFound.isVisible = false;
          this.populateDataToSegment(this.parsedEmployeeList);
         
          /*this.view.segEmployees.widgetDataMap = {
            "empname": "name",
            "designation": "designation",
            "department": "department",
            "empimage": "image",
            "lblInvisible": "key"
          };
          this.view.segEmployees.setData(this.globalData);*/
        } else {
          var Data = this.getSearchResult(this.parsedEmployeeList,searchText);
          if (Data === null || Data.length === 0) {
            this.view.segEmployees.setVisibility(false);
            this.view.lblNoSegmentDataFound.isVisible = true;
            
            this.view.forceLayout();
          } else {
            this.view.lblNoSegmentDataFound.isVisible = false;
            this.view.forceLayout();
            this.view.segEmployees.removeAll();
            this.view.flxSeg.segEmployees.dockSectionHeaders = false;
            this.view.flxDictionary.setVisibility(false);
            this.view.segEmployees.setVisibility(true);
            /*this.view.segEmployees.widgetDataMap = {
              "empname": "name",
              "designation": "designation",
              "department": "department",
              "empimage": "image",
              "lblInvisible": "key"
            };*/
            this.populateDataToSegment(Data);
            //this.view.segEmployees.setData(Data);
            this.view.forceLayout();
          }
        }
        this.view.forceLayout();
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting onTextChangeAndDoneOfTbxSearch Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function onRowClickOfSegEmployees
         * @description Data is populated on click of employee list
         * @private
         */
    onRowClickOfSegEmployees: function() {
      try {
        voltmxL.logger.trace("----------Entering onRowClickOfSegEmployees Function---------", voltmxL.logger.FUNCTION_ENTRY);
        var selectedRow = this.view.segEmployees.selectedItems[0];
        this.populateEmployeeDetails(selectedRow);
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting onRowClickOfSegEmployees Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function onClickOfEmailFlex
         * @description Opens default email client on click on email icon in details screen
         * @private
         */
    onClickOfEmailFlex: function() {
      try {
        voltmxL.logger.trace("----------Entering onClickOfEmailFlex Function---------", voltmxL.logger.FUNCTION_ENTRY);
        var toRecepient = [this.view.lblEmailValue.text];
        voltmx.phone.openEmail(toRecepient,[""],[""],"","",false,[]);
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting onClickOfEmailFlex Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function onClickOfCallFlex
         * @description Opens default call client on click on call icon in details screen
         * @private
         * @param {string} number
         */
    onClickOfCallFlex: function(number) {
      try {
        voltmxL.logger.trace("----------Entering onClickOfCallFlex Function---------", voltmxL.logger.FUNCTION_ENTRY);
        voltmx.phone.dial(number);
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting onClickOfCallFlex Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function userDetailsInit
         * @description init function for setting positions of widgets in details screen
         * @private
         */
    userDetailsInit: function() {
      try {
        voltmxL.logger.trace("----------Entering userDetailsInit Function---------", voltmxL.logger.FUNCTION_ENTRY);
        this.view.flxEmployeeName.top = '100%';
        this.view.flxEmployeeProfilePic.bottom = '-40%';
        this.view.flxWrapper.top = '120%';
        this.view.FlxBackGround.width = '130%';
        this.view.FlxBackGround.height = '130%';
        this.view.flxScrollDetails.top = '100%';
        this.view.flxScrollDetails.opacity = 0.3;
        this.view.flxShadowLine.isVisible = false;
        this.view.flxEmployeeProfilePic.isVisible = false;
        this.view.flxScrollDetails.isVisible = false;
        this.view.imgCover.src = this._defaultCover;
        if (this.view.segEmployees.selectedItems[0].coverSrc != null && this.view.segEmployees.selectedItems[0].coverSrc != "" && this.view.segEmployees.selectedItems[0].coverSrc != this._defaultCover) {
          this.view.imgCover.src = this.view.segEmployees.selectedItems[0].coverSrc;
        } else {
          if (this.view.segEmployees.selectedItems[0].cover_media_id != "" && this.view.segEmployees.selectedItems[0].cover_media_id != null) {
            this.fetchCoverAndMap(this.view.segEmployees.selectedItems[0].cover_media_id);
          }
        }
        this.view.forceLayout();
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting userDetailsInit Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function fetchCoverAndMap
         * @description Fetches cover image and maps to image widget
         * @param {int} id
         * @private
         */
    fetchCoverAndMap: function(id) {
      try {
        voltmxL.logger.trace("----------Entering fetchCoverAndMap Function---------", voltmxL.logger.FUNCTION_ENTRY);
        var integrationObj = new voltmx.sdk.getCurrentInstance().getIntegrationService("fetchImageService");
        var operationName = "getImage";
        var data = {
          "Id": "" + id,
          "fieldName": "Image",
          "type": "bytes"
        };
        if (voltmx.sdk.getCurrentInstance().currentClaimToken == null) {
          return;
        }
        var headers = {
          "Content-Type": "application/x-www-urlencoded",
          "X-voltmx-Authorization": voltmx.sdk.getCurrentInstance().currentClaimToken
        };
        integrationObj.invokeOperation(operationName, headers, data, this.fetchCoverAndMapSuccess.bind(this), this.fetchCoverAndMapFailure.bind(this));
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting fetchCoverAndMap Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function fetchCoverAndMapSuccess
         * @description Success callback for fetchCoverAndMap
         * @param {Object} response
         * @private
         * @callback fetchCoverAndMap
         */
    fetchCoverAndMapSuccess: function(response) {
      try {
        voltmxL.logger.trace("----------Entering fetchCoverAndMapSuccess Function---------", voltmxL.logger.FUNCTION_ENTRY);
        this.view.imgCover.base64 = response.data;
        this.view.forceLayout();
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting fetchCoverAndMapSuccess Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function fetchCoverAndMapFailure
         * @description Failure callback for fetchCoverAndMap
         * @param {Object} response
         * @private
         * @callback fetchCoverAndMap
         */
    fetchCoverAndMapFailure: function(response) {
      try {
        voltmxL.logger.trace("----------Entering fetchCoverAndMapFailure Function---------", voltmxL.logger.FUNCTION_ENTRY);
        voltmx.print("Unable to fetch cover Image");
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting fetchCoverAndMapFailure Function---------", voltmxL.logger.FUNCTION_EXIT);

    },
    /**
         * @function userDetailsAnim
         * @description This function is responsible for the animation done on click of an employee
         * @private
         */
    userDetailsAnim: function() {
      try {
        voltmxL.logger.trace("----------Entering userDetailsAnim Function---------", voltmxL.logger.FUNCTION_ENTRY);
        this.view.flxEmployeeName.animate(voltmx.ui.createAnimation({
          "0": {
            "top": "100%"
          },
          "100": {
            "top": "64.6%",
            "stepConfig": {
              "timingFunction": voltmx.anim.EASEIN_IN_OUT
            }
          }
        }), {
          "delay": 0,
          "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
          "duration": 0.3
        }, {
          "animationEnd": function() {}
        });
        this.view.flxEmployeeProfilePic.animate(voltmx.ui.createAnimation({
          "0": {
            "bottom": "-40%"
          },
          "100": {
            "bottom": "23.4%",
            "stepConfig": {
              "timingFunction": voltmx.anim.EASEIN_IN_OUT
            }
          }
        }), {
          "delay": 0.25,
          "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
          "duration": 0.3
        }, {
          "animationEnd": function() {}
        });
        this.view.flxWrapper.animate(voltmx.ui.createAnimation({
          "0": {
            "top": "120%",
            "opacity": "0.5"
          },
          "100": {
            "top": "78%",
            "opacity": "1",
            "stepConfig": {
              "timingFunction": voltmx.anim.EASEIN_IN_OUT
            }
          }
        }), {
          "delay": 0.3,
          "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
          "duration": 0.3
        }, {
          "animationEnd": function() {}
        });

        this.view.FlxBackGround.animate(voltmx.ui.createAnimation({
          "0": {
            "width": "130%",
            "height": "130%"
          },
          "100": {
            "width": "100%",
            "height": "100%",
            "stepConfig": {
              "timingFunction": voltmx.anim.EASEIN_IN_OUT
            }
          }
        }), {
          "delay": 0.3,
          "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
          "duration": 0.3
        }, {
          "animationEnd": function() {}
        });
        this.view.flxScrollDetails.animate(voltmx.ui.createAnimation({
          "0": {
            "top": "38%",
            "opacity": "0.3"
          },
          "100": {
            "top": "0%",
            "opacity": "1",
            "stepConfig": {
              "timingFunction": voltmx.anim.EASEIN_IN_OUT
            }
          }
        }), {
          "delay": 0.4,
          "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
          "duration": 0.3
        }, {
          "animationEnd": function() {}
        });
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting userDetailsAnim Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function setGestureForScrollingAnimationInDetailsPage
         * @description sets a gesture recognizer when user tries to swipe in details screen
         * @private
         */
    setGestureForScrollingAnimationInDetailsPage: function() {
      try {
        voltmxL.logger.trace("----------Entering setGestureForScrollingAnimationInDetailsPage Function---------", voltmxL.logger.FUNCTION_ENTRY);
        this.view.flxBody.setGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
          fingers: 1
        }, this.swipeAnimationCallback.bind(this));
        var originalDP = this.generalizeDp(80) + "dp";
        this.imageOriginalDP = originalDP;
        this.imageAnimatedDP = this.generalizeDp(65) + "dp";
        this.view.flxEmployeeProfilePic.height = originalDP;
        this.view.flxEmployeeProfilePic.width = originalDP;
        var equivalentDPFor42 = this.generalizeDp(42) + "dp";
        var equivalentDPFor32 = this.generalizeDp(32) + "dp";
        this.view.flxEmailHolder.width = equivalentDPFor42;
        this.view.flxEmailHolder.height = equivalentDPFor42;
        this.view.flxMapHolder.width = equivalentDPFor42;
        this.view.flxMapHolder.height = equivalentDPFor42;
        this.view.flxSkypeImageHolder.width = equivalentDPFor42;
        this.view.flxSkypeImageHolder.height = equivalentDPFor42;
        this.view.flxMobileImageHolder.width = equivalentDPFor42;
        this.view.flxMobileImageHolder.height = equivalentDPFor42;
        this.view.flxWorkImageHolder.width = equivalentDPFor42;
        this.view.flxWorkImageHolder.height = equivalentDPFor42;
        this.view.flxImageReportingManagerHolder.width = equivalentDPFor32;
        this.view.flxImageReportingManagerHolder.height = equivalentDPFor32;
        this.translationX = -Math.abs((this.generalizeDp(148)));
        this.translationY = -Math.abs((this.generalizeHeightInDp(90)));
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting setGestureForScrollingAnimationInDetailsPage Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function swipeAnimationCallback
         * @description changes button skin on click
         * @private
         * @param {Object} widgetID
         * @param {Object} gestureInfo
         * @callback setGestureForScrollingAnimationInDetailsPage
         */
    swipeAnimationCallback: function(widgetID, gestureInfo) {
      try {
        voltmxL.logger.trace("----------Entering swipeAnimationCallback Function---------", voltmxL.logger.FUNCTION_ENTRY);
        if (gestureInfo.swipeDirection === 3) {
          if (this.view.flxBody.top == "42.25%") {
            this.startedAnimation = true;
            this.animatePhotoAndNamesInDetailsPage(0.3);
            this.moveAnimation(this.view.flxBody, "23%", 0.3, true);
            this.view.flxHeaderBar.skin = 'voltmxmpsknDarkHeaderBg3';
            this.view.flxHeaderBar.imgBack.src = 'arrow_left_white_icon.png';
            this.view.forceLayout();
          }
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting swipeAnimationCallback Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function animatePhotoAndNamesInDetailsPage
         * @description Animates name and images in details page
         * @private
         * @param {string} time 
         */
    animatePhotoAndNamesInDetailsPage: function(time) {
      try {
        voltmxL.logger.trace("----------Entering animatePhotoAndNamesInDetailsPage Function---------", voltmxL.logger.FUNCTION_ENTRY);
        var context = this;
        this.view.flxEmployeeName.animate(voltmx.ui.createAnimation({
          "100": {
            "top": "20%",
            "height": "35.4%",
            "opacity": 1,
            "stepConfig": {
              "timingFunction": voltmx.anim.EASE_IN_OUT
            }
          }
        }), {
          "delay": 0.05,
          "iterationCount": 1,
          "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
          "duration": time
        }, {
          "animationEnd": function() {}
        });
        this.view.flxWrapper.animate(voltmx.ui.createAnimation({
          "100": {
            "top": "30%",
            "left": "5%",
            "stepConfig": {
              "timingFunction": voltmx.anim.EASE_IN_OUT
            }
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
          "duration": time
        }, {
          "animationEnd": function() {}
        });
        var transformObject = voltmx.ui.makeAffineTransform();
        transformObject.translate(this.translationX, this.translationY);
        transformObject.scale(0.60, 0.60);
        this.view.flxEmployeeProfilePic.animate(voltmx.ui.createAnimation({
          "100": {
            "transform": transformObject,
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
          "duration": time
        }, {
          "animationEnd": function() {}
        });
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting animatePhotoAndNamesInDetailsPage Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function moveAnimation
         * @description Generic function to animate objects 
         * @private
         * @param {Object} object
         * @param {String} top
         * @param {String} time
         * @param {String} isEnable
         */
    moveAnimation: function(object, top, time, isEnable) {
      try {
        voltmxL.logger.trace("----------Entering moveAnimation Function---------", voltmxL.logger.FUNCTION_ENTRY);
        this.isEnable = isEnable;
        object.animate(voltmx.ui.createAnimation({
          "100": {
            "top": top,
            "stepConfig": {
              "timingFunction": voltmx.anim.EASE_OUT
            }
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
          "duration": time
        }, {
          "animationEnd": this.scrollEnable.bind(this)
        });
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting moveAnimation Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function scrollEnable
         * @description Enables scrolling in list screen
         * @private
         */
    scrollEnable: function() {
      try {
        voltmxL.logger.trace("----------Entering scrollEnable Function---------", voltmxL.logger.FUNCTION_ENTRY);
        this.view.flxScrollDetails.enableScrolling = this.isEnable;
        this.view.flxScrollHierarchy.bounces = this.isEnable;
        this.view.flxScrollHierarchy.enableScrolling = this.isEnable;
        this.startedAnimation = !this.isEnable;
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting scrollEnable Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function reanimateTheWidgetsInDetailsPage
         * @description Animates back the widgets in details screen
         * @private
         */
    reanimateTheWidgetsInDetailsPage: function() {
      try {
        voltmxL.logger.trace("----------Entering reanimateTheWidgetsInDetailsPage Function---------", voltmxL.logger.FUNCTION_ENTRY);
        if (this.view.flxBody.top === "23%" && !this.startedAnimation) {
          this.view.forceLayout();
          this.reanimatePhotoAndNamesInDetailsPage(0.3);
          this.moveAnimation(this.view.flxBody, "42.25%", 0.3, false);
          this.view.flxHeaderBar.skin = 'slFbox';
          this.view.flxHeaderBar.imgBack.src = 'arrow_left_white_icon.png';
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting reanimateTheWidgetsInDetailsPage Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function reanimatePhotoAndNamesInDetailsPage
         * @description nimates back the image and profile details in details screen
         * @private
         * @param {string} time
         */
    reanimatePhotoAndNamesInDetailsPage: function(time) {
      try {
        var context = this;
        voltmxL.logger.trace("----------Entering reanimatePhotoAndNamesInDetailsPage Function---------", voltmxL.logger.FUNCTION_ENTRY);
        this.view.flxEmployeeName.animate(voltmx.ui.createAnimation({
          "100": {
            "top": "64.6%",
            "height": "35.4%",
            "opacity": 1,
            "stepConfig": {
              "timingFunction": voltmx.anim.EASE_IN_OUT
            }
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
          "duration": time
        }, {
          "animationEnd": function() {}
        });
        this.view.flxWrapper.animate(voltmx.ui.createAnimation({
          "100": {
            "top": "79%",
            "left": "0%",
            "stepConfig": {
              "timingFunction": voltmx.anim.EASE_IN_OUT
            }
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
          "duration": time
        }, {
          "animationEnd": function() {}
        });
        var transformObject = voltmx.ui.makeAffineTransform();
        transformObject.translate(0, 0);
        transformObject.scale(1, 1);
        this.view.forceLayout();
        this.view.flxEmployeeProfilePic.animate(voltmx.ui.createAnimation({
          "100": {
            "transform": transformObject,
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
          "duration": time
        }, {
          /**
                     * @function
                     *
                     */
          "animationEnd": function() {}
        });
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

    },
    /**
         * @function generalizeDp
         * @description converts provided dp values according to screen size
         * @private
         * @param {string} dpToConvert 
         */
    generalizeDp: function(dpToConvert) {
      try {
        voltmxL.logger.trace("----------Entering generalizeDp Function---------", voltmxL.logger.FUNCTION_ENTRY);
        dpToConvert = parseFloat(dpToConvert);
        if (!isNaN(dpToConvert)) {
          return dpToConvert * (voltmx.os.deviceInfo().screenWidth / this.SCREEN_DP);
        }
        return null;
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting generalizeDp Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function generalizeHeightInDp
         * @description converts provided dp values according to screen size
         * @private
         * @param {string} dpToConvert 
         */
    generalizeHeightInDp: function(dpToConvert) {
      try {
        voltmxL.logger.trace("----------Entering generalizeHeightInDp Function---------", voltmxL.logger.FUNCTION_ENTRY);
        dpToConvert = parseFloat(dpToConvert);
        if (!isNaN(dpToConvert)) {
          return dpToConvert * (voltmx.os.deviceInfo().screenHeight / this.SCREEN_HEIGHT_IN_DP);
        }
        return null;
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting generalizeHeightInDp Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function onTouchScrollStart
         * @description Function is invoked when scrolling starts on dictionary 
         * @private
         * @param {Object} eventobject 
         * @param {String} x
         * @param {string} y
         */
    onTouchScrollStart: function(event, x, y) {
      try {
        voltmxL.logger.trace("----------Entering onTouchScrollStart Function---------", voltmxL.logger.FUNCTION_ENTRY);
        this.view.lblDisplaySelectedIndex.top = y + "dp";
        this.view.lblDisplaySelectedIndex.setVisibility(true);
        this.view.forceLayout();
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting onTouchScrollStart Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function onTouchScrollMove
         * @description Function is invoked when scrolling on dictionary 
         * @private
         * @param {Object} event
         * @param {String} x
         * @param {string} y
         */
    onTouchScrollMove: function(event, x, y) {
      try {
        voltmxL.logger.trace("----------Entering onTouchScrollMove Function---------", voltmxL.logger.FUNCTION_ENTRY);

        this.view.lblDisplaySelectedIndex.isVisible = true;
        //#ifdef android
        this.view.lblDisplaySelectedIndex.isVisible = false;
        //#endif
        if (this.prev.skin != null && this.prev.skin != undefined) {
          this.prev.skin = "voltmxmpsortbuttonskin1";
        }
        this.coordinate = [];
        this.coordinate[0] = [parseInt(JSON.stringify(this.view.flxDictionary.A.frame.y)), "A", this.view.flxDictionary.A];
        this.coordinate[1] = [parseInt(JSON.stringify(this.view.flxDictionary.B.frame.y)), "B", this.view.flxDictionary.B];
        this.coordinate[2] = [parseInt(JSON.stringify(this.view.flxDictionary.C.frame.y)), "C", this.view.flxDictionary.C];
        this.coordinate[3] = [parseInt(JSON.stringify(this.view.flxDictionary.D.frame.y)), "D", this.view.flxDictionary.D];
        this.coordinate[4] = [parseInt(JSON.stringify(this.view.flxDictionary.E.frame.y)), "E", this.view.flxDictionary.E];
        this.coordinate[5] = [parseInt(JSON.stringify(this.view.flxDictionary.F.frame.y)), "F", this.view.flxDictionary.F];
        this.coordinate[6] = [parseInt(JSON.stringify(this.view.flxDictionary.G.frame.y)), "G", this.view.flxDictionary.G];
        this.coordinate[7] = [parseInt(JSON.stringify(this.view.flxDictionary.H.frame.y)), "H", this.view.flxDictionary.H];
        this.coordinate[8] = [parseInt(JSON.stringify(this.view.flxDictionary.I.frame.y)), "I", this.view.flxDictionary.I];
        this.coordinate[9] = [parseInt(JSON.stringify(this.view.flxDictionary.J.frame.y)), "J", this.view.flxDictionary.J];
        this.coordinate[10] = [parseInt(JSON.stringify(this.view.flxDictionary.K.frame.y)), "K", this.view.flxDictionary.K];
        this.coordinate[11] = [parseInt(JSON.stringify(this.view.flxDictionary.L.frame.y)), "L", this.view.flxDictionary.L];
        this.coordinate[12] = [parseInt(JSON.stringify(this.view.flxDictionary.M.frame.y)), "M", this.view.flxDictionary.M];
        this.coordinate[13] = [parseInt(JSON.stringify(this.view.flxDictionary.N.frame.y)), "N", this.view.flxDictionary.N];
        this.coordinate[14] = [parseInt(JSON.stringify(this.view.flxDictionary.O.frame.y)), "O", this.view.flxDictionary.O];
        this.coordinate[15] = [parseInt(JSON.stringify(this.view.flxDictionary.P.frame.y)), "P", this.view.flxDictionary.P];
        this.coordinate[16] = [parseInt(JSON.stringify(this.view.flxDictionary.Q.frame.y)), "Q", this.view.flxDictionary.Q];
        this.coordinate[17] = [parseInt(JSON.stringify(this.view.flxDictionary.R.frame.y)), "R", this.view.flxDictionary.R];
        this.coordinate[18] = [parseInt(JSON.stringify(this.view.flxDictionary.S.frame.y)), "S", this.view.flxDictionary.S];
        this.coordinate[19] = [parseInt(JSON.stringify(this.view.flxDictionary.T.frame.y)), "T", this.view.flxDictionary.T];
        this.coordinate[20] = [parseInt(JSON.stringify(this.view.flxDictionary.U.frame.y)), "U", this.view.flxDictionary.U];
        this.coordinate[21] = [parseInt(JSON.stringify(this.view.flxDictionary.V.frame.y)), "V", this.view.flxDictionary.V];
        this.coordinate[22] = [parseInt(JSON.stringify(this.view.flxDictionary.W.frame.y)), "W", this.view.flxDictionary.W];
        this.coordinate[23] = [parseInt(JSON.stringify(this.view.flxDictionary.X.frame.y)), "X", this.view.flxDictionary.X];
        this.coordinate[24] = [parseInt(JSON.stringify(this.view.flxDictionary.Y.frame.y)), "Y", this.view.flxDictionary.Y];
        this.coordinate[25] = [parseInt(JSON.stringify(this.view.flxDictionary.Z.frame.y)), "Z", this.view.flxDictionary.Z];
        this.topLimit = parseInt(JSON.stringify(this.view.flxTop.frame.y));
        this.bottomLimit = parseInt(JSON.stringify(this.view.flxTop.frame.y));
        if (y >= this.coordinate[0][0] && y <= this.coordinate[25][0]) {
          this.view.lblDisplaySelectedIndex.top = this.topLimit + y + "dp";
        } else if (y >= this.coordinate[25][0]) {
          this.view.lblDisplaySelectedIndex.top = this.bottomLimit + y + "dp";
        } else if (y <= this.coordinate[0][0]) {
          this.view.lblDisplaySelectedIndex.top = this.topLimit + y + "dp";
        }
        var valueObtained = this.getCoordinateIndex(this.coordinate, parseInt(y));
        if (valueObtained >= 0) {
          this.view.lblDisplaySelectedIndex.text = this.coordinate[valueObtained][1];
        } else this.view.lblDisplaySelectedIndex.text = this.coordinate[0][1];
        this.view.flxDictionary[this.view.lblDisplaySelectedIndex.text].skin = "sknAssignBeforeAfter";
        this.prev = this.view.flxDictionary[this.view.lblDisplaySelectedIndex.text];
        this.scrollEmployeeDetails(this.view.flxDictionary[this.view.lblDisplaySelectedIndex.text].text);
        this.view.forceLayout();
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting onTouchScrollMove Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function getCoordinateIndex
         * @description Returns the coordinate index for clicked button
         * @private
         * @param {string} coordinate
         * @param {string} searchElement
         */
    getCoordinateIndex: function(coordinate, searchElement) {
      try {
        voltmxL.logger.trace("----------Entering getCoordinateIndex Function---------", voltmxL.logger.FUNCTION_ENTRY);
        var minIndex = 0;
        var maxIndex = coordinate.length - 1;
        var currentIndex;
        var currentElement;
        var previousElement;
        while (minIndex <= maxIndex) {
          currentIndex = (minIndex + maxIndex) / 2 | 0;
          if (currentIndex > 0) previousElement = coordinate[currentIndex - 1][0];
          else previousElement = coordinate[currentIndex][0];
          currentElement = coordinate[currentIndex][0];
          if (currentElement < searchElement) {
            minIndex = currentIndex + 1;
          } else if (currentElement > searchElement) {
            maxIndex = currentIndex - 1;
          } else {
            voltmx.print("-- end getthis.coordinateIndex --");
            return currentIndex;
          }
        }
        if (currentElement > searchElement && previousElement < searchElement) {
          voltmx.print("-- end getthis.coordinateIndex --");
          return currentIndex - 1;
        } else {
          voltmx.print("-- end getthis.coordinateIndex --");
          return currentIndex;
        }
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting getCoordinateIndex Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function navigateFlex
         * @description This function brings in and out the details screen
         * @private
         * @param {Object} context
         * @param {string} left 
         */
    navigateFlex: function(context, left) {
      try {
        voltmxL.logger.trace("----------Entering navigateFlex Function---------", voltmxL.logger.FUNCTION_ENTRY);
        var self=this;
        //#ifdef iphone
        this.view.tbxSearch.setFocus(false);
        this.view.forceLayout();
        //#endif
        if (left == "0%") {
          this.userDetailsInit();
        }
        this.view.flxDetailsScreen.animate(voltmx.ui.createAnimation({
          "100": {
            "left": left,
            "height": "100%",
            "opacity": 1,
            "stepConfig": {
              "timingFunction": voltmx.anim.EASE_OUT
            }
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
          "duration": 0.5
        }, {
          "animationEnd": function() {
            if (left == "0%") {
              context.animateUserDetails.bind(self)();
            }
          }
        });
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting navigateFlex Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function animateUserDetails
         * @description Animates the user details entered
         * @private
         */
    animateUserDetails: function() {
      try {
        voltmxL.logger.trace("----------Entering animateUserDetails Function---------", voltmxL.logger.FUNCTION_ENTRY);
        var employee=this.getEmployeeById(this.parsedEmployeeList, this.view.segEmployees.selectedItems[0].empID);
        this.view.lblEmployeeName.text = this.view.segEmployees.selectedItems[0].empname;
        this.view.lblEmployeeDesignation.text = this.view.segEmployees.selectedItems[0].designation;
        if(this.view.segEmployees.selectedItems[0].empimage.base64 != null && this.view.segEmployees.selectedItems[0].empimage.base64 !== undefined) {
          this.view.imgEmployee.base64 = this.view.segEmployees.selectedItems[0].empimage.base64;
        }else{
          this.view.imgEmployee.src = this.view.segEmployees.selectedItems[0].empimage.src;
        }
        this.view.lblDepartmentValue.text = this.view.segEmployees.selectedItems[0].department;
        this.view.callMobileFlex.isVisible = false;
        this.view.callWorkFlex.isVisible = false;
        this.view.emailFlex.isVisible = false;
        this.view.flxImageReportingManagerHolder.isVisible = false;
        this.view.reportingToFlex.isVisible = false;
        if(this.view.segEmployees.selectedItems[0].key.isVisible === true) {
          this.view.lblInvisible.skin = this.view.segEmployees.selectedItems[0].key.skin;
          this.view.lblInvisible.isVisible = true;
        }else{
          this.view.lblInvisible.isVisible = false;
        }
        this.view.locationFlex.isVisible = false;

        var contactList=employee.contact;
        if(Array.isArray(contactList)){
          for (var i = 0; i < contactList.length; i++) {
            if (contactList[i].Contact_type_id == "1") {
              if (contactList[i].Value !== null && contactList[i].Value !== "") {
                this.view.lblCallMobileValue.text = contactList[i].Value;
                this.view.callMobileFlex.isVisible = true;
              } else {
                this.view.callMobileFlex.isVisible = false;
              }
            }
            if (contactList[i].Contact_type_id == "2") {
              if (contactList[i].Value !== null && contactList[i].Value !== "") {
                this.view.lblCallWorkValue.text = contactList[i].Value;
                this.view.callWorkFlex.isVisible = true;
              } else {
                this.view.callWorkFlex.isVisible = false;
              }
            }
            if (contactList[i].Contact_type_id == "3") {
              if (contactList[i].Value !== null && contactList[i].Value !== "") {
                this.view.lblEmailValue.text = contactList[i].Value;
                this.view.emailFlex.isVisible = true;
              } else {
                this.view.emailFlex.isVisible = false;
              }
            }
          }
        }

        /*for (var i = 0; i < this.contact.length; i++) {
          if (this.view.segEmployees.selectedItems[0].employee_id == this.contact[i].employee_id) {
            if (this.contact[i].Contact_type_id == "1") {
              if (this.contact[i].Value !== null && this.contact[i].Value !== "") {
                this.view.lblCallMobileValue.text = this.contact[i].Value;
                this.view.callMobileFlex.isVisible = true;
              } else {
                this.view.callMobileFlex.isVisible = false;
              }
            }
            if (this.contact[i].Contact_type_id == "2") {
              if (this.contact[i].Value !== null && this.contact[i].Value !== "") {
                this.view.lblCallWorkValue.text = this.contact[i].Value;
                this.view.callWorkFlex.isVisible = true;
              } else {
                this.view.callWorkFlex.isVisible = false;
              }
            }
            if (this.contact[i].Contact_type_id == "3") {
              if (this.contact[i].Value !== null && this.contact[i].Value !== "") {
                this.view.lblEmailValue.text = this.contact[i].Value;
                this.view.emailFlex.isVisible = true;
              } else {
                this.view.emailFlex.isVisible = false;
              }
            }
            this.view.forceLayout();
          }
        }*/




        //var selectedEmployee = this.view.segEmployees.selectedItems[0];
        var manager_id = employee.Manager_id;
        var manager=this.getEmployeeById(this.parsedEmployeeList,manager_id);
        if(manager!==null && manager!==undefined){
          var manager_name = this.validateText(manager.First_name) + " " + this.validateText(manager.Last_name);
          this.view.lblReportingToValue.text = manager_name;
          this.view.reportingToFlex.isVisible = true;
        }

        /*for (var i = 0; i < this.employee.length; i++) {
          if (this.employee[i].Employee_id === manager_id) {
            var manager_name = this.employee[i].First_name + " " + this.employee[i].Last_name;
            this.view.lblReportingToValue.text = manager_name;
            this.view.reportingToFlex.isVisible = true;
            break;
          }
        }*/
        /*var segData = this.globalData;
        for (var i = 0; i < segData.length; i++) {
          if (segData[i].employee_id == manager_id) {
            this.view.flxImageReportingManagerHolder.isVisible = true;
            if (segData[i].image.base64 != null && segData[i].image.base64 != undefined) {
              this.view.imgReportingTo.base64 = segData[i].image.base64;
            } else if (segData[i].image.src != null && segData[i].image.src != undefined) {
              this.view.imgReportingTo.src = segData[i].image.src;
            }
            if (segData[i].image.src == this._defaultProfile) {
              this.view.flxImageReportingManagerHolder.isVisible = false;
            }
          }
        }*/
        var locationObj=employee.location;
        if(Array.isArray(locationObj)){
          if(locationObj[0]!==undefined){
            this.view.locationFlex.isVisible = true;
            this.view.lblLocationValue.text = this.validateText(locationObj[0].Address1) + 
              " " + this.validateText(locationObj[0].Address2) + 
              "" + this.validateText(locationObj[0].City) +
              " , " + this.validateText(locationObj[0].State) +
              " , " + this.validateText(locationObj[0].Zipcode)+
              " " + this.validateText(locationObj[0].Country);
          }
        }
        /*for (var i = 0; i < this.location.length; i++) {
          if (this.location[i].Location_id == this.view.segEmployees.selectedItems[0].location_id) {
            this.view.locationFlex.isVisible = true;
            this.view.lblLocationValue.text = this.location[i].Address1 + " " + this.location[i].Address2 + " " + this.location[i].City + " " + this.location[i].Country;
          }
        }*/
        this.view.flxEmployeeProfilePic.isVisible = true;
        this.view.flxScrollDetails.isVisible = true;
        if (this.view.flxScrollDetails.callMobileFlex.isVisible) {
          this.view.flxScrollDetails.callMobileFlex.onTouchEnd = this.reanimateTheWidgetsInDetailsPage.bind(this);
        }
        if (this.view.flxScrollDetails.callWorkFlex.isVisible) {
          this.view.flxScrollDetails.callWorkFlex.onTouchEnd = this.reanimateTheWidgetsInDetailsPage.bind(this);
        }
        if (this.view.flxScrollDetails.emailFlex.isVisible) {
          this.view.flxScrollDetails.emailFlex.onTouchEnd = this.reanimateTheWidgetsInDetailsPage.bind(this);
        }
        if (this.view.flxScrollDetails.departmentFlex.isVisible) {
          this.view.flxScrollDetails.departmentFlex.onTouchEnd = this.reanimateTheWidgetsInDetailsPage.bind(this);
        }
        if (this.view.flxScrollDetails.reportingToFlex.isVisible) {
          this.view.flxScrollDetails.reportingToFlex.onTouchEnd = this.reanimateTheWidgetsInDetailsPage.bind(this);
        }
        if (this.view.flxScrollDetails.locationFlex.isVisible) {
          this.view.flxScrollDetails.locationFlex.onTouchEnd = this.reanimateTheWidgetsInDetailsPage.bind(this);
        }
        this.view.forceLayout();
        this.userDetailsAnim();
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }

      voltmxL.logger.trace("----------Exiting animateUserDetails Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function scrollEmployeeDetails
         * @description Changes the view of selected employees to scrolled employees
         * @private
         * @param {string} key 
         */
    scrollEmployeeDetails: function(key) {
      try {
        voltmxL.logger.trace("----------Entering scrollEmployeeDetails Function---------", voltmxL.logger.FUNCTION_ENTRY);
        var masterData = this.view.segEmployees.data;
        for (var i = 0; i < masterData.length; i++) {
          if (masterData[i].key.text == key) {
            this.view.segEmployees.selectedRowIndex = [0, i];
            break;
          }
        }
        this.view.forceLayout();
      } catch (exception) {
        voltmxL.logger.error(JSON.stringify(exception), voltmxL.logger.EXCEPTION);
      }
      voltmxL.logger.trace("----------Exiting scrollEmployeeDetails Function---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function getData
         * @description returns all the data present in the segment
         * @public
         * @return {object} filterData 
         */
    getData: function() {
      voltmxL.logger.trace("----------Entering getData API---------", voltmxL.logger.FUNCTION_EXIT);
      var dept = [];
      var desgn = [];
      for (var i in this.department) {
        dept.push({
          text: this.department[i].Name,
          src: 'checkboxinactive.png',
          callback: function() {}
        });
      }
      for (var j in this.designation) {
        desgn.push({
          text: this.designation[j].Name,
          src: 'checkboxinactive.png',
          callback: function() {}
        });
      }
      var filterData = [
        ["Department", "", dept],
        ["Designation", "", desgn]
      ];
      return filterData;
      voltmxL.logger.trace("----------Exiting getData API---------", voltmxL.logger.FUNCTION_EXIT);
    },
    /**
         * @function filterAndSetData
         * @description Filters and sets data to segment 
         * @public
         * @param {object} records 
         */
    filterAndSetData: function(records) {

      voltmxL.logger.trace("----------Entering filterAndSetData API---------", voltmxL.logger.FUNCTION_EXIT);
      //var masterData = this.globalData;
      var masterData = this.parsedEmployeeList;
      var designationJSON = [];
      var departmentJSON = [];
      if (records.length == 0) {
        //this.view.segEmployees.setData(this.globalData);
        this.populateDataToSegment(masterData);
        this.view.forceLayout();
        return;
      }
      this.view.segEmployees.setData([]);
      var department = records[0]["Department"];
      var designation = records[1]["Designation"];
//       if(department.length===0 && designation.length===0){
//          this.populateDataToSegment(masterData);
//         this.view.forceLayout();
//         return;
//       }
      
      var tempjson ;
      var dept = 1;
      if(Array.isArray(designation)&& designation.length>0){
        
        for (i = 0; i < masterData.length; i++) {
          if(Array.isArray(masterData[i].designation) && masterData[i].designation[0]!==undefined){
            for (j = 0; j < designation.length; j++) {
              if (designation[j] === masterData[i].designation[0].Name) {
                designationJSON.push(masterData[i]);
                break;
              }
            }
          }
        }
          tempjson = designationJSON;
      }
      else{
        tempjson = masterData;
      }

//       var tempjson = designationJSON;
//       if (designationJSON.length === 0) {
//         tempjson = this.parsedEmployeeList;
//       }
      if(Array.isArray(department) &&department.length>0 ){
        for (i = 0; i < tempjson.length; i++) {
          if(Array.isArray(masterData[i].department) && masterData[i].department[0]!==undefined){
            for (j = 0; j < Object.keys(department).length; j++) {
              if (department[j] == tempjson[i].department[0].Name) {
                departmentJSON.push(tempjson[i]);
                break;
              }
            }
          }
        }
        this.populateDataToSegment(departmentJSON);
      }
      else{
        this.populateDataToSegment(tempjson);
      }
      
       

//       if (departmentJSON.length === 0 && designationJSON.length === 0) {
//         //this.view.segEmployees.setData(this.globalData);
//         this.populateDataToSegment(this.parsedEmployeeList);
//       } else if (departmentJSON.length == 0 && designationJSON.length != 0) {
//         //this.view.segEmployees.setData(designationJSON);
//         this.populateDataToSegment(designationJSON);
//       } else if (departmentJSON.length != 0 && designationJSON.length == 0) {
//         this.view.segEmployees.setData(departmentJSON);
//         this.populateDataToSegment(departmentJSON);
//       } else if (departmentJSON.length != 0 && designationJSON.length != 0) {
//         //this.view.segEmployees.setData(departmentJSON);
//         this.populateDataToSegment(departmentJSON);
//       }
      this.view.forceLayout();
      voltmxL.logger.trace("----------Exiting filterAndSetData API---------", voltmxL.logger.FUNCTION_EXIT);
    },
    parseRecords:function (records){

      var departmentMap=this._parseRecords(records["Department"],"Department_id");
      var designationMap=this._parseRecords(records["Designation"],"Designation_id");
      var contactMap=this._parseRecords(records["Contact"],"employee_id");
      var locationMap=this._parseRecords(records["Location"],"Location_id");
      var profilePicMap={};
      var coverPicMap={};
      this.parseMedia(records["Media"],profilePicMap,coverPicMap);
      var statusMap=this._parseRecords(records["Status"],"Status_id");
      var empList=records["Employee"];
      var empLength=empList.length;
      var employee;
      for(var i=0;i<empLength;i++){
        employee=empList[i];
        employee["department"]=this.checkResult(departmentMap[employee["Department_id"]]);
        employee["designation"]=this.checkResult(designationMap[employee["Designation_id"]]);
        employee["location"]=this.checkResult(locationMap[employee["Location_id"]]);
        employee["status"]=this.checkResult(statusMap[employee["Status_id"]]);
        employee["contact"]=this.checkResult(contactMap[employee["Employee_id"]]);
        //employee["media"]=checkResult(mediaMap[employee["Employee_id"]]);
        employee["profilePic"]=this.checkResult(profilePicMap[employee["Employee_id"]]);
        employee["coverPic"]=this.checkResult(coverPicMap[employee["Employee_id"]]);
      }
      return empList;
    },
    _parseRecords:function(records,key){
      var recordLength=records.length;
      var mappedData={};
      var recordKey;
      for(var i=0;i<recordLength;i++){
        recordKey=records[i][key];
        if(mappedData[recordKey]===null||mappedData[recordKey]===undefined){
          mappedData[recordKey]=[records[i]];
        }else{
          mappedData[recordKey].push(records[i]);
        }
      }
      return mappedData;
    },
    parseMedia:function (mediaList,profilePic,coverPic){
      var mediaListLength=mediaList.length;
      var media;
      for(var i=0;i<mediaListLength;i++){
        media=mediaList[i];
        if(media["Media_type_id"]==="1"){
          //for profile pic
          if(profilePic[media.employee_id]===undefined){
            profilePic[media.employee_id]=[media];
          }else{
            profilePic[media.employee_id].push(media);
          }
        }else if(media["Media_type_id"]==="2"){
          //for cover pic
          if(coverPic[media.employee_id]===undefined){
            coverPic[media.employee_id]=[media];
          }else{
            coverPic[media.employee_id].push(media);
          }
        }
      }
    },
    getBinarydataFromMediaObjects: function(mediaResp){
      const thisobj = this;
      const objSvc = voltmx.sdk.getCurrentInstance().getObjectService("EmployeeModelSchema", {"access":"online"});
      const reqs = [];
      for (let i = 0; i < mediaResp.length; i++) {
        const MediaIdVal = mediaResp[i].Media_id;
        reqs.push(new Promise((resolve, reject) => {
          const dataObject = new voltmx.sdk.dto.DataObject("Media");
          //primary key details to get media object
          dataObject.addField("Media_id", MediaIdVal);
          objSvc.getBinaryContent({"dataObject":dataObject, "binaryAttrName": "Image"},
                                  (bin)=> {
            thisobj.profilePicsBinarydataMap[MediaIdVal] = bin;
            resolve();
          }, (err) => {
            reject(err);
          });
        }));
      }
      Promise.all(reqs).then((values) => {
        thisobj.doneCompletingBinaryDownloads();
      });
    },
    atob: function(bin) {
      //#ifdef spaip
      //#define PLATFORM_SPA
      //#endif
      //#ifdef spaan
      //#define PLATFORM_SPA
      //#endif
      //#ifdef spabb
      //#define PLATFORM_SPA
      //#endif
      //#ifdef spabbnth
      //#define PLATFORM_SPA
      //#endif
      //#ifdef spawinphone8
      //#define PLATFORM_SPA
      //#endif
      //#ifdef spawindows
      //#define PLATFORM_SPA
      //#endif
      //#ifdef spatabwindows
      //#define PLATFORM_SPA
      //#endif
      //#ifdef spaipad
      //#define PLATFORM_SPA
      //#endif
      //#ifdef spatabandroid
      //#define PLATFORM_SPA
      //#endif
      //#ifdef spaplaybook
      //#define PLATFORM_SPA
      //#endif
      //#ifdef desktopweb
      //#define PLATFORM_SPA
      //#endif      
      //#ifdef PLATFORM_SPA
      return window.atob(bin);
      //#else
      return voltmx.convertToRawBytes(bin).readAsText();
      //#endif      
    },
    doneCompletingBinaryDownloads: function(){

      for (var i = 0; i<this.parsedEmployeeList.length;i++){
        this.parsedEmployeeList[i].empimage = {src:globDefaultEmpProfilePic};
        if (this.parsedEmployeeList[i].profilePic.length > 0) {
          const profilepicMediaIdOfEmp = this.parsedEmployeeList[i].profilePic[0].Media_id;
          if (profilepicMediaIdOfEmp !== null && profilepicMediaIdOfEmp != undefined) {
            //             const profilepicBinaryDataOfTheEmployee = this.atob(this.profilePicsBinarydataMap[profilepicMediaIdOfEmp]);
            const profilepicBinaryDataOfTheEmployee = this.profilePicsBinarydataMap[profilepicMediaIdOfEmp];
            if (profilepicBinaryDataOfTheEmployee && profilepicBinaryDataOfTheEmployee.length > 0) {
              this.parsedEmployeeList[i].empimage = {base64:profilepicBinaryDataOfTheEmployee};
            }
          }          
        }
      }
      this.populateDataToSegment(this.parsedEmployeeList);
      return;
    },
    populateDataToSegment:function(employeeList){
      debugger;
      if(Array.isArray(employeeList) &&employeeList.length>0){
        var employeeLength=employeeList.length;
        var segObj={};
        var segList=[];
        var empObj;
        var skin;
        var key;
        for(var i=0;i<employeeLength;i++){
          key={};
          empObj=employeeList[i];
          segObj={};
          segObj["empname"]=this.validateText(empObj["First_name"])+" "+this.validateText(empObj["Last_name"]);
          if(empObj["designation"].length>0){
            segObj["designation"]=this.validateText(empObj["designation"][0]["Name"]);
          }else{
            segObj["designation"]="NA";
          }
          if(empObj["department"].length>0){
            segObj["department"]=this.validateText(empObj["department"][0]["Name"]);
          }else{
            segObj["department"]="NA";
          }
          segObj["empID"]=empObj["Employee_id"];
          if(empObj["empimage"]===undefined){
            segObj["empimage"]={"src":this._defaultProfile};
          }else{
            segObj["empimage"]=empObj["empimage"];
          }
          if(Array.isArray(empObj["status"])){
            if(empObj["status"][0]!==undefined){
              if(empObj["status"][0].Status_id == "1") {
                skin="sknAvailable";
              }else if(empObj["status"][0].Status_id == "2") {
                skin="sknAway";
              }else{
                skin="sknMeeting";
              }
            }else{
              skin="sknAway";
            }
          }else {
            skin="sknAway";
          }
          key= {
            "text": empObj["First_name"].charAt(0),
            "isVisible": this._defaultStatus,
            "skin": skin
          };
          segObj["lblInvisible"]=key;
          segObj["key"]=key;
         // segObj["template"]="segRowTemplate";
          segList.push(segObj);
        }
        segList = this.sortSectionData(segList, "empname");
        this.view.segEmployees.setVisibility(true);
        this.view.segEmployees.widgetDataMap = {
          "empname": "empname",
          "designation": "designation",
          "department": "department",
          "empimage": "empimage",
          "lblInvisible": "key"          
        }
        this.view.segEmployees.removeAll();
       this.view.segEmployees.addAll(segList);
        this.view.lblNoSegmentDataFound.isVisible = false;
                 this.view.forceLayout();
      }
      else{
        this.view.lblNoSegmentDataFound.isVisible = true;

      }
    },
    checkResult:function(result){
      if(result===undefined||result===null){
        return [];
      }else 
        return result;
    },
    validateText:function (data){
      if(data!==undefined&&data!==null){
        return data.trim();
      }else
        return "";
    },
    getEmployeeById:function(employeeList,id){
      var employee={};
      if(id!==null && id!==undefined && Array.isArray(employeeList)){
        var listLength=employeeList.length;
        for(var i=0;i<listLength;i++){
          if(employeeList[i]["Employee_id"]==id){
            employee=employeeList[i];
            break;
          }
        }
      }
      return employee;
    }
  };
});