var viewMode;

function isAdmin(){
  
//   if(emailId!==undefined && emailId!==null){
//     emailId=emailId.trim();
//     emailId=emailId.toLowerCase();
    var admin=voltmx.store.getItem("isAdmin");
    if(admin==true){
      return true;      
    }else{
      return false;
    }
// }  
}

function searchKeyInCollection(searchKey,itemList){
  
  var matchedRecord=[];
  if(searchKey===null||searchKey===undefined||itemList===null||itemList===undefined)
    return matchedRecord;
  var itemListLength=itemList.length;
  var item;
  var keyName;
  searchKey=searchKey.toLowerCase();
  for(var i=0;i<itemListLength;i++){
    item=itemList[i];
    for(var key in item){
      if(typeof item[key]==="string"){

        if(item[key].toLowerCase().indexOf(searchKey)!==-1){
          matchedRecord.push(item);
          break;
        }
      }else if(typeof item[key]==="number"){
        if(item[key]==searchKey){
          matchedRecord.push(item);
          break;
        }
      }

    }
  }
  return matchedRecord;
}



function getUserRemoveConfirmation(msg,handler){
  voltmx.ui.Alert({
    message:msg,
    alertType:constants.ALERT_TYPE_CONFIRMATION,
    alertTitle:"",
    yesLabel:"Remove",
    noLabel:"Cancel",
    alertHandler:handler,
  }, null);
}
function getObjectInstance(){
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
    objectInstance= null;
  }
  return objectInstance;
}
function showLoadingScreen(formContext){
  voltmx.application.showLoadingScreen("sknLoading",
                                     "",
                                     constants.LOADING_SCREEN_POSITION_FULL_SCREEN,
                                     true,
                                     false, {
    enableMenuKey: false,
    enableBackKey: false,
    progressIndicatorColor: "000000"
  });
  formContext.forceLayout();
}
function dismissLoadingScreen(){
  voltmx.application.dismissLoadingScreen();
}
function validateText(data){
  if(data!==undefined&&data!==null){
    return data.trim();
  }else
    return "";
}

