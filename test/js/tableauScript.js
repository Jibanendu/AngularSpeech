function initViz(eventFound) {
  var LOADED_INDICATOR = 'tableau.loadIndicatorsLoaded';
   var COMPLETE_INDICATOR = 'tableau.completed';
     //var valueCheck=document.getElementById('a').value;
     var valueCheck=eventFound;
     console.log('Found'+valueCheck);
     //var urlCreation="http://public.tableau.com/views/RegionalSampleWorkbook/"+valueCheck;
     tableauCheck(valueCheck);
 }

 function tableauCheck(a)
 {
   var vizLoaded = false;
   var LOADED_INDICATOR = 'tableau.loadIndicatorsLoaded';
   var COMPLETE_INDICATOR = 'tableau.completed';
   var urlCreation = "http://public.tableau.com/views/RegionalSampleWorkbook/"+a
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
