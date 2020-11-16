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

chart_get('https://api.covid19api.com/countries', function(data) {
  console.log(data);
})
