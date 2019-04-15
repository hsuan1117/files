/*<div class="alert alert-warning" role="alert" id="error_info"></div>

<p id="info">請輸入密碼，以顯示HTML。<br><span style="color:red;">請注意：在編輯模式中修改完畢後，不得再切換模式，這只會讓程式再次解碼而已。</span></p>
<br>
<textarea class="form-control" id="contentEn" placeholder="加密 CODE" rows="6"></textarea>
<hr/>
<input class="form-control" id="pwd" type="text" placeholder="密碼"/>
<br>
<div class="btn-group btn-block" role="group">
  <button type="button" class="btn btn-outline-success" id="submit_cody-mode" style="text-align: center;">複製模式</button>
  <button type="button" class="btn btn-outline-success" id="submit_edit-mode"style="text-align: center;">編輯模式</button>
</div>
<hr id="hr_hide"/>
<!--<button class="btn btn-outline-success btn-block" id="submitPwd" style="text-align: center;">解密</button>-->
<br>*/
$(() => {
    $('#error_info').hide()
    $('#result_copy').hide()
    $('#result_edit').hide()
    $('#hr_hide').hide()
// 複製模式
    $("#submit_cody-mode").click(() => {
      var code=$("#contentEn").val()
      $("#error_info").hide()
      $("#info").show()
      try {
        $("#result_copy").html(
          decodeURIComponent(
            CryptoJS.AES.decrypt(
              code,
              $("#pwd").val()
            ).toString(CryptoJS.enc.Utf8)
          )
        )
      var add_class = document.getElementById('submit_cody-mode');
      add_class.className += ' active';
      var del_class = document.getElementById("submit_edit-mode");
      del_class.classList.remove("active");
      $('#result_copy').show()
      $('#result_edit').hide()
      $('#hr_hide').show()

        } catch (e) {
            //alert('密碼錯誤')
            document.getElementById("error_info").className = "alert alert-warning";
            document.getElementById("error_info").setAttribute("class","alert alert-warning");
            document.getElementById('error_info').innerText='您所輸入的密碼錯誤'
            $("#error_info").show()
            $("#info").hide()
            $('#result_copy').hide()
            $('#result_edit').hide()
            $('#hr_hide').hide()
            var del = document.getElementById("submit_edit-mode");
            del.classList.remove("active");
            var del = document.getElementById("submit_copy-mode");
            del.classList.remove("active");

        }
        setTimeout(() => {
            if ($("#result").html() == "") {
                //alert('密碼錯誤')
                document.getElementById("error_info").className = "alert alert-warning";
                document.getElementById("error_info").setAttribute("class","alert alert-warning");
                document.getElementById('error_info').innerText='您所輸入的密碼錯誤'
                $("#error_info").show()
                $("#info").hide()
                $('#result_copy').hide()
                $('#hr_hide').hide()
                $('#result_edit').hide()
                var del = document.getElementById("submit_edit-mode");
                del.classList.remove("active");
                var del = document.getElementById("submit_copy-mode");
                del.classList.remove("active");
            }
        }, 500)
    })
// 編輯模式
    $("#submit_edit-mode").click(() => {
      var code=$("#contentEn").val()
      $("#error_info").hide()
      $("#info").show()
      try {
        $("#result_edit").html(
          decodeURIComponent(
            CryptoJS.AES.decrypt(
              code,
              $("#pwd").val()
            ).toString(CryptoJS.enc.Utf8)
          )
        )
      var add_class_edit = document.getElementById('submit_edit-mode');
      add_class_edit.className += ' active';
      var del = document.getElementById("submit_cody-mode");
      del.classList.remove("active");
      $('#result_copy').hide()
      $('#result_edit').show()
      $('#hr_hide').show()

        } catch (e) {
            //alert('密碼錯誤')
            document.getElementById("error_info").className = "alert alert-warning";
            document.getElementById("error_info").setAttribute("class","alert alert-warning");
            document.getElementById('error_info').innerText='您所輸入的密碼錯誤'
            $("#error_info").show()
            $("#info").hide()
            $('#result_copy').hide()
            $('#result_edit').hide()
            $('#hr_hide').hide()
            var del = document.getElementById("submit_edit-mode");
            del.classList.remove("active");
            var del = document.getElementById("submit_copy-mode");
            del.classList.remove("active");
        }
        setTimeout(() => {
            if ($("#result").html() == "") {
                //alert('密碼錯誤')
               document.getElementById("error_info").className = "alert alert-warning";
                document.getElementById("error_info").setAttribute("class","alert alert-warning");
                document.getElementById('error_info').innerText='您所輸入的密碼錯誤'
                $("#error_info").show()
                $("#info").hide()
                $('#result_copy').hide()
                $('#result_edit').hide()
                $('#hr_hide').hide()
                var del = document.getElementById("submit_edit-mode");
                del.classList.remove("active");
                var del = document.getElementById("submit_copy-mode");
                del.classList.remove("active");
            }
        }, 500)
    })
})
/*
<textarea rows="6" class="form-control h-100" id="result_copy" onclick="select();document.execCommand('copy');alert('已複製');" readonly=""></textarea>
<textarea rows="18" class="form-control " id="result_edit"></textarea>
*/

