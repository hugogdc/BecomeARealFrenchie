const btnFact = document.getElementById("btnFact");
btnFact.addEventListener("click", factFrance);

function factFrance(){
    console.log('button pressed');
    var x = Math.floor(Math.random() * data.length);
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getFact?", true);
    xhttp.send();
    console.log("Ajax request sent: ");

    xhttp.addEventListener('load', function(){
        if (xhttp.status === 200 && xhttp.readyState === 4){    
            var response = JSON.parse(xhttp.responseText);
            console.log(response);
            document.getElementById("paragraphe").innerHTML = response;
        }
    });    
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

function logout() {
    console.log("login out ...")
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    location.replace('/');
}

// if LOGED IN
if(getCookie("logedin") == "true"){
    document.getElementById("accountImg").style.display = "inline";
    document.getElementById("logoutBtn").style.display = "inline";
    document.getElementById("username_").innerHTML = getCookie("pseudo");
    document.getElementById("username_").style.display = "inline";
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logedin").style.width = "300px";
    
}