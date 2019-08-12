var arr = [];
     var flipped = [];
     var nflipped = 0;
     var ncards = 0;
     var date;
     var x;
     function aniFlip(elem){
         elem.classList.toggle("flip");
     }
     function control(elem){
        var t = 500;
         switch(flipped.length){
             case 0:
                 if(elem.classList != 'memcontainer flip'){
                    flipped.push(elem);
                    aniFlip(elem);
                 }
                 break;
             case 1:
                 if(flipped[0] != undefined && elem != flipped[0]){
                flipped.push(elem);
                 aniFlip(elem);
                     setTimeout(function(){if(flipped[0].lastElementChild.src != flipped[1].lastElementChild.src){
                         aniFlip(flipped[0]);
                         aniFlip(flipped[1]);
                     }else{nflipped += 2; 
                           t = 0;
                           flipped[0].style.pointerEvents = 'none';
                           flipped[1].style.pointerEvents = 'none';
                        if(nflipped == ncards){
                         clearInterval(x);
                         alert("Congratulations you have won! with " +  document.getElementById("time").innerHTML);
                     }}setTimeout(function(){flipped = [];}, t);}, t+300);
                 
                 }
                 break;
             default:
                 break;
         }
     }
     function start(){
          date = new Date().getTime();
          x = setInterval(function(){
          var now = new Date().getTime();
          var distance = now - date;
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          document.getElementById("time").innerHTML = "Time: "+ hours.toString()+"h:"+minutes.toString()+"m:"+ seconds.toString()+"s";
          }, 1000);
          document.getElementById("Game").style.cursor = 'default';
          var con = document.getElementsByClassName('memcontainer');
          for(var i = 0; i < con.length; i++) {
            con[i].style.pointerEvents = 'auto';
            }
          var s = document.getElementById("button1");
          s.onclick = function(){reset()};
          s.innerHTML = "Reset";
         s = document.getElementById("button2");
         s.disabled = false;
         s.style.cursor = 'default';
         }
    function solve(){
        var con = document.getElementsByClassName('memcontainer');
        clearInterval(x);
        for(var i = 0; i < con.length; i++) {
            if(con[i].classList == 'memcontainer'){
                aniFlip(con[i]);
            }
        }
        nflipped = ncards;
        setTimeout(function(){alert("Sure you could call that a win");}, 500);
    }
    function reset(){
        document.getElementById("Game").style.cursor = 'not-allowed';
        var con = document.getElementsByClassName('memcontainer');
        for(var i = 0; i < con.length; i++) {
            if(con[i].classList == 'memcontainer flip'){
                aniFlip(con[i]);
            }
            con[i].style.pointerEvents = 'none';
        }
        var s = document.getElementById("button1");
        s.onclick = function(){start()};
        s.innerHTML = "Start";
        s = document.getElementById("button2");
         s.disabled = true;
         s.style.cursor = 'not-allowed';
        var t = 500;
        if( nflipped == 0 && flipped.length == 0){
            t = 0;
        }
        setTimeout(setImages, t);
    }
    function setImages(){
        nflipped = 0;
        flipped = [];
        document.getElementById("time").innerHTML = "Time: 0h:0m:0s";
        date = undefined;
        if(x != undefined){
            clearInterval(x);
        }
        arr = [];
        var e = document.getElementById("select");
       var nImg= e.options[e.selectedIndex].value;
        ncards = nImg*2;
        var myNode = document.getElementById("Game");
        myNode.innerHTML ='';
        for(var i = 1; i <= 38; i++){
            arr.push(i);
        }
        arr.sort(function(a,b){return 0.5 - Math.random()});
        arr = arr.slice(0, nImg);
        for(var i = 0; i < nImg; i++){
            arr.push(arr[i]);
        }
        arr.sort(function(a,b){return 0.5 - Math.random()});
        var text = "";
        for(var i = 0; i < nImg*2; i++){
            text += '<div class="memcontainer"><img src="images/back.png" class="memcardsf">\n<img src="images/cards/'+ arr[i].toString() +'.jpg"  class="memcardsb"></div>\n';
        }
        nCols = Math.ceil(Math.sqrt(nImg*2));
        while((nImg*2)%nCols != 0){
            nCols++;
        }
        nRows = (nImg*2)/nCols;
        myNode.innerHTML = text;
        var con = document.getElementsByClassName('memcontainer');
        for(i = 0; i < con.length; i++) {
            con[i].style.width= "calc("+(100/nCols).toString() + "% - 10px)"
            con[i].style.height = "calc("+(100/nRows).toString() + "% - 10px)" ;
            con[i].addEventListener("click",function(){ control(this);});
        }
        
    }