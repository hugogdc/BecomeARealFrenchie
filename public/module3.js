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