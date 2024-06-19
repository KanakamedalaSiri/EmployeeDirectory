define({ 
  departmentMenu:null,
  designationMenu:null,
  departmentSubMenuList:[],
  designationSubMenuList:[],
  isRightMenuFetched:false,

  selectedDepartentIndex:null,
  selectedDesignationIndex:null,

  onNavigate:function(){

    this.isRightMenuFetched=false;
  },
  onFormInit:function(){

    //Right menu
    this.view.slidingmenu.flxTargetContainer.listdetail.rightMenuClick=this.rightMenuClick.bind(this);
    //Left menu items.
    this.view.slidingmenu.flxTargetContainer.listdetail.leftMenuClick=this.leftMenuClick.bind(this);
  },
  postShow:function(){
  },
  //left menu button click.
  leftMenuClick:function(){

    this.view.slidingmenu.slidingMenuDirection = "Left";
    var LeftmenuData =[
      {menuItemName:"Directory", menuItemIcon:"imgline.png"},
      {menuItemName:'Colleagues',menuItemIcon:"imgline.png"},
      {menuItemName:'Messages',menuItemIcon:"imgline.png"},
      {menuItemName:'Events',menuItemIcon:"imgline.png"},
      {menuItemName:'Settings',menuItemIcon:"imgline.png"}
    ];
    this.view.slidingmenu.addMenuItems(LeftmenuData);
    this.view.slidingmenu.profileImageIsVisible = true;
    this.view.slidingmenu.profileImageVisible=true;
    this.view.slidingmenu.profileImageSrc= "profile.png";
    this.view.slidingmenu.clearAllTextVisible=false;
    this.view.slidingmenu.profileImageHeight="42dp";
    this.view.slidingmenu.profileImageWidth="42dp";
    this.view.slidingmenu.profileImageLeft="10%";
    this.view.slidingmenu.profileImageTop="20%";

    this.view.slidingmenu.onProfileClick =function(){
      return false;
      voltmx.ui.Alert( {
        message: "from left menu!",
        alertType: constants.ALERT_TYPE_INFO,

      }, {
        "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
      });

    };

    this.view.slidingmenu.headingTextIsVisible= true;
    this.view.slidingmenu.headingTop="20%";
    this.view.slidingmenu.headingLeft="30%";
    this.view.slidingmenu.headingText="Voltmx";
    this.view.slidingmenu.headingSkin = "lblHeaderSknYellow";
    this.view.slidingmenu.subHeadingTextIsVisible=true;
    this.view.slidingmenu.subHeadingText="testuser@hcl.com";
    this.view.slidingmenu.subHeadingLeft="30%";
    this.view.slidingmenu.subHeadingTop="40%";
    this.view.slidingmenu.showSlidingMenu();
    this.view.slidingmenu.footerText="Logout";
    this.view.slidingmenu.footerTextSkin="lblHeaderSknYellow";
    this.view.slidingmenu.onFooterClick=this.onLogout;
    this.view.forceLayout();
    this.view.slidingmenu.onMenuItemClick=this.onMenuItemClick;
  },
  //on right menu click.
  rightMenuClick:function(){

    if(this.isRightMenuFetched===false){
      var menuSubMenuList=this.view.slidingmenu.flxTargetContainer.listdetail.getData();
      if(Array.isArray(menuSubMenuList) && menuSubMenuList.length >0){
        var departmentList;
        var designationList;
        for(var i=0;i<menuSubMenuList.length;i++){
          if(menuSubMenuList[i][0]==="Department"){
            departmentList=menuSubMenuList[i][2];
          }else if(menuSubMenuList[i][0]==="Designation"){
            designationList=menuSubMenuList[i][2];
          }
        }
        this.departmentMenu= this.processMenuItem("Department");
        this.designationMenu=this.processMenuItem("Designation");
        this.departmentSubMenuList=this.processSubMenuItemList("Department",departmentList);
        this.designationSubMenuList=this.processSubMenuItemList("Designation",designationList);
      }
      this.isRightMenuFetched=true;
    }
    this.processFilterData();
    this.view.slidingmenu.slidingMenuDirection = "Right";
    // this.view.slidingmenu.profileImageSrc="clear_all.png";
    this.view.slidingmenu.clearAllTextVisible=true;
    this.view.slidingmenu.clearAllBtnText="Clear All";
    this.view.slidingmenu.clearAllTextskn="btnYellowskn";
    this.view.slidingmenu.profileImageVisible=false;
    this.view.slidingmenu.profileImageHeight="30%";
    this.view.slidingmenu.profileImageLeft="60%";
    this.view.slidingmenu.profileImageWidth="60dp";
    //     this.view.slidingmenu.profileImageTop="20%";
    this.view.slidingmenu.profileImageTop="15%";
    this.view.slidingmenu.profileImageIsVisible = true;

    //this.view.slidingmenu.onProfileClick =this.clearFilter;
    this.view.slidingmenu.onClearAllBtnClick=this.clearFilter;
    this.view.slidingmenu.headingTextIsVisible= true;
    this.view.slidingmenu.headingTop="20%";
    this.view.slidingmenu.headingLeft="20%";
    this.view.slidingmenu.headingText="Filter By";
    this.view.slidingmenu.headingSkin = "lblHeaderSknYellow";
    this.view.slidingmenu.subHeadingTextIsVisible=false;
    this.view.slidingmenu.subHeadingText="testuser@hcl.com";
    this.view.slidingmenu.subHeadingLeft="35%";
    this.view.slidingmenu.subHeadingTop="40%";
    this.view.slidingmenu.footerText="Apply";
    this.view.slidingmenu.footerTextSkin="lblHeaderSknYellow";
    this.view.slidingmenu.onFooterClick=this.applyFilter;
    this.view.slidingmenu.showSlidingMenu();
    this.view.slidingmenu.onMenuItemClick=this.onFilterItemClick;
  },

  // process and create the menu item json
  processMenuItem:function(menuItem){

    var obj={menuItemName:menuItem, menuItemIcon:"imgline.png"};
    return obj;
  },
  //process and create the submenu item json
  processSubMenuItemList:function(menuItem,subMenuItemList){

    var processedSubMenuList=[];
    if(Array.isArray(subMenuItemList)){
      var obj;
      for(var i=0;i<subMenuItemList.length;i++){
        obj={menuItemName:menuItem, submenuItemName:subMenuItemList[i]["text"], submenuItemIcon:'checkboxinactive.png'};
        processedSubMenuList.push(obj);
      }
    }
    return processedSubMenuList;
  },
  //function to process and format the filter data & set to the sliding menu.
  processFilterData:function(){

    var menuList=[];
    menuList.push(this.departmentMenu);
    menuList.push(this.designationMenu);
    var subMenuList=[];
    subMenuList=subMenuList.concat(this.departmentSubMenuList);
    subMenuList=subMenuList.concat(this.designationSubMenuList);
    this.setFilterToSlidingMenu(menuList,subMenuList);

  },
  //function to set the menu and sub menu to the sliding menu.
  setFilterToSlidingMenu:function(menuList,subMenuList){
    this.view.slidingmenu.addMenuItems(menuList,subMenuList);
  },
  onFilterItemClick:function(menuIndex){
    var checkboxImg = "";
    if(menuIndex[0]===0){

      if(Array.isArray(this.departmentSubMenuList) && this.departmentSubMenuList[menuIndex[1]]!==undefined){
        if(this.departmentSubMenuList[menuIndex[1]]["submenuItemIcon"]==="checkboxactive.png"){
          this.departmentSubMenuList[menuIndex[1]]["submenuItemIcon"]="checkboxinactive.png";
          checkboxImg="checkboxinactive.png";
        }else{
          this.departmentSubMenuList[menuIndex[1]]["submenuItemIcon"]="checkboxactive.png";
          checkboxImg="checkboxactive.png";
        }
      }

    }else if(menuIndex[0]===1){
      if(Array.isArray(this.designationSubMenuList) && this.designationSubMenuList[menuIndex[1]]!==undefined){
        if(this.designationSubMenuList[menuIndex[1]]["submenuItemIcon"]==="checkboxactive.png"){
          this.designationSubMenuList[menuIndex[1]]["submenuItemIcon"]="checkboxinactive.png";
          checkboxImg="checkboxinactive.png";
        }else{
          this.designationSubMenuList[menuIndex[1]]["submenuItemIcon"]="checkboxactive.png";
          checkboxImg="checkboxactive.png";
        }
      }

    }
    
    this.view.slidingmenu.setOptionImg("imgflxOptionsmenu" + menuIndex[0] + (menuIndex[1]),checkboxImg);
  // if(this.view["imgflxOptionsmenu" + menuIndex[0] + (menuIndex[1])]) {
    
   // this.view["imgflxOptionsmenu" + menuIndex[0] + (menuIndex[1])].src =checkboxImg;
   // this.view["imgflxOptionsmenu" + menuIndex[0] + (menuIndex[1])].forceLayout();
   //}
    // this.processFilterData();
  },
  onMenuItemClick:function(menuindex){
    switch (Number(menuindex)) {
      case 0: 
        voltmx.ui.Alert( {
          message: "Directory",
          alertType: constants.ALERT_TYPE_INFO,

        }, {
          "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        });
        break;
      case 1:
        voltmx.ui.Alert( {
          message: "Colleagues",
          alertType: constants.ALERT_TYPE_INFO,

        }, {
          "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        });


        break; 
      case 2:
        voltmx.ui.Alert( {
          message: "Messages",
          alertType: constants.ALERT_TYPE_INFO,

        }, {
          "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        });

        break; 
      case 3:
        voltmx.ui.Alert( {
          message: "Events",
          alertType: constants.ALERT_TYPE_INFO,

        }, {
          "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        });

        break; 
      case 4:
        voltmx.ui.Alert( {
          message: "Settings",
          alertType: constants.ALERT_TYPE_INFO,

        }, {
          "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        });

        break; 
    }
  },
  /***************/
  applyFilter:function(){
    var departmentList=[];
    var designationList=[]
    if(Array.isArray(this.departmentSubMenuList)){
      var departmentSubMenuListLength=this.departmentSubMenuList.length;
      var departmentSubMenu;
      for(var i=0;i<departmentSubMenuListLength;i++){
        departmentSubMenu=this.departmentSubMenuList[i];
        if(typeof departmentSubMenu ==='object' && departmentSubMenu !==null && typeof departmentSubMenu["submenuItemIcon"]==='string'){
          if(departmentSubMenu["submenuItemIcon"]==="checkboxactive.png"){
            departmentList.push(departmentSubMenu["submenuItemName"]);
          }
        }
      }
    }
    if(Array.isArray(this.designationSubMenuList)){
      var designationSubMenuListLength=this.designationSubMenuList.length;
      var designationSubMenu;
      for(var i=0;i<designationSubMenuListLength;i++){
        designationSubMenu=this.designationSubMenuList[i];
        if(typeof designationSubMenu ==='object' &&  designationSubMenu!==null && typeof designationSubMenu["submenuItemIcon"]==='string'){
          if(designationSubMenu['submenuItemIcon']==='checkboxactive.png'){
            designationList.push(designationSubMenu['submenuItemName']);
          }
        }
      }
    }



    var filterData=[
      {"Department":departmentList},
      {"Designation":designationList}
    ];

    this.view.slidingmenu.flxTargetContainer.listdetail.filterAndSetData(filterData);
    this.view.slidingmenu.hideSlidingMenuAnimation("Right");
    this.view.slidingmenu.listDetailSkin='slFbox';
    this.view.slidingmenu._hideFlxCoverAnimation();


  },
  /**************/
  validateText:function(data){
    if(data===null || data === undefined){
      return "";
    }else if( typeof data==='string'){
      data=data.trim();
      return data;
    }
    return "";
  },
  onLogout:function(){
    this.view.slidingmenu.hideSlidingMenu();
    var navObj=new voltmx.mvc.Navigation("frmHome");
    navObj.navigate();
  },
  clearFilter:function(){
    if(Array.isArray(this.departmentSubMenuList)){
      var departmentSubMenuListLength=this.departmentSubMenuList.length;
      var departmentSubMenu;
      for(var i=0;i<departmentSubMenuListLength;i++){
        departmentSubMenu=this.departmentSubMenuList[i];
        if(typeof departmentSubMenu ==='object' && departmentSubMenu !==null ){
          departmentSubMenu["submenuItemIcon"]="checkboxinactive.png";
        }
      }
    }
    if(Array.isArray(this.designationSubMenuList)){
      var designationSubMenuListLength=this.designationSubMenuList.length;
      var designationSubMenu;
      for(var i=0;i<designationSubMenuListLength;i++){
        designationSubMenu=this.designationSubMenuList[i];
        if(typeof designationSubMenu ==='object' &&  designationSubMenu!==null && typeof designationSubMenu["submenuItemIcon"]=='string'){
          designationSubMenu['submenuItemIcon']='checkboxinactive.png';
        }
      }
    }
    this.view.slidingmenu.flxTargetContainer.listdetail.filterAndSetData([
      {"Department":[]},
      {"Designation":[]}
    ]);
    this.processFilterData();
  }
});