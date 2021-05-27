d3.json('static/data/winedata_jn.json').then((importedData) => {
    var winedata_jn = importedData;
    console.log(winedata_jn);
    
    d3.select("tbody")
        .selectAll("tr")
        .data(winedata_jn)
        .enter()
        .append("tr")
        .html(function(d) {
        return `<td>${d.Vintage}</td><td>${d.Country}</td><td>${d.County}</td><td>${d.Designation}</td><td>${d.Points}</td><td>${d.Price}</td><td>${d.Province}</td><td>${d.Title}</td><td>${d.Variety}</td><td>${d.Winery}</td><td>${d.Year}</td>`;
        });
});

// var button = d3.select("#filter-btn");
// var form = d3.select("#form");

// // // Create event handlers 
// button.on("click", runEnter);
// form.on("submit", runEnter);

// function runEnter() {
//     // Prevent the page from refreshing
    
//     d3.event.preventDefault();
//     // tbody.html("");
    
//     var inputElement = d3.select("#input");
//     var inputValue = inputElement.property("value");
//     console.log(inputValue);
    
    

//     var filteredData = winedata_jn.filter(date => date.Country === inputValue 
//         // ||
//         // date.County === inputValue ||
//         // date.Designation === inputValue ||
//         // date.Points === inputValue ||
//         // date.Price === inputValue ||
//         // date.Province === inputValue ||
//         // date.Title === inputValue ||
//         // date.Variety === inputValue ||
//         // date.Winery === inputValue ||
//         // date.Year === inputValue
//         );
    

//     filteredData.forEach(function(date) {
//       var tbody=  d3.select("tbody")
//         // .selectAll("tr")
//         // .data(winedata_jn)
//         // .enter()
//         // .append("tr")
//         // .html(function(d) {
//         //     return `<td>${d.Country}</td><td>${d.County}</td><td>${d.Designation}</td><td>${d.Points}</td><td>${d.Price}</td><td>${d.Province}</td><td>${d.Title}</td><td>${d.Variety}</td><td>${d.Winery}</td><td>${d.Year}</td>`;
//         //   });
//     // //     console.log(f);
//         var row = tbody.append("tr");
//         Object.entries(date).forEach(function([key, value]) {
//             // console.log(key, value);
//             var cell = row.append("td");
//             cell.text(value);
//         });
//     });
// };