/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/


d3.csv("data/scatter.csv").then((data) => {
    let svg3 = d3
    .select("#csv-scatter")
    .append("svg")
    .attr("width", width-margin.left-margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);



    // find the max Y from data1's score coloumn 
  let maxY3 = d3.max(data, (d) => { return d.score; }); 
  console.log("Max y: " + maxY3);

  let maxX3 = d3.max(data, (d) => {return d.day; });
  
  // map our data values (domain for the scale function) to our
  // pixel values (range for the scale function)  
  let yScale3 = d3.scaleLinear()
              .domain([0,maxY3])
              .range([height-margin.bottom,margin.top]); 
  
  // map our data values (domain for the scale function) to our
  // pixel values (range for the scale function)
  let xScale3 = d3.scaleLinear()
              .domain([0, maxX3])
              .range([margin.left, width - margin.right]);

  // add y axis 
  svg3.append("g")
     .attr("transform", `translate(${margin.left}, 0)`) 
     .call(d3.axisLeft(yScale3)) 
     .attr("font-size", '20px'); 
  
  // add x axis 
  svg3.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) 
      .call(d3.axisBottom(xScale3))
      .attr("font-size", '20px'); 

   const tooltip3 = d3.select("#csv-scatter") 
                    .append("div") 
                    .attr('id', "tooltip3") 
                    .style("opacity", 0) 
                    .attr("class", "tooltip"); 
      
      // set up the mouseover function to the tooltip1 to make it show when mouse over 
    const mouseover3 = function(event, d) {
      tooltip3.html("day " + d.day + "<br> Score: " + d.score + "<br>")
      .style("opacity", 1);  
      }
      
      // set up the mousemove function to the tooltip1 
    const mousemove3 = function(event, d) {
      tooltip3.style("left", (event.x)+"px") 
      .style("top", (event.pageY + yTooltipOffset)+"px"); 
      }
      
      // set up the mouseleave function to the tooltip1 to make it disappear when mouse leave
    const mouseleave3 = function(event, d) { 
      tooltip3.style("opacity", 0); 
      }

  svg3.selectAll(".point")
      .data(data)
      .enter()  
      .append("circle") 
        .attr("class", "point") 
        .attr("cx", (d) => xScale3(d.day)) 
        .attr("cy", (d) => yScale3(d.score)) 
        .attr("r", 10)
        .on("mouseover", mouseover3) 
        .on("mousemove", mousemove3)
        .on("mouseleave", mouseleave3);
  
  });




