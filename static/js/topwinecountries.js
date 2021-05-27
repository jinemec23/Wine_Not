
function makeResponsive(){
  var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }
  // Define SVG area dimensions
  var svgWidth = 960;
  var svgHeight = 660;

  // Define the chart's margins as an object
  var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
  };

  // Define dimensions of the chart area
  var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
  var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

  // Select body, append SVG area to it, and set the dimensions
  var svg = d3.select("body")
  // var svg = d3.select(".bar")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

  // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  // Load data from csv

  d3.json('static/data/winedata_jn.json').then((importedData) => {
    var winedata_jn = importedData;
    // console.log(winedata_jn);
    
    winedata_jn.forEach(function(data){
      data.Vintage = data.Vintage;
      data.Points = +data.Points;
      data.Year = +data.Year;
      // console.log(data.Points);
      // console.log(data.Year);
    });

    var topPoints = winedata_jn.sort((a, b) => b.Points - a.Points);

    var topWines = topPoints.slice(0,50);


    var xBandScale = d3.scaleBand()
    .domain(topWines.map(data => data.Country))
    .range([0, chartWidth])
    .padding(0.1);
    
    var yLinearScale = d3.scaleLinear()
    .domain([90, d3.max(topWines, data => data.Points)])
    .range([chartHeight, 0])



    var bottomAxis = d3.axisBottom(xBandScale)
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

    chartGroup.append('g')
    .call(leftAxis);

    chartGroup.append('g')
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`<strong>${d.Title}</strong>Variety: ${d.Variety}<br> Country: ${d.Country}<br> Points: ${d.Points}<br> Price: ${d.Price}<br> Winery: ${d.Winery}<strong><strong><hr><br>${d.Points}
      `);
    });
  
    chartGroup.call(toolTip);

    var barsGroup = chartGroup.selectAll(".bar")
      .data(topWines)
      .enter()
      .append("rect")
      .attr("fill","purple")
      // .attr("fill", function(d) { return color(d.key); })
      .attr("class", "bar")
      .attr("x", data => xBandScale(data.Country))
      .attr("y", data => yLinearScale(data.Points))
      .attr("width", xBandScale.bandwidth())
      .attr("height", data => chartHeight - yLinearScale(data.Points))
      
    barsGroup.on("mouseover", function(d){
          toolTip.show(d, this)
        .transition
        .duration(15)
        .attr("fill","red");
        })
        .on("mouseout", function(d){
          toolTip.hide(d)
                .attr("fill", "purple");
        });

     



//       var toolTip = d3.select("body")
//       .append("div")
//       .attr("class","tooltip");

//     // circlesGroup.on("mouseover", function(d) {
//     //   toolTip.style("display", "block")
//     //       .html(
//     //         `<strong>${d.Title}</strong><br> Variety: ${d.Variety}<br> Country: ${d.Country}<br> Points: ${d.Points}<br> Price: ${d.Price}<br> Winery: ${d.Winery}`)
//     //       .style("left", d3.event.pageX + "px")
//     //       .style("top", d3.event.pageY + "px");
//     // })

// chartGroup.on("click", function(data) {
//       toolTip.style("display", "block")
//       toolTip.html(`<strong>${data.Title}</strong><br> Variety: ${data.Variety}<br> Country: ${data.Country}<br> Points: ${data.Points}<br> Price: ${data.Price}<br> Winery: ${data.Winery}`)
//         .style("left", d3.event.pageX + "px")
//         .style("top", d3.event.pageY + "px")
//         ;
//     })
    // var toolTip = d3.tip()
    // .attr("class", "tooltip")
    // .offset([80, -60])
    // .html(function(d) {
    //   return (`<strong>${d.Title}</strong><br> Variety: ${d.Variety}<br> Country: ${d.Country}<br> Points: ${d.Points}<br> Price: ${d.Price}<br> Winery: ${d.Winery}`)
    // });
  
    // chartGroup.call(toolTip);
  
    // chartGroup.on("click", function(data) {
    //   toolTip.show(data, this);
    // })
    //   // onmouseout event
    //   .on("mouseout", function(data, index) {
    //     toolTip.hide(data);
    //   });
    
  }).catch(function(error){
    console.log(error);
  });
}
// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);

// d3.csv("Data/red.csv").then(function(rwineData) {

//   console.log(rwineData);

//   // Cast the rating
//   rwineData.forEach(function(d) {
//     d.rating = +d.rating;
//   });

//   // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
//   var xBandScale = d3.scaleBand()
//     .domain(rwineData.map(d => d.name))
//     .range([0, chartWidth])
//     .padding(0.1);

//   // Create a linear scale for the vertical axis.
//   var yLinearScale = d3.scaleLinear()
//     .domain([0, d3.max(rwineData, d => d.rating)])
//     .range([chartHeight, 0]);

//   // Create two new functions passing our scales in as arguments
//   // These will be used to create the chart's axes
//   var bottomAxis = d3.axisBottom(xBandScale);
//   var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

//   // Append two SVG group elements to the chartGroup area,
//   // and create the bottom and left axes inside of them
//   chartGroup.append("g")
//     .call(leftAxis);

//   chartGroup.append("g")
//     .attr("transform", `translate(0, ${chartHeight})`)
//     .call(bottomAxis);

//   // Create one SVG rectangle per piece of tvData
//   // Use the linear and band scales to position each rectangle within the chart
//   chartGroup.selectAll(".bar")
//     .data(rwineData)
//     .enter()
//     .append("rect")
//     .attr("class", "bar")
//     .attr("x", d => xBandScale(d.name))
//     .attr("y", d => yLinearScale(d.rating))
//     .attr("width", xBandScale.bandwidth())
//     .attr("height", d => chartHeight - yLinearScale(d.rating));

// }).catch(function(error) {
//   console.log(error);
// });
  