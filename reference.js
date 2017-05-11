function money() {
    
    d3.select('#section .title')
        .html('Money');
    
    d3.select('#main')
        .append('div')
        .attr('id', 'money');
    
    $.get('/money', function(players) {
        
        console.log('sup');
        
        // multi-dimensional array containing max earned and spent for each player
        var totals = [];
        
        // colour codings
        var c_scheme = ['#E57373', '#E57373'];
        
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
            d3.select('#money')
                .append('div')
                    .attr('class', id.replace('.', ''))
                .append('div')
                    .attr('class', 'player-name')
                    .html('Player ' + (i + 1));
            
            // earnings
            d3.select('#money ' + id)
                .append('div')
                    .attr('class', 'graph-descriptor')
                    .html('Earned ' + delimit(totals[i][0]) + ' Kinah' + ' (' + rmt(totals[i][0]) + ')');
    
            d3.select('#money ' + id)
                .append('div')
                    .attr('class', 'graph earnings')
                .selectAll('div')
                    .data(earnings)
                    .enter()
                .append('div')
                    .attr('class', 'unit tippy')
                    .attr('title', function(d) { return delimit(d) + ' Kinah' + ' (' + rmt(d) + ')' })
                    .attr('hover-color', c_scheme[0])
                    .style('background-color', c_scheme[0])
                    .style('opacity', 1)                     
                    // .style('height', '0px')
                    // .style('width', '0px')
                    .style('width', function(d) { return earnings_scale(d) + 'px' } )                        
                    .on('mouseover', mouse_over)
                    .on('mouseout', mouse_out)
                .transition()
                    .duration(function (d, i) { return i * 0.5 })
                    .delay(function (d, i) { return (i * 5) + 750 })
                    .style('height', bar_height)
                    // .style('width', function(d) { return earnings_scale(d) + 'px' } )                       
                    .style('opacity', 1);
            

            // spendings
            d3.select('#money ' + id)
                .append('div')
                .attr('class', 'graph-descriptor')
                .html('Spent: ' + delimit(totals[i][1]) + ' Kinah' + ' (' + rmt(totals[i][1]) + ')');
    
            d3.select('#money ' + id)
                .append('div')
                    .attr('class', 'graph spendings')  
                .selectAll('div')
                    .data(spendings)
                    .enter()
                .append('div')
                    .attr('class', 'unit tippy')
                    .attr('title', function(d) { return delimit(d) + ' Kinah' + ' (' + rmt(d) + ')' })
                    .attr('hover-color', c_scheme[1])
                    .style('background-color', c_scheme[1])
                    .style('opacity', 1)        
                    // .style('height', '0px')
                    .style('width', function(d) { return spendings_scale(d) + 'px' } )                    
                    .on('mouseover', mouse_over)
                    .on('mouseout', mouse_out)
                .transition()
                    .duration(function (d, i) { return i * 0.5 })
                    .delay(function (d, i) { return (i * 5) + 750 })
                    .style('height', bar_height)
                    // .style('width', function(d) { return spendings_scale(d) + 'px' } )                       
                    .style('opacity', 1);
            
            // console.log(earnings.length);
            // report
            d3.select('#money ' + id)
                .append('div')
                    .attr('class', 'report')
                    // .style('background-color', 'black')
                    // .style('height', '100px')
                    .html('Player spent a total of $0,000 across 0 transactions. An average of $0,000 a day. Highest amount spent is $0,000 . Lowest is $0,000 .');         
                    
            
            d3.selectAll('.graph.earnings')
                .style('width', '0px')
                .transition()
                    .duration(750)
                    .delay(0)
                    .style('width', '960px');
            
            d3.selectAll('.graph.spendings')
                .style('width', '0px')
                .transition()
                    .duration(750)
                    .delay(0)
                    .style('width', '960px');        
                    
        }

        tooltips();    
    });
}