$('.section').click(togglePanel);

function togglePanel(event) {
    if (event.currentTarget.getAttribute("collasped") == 'true') {
        TweenLite.to(event.currentTarget, 0.3, { height: 200, ease: Power4.easeOut, background:'darkgray' });
        event.currentTarget.setAttribute("collasped", false);
    } else {
        TweenLite.to(event.currentTarget, 0.3, { height: 80, ease: Power4.easeOut, background: 'lightgray' });
        event.currentTarget.setAttribute("collasped", true);
    }
}

function load() {
    var names = '';
    $.get('/test', function(data) {

    });
}

load();

var circleRadii = [40, 20, 10]
 
 var svgContainer = d3.select("body").append("svg")
                                     .attr("width", 600)
                                     .attr("height", 100);
 
 var circles = svgContainer.selectAll("circle")
                            .data(circleRadii)
                            .enter()
                            .append("circle")
                            .attr('cx', function (d) { return d * 10; })
                            .attr('cy', 0);

var circleAttributes = circles

                       .attr("r", function (d) { return d; })
                       .style("fill", function(d) {
                         var returnColor;
                         if (d === 40) { returnColor = "green";
                         } else if (d === 20) { returnColor = "purple";
                         } else if (d === 10) { returnColor = "red"; }
                         return returnColor;
                       });