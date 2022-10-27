let levels=[[["manger","boire","dormir"],["drinking","slepping", "eating"],[3,1,2]]]
var x=0,R=0,C=0;
var Ra=[0,0,0];
var Ca=[0,0,0];
let cpt=0;
document.getElementById('R1').innerHTML = levels[cpt][0][0];
document.getElementById('R2').innerHTML = levels[cpt][0][1];
document.getElementById('R3').innerHTML = levels[cpt][0][2];
document.getElementById('C1').innerHTML = levels[cpt][1][0];
document.getElementById('C2').innerHTML = levels[cpt][1][1];
document.getElementById('C3').innerHTML = levels[cpt][1][2];


function set_color(btn,cpt){
    color="";
    if(cpt==0){color="bisque"}
    if(cpt==1){color="cyan"}
    if(cpt==2){color="red"}
    if(cpt==3){color="green"}
    document.getElementById(btn).style.backgroundColor=color;
}

function check_true(){
    if(R==0||C==0){ return false;}
    console.log("C: "+C+" R: "+R);
    if(C==levels[cpt][2][R-1]){
        console.log("Good Answer");
        Ca[C-1]=-1;
        Ra[R-1]=-1;
        set_color("C"+C,3);
        set_color("R"+R,3);
        R=0;
        C=0;
    }else{console.log("Bad Answer");
    set_color("C"+C,2);
    set_color("R"+R,2);
    R=0;
    C=0;
}

}

function select_R(n,cpt){
    R=n;
    if (Ra[0]>-1){Ra[0]=0;set_color("R1",0);}
    if (Ra[1]>-1){Ra[1]=0;set_color("R2",0);}
    if (Ra[2]>-1){Ra[2]=0;set_color("R3",0);}
    if (Ra[n-1]>-1){Ra[n-1]=1;set_color("R"+n,1);}
    else{R=0;}   
    check_true();
}
function select_C(n,cpt){
    C=n;
    if (Ca[0]>-1){Ca[0]=0;set_color("C1",0);}
    if (Ca[1]>-1){Ca[1]=0;set_color("C2",0);}
    if (Ca[2]>-1){Ca[2]=0;set_color("C3",0);}
    if (Ca[n-1]>-1){Ca[n-1]=1;set_color("C"+n,1);}
    else{C=0;}  
    check_true(); 
}


document.getElementById("R1").addEventListener("click",function(){select_R(1)});
document.getElementById("R2").addEventListener("click",function(){select_R(2)});
document.getElementById("R3").addEventListener("click",function(){select_R(3)});

document.getElementById("C1").addEventListener("click",function(){select_C(1)});
document.getElementById("C2").addEventListener("click",function(){select_C(2)});
document.getElementById("C3").addEventListener("click",function(){select_C(3)});


function sendScore(){ // function activated when the user finished to answer the module1
    // it first get the user score
    // then it 
}