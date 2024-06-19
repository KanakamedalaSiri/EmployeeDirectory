define({
  selectedDataModel: null,
  operationMode: null,
  recordList: null,
  status: "close",
  selectedRowIndex: null,

  /**
     * @function onFormInit
     * @description - Gets called wjen the form is initialized.
     **/
  onFormInit: function() {
    this.view.segLocationItems.widgetDataMap = {
      "flxHeaderLocation": "flxHeaderLocation",
      "lblId": "lblId",
      "lblLocationValue": "lblLocationValue",
      "flxEdit": "flxEdit",
      "imgEdit": "imgEdit",
      "flxRemove": "flxRemove",
      "imgRemove": "imgRemove",
      "flxImageContainer": "flxImageContainer",
      "imgDropDown": "imgDropDown",
      "flxCity": "flxCity",
      "lblCityValue": "lblCityValue",
      "lblCity": "lblCity",
      "flxLocality": "flxLocality",
      "lblLocalityValue": "lblLocalityValue",
      "lblLocality": "lblLocality",
      "flxAddress": "flxAddress",
      "lblAddressValue": "lblAddressValue",
      "lblAddress": "lblAddress",
      "flxCoutry": "flxCoutry",
      "lblCountryValue": "lblCountryValue",
      "lblCountry": "lblCountry",
      "flxZipcode": "flxZipcode",
      "lblZipCodeValue": "lblZipCodeValue"


    };
  },

  /**
     * @function expandLocationDetail
     * @description - To expand the location row to show more location Info.
     **/
  expandLocationDetail: function(context) {


    if (context !== null && context !== undefined) {
      try {
        var data = context.widgetInfo.selectedItems[0];
        if (data.flxAddress.isVisible === true) {
          data.imgDropDown = "drop_down.png";
          data.flxAddress = {
            "isVisible": false
          };
        } else {
          data.flxAddress = {
            "isVisible": true
          };
          data.imgDropDown = "drop_down_arrow_orange.png";
        }

        this.view.segLocationItems.setDataAt(data, context.rowIndex);
      } catch (excp) {
        voltmx.print(excp);
      }
    }

  },

  /**
     * @function onPostShow
     * @description - To set the horizontal menu image to hamburger menu image widget.
     **/
  onPostShow: function() {
    this.view.empHeader1.imgHamburger.src = "hamburger_menu.png";
    //this.view.leftmenu.DirectoryMenuItemMouseover.onClick=this.navigateToFrmEmpList();
    this.onMasterDataSelected(null);
    this.view.txtBoxSearch.text="";
  },
  /**
     * @function textChange
     * @description - Call back function for the search functionality on text change.
     **/
  textChange: function() {

    var searchKey = this.view.txtBoxSearch.text;
    if (searchKey !== undefined && searchKey !== null) {
      searchKey = searchKey.trim();
      if (searchKey.length > 1) {
        this.searchRecord(searchKey);
      } else if (searchKey.length === 0) {
        this.resetRecords();
      }
    }
  },

  /**
     * @function onNavigate
     * @description - This function sets the visibility off for the profile popup.
     **/

  onNavigate: function() {

    this.view.empHeader1.imgHamburger.src = "hamburger_menu.png";
    this.view.flxProfileMain.setVisibility(false);
    this.requireModule = require("settingsModule");
    this.view.leftmenu.imgSettings.setVisibility(true);
    this.view.flxRoot.scrollDirection = voltmx.flex.SCROLL_HORIZONTAL;
    this.view.flxRoot.horizontalScrollIndicator = true;

  },

  /**
     * @function onBreakpointChange
     * @description - Callback for the breakpoint change of this form for responsive web.
     * @Param{ JSON - eventobject} eventobject from the platform.
     * @Param{ number - breakpoint} breakpoint value for the current view size.
     **/
  onBreakpointChange: function(eventobject, breakpoint) {

    this.view.empHeader1.imgHamburger.src = "hamburger_menu.png";
    if (breakpoint > BREAKPOINT.TABLET) {
      //viewMode Desktop
    this.view.flxMenuContainer.isVisible=true;
        this.view.empHeader1.flxHamburger.isVisible = false;

      this.view.segLocationItems.rowTemplate = "flxTemplateLocDesk";


    } else if (breakpoint >= BREAKPOINT.MOBILE && breakpoint <= BREAKPOINT.TABLET) {
      this.view.flxMenuContainer.isVisible=false;
       this.view.empHeader1.flxHamburger.isVisible = true;
      this.view.flxContentMaster.left="5%";
      this.view.flxContentMaster.width="95%";

      //viewMode Tablet
      this.view.segLocationItems.rowTemplate = "flxLocationTab";


    } else if (breakpoint < BREAKPOINT.MOBILE) {
      //viewMode Mobile
       this.view.flxMenuContainer.isVisible=false;
       this.view.empHeader1.flxHamburger.isVisible = true;
       this.view.flxContentMaster.left="5%";
      this.view.flxContentMaster.width="95%";
      this.view.segLocationItems.rowTemplate = "flxLocation";

    }
    this.onPostShow();

  },

  /**
     * @function textDone
     * @description - This function is called when the user enters the text to search.
     **/
  textDone: function() {

    var searchKey = this.view.txtBoxSearch.text;
    if (searchKey !== undefined && searchKey !== null) {
      searchKey = searchKey.trim();
      if (searchKey.length > 2) {
        this.searchRecord(searchKey);
      } else if (searchKey.length === 0) {
        this.resetRecords();
      }
    }
  },

  /**
     * @function toggleProfile
     * @description - Toggle visibility of the profile popup on click of profile dropdown.
     * @param {JSON} - eventobject for the widget.
     **/
  toggleProfile: function(eventobject) {

    if (eventobject === "userProfile") {
      this.view.flxOverlay.setVisibility(true);
      this.view.flxProfileMain.setVisibility(true);
    }
  },

  /**
     * @function resetRecords
     * @description - Populates the data of the selected item for the listbox dropdown.
     **/
  resetRecords: function() {
    var selectedItem = this.view.lstBoxMaster.selectedKey;
    switch (selectedItem) {
      case "0":
        //search indepartment
        this.setDepartments(this.recordList);
        break;
      case "1":
        //Search in designation.
        this.setDesignations(this.recordList);
        break;
      case "2":
        //Search in location
        this.setLocations(this.recordList);
    }
  },

  /**
     * @function searchRecord
     * @description - Searches the entered string with the search key.
     * @param {JSON}-searchkey obtained on textDone.
     **/
  searchRecord: function(searchKey) {
    var selectedItem = this.view.lstBoxMaster.selectedKey;
    var matchedRecord = searchKeyInCollection(searchKey, this.recordList);
    switch (selectedItem) {
      case "0":
        //search indepartment
        this.setDepartments(matchedRecord);
        break;
      case "1":
        //Search in designation.
        this.setDesignations(matchedRecord);
        break;
      case "2":
        //Search in location
        this.setLocations(matchedRecord);
    }
  },

  /**
     * @function addNewDepartment
     * @description - Adding the new department to the department list
     * @param {JSON} - eventobject for the widget.
     **/
  addNewDepartment: function(eventObject) {
    this.operationMode = "add";
    var id = eventObject.id;
    id = id.split("btnAddNewMaster")[1];
    this.enableCommonMaster(id);
  },

  /**
     * @function addNewDesignation
     * @description - Adding the new designation to the designation list
     * @param {JSON} - eventobject for the widget.
     **/
  addNewDesignation: function(eventObject) {
    this.operationMode = "add";
    id = eventObject.id;
    id = id.split("btnAddNewMaster")[1];
    this.enableCommonMaster(id);
  },

  /**
     * @function addNewLocation
     * @description - Adding the new location to the location list
     * @param {JSON} - eventobject for the widget.
     **/
  addNewLocation: function(eventObject) {
    this.operationMode = "add";
    id = eventObject.id;
    id = id.split("btnAddNewMaster")[1];
    this.showLocationForm();
  },

  /**
     * @function getLocationObject
     * @description - Create a location JSON object. from the provided values by the user.
     **/
  getLocationObject: function() {
    var locationObj = {};
    locationObj["Address1"] = (this.view.txtBoxAddress1.text).trim();
    locationObj["Address2"] = (this.view.txtBoxAddress2.text).trim();
    locationObj["City"] = (this.view.txtBoxEmpCity.text).trim();
    locationObj["Country"] = (this.view.textBoxCountry.text).trim();
    locationObj["State"] = (this.view.txtBoxEmpState.text).trim();
    locationObj["Zipcode"] = (this.view.txtBoxEmpZip.text).trim();
    return locationObj;
  },

  /**
     * @function createUpdateLocationSuccessCB
     * @description - This function is the success callback for create or Update location.
     * @param {JSON} - Result response from backend.
     **/
  createUpdateLocationSuccessCB: function(result) {
    dismissLoadingScreen();
    this.hideLocationEditor();
    if (this.operationMode === "add") {
      this.view.alertmsg.setTitle("User Message");
      this.view.alertmsg.setMessage("Location created successfully!");
      this.view.flxAlertContainer2.setVisibility(true);
      this.view.forceLayout();

    } else if (this.operationMode === "edit") {
      this.view.alertmsg.setTitle("User Message");
      this.view.alertmsg.setMessage("Location updated successfully!");
      this.view.flxAlertContainer2.setVisibility(true);
      this.view.forceLayout();

    }
    this.onMasterDataSelected(null);
  },


  /**
     * @function createUpdateLocationFailureCB
     * @description - This function is the failure callback for create or Update location.
     * @param {JSON} - Result response from backend.
     **/
  createUpdateLocationFailureCB: function(result) {
    dismissLoadingScreen();
    alert(JSON.stringify(result));
  },

  /**
     * @function createUpdateLocation
     * @description - Creating a new location or updating the existing location.
     **/
  createUpdateLocation: function() {
    try {
      if (!this.validateLocationForm()) {
        return;
      }
      var locationObj = this.getLocationObject();
      if (locationObj === undefined || locationObj === null) {
        return;
      }
      var objectInstance = getObjectInstance();
      if (objectInstance !== null) {
        var dataObject;
        dataObject = new voltmx.sdk.dto.DataObject("Location");
        dataObject.setRecord(locationObj);
        var options = {
          "dataObject": dataObject,
          "headers": {}
        };
        if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
          showLoadingScreen(this.view);
          if (this.operationMode === "add") {
            objectInstance.create(options, this.createUpdateLocationSuccessCB.bind(this), this.createUpdateLocationFailureCB.bind(this));
          } else if (this.operationMode === "edit") {
            locationObj["Location_id"] = this.view.lblLocationId.text;
            if (locationObj["Location_id"] !== undefined || locationObj["Location_id"] === null || (locationObj["Location_id"]).trim() !== "") {
              objectInstance.update(options, this.createUpdateLocationSuccessCB.bind(this), this.createUpdateLocationFailureCB.bind(this));
            } else {
              dismissLoadingScreen();
              this.view.alertmsg.setTitle("User Message");
              this.view.alertmsg.setMessage("location id not found");
              this.view.flxAlertContainer2.setVisibility(true);
              this.view.forceLayout();

            }
          }
        } else {
          dismissLoadingScreen();
          this.view.alertmsg.setTitle("User Message");
          this.view.alertmsg.setMessage("No Network connected");
          this.view.flxAlertContainer2.setVisibility(true);
          this.view.forceLayout();

        }
      }
    } catch (excp) {
      dismissLoadingScreen();
      voltmx.print("Exception occured in getDesignation: " + JSON.stringify(excp));
    }
  },

  /**
     * @function validateLocationForm
     * @description - Validate the location values provided in the form.
     **/
  validateLocationForm: function() {
    var isValid = true;
    if (validateText(this.view.txtBoxAddress1.text) === "") {
      isValid = false;
    }
    if (validateText(this.view.txtBoxAddress2.text) === "") {
      isValid = false;
    }
    if (validateText(this.view.txtBoxEmpCity.text) === "") {
      isValid = false;
    }
    if (validateText(this.view.txtBoxEmpZip.text) === "") {
      isValid = false;
    }
    if (validateText(this.view.txtBoxEmpState.text) === "") {
      isValid = false;
    }
    if (validateText(this.view.textBoxCountry.text) === "") {
      isValid = false;
    }
    return isValid;
  },

  /**
     * @function createCommonMasterSuccess
     * @description - This function is the success callback of _createCommonMaster
     * @param {JSON - error} - error response from the back end
     **/
  createCommonMasterSuccess: function(result) {
    dismissLoadingScreen();
    voltmx.print("Master created successfully: " + JSON.stringify(result));
    this.view.txtBoxNameCommon0.text = "";
    this.view.flxAddCommonMasterItem0.setVisibility(false);
    this.onMasterDataSelected(null);
  },

  /**
     * @function createCommonMasterFailure
     * @description - This function is the failure callback of _createCommonMaster
     * @param {JSON - error} - error response from the back end
     **/
  createCommonMasterFailure: function(result) {
    dismissLoadingScreen();
    if(this.selectedDataModel=="Designation"){
      this.view.alertmsg.setTitle("User Message");
      this.view.alertmsg.setMessage("Designation already exists");
      this.view.flxAlertContainer2.setVisibility(true);
      this.view.forceLayout();
    }else if(this.selectedDataModel==="Department"){
      this.view.alertmsg.setTitle("User Message");
      this.view.alertmsg.setMessage("Department already exists");
      this.view.flxAlertContainer2.setVisibility(true);
      this.view.forceLayout();

    }

    //alert(JSON.stringify(result));
  },

  /**
     * @function enableCommonMaster
     * @description - This function is to enable common master
     * this function will call enable error label in UI
     * @param {JSON} - Text box id.
     **/
  enableCommonMaster: function(id) {
    this.view["txtBoxNameCommon" + id].text = "";
    this.view.flxAddCommonMasterItem0.setVisibility(true);
  },

  /**
     * @function _createCommonMaster
     * @description - It creates new designation or department object in the backend.
     * @param {JSON} - id of the text box in the list row.
     **/
  _createCommonMaster: function(id) {
    try {
      var objectInstance = getObjectInstance();
      if (objectInstance !== null) {
        var masterName = this.view["txtBoxNameCommon" + id].text;
        masterName = validateText(masterName);
        if (masterName === "") {
          this.view.alertmsg.setTitle("User Message");
          this.view.alertmsg.setMessage("Please provide valid name");
          this.view.flxAlertContainer2.setVisibility(true);
          this.view.forceLayout();


          return;
        }
        var dataObject;
        if (this.selectedDataModel !== null) {
          dataObject = new voltmx.sdk.dto.DataObject(this.selectedDataModel);
        } else {
          this.view.alertmsg.setTitle("User Message");
          this.view.alertmsg.setMessage("Data model is not selected");
          this.view.flxAlertContainer2.setVisibility(true);
          this.view.forceLayout();
          return;
        }
        dataObject.setRecord({
          "Name": masterName
        })
        var options = {
          "dataObject": dataObject,
          "headers": {}
          //"queryParams": {"$filter":"((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))"}
        };
        if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
          showLoadingScreen(this.view);
          objectInstance.create(options, this.createCommonMasterSuccess.bind(this), this.createCommonMasterFailure.bind(this));
        } else {
          dismissLoadingScreen();
          this.view.alertmsg.setTitle("User Message");
          this.view.alertmsg.setMessage("No Network connected");
          this.view.flxAlertContainer2.setVisibility(true);
          this.view.forceLayout();
        }
      }
    } catch (excp) {
      dismissLoadingScreen();
      voltmx.print("Exception occured in getDesignation: " + JSON.stringify(excp));
    }
  },

  /**
     * @function onMasterDataSelected
     * @description - Selection callback for the option selected from the listbox dropdown.
     * @param {JSON} - Key of the selected item.
     **/
  onMasterDataSelected(param) {

    this.operationMode = "view";
    voltmx.print("in on masterdata selected");
    var selectedItem = this.view.lstBoxMaster.selectedKey;
    switch (selectedItem) {
      case "0":
        this.view.lblMasterTitle.text = "DEPARTMENT";
        this.view.btnAddNewMaster0.text = "Add New Department";
        this.view.btnAddNewMaster0.onClick = this.addNewDepartment;
        this.getDepartment();
        this.view.flxCommonHeader.setVisibility(true);
        this.view.flxLocationHeader.setVisibility(false);
        this.view.flxSCCommon.setVisibility(true);
        this.view.flxLocationDetails.setVisibility(false);
        this.selectedDataModel = "Department";
        break;
      case "1":
        this.view.lblMasterTitle.text = "DESIGNATION";
        this.view.btnAddNewMaster0.text = "Add New Designation";
        this.view.btnAddNewMaster0.onClick = this.addNewDesignation;
        this.getDesignation();
        this.view.flxCommonHeader.setVisibility(true);
        this.view.flxLocationHeader.setVisibility(false);
        this.view.flxSCCommon.setVisibility(true);
        this.view.flxLocationDetails.setVisibility(false);
        this.selectedDataModel = "Designation";
        break;
      case "2":
        this.view.btnAddNewMaster0.text = "Add New Location";
        this.view.btnAddNewMaster0.onClick = this.addNewLocation;
        this.getLocation();
        this.view.flxLocationHeader.setVisibility(true);
        this.view.flxCommonHeader.setVisibility(false);
        this.view.flxLocationDetails.setVisibility(true);
        this.view.flxSCCommon.setVisibility(false);
        this.view.forceLayout();
        this.selectedDataModel = "Location";
    }
  },

  /**
     * @function setDesignations
     * @description - Set the row item Designation to the flexscroll container..
     **/
  setDesignations: function(designations) {
    var masterTemplate;
    var lblName, txtBoxName, flxRemove, flxEdit, lblId, flxSave, separatorLine;
    this.view.flxSCCommon.removeAll();
    var length = designations.length;
    if (length > 9) {
      this.view.flxSCCommon.width = "102%";
    } else {
      this.view.flxSCCommon.width = "101%";
    }
    for (var i = 0; i < designations.length; i++) {
      masterTemplate = this.requireModule.getCommonMasterRowTemplate(i);
      if (masterTemplate === null) continue;
      lblName = masterTemplate["lblName" + i];
      txtBoxName = masterTemplate["txtBoxName" + i];
      flxRemove = masterTemplate["flxRemove" + i];
      flxEdit = masterTemplate["flxEdit" + i];
      lblId = masterTemplate["lblId" + i];
      flxSave = masterTemplate["flxSave" + i];

      lblName.text = designations[i]["Name"];
      txtBoxName.text = designations[i]["Name"];
      lblId.text = designations[i]["Designation_id"];
      flxRemove.onClick = this.removeItem;
      flxEdit.onClick = this.editItem;
      flxSave.onClick = this.saveItem;
      separatorLine = this.requireModule.getHorizontalLine(i);
      this.view.flxSCCommon.add(masterTemplate, separatorLine);
      masterTemplate.hoverSkin = "sknFlxWhiteBG";
    }
    this.view.forceLayout();
  },

  /**
     * @function getDesignationSuccessCB
     * @description - This function is the success callback of getDesignation
     * @param {JSON} - response from the back end
     **/
  getDesignationSuccessCB: function(result) {
    voltmx.print("result: " + result);
    dismissLoadingScreen();
    var designations = result.records;
    this.recordList = designations;
    this.setDesignations(designations);
  },

  /**
     * @function getDesignationFailureCB
     * @description - This function is the failure callback of getDesignation
     * @param {JSON - error} - error response from the back end
     **/
  getDesignationFailureCB: function(result) {
    voltmx.print("result: " + result);
    dismissLoadingScreen();
  },

  /**
     * @function getDesignation
     * @description - Get all designation from the backend.
     **/
  getDesignation: function() {
    voltmx.print("in designation");
    try {
      var objectInstance = getObjectInstance();
      if (objectInstance !== null) {
        var dataObject = new voltmx.sdk.dto.DataObject("Designation");
        var options = {
          "dataObject": dataObject,
          "headers": {},
          "queryParams": {
            "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))"
          }
        };
        if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
          showLoadingScreen(this.view);
          objectInstance.fetch(options, this.getDesignationSuccessCB.bind(this), this.getDesignationFailureCB.bind(this));
        } else {
          dismissLoadingScreen();
          this.view.alertmsg.setTitle("User Message");
          this.view.alertmsg.setMessage("No Network connected");
          this.view.flxAlertContainer2.setVisibility(true);
          this.view.forceLayout();


        }
      }
    } catch (excp) {
      dismissLoadingScreen();
      voltmx.print("Exception occured in getDesignation: " + JSON.stringify(excp));
    }
  },

  /**
     * @function setDepartments
     * @description - Set all the department list to the flex.
     * @param {JSON} - list of departments from form employee list.
     **/
  setDepartments: function(departments) {
    var masterTemplate;
    var lblName, txtBoxName, flxRemove, flxEdit, lblId, flxSave, separatorLine;
    this.view.flxSCCommon.removeAll();
    var length = departments.length;
    if (length > 9) {
      this.view.flxSCCommon.width = "102%";
    } else {
      this.view.flxSCCommon.width = "101%";
    }
    for (var i = 0; i < departments.length; i++) {
      masterTemplate = this.requireModule.getCommonMasterRowTemplate(i);
      if (masterTemplate === null) continue;
      lblName = masterTemplate["lblName" + i];
      txtBoxName = masterTemplate["txtBoxName" + i];
      flxRemove = masterTemplate["flxRemove" + i];
      flxEdit = masterTemplate["flxEdit" + i];
      lblId = masterTemplate["lblId" + i];
      flxSave = masterTemplate["flxSave" + i];

      lblName.text = departments[i]["Name"];
      txtBoxName.text = departments[i]["Name"];
      lblId.text = departments[i]["Department_id"];
      flxRemove.onClick = this.removeItem;
      flxEdit.onClick = this.editItem;
      flxSave.onClick = this.saveItem;

      separatorLine = this.requireModule.getHorizontalLine(i);

      this.view.flxSCCommon.add(masterTemplate, separatorLine);
      this.view.forceLayout();
    }
    this.view.forceLayout();
  },

  /**
     * @function getDepartmentSuccessCB
     * @description - This function is the success callback of getDepartment
     * @param {JSON} -  response from the back end
     **/
  getDepartmentSuccessCB: function(result) {
    voltmx.print("result: " + result);
    dismissLoadingScreen();
    var departments = result.records;
    this.recordList = departments;
    this.setDepartments(departments);
  },

  /**
     * @function getDepartmentFailureCB
     * @description - This function is the failure callback of getDepartment
     * @param {JSON - error} - error response from the back end
     **/
  getDepartmentFailureCB: function(result) {
    voltmx.print("result: " + result);
    dismissLoadingScreen();
  },

  /**
     * @function getDepartment
     * @description - Gets all departments.
     **/

  getDepartment: function() {
    voltmx.print("in department");
    try {
      var objectInstance = getObjectInstance();
      if (objectInstance !== null) {
        var dataObject = new voltmx.sdk.dto.DataObject("Department");
        var options = {
          "dataObject": dataObject,
          "headers": {},
          "queryParams": {
            "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))"
          }
        };
        if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
          showLoadingScreen(this.view);
          objectInstance.fetch(options, this.getDepartmentSuccessCB.bind(this), this.getDepartmentFailureCB.bind(this));
        } else {
          dismissLoadingScreen();
          this.view.alertmsg.setTitle("User Message");
          this.view.alertmsg.setMessage("No Network connected");
          this.view.flxAlertContainer2.setVisibility(true);
          this.view.forceLayout();
        }
      }
    } catch (excp) {
      dismissLoadingScreen();
      voltmx.print("Exception occured in getDepartment: " + JSON.stringify(excp));
    }

  },

  /**
     * @function getLocationFailureCB
     * @description - This function is the failure callback of getLocation
     * @param {JSON - error} - error response from the back end
     **/
  getLocationFailureCB: function(result) {
    voltmx.print("result: " + result);
    dismissLoadingScreen();
  },

  /**
     * @function searchLocation
     * @description - Searches the given location by the user.
     * @param {JSON - error} - error response from the back end
     **/
  searchLocation: function(search_key) {

    var matchedRecord = searchKeyInCollection(search_key, this.recordList);
    this.setLocations(matchedRecord);
    return;
  },

  /**
     * @function setLocations
     * @description - Updates the given location.
     **/
  setLocations: function(locations) {

    var masterTemplate;
    var lblLocation, lblAddressOne, lblAddressTwo, lblCountry, lblCity, lblZip, flxEdit, flxRemove, lblId, separatorLine;
    this.view.flxSCCommon.removeAll();
    var length = locations.length;
    if (length > 9) {
      this.view.flxSCCommon.width = "102%";
    } else {
      this.view.flxSCCommon.width = "101%";
    }
    try {
      var segobj;
      var segList = [];
      for (var i = 0; i < locations.length; i++) {
        segobj = {};



        segobj["lblCity"] = "City";
        segobj["lblLocality"] = "Locality";
        segobj["lblCountry"] = "Country";
        segobj["lblZipCode"] = "Zip Code";
        segobj["lblAddress"] = "Address";
        segobj["lblLocationValue"] = locations[i]["State"];
        segobj["lblAddressValue"] = locations[i]["Address1"];
        segobj["lblLocalityValue"] = locations[i]["Address2"];
        segobj["lblCountryValue"] = locations[i]["Country"];
        segobj["lblCityValue"] = locations[i]["City"];
        segobj["lblZipCodeValue"] = locations[i]["Zipcode"];

        segobj["lblId"] = locations[i]["Location_id"];
        segobj["imgEdit"] = "empediticon.png";
        segobj["imgRemove"] = "empremoveicon.png";
        segobj["imgDropDown"] = "drop_down.png";
        segobj["flxAddress"] = {
          "isVisible": false
        }
        segList.push(segobj);
      }
      this.view.segLocationItems.removeAll();
      this.view.segLocationItems.addAll(segList);
      this.view.forceLayout();
    } catch (excp) {
      alert("Exception occured while populating the location data");


      voltmx.print("Exception occured while populating the location data");
    }

  },

  /**
     * @function getLocationSuccessCB
     * @description - This function is the failure callback of getLocation
     * @param {JSON} -  response result from the back end
     **/
  getLocationSuccessCB: function(result) {
    voltmx.print("result: " + result);
    dismissLoadingScreen();
    var locations = result.records;
    this.recordList = locations;
    this.setLocations(locations);

  },

  /**
     * @function editLocation
     * @description - This function is to edit the locations added by the user.
     * @param {JSON}- eventobject of the widget.
     **/
  editLocation: function(eventObject) {
    if (typeof eventObject === 'object' && typeof eventObject !== null) {
      this.operationMode = "edit";

      var locationObj = {};
      locationObj["id"] = eventObject["lblId"];
      locationObj["address_one"] = eventObject["lblAddressValue"];
      locationObj["address_two"] = eventObject["lblLocalityValue"];
      locationObj["country"] = eventObject["lblCountryValue"];
      locationObj["city"] = eventObject["lblCityValue"];
      locationObj["zip"] = eventObject["lblZipCodeValue"];
      locationObj["state"] = eventObject["lblLocationValue"];
      this.showlocationEditor(locationObj);
    }

  },

  /**
     * @function showlocationEditor
     * @description - Enable the editing screen for location.
     * @param {JSON} - Location Object
     **/
  showlocationEditor: function(locationObj) {
    this.setLocationData(locationObj);
    this.view.flxGreyBG.setVisibility(true);
    this.view.flxEmpLocationInfoContainer.setVisibility(true);
    this.view.forceLayout();
  },

  /**
     * @function setCommonData
     * @description - This function sets the location details given by the user.
     **/
  setLocationData: function(locationObj) {
    this.view.lblLocationId.text = locationObj["id"];
    this.view.txtBoxAddress1.text = locationObj["address_one"];
    this.view.txtBoxAddress2.text = locationObj["address_two"];
    this.view.txtBoxEmpCity.text = locationObj["city"];
    this.view.txtBoxEmpZip.text = locationObj["zip"];
    this.view.txtBoxEmpState.text = locationObj["state"];
    this.view.textBoxCountry.text = locationObj["country"];
  },

  /**
     * @function hideLocationEditor
     * @description - This function enables the location editing functionality of the form.
     **/
  showLocationForm: function() {
    this.resetLocationData();
    this.view.flxGreyBG.setVisibility(true);
    this.view.flxEmpLocationInfoContainer.setVisibility(true);
  },

  /**
     * @function hideLocationEditor
     * @description - This function hides the location editing functionality of the form.
     **/
  hideLocationEditor: function() {
    this.view.flxGreyBG.setVisibility(false);
    this.view.flxEmpLocationInfoContainer.setVisibility(false);
    this.resetLocationData();
  },

  /**
     * @function resetLocationData
     * @description - This function resets the location details from the form.
     **/
  resetLocationData: function() {
    this.view.lblLocationId.text = "";
    this.view.txtBoxAddress1.text = "";
    this.view.txtBoxAddress2.text = "";
    this.view.txtBoxEmpCity.text = "";
    this.view.txtBoxEmpZip.text = "";
    this.view.txtBoxEmpState.text = "";
    this.view.textBoxCountry.text = "";
  },

  /**
     * @function getLocation
     * @description - This function get the location from the backend
     **/
  getLocation: function() {
    voltmx.print("in location");
    try {
      var objectInstance = getObjectInstance();
      if (objectInstance !== null) {
        var dataObject = new voltmx.sdk.dto.DataObject("Location");
        var options = {
          "dataObject": dataObject,
          "headers": {},
          "queryParams": {
            "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))"
          }
        };
        if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
          showLoadingScreen(this.view);
          objectInstance.fetch(options, this.getLocationSuccessCB.bind(this), this.getLocationFailureCB.bind(this));
        } else {
          dismissLoadingScreen();
          this.view.alertmsg.setTitle("User Message");
          this.view.alertmsg.setMessage("No Network connected");
          this.view.flxAlertContainer2.setVisibility(true);
          this.view.forceLayout();


        }
      }
    } catch (excp) {
      dismissLoadingScreen();
      voltmx.print("Exception occured in getLocation: " + JSON.stringify(excp));
    }
  },

  /**
     * @function navigateToFrmEmpList
     * @description - This function is to navigate the user to form employee list
     **/
  navigateToFrmEmpList: function() {
    try {
      var navObj = new voltmx.mvc.Navigation("frmEmpList");
      navObj.navigate();
    } catch (excp) {
      voltmx.print("Exception occured while navigating to the list form: " + JSON.stringify(excp));
    }
  },

  /**
     * @function editItem
     * @description - edit the selected item
     * @param {JSON - eventObject}
     **/
  editItem: function(eventObject) {

    var id = eventObject.id;
    id = id.split("flxEdit")[1];
    var parent = eventObject.parent;
    parent["lblName" + id].setVisibility(false);
    parent["txtBoxName" + id].setVisibility(true);
    parent["flxRemove" + id].setVisibility(false);
    parent["flxEdit" + id].setVisibility(false);
    parent["flxSave" + id].setVisibility(true);
    this.view.forceLayout();
  },
  /**
     * @function saveItem
     * @description - Saves the edited item.
     * @param {JSON} - event object of the selected row.
     **/
  saveItem: function(eventObject) {

    var id = eventObject.id;
    id = id.split("flxSave")[1];
    var parent = eventObject.parent;
    var dataObject = {};
    if (this.selectedDataModel === "Department") {
      dataObject["Department_id"] = parent["lblId" + id].text;
      dataObject["Name"] = parent["txtBoxName" + id].text;
    } else if (this.selectedDataModel === "Designation") {
      dataObject["Designation_id"] = parent["lblId" + id].text;
      dataObject["Name"] = parent["txtBoxName" + id].text;
    }
    this.updateMasterItem(this.selectedDataModel, dataObject, parent, this.updateCommonItemSuccess, this.updateCommonItemFailure);
  },

  /**
     * @function updateCommonItemSuccess
     * @description - This function is the success callback of saveItem
     * @param {JSON} - success response from the back end
     **/
  updateCommonItemSuccess: function(rootFlex, result) {

    var id = rootFlex.id;
    id = id.split("flxCommonItem")[1];
    rootFlex["lblName" + id].text = rootFlex["txtBoxName" + id].text;
    rootFlex["lblName" + id].setVisibility(true);
    rootFlex["txtBoxName" + id].setVisibility(false);
    rootFlex["flxSave" + id].setVisibility(false);
    rootFlex["flxEdit" + id].setVisibility(true);
    rootFlex["flxRemove" + id].setVisibility(true);
    dismissLoadingScreen();
  },

  /**
     * @function updateCommonItemFailure
     * @description - This function is the failure callback of saveItem
     * @param {JSON - error} - error response from the back end
     **/
  updateCommonItemFailure: function(result) {

    this.view.alertmsg.setTitle("User Message");
    this.view.alertmsg.setMessage(result.errmsg);
    this.view.flxAlertContainer2.setVisibility(true);
    this.view.forceLayout();
    dismissLoadingScreen();
  },


  updateMasterItem: function(dataModel, data, rootFlex, successCB, failureCB) {
    if (dataModel && data && rootFlex && successCB && failureCB) {
      try {
        var objectInstance = getObjectInstance();
        if (objectInstance !== null) {
          var dataObject = new voltmx.sdk.dto.DataObject(dataModel);
          dataObject.setRecord(data);
          var options = {
            "dataObject": dataObject,
            "headers": {},
            "queryParams": {}
          };
          if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
            showLoadingScreen(this.view);
            objectInstance.update(options, successCB.bind(this, rootFlex), failureCB.bind(this));
          } else {
            dismissLoadingScreen();
            this.view.alertmsg.setTitle("User Message");
            this.view.alertmsg.setMessage("No Network connected");
            this.view.flxAlertContainer2.setVisibility(true);
            this.view.forceLayout();

          }
        }
      } catch (excp) {
        dismissLoadingScreen();
        voltmx.print("Exception occured in getDepartment: " + JSON.stringify(excp));
      }
    } else {
      this.view.alertmsg.setTitle("User Message");
      this.view.alertmsg.setMessage("Improper data received");
      this.view.flxAlertContainer2.setVisibility(true);
      this.view.forceLayout();


      return;
    }
  },

  /**
     * @function removeItem
     * @description - Gets called when user selects a employee to remove.
     * @param {JSON - error} - error response from the back end
     **/
  removeItem: function(eventObject) {

    var title = "Do you want to remove this " + this.selectedDataModel + " ?";
    var self = this;
    var userConfirmed = function(isConfirmed) {
      if (isConfirmed) {
        var dataObject = {};
        if (self.selectedDataModel === "Location") {
          dataObject["Location_id"] = parent["lblId"];
        }
        var id = eventObject.id;
        id = id.split("flxRemove")[1];
        var parent = eventObject.parent;
        if (self.selectedDataModel === "Department") {
          dataObject["Department_id"] = parent["lblId" + id].text;
        } else if (self.selectedDataModel === "Designation") {
          dataObject["Designation_id"] = parent["lblId" + id].text;
        }
        self.removeMasterItem(self.selectedDataModel, dataObject, parent, self.removeCommonItemSuccess, self.removeCommonItemFailure);
      }
    };
    getUserRemoveConfirmation(title, userConfirmed);
  },

  /**
     * @function removeLocation
     * @description - To remove the selected location.
     */
  removeLocation: function(param) {
    var eventObject = param["rowItem"];
    var rowIndex = param["rowIndex"];
    var title = "Do you want to remove this " + this.selectedDataModel + " ?";
    var self = this;
    this.selectedRowIndex = rowIndex;
    var userConfirmed = function(isConfirmed) {
      if (isConfirmed) {
        var dataObject = {};
        if (self.selectedDataModel === "Department") {
          dataObject["Department_id"] = eventObject["lblId"];
        } else if (self.selectedDataModel === "Designation") {
          dataObject["Designation_id"] = eventObject["lblId"];
        } else if (self.selectedDataModel === "Location") {
          dataObject["Location_id"] = eventObject["lblId"];
        }
        self.removeMasterItem(self.selectedDataModel, dataObject, parent, self.removeCommonItemSuccess, self.removeCommonItemFailure);
      }
    };
    getUserRemoveConfirmation(title, userConfirmed);
  },

  /**
     * @function removeCommonItemSuccess
     * @description - This function is the success callback of removeMasterItem
     * @param {JSON } - success response from the back end
     **/

  removeCommonItemSuccess: function(rootFlex, result) {
    this.view.flxSCCommon.remove(rootFlex);
    this.view.forceLayout();
    if (this.selectedDataModel === "Location") {
      if (this.selectedRowIndex !== null) {
        this.view.segLocationItems.removeAt(this.selectedRowIndex);
      }
    }
    dismissLoadingScreen();
  },

  /**
     * @function removeCommonItemFailure
     * @description - This function is the failure callback of removeMasterItem
     * @param {JSON} - success response from the back end
     **/
  removeCommonItemFailure: function(result) {
    dismissLoadingScreen();
    alert(JSON.stringify(result));
  },

  /**
     * @function removeMasterItem
     * @description - This function removes the item form the backend.
     **/

  removeMasterItem: function(dataModel, data, rootFlex, successCB, failureCB) {
    if (dataModel && data && rootFlex && successCB && failureCB) {

      try {
        var objectInstance = getObjectInstance();
        if (objectInstance !== null) {
          var dataObject = new voltmx.sdk.dto.DataObject(dataModel);
          dataObject.setRecord(data);
          var options = {
            "dataObject": dataObject,
            "headers": {},
            "queryParams": {}
          };
          if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
            showLoadingScreen(this.view);
            objectInstance.deleteRecord(options, successCB.bind(this, rootFlex), failureCB.bind(this));
          } else {
            dismissLoadingScreen();
            this.view.alertmsg.setTitle("User Message");
            this.view.alertmsg.setMessage("No Network connected");
            this.view.flxAlertContainer2.setVisibility(true);
            this.view.forceLayout();


          }
        }
      } catch (excp) {
        dismissLoadingScreen();
        voltmx.print("Exception occured in getDepartment: " + JSON.stringify(excp));
      }
    } else {
      this.view.alertmsg.setTitle("User Message");
      this.view.alertmsg.setMessage("Improper data received");
      this.view.flxAlertContainer2.setVisibility(true);
      this.view.forceLayout();
      return;
    }
  },

  /**
     * @function removeAddedItem
     * @description - This function removes the added item from the list.
     **/

  removeAddedItem: function() {
    this.view.flxAddCommonMasterItem0.setVisibility(false);
  },

  /**
     * @function hideALertComponentCallBack
     * @description - Callback function for "onAlertFlexClick" method of a Alert component.
     **/
  hideALertComponentCallBack: function() {
    this.view.flxAlertContainer2.setVisibility(false);
  },

  /**
     * @function animateLeftMenu
     * @description - To slide the menu.
     **/

  animateLeftMenu: function() {
     this.view.flxMenuContainer.isVisible=true;
    var self = this;
    var animDefinition;
    if (this.status === "open") {
      this.view.flexGreyBg.setVisibility(false);
      animDefinition = {
        100: {
          "left": "-260dp"
        }
      };
    } else {
      self.view.flxMenuContainer.width = "50%";
      this.view.flexGreyBg.setVisibility(true);
      animDefinition = {
        100: {
          "left": "0dp",
        }
      };
    }
    var animDef = voltmx.ui.createAnimation(animDefinition);
    var config = {
      "duration": 0.2,
      "iterationCount": 1,
      "delay": 0.1,
      "fillMode": voltmx.anim.FILL_MODE_FORWARDS
    };
    this.view.leftmenu.animate(animDef, config, {
      "animationEnd": function() {
        voltmx.print("ENTERED ANIMATION CALLBACK");
        if (self.status == "open") {
          voltmx.print("status is now close");
          self.status = "close";
          self.view.empHeader1.imgHamburger.src = "hamburger_menu.png";
          self.view.flxMenuContainer.width = "0%";
        } else {
          self.status = "open";
          voltmx.print("status is now open");
          self.view.empHeader1.imgHamburger.src = "hamburger_menu_on_tap.png";
        }
        self.view.forceLayout();
      }
    });
  },
  animateLeftMenu2: function() {
    if (this.view.empHeader1.imgHamburger.src == "hamburger_menu.png") {
      this.view.empHeader1.imgHamburger.src = "hamburger menu_on_tap.png"
    } else {
      this.view.empHeader1.imgHamburger.src = "hamburger_menu.png"
    }
    var self = this;
    var animDefinition;
    if (status == "open") {

      animDefinition = {

        100: {

          "left": "-260dp"
        }
      };
      status = "close";

    } else {

      animDefinition = {

        100: {

          "left": "0dp",

        }
      };
      status = "open";
    }



    animDef = voltmx.ui.createAnimation(animDefinition);

    var config = {
      "duration": 1,
      "iterationCount": 1,
      "delay": 0.1,
      "fillMode": voltmx.anim.FILL_MODE_FORWARDS
    };
    this.view.leftmenu.animate(animDef, config, null);
  },
});