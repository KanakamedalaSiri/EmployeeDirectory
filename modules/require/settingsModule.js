define(function () {
   
    return {
      
      //Type your code here
getHorizontalLine:function(id){
  var lblHLine = new voltmx.ui.Label({
                "left": "0dp",
                "height": "1px",
                "id": "lblHorizontalLine"+id,
                "isVisible": true,
                "skin": "sknLblHLine",
                "top": "0dp",
                "width": "100%",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
  return lblHLine;
},
getLocationMasterRowTemplate:function(id){
  if(id===undefined || id===null)return null;
  var flxLocationItem = new voltmx.ui.FlexContainer({
    "autogrowMode": voltmx.flex.AUTOGROW_NONE,
    "clipBounds": true,
    "height": "55px",
    "id": "flxLocationItem"+id,
    "isVisible": true,
    "layoutType": voltmx.flex.FREE_FORM,
    "left": "0dp",
    "skin": "sknFlxWhiteBG",
    "top": "0dp",
    "width": "100%"
  }, {}, {
    "hoverSkin": "sknFlxWhiteBG"
  });
  flxLocationItem.setDefaultUnit(voltmx.flex.DP);
  var lblLocation = new voltmx.ui.Label({
    "centerY": "50%",
    "height": "100%",
    "id": "lblLocation"+id,
    "isVisible": true,
    "left": "5px",
    "skin": "sknLblsegRowTitle ",
    "text": "Location",
    "width": "9%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  var lblAddressOne = new voltmx.ui.Label({
    "centerY": "50%",
    "height": "100%",
    "id": "lblAddressOne"+id,
    "isVisible": true,
    "left": "10%",
    "skin": "sknLblsegRowTitle ",
    "text": "Location",
    "width": "27.5%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  var lblAddressTwo = new voltmx.ui.Label({
    "centerY": "50%",
    "height": "100%",
    "id": "lblAddressTwo"+id,
    "isVisible": true,
    "left": "37.5%",
    "skin": "sknLblsegRowTitle ",
    "text": "Location",
    "width": "27.5%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  var lblCountry = new voltmx.ui.Label({
    "centerY": "50%",
    "height": "100%",
    "id": "lblCountry"+id,
    "isVisible": true,
     "left": "65%",
    //"right": "300px",
    "skin": "sknLblsegRowTitle ",
    "text": "Country",
    "width": "10%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  var lblCity = new voltmx.ui.Label({
    "centerY": "50%",
    "height": "100%",
    "id": "lblCity"+id,
    "isVisible": true,
    "left": "75%",
    "skin": "sknLblsegRowTitle ",
    "text": "City",
    "width": "10%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  var lblZip = new voltmx.ui.Label({
    "centerY": "50%",
    "height": "100%",
    "id": "lblZip"+id,
    "isVisible": true,
    "left":"85%",
    //"right": "63px",
    "skin": "sknLblsegRowTitle ",
    "text": "zip",
    "width": "10%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  var flxEdit = new voltmx.ui.FlexContainer({
    "autogrowMode": voltmx.flex.AUTOGROW_NONE,
    "centerY": "50%",
    "clipBounds": true,
    "height": "12px",
    "id": "flxEdit"+id,
    "isVisible": true,
    "layoutType": voltmx.flex.FREE_FORM,
    "left": "95%",
    "skin": "sknFlxTransparentBGPointer",
    "width": "2%",
    "zIndex": 1
  }, {}, {});
  flxEdit.setDefaultUnit(voltmx.flex.DP);
  var imgEdit = new voltmx.ui.Image2({
    "centerX": "50%",
    "centerY": "50%",
    "height": "100%",
    "id": "imgEdit"+id,
    "isVisible": true,
    "skin": "slImage",
    "src": "empediticon.png",
    "width": "100%",
    "zIndex": 1
  }, {
    "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  flxEdit.add(imgEdit);
  var flxRemove = new voltmx.ui.FlexContainer({
    "autogrowMode": voltmx.flex.AUTOGROW_NONE,
    "centerY": "50%",
    "clipBounds": true,
    "height": "19px",
    "id": "flxRemove"+id,
    "isVisible": true,
    "layoutType": voltmx.flex.FREE_FORM,
    "left": "97%",
    "skin": "sknFlxTransparentBGPointer",
    "width": "2%",
    "zIndex": 1
  }, {}, {});
  flxRemove.setDefaultUnit(voltmx.flex.DP);
  var imgRemove = new voltmx.ui.Image2({
    "centerX": "50%",
    "centerY": "50%",
    "height": "100%",
    "id": "imgRemove"+id,
    "isVisible": true,
    "skin": "slImage",
    "src": "empremoveicon.png",
    "width": "100%",
    "zIndex": 1
  }, {
    "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  flxRemove.add(imgRemove);
  var lblId = new voltmx.ui.Label({
    "id": "lblId"+id,
    "isVisible": true,
    "left": "0dp",
    "skin": "sknLblZeroFont",
    "text": "Label",
    "top": "0dp",
    "width": voltmx.flex.USE_PREFFERED_SIZE,
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  flxLocationItem.add(lblLocation, lblAddressOne, lblAddressTwo, lblCountry, lblCity, lblZip, flxEdit, flxRemove, lblId);
  return flxLocationItem;
},
      
      
      
 getCommonMasterRowTemplate:function(id){
  if(id===undefined || id===null)return null;
  var flxCommonItem = new voltmx.ui.FlexContainer({
    "autogrowMode": voltmx.flex.AUTOGROW_NONE,
    "clipBounds": true,
    "height": "50px",
    "id": "flxCommonItem"+id,
    "isVisible": true,
    "layoutType": voltmx.flex.FREE_FORM,
    "left": "0dp",
    "skin": "sknFlxWhiteBG",
    "top": "0dp",
    "width": "100%"
  }, {}, {
    "hoverSkin": "sknFlxWhiteBG"
  });
  flxCommonItem.setDefaultUnit(voltmx.flex.DP);
  var lblName = new voltmx.ui.Label({
    "centerY": "50%",
    "height": "100%",
    "id": "lblName"+id,
    "isVisible": true,
    "left": "5px",
    "skin": "sknLblsegRowTitle",
    "text": "Alabama",
    "width": "80%",
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  var txtBoxName = new voltmx.ui.TextBox2({
    "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
    "centerY": "50%",
    "focusSkin": "defTextBoxFocus",
    "height": "100%",
    "id": "txtBoxName"+id,
    "isVisible": false,
    "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
    "left": "0dp",
    "placeholder": "Placeholder",
    "secureTextEntry": false,
    "skin": "sknTxtBoxWhiteBG",
    "text": "Hello World",
    "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
    "width": "100%",
    "zIndex": 1
  }, {
    "containerHeightMode": constants.TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT,
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "padding": [1, 0, 0, 0],
    "paddingInPixel": false
  }, {
    "autoCorrect": false
  });
  var flxEdit = new voltmx.ui.FlexContainer({
    "autogrowMode": voltmx.flex.AUTOGROW_NONE,
    "centerY": "50%",
    "clipBounds": true,
    "height": "25px",
    "id": "flxEdit"+id,
    "isVisible": true,
    "layoutType": voltmx.flex.FREE_FORM,
    //"onClick": controller.AS_FlexContainer_i809066d3a8f4ab2acb04ddb9cfd119b,
    //"left": "95%",
     "right": "45px",
    "skin": "sknFlxTransparentBGPointer",
    "width": "7%",
    "zIndex": 10
  }, {}, {});
  flxEdit.setDefaultUnit(voltmx.flex.DP);
  var imgEdit = new voltmx.ui.Image2({
    "centerX": "50%",
    "centerY": "50%",
    "height": "12px",
    "id": "imgEdit"+id,
    "isVisible": true,
    "skin": "slImage",
    "src": "empediticon.png",
    "width": "22px",
    "zIndex": 1
  }, {
    "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  flxEdit.add(imgEdit);
  var lblId = new voltmx.ui.Label({
    "id": "lblId"+id,
    "isVisible": true,
    "left": "0dp",
    "skin": "sknLblZeroFont",
    "text": "Label",
    "top": "0dp",
    "width": voltmx.flex.USE_PREFFERED_SIZE,
    "zIndex": 1
  }, {
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  var flxRemove = new voltmx.ui.FlexContainer({
    "autogrowMode": voltmx.flex.AUTOGROW_NONE,
    "centerY": "50%",
    "clipBounds": true,
    "height": "30px",
    "id": "flxRemove"+id,
    "isVisible": true,
    "layoutType": voltmx.flex.FREE_FORM,
    //"onClick": controller.AS_FlexContainer_bbda4be0d80c4dea8082428ca8955999,
    //"left": "97%",
    "right": "15px",
    "skin": "sknFlxTransparentBGPointer",
    "width": "3%",
    "zIndex": 10
  }, {}, {});
  flxRemove.setDefaultUnit(voltmx.flex.DP);
  var imgRemove = new voltmx.ui.Image2({
    "centerX": "50%",
    "centerY": "50%",
    "height": "19px",
    "id": "imgRemove"+id,
    "isVisible": true,
    "skin": "slImage",
    "src": "empremoveicon.png",
    "width": "22px",
    "zIndex": 1
  }, {
    "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  flxRemove.add(imgRemove);
  var flxSave = new voltmx.ui.FlexContainer({
    "autogrowMode": voltmx.flex.AUTOGROW_NONE,
    "centerY": "50%",
    "clipBounds": true,
    "height": "25px",
    "id": "flxSave"+id,
    "isVisible": false,
    "layoutType": voltmx.flex.FREE_FORM,
    //"onClick": controller.AS_FlexContainer_ca38196eba05474d98b92a94ac7b5fba,
    "right": "55px",
    "skin": "sknFlxTransparentBGPointer",
    "width": "25px",
    "zIndex": 20
  }, {}, {});
  flxSave.setDefaultUnit(voltmx.flex.DP);
  var imgSave = new voltmx.ui.Image2({
    "centerX": "50%",
    "centerY": "50%",
    "height": "100%",
    "id": "imgSave"+id,
    "isVisible": true,
    "skin": "slImage",
    "src": "save.png",
    "width": "100%",
    "zIndex": 1
  }, {
    "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
    "padding": [0, 0, 0, 0],
    "paddingInPixel": false
  }, {});
  flxSave.add(imgSave);
  flxCommonItem.add(lblName, txtBoxName, flxRemove, flxEdit, lblId, flxSave);
  return flxCommonItem;
}
      
      
    };
});