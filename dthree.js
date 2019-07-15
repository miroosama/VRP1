// var n = 20;
//
// var nodes = d3.range(n * n).map(function(i) {
//   return {
//     index: i
//   };
// });
//
// var links = [];
//
// for (var y = 0; y < n; ++y) {
//   for (var x = 0; x < n; ++x) {
//     if (y > 0) links.push({source: (y - 1) * n + x, target: y * n + x});
//     if (x > 0) links.push({source: y * n + (x - 1), target: y * n + x});
//   }
// }
//
// var simulation = d3.forceSimulation(nodes)
//     .force("charge", d3.forceManyBody().strength(-30))
//     .force("link", d3.forceLink(links).strength(1).distance(20).iterations(10))
//     .on("tick", ticked);
//
// var canvas = document.querySelector("canvas"),
//     context = canvas.getContext("2d"),
//     width = canvas.width,
//     height = canvas.height;
//
// d3.select(canvas)
//     .call(d3.drag()
//         .container(canvas)
//         .subject(dragsubject)
//         .on("start", dragstarted)
//         .on("drag", dragged)
//         .on("end", dragended));
//
// function ticked() {
//   context.clearRect(0, 0, width, height);
//   context.save();
//   context.translate(width / 2, height / 2);
//
//   context.beginPath();
//   links.forEach(drawLink);
//   context.strokeStyle = "#aaa";
//   context.stroke();
//
//   context.beginPath();
//   nodes.forEach(drawNode);
//   context.fill();
//   context.strokeStyle = "#fff";
//   context.stroke();
//
//   context.restore();
// }
//
// function dragsubject() {
//   return simulation.find(d3.event.x - width / 2, d3.event.y - height / 2);
// }
//
// function dragstarted() {
//   if (!d3.event.active) simulation.alphaTarget(0.3).restart();
//   d3.event.subject.fx = d3.event.subject.x;
//   d3.event.subject.fy = d3.event.subject.y;
// }
//
// function dragged() {
//   d3.event.subject.fx = d3.event.x;
//   d3.event.subject.fy = d3.event.y;
// }
//
// function dragended() {
//   if (!d3.event.active) simulation.alphaTarget(0);
//   d3.event.subject.fx = null;
//   d3.event.subject.fy = null;
// }
//
// function drawLink(d) {
//   context.moveTo(d.source.x, d.source.y);
//   context.lineTo(d.target.x, d.target.y);
// }
//
// function drawNode(d) {
//   context.moveTo(d.x + 3, d.y);
//   context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
// }
////////////////////////////////////////////////////////
// var brush = d3.brush();
//
// var svg = d3.select("svg");
//
// svg.append("g")
//     .attr("class", "brush")
//     .call(brush)
//     .call(brush.move, [[307, 167], [611, 539]])
//   .select(".selection")
//     .attr("id", "brush-selection");
//
// svg.append("clipPath")
//     .attr("id", "brush-clip")
//   .append("use")
//     .attr("xlink:href", "#brush-selection");
//
// svg.select("#color-image")
//     .attr("clip-path", "url(#brush-clip)");


////////////////////////////////

const width = 760;
const height = 1252;
const config = {
  speed: 0.005,
  verticalTilt: -30,
  horizontalTilt: 0
}
let locations = [];
const svg = d3.select('#globe')
    .attr('width', width).attr('height', height);
const markerGroup = svg.append('g');
const projection = d3.geoOrthographic();
const initialScale = projection.scale();
const path = d3.geoPath().projection(projection);
// const center = [width/2, height/2];

drawGlobe();
drawGraticule();
enableRotation();

function drawGlobe() {
    // var q = d3.queue();
    // // console.log(d3.json('https://cors-anywhere.herokuapp.com/https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json').then(res=>{console.log(res)}))
    //     q.defer(a, d3.json, 'https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json')
    //     q.await(b)
    d3.json("https://cors-anywhere.herokuapp.com/https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json", function(error, data) {

             // Handle errors getting and parsing the data
             if (error) { return error; }

             // setting the circle size (not radius!) according to the number of inhabitants per city
             // population_array = [];
             // for (i = 0; i < data.features.length; i++) {
             //    population_array.push(data.features[i].properties.population);
             // }
             // max_population = population_array.sort(d3.descending)[0]
             // var rMin = 0;
             // var rMax = Math.sqrt(max_population / (peoplePerPixel * Math.PI));
             // rScale.domain([0, max_population]);
             // rScale.range([rMin, rMax]);
             //
             // path.pointRadius(function(d) {
             //    return d.properties ? rScale(d.properties.population) : 1;
             //
             // });

             // Drawing transparent circle markers for cities
             // g.selectAll("path.cities").data(data.features)
             //    .enter().append("path")
             //    .attr("class", "cities")
             //    .attr("d", path)
             //    .attr("fill", "#ffba00")
             //    .attr("fill-opacity", 0.3);
             svg.selectAll(".segment")
                 .data(topojson.feature(data, data.objects.countries).features)
                 .enter().append("path")
                 .attr("class", "segment")
                 .attr("d", path)
                 .style("stroke", "#888")
                 .style("stroke-width", "1px")
                 .style("fill", (d, i) => '#e5e5e5')
                 .style("opacity", ".9");

             // start spinning!

    })
  }


function a(x, y, callback) {
  console.log(y)
  callback(null, y);
}

function b(err, worldData) {
  console.log(worldData)
  svg.selectAll(".segment")
      .data(topojson.feature(worldData, worldData.objects.countries).features)
      .enter().append("path")
      .attr("class", "segment")
      .attr("d", path)
      .style("stroke", "#888")
      .style("stroke-width", "1px")
      .style("fill", (d, i) => '#e5e5e5')
      .style("opacity", ".9");
      // locations = locationData;
      // drawMarkers();
 }

function drawGraticule() {
    const graticule = d3.geoGraticule()
        .step([10, 10]);

    svg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path)
        .style("fill", "#fff")
        .style("stroke", "#ccc");
}

function enableRotation() {
    d3.timer(function (elapsed) {
        projection.rotate([config.speed * elapsed - 120, config.verticalTilt, config.horizontalTilt]);
        svg.selectAll("path").attr("d", path);
        // drawMarkers();
    });
}

// function drawMarkers() {
//     const markers = markerGroup.selectAll('circle')
//         .data(locations);
//     markers
//         .enter()
//         .append('circle')
//         .merge(markers)
//         .attr('cx', d => projection([d.longitude, d.latitude])[0])
//         .attr('cy', d => projection([d.longitude, d.latitude])[1])
//         .attr('fill', d => {
//             const coordinate = [d.longitude, d.latitude];
//             gdistance = d3.geoDistance(coordinate, projection.invert(center));
//             return gdistance > 1.57 ? 'none' : 'steelblue';
//         })
//         .attr('r', 7);
//
//     markerGroup.each(function () {
//         this.parentNode.appendChild(this);
//     });
// }
