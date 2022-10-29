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
    document.getElementById("username_").style.display = "inline";
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logedin").style.width = "300px";
    
    // relative only to index.html
    document.getElementById("module1a").href = "/module1";
    document.getElementById("module2a").href = "/module2";
    document.getElementById("module3a").href = "/module3";
}