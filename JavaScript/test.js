var notificationNums=1
$(()=>{
  //初始化 => 隱藏
  $('#infoDiv').hide()
  $('#loadding').hide()
  $('#coin_waitrun').hide()
  $('#coin_waitrun_text').show()
})
var pageIsAccount=true
function doViewCoin(){
  window.location.href=SETS$page.coinpage
}
function doSetPwd(){
/*仿doDel*/
  if (LoginedUser) {
   var credential = firebase.auth.EmailAuthProvider.credential(LoginedUser.email, $('#pwdResetInputOld').val())
     LoginedUser.reauthenticateAndRetrieveDataWithCredential(credential).then((Usp) => {
       var user = firebase.auth().currentUser
       user.updatePassword($('#pwdResetInputNew').val()).then(function(){
         alert('已經成功更換密碼了,請重新登入')
         firebase.auth().signOut()
         window.location.href=SETS$page.login
       })//end resetPassword then
     }).catch(function(error){
       alert(errorList[error.code])
     })//end reAuth
  } else {
    swal('錯誤','你並不在登入狀態','error');
  } //end if(LoginedUser)


}
function doDel() {

    swal({
        title: '刪除帳戶',
        html: "系統將會刪除一切與您相關的所有資料，無法復原",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確認，我已了解',
        cancelButtonText: '取消'
    }).then((result) => {
        if (result.value) {
           if(LoginedUser.providerData[0]["providerId"]=="google.com"){
var provider = new firebase
                       .auth
                       .GoogleAuthProvider();
    firebase.auth().languageCode = 'tw';
    firebase.auth().useDeviceLanguage();
    /* do Google Sign in */
    firebase.auth()
            .signInWithPopup(provider)
            .then(function(result){
      var token = result.credential.accessToken
      var user = result.user
      user.delete().then(function(){
        window.location.href=SETS$page.login
      }).catch(function(error){
        alert(errorList[error.code])
      })
    }).catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorList[errorCode])
    });
}else if(LoginedUser){
                swal({
                    title: '請輸入你的密碼',
                    input: 'password',
                    text: '電子郵件：' + LoginedUser.email
                }).then((P) => {
                    var credential =
                        firebase.auth.EmailAuthProvider.credential(LoginedUser.email, P.value)
                    LoginedUser.reauthenticateAndRetrieveDataWithCredential(credential).then((Usp) => {
                        var user = firebase.auth().currentUser
                        user.delete().then(function(){
                    
 window.location.href=SETS$page.login
             })//end delete then
          }).catch(function(error){
                        alert(errorList[error.code])
             })
                    //end reAuth
                })
                //end input pwd swal
            } else {
                swal(
                    '錯誤',
                    '你並不在登入狀態',
                    'error'
                );
            } //end if(LoginedUser)
        } else {
            //取消刪除
        } //end if(result.value)
    })

}

function writeInfoToDOM(){
  if(LoginedUser.emailVerified){
    $('#btnVEmail').hide()
    $('#btnVEmail2').hide()
  }else{
    notificationNums++
    $('#btnVEmail').show()
    $('#btnVEmail2').show()
  }

  if(LoginedUser.displayName){
    $("#infoName").html(
      ` <strong>${LoginedUser.displayName.replace(/</g,"").replace(/>/g,"")}</strong>`
    )
    $('#noname').hide()
  }else{
    $("#infoName").html()
    $('#noname').show()
    notificationNums++
  }


  $("#infoEmail").html(
      `Email: <strong>${LoginedUser.email}</strong>`
  )
  
  if(LoginedUser.photoURL){
    $('#infoPicture')
     .attr('src',LoginedUser.photoURL)
    $('#noPic').hide()
  }else{
    $('#infoPicture').hide()
  }
  $('#infoDiv').show()
  $('#no_login').hide()
  $('#loadding').hide()
  $("#notification_nums").text(notificationNums)
}

function doVEmail(){
  swal({
        title: '通知',
        html: "要寄送驗證郵件嗎?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消'
    }).then((result) => {
        if (result.value) {
          LoginedUser.sendEmailVerification()
              .then(function() {
            alert('郵件已寄出')
          }).catch(function(error) {
            alert(error.code)
          });
        }
    })
}

function doSetName(){
  LoginedUser.updateProfile({
      displayName: $('#nameResetInput').val()
  }).then(function() {
      location.reload()
  }).catch(function(error) {
      alert(error.code)
  });
  
}

function doSetPic(){
  LoginedUser.updateProfile({
      photoURL: $('#insertPhoto').val()
  }).then(function() {
      alert(`設定完成`)
      location.reload()
  }).catch(function(error) {
      alert(error.code)
  });
  
}

var database = firebase.database();
  firebase.database().ref('/info/currency')

function writeCoinToPage(arr,user){
  
  $('#coin_waitrun').show()
  $('#coin_waitrun_text').hide()
  $("#userCoinF").html(`
   ${arr[2]} 枚
  `)
   
}
