function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

function showData(data){
    var rows = [  "name", "price_eur", "last_updated"];

    var table = document.createElement("table");
    var row =  document.createElement('tr');
    rows.forEach(data => {
       var th =  document.createElement('th');
       var value = document.createTextNode(data);
       th.appendChild(value);
       row.appendChild(th);
    });
    table.appendChild(row);
    var data = JSON.parse(data);
    data.forEach(function(element) {
       var row =  document.createElement('tr');
       rows.forEach(key => {
            var td =  document.createElement('td');
            var value = document.createTextNode(element[key]);
            td.appendChild(value);
            row.appendChild(td);
       });
    table.appendChild(row);
}, this);

    var element = document.getElementById("list");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    element.appendChild(table);
}


function interval(){
     httpGetAsync('https://api.coinmarketcap.com/v1/ticker/?limit=100&convert=EUR', showData);
}

function loadData(event){
    httpGetAsync('https://api.coinmarketcap.com/v1/ticker/?limit=100&convert=EUR', showData);
    setInterval( interval, 30000);
}
