
// function makeResponsive(){
//   var svgArea = d3.select("body").select("svg");

//   // clear svg is not empty
//   if (!svgArea.empty()) {
//     svgArea.remove();
//   }
  // Define SVG area dimensions
  var svgWidth = 960;
  var svgHeight = 660;

  // Define the chart's margins as an object
  var chartMargin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
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

    var dateParser = d3.timeParse("%m/%d/%Y")	
    
    winedata_jn.forEach(function(data){
      data.date = dateParser(data.Vintage);
      data.Points = +data.Points;
      data.Year = +data.Year;
      data.Price = +data.Price;
      // console.log(data.Points);
      // console.log(data.Year);
    });

    // var topPoints = winedata_jn.sort((a, b) => b.Points - a.Points);

    // topPoints.forEach(function(data){
    //   data.Vintage = data.Vintage;
    //   data.Points = +data.Points;
    //   data.Year = +data.Year;
    //   // console.log(data.Points);
    //   // console.log(data.Year);
    // });

    var topPoints  = winedata_jn.sort((a, b) => b.date - a.date)
    var italianwine = winedata_jn.filter(d => d.Country === 'Italy')
  
    
    
    

    // var topWines = topPoints.filter(d => d.year > 2000)
    // var winedata_jn = topPoints.slice(0,10);

    // winedata_jn.forEach(function(data){
    //   data.Vintage = data.Vintage;
    //   data.Points = +data.Points;
    //   data.Year = +data.Year;
      
    //   // console.log(data.Points);
    //   // console.log(data.Year);
    // });

    var xTimeScale = d3.scaleTime()
      .domain([10,d3.max(italianwine, d => d.date)])
      .range([0, chartWidth])
     
    
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(italianwine, d => d.Points), d3.max(italianwine, d => d.Points)])
      // .domain([d3.min(topPoints, d => d.Price), d3.max(topPoints, d => d.Price)-600])
      .range([chartHeight, 0]);
     
     

    var leftAxis = d3.axisLeft(yLinearScale)
    var bottomAxis = d3.axisBottom(xTimeScale).ticks(8)

    chartGroup.append('g')
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    chartGroup.append('g')
      .call(leftAxis);

    var line = d3.line()
      .x(d => xTimeScale(d.date))
      .y(d => yLinearScale(d.Points));

    chartGroup.append("chart")
      .data([italianwine])
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "purple")


    var circlesGroup=  chartGroup.selectAll("circle")
        .data(italianwine)
        .enter()
        .append("circle")
        .attr("class", "chart")
        .attr("cx", d => xTimeScale(d.date))
        .attr("cy", d => yLinearScale(d.Points))
        .attr("r", "10")
        .attr("fill", "purple")
        .attr("stroke-width", "1")
        .attr("stroke", "black")
        ;

    var dateFormatter = d3.timeFormat("%Y")

    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .style("display", "block")
      .html(function(d) {
        return (`<strong>${d.Title}</strong><br>Vintage: ${dateFormatter(d.date)}<br> Variety: ${d.Variety}<br> Country: ${d.Country}<br> Points: ${d.Points}<br> Price: ${d.Price}<br> Winery: ${d.Winery}<strong><strong><hr><br>${d.Points}
        `);
      });
    
    chartGroup.call(toolTip);

    circlesGroup.on("mouseover", function(d){
      toolTip.show(d, this);
    })

      .on("mouseout", function(d){
        toolTip.hide(d);
      })
      .on("click", function(d, i) {
        alert(`Hey! You clicked bar ${topPoints[i]}!`);
      });
  


    

    // var toolTip = d3.select(".chart")
    //   .append("div")
    //   .attr("class","tooltip");

    // circlesGroup.on("mouseover", function(d) {
    //   toolTip.style("display", "block")
    //       .html(
    //         `<strong>${d.Title}</strong><br> Variety: ${d.Variety}<br> Country: ${d.Country}<br> Points: ${d.Points}<br> Price: ${d.Price}<br> Winery: ${d.Winery}`)
    //       .style("left", d3.event.pageX + "px")
    //       .style("top", d3.event.pageY + "px");
    // })

    // chartGroup.on("click", function(data) {
    //   toolTip.style("display", "block")
    //   toolTip.html(`<strong>${d.Title}</strong><br> Variety: ${d.Variety}<br> Country: ${d.Country}<br> Points: ${d.Points}<br> Price: ${d.Price}<br> Winery: ${d.Winery}`)
    //     .style("left", d3.event.pageX + "px")
    //     .style("top", d3.event.pageY + "px")
    //     ;
    // })

    

    
  }).catch(function(error){
    console.log(error);
  });
// }
// // When the browser loads, makeResponsive() is called.
// makeResponsive();

// // When the browser window is resized, makeResponsive() is called.
// d3.select(window).on("resize", makeResponsive);