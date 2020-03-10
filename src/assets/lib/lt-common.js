/*  import
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
<script src="<%= BASE_URL %>js/vendor/jquery-3.3.1.min.js"></script>
<script src="<%= BASE_URL %>js/vendor/bluebird.min.js"></script> 
 */

var js = {
  baseURL:'http://bigdata02.leadtek.com.tw:9019',
  // http://bigdata02.leadtek.com.tw:9019
  // 172.16.2.109
  // http://bigdata02.leadtek.com.tw:9019
  // http://172.16.2.109:9019
  // http://bigdata02.leadtek.com.tw:9014 
  // http://140.127.232.80:9014 (正式)
  // http://140.127.232.81:8093 (測試)
  // http://140.127.232.81:8092 (測試)
  datepicker_opt: {
    dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
    monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    prevText: "上月",
    nextText: "次月",
    weekHeader: "週",
    showMonthAfterYear: true,
    dateFormat: "yy/mm/dd",
    changeMonth: false,
    changeYear: false
  },
  datepicker_opt2: {
    dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
    monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    prevText: "上月",
    nextText: "次月",
    weekHeader: "週",
    showMonthAfterYear: true,
    dateFormat: "yy-mm-dd",
    changeMonth: false,
    changeYear: false
  },
  quotedStr: function (str) {
    return ("\'" + str + "\'");
  },
  quotedStr2: function (str) {
    return ("\"" + str + "\"");
  },
  replaceAll: function (str, find, replace) {
    var arr = str.split(find);
    var s1 = "";
    for (var a = 0; a < arr.length - 1; a++) {
      s1 = s1 + arr[a] + replace;
    }
    s1 = s1 + arr[arr.length - 1];
    return (s1);
  },
  replaceAll2: function (str, find, replace) {
    // IE 不跑
    str = str.replace(new RegExp(find, "ig"), replace);
    return (str);
  },
  isNull: function (obj) {
    if ((obj == undefined) || (obj == null) || (typeof(obj) == NaN))
      return true;
    else
      return false;
  },
  jsonToStr: function (json) {
    var s1;
    if (typeof(json) == "object") {
      s1 = JSON.stringify(json);
    } else {
      s1 = json;
    }
    return (s1);
  },
  strToJson: function (str) {
    if (this.isNull(str))
      return (null);
    else
      return (JSON.parse(str));
  },
  verityEmail: function (email) {
    var RegExpEmailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
    if (email.search(RegExpEmailRule) != -1) // =true
      return (true);
    else
      return (false);
  },
  verityNumber: function (value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
  },
  ltrim: function (instr) {
    //去除字串左邊的空白虛格
    return instr.replace(/^[\s]*/gi, "");
  },
  rtrim: function (instr) {
    //去除字串右邊的空白虛格
    return instr.replace(/[\s]*$/gi, "");
  },
  trim: function (instr) {
    //去除字串前後的空白虛格
    instr = this.ltrim(instr);
    instr = this.rtrim(instr);
    return (instr);
  },
  substr: function (str, t1, t2) {
    var ret = undefined;
    var idx1, idx2;
    idx1 = str.indexOf(t1);
    if (idx1 >= 0) {
      idx1 = idx1 + t1.length;
      idx2 = str.indexOf(t2, idx1);
      if (idx2 >= 0) {
        //console.log("idx="+idx1+"/"+idx2);
        ret = str.substring(idx1, idx2);
      }
    }
    return (ret);
  },
  xorStr: function (str, salt) {
    var to_enc = str;
    var len = salt.length;
    var xorKey;
    var idx = 0;
    var the_res = ""; //the result will be here
    for (var i = 0; i < to_enc.length; ++i) {
      xorKey = salt.charCodeAt(idx % len);
      idx++;
      the_res += String.fromCharCode(xorKey ^ to_enc.charCodeAt(i));
    }
    return (the_res);
  },
  base64Encode: function (str) {
    var ret = "";
    if (str.length > 0) {
      ret = btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode("0x" + p1);
      }));
    }
    return ret;
  },
  base64Decode: function (str) {
    var ret = "";
    if (str.length > 0) {
      ret = decodeURIComponent(atob(str).split("").map(function (c) {
        return '%' + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(""));
    }
    return ret;
  },
  delay: function (msec, func) {
    setTimeout(func, msec);
  },
  consoleObj: function (obj, fname) {
    if (typeof(obj) == "object") {
      if (this.isNull(fname)) {
        console.log("obj = ----->");
      } else {
        console.log(fname + " = ----->");
      }
      console.log(JSON.stringify(obj, null, 2));
    } else {
      if (this.isNull(fname)) {
        console.log("obj = ----->" + obj);
      } else {
        console.log(fname + " = ----->" + obj);
      }
    }
  },
  floatScale: function (val, scale) {
    return parseFloat(val).toFixed(scale); //ret的是字串, parseFloat(ret)
  },
  parseFloat: function (val, scale) {
    var s1 = this.floatScale(val, scale);
    return (parseFloat(s1));
  },
  setDomDisplay: function (domid, sw) { //隱藏區塊,位置不在
    domid = this.privateTrimFirst(domid);
    var obj = document.getElementById(domid);
    if (obj != null) {
      if ((sw == "flase") || (sw == false)) {
        obj.style.display = "none";
      } else {
        obj.style.display = "block"; //https://www.w3schools.com/jsref/prop_style_display.asp
      }
    } else {
      //alert("《"+domid+"》not found.");
    }
  },
  setDomVisible: function (domid, op) {
    domid = this.privateTrimFirst(domid);
    var obj = document.getElementById(domid);
    if ((op == "true") || (op == true)) {
      obj.style.visibility = "visible";
    } else {
      obj.style.visibility = "hidden";
    }
  },
  privateTrimFirst: function (str) {
    if (str.indexOf("#") == 0)
      str = str.substr(1, str.length - 1);
    else if ((str.indexOf(".") == 0) || (str.indexOf("@") == 0))
      str = str.substr(1, str.length - 1);
    return (str);
  },
  formID: "", // form 上要設 id=, 此參數要有#
  getFormValue: function (fieldName) {
    if (this.formID.length == 0)
      alert("Please Set : js.formID=\'#form_id\';");
    else {
      if (this.formID.indexOf("#") != 0)
        this.formID = "#" + this.formID;
    }
    var s1 = $(this.formID + " input[type='text'][name='" + fieldName + "']").val();
    if (this.isNull(s1)) {
      s1 = $(this.formID + " input[type='hidden'][name='" + fieldName + "']").val();
    }
    if (this.isNull(s1)) {
      s1 = $(this.formID + " input[type='password'][name='" + fieldName + "']").val();
    }
    return (s1);
  },
  setFormValue: function (fieldName, fieldValue, readOlny) {
    if (this.formID.length == 0)
      alert("Please Set : js.formID=\'#form_id\';");
    else {
      if (this.formID.indexOf("#") != 0)
        this.formID = "#" + this.formID;
    }
    var dom = $(this.formID + " input[type='text'][name='" + fieldName + "']");
    if (this.isNull(dom) || (dom.length == 0)) {
      dom = $(this.formID + " input[type='hidden'][name='" + fieldName + "']");
    }
    if (this.isNull(dom) || (dom.length == 0)) {
      dom = $(this.formID + " input[type='password'][name='" + fieldName + "']");
    }
    if (!this.isNull(dom)) {
      if (fieldValue != null)
        dom.val(fieldValue);
      if (!this.isNull(readOlny)) {
        this.setFormReadOnly(fieldName, readOlny);
      }
    }
  },
  setFormReadOnly: function (fieldName, readOlny) {
    if (this.formID.length == 0)
      alert("Please Set : js.formID=\'#form_id\';");
    else {
      if (this.formID.indexOf("#") != 0)
        this.formID = "#" + this.formID;
    }
    var dom = $(this.formID + " input[type='text'][name='" + fieldName + "']");
    if (this.isNull(dom) || (dom.length == 0)) {
      dom = $(this.formID + " input[type='password'][name='" + fieldName + "']");
    }
    if (!this.isNull(dom)) {
      if (!this.isNull(readOlny)) {
        if ((readOlny == true) || (readOlny == 1)) {
          dom.css({"background-color": "#666", "color": "#eee" });
          dom.attr({"readonly": "readonly"});
        } else {
          dom.css({"background-color": "#999", "color": "#000" });
          dom.removeAttr("readonly");
        }
      }
    }
  },
  setFormDisable: function (fieldName, readOlny) { //給 select/checkBox/radioBox 用
    if (this.formID.length == 0)
      alert("Please Set : js.formID=\'#form_id\';");
    else {
      if (this.formID.indexOf("#") != 0)
        this.formID = "#" + this.formID;
    }
    var dom = $(this.formID + " [name='" + fieldName + "']");
    if (!this.isNull(dom)) {
      if (!this.isNull(readOlny)) {
        if ((readOlny == true) || (readOlny == 1)) {
          dom.css({"background-color": "#666", "color": "#eee" });
          dom.attr({"disabled": "disabled" });
        } else {
          dom.css({"background-color": "#999","color": "#000" });
          dom.removeAttr("disabled");
        }
      }
    }
  },
  getFormCheckbox: function (formid, fieldName) {
    var ck = $(formid + " input[type='checkbox'][name='" + fieldName + "']").prop("checked");
    return (ck);
  },
  setFormCheckbox: function (formid, fieldName, ckValue) {
    var dom = $(formid + " input[type='checkbox'][name='" + fieldName + "']");
    if ((ckValue == true) || (ckValue == "true"))
      dom.prop("checked", true);
    else
      dom.prop("checked", false);
  },
  addFormSelectOption: function (eleid, arrItems) {
    eleid = this.privateTrimFirst(eleid);
    //先用getElementById取得select的id
    var objSel = document.getElementById(eleid);
    if (objSel != null) {
      for (var a = 0; a < arrItems.length; a++) {
        var new_option = new Option(arrItems[a][1], arrItems[a][0]);
        objSel.options.add(new_option);
      }
    } else {
      console.log("tl-common.js(315)《" + eleid + "》not found.");
    }
    //移除方式:document.getElementById(eleid).remove(1)
  },
  removeFormSelectOption: function (eleid, val) {
    if (this.isNull(val)) {
      $(eleid + " option").each(function () {
        $(this).remove();
      });
    } else {
      $(eleid + " option[value='" + val + "']").each(function () {
        $(this).remove();
      });
    }
  },
  setFormSelectOptionIdx: function (eleid, setIndex) {
    eleid = this.privateTrimFirst(eleid);
    document.getElementById(eleid).selectedIndex = setIndex;
  },
  setFormSelectOptionVal: function (eleid, selid) {
    eleid = this.privateTrimFirst(eleid);
    var objSel = document.getElementById(eleid);
    if (objSel != null) {
      for (var a = 0; a < objSel.length; a++) {
        var val = objSel.options[a].value;
        if (val == selid) {
          objSel.selectedIndex = a;
          break;
        }
      }
    } else {
      //alert("《"+eleid+"》not found.");
    }
  },
  getFormSelectOptionVal: function (eleid) {
    eleid = this.privateTrimFirst(eleid);
    var objSel = document.getElementById(eleid);
    if (objSel != null) {
      var setIndex = objSel.selectedIndex;
      var s1 = objSel.options[setIndex].value;
      return (s1);
    } else {
      //alert("《"+eleid+"》not found.");
    }
  },
  addFormRadioEvent: function(fieldName, ffunc) {
    $(this.formid + " [name=" + fieldName + "]").change(ffunc);
    /*
    function () {
    var checked = $('[name='+fieldName+']:checked')
    console.log('选中的值:', checked.val())
    })
     */
  },
  setFormRadio: function (formid, fieldName, fieldVal) {
    var dom = $(formid + " input[type='radio'][name='" + fieldName + "'][value='" + fieldVal + "']").prop("checked", true);
  },
  formDataToJson: function (formID) {
    var jsonData = {};
    var formDataArray = $(formID).serializeArray();
    //for (var a = 0; a < formDataArray.length; a++) {
    for (var rec of formDataArray) {
      //var rec = formDataArray[a];
      if (jsonData[rec.name]) {
        if (!jsonData[rec.name].push) {
          jsonData[rec.name] = [jsonData[rec.name]];
        }
        jsonData[rec.name].push(rec.value || "");
      } else {
        jsonData[rec.name] = rec.value || "";
      }
    }
    return (jsonData);
  },
  resetForm: function (formId) {
    formId = this.privateTrimFirst(formId);
    document.getElementById(formId).reset();
  },
  cleanForm: function (formId) {
    formId = this.privateTrimFirst(formId);
    var j;
    var form = document.getElementById(formId);
    var tagElements = form.getElementsByTagName("input");
    for (j = 0; j < tagElements.length; j++) {
      if (tagElements[j].type == "text")
        tagElements[j].value = "";
      else if ((tagElements[j].type == "checkbox") || (tagElements[j].type == "radio"))
        tagElements[j].checked = false;
    }

    tagElements = form.getElementsByTagName("textarea");
    for (j = 0; j < tagElements.length; j++) {
      tagElements[j].value = "";
    }

    tagElements = form.getElementsByTagName("select");
    for (j = 0; j < tagElements.length; j++) {
      tagElements[j].selectedIndex = -1;
    }
  },
  subElementById: function (aHtml, eleid) {
    eleid = this.privateTrimFirst(eleid);
    var doc = document.implementation.createHTMLDocument("New Document");
    var p = doc.createElement("p");
    p.innerHTML = aHtml;
    try {
      doc.body.appendChild(p);
    } catch (e) {
      console.log(e);
    }
    var obj = doc.getElementById(eleid);
    //return (obj.innerHTML);
    return (obj);
    // usage: $("#pagebody").html(subElementById(htmlpage, "#sub"));
  },
  setCookie: function (cname, cvalue, expdays) {
    if ((expdays == 0) || (expdays == undefined)) {
      document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";;path=/";
    } else {
      var d = new Date();
      d.setTime(d.getTime() + (expdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
    }
  },
  getCookie: function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        var s1 = c.substring(name.length, c.length);
        return (s1); //decodeURIComponent
      }
    }
    return null;
    /*
    function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
    }
     */
  },
  eraseCookie: function (name) {
    this.setCookie(name, "", -1);
  },
  getUrlParameter: function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return (results == null) ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  },
  isMobile: function () {
    var check = false;
    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  },
  isMobileUpright: function () {
    if ((this.isMobile()) && (this.screenSize().width <= 560)) //450
      return (true);
    else
      return (false);
  },
  isPAD: function () {
    return this.isMobile();
  },
  screenSize: function () {
    return ({
      width: $(window).width(),
      height: $(window).height()
    })
  },
  strToMsec: function (str) {
    // import: https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js
    if (str.length <= 10)
      str = str + " 0:0:0";
    //str="2018/11/07 19:41";  // 起始時間
    var arr1 = str.split(" ");
    var arrDate;
    if (str.indexOf("-") >= 0)
      arrDate = arr1[0].split("-");
    else
      arrDate = arr1[0].split("/");
    var arrTime = arr1[1].split(":");
    for (var a = arrTime.length; a < 3; a++)
      arrTime[a] = 0;
    //console.log("dd="+arrDate[0]+","+arrDate[1]+","+arrDate[2]+"/"+arrTime[0]+","+arrTime[1]+","+arrTime[2]);

    var msec1 = moment([arrDate[0], arrDate[1] - 1, arrDate[2], arrTime[0], arrTime[1], arrTime[2], 0]); // [年, 月, 日, 时, 分, 秒, 毫秒]
    return (msec1);
  },
  msecFormatStr: function (msec, format) {
    // format ='YYYY/MM/DD HH:mm:ss';
    if (format == undefined)
      format = 'YYYY/MM/DD HH:mm:ss';
    return (moment(msec).format(format));
  },
  msecAdd: function (op, addval, msec) {
    var mode = op;
    var original = ["years", "months", "days", "hours", "minutes", "seconds"];
    var ezstr = ["yy", "mm", "dd", "hh", "mi", "ss", "ms"];
    var idx = ezstr.indexOf(op);
    if (idx >= 0)
      mode = original[idx];
    var msec2;
    if (addval > 0)
      msec2 = moment(msec).add(addval, mode);
    else if (addval < 0)
      msec2 = moment(msec).subtract(-addval, mode);
    else
      msec2 = msec;
    return (msec2);
  },
  msecDiff: function (op, start_date, end_date) {
    var mode = op;
    var original = ["years", "months", "days", "hours", "minutes", "seconds"];
    var ezstr = ["yy", "mm", "dd", "hh", "mi", "ss", "ms"];
    var idx = ezstr.indexOf(op);
    if (idx >= 0)
      mode = original[idx];
    return (end_date.diff(start_date, mode));
  },
  currentTime: function () {
    // debug 時用
    var dt = new Date();
    return (this.msecFormatStr(dt.getTime(), "HH:mm:ss"));
  },
  loadJsCss: function (filetype, filename) {
    if (filetype == "js") { //if filename is a external JavaScript file
      var fileref = document.createElement("script");
      fileref.setAttribute("type", "text/javascript");
      fileref.setAttribute("src", filename);
    } else if (filetype == "css") { //if filename is an external CSS file
      var fileref = document.createElement("link");
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", filename);
    }
    if (typeof fileref != "undefined") {
      document.getElementsByTagName("head")[0].appendChild(fileref)
    }
    //console.log("load <" + filename + "> OK");
  },
  printDom: function (domid) {
    domid = this.privateTrimFirst(domid);
    var dom = document.getElementById(domid);
    if (dom != null) {
      var value = dom.innerHTML;
      var printPage = window.open("", "Printing...", "");
      printPage.document.open();
      printPage.document.write("<html><head></head><body onload='window.print();window.close()'>");
      printPage.document.write("<PRE>");
      printPage.document.write(value);
      printPage.document.write("</PRE>");
      printPage.document.close("</body></html>");
    } else {
      console.log("printDom can't find " + domid);
    }
  },
  setShortcutIcon: function (icon) {
    var link = document.createElement("link");
    link.rel = "shortcut icon";
    link.href = icon;
    document.head.appendChild(link);

    var link2 = document.createElement("link");
    link2.rel = "apple-touch-icon";
    link2.href = icon;
    document.head.appendChild(link2);
  },
  filetrJson: function (jsArrData, param) { // return [json]
    // usage: param={"field":"value","field2":"value2",...};
    var ret = jsArrData.filter(function (obj) {
      var bl = true;
      for (var item in param) {
        if (param[item] != obj[item]) {
          bl = false;
          break;
        }
      }
      if (bl)
        return (obj);
    });
    return ret;
  },
  findJson: function (jsArrData, param) {
    // usage: param={"field":"value","field2":"value2",...};
    var retObj = this.filetrJson(jsArrData, param);
    return (retObj[0] || null);
  },
  updateJson: function (srcJson, up) {
    if (this.isNull(srcJson))
      srcJson= {};
    for (var item in up) {
      srcJson[item] = up[item];
    }
  },
  cloneJson: function (srcJson) {
    /* iterator json
    var jsonObj = { a1 :"阿珠",  a2 :"阿花",  a3 :"阿貓", "a4.01" :"阿狗" };
    for (var item in jsonObj){ //ie10 OK <-用在 json ,  for (var item of arrayData) <- 用在陣列
    console.log(item + ' = ' + jsonObj[item]);
    }
    Object.keys(jsonObj).forEach(function(item) {  //ie10 OK
    console.log(item + ' - ' + jsonObj[item]);
    });
     */
    return (JSON.parse(JSON.stringify(srcJson)));
  },
  cloneArray: function (srcArr) {
    var ret = [];
    /*
    for (var a = 0; a < srcArr.length; a++) {
      ret.push(srcArr[a]);
    } */
    for (var item of srcArr) {
      ret.push(item);
    }
    return (ret);
  },
  parseJsonKey: function(jsonTag) {
    var ret = {};
    var sn = this.substr(jsonTag, "[", "]");
    if (sn == undefined) {
      ret = {type:"String", sn:-1, tag:jsonTag};
    } else {
      var newTag = this.replaceAll(jsonTag, "["+sn+"]", "");
      ret = {type:"Array", sn:parseInt(sn), tag:newTag};
    }
    return (ret);
  }, 
  leadtekEncode: function (str) {
    return (this.base64Encode(this.xorStr(str, "leadtek")));
  },
  leadtekDecode: function (str) {
    return (this.xorStr(this.base64Decode(str), "leadtek"));
  },
  ajaxPromise200: function (option) {
    if (!this.isNull(option._csrfHeader)) {
      return (this.ajaxPromise403(option));
    } else {
      return (this.ajaxPromise(option));
    }
  },
  ajaxPromise: function (option) { 
    //import : https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.5.4/bluebird.min.js
    //option.params["ran"] = Math.floor(Math.random() * 0xffff); // ie 會卡cache 所以加
    /* usage:
    var option = { url:"http://127.0.0.1:8091/menu/list", 
                   params:{}, 
                   method:"get" };
    */
    var promise = new Promise(function (resolve, reject) {
      if (option.method == undefined)
        option.method = "GET";
      // if (option.dataType == undefined)
      //   option.dataType = "json";
      if (option.dataType == undefined) {
        option.dataType = "json";
        if (option.contentType == undefined)
          option.contentType = "application/json;charset=UTF-8";
      } else {
        if (option.contentType == undefined)
          option.contentType = "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (option.method.toUpperCase() == "POST") {
        if (typeof option.params == "object") {
          option.contentType = undefined; // request.getParameter("xx") 才收得到
        }
      }
      // if(option.url.indexOf('getSynoymExcel')>=0){
      //   option.contentType = '';

      // }
      // console.log( option.contentType,option.url );
      $.ajax({
        url: option.url,
        type: option.method,
        cache: false,
        contentType: option.contentType,
        dataType: option.dataType,
        crossDomain: true,
        data: option.params || "",
        success: function (data) {
          resolve(data);
        },
        error: function (xhr, exception) {
          if (xhr.status != 200) {
            console.log("ajax error : " + xhr.status);
            reject(xhr.responseText);
          }
        }
      });
    });
    return (promise);
  },
  ajaxPromise403: function (option) {
    //option.params["ran"] = Math.floor(Math.random() * 0xffff); // ie 會卡cache 所以加
    var promise = new Promise(function (resolve, reject) {
      if (option.dataType == undefined)
        option.dataType = "json";
      $.ajax({
        url: option.url,
        type: "POST",
        cache: false,
        dataType: option.dataType,
        crossDomain: true,
        data: option.params || "",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(option._csrfHeader, option._csrfToken); // X-CSRF-TOKEN:
        },
        success: function (data) {
          resolve(data);
        },
        error: function (xhr, exception) {
          if (xhr.status != 200) {
            console.log("ajax error : " + xhr.status);
            reject(xhr.responseText);
          }
        }
      });
    });
  return (promise);
  },
  ajaxPromiseJwt: function (option, jwtToken) {
    //option.params["ran"] = Math.floor(Math.random() * 0xffff); // ie 會卡cache 所以加
    var promise = new Promise(function (resolve, reject) {
      if (option.method == undefined)
        option.method = "GET";
      if (option.dataType == undefined) {
        option.dataType = "json";
        if (option.contentType == undefined)
          option.contentType = "application/json;charset=UTF-8";
      } else {
        if (option.contentType == undefined)
          option.contentType = "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (option.method.toUpperCase() == "POST") {
        if (typeof option.params == "object") {
          option.contentType = undefined; // request.getParameter("xx") 才收得到
        }
      }
      $.ajax({
        url: option.url,
        type: option.method,
        cache: false,
        contentType: option.contentType,
        dataType: option.dataType,
        crossDomain: true,
        data: option.params || "",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
        },
        success: function (data) {
          resolve(data);
        },
        error: function (xhr, exception) {
          if (xhr.status != 200) {
            console.log("ajax error : " + xhr.status);
            reject(xhr.responseText);
          }
        }
      });
    });
    return (promise);
  },
  addWinOnloadEvent: function (myOnload) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
      window.onload = myOnload;
    } else {
      window.onload = function () {
        if (oldonload) {
          oldonload();
        }
        myOnload();
      };
    }
  },
  ieVer: function () {
    var s1;
    var appVer = navigator.userAgent.toUpperCase();
    //console.log("appVer = "+appVer);
    var idx = appVer.indexOf("MSIE ");
    var idx2 = appVer.indexOf("RV:");
    var idx3 = appVer.indexOf("EDGE/");

    if (idx > 0) {
      s1 = appVer.substring(idx + 5, idx + 8);
    } else if (idx2 > 0) {
      s1 = appVer.substring(idx2 + 3, idx2 + 7);
    } else if (idx3 > 0) {
      s1 = appVer.substring(idx3 + 5, idx3 + 10);
    } else {
      s1 = "0.";
    }
    var ver = parseFloat(s1);
    return (ver);
  },
  strInArray: function (str, arr) {
    return (this.valInArray(str, arr));
  },
  valInArray: function (val, arr) {
    var ret = false;
    /*
    for (var a = 0; a < arr.length; a++) {
      if (val == arr[a]) {
        ret = true;
        break;
      }
    } */
    for (var item of arr) {
      if (val == item) {
        ret = true;
        break;
      }
    }
    return (ret);
  },
  authoUnZipSub: function (hex) {
    var mask = [1, 2, 4, 8];
    var ret = "";
    for (var i = 0; i < mask.length; i++) {
      if ((hex & mask[i]) == 0)
        ret = ret + "0";
      else
        ret = ret + "1";
    }
    return (ret);
  },
  authoUnZip: function (hexStr) {
    if (hexStr == null)
      hexStr = "00";
    else if (typeof(hexStr) != "string")
      hexStr = hexStr.toString();

    var ret = "";
    var str;
    for (var i = 0; i < hexStr.length; i++) {
      str = hexStr.substr(i, i + 1);
      ret = ret + this.authoUnZipSub(parseInt(str, 16));
    }
    return (ret);
  },
  authoZip: function (authoStr) {
    var ret = "";
    var val = 0;
    for (var a = 0; a < authoStr.length; a++) {
      if (authoStr.substring(a, a + 1) == "1") {
        val += Math.pow(2, a % 4);
      }
      //console.log("val="+val+"/"+authoStr.substring(a, a+1));
      if ((a % 4) == 3) {
        ret += val.toString(16);
        val = 0;
      }
    }

    if (val > 0) {
      ret += val.toString(16);
    }

    return (ret);
  },
  strIndex: function (auth, index) {
    //var auth = serve.token.auth;
    var s1 = "";
    if (auth.length > index) {
      s1 = auth.substring(index, index + 1);
    }
    return (s1);
  },
  summaryCountUp: function (smmCount, smmField, countNumber) { //smmCount 必須是個物件
    $("body").each(function () {
      $({
        countNum: smmCount[smmField]
      }).animate({
        countNum: countNumber
      }, {
        duration: 1000,
        easing: "linear",
        step: function () {
          smmCount[smmField] = Math.floor(this.countNum);
        },
        complete: function () {
          smmCount[smmField] = this.countNum;
        }
      });
    });
  },
  setIdOnClick: function (eleid, clickFunc) {
    eleid = this.privateTrimFirst(eleid);
    var obj = document.getElementById(eleid);
    if (obj != null) {
      obj.style.cursor = "pointer";
      obj.onclick = clickFunc;
    }
  },
  removeIdOnClick: function (eleid) {
    eleid = this.privateTrimFirst(eleid);
    var obj = document.getElementById(eleid);
    if (obj != null) {
      obj.style.cursor = "default";
      obj.onclick = null;
    }
  },
  setClassOnClick: function (clasName, clickFunc) {
    clasName = this.privateTrimFirst(clasName);
    var $lba = document.getElementsByClassName(clasName);
    for (var i = 0; i < $lba.length; i++) {
      $lba[i].style.cursor = "pointer";
      $lba[i].onclick = clickFunc;
    }
  },
  removeClassOnClick: function (clasName) {
    clasName = this.privateTrimFirst(clasName);
    var $lba = document.getElementsByClassName(clasName);
    for (var i = 0; i < $lba.length; i++) {
      $lba[i].style.cursor = "default";
      $lba[i].onclick = null;
    }
  },
  popAlert: function (ele1, ele2, msg) {
    $(ele2).html(msg);
    var $obj = $(ele1);
    $obj.slideDown();

    setTimeout(function () {
      $obj.slideUp();
    }, 4000);
    /*
    pop_alert("#alert_danger","#alert_danger_msg","請輸入 參數代碼");
    <div class="form-group col-12">
    <div class="alert alert-danger page-alert" id="alert_danger">
    <button type="button" class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
    <span id="alert_danger_msg">...</span>
    </div>
    </div>
     */
  },
  hiddenAlert: function (ele1) {
    $(ele1).hide();
    $(ele1 + " .close").click(function (e) {
      e.preventDefault();
      $(this).closest(ele1).slideUp();
    });
  }
};

export {js} ;

