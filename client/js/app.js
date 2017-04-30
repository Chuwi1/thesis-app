var total_amount_spent = 0;
var total_amount_earned = 0;
var highest_amount = 0;

var earned_list = [];
var spent_list = [];

// $('.section').click(togglePanel);
// function togglePanel(event) {
//     if (event.currentTarget.getAttribute("collasped") == 'true') {
//         TweenLite.to(event.currentTarget, 0.3, { height: 200, ease: Power4.easeOut, background:'darkgray' });
//         event.currentTarget.setAttribute("collasped", false);
//     } else {
//         TweenLite.to(event.currentTarget, 0.3, { height: 120, ease: Power4.easeOut, background: 'lightgray' });
//         event.currentTarget.setAttribute("collasped", true);
//     }
// }

function tooltips() {
    new Tippy('.tippy', {
        position: 'top',
        animation: 'fade',
        duration: 0,
        arrowSize: 'small',
        arrow: true
    });
}



function load() {
    
    $.get('/query', function(data) {

        // aggregate money earned
        for (var i = 0; i < data.length; i++) {
            if (data[i].money_earned != false) {
                total_amount_earned += data[i].money_earned;
                earned_list.push(data[i].money_earned);
            }
        }
        
        // aggregate money spent
        for (var i = 0; i < data.length; i++) {
            if (data[i].money_spent != false) {
                total_amount_spent += data[i].money_spent;
                spent_list.push(data[i].money_spent);                
            }
        }
        
        // check if earn more than spend / assign highest amount
        if (total_amount_earned > total_amount_spent) {
            highest_amount = total_amount_earned;
        } else {
            highest_amount = total_amount_spent;
        }

        var earned_scale = d3.scaleLinear()
            .domain([0, highest_amount])
            .range([1, 960 - (earned_list.length + 1) * 2]);
        
        var spent_scale = d3.scaleLinear()
            .domain([0, highest_amount])
            .range([1, 960 - (spent_list.length * 2)]);    
            
        var colour = d3.scaleLinear()
            .domain([0, highest_amount])
            .range(['red', 'red']);
            
        // console.log(spent_list)
        
        
        d3.select('#finance')
            .append('div')
            .html('Player 01');
        
        d3.select('#finance')
            .append('div')
            .html('Money Earned: ' + total_amount_earned.toLocaleString());
        
        d3.select('#finance')
            .append('div')
            .attr('class', 'earned-graph');
        
        d3.select('#finance .earned-graph')
            .selectAll('div')
            .data(earned_list)
            .enter()
            .append('div')
                .attr('class', 'test tippy')
                .attr('title', function(d) { return d.toLocaleString() + ' Kinah' })
                // .style('margin-top', '10px')   
                .style('margin-left', '1px')
                // .style('border-left', '1px solid rgba(0,0,0,0.25)')
                .style('float', 'left')
                .style('background-color', function (d) { return String(colour(d)); })
                .style('height', '30px')
                .style('width', function(d) { return earned_scale(d) + 'px' })
                .on('mouseover', function(d) { 
                    TweenLite.to(this, 0, { opacity: 0.5 })
                })
                .on('mouseout', function(d) {
                    TweenLite.to(this, 0, { opacity: 1 })
                });
                
        d3.select('#finance')
            .append('div')
                .html('Money spent: ' + total_amount_spent.toLocaleString());
        
        d3.select('#finance')
            .append('div')
                .attr('class', 'spent-graph');
            
        d3.select('#finance .spent-graph')
            .selectAll('div')
            .data(spent_list)
            .enter()
            .append('div')
                .attr('class', 'test tippy')
                .attr('title', function(d) { return d.toLocaleString() + ' Kinah' })
                // .style('margin-top', '10px')   
                .style('margin-left', '1px')
                // .style('border-left', '1px solid rgba(0,0,0,0.25)')
                .style('float', 'left')
                .style('background-color', function (d) { return String(colour(d)); })
                .style('height', '30px')
                .style('width', function(d) { return spent_scale(d) + 'px' })
                .on('mouseover', mouse_over)
                .on('mouseout', mouse_out);   
        
        tooltips();
    });
}

function mouse_over() {
    TweenLite.to(this, 0, { opacity: 0.5 });
}

function mouse_out() {
    TweenLite.to(this, 0, { opacity: 1 })
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