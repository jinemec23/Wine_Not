d3.json('static/data/winedata_jn.json').then((importedData) => {
    var winedata_jn = importedData;
    console.log(winedata_jn);


    // d3.select("#wine-table")
    //     .select("tbody")
    //     .selectAll("tr")
    //     .data(winedata_jn)
    //     .enter()
    //     .append("tr")
    //     .html(function(d) {
    //     return `<td>${d.Vintage}</td><td>${d.Country}</td><td>${d.County}</td><td>${d.Designation}</td><td>${d.Points}</td><td>${d.Price}</td><td>${d.Province}</td><td>${d.Title}</td><td>${d.Variety}</td><td>${d.Winery}</td><td>${d.Year}</td>`;
    // });
    var tbody = d3.select('tbody');
    var button = d3.select("#filter-btn");
    var form = d3.select("#form");

    // // Create event handlers 
    button.on("click", runEnter);
    form.on("submit", runEnter);

    // importedData.forEach(function(winedata_jn) {
    //     console.log(winedata_jn);
    //     var row = tbody.append("tr");
    //     Object.entries(winedata_jn).forEach(function([key, value]){
    //         console.log(key, value);
    //         var cell = row.append("td");
    //         cell.text(value);
    //     });

    // });

    function runEnter() {
        // Prevent the page from refreshing
    
        d3.event.preventDefault();
        tbody.html("");
        
        var inputElement = d3.select("#input");
        var inputValue = inputElement.property("value");
        console.log(inputValue);
        var filteredData = winedata_jn.filter(date => date.Country === inputValue ||
           date.Variety === inputValue ||
           date.County === inputValue ||
           date.Year === inputValue);
        console.log(filteredData);

        filteredData.forEach(function(date) {
            console.log(date);
            var row = tbody.append("tr");
            Object.entries(date).forEach(function([key, value]) {
                // console.log(key, value);
                var cell = row.append("td");
                cell.text(value);
            });
        });
    }
});