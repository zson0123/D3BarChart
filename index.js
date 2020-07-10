
document.addEventListener("DOMContentLoaded", function() {
    const req = new XMLHttpRequest();
    req.open("GET",
        "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",
        true);
    req.send();
    req.onload=function() {
        var json=JSON.parse(req.responseText);
        const xVal = json.data.map((d) => new Date(d[0]));
        const yVal = json.data.map((d) => d[1]);

        createBarChart(xVal, yVal);
    };
});

const createBarChart = (xVal, yVal) => {

    const chartWidth = 1000;
    const chartHeight = 500;

    let barWidth = chartWidth / xVal.length;

    const svgPadding = 100;
    const svgWidth = chartWidth+svgPadding;
    const svgHeight = chartHeight + svgPadding * 2;

    const svg = d3.select("body")
                    .append("svg")
                    .attr("height",svgHeight)
                    .attr("width", svgWidth);

    const xScale = d3.scaleTime()
                    .domain([d3.min(xVal), d3.max(xVal)])
                    .range([svgPadding, chartWidth]);

    const yScale = d3.scaleLinear()
                    .domain([0, d3.max(yVal)])
                    .range([chartHeight,0]);

    const xAxis = d3.axisBottom(xScale);
    svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(0, " + (chartHeight+svgPadding) + ")")
        .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("id", "y-axis")
        .attr("transform", "translate(" + svgPadding + ", " + svgPadding + ")")
        .call(yAxis);

    var years = xVal.map((x) => x.getFullYear());

    var quarterRaw = xVal.map((x) => x.getMonth());
    var quarter = quarterRaw.map(function(x) {
        var qNum;
        if (x === 0) {
            qNum = "Q1";
        } else if (x === 3) {
            qNum = "Q2";
        } else if (x === 6) {
            qNum = "Q3";
        } else if (x === 9) {
            qNum = "Q4";
        }
        return qNum;
    });

    svg.selectAll("rect")
        .data(xVal)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("width", barWidth)
        .attr("x", (x) => xScale(x))
        .attr("data-date", (x) => x);

    svg.selectAll("rect")
        .data(yVal)
        .attr("height", (y) => chartHeight - yScale(y))
        .attr("y", (y) => yScale(y)+svgPadding)
        .attr("data-gdp", (y) => y)

        .on("mouseover", function () {
            tooltip.style("display",null);
        })
        .on("mouseout", function () {
            tooltip.style("display","none");
        })
        .on("mousemove", function (d, i) {
            var xPos = d3.mouse(this)[0] - 100;
            var yPos = d3.mouse(this)[1] - 55;
            tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
            tooltip.select("text").text(tooltipFormat(years, quarter, yVal)[i]);
        });

    var tooltip = svg.append("g")
                    .attr("class", "tooltip")
                    .style("display","none");

    tooltip.append("text")
            .attr("x",15)
            .attr("dy","1.2em");

}

var tooltipFormat = (year,quarter, yVal) => {
    var xyFormat = year.map((x,i) => x + " " + quarter[i] + "\nGDP: "+yVal[i]);
    return xyFormat;
}