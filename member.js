var CMSsettings={
  "page":{
    "login":"",
    "register":"",
    "setting":"",
    "coin":"",
    "home":"/"
  },
  "btn":{
    "login":"",
    "register":"",
    "setting":"",
    "coin":"",
    "logout":""
  },
  "block":{
    "status":"",
    "memberSystemSidebarPanel":""
  },
  "text":{
    "status":{
      "noName":"歡迎!請至設定中心設定您的姓名(\<a href=\"{{$page->setting}}\"\>來這裡設定吧!\<\/a\>)",
      "hasName":"歡迎!{{name|protect1}}",
      "noLogin":"尚未登入 加入會員享有Cotpear各種限定服務吧",
      "limitLogin":"請登入後重試"
    }
  },
  errorList:{
    "auth/weak-password":"密碼太弱，請使用6位以上密碼",
    "auth/email-already-in-use":"此帳號已使用過了，請至登入頁面進行登入",
    "auth/invalid-email":"電子郵件格式錯誤",
    "auth/wrong-password":"密碼錯誤",
    "auth/user-not-found":"查無帳號資料"
  },
  "appScriptDB":"https://script.google.com/macros/s/AKfycbwZRSY01VOvtJxr6OhEhdZe661iy2xfOGRpqZ36fsCBYBqFgPbh/exec"
}
(function(global,auth,setting){
  
  function CMS(){
    this.init=function(){
      $("#"+setting.btn.login).click(function(){
        this.go("login")
      })
      $("#"+setting.btn.register).click(function(){
        this.go("register")
      })
      $("#"+setting.btn.setting).click(function(){
        this.go("setting")
      })
      $("#"+setting.btn.coin).click(function(){
        this.go("coin")
      })
      $("#"+setting.btn.logout).click(function(){
        auth.signOut()
      })
      auth.onAuthStateChanged(function(user){
        if(user){
          window.CMS.prototype.sessionUser=user;
          sessionUser=user;
          
          if(window.CMS.prototype.writeInfoToDom){
            //只會在帳號資料頁面執行
            window.CMS.prototype.writeInfoToDom()
          }
          this.writeToDB(sessionUser.uid)
          if(!sessionUser.displayName){
            //已登入但無名字
            $("#"+setting.block.status).html(
              this.renderTemplateText(
                setting.text.status.noName
              )
            )
          }else{
            //已登入且有名字
            $("#"+setting.block.status).html(
              this.renderTemplateText(
                setting.text.status.hasName
              ).replace(
                /{{name|protect1}}/g,
                sessionUser.displayName.replace(/</g,"").replace(/>/g,"")
              ).replace(
                /{{name|protect2}}/g,
                //addslashes
                sessionUser.displayName.replace(/</g,"").replace(/>/g,"").replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')
              ).replace(
                /{{name|protect3}}/g,
                sessionUser.displayName
                .replace(/</g,"").replace(/>/g,"")
                .replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')
                .replace(/script/g, '').replace(/alert/g, '')
                .replace(/shit/g, '').replace(/fuck/g, '')
                .replace(/"/g, '').replace(/document.write/g, '')
                .replace(/\(/g, '').replace(/\)/g, '')
              ).replace(
                /{{name|no\-protect}}/g,
                sessionUser.displayName
              ).replace(
                /{{name}}/g,
                sessionUser.displayName.replace(/</g,"").replace(/>/g,"")
              )
            )
          }
        }else{
          $("#"+setting.block.status).html(
              this.renderTemplateText(
                setting.text.status.noLogin
              )
          )
          $("#"+setting.btn.coin).hide()
          $("#"+setting.btn.setting).hide()
          $("#"+setting.btn.logout).hide()
          $("#"+setting.btn.register).show()
          $("#"+setting.btn.login).show()
          if(window.CMS.prototype.limitLogin){
            this.warn("limitLogin")
          }
        }
        $("#"+setting.block.memberSystemSidebarPanel).show()
      })
    }
    this.go=function(page){
      switch(page){
        case "login":
          window.location.href=setting.page.login
          break;
        case "register":
          window.location.href=setting.page.register
          break;
        case "coin":
          window.location.href=setting.page.coin
          break;
        case "setting":
          window.location.href=setting.page.setting
          break;
        default:
          
          break;
      }
    }
    this.renderTemplateText=function(text){
      let $page=setting.page
      text=text.replace(/\$page\-\>setting/,$page.setting)
      text=text.replace(/\$page\-\>coin/,$page.coin)
      text=text.replace(/\$page\-\>register/,$page.register)
      text=text.replace(/\$page\-\>login/,$page.login)
      
      return text;
    }
    this.warn=function(type,text){
      switch(warn){
        case "limitLogin":
          alert(setting.text.limitLogin)
          window.location.href=setting.page.home
          break;
          
        default:
          if(text){
            alert(type+"\n"+text)
          }else{
            console.warn("CMS Warn Type"+type+" :not found!")
          }
          break;
      }
    }
    this.writeToDB=function(uid){
      $.ajax({
        dataType: "json",
        url: setting.appScriptDB+'?op=write_in&uid='+uid,
        success: function(){
          $.ajax({
            dataType: "json",
            url: setting.appScriptDB+'?op=get_info&uid='+uid,
            success: function(data){
              if(window.CMS.prototype.writeCoinToPage){
                  window.CMS.prototype.writeCoinToPage(result.coin,LoginedUser)
              }
              console.log("CMS user ("+uid+")\ncoin:"+result.coin)
            }
          })
        }
      });
    }
    this.login=function(account,password){
        auth.signInWithEmailAndPassword(email,password)
          .then(function(user){
            //alert('登入成功')
            if(window.CMS.prototype.doAfterLogin()){
              window.CMS.prototype.doAfterLogin(user)
            }
          })
          .catch(function(error){
            //處理錯誤
            var errorCode = error.code;
            var errorMessage = error.message;
            //alert(errorCode)
            document.getElementById("errorAlerts").innerHTML=errorList[errorCode];
            //alert("錯誤:"+errorList[errorCode])
          });
    }
  }
  
  global.CMS=CMS;
  global.setting=setting
})(window,firebase.auth(),CMSsettings)

$(function(){
  new CMS().init();
  
  //讓小工具隱藏
  $("#HTML5").hide()
})