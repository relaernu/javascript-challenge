var events = data;

// Add table to target div
// target <div>
var target = "datatable";
document.getElementById(target).innerHTML = createTable();

// function to create the table
function createTable() {
    // <table> tag
    var table = "<table class=\"table table-striped table-bordered\">";
    
    // table header start
    table += "<thead>";
    table += "<tr>";
    // Create header
    Object.entries(events[0]).forEach(function([key, value]) {
        table += "<th>";
        table += key;
        table += "</th>";
    });

    // table header close
    table += "</tr>";
    table += "</thead>";

    // Create body
    table += "<tbody>";

    // Create rows
    events.forEach(function(ev) {
        table += "<tr>";
        Object.entries(ev).forEach(function([key, value]) {
            table += "<td>";
            table += value;
            table += "</td>";
        });
        table += "</tr>";
    });
    // </table> tag
    table += "</tbody>"
    table += "</table>"

    return table;
}
// end of adding table


// add event to search button
id_search = "searchForm"
document.getElementById(id_search).addEventListener("onsubmit", function() {

});

function searchEvent(event) {

}