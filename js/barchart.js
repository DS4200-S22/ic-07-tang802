/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// Append svg object to the body of the page to the hard-coded-bar 
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// find the max Y from data1's score coloumn 
let maxY1 = d3.max(data1, function(d) { return d.score; });

// map our data values (domain for the scale function) to our
// pixel values (range for the scale function)  
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// map our data values (domain for the scale function) to our
// pixel values (range for the scale function)
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); // add more space between x 

// add y axis 
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// add x axis 
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// Set up the hard-coded-bar to become hover using opacity
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// set up the mouseover function to the tooltip1 to make it show when mouse over 
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// set up the mousemove function to the tooltip1 
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// set up the mouseleave function to the tooltip1 to make it disappear when mouse leave
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// append all things that we define before together and make svg1 have  the functionalities of mouseover, move and leave
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);

// Append svg object to the body of the page to the hard-coded-bar 
const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const tooltip2 = d3.select("#csv-bar") 
  .append("div") 
  .attr('id', "tooltip2") 
  .style("opacity", 0) 
  .attr("class", "tooltip"); 

// set up the mouseover function to the tooltip1 to make it show when mouse over 
const mouseover2 = function(event, d) {
  tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>")
  .style("opacity", 1);  
}

// set up the mousemove function to the tooltip1 
const mousemove2 = function(event, d) {
  tooltip2.style("left", (event.x)+"px") 
  .style("top", event.pageY + event.pageX); 
}

// set up the mouseleave function to the tooltip1 to make it disappear when mouse leave
const mouseleave2 = function(event, d) { 
tooltip2.style("opacity", 0); 
}



d3.csv("data/barchart.csv").then((data) => {

  // find the max Y from data1's score coloumn 
let maxY2 = d3.max(data, (d) => { return d.score; }); 
console.log("Max y: " + maxY2);

// map our data values (domain for the scale function) to our
// pixel values (range for the scale function)  
let yScale2 = d3.scaleLinear()
            .domain([0,maxY2])
            .range([height-margin.bottom,margin.top]); 

// map our data values (domain for the scale function) to our
// pixel values (range for the scale function)
let xScale2 = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); // add more space between x 

// add y axis 
svg2.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale2)) 
   .attr("font-size", '20px'); 

// add x axis 
svg2.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale2) 
            .tickFormat(i => data[i].name))  
    .attr("font-size", '20px'); 
  

    console.log(data); 

    svg2.selectAll(".bar")
    .data(data)
    .enter()  
    .append("rect") 
      .attr("class", "bar") 
      .attr("x", (d,i) => xScale2(i)) 
      .attr("y", (d) => yScale2(d.score)) 
      .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) 
      .attr("width", xScale2.bandwidth()) 
      .on("mouseover", mouseover2) 
      .on("mousemove", mousemove2)
      .on("mouseleave", mouseleave2);

});










