function CSVToArray(strData) {
    strDelimiter = ",";
    var objPattern = new RegExp(("(\\" + strDelimiter + "|\\r?\\n|\\r|^)" + "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {
        var strMatchedDelimiter = arrMatches[1];
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            arrData.push([]);
        }
        if (arrMatches[2]) {
            var strMatchedValue = arrMatches[2].replace(
            new RegExp("\"\"", "g"), "\"");
        } else {
            var strMatchedValue = arrMatches[3];
        }
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    return (arrData);
}

function CSV2JSON(csv) {
    var array = CSVToArray(csv);
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
        objArray[i - 1] = {};
        for (var k = 0; k < array[0].length && k < array[i].length; k++) {
            var key = array[0][k];
            objArray[i - 1][key] = array[i][k]
        }
    }
    var json = JSON.stringify(objArray);
    var str = json.replace(/},/g, "},\r\n");
    return str;
}

function openFile(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(event){
        var reader = event.target;
        var text = reader.result;
        var Output;
        var JSONoutput = CSV2JSON(text);
        var username = document.getElementById('user').value;
        var password = document.getElementById('pass').value;
        var email = document.getElementById('email').value;
        var mealP = document.querySelector('input[name="mealP"]:checked').value;
        window.location.replace("/user/" + username);
        $.post("http://jumbosavings.herokuapp.com/submit.json", {
            username: username,
            password: password,
            email: email,
            mealPlan: mealP,
            json: JSONoutput
        });
    };
    reader.readAsText(input.files[0]);
}

$(document).ready(function(){
    $("#file").change(function(e){
        openFile(e);
    });
});