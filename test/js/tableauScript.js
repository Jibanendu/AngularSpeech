function initViz(eventFound) {
   //location.reload();
  var LOADED_INDICATOR = 'tableau.loadIndicatorsLoaded';
   var COMPLETE_INDICATOR = 'tableau.completed';

     //var valueCheck=document.getElementById('a').value;
     var valueCheck=eventFound;
     console.log('Found'+valueCheck);
     var res = valueCheck.toUpperCase();
     loadJSON(function(json) {
       var out = "";
       var count =0;
       var jsonData = JSON.parse(json);
       for (var i=0;i<jsonData.length;i++) {
         var checkValue = jsonData[i].display.match(res);
           if(checkValue)
           {
             console.log(jsonData[i].display);
             count =count+1;
             out += '<a href="' + jsonData[i].url + '">' + count+'.)'+ jsonData[i].display + '</a><br>';
             matched_data.push(jsonData[i].display);

           }
         }
         document.getElementById("id01").innerHTML = out;
         var x = document.getElementById("speechButton");
         var y = document.getElementById("results");
         var resultHide=document.getElementById("result");
         var buttonHide=document.getElementById("optionButton");

         x.style.display = "none";
         y.style.display ="none";
         resultHide.style.display = "block";
         buttonHide.style.display="block";
         if(out==null||out=="")
         {
           var msg = new SpeechSynthesisUtterance('No reports to display');
           window.speechSynthesis.speak(msg);
         }
         else {
           console.log('Value Found'+out);
           var msg = new SpeechSynthesisUtterance('Select an option');
           window.speechSynthesis.speak(msg);
         }
     });

 }

 var matched_data = [];

 function initViz1(eventFound){
    var LOADED_INDICATOR = 'tableau.loadIndicatorsLoaded';
    var COMPLETE_INDICATOR = 'tableau.completed';
      //var valueCheck=document.getElementById('a').value;
    var valueCheck=eventFound;
    var res = valueCheck.toUpperCase();
    loadJSON(function(json) {
      var out = "";
      var count =0;
      var jsonData = JSON.parse(json);
      console.log("matched_data",matched_data.length);
      for (var i=0;i<matched_data.length;i++) {
        //var checkValue = matched_data[i]..match(res);
          if(checkValue)
          {
            console.log(jsonData[i].display);
            count =count+1;
          //  out += '<a href="' + jsonData[i].url + '">' + count+'.)'+ jsonData[i].display + '</a><br>';

            console.log(jsonData[i].url);
            window.open(jsonData[i].url);

          }
        }
        document.getElementById("id01").innerHTML = out;

        if(out==null||out=="")
        {
          var msg = new SpeechSynthesisUtterance('No reports to display');
          window.speechSynthesis.speak(msg);
        }
        else {
          console.log('Value Found'+out);
          var msg = new SpeechSynthesisUtterance('Select an option');
          window.speechSynthesis.speak(msg);

          //document.getElementById("firstTextField").style.display='block';
        }
    });


 }

 function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data_check.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }

 function tableauCheck(a)
 {
   var vizLoaded = false;
   var LOADED_INDICATOR = 'tableau.loadIndicatorsLoaded';
   var COMPLETE_INDICATOR = 'tableau.completed';
   var urlCreation = "http://public.tableau.com/views/RegionalSampleWorkbook/"+a
   console.log('urlCreation:'+urlCreation);
   var containerDiv = document.getElementById("vizContainer"),
       url = urlCreation,
       options = {
           hideTabs: true,
           onFirstInteractive: function (e) {
               console.log("Run this code when the viz has finished loading.");
               workbook = viz.getWorkbook();
               activeSheet = workbook.getActiveSheet();
               }
       };
   var viz = new tableau.Viz(containerDiv, url, options);
   window.addEventListener('message', function(msg) {
    if (isMessage(msg.data, LOADED_INDICATOR)) {
      vizLoaded = true;
    } else if (isMessage(msg.data, COMPLETE_INDICATOR)){
      if (vizLoaded) {
        alert('viz loaded successfully!')
      } else {
        alert('viz failed to load!');
      }
    }
  });
 }
