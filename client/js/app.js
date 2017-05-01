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

        // Remember to create a checker to check everyone's $$ to see which is the highest

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
            // .range([1, 960 - earned_list.length]);
            .range([1, 960 - (earned_list.length * 2) + 1]);
        
        var spent_scale = d3.scaleLinear()
            .domain([0, highest_amount])
            // .range([1, 960 - spent_list.length]);            
            .range([1, 960 - (spent_list.length * 2) + 1]);    
            
        // console.log(spent_list)
        
        // var color_shit = d3.scaleLinear()
        //     .domain(0, highest_amount)
        //     .range(['yellow', 'blue']);
        
        d3.select('#finance')
            .append('div')
            .html('Player 01');
        
        d3.select('#finance')
            .append('div')
            .html('Money Earned: ' + total_amount_earned.toLocaleString() + ' Kinah');
        
        d3.select('#finance')
            .append('div')
            .attr('class', 'earned-graph');
        
        d3.select('#finance .earned-graph')
            .selectAll('div')
            .data(earned_list)
            .enter()
            .append('div')
                .attr('class', 'tippy')
                .attr('title', function(d) { return d.toLocaleString() + ' Kinah' })
                .attr('hover-color', 'indianred')
                // .style('margin-top', '10px')   
                .style('margin-left', '1px')
                .style('float', 'left')
                .style('background-color', 'indianred')
                .style('height', '30px')
                .style('width', function(d) { return earned_scale(d) + 'px' })
                .on('mouseover', mouse_over)
                .on('mouseout', mouse_out);
                
        d3.select('#finance')
            .append('div')
                .style('clear', 'left')
                .attr('display', 'block')
                .html('Money spent: ' + total_amount_spent.toLocaleString() + ' Kinah');
        
        d3.select('#finance')
            .append('div')
                .attr('class', 'spent-graph')
                .style('width', '960px');
            
        d3.select('#finance .spent-graph')
            .selectAll('div')
            .data(spent_list)
            .enter()
            .append('div')
                .attr('class', 'tippy')
                .attr('title', function(d) { return d.toLocaleString() + ' Kinah' })
                .attr('hover-color', 'olive')                
                // .style('margin-top', '10px')   
                .style('margin-left', '1px')
                .style('float', 'left')
                .style('background-color', 'olive')
                .style('height', '30px')
                .style('width', function(d) { return spent_scale(d) + 'px' })
                .on('mouseover', mouse_over)
                .on('mouseout', mouse_out);   
        
        tooltips();
    });
}

function mouse_over() {
    var color = d3.color(d3.select(this).attr('hover-color')).darker(2);
    d3.select(this)
        .transition()
        .duration(400)
        .style('background', color);
}

function mouse_out() {
    var color = d3.color(d3.select(this).attr('hover-color'));
    d3.select(this)
        .transition()
        .duration(400)
        .style('background', color);
}

// load();

// var circleRadii = [40, 20, 10]

// var svgContainer = d3.select("body").append("svg")
//                                  .attr("width", 600)
//                                  .attr("height", 100);

// var circles = svgContainer.selectAll("circle")
//                         .data(circleRadii)
//                         .enter()
//                         .append("circle")
//                         .attr('cx', function (d) { return d * 10; })
//                         .attr('cy', 0);

// var circleAttributes = circles

//                   .attr("r", function (d) { return d; })
//                   .style("fill", function(d) {
//                      var returnColor;
//                      if (d === 40) { returnColor = "green";
//                      } else if (d === 20) { returnColor = "purple";
//                      } else if (d === 10) { returnColor = "red"; }
//                      return returnColor;
//                   });

function finance() {
    $.get('/finance', function(players) {
        
        var totals = [];
        
        // aggregate transactions        
        for (var i = 0; i < players.length; i++) {
            totals.push([
                sum(players[i], 'money_earned'),
                sum(players[i], 'money_spent')
            ]);
        }

        // determine max value
        var max = get_max(totals);

        for (var i = 0; i < players.length; i++) {
            
            var id = String('p' + (i + 1));
            
            var earnings = [];
            var spendings = [];
            
            for (var k = 0; k < players[i].length; k++) {
                players[i][k].money_earned ? earnings.push(players[i][k].money_earned) : spendings.push(players[i][k].money_spent);
            }
            
            // define scales
            var earnings_scale = d3.scaleLinear()
                .domain([0, max])
                // .range([1, 960 - earnings.length]);
                .range([1, 960 - (earnings.length * 2) + 1]);
    
            var spendings_scale = d3.scaleLinear()
                .domain([0, max])
                // .range([1, 960 - spendings.length]);
                .range([1, 960 - (spendings.length * 2) + 1]);        
            
            d3.select('#finance')
                .append('div')
                .attr('class', 'p1');
                
            d3.select('#finance .p1')
                .append('div')
                .attr('class', 'player-title')
                .html('Player 1');
            
            d3.select('#finance .p1')
                .append('div')
                .attr('class', 'graph-title')
                .html('Earned: ' + totals[0][0].toLocaleString() + ' Kinah');
    
            d3.select('#finance .p1')
                .append('div')
                .attr('class', 'earnings-graph');
    
            d3.select('#finance .p1 .earnings-graph')
                .selectAll('div')
                .data(earnings)
                .enter()
                .append('div')
                .attr('class', 'tippy')
                .attr('title', function(d) { return d.toLocaleString() + ' Kinah' })
                .attr('hover-color', 'indianred')
                // .style('margin-top', '10px')   
                .style('margin-left', '1px')
                .style('float', 'left')
                .style('background-color', 'indianred')
                .style('height', '30px')
                .style('width', function(d) { return earnings_scale(d) + 'px' })
                .on('mouseover', mouse_over)
                .on('mouseout', mouse_out);     
        
            d3.select('#finance .p1')
                .append('div')
                .style('display', 'block')
                .style('clear', 'left')
                .attr('class', 'graph-title')
                .html('Spent: ' + totals[0][0].toLocaleString() + ' Kinah');
    
            d3.select('#finance .p1')
                .append('div')
                .attr('class', 'spendings-graph');            
            
            d3.select('#finance .p1 .spendings-graph')
                .selectAll('div')
                .data(spendings)
                .enter()
                .append('div')
                .attr('class', 'tippy')
                .attr('title', function(d) { return d.toLocaleString() + ' Kinah' })
                .attr('hover-color', 'indianred')
                // .style('margin-top', '10px')   
                .style('margin-left', '1px')
                .style('float', 'left')
                .style('background-color', 'indianred')
                .style('height', '30px')
                .style('width', function(d) { return spendings_scale(d) + 'px' })
                .on('mouseover', mouse_over)
                .on('mouseout', mouse_out);     
        }


        tooltips();    
    });
}

function sum(player, attribute) {
    var accumulator = 0;
    for (var i = 0; i < player.length; i++) {
        accumulator += player[i][attribute];
    }
    return accumulator;
}

function get_max(values) {
    
    var accumulator = 0;

    // flatten array incase it's multi-dimensional
    function flatten(arr) {
      return arr.reduce(function(a, b) {
        return a.concat(Array.isArray(b) ? flatten(b) : b);
      }, []);
    }

    values = flatten(values);

    for (var i = 0; i < values.length; i++) {
        if (values[i] > accumulator) {
            accumulator = values[i];
        }
    }
    return accumulator;
}

finance();
