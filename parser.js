/**
 *  Log Parser
 *  
 */

/* Notes:
[DONE] TO DO: SORT OUT THE CRITICAL DMG PART. IT'S REGISTERING OTHER PPLS CRIT ATTKS 
TO DO: Groups, Alliances, Leagues, add Player's Out Going Messages (non-whisper)
Consider. if the player is from -SL then remove SL from the list? But some players play on many servers... so maybe remove servers altogether?
Consider getting word count of the private whispers
Consider user outgoing chats? Is it possible to accommodate?
Each unit will be the a word and the whole bar is divided by the total number of words said. Each block will be the frequency and the width of each block will be the number of words
*/

var request = require('request');
var fs = require('fs');
var LineByLineReader = require('line-by-line'); 
var lr = new LineByLineReader('data/sample-unique.txt');
// var lr = new LineByLineReader('data/Chat-Goof-170417b.txt');

var mononymous_monsters = JSON.parse(fs.readFileSync('data/mononymous-monsters.json'));
var item_api_url = 'http://api.notaion.com/?item&id=';
var num_items = 0;
var num_items_processed = 0;
var log = [];

lr.on('error', function (err) { console.log(err); });
lr.on('line', function (line) {
	
    // console.log('Processing raw...')

    var entry = new Object();
    var checker = 0;
    
    // =========
    //  Presets
    // =========
    
    // Setting all attributes to false first and
    // switch them to true as we go down the rule list

    entry.raw = line.trim();
    entry.time = convert_time(entry.raw);
    entry.logged_in = false;
    entry.region = false;
    entry.hours_played = false;

    // Group
    // 2017.04.01 00:40:19 : Your request has been registered on the Recruit Group Member List. 
    // 2017.04.06 22:15:05 : You have joined the group. 
    // 2017.04.06 22:17:20 : Xanxvs-SL has joined your group. 
    // 2017.04.13 23:20:57 : Applied has joined your group. 
    // 2017.04.01 00:24:32 : You left the group. 
    // 2017.04.05 21:26:03 : Your Find Group request was removed because your Group or Alliance is full. 
    // 2017.04.05 22:34:30 : You have applied to join Fhenix's group. 

    // Alliance
    // 17.04.04 23:40:48 : You have joined the alliance. 
    // 2017.04.04 23:40:48 : You have joined the alliance. 
    // 2017.04.04 23:40:48 : AOEhoar has joined the alliance. 

    // League
    // 2017.04.03 21:13:02 : MissBard's Alliance has joined the League. 
    // 2017.04.04 20:56:33 : Otannii's Alliance has joined the League. 
    // 2017.04.04 20:57:17 : BadPing's Alliance has joined the League. 
    // 2017.04.04 20:58:56 : DDakCong's Alliance has joined the League. 
    // 2017.04.04 23:41:29 : 's Alliance has joined the League. (this one is fishy)

    // Crafting
    // 2017.04.05 12:42:04 : You have crafted successfully. 
    // 2017.04.05 12:42:08 : Crafting of [item:152012669;ver8;;;;] was completed. 
    // 2017.04.05 12:42:08 : You have crafted successfully. 
    // 2017.04.05 12:42:13 : Crafting of [item:152012669;ver8;;;;] was completed. 
    // 2017.04.05 12:42:13 : You have crafted successfully. 
    // 2017.04.05 12:42:17 : Crafting of [item:152012669;ver8;;;;] was completed. 
    // 2017.04.05 12:42:17 : You have crafted successfully. 
    // 2017.04.05 12:45:16 : You have crafted successfully. 
    // 2017.04.05 12:45:20 : You have crafted successfully. 
    // 2017.04.05 12:45:24 : You have crafted successfully. 
    // 2017.04.05 12:45:28 : You have crafted successfully. 

    entry.joined_group = true;
    entry.joined_group = 

    entry.friend_logged_in = false;
    entry.friend_logged_out = false;

    entry.whisper_from = false;
    entry.whisper_to = false;
    entry.whisper_length = false;

    entry.money_earned = false;
    entry.money_spent = false;

    entry.ap_earned = false;
    entry.ap_spent = false;
    
    entry.gp_earned = false;
    
    entry.item_sold_broker = false;
    entry.item_sold_npc = false;
    entry.item_acquired = false;
    entry.item_id = false;   
    entry.item_quantity = false;
    
    entry.enchant_item = false;
    entry.enchant_increase = false;
    
    entry.temper_item = false;
    entry.temper_increase = false;
    
    entry.quest_acquired = false;
    entry.quest_updated = false;
    entry.quest_completed = false;
    
    entry.damage_inflicted = false;
    entry.damage_received = false;
    entry.damage_critical = false;
    entry.damage_skill = false;
    
    entry.damage_target = false;
    entry.damage_target_npc = false;
    entry.damage_target_player = false;

    entry.damage_source = false;
    entry.damage_source_npc = false;
    entry.damage_source_player = false;
    
    // ========
    //  Player
    // ========
  
    // Player Logged In
    // 2017.03.31 21:49:59 : You changed the connection status to Online.

    entry.logged_in = line.indexOf('You changed the connection status to Online') >= 0;

    // Region Change
    // 2017.03.31 22:33:09 : You have joined the Idgel Dome Landmark region channel.

    if (line.indexOf('You have joined the') >= 0 && line.indexOf('region channel') >= 0) {
        entry.region = line.split("You have joined the ")[1].split(' region channel')[0];
    }

    // Hours Played
    // 2017.04.01 11:59:43 : You have played for 10 hour(s). Please take a break. 

    if (line.indexOf(' : You have played for') >= 0) {
        entry.hours_played = Number(line.split('for ')[1].split(' hour')[0].replace(/,/gi, ''));
    }

    // =========
    //  Friends
    // =========

    // Friend Logged In
    // 2017.04.04 22:36:20 : AOEhoar-SL has logged in. 
    // 2017.04.04 22:26:52 : AOEhoar has logged in. 

    if (line.indexOf('has logged in') >= 0) {

        // check if name has server suffix
        if (line.indexOf('-') >= 0) {

            // if there is, assign attribute this way (suffix removed)
            entry.friend_logged_in = line.split(' : ')[1].split(' has')[0].split('-')[0];    
        }

        // if not
        else {

            // assign attribute this way
            entry.friend_logged_in = line.split(' : ')[1].split(' has')[0];
        }
    }

    // Friend Logged Out
    // 2017.04.05 22:10:37 : Visvasan-SL has logged out. 
    // 2017.04.04 23:46:50 : Visvasan has logged out. 

    if (line.indexOf('has logged out') >= 0) {

        // check if name has server suffix
        if (line.indexOf('-') >= 0) {

            // if there is, assign attribute this way
            entry.friend_logged_out = line.split(' : ')[1].split(' has')[0].split('-')[0];
        }

        // if not
        else {

            // assign attribute this way
            entry.friend_logged_out = line.split(' : ')[1].split(' has')[0];
        }
    }

    // ==========
    //  Whispers
    // ==========
    
    // Whisper From
    // 2017.02.24 14:52:22 : [charname:Kinnari;0.6275 1.0000 0.6275] Whispers: u back? o.o
  
    if (line.indexOf('] Whispers:') >= 0) {

        // assign name
        entry.whisper_from = line.split('charname:')[1].split(';')[0];
        entry.whisper_length = line.split(' ').length;

        // ommit chat content from raw string
        // entry.raw = entry.raw.split('] Whispers: ')[0] + '] Whispers:';
    }
    
    // Whisper To
    // 2017.02.24 14:52:31 : You Whisper to [charname:Kinnari;0.6275 1.0000 0.6275]: not really
    
    if (line.indexOf('You Whisper to') >= 0) {

        // assign name
        entry.whisper_to = line.split('charname:')[1].split(';')[0];

        // ommit chat content from raw string
        entry.raw = entry.raw.split(']: ')[0] + ']:';
    }   

    // =========
    //  Finance    
    // =========
    
    // Money Earned
    // 2017.04.03 20:15:21 : You have earned 350,476,629 Kinah.
    
    if (line.indexOf('You have earned') >= 0 && line.indexOf('Kinah') >= 0) {
        entry.money_earned = Number(line.split('earned ')[1].split(' Kinah')[0].replace(/,/gi, ''));
    }
    
    // Money Spent
    // 2017.04.03 11:35:41 : You spent 218,850,000 Kinah.
    
    if (line.indexOf('You spent') >= 0 && line.indexOf('Kinah') >= 0) {
        entry.money_spent = Number(line.split('spent ')[1].split(' Kinah')[0].replace(/,/gi, ''));
    }
    
    // =======
    //  Sales
    // =======
    
    // Item Sold on Broker
    // 2017.04.01 00:34:29 : The Ancient Manastone: Magic Suppression +30 item has been sold by the broker.
    
    if (line.indexOf('item has been sold by the broker') >= 0) {
        entry.item_sold_broker = line.split('The ')[1].split(' item')[0];   
    }
    
    // Item Sold to NPC
    // 2017.03.11 01:22:52 : You sold the item.
    
    entry.item_sold_npc = line.indexOf('You sold the item') >= 0;

    
    // ==================
    //  Item Acquisition
    // ==================
    
    // Single Item (Stored in Inventory or Special Cube)
    // 2017.04.01 01:11:16 : You have acquired [item:188052501;ver8;;;;].
    // 2017.02.24 20:03:45 : You have acquired [item:182215599;ver7;;;;] and stored it in your special cube. 

    if (line.indexOf('You have acquired [item:') >= 0) {
        entry.item_acquired = true;
        entry.item_id = Number(line.split('item:')[1].split(';')[0]);
        entry.item_quantity = 1;
        num_items++;
    }
    
    // Multiple Items Stored in Inventory
    // 2017.04.05 15:10:59 : You have acquired 10,000 [item:188100335;ver8;;;;](s).
    
    if (line.indexOf('You have acquired') >= 0 && line.indexOf('(s)') >= 0 ) {
        entry.item_acquired = true;        
        entry.item_quantity = Number(line.split(' [item')[0].split('acquired ')[1].replace(/,/gi, ''));
        
        // check if item contains version
        if (line.indexOf('ver') >= 0 && line.indexOf(';') >= 0) {

            // if it does, assign item id this way
            entry.item_id = Number(line.split('item:')[1].split(';')[0]);
        } 

        // if it doesn't
        else {

            // assign item id this way
            entry.item_id = Number(line.split('item:')[1].split(']')[0]);  
        }


        num_items++;        
    }
    
    // Multiple Items Stored in Special Cube 
    // 2017.04.04 23:53:09 : You have acquired 100 [item:188100391;ver8;;;;]s and stored them in your special cube. 
    
    if (line.indexOf('You have acquired') >= 0 && line.indexOf(']s') >= 0 && line.indexOf('special cube') >= 0 ) {
        entry.item_acquired = true;
        entry.item_id = Number(line.split('item:')[1].split(';')[0]);
        entry.item_quantity = Number(line.split(' [item')[0].split('acquired ')[1].replace(/,/gi, ''));
        num_items++;        
    }
    
    // =============
    //  Enchantment
    // =============

    // Enchantment Success
    // 2017.03.10 03:37:34 : You successfully enchanted Provenance Greatsword by +2.    
    
    if (line.indexOf('You successfully enchanted') >= 0) {
        entry.enchant_item = line.split('enchanted ')[1].split(' by')[0];
        entry.enchant_increase = line.split('by +')[1].split('.')[0];
    }
    
    // Enchantment Failure
    // 2017.03.10 17:30:16 : You have failed to enchant Provenance Greatsword.

    if (line.indexOf('You have failed to enchant') >= 0) {
        entry.enchant_item = line.split('enchant ')[1].split('.')[0]; 
    }

    // ===========
    //  Temperace
    // ===========
    
    // Tempering Success
    // 2017.04.03 11:35:51 : You have successfully tempered Kaisinel's Bracelet. +1 temperance level achieved.
    
    if (line.indexOf('You have successfully tempered') >= 0) {
        entry.temper_item = line.split('tempered')[1].split('.')[0];
        entry.temper_increase = Number(line.split('+')[1].split(' temperance')[0]);
    }
    
    // Tempering Failure
    // 2017.04.03 11:34:55 : Tempering of Kaisinel's Bracelet has failed and the temperance level has decreased to 0.    
    
    if (line.indexOf('Tempering of') >= 0 && line.indexOf('has failed') >= 0) {
        entry.temper_item = line.split('Tempering of ')[1].split(' has failed')[0];
    }
    
    // ========
    //  Quests
    // ========
    
    // Quest Acquired
    // 2017.04.04 19:19:10 : Quest acquired: [Prestige/Daily] Prestigious Valor
    
    if (line.indexOf('Quest acquired') >= 0) {
        entry.quest_acquired = line.split('acquired: ')[1];
    }
    
    // Quest Updated
    //2017.04.04 21:06:01 : Quest updated: [Urgent Order] Protect the Upper Abyss    
    
    if (line.indexOf('Quest updated') >= 0) {
        entry.quest_updated = line.split('updated: ')[1];
    }
    
    // Quest Complete
    // 2017.04.06 23:56:22 : Quest complete: [Alliance] Keep Up the Defense
    
    if (line.indexOf('Quest complete') >= 0) {
        entry.quest_completed = line.split('complete: ')[1];
    }    

    // ==============
    //  Abyss Points
    // ==============
    
    // AP Earned
    // 2017.03.08 03:06:23 : You have gained 800 Abyss Points.
    
    if (line.indexOf('You have gained') >= 0 && line.indexOf('Abyss Points') >= 0) {
        entry.ap_earned = Number(line.split('gained ')[1].split(' Abyss')[0].replace(/,/gi, ''));
    }

    // AP Spent
    // 2017.03.08 01:34:00 : You used 57,090 Abyss Points.
    
    if (line.indexOf('You used') >= 0 && line.indexOf('Abyss Points')) {
        entry.ap_spent = Number(line.split('used ')[1].split(' Abyss')[0].replace(/,/gi, ''));
    }

    // ==============
    //  Glory Points
    // ==============
    
    // GP Earned
    // 2017.03.07 23:06:04 : You have gained 150 Glory Points.
    
    if (line.indexOf('You have gained') >= 0 && line.indexOf('Glory Points') >= 0) {
        entry.gp_earned = Number(line.split('gained ')[1].split(' Glory')[0].replace(/,/gi, ''));
    }

    // ==================
    //  Damage Inflicted
    // ==================

    // You Inflicted Damage On
    // 2017.03.31 22:36:37 : You inflicted 113 damage on Crowley-SL.    
    
    if (line.indexOf('You inflicted') >= 0) {

        // assign damage first
        entry.damage_inflicted = Number(line.split('inflicted ')[1].split(' damage')[0].replace(/,/gi, ''));

        // if skill exists
        // 2017.03.31 22:35:06 : You inflicted 1,075 damage on LindWanijima-SL by using Wrathful Explosion.  
       
        if (line.indexOf('by using') >= 0) {

            // assign skill
            entry.damage_skill = line.split('using ')[1].split('.')[0].trim();
            
            // assign target attribute based on raw string with skill
            entry.damage_target = line.split(' on ')[1].split(' by')[0].trim();
        } 

        // if skill doesn't exist
        else {
            // assign target as per normal
            entry.damage_target = line.split('damage on ')[1].split('.')[0].trim();
        }

        // critical hit
        if (line.indexOf('Critical Hit!') >= 0) {
            entry.damage_critical = true;
        }
    }
    
    // Check if Target is a Monster
    // 2017.03.31 23:49:23 : You inflicted 2,005 damage on Primeval Mookie by using Tumultuos Surge.

    // check if target exists
    if (entry.damage_target != false) {

        // if it exists, check if it's nam has more than one-word
        if (entry.damage_target.split(' ').length > 1) {

            // if so, it's a monster
            entry.damage_target_npc = true;
        } 

        // if not
        else if (entry.damage_target.split(' ').length == 1) {
            
            // check target's name against mononymous monster list
            if (check_mononymous(entry.damage_target)) {
                
                // if it matches any of the names in that list, then it's a monster
                entry.damage_target_npc = true;
            } 

            // if not
            else {

                // target is a player
                entry.damage_target_player = true;
            }
        }
    }    
    
    // =================
    //  Damage Received
    // =================

    // You Received Damage From
    // 2017.03.02 10:22:42 : You received 1,226 damage from Beritra's Rebels Raider . 
    
    if (line.indexOf('You received') >= 0 && line.indexOf('damage from') >= 0) {
        entry.damage_received = Number(line.split('received ')[1].split(' damage')[0].replace(/,/gi, ''));
        entry.damage_source = line.split('from ')[1].split('.')[0].trim();

        // critical hit
        if (line.indexOf('Critical Hit!') >= 0) {
            entry.damage_critical = true;
        }     
    }
    
    // Has Inflicted Damage on You By Using
    // 2017.03.31 22:38:00 : LindWanijima-SL has inflicted 573 damage on you by using Canted Shot.         
    
    if (line.indexOf('has inflicted') >= 0 && line.indexOf('damage on you by using') >= 0) {
        
        // assign damage and skill 
        entry.damage_received = Number(line.split('inflicted ')[1].split(' damage')[0].replace(/,/gi, '').trim());
        entry.damage_skill = line.split('by using ')[1].split('.')[0].trim();
        
        // if hit is critical, assign source this way
        if (line.indexOf('Critical Hit') >= 0) {
           entry.damage_source = line.split('Hit!')[1].split(' has')[0];
        } 

        // if not critical, assign source this way
        else {
           entry.damage_source = line.split(' : ')[1].split(' has')[0];
        }

        // critical hit
        if (line.indexOf('Critical Hit!') >= 0) {
            entry.damage_critical = true;
        }        
    }
    
    // You Receive(d) Damage Due to
    // 2017.04.05 21:05:59 : You received 2,726 damage due to Magma Burst. 
    // 2017.02.26 12:05:44 : You receive 1,022 damage due to Fluttered Note Effect. 
    
    if (line.indexOf('You receive') >= 0 && line.indexOf('due to') >= 0 && line.indexOf('the effect of') < 0) {
        
        // if raw string sates "received"
        if (line.indexOf('received') >= 0) {

            // assign damage this way
            entry.damage_received = Number(line.split('received ')[1].split(' damage')[0].replace(/,/gi, '').trim());
        } 

        // if not, treat it as "receive"
        else {

            // and assign damage this way
            entry.damage_received = Number(line.split('receive ')[1].split(' damage')[0].replace(/,/gi, '').trim());            
        }
        
        // assign skill
        entry.damage_skill = line.split('due to ')[1].split('.')[0].trim();

        // critical hit
        if (line.indexOf('Critical Hit!') >= 0) {
            entry.damage_critical = true;
        }    
    }
    
    // You Received Damage Due to The Effect Of
    // 2017.04.06 21:41:11 : You received 84 bleeding damage due to the effect of Far Wound.
    // 2017.02.25 05:28:01 : You received 108 poisoning damage due to the effect of Wide Area Poison Slash. 

    if (line.indexOf('You received') >= 0 && line.indexOf('due to the effect of') >= 0) {
        entry.damage_received = Number(line.split('received ')[1].split(' ')[0].replace(/,/gi, '').trim());
        entry.damage_skill = line.split('effect of ')[1].split('.')[0].trim();

        // critical hit
        if (line.indexOf('Critical Hit!') >= 0) {
            entry.damage_critical = true;
        }            
    }
    
    // check if source exists
    if (entry.damage_source != false) {

        // if it exists, check if it's nam has more than one-word
        if (entry.damage_source.split(' ').length > 1) {

            // if so, it's a monster
            entry.damage_source_npc = true;
        } 

        // if not
        else if (entry.damage_source.split(' ').length == 1) {

            // check target's name against mononymous monster list
            if (check_mononymous(entry.damage_source)) {

                // if it matches any of the names in that list, then it's a monster
                entry.damage_source_npc = true;
            } 

            // if not
            else {

                // source is a player
                entry.damage_source_player = true;
            }
        }
    }

    // =================
    //  Critical Damage
    // =================

    // 2017.02.25 05:28:22 : Critical Hit! You received 1,130 damage from Beritra's Rebels Raider . 
    // 2017.03.31 22:36:37 : Critical Hit! You inflicted 1,136 critical damage on Crowley-SL.
    // 2017.03.31 22:35:36 : Critical Hit!You inflicted 1,399 damage on LeonTyrron-SL by using Ferocious Strike.
    // 2017.04.01 00:16:46 : Critical Hit!You inflicted 4,121 damage on Primeval Mookie by using Tumultuos Surge.
    // 2017.04.05 21:26:13 : Critical Hit! You inflicted 2,509 critical damage on Prime Tumon I.
    // 2017.03.31 22:37:59 : Critical Hit!LindWanijima-SL has inflicted 1,138 damage on you by using Crosstrigger.   
    // 2017.04.03 11:15:02 : Critical Hit!You receive 1,079 damage due to Chain of Earth. 
    
    // if (line.indexOf('Critical Hit!') >= 0) {
    //     entry.damage_critical = true;
    // }

    // ===================
    //  Filtering Results
    // ===================

    // checking each object for attributes that are not false
    for (var i in entry) {
        if (entry[i] != false) {
            checker++;
        }
    }

    // push those that relevant to the array
    // note: using "2" becase the first two lines, raw and time, are already filled
    if (checker > 2) {
        log.push(entry);
    }
});

lr.on('end', function () {
    get_item_names();
});

function check_mononymous(name) {
    var result = false;
    for (i in mononymous_monsters) {
        if (mononymous_monsters[i] == name) {
            result = true;   
        }
    }
    return result;
}

function convert_time(raw) {
    // YYYY-mm-ddTHH:MM:ss
    var time = raw.split(' : ')[0].split(' ')[0].replace(/\./gi, '-')
    var date = raw.split(' : ')[0].split(' ')[1];
    var final = time + 'T' + date;
    return final;
}

function get_item_names() {
    var counter = 1;
    for (var i in log) {
        if (log[i].item_id != false) {            
            setTimeout(item_api, 500 * counter, i, log[i].item_id, log[i].raw);
            counter++;
        }
    }
}

// Function to Get Item Name Using NotAion's API
// This runs after the line-by-line operation is complete
// and then 
function item_api(index, item_id, raw) {
    request(item_api_url + item_id, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            
            var item = JSON.parse(body).item[0];
            console.log(index, item_id, raw);            
            log[index].item_acquired = item['name'];
            num_items_processed++;

            // once all items have been their names, export it to a JSON file
            if (num_items_processed == num_items) {
                
                console.log('Writing results to JSON');
                fs.writeFileSync('output/sample-log.json', JSON.stringify(log));
            }
        } else {
            console.error('request failed', index, item_id, raw);
        }
    });
}
