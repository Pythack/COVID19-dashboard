document.addEventListener("DOMContentLoaded", function() {
  function chart_get(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert('responseText: ' + xmlhttp.responseText);
      try {
          var response = xmlhttp.status;
          var astro = JSON.parse(xmlhttp.responseText);
          //var headers = xmlhttp.getAllResponseHeaders().toLowerCase();
          //alert(headers['X-Rate-Limit-Remaining']);
      } catch(err) {
          console.warn(err.message + " in " + xmlhttp.responseText);
          return;
      }
      callback(astro, response);
  }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  }


  var addtochart = document.getElementById('addtochart');
  addtochart.addEventListener('click', function() {
    country = document.getElementById('country').value;
    country.replace(' ', '-');
    chart_get('https://api.covid19api.com/country/' + country + '/status/confirmed', function(data) {
      var chart_data = [{
      x: [data[0]['country']],
      y: [data[data.length - 1]['cases']],
      type: 'bar'
      }];
      Plotly.newPlot('country_chart', chart_data);
    });
  });
});
