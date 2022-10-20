let levels=[[["manger","boire","dormir"],["drinking","slepping", "eating"],[3,1,2]]]
var x=0;
let cpt=0;
document.getElementById('R1').innerHTML = levels[cpt][0][0];
document.getElementById('R2').innerHTML = levels[cpt][0][1];
document.getElementById('R3').innerHTML = levels[cpt][0][2];
document.getElementById('C1').innerHTML = levels[cpt][1][0];
document.getElementById('C2').innerHTML = levels[cpt][1][1];
document.getElementById('C3').innerHTML = levels[cpt][1][2];




function select_R(n){
    
}


document.getElementById("R1").addEventListener("click",function(){x+=1; console.log("compteur:"+x)});
document.getElementById("R2").addEventListener("click",function(){});
document.getElementById("R3").addEventListener("click",function(){});
