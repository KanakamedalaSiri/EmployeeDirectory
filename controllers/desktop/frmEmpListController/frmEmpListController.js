define({
  userEmail: null,
  isFilterEnabled: false,
  isProfileEnable: false,
  selectedDepartment: null,
  selectedDesignation: null,
  selecteDepartmentText: "",
  selectedDesignationText: "",
  status: "close",


  employeeList: null,
  departmentList: null,
  designationList: null,
  locationList: null,
  parsedEmployeeList: null,
  mediaList: null,
  profilePicMap: {},
  coverPicMap: {},
  profilePicsBinarydataMap: {},


  /**
     * @function onNavigate
     * @description - This function is the called when we navigate from some other form to frmEmpList.
     **/

  onNavigate: function() {
    this.view.empHeader1.imgHamburger.src = "hamburger_menu.png";
    this.requireModule = require("parsingModule");
    if (this.parsedEmployeeList !== null) {
      return;
    }
    this.view.flxProfileMain.setVisibility(false);
    this.userEmail = voltmx.store.getItem("EMAIL_ID");
    if (isAdmin(this.userEmail) === false) {
      this.view.flxBtnAddNewEmployee.setVisibility(false);
      this.view.leftmenu.SettingsMenu.setEnabled(false);
    } else {
      this.view.flxBtnAddNewEmployee.setVisibility(true);
      this.view.leftmenu.SettingsMenu.setEnabled(true);
    }
    this.view.segEmployeeList.onRowClick = this.onSegRowClickEvent;
    this.view.flxRoot.scrollDirection = voltmx.flex.SCROLL_HORIZONTAL;
    this.view.flxRoot.horizontalScrollIndicator = true;
    this.view.forceLayout();
   

  },


  /**
     * @function : getEmployeeWithEmployeeId
     * @description - This function gets the employee details with employee id.
     *
     */
  getEmployeeWithEmployeeId: function(empId) {
    var searchedEmployee = null
    if (typeof empId === 'string' || typeof empId === 'number') {
      if (Array.isArray(this.parsedEmployeeList)) {
        var employeeLength = this.parsedEmployeeList.length;
        for (var i = 0; i < employeeLength; i++) {
          if (this.parsedEmployeeList[i]["Employee_id"] === empId) {
            searchedEmployee = this.parsedEmployeeList[i];
            break;
          }
        }
      }

    }
    return searchedEmployee;
  },
  
  
 
   
  /**
     * @function toggleFilter
     * @description - This function toggles the visibility of the filter popup.
     * @param {JSON } - event object of the clicked flexcontainer.
     **/
  toggleFilter: function(eventobject) {

    var id = eventobject.id;
    if (id === "Group") {

      this.view.flxOverlay.setVisibility(true);
      this.view.flxFilterMain.setVisibility(true);
      this.view.flxProfileMain.setVisibility(false);

    }
  },

  toggleFilterMob: function(eventobject) {


    this.view.flxOverlay.setVisibility(true);
    this.view.flxFilterMain.setVisibility(true);
    this.view.flxProfileMain.setVisibility(false);


  },
  /**
     * @function addDepartmentTofilter
     * @description - Adding the departments to the segment in filter popup.
     * @param {JSON } - Department list from the employee lists form.
     **/
  addDepartmentTofilter: function(departmentList) {

    var departmentList = this.departmentList;
    var departmentLength = departmentList.length;
    var segObj = {};
    var deptList = [];
    var depObj;
    for (var i = 0; i < departmentLength; i++) {
      depObj = departmentList[i];
      segObj = {};
      if (departmentList[i] !== undefined && departmentList[i] !== null && departmentList[i].Name !== undefined && departmentList[i].Name !== null) {
        segObj["lblDepartment0"] = validateText(depObj["Name"]);
        segObj["imgDepartment0"] = "unselected.png";
        deptList.push(segObj);
      }

    }

    this.view.segDept.removeAll();
    this.view.segDept.addAll(deptList);
  },

  /**
     * @function addDesignationTofilter
     * @description - Adding the designaions to the segment in filter popup.
     * @param {JSON } - Designation list from the employee lists form.
     **/
  addDesignationTofilter: function(designationList) {

    var designationLength = designationList.length;
    var segObj = {};
    var desigList = [];
    var desigObj;
    for (var i = 0; i < designationLength; i++) {
      desigObj = designationList[i];
      segObj = {};
      if (designationList[i] !== undefined && designationList[i] !== null && designationList[i].Name !== undefined && designationList[i].Name !== null) {
        segObj["lblDesignation"] = validateText(desigObj["Name"]);
        segObj["imgDepartment0"] = "unselected.png";
        desigList.push(segObj);

      }

    }

    this.view.segDesignation.removeAll();
    this.view.segDesignation.addAll(desigList);
  },

  /**
     * @function onSegmenFilterClick
     * @description - On click of a particular department or designation in filter.
     * @param {JSON} - event object for the clicked row of a segment
     **/

  onSegmenFilterClick: function(eventobject) {
    let departmentList=[];
    let designationList=[];
    var selectedItemDept = this.view.segDept.selectedRowItems;
    if (selectedItemDept !== null && selectedItemDept !== undefined) {
      for(let i=0; i<selectedItemDept.length; i++){
        if(selectedItemDept[i] && selectedItemDept[i].lblDepartment0){
          departmentList.push(selectedItemDept[i].lblDepartment0);
        }
      }
    } else {
      selectedItemDept = "";
    }
    var selectedItemDesig = this.view.segDesignation.selectedRowItems;

    if (selectedItemDesig !== null && selectedItemDesig !== undefined && selectedItemDesig[0] !== null && selectedItemDesig[0] !== undefined && selectedItemDesig[0].lblDesignation !== null && selectedItemDesig[0].lblDesignation !== undefined) {
      for(let i=0; i< selectedItemDesig.length; i++){
        if(selectedItemDesig[i] && selectedItemDesig[i].lblDesignation){
          designationList.push(selectedItemDesig[i].lblDesignation);
        }
      }
    } else {
      selectedItemDesig = "";
    }
    this.filter(departmentList, designationList);
    if(selectedItemDept === "" && selectedItemDesig === ""){
      this.populateDataToSegment(this.parsedEmployeeList);
    }
  },
  /**
     * @function toggleProfile
     * @description - This function toggles the visibility of the profile popup.
     * @param {JSON } - event object of the clicked flexcontainer.
     **/
  toggleProfile: function(eventobject) {
    if (eventobject === "userProfile") {
      this.view.flxOverlay.setVisibility(true);
      this.view.flxProfileMain.setVisibility(true);
      this.view.flxFilterMain.setVisibility(false);
    }
  },

  /**
     * @function ClearFilter
     * @description - This function resets the data in the filter and reset the employee list.
     **/
  ClearFilter: function() {

    this.view.Filter.skin = "sknFilterNormal";
    this.view.forceLayout();
    this.addDepartmentTofilter(this.departmentList);
    this.addDesignationTofilter(this.designationList);
    this.filter("", "");
    this.populateDataToSegment(this.parsedEmployeeList);


  },

  cancelSearchMob:function(){

    this.populateDataToSegment(this.parsedEmployeeList);
    this.view.empHeader1.btnCancelsearch.setVisibility(false);
    this.view.empHeader1.flxImgSearch.setVisibility(true);
    this.view.empHeader1.btnCancelsearch.zIndex=1;
    this.view.empHeader1.flxImgSearch.zIndex=10;
    this.view.btnFilter.setVisibility(true);
    this.view.txtBxSearch.text="";
    this.view.forceLayout();
    this.view.Filter.skin = "sknFilterNormal";
    this.view.forceLayout();


  },

  /**
     * @function filter
     * @description - Filters the employee's despartment and designation wrt to the selected dept or designation from filter.
     * @param {JSON} - Selected department and Designation on click of particular department.
     **/
  filter: function(selectedDept, selectedDesignation) {
    var designationJSON = [];
    var departmentJSON = [];
    if (selectedDept === "" && selectedDesignation === "") {
      this.view.Filter.skin = "sknFilterNormal";
      this.populateDataToSegment(this.parsedEmployeeList);
      return;
    } else {
      this.view.Filter.skin = "sknFilterActive";
    }


    this.view.forceLayout();
    var filteredEmployee = [];
    var isDepartmentMatched, isDesignationMatched;
    var temp ;

    for (i = 0; i < this.parsedEmployeeList.length; i++) {
      isDepartmentMatched = false;
      isDesignationMatched = false;
      if (selectedDept !== "" && this.parsedEmployeeList[i] !== null && 
          this.parsedEmployeeList[i] !== undefined && this.parsedEmployeeList[i].department[0] !== null && 
          this.parsedEmployeeList[i].department[0] !== undefined && 
          this.parsedEmployeeList[i].department[0].Name !== null && 
          this.parsedEmployeeList[i].department[0].Name !== undefined) {
        if(selectedDept.length!==0){
          for (let j = 0; j < selectedDept.length; j++) {
            if (this.parsedEmployeeList[i].department[0].Name.indexOf(selectedDept[j]) !== -1) {           
              departmentJSON.push(this.parsedEmployeeList[i]);
              break;
            }
            temp = departmentJSON;

          }

        }
        else{

          temp = this.parsedEmployeeList;

        }
      }


      //             if (selectedDesignation !== "" && this.parsedEmployeeList[i] !== null && this.parsedEmployeeList[i] !== undefined && this.parsedEmployeeList[i].designation[0] !== null && this.parsedEmployeeList[i].designation[0] !== undefined && this.parsedEmployeeList[i].designation[0].Name !== null && this.parsedEmployeeList[i].designation[0].Name !== undefined) {
      //               if (this.parsedEmployeeList[i].designation[0].Name.indexOf(selectedDesignation) !== -1) {
      //                 //alert("if des");
      //                 isDesignationMatched = true;
      //                  //designationJSON.push(this.parsedEmployeeList[i]);
      //               }
      //             }
      //             if (isDepartmentMatched || isDesignationMatched) {
      //               filteredEmployee.push(this.parsedEmployeeList[i]);
      //             }

    }

    for (let i = 0; i < temp.length; i++) {
      if(selectedDesignation.length!==0){
        if (selectedDesignation !== "" && temp[i] && temp[i].designation[0]){
          for(let j = 0; j < selectedDesignation.length; j++){
            if (temp[i].designation[0].Name.indexOf(selectedDesignation[j]) !== -1) {
              designationJSON.push(temp[i]);
              break;
            }
            this.populateDataToSegment(designationJSON);
          }
        }

      }

      else{
        this.populateDataToSegment(temp);
       
      }
    }

  },



  /**
     * @function createNewEmployee
     * @description - Creates a employee object in backend using EmployeeModelSchema object service.
     * @param {JSON - error} - error response from the back end
     **/
  createNewEmployee: function() {

    try {
      var param = {
        "departmentList": this.departmentList,
        "designationList": this.designationList,
        "locationList": this.locationList,
        "employeeList": this.employeeList
      };
      globEmpOperatioMode = "add";
      var navObj = new voltmx.mvc.Navigation("frmEmpDetails");
      navObj.navigate(param);

    } catch (excp) {
      alert("Exception occured while navigating to the frmEmpDetails: " + JSON.stringify(excp));

    }
  },

  /**
     * @function searchRowByEmpId
     * @description - Finding the row index of a segment in employee list.
     * @param {JSON } - Selected employee's id.
     **/
  searchRowByEmpId: function(selectedEmpID) {
    var searchedEmpRowIndex;
    for (i = 0; i < this.employeeList.length; i++) {
      if (this.employeeList[i].Employee_id == selectedEmpID)
        searchedEmpRowIndex = i;

    }
    return searchedEmpRowIndex;

  },

  /**
     * @function onSegRowClickEvent
     * @description - Processing the the employee list with selected row of a segment
     * @param {JSON} - Eventobject, sectionnumber and row number of a segment.
     **/
  onSegRowClickEvent: function(eventobject, sectionNumber, rowNumber) {

    var selectedEmpID = eventobject.selectedRowItems[0].empID;
    var searchedEmpRowIndex = this.searchRowByEmpId(selectedEmpID);
    globEmpOperatioMode = "view";
    this.processRowSelection(this.parsedEmployeeList[searchedEmpRowIndex]);
  },

  /**
     * @function fetchAllDetails
     * @description - Fetching all the employee details.
     **/
  fetchAllDetails: function() {

    try {
      voltmx.print("----------Entering fetchAllDetails Function---------");

      this.view.txtBxSearch.text = "";
      var objectInstance = null;
      var sdkClient = new voltmx.sdk.getCurrentInstance();
      if (Object.keys(sdkClient).length !== 0) {
        objectInstance = sdkClient.getObjectService("StorageObjectServices", {
          "access": "online"
        });
      }
      if (objectInstance === null || objectInstance === undefined) {
        dismissLoadingScreen();
        voltmxL.logger.info("Authorization object null - Connect to MF");
        alert("Please connect app to MF");
        return;
      }

      var dataObject = new voltmx.sdk.dto.DataObject("getAllDetails");
      var options = {
        "dataObject": dataObject,
        "headers": {}

      };
      showLoadingScreen(this.view);
      if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        objectInstance.fetch(options, this.fetchAllDetailsSuccess.bind(this), this.fetchAllDetailsFailure.bind(this));
      } else {
        dismissLoadingScreen();
        alert("No Network connected");
      }
    } catch (exception) {
      voltmx.print(JSON.stringify(exception));
    }
    voltmx.print("----------Exiting fetchAllDetails Function---------");
  },

  /**
     * @function populateDataToSegment
     * @description - Adding all the employee details in the employee list form.
     * @param {JSON} - List of employee array.
     **/
  populateDataToSegment: function(employeeList) {
    if (Array.isArray(employeeList)) {

      var employeeLength = employeeList.length;
      var segObj = {};
      var segList = [];
      var empObj;
      for (var i = 0; i < employeeLength; i++) {
        empObj = employeeList[i];
        segObj = {};
        segObj["fullName"] = validateText(empObj["First_name"]) + " " + validateText(empObj["Last_name"]);
        if (empObj["designation"].length > 0) {
          segObj["designation"] = validateText(empObj["designation"][0]["Name"]);
        } else {
          segObj["designation"] = "NA";
        }
        if (empObj["department"].length > 0) {
          segObj["department"] = validateText(empObj["department"][0]["Name"]);
        } else {
          segObj["department"] = "NA";
        }
        segObj["empID"] = empObj["Employee_id"];
        if (empObj["empimage"] === undefined) {
          segObj["empimage"] = {
            "src": "empdefaultimageicon.png"
          };
        } else {
          segObj["empimage"] = empObj["empimage"];
        }
        if (isAdmin(this.userEmail)) {
          segObj["imgEdit"] = {
            "isVisible": true,
            "src": "empediticon.png"
          };
          segObj["imgRemove"] = {
            "isVisible": true,
            "src": "empremoveicon.png"
          };
        } else {
          segObj["imgEdit"] = {
            "isVisible": false,
            "src": "empediticon.png"
          };
          segObj["imgRemove"] = {
            "isVisible": false,
            "src": "empremoveicon.png"
          };
        }
        segObj["flxDepAndId"] = {
          "isVisible": false
        };
        segObj["flxDepIdDesig"] = {
          "isVisible": false
        };
        segObj["imgDropDown"] = {
          "src": "drop_down.png"
        };
        segObj["lblDepartmentText"] = "DEPARTMENT";
        segObj["lblDesignationText"] = "DESIGNATION";
        segObj["lblIdText"] = "EMPLOYEE ID";
        segList.push(segObj);
      }
      this.view.segEmployeeList.widgetDataMap = {
        "department": "department",
        "designation": "designation",
        "empID": "empID",
        "empimage": "empimage",
        "empimagemask": "empimagemask",
        "flxEdit": "flxEdit",
        "flxRemove": "flxRemove",
        "flxTemplateEmpList": "flxTemplateEmpList",
        "fullName": "fullName",
        "imgEdit": "imgEdit",
        "imgRemove": "imgRemove",
        "userIon": "userIon",
        "flxDepAndId": "flxDepAndId",
        "flxDepIdDesig": "flxDepIdDesig",
        "imgDropDown": "imgDropDown",
        "lblDepartmentText": "lblDepartmentText",
        "lblIdText": "lblIdText",
        "lblDesignationText": "lblDesignationText"
      };

      this.view.segEmployeeList.removeAll();
      this.view.segEmployeeList.addAll(segList);

      this.view.forceLayout();
    }
  },
  /**
     * @function fetchAllDetailsSuccess
     * @description Success Callback for fetchAllDetail
     * @param {Object} response
     * @callback fetchAllDetails
     */
  fetchAllDetailsSuccess: function(response) {
    try {
      voltmx.print("----------Entering fetchAllDetailsSuccess Function---------");
      this.parsedEmployeeList = this.requireModule.parseRecords(response.records[0]);
      this.departmentList = response.records[0].Department;
      this.designationList = response.records[0].Designation;
      this.locationList = response.records[0].Location;
      this.mediaList = response.records[0].Media;
      this.employeeList = response.records[0].Employee;
      if (this.parsedEmployeeList === undefined || this.parsedEmployeeList === null) return;
      this.populateDataToSegment(this.parsedEmployeeList);
      dismissLoadingScreen();
      if (this.mediaList.length > 0) {
      }
      this.addDepartmentTofilter(this.departmentList);
      this.addDesignationTofilter(this.designationList);
    } catch (exception) {
      dismissLoadingScreen();
      voltmx.print(JSON.stringify(exception));
      alert(exception.toString());
    }
    voltmx.print("----------Exiting fetchAllDetailsSuccess Function---------");
  },
  /**
     * @function fetchAllDetailsFailure
     * @description Failure Callback for fetchAllDetails
     * @private
     * @param {Object} response
     * @callback fetchAllDetails
     */
  fetchAllDetailsFailure: function(response) {
    var message = response.errmsg;

    try {
      voltmx.print("----------Entering fetchAllDetailsFailure Function---------");
      dismissLoadingScreen();
      this.view.alertmsg.setTitle("Error");
      this.view.alertmsg.setMessage("Service call failed");
      this.view.flxAlertContainer.setVisibility(true);
      this.view.forceLayout();

    } catch (exception) {
      voltmx.print(JSON.stringify(exception));
    }
    voltmx.print("----------Exiting fetchAllDetailsFailure Function---------");
  },

  /**
     * @function getBinarydataFromMediaObjects
     * @description - This function gets the binary data of the media from the media object.
     **/


  getBinarydataFromMediaObjects: function(mediaResp) {
    this.getImageByMediaId(mediaResp, 0, mediaResp.length, this.doneCompletingBinaryDownloads);
  },

  /**
     * @function getImageByMediaId
     * @description - gets image from media object by media id.
     **/
  getImageByMediaId: function(mediaResp, curIndex, TotCount, finalCallback) {
    var thisobj = this;
    var MediaIdVal = mediaResp[curIndex].Media_id;
    var objSvc = getObjectInstance();
    var dataObject = new voltmx.sdk.dto.DataObject("Media");
    //primary key details to get media object
    dataObject.addField("Media_id", MediaIdVal);
    objSvc.getBinaryContent({
      "dataObject": dataObject,
      "binaryAttrName": "Image"
    }, getBinaryContentSuccessCallback, getBinaryContentFailureCallback);

    function getBinaryContentSuccessCallback(bin) {
      voltmx.print("binary content is : " + JSON.stringify(bin));
      thisobj.profilePicsBinarydataMap[MediaIdVal] = bin;
      commonActionForSuccessFailureCallbacks();
    }

    function getBinaryContentFailureCallback(err) {
      voltmx.print("failed to get binary data : " + JSON.stringify(err));
      commonActionForSuccessFailureCallbacks();
    }

    function commonActionForSuccessFailureCallbacks() {
      curIndex++;
      if (curIndex == TotCount) {
        finalCallback();
        return;
      } else {
        thisobj.getImageByMediaId(mediaResp, curIndex, TotCount, finalCallback);
      }
    }
  },
  /**
     * @function doneCompletingBinaryDownloads
     * @description - This function is called when downloading of the image binaries is done.
     **/

  doneCompletingBinaryDownloads: function() {

    var profilePicMap = this.requireModule.profilePicMap;
    for (var i = 0; i < this.parsedEmployeeList.length; i++) {
      if (profilePicMap[this.parsedEmployeeList[i].Employee_id] === undefined || profilePicMap[this.parsedEmployeeList[i].Employee_id] === null || profilePicMap[this.parsedEmployeeList[i].Employee_id][0] === undefined || profilePicMap[this.parsedEmployeeList[i].Employee_id][0] === null) {
        this.parsedEmployeeList[i].empimage = {
          src: globDefaultEmpProfilePic
        };
        continue;
      }
      if (profilePicMap[this.parsedEmployeeList[i].Employee_id][0].Url !== undefined && profilePicMap[this.parsedEmployeeList[i].Employee_id][0].Url !== null && profilePicMap[this.parsedEmployeeList[i].Employee_id][0].Url.length > 0) {
        this.parsedEmployeeList[i].empimage = {
          src: profilePicMap[this.parsedEmployeeList[i].Employee_id][0].Url
        };
      } else if (profilePicMap[this.parsedEmployeeList[i].Employee_id][0].Media_id !== undefined && profilePicMap[this.parsedEmployeeList[i].Employee_id][0].Media_id !== null && profilePicMap[this.parsedEmployeeList[i].Employee_id][0].Media_id.length > 0) {
        var profilepicMediaIdOfEmp = profilePicMap[this.parsedEmployeeList[i].Employee_id][0].Media_id;
        //         var profilepicBinaryDataOfTheEmployee = window.atob(this.profilePicsBinarydataMap[profilepicMediaIdOfEmp]);
        var profilepicBinaryDataOfTheEmployee = this.profilePicsBinarydataMap[profilepicMediaIdOfEmp];
        profilePicMap[this.parsedEmployeeList[i].Employee_id][0].Image = profilepicBinaryDataOfTheEmployee;
        this.parsedEmployeeList[i].empimage = {
          base64: profilepicBinaryDataOfTheEmployee
        };
        if (profilepicBinaryDataOfTheEmployee.length === 0) {
          this.parsedEmployeeList[i].empimage = {
            src: globDefaultEmpProfilePic
          };
        }
      } else {
        this.parsedEmployeeList[i].empimage = {
          src: globDefaultEmpProfilePic
        };
      }
    }
    this.populateDataToSegment(this.parsedEmployeeList);
    this.view.forceLayout();
    return;
  },

  /**
     * @function processRowSelection
     * @description - This function takes the selected employee array and navigates to ffrmEmpDetails.
     **/

  processRowSelection: function(empObj) {

    var param = {};
    param["employee"] = empObj;
    param["departmentList"] = this.departmentList;
    param["designationList"] = this.designationList;
    param["employeeList"] = this.employeeList;
    param["locationList"] = this.locationList;
    try{
      var navObj = new voltmx.mvc.Navigation("frmEmpDetails");
      navObj.navigate(param);
    }catch(e){
      voltmx.print(JSON.stringify(e));
    }
  },

  /**
     * @function processEditIcon
     * @description - This function is called when a employee is selected for edit from frmEmpList.
     * @param {JSON} - Selected employee list
     **/
  processEditIcon: function(selectedEmployeeList) {

    if (Array.isArray(selectedEmployeeList) && selectedEmployeeList.length > 0) {
      var empId = selectedEmployeeList[0]["empID"];
      var employee = this.getEmployeeWithEmployeeId(empId);
      globEmpOperatioMode = "edit";

      this.processRowSelection(employee);
    }
  },

  /**
     * @function processRemoveIcon
     * @description - This function removes the selected employee when on click of remove icon.
     * @param {JSON} - Row of the selected employee.
     **/
  processRemoveIcon: function(selectedRows) {

    var viewcontroller = this;
    var selectedRow = selectedRows[0];
    voltmx.print("In processRemoveIcon:" + JSON.stringify(selectedRow));
    var empFullName = ((selectedRow.fullName !== undefined) && (selectedRow.fullName !== null)) ? selectedRow.fullName : "";
    var empId = selectedRow.empID;
    var msg = "Are you sure you want to remove the employee [" + empFullName + " " + "] with Emp id [" + empId + "]";


    voltmx.ui.Alert({
      message: msg,
      alertType: constants.ALERT_TYPE_CONFIRMATION,
      alertTitle: "Remove an Employee",
      yesLabel: "Remove",
      noLabel: "Cancel",
      alertHandler: processUserConfirmation,
    }, null);

    function processUserConfirmation(isConfirmed) {
      if (isConfirmed) {
        var rowIndex = viewcontroller.searchRowByEmpId(empId);
        var selectedEmployee = viewcontroller.parsedEmployeeList[rowIndex];
        viewcontroller.removeSelectedEmployee(selectedEmployee);
      }
    }
  },

  /**
     * @function removeSelectedEmployee
     * @description - This function removes the selected employee and details on click of remove icon.
     * @param {JSON} - selected employee to delete.
     **/
  removeSelectedEmployee: function(selectedEmployee) {

    voltmx.print("removing the employee " + selectedEmployee.Employee_id);

    //Remove media 
    if (selectedEmployee.profilePic !== undefined && selectedEmployee.profilePic !== null) {
      this.removeMediaRecord(selectedEmployee.profilePic.Media_id);

    }


    //Remove email contact object
    if (selectedEmployee.contact !== undefined && selectedEmployee.contact[2] !== undefined && selectedEmployee.contact[2].Value !== undefined) {

      this.removeContactObject(selectedEmployee.contact[2].Value);
    }

    //Remove work contact object
    if (selectedEmployee.contact !== undefined && selectedEmployee.contact[1] !== undefined && selectedEmployee.contact[1].Value !== undefined) {
      this.removeContactObject(selectedEmployee.contact[1].Value);
    }

    //Remove mobile contact object
    if (selectedEmployee.contact !== undefined && selectedEmployee.contact[0] !== undefined && selectedEmployee.contact[0].Value !== undefined) {
      this.removeContactObject(selectedEmployee.contact[0].Value);
    }
    //Remove employee object
    this.removeEmployeeObject(selectedEmployee.Employee_id);
  },

  /**
     * @function removeBinary
     * @description - Removes the binary for the profile pic of employee from the table.
     * @param {JSON} - error response from the back end
     **/
  removeBinary: function(mediaIdParam) {
    var thiscontroller = this;
    var mediaId = mediaIdParam;
    var objSvc = getObjectInstance();
    var bindataObject = new voltmx.sdk.dto.DataObject("Media");
    bindataObject.addField("Media_id", mediaId);
    objSvc.deleteBinary({
      "dataObject": bindataObject,
      "binaryAttrName": "Image"
    },
                        function(resp) {
      voltmx.print("Binary content removed successfully: " + JSON.stringify(resp));
      thiscontroller.removeMediaRecord(mediaIdParam);
    },
                        function(err) {
      voltmx.print("Failed to remove Binary: " + JSON.stringify(err));
    }
                       );
  },

  /**
     * @function removeMediaRecord
     * @description - Removes the media record.
     **/
  removeMediaRecord: function(mediaIdParam) {
    var objSvc = getObjectInstance();
    var mediaObject = new voltmx.sdk.dto.DataObject("Media");
    mediaObject.addField("Media_id", mediaIdParam);
    objSvc.deleteRecord({
      "dataObject": mediaObject
    },
                        removeMediaObjectSuccessCallback,
                        removeMediaObjectFailureCallback
                       );

    function removeMediaObjectSuccessCallback(resp) {
      voltmx.print("removeMediaObjectSuccessCallback:" + JSON.stringify(resp));
    }

    function removeMediaObjectFailureCallback(err) {
      voltmx.print("removeMediaObjectFailureCallback:" + JSON.stringify(err));
    }

  },

  /**
     * @function removeContactObject
     * @description - Remove the contact object created.
     **/
  removeContactObject: function(contactIdParam) {
    var objSvc = getObjectInstance();
    var dataObject = new voltmx.sdk.dto.DataObject("Contact");
    dataObject.addField("Contact_id", contactIdParam);
    objSvc.deleteRecord({
      "dataObject": dataObject
    },
                        removeContactObjectSuccessCallback,
                        removeContactObjectFailureCallback
                       );

    function removeContactObjectSuccessCallback(resp) {
      voltmx.print("removeContactObjectSuccessCallback:" + JSON.stringify(resp));
    }

    function removeContactObjectFailureCallback(err) {
      voltmx.print("removeContactObjectFailureCallback:" + JSON.stringify(err));
    }
  },

  /**
     * @function removeEmployeeObject
     * @description - Removes the created Employee object.
     **/
  removeEmployeeObject: function(employeeIdParam) {
    thisController = this;
    var objSvc = getObjectInstance();
    var dataObject = new voltmx.sdk.dto.DataObject("Employee");
    dataObject.addField("Employee_id", employeeIdParam);
    objSvc.deleteRecord({
      "dataObject": dataObject
    },
                        removeEmployeeObjectSuccessCallback,
                        removeEmployeeObjectFailureCallback
                       );

    /**
         * @function removeEmployeeObjectSuccessCallback
         * @description - Success callback for  removeEmployeeObject.
         **/
    function removeEmployeeObjectSuccessCallback(resp) {

      thisController.view.segEmployeeList.removeAll();
      thisController.fetchAllDetails();
      voltmx.print("removeEmployeeObjectSuccessCallback:" + JSON.stringify(resp));

      this.view.alertmsg.setTitle("User Message");
      this.view.alertmsg.setMessage("The selected employee has been removed successfully!!");
      this.view.flxAlertContainer.setVisibility(true);
      this.view.forceLayout();


    }

    /**
         * @function removeEmployeeObjectFailureCallback
         * @description - Failure callback for  removeEmployeeObject.
         **/
    function removeEmployeeObjectFailureCallback(err) {
      voltmx.print("removeEmployeeObjectFailureCallback:" + JSON.stringify(err));
    }
  },

  /**
     * @function processSearch
     * @description - Searches the entered string by the user.
     * @param {JSON} - Searched string by the employee.
     **/
  processSearch: function(searchstring) {

    var segData = [];
    searchstring = searchstring.toLowerCase();

    this.view.segEmployeeList.removeAll();
    if (searchstring.length === 0) {
      this.populateDataToSegment(this.employeeList);
      return;
    } else {
      for (var i = 0; i < this.employeeList.length; i++) {

        if (this.employeeList[i].First_name.toLowerCase().indexOf(searchstring) != -1) {
          segData.push(this.employeeList[i]);
          continue;
        }
        if ((this.employeeList[i].Employee_id.toLowerCase().indexOf(searchstring) != -1)) {
          segData.push(this.employeeList[i]);
          continue;
        }
        if (this.employeeList[i].designation[0] !== undefined) {
          if (this.employeeList[i].designation[0].Name !== null && this.employeeList[i].designation[0].Name !== undefined) {
            if (this.employeeList[i].designation[0].Name.toLowerCase().indexOf(searchstring) != -1) {
              segData.push(this.employeeList[i]);
              continue;
            }
          }
        }
        if (this.employeeList[i].department[0] !== undefined) {
          if (this.employeeList[i].department[0].Name !== null && this.employeeList[i].department[0].Name !== undefined) {
            if (this.employeeList[i].department[0].Name.toLowerCase().indexOf(searchstring) != -1) {
              segData.push(this.employeeList[i]);
              continue;
            }
          }
        }
      }
      if (segData.length > 0) {
        this.populateDataToSegment(segData);
      } else {

        this.view.alertmsg.setTitle("User Message");
        this.view.alertmsg.setMessage("No matching employees found");
        this.view.flxAlertContainer.setVisibility(true);
        this.view.forceLayout();
      }
    }
  },

  /**
     * @function navigateToFormSetting
     * @description - Navigating to settings form from the left menu.
     **/
  navigateToFormSetting: function() {
    try {
      var navObj = new voltmx.mvc.Navigation("frmSetting");
      navObj.navigate();
    } catch (excp) {
      voltmx.print("Exception occured while navigating to setting form: " + JSON.stringify(excp));
      alert("Exception occured while navigating to setting form: " + JSON.stringify(excp));
    }
  },
  /**
     * @function setCommonData
     * @description - Callback function for "onAlertFlexClick" method of a Alert component.
     **/
  hideALertComponentCallBack: function() {
    this.view.flxAlertContainer.setVisibility(false);
  },

  onBreakpointChange: function(eventobject, breakpoint) {

    this.view.empHeader1.imgHamburger.src = "hamburger_menu.png";

    if (breakpoint > BREAKPOINT.TABLET) {
      //viewMode Desktop
      this.view.flxMenuContainer.isVisible=true;
      this.view.empHeader1.flxHamburger.isVisible = false;
      this.view.segEmployeeList.removeAll();
      this.view.segEmployeeList.rowTemplate = "flxTemplateEmpList";
      this.view.alertmsg.setUIForChannel("desktop");
      this.view.forceLayout();

    } else if (breakpoint >= 640 && breakpoint <= BREAKPOINT.TABLET) {
      this.view.flxMenuContainer.isVisible=false;
      this.view.flxList.width="95%";
      this.view.flxList.left="5%";

      // viewMode Tablet
      this.setUIforTablet();
      this.view.alertmsg.setUIForChannel("tablet");
      this.view.forceLayout();

    } else if (breakpoint < 640) {
      //viewMode Mobile
      this.view.flxMenuContainer.isVisible=false;
      this.view.flxList.width="95%";
      this.view.flxList.left="5%";
      this.setUIforMobile();
      this.view.alertmsg.setUIForChannel("mobile");
      this.view.forceLayout();
    }
    this.onPostShow();

  },
  expandEmployeeDetail: function(context) {




    if (context !== null && context !== undefined) {
      try {
        var data = context.widgetInfo.selectedItems[0];
        if (data.flxDepAndId.isVisible === true) {
          data.imgDropDown.src = "drop_down.png";
          data.flxDepAndId = {
            "isVisible": false
          };
        } else {
          data.flxDepAndId = {
            "isVisible": true
          };
          data.imgDropDown.src = "drop_down_arrow_orange.png";
        }

        this.view.segEmployeeList.setDataAt(data, context.rowIndex);
      } catch (excp) {
        voltmx.print(excp);
      }
    }

  },

  expandEmployeeDetailMob: function(context) {


    if (context !== null && context !== undefined) {
      try {
        var data = context.widgetInfo.selectedItems[0];
        if (data.flxDepIdDesig.isVisible === true) {
          data.imgDropDown.src = "drop_down.png";
          data.flxDepIdDesig = {
            "isVisible": false
          };
        } else {
          data.flxDepIdDesig = {
            "isVisible": true
          };
          data.imgDropDown.src = "drop_down_arrow_orange.png";
        }

        this.view.segEmployeeList.setDataAt(data, context.rowIndex);
      } catch (excp) {
        voltmx.print(excp);
      }
    }

  },



  /**
     * @function animateLeftMenu
     * @description - This function will animate the left menu on click of the hamburger menu.
     **/
  animateLeftMenu: function() {

    this.view.flxMenuContainer.isVisible=true;
    var self = this;
    var animDefinition;
    if (this.status === "open") {


      // this.view.flxGreyBg.setVisibility(false);
      //this.view.flxGreyBg.isVisibility=false;
      animDefinition = {
        100: {
          "left": "-260dp"
        }
      };
    } else {
      self.view.flxMenuContainer.width = "50%";

      // this.view.flxGreyBg.setVisibility(true);
      animDefinition = {
        100: {
          "left": "0dp",
        }
      };
    }
    animDef = voltmx.ui.createAnimation(animDefinition);
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

  /**
     * @function applyFilter
     * @description - This function will get called when we apply the filter.
     **/
  applyFilter: function() {
    this.view.flxFilterMain.setVisibility(false);
    this.view.flxOverlay.setVisibility(false);
    this.view.empHeader1.flxImgSearch.setVisibility(false);
    this.view.empHeader1.flxImgSearch.zIndex=1;
    this.view.forceLayout();
    this.view.empHeader1.btnCancelsearch.setVisibility(true);
    this.view.empHeader1.zIndex=10;
    this.view.forceLayout();
  },


  /**
     * @function setUIforTablet
     * @description - This function sets the UI for tablet mode.
     **/

  setUIforTablet: function() {


    this.view.empHeader1.flxHamburger.setVisibility(true);

    this.view.segEmployeeList.rowTemplate = "flxTemplateEmpListTab";
    this.view.forceLayout();

  },

  /**
     * @function setUIforTablet
     * @description - This function sets the UI for mobile mode.
     **/
  setUIforMobile: function() {
    this.view.empHeader1.flxHamburger.setVisibility(true);

    this.view.segEmployeeList.rowTemplate = "flxTemplateEmpListMob";
    this.view.forceLayout();

  },

  /**
     * @function onAnimationComplete
     * @description - This function is called when the animation of the left menu is complete.
     **/
  onAnimationComplete: function() {

    if (status === "open") {
      this.view.flxGreyBackground.setVisibility(true);
    } else {
      this.view.flxGreyBackground.setVisibility(false);
    }
  },


  onPostShow: function() {
    this.view.empHeader1.imgHamburger.src = "hamburger_menu.png";
    this.view.txtSearchInput.text="";
    this.status = "close";
    if (this.employee == undefined || this.employee === null || globRefreshData == true) {

      this.view.segEmployeeList.removeAll();
      this.fetchAllDetails();
      globRefreshData = false;
    }

  },






});