function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

function logout() {
    console.log("login out ...")
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
}

// if LOGED IN
if(getCookie("logedin") == "true"){
    document.getElementById("accountImg").style.display = "inline";
    document.getElementById("logoutBtn").style.display = "inline";
    document.getElementById("username_").innerHTML = getCookie("pseudo");
    document.getElementById("username_").style.display = "inline";
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logedin").style.width = "300px";
    document.getElementById("user_").innerHTML =  getCookie("pseudo");
    document.getElementById("user_").style.fontSize = "150%";
    document.getElementById("module1").innerHTML =  "module1 : \n" + getCookie("module1");
    document.getElementById("module2").innerHTML =  "module2 : \n" + getCookie("module2");
    // document.getElementById("module3").innerHTML =  "module3 : \n" + getCookie("module3");


}