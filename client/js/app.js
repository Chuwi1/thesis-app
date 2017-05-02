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
        theme: 'aion',
        position: 'top',
        animation: 'fade',
        duration: 0,
        arrowSize: 'small',
        arrow: true
    });
}
    
// function load() {

//     $.get('/query', function(data) {

//         // Remember to create a checker to check everyone's $$ to see which is the highest

//         // aggregate money earned
//         for (var i = 0; i < data.length; i++) {
//             if (data[i].money_earned != false) {
//                 total_amount_earned += data[i].money_earned;
//                 earned_list.push(data[i].money_earned);
//             }
//         }
        
//         // aggregate money spent
//         for (var i = 0; i < data.length; i++) {
//             if (data[i].money_spent != false) {
//                 total_amount_spent += data[i].money_spent;
//                 spent_list.push(data[i].money_spent);                
//             }
//         }
        
//         // check if earn more than spend / assign highest amount
//         if (total_amount_earned > total_amount_spent) {
//             highest_amount = total_amount_earned;
//         } else {
//             highest_amount = total_amount_spent;
//         }

//         var earned_scale = d3.scaleLinear()
//             .domain([0, highest_amount])
//             // .range([1, 960 - earned_list.length]);
//             .range([1, 960 - (earned_list.length * 2) + 1]);
        
//         var spent_scale = d3.scaleLinear()
//             .domain([0, highest_amount])
//             // .range([1, 960 - spent_list.length]);            
//             .range([1, 960 - (spent_list.length * 2) + 1]);    
            
//         // console.log(spent_list)
        
//         // var color_shit = d3.scaleLinear()
//         //     .domain(0, highest_amount)
//         //     .range(['yellow', 'blue']);
        
//         d3.select('#finance')
//             .append('div')
//             .html('Player 01');
        
//         d3.select('#finance')
//             .append('div')
//             .html('Money Earned: ' + total_amount_earned.toLocaleString() + ' Kinah');
        
//         d3.select('#finance')
//             .append('div')
//             .attr('class', 'earned-graph');
        
//         d3.select('#finance .earned-graph')
//             .selectAll('div')
//             .data(earned_list)
//             .enter()
//             .append('div')
//                 .attr('class', 'tippy')
//                 .attr('title', function(d) { return d.toLocaleString() + ' Kinah' })
//                 .attr('hover-color', 'indianred')
//                 // .style('margin-top', '10px')   
//                 .style('margin-left', '1px')
//                 .style('float', 'left')
//                 .style('background-color', 'indianred')
//                 .style('height', '30px')
//                 .style('width', function(d) { return earned_scale(d) + 'px' })
//                 .on('mouseover', mouse_over)
//                 .on('mouseout', mouse_out);
                
//         d3.select('#finance')
//             .append('div')
//                 .style('clear', 'left')
//                 .attr('display', 'block')
//                 .html('Money spent: ' + total_amount_spent.toLocaleString() + ' Kinah');
        
//         d3.select('#finance')
//             .append('div')
//                 .attr('class', 'spent-graph')
//                 .style('width', '960px');
            
//         d3.select('#finance .spent-graph')
//             .selectAll('div')
//             .data(spent_list)
//             .enter()
//             .append('div')
//                 .attr('class', 'tippy')
//                 .attr('title', function(d) { return d.toLocaleString() + ' Kinah' })
//                 .attr('hover-color', 'olive')                
//                 // .style('margin-top', '10px')   
//                 .style('margin-left', '1px')
//                 .style('float', 'left')
//                 .style('background-color', 'olive')
//                 .style('height', '30px')
//                 .style('width', function(d) { return spent_scale(d) + 'px' })
//                 .on('mouseover', mouse_over)
//                 .on('mouseout', mouse_out);   
        
//         tooltips();
//     });
// }

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


communication();
finance();

// ===============
//  Communication
// ===============

function communication() {
    
    $.get('/communication', function(players) {

        // Player 1
        // whisper_tos[0] = [friend, total_words]
        //                  [friend, total_words]
        //                  [friend, total_words] ...
        
        // Player 2
        // whisper_tos[1] = [friend, total_words]
        //                  [friend, total_words]
        //                  [friend, total_words] ...
    
        // holder for to and from whisper lists
        var whisper_tos = [];
        var whisper_froms = [];
        
        // holders for total values
        var total_tos = 0;
        var total_froms = 0;
        var totals = 0;

        // colour codings
        var c_scheme = ['gray', 'pink'];
        
        // holder for max value
        var max = 0;
        
        // loop thru all 3 players and organise into incoming and outgoing
        for (var i = 0; i < players.length; i++) {
            
            var to_list = [];
            var from_list = [];

            // loop thru all the friends of each player
            for (var k = 0; k < players[i].length; k++) {
   
                if (players[i][k]._id.to != false) {
                    // push friend and total words into array
                    to_list.push([players[i][k]._id.to, sum(players[i][k].whisper_length)]);
                }
               
                if (players[i][k]._id.from != false) {
                    // push friend and total words into array
                    from_list.push([players[i][k]._id.from, sum(players[i][k].whisper_length)]);
                }
            }
            
            to_list = _.sortBy(to_list, 1).reverse();
            from_list = _.sortBy(from_list, 1).reverse();            
            
            whisper_tos[i] = to_list;
            whisper_froms[i] = from_list;
            
            // if player == to nothing (e.g. vin -.-) 
            if (players[i] == '') {
                 // set the whisper stuff to []
                whisper_tos[i] = whisper_froms[i] = [];
            }
            
        } // end of loop
        
        total_tos = sum(whisper_tos[0], 1);
        total_froms = sum(whisper_froms[0], 1);
        totals = [total_tos, total_froms];
        
        // assign highest value - for use on scaleLinear
        max = get_max(totals);

        // console.log(whisper_tos);
        // console.log(whisper_froms);

        // loop to populate visualisation
        for (var i = 0; i < players.length; i++) {
            
            var id = String('.p' + (i + 1));
        
            var tos_scale = d3.scaleLinear()
                .domain([0, max])
                .range([1, 960 - (whisper_tos[i].length * 2) + 1]);
    
            var froms_scale = d3.scaleLinear()
                .domain([0, max])
                .range([1, 960 - (whisper_froms[i].length * 2) + 1]);  

            // append visualisation
            d3.select('#communication')
                .append('div')
                    .attr('class', id.replace('.', ''))
                .append('div')
                    .attr('class', 'player-name')
                    .html('Player ' + (i + 1));

           // whisper tos
            d3.select('#communication ' + id)
                .append('div')
                    .attr('class', 'graph-descriptor')
                    .html('Outgoing Private Messages (' + sum(whisper_tos[i], 1) + ' words)');
           
            d3.select('#communication ' + id)
                .append('div')
                    .attr('class', 'graph earnings')
                .selectAll('div')
                    .data(whisper_tos[i])
                    .enter()
                .append('div')
                    .attr('class', 'unit tippy')
                    .attr('title', function(d) { return d[0] + ' (' + d[1] + ' words)' })
                    .attr('hover-color', c_scheme[0])
                    .style('background-color', c_scheme[0])
                    .style('width', function(d) { return tos_scale(d[1]) + 'px' })
                    .on('mouseover', mouse_over)
                    .on('mouseout', mouse_out);

           // whisper froms
            d3.select('#communication ' + id)
                .append('div')
                    .attr('class', 'graph-descriptor')
                    .html('Incoming Private Messages (' + sum(whisper_froms[i], 1) + ' words)');
           
            d3.select('#communication ' + id)
                .append('div')
                    .attr('class', 'graph earnings')
                .selectAll('div')
                    .data(whisper_froms[i])
                    .enter()
                .append('div')
                    .attr('class', 'unit tippy')
                    .attr('title', function(d) { return d[0] + ' (' + d[1] + ' words)' })
                    .attr('hover-color', c_scheme[1])
                    .style('background-color', c_scheme[1])
                    .style('width', function(d) { return froms_scale(d[1]) + 'px' })
                    .on('mouseover', mouse_over)
                    .on('mouseout', mouse_out);   
                    
        }
        
        tooltips(); 
    });
}


// ===============
//  Finance
// ===============

function finance() {
    
    $.get('/finance', function(players) {
        
        // multi-dimensional array containing max earned and spent for each player
        var totals = [];
        
        // colour codings
        var c_scheme = ['gray', 'pink'];
        
        // holder for max value
        var max = 0;
        
        // aggregate transactions        
        for (var i = 0; i < players.length; i++) {
            totals.push([
                sum(players[i], 'money_earned'),
                sum(players[i], 'money_spent')
            ]);
        }

        // assign highest value - for use on scaleLinear
        max = get_max(totals);
        
        // loop to populate visualisation
        for (var i = 0; i < players.length; i++) {
            
            var id = String('.p' + (i + 1));
            
            var earnings = [];
            var spendings = [];
            
            // push spent and earned variables to each array (what about timescale?)
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
            
            // append visualisation
            d3.select('#finance')
                .append('div')
                    .attr('class', id.replace('.', ''))
                .append('div')
                    .attr('class', 'player-name')
                    .html('Player ' + (i + 1));
            
            // earnings
            d3.select('#finance ' + id)
                .append('div')
                    .attr('class', 'graph-descriptor')
                    .html('Earned: ' + delimit(totals[i][0]) + ' Kinah' + ' = ' + rmt(totals[i][0]));
    
            d3.select('#finance ' + id)
                .append('div')
                    .attr('class', 'graph earnings')
                .selectAll('div')
                    .data(earnings)
                    .enter()
                .append('div')
                    .attr('class', 'unit tippy')
                    .attr('title', function(d) { return delimit(d) + ' Kinah' + ' = ' + rmt(d) })
                    .attr('hover-color', c_scheme[0])
                    .style('background-color', c_scheme[0])
                    .style('width', function(d) { return earnings_scale(d) + 'px' })
                    .on('mouseover', mouse_over)
                    .on('mouseout', mouse_out);     
            
            // spendings
            d3.select('#finance ' + id)
                .append('div')

                .attr('class', 'graph-descriptor')
                .html('Spent: ' + delimit(totals[i][1]) + ' Kinah' + ' = ' + rmt(totals[i][1]));
    
            d3.select('#finance ' + id)
                .append('div')
                    .attr('class', 'graph spendings')
                .selectAll('div')
                    .data(spendings)
                    .enter()
                .append('div')
                    .attr('class', 'unit tippy')
                    .attr('title', function(d) { return delimit(d) + ' Kinah' + ' = ' + rmt(d) })
                    .attr('hover-color', c_scheme[1])
                    .style('background-color', c_scheme[1])
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
        if (attribute == null) {
            accumulator += player[i];            
        } else {
            accumulator += player[i][attribute];
        }

    }
    return accumulator;
}

function get_max(values) {
    var accumulator = 0;

    // flatten array incase it's multi-dimensional
    // https://www.codetuts.tech/flatten-deep-nested-array-object/#othersolutions
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

function rmt(d) {
    var rate = 0.00000002185;
    return 'USD $' + (d * rate).toFixed(2)
}

function delimit(d) {
    // thousand / digit group separator
    return d.toLocaleString();
}

