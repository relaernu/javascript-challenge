var events = data;

// Add table to target div
// target <div>
var id_target = "datatable";
document.getElementById(id_target).innerHTML = createTable(events);

// function to create the table
function createTable(source) {
    // <table> tag
    var table = "<table class=\"table table-striped table-bordered\">";
    
    // table header start
    table += "<thead>";
    table += "<tr>";
    // Create header
    Object.entries(source[0]).forEach(function([key, value]) {
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
    source.forEach(function(ev) {
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

var id_shape = "shape";
document.getElementById(id_shape).innerHTML = createShapeSelList(events);

// create shape select list
function createShapeSelList(source) {
    var sel = "<option>All</option>";
    var shapes = [];
    source.forEach(function(ev) {
        if(!shapes.includes(ev.shape)) {
            shapes.push(ev.shape);
        }
    });
    shapes.forEach(function(shape) {
        sel += `<option>${shape}</option>`;
    });
    return sel;
}

// add event to search button
var id_searchSection = "search";
var id_searchText = "searchText";
var id_searchForm = "searchForm";
var id_searchResult = "searchResult";
document.getElementById(id_searchForm).addEventListener("submit", search);

function createSearchText(date) {
    return `<h1>Search date: <span class="badge badge-info">${date}</span></h1>`;
}

function search(event) {
    event.preventDefault();

    // get current input
    form = document.getElementById(id_searchForm);
    var date = form.elements[0].value;

    // if not dd/mm/yyyy format, 
    var dateparts = date.split("/");
    if(dateparts.length != 3) {
        alert("Wrong date format, input as \"dd/mm/yyyy\".");
        return;
    }
    var d = new Date(`${dateparts[2]}-${dateparts[1]}-${dateparts[0]}`);
    if(isNaN(d)) {
        alert("Wrong date format, input as \"dd/mm/yyyy\".");
        return;
    }
    
    // to get rid of the first 0 for day and month digit
    str_date = (dateparts[0][0] == 0 ? dateparts[0][1] : dateparts[0]) + "/" +
                (dateparts[1][0] == 0 ? dateparts[1][1] : dateparts[1]) + "/" +
                dateparts[2];

    // show the search criteria
    document.getElementById(id_searchText).innerHTML = createSearchText(str_date);

    // get the filter data
    filter_events = events.filter(ev => ev.datetime === str_date);

    // // show the filter data
    if(filter_events.length != 0) {
        document.getElementById(id_searchResult).innerHTML = createTable(filter_events);
    }
    else {
        document.getElementById(id_searchResult).innerHTML = "<h3>No result found on that day.";
    }

    // scroll to search section
    document.getElementById(id_searchSection).scrollIntoView();

}