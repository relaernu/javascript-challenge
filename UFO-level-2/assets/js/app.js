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
    var sel = `<option value="">All</option>`;
    var shapes = [];
    source.forEach(function(ev) {
        if(!shapes.includes(ev.shape)) {
            shapes.push(ev.shape);
        }
    });
    shapes.forEach(function(shape) {
        sel += `<option value="${shape}">${shape}</option>`;
    });
    return sel;
}

// add event to search button
var id_searchSection = "search";
var id_searchText = "searchText";
var id_searchForm = "searchForm";
var id_searchResult = "searchResult";
var id_searchCriteria = "searchCriteria";
document.getElementById(id_searchForm).addEventListener("submit", search);
document.getElementById("startDate").addEventListener("change", datechange);
document.getElementById("endDate").addEventListener("change", datechange);

// to add event to start date and end date change
// make sure start date <= end date
function datechange(event) {
    var s_date = document.getElementById("startDate").value;
    var e_date = document.getElementById("endDate").value;
    // trigger by changing start date
    if(this.id === "startDate") {
        // end date has been selected or not
        if (e_date) {
            // if end date has been selected, is it earlier than start date?
            // if end date earlier than start date, make it the same as start date
            if(e_date < s_date) {
                document.getElementById("endDate").value = s_date;
            }
        }
    }
    // trigger by changing end date
    else {
        if (s_date) {
            if(e_date < s_date) {
                document.getElementById("startDate").value = e_date;
            }
        }
    }
}

function createSearchText(date) {
    return `<h1>Search date: <span class="badge badge-info">${date}</span></h1>`;
}

// to convert the date format in data set to "YYYY-MM-DD" format
function AusDateToStdDate(ausDate) {
    var splitDate = ausDate.split("/");
    return splitDate[2] + "-" + 
        (splitDate[1].length == 1 ?  `0${splitDate[1]}` : splitDate[1]) + "-" +
        (splitDate[0].length == 1 ?  `0${splitDate[0]}` : splitDate[0]);
}

function search(event) {
    event.preventDefault();

    // get current input
    form = document.getElementById(id_searchForm);
    var startDate = form.elements["startDate"].value;
    var endDate = form.elements["endDate"].value;
    var cities = form.elements["cities"].value;
    var states = form.elements["states"].value;
    var shape = form.elements["shape"].value;

    var filterdata = events;

    // get datetime later than start date
    if(startDate.length>0) {
        filterdata = filterdata.filter(x=>AusDateToStdDate(x.datetime) >= startDate);
    }

    // get datetime earlier than end date
    if(endDate.length>0) {
        filterdata = filterdata.filter(x=>AusDateToStdDate(x.datetime) <= endDate);
    }

    // filter states
    if (states.length > 0) {
        var state = states.split(",");
        var new_filter = [];
        state.forEach(x => new_filter = new_filter.concat(filterdata.filter(y => y.state == x)));
        filterdata = new_filter;
    }

    // filter cities
    if(cities.length > 0) {
        var city = cities.split(",");
        var new_filter = [];
        city.forEach(x => new_filter = new_filter.concat(filterdata.filter(y => y.city == x)));
        filterdata = new_filter;
    }

    // filter shapes
    if(shape.length > 0) {
        filterdata = filterdata.filter(x => x.shape === shape);
    }

    // Show search criterias
    var datestr = (startDate.length>0 || endDate.length>0) ? "Date" : "";
    var datefrom = startDate.length>0 ? ` from ${startDate}` : "";
    var dateto = endDate.length>0 ? ` to ${endDate}` : "";
    var dateall = datestr + datefrom + dateto;
    dateall = dateall.length > 0 ? `<spcn class="badge badge-info">${dateall}</span>` : ""; 
    var statestr = states.length > 0 ? `<span class="badge badge-info">States: ${states}</span>` : "";
    var citiesstr = cities.length > 0 ? `<span class="badge badge-info">Cities: ${cities}</span>` : "";
    var shapestr = shape.length > 0 ? `<span class="badge badge-info">Shape: ${shape}</span>` : "";

    var criteria = "<h1>Search for: </h1>" + dateall + statestr + citiesstr + shapestr;

    document.getElementById(id_searchCriteria).innerHTML = criteria;

    // show table
    document.getElementById(id_searchResult).innerHTML = createTable(filterdata);
}