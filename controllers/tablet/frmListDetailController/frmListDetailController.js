define({ 
//   departmentMenu:null,
//   designationMenu:null,
//   departmentSubMenuList:[],
//   designationSubMenuList:[],
//   isRightMenuFetched:false,

//   selectedDepartentIndex:null,
//   selectedDesignationIndex:null,

//   onNavigate:function(){
//     debugger;
//     this.isRightMenuFetched=false;
//   },
//   onFormInit:function(){
//     debugger;
//     //Right menu
//     this.view.slidingmenu.flxTargetContainer.listdetail.rightMenuClick=this.rightMenuClick.bind(this);
//     //Left menu items.
//     this.view.slidingmenu.flxTargetContainer.listdetail.leftMenuClick=this.leftMenuClick.bind(this);
//   },
//   postShow:function(){
//   },
//   //left menu button click.
//   leftMenuClick:function(){
//     debugger;
//     this.view.slidingmenu.slidingMenuDirection = "Left";
//     var LeftmenuData =[
//           {menuItemName:"Directory", menuItemIcon:"imgline.png"},
//           {menuItemName:'Colleagues',menuItemIcon:"imgline.png"},
//           {menuItemName:'Messages',menuItemIcon:"imgline.png"},
//           {menuItemName:'Events',menuItemIcon:"imgline.png"},
//           {menuItemName:'Settings',menuItemIcon:"imgline.png"}
//         ];
//     this.view.slidingmenu.addMenuItems(LeftmenuData);

//     this.view.slidingmenu.profileImageSrc= "profile.png";
//     this.view.slidingmenu.profileImageHeight="42dp";
//     this.view.slidingmenu.profileImageWidth="42dp";
//     this.view.slidingmenu.profileImageLeft="10%";
//     this.view.slidingmenu.profileImageTop="20%";
//     this.view.slidingmenu.profileImageIsVisible = true;
//     this.view.slidingmenu.onProfileClick =function(){
//       alert("from left menu!");
//     };

//     this.view.slidingmenu.headingTextIsVisible= true;
//     this.view.slidingmenu.headingTop="20%";
//     this.view.slidingmenu.headingLeft="35%";
//     this.view.slidingmenu.headingText="Kony";

//     this.view.slidingmenu.subHeadingTextIsVisible=true;
//     this.view.slidingmenu.subHeadingText="admin@kony.com";
//     this.view.slidingmenu.subHeadingLeft="35%";
//     this.view.slidingmenu.subHeadingTop="40%";

//     this.view.slidingmenu.showSlidingMenu();

//     this.view.slidingmenu.footerText="Logout";
//     this.view.slidingmenu.onFooterClick=this.onLogout;

//     this.view.forceLayout();
//     this.view.slidingmenu.onMenuItemClick=this.onMenuItemClick;
//   },
//   //on right menu click.
//   rightMenuClick:function(){
//     debugger;
//     if(this.isRightMenuFetched===false){
//       var menuSubMenuList=this.view.slidingmenu.flxTargetContainer.listdetail.getData();
//       if(Array.isArray(menuSubMenuList) && menuSubMenuList.length >0){
//         var departmentList;
//         var designationList;
//         for(var i=0;i<menuSubMenuList.length;i++){
//           if(menuSubMenuList[i][0]==="Department"){
//             departmentList=menuSubMenuList[i][2];
//           }else if(menuSubMenuList[i][0]==="Designation"){
//             designationList=menuSubMenuList[i][2];
//           }
//         }
//         this.departmentMenu= this.processMenuItem("Department");
//         this.designationMenu=this.processMenuItem("Designation");
//         this.departmentSubMenuList=this.processSubMenuItemList("Department",departmentList);
//         this.designationSubMenuList=this.processSubMenuItemList("Designation",designationList);
//       }
//       this.isRightMenuFetched=true;
//     }
//     this.processFilterData();
//     this.view.slidingmenu.slidingMenuDirection = "Right";

//     this.view.slidingmenu.profileImageSrc="clear_all.png";
//     this.view.slidingmenu.profileImageHeight="9%";
//     this.view.slidingmenu.profileImageLeft="80%";
//     this.view.slidingmenu.profileImageTop="20%";
//     this.view.slidingmenu.profileImageIsVisible = true;
//     this.view.slidingmenu.onProfileClick =this.clearFilter;

//     this.view.slidingmenu.headingTextIsVisible= true;
//     this.view.slidingmenu.headingTop="20%";
//     this.view.slidingmenu.headingLeft="25%";
//     this.view.slidingmenu.headingText="Filter By";

//     this.view.slidingmenu.subHeadingTextIsVisible=false;
//     this.view.slidingmenu.subHeadingText="admin@kony.com";
//     this.view.slidingmenu.subHeadingLeft="35%";
//     this.view.slidingmenu.subHeadingTop="40%";

//     this.view.slidingmenu.footerText="Apply";
//     this.view.slidingmenu.onFooterClick=this.applyFilter;

//     this.view.slidingmenu.showSlidingMenu();
//     this.view.slidingmenu.onMenuItemClick=this.onFilterItemClick;
//   },

//   // process and create the menu item json
//   processMenuItem:function(menuItem){
//     debugger;
//     var obj={menuItemName:menuItem, menuItemIcon:"imgline.png"};
//     return obj;
//   },
//   //process and create the submenu item json
//   processSubMenuItemList:function(menuItem,subMenuItemList){
//     debugger;
//     var processedSubMenuList=[];
//     if(Array.isArray(subMenuItemList)){
//       var obj;
//       for(var i=0;i<subMenuItemList.length;i++){
//         obj={menuItemName:menuItem, submenuItemName:subMenuItemList[i]["text"], submenuItemIcon:'checkboxinactive.png'};
//         processedSubMenuList.push(obj);
//       }
//     }
//     return processedSubMenuList;
//   },
//   //function to process and format the filter data & set to the sliding menu.
//   processFilterData:function(){
//     debugger;
//     var menuList=[];
//     menuList.push(this.departmentMenu);
//     menuList.push(this.designationMenu);
//     var subMenuList=[];
//     subMenuList=subMenuList.concat(this.departmentSubMenuList);
//     subMenuList=subMenuList.concat(this.designationSubMenuList);
//     this.setFilterToSlidingMenu(menuList,subMenuList);
//     debugger;
//   },
//   //function to set the menu and sub menu to the sliding menu.
//   setFilterToSlidingMenu:function(menuList,subMenuList){
//     this.view.slidingmenu.addMenuItems(menuList,subMenuList);
//   },
//   onFilterItemClick:function(menuIndex){
//     debugger;
//     if(menuIndex[0]===0){
//       if(Array.isArray(this.departmentSubMenuList) && this.departmentSubMenuList[menuIndex[1]]!==undefined){
//         if(this.departmentSubMenuList[menuIndex[1]]["submenuItemIcon"]==="checkboxactive.png"){
//           this.departmentSubMenuList[menuIndex[1]]["submenuItemIcon"]="checkboxinactive.png";
//         }else{
//           this.departmentSubMenuList[menuIndex[1]]["submenuItemIcon"]="checkboxactive.png";
//         }
//       }

//     }else if(menuIndex[0]===1){
//       if(Array.isArray(this.designationSubMenuList) && this.designationSubMenuList[menuIndex[1]]!==undefined){
//         if(this.designationSubMenuList[menuIndex[1]]["submenuItemIcon"]==="checkboxactive.png"){
//           this.designationSubMenuList[menuIndex[1]]["submenuItemIcon"]="checkboxinactive.png";
//         }else{
//           this.designationSubMenuList[menuIndex[1]]["submenuItemIcon"]="checkboxactive.png";
//         }
//       }
     
//     }
//     this.processFilterData();
//   },
//   onMenuItemClick:function(menuindex){
//     switch (Number(menuindex)) {
//       case 0: 
//         alert("Product Management");
//         break;
//       case 1:
//         alert("Colleagues");
//         break; 
//       case 2:
//         alert("Messages");
//         break; 
//       case 3:
//         alert("Events");
//         break; 
//       case 4:
//         alert("Settings");
//         break; 
//     }
//   },
//   /***************/
//   applyFilter:function(){
//     var departmentList=[];
//     var designationList=[]
//     if(Array.isArray(this.departmentSubMenuList)){
//       var departmentSubMenuListLength=this.departmentSubMenuList.length;
//       var departmentSubMenu;
//       for(var i=0;i<departmentSubMenuListLength;i++){
//         departmentSubMenu=this.departmentSubMenuList[i];
//         if(typeof departmentSubMenu ==='object' && departmentSubMenu !==null && typeof departmentSubMenu["submenuItemIcon"]==='string'){
//           if(departmentSubMenu["submenuItemIcon"]==="checkboxactive.png"){
//             departmentList.push(departmentSubMenu["submenuItemName"]);
//           }
//         }
//       }
//     }
//     if(Array.isArray(this.designationSubMenuList)){
//       var designationSubMenuListLength=this.designationSubMenuList.length;
//       var designationSubMenu;
//       for(var i=0;i<designationSubMenuListLength;i++){
//         designationSubMenu=this.designationSubMenuList[i];
//         if(typeof designationSubMenu ==='object' &&  designationSubMenu!==null && typeof designationSubMenu["submenuItemIcon"]=='string'){
//           if(designationSubMenu['submenuItemIcon']==='checkboxactive.png'){
//             designationList.push(designationSubMenu['submenuItemName']);
//           }
//         }
//       }
//     }
//     var filterData=[
//       {"Department":departmentList},
//       {"Designation":designationList}
//     ];
//     debugger;
//     this.view.slidingmenu.flxTargetContainer.listdetail.filterAndSetData(filterData);
//   },
//   /**************/
//   validateText:function(data){
//     if(data===null || data === undefined){
//       return "";
//     }else if( typeof data==='string'){
//       data=data.trim();
//       return data;
//     }
//     return "";
//   },
//   onLogout:function(){
//     this.view.slidingmenu.hideSlidingMenu();
//     var navObj=new kony.mvc.Navigation("frmHome");
//     navObj.navigate();
//   },
//   clearFilter:function(){
//     if(Array.isArray(this.departmentSubMenuList)){
//       var departmentSubMenuListLength=this.departmentSubMenuList.length;
//       var departmentSubMenu;
//       for(var i=0;i<departmentSubMenuListLength;i++){
//         departmentSubMenu=this.departmentSubMenuList[i];
//         if(typeof departmentSubMenu ==='object' && departmentSubMenu !==null ){
//           departmentSubMenu["submenuItemIcon"]="checkboxinactive.png";
//         }
//       }
//     }
//     if(Array.isArray(this.designationSubMenuList)){
//       var designationSubMenuListLength=this.designationSubMenuList.length;
//       var designationSubMenu;
//       for(var i=0;i<designationSubMenuListLength;i++){
//         designationSubMenu=this.designationSubMenuList[i];
//         if(typeof designationSubMenu ==='object' &&  designationSubMenu!==null && typeof designationSubMenu["submenuItemIcon"]=='string'){
//           designationSubMenu['submenuItemIcon']='checkboxinactive.png';
//         }
//       }
//     }
//     this.view.slidingmenu.flxTargetContainer.listdetail.filterAndSetData([
//       {"Department":[]},
//       {"Designation":[]}
//     ]);
//   }
});