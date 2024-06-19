define(function () {
   
    return {
      
      fetchDepartments:function() {
  voltmx.print("----------Entering fetchAllDetails Function---------");
  var objectInstance = null;
  var sdkClient = new voltmx.sdk.getCurrentInstance();
  if (Object.keys(sdkClient).length !== 0) {
    objectInstance = sdkClient.getObjectService("EmployeeModelSchema", {
      "access": "online"
    });
  }
  if (objectInstance === null || objectInstance === undefined) {
    voltmx.application.dismissLoadingScreen();
    voltmx.print("Authorization object null - Connect to MF");
    alert("Please connect app to MF");
    return;
  }
  var dataObject = new voltmx.sdk.dto.DataObject("Department");
  var options = {
    "dataObject": dataObject,
    "headers": {},
    "queryParams": {}
  };
  if (voltmx.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
    objectInstance.fetch(options, successCB.bind(this),failureCB.bind(this));
  } else {
    voltmx.application.dismissLoadingScreen();
    alert("No Network connected");
  }

  voltmx.print(JSON.stringify(exception));

  voltmx.print("----------Exiting fetchAllDetails Function---------");
}  
      
      
      
      
    };
});