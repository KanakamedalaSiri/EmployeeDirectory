define(function () {

  return {

    mediaMap:null,
    profilePicMap:null,
    coverPicMap:null,

    parseRecords:function(records){
      
      var departmentMap=this._parseRecords(records["Department"],"Department_id");
      var designationMap=this._parseRecords(records["Designation"],"Designation_id");
      var contactMap=this._parseRecords(records["Contact"],"employee_id");
      var locationMap=this._parseRecords(records["Location"],"Location_id");
      this.profilePicMap={};
      this.coverPicMap={};
      this.parseMedia(records["Media"],this.profilePicMap,this.coverPicMap);
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
        employee["profilePic"]=this.checkResult(this.profilePicMap[employee["Employee_id"]]);
        employee["coverPic"]=this.checkResult(this.coverPicMap[employee["Employee_id"]]);
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
    parseMedia:function(mediaList,profilePic,coverPic){
      
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
    checkResult:function(result){
      if(result===undefined||result===null){
        return [];
      }else 
        return result;
    }

  };
});