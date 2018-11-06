/* Password Protection */

var password=prompt('這個頁面已經被鎖住,請輸入密碼','');
if (password != 'blogadmin') {
window.location.reload()
}
