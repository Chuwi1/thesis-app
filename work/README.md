# Work

This section contains work and developments on the data.


# Data

Sample Log Containing Key Events
```
2017.03.31 21:49:59 : You changed the connection status to Online.
2017.03.31 22:33:09 : You have joined the Idgel Dome Landmark region channel.
2017.04.01 11:59:43 : You have played for 10 hour(s). Please take a break. 
2017.04.04 22:36:20 : AOEhoar-SL has logged in. 
2017.04.04 22:26:52 : AOEhoar has logged in. 
2017.04.05 22:10:37 : Visvasan-SL has logged out. 
2017.04.04 23:46:50 : Visvasan has logged out. 
2017.02.24 14:52:22 : [charname:Kinnari;0.6275 1.0000 0.6275] Whispers: u back? o.o
2017.02.24 14:52:31 : You Whisper to [charname:Kinnari;0.6275 1.0000 0.6275]: not really
2017.04.03 20:15:21 : You have earned 350,476,629 Kinah.
2017.04.03 11:35:41 : You spent 218,850,000 Kinah.
2017.04.01 00:34:29 : The Ancient Manastone: Magic Suppression +30 item has been sold by the broker.   
2017.03.11 01:22:52 : You sold the item.
2017.04.01 01:11:16 : You have acquired [item:188052501;ver8;;;;].
2017.02.24 20:03:45 : You have acquired [item:182215599;ver7;;;;] and stored it in your special cube. 
2017.04.05 15:10:59 : You have acquired 10,000 [item:188100335;ver8;;;;](s).
2017.04.04 23:53:09 : You have acquired 12,000 [item:188100391;ver8;;;;]s and stored them in your special cube. 
2017.03.10 03:37:34 : You successfully enchanted Provenance Greatsword by +2.
2017.03.10 17:30:16 : You have failed to enchant Provenance Greatsword.
2017.04.03 11:35:51 : You have successfully tempered Kaisinel's Bracelet. +1 temperance level achieved.
2017.04.03 11:34:55 : Tempering of Kaisinel's Bracelet has failed and the temperance level has decreased to 0.
2017.04.04 19:19:10 : Quest acquired: [Prestige/Daily] Prestigious Valor
2017.04.04 21:06:01 : Quest updated: [Urgent Order] Protect the Upper Abyss
2017.04.06 23:56:22 : Quest complete: [Alliance] Keep Up the Defense
2017.03.08 03:06:23 : You have gained 800 Abyss Points.
2017.03.08 01:34:00 : You used 57,090 Abyss Points.
2017.03.07 23:06:04 : You have gained 150 Glory Points.
2017.03.31 22:36:37 : You inflicted 113 damage on Crowley-SL.
2017.03.31 23:29:13 : You inflicted 296 damage on Primeval Mookie.
2017.03.31 22:35:06 : You inflicted 1,075 damage on LindWanijima-SL by using Wrathful Explosion.
2017.03.31 23:49:23 : You inflicted 2,005 damage on Primeval Mookie by using Tumultuos Surge.
2017.03.02 10:22:42 : You received 1,226 damage from Beritra's Rebels Raider . 
2017.03.31 22:38:00 : LindWanijima-SL has inflicted 5,730 damage on you by using Canted Shot.         
2017.04.05 21:05:59 : You received 2,726 damage due to Magma Burst. 
2017.02.26 12:05:44 : You receive 1,022 damage due to Fluttered Note Effect. 
2017.04.06 21:41:11 : You received 1,084 bleeding damage due to the effect of Far Wound.
2017.02.25 05:28:01 : You received 1,018 poisoning damage due to the effect of Wide Area Poison Slash. 
2017.02.25 05:28:22 : Critical Hit! You received 1,130 damage from Beritra's Rebels Raider . 
2017.03.31 22:36:37 : Critical Hit! You inflicted 1,136 critical damage on Crowley-SL.
2017.03.31 22:35:36 : Critical Hit!You inflicted 1,399 damage on LeonTyrron-SL by using Ferocious Strike.
2017.04.01 00:16:46 : Critical Hit!You inflicted 4,121 damage on Primeval Mookie by using Tumultuos Surge.
2017.04.05 21:26:13 : Critical Hit! You inflicted 2,509 critical damage on Prime Tumon I.
2017.03.31 22:37:59 : Critical Hit!LindWanijima-SL has inflicted 1,138 damage on you by using Crosstrigger.   
2017.04.03 11:15:02 : Critical Hit!You receive 1,079 damage due to Chain of Earth. 
```

Ruleset
```js
/**
 *  Log Parser
 *  
 *
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
    entry.friend_logged_in = false;
    entry.friend_logged_out = false;
    entry.whisper_from = false;
    entry.whisper_to = false;
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

            // if there is, assign attribute this way
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

        // ommit chat content from raw string
        entry.raw = entry.raw.split('] Whispers: ')[0] + '] Whispers:';
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
        entry.item_id = Number(line.split('item:')[1].split(';')[0]);
        entry.item_quantity = Number(line.split(' [item')[0].split('acquired ')[1].replace(/,/gi, ''));
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

    // Damage Inflicted
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
            entry.target = line.split('damage on ')[1].split(' by')[0].trim();
        } 

        // if skill doesn't exist
        else {
            // Assign Target as Per Normal 
            entry.damage_target = line.split('damage on ')[1].split('.')[0].trim();
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
    }
    
    // You Received Damage Due to The Effect Of
    // 2017.04.06 21:41:11 : You received 84 bleeding damage due to the effect of Far Wound.
    // 2017.02.25 05:28:01 : You received 108 poisoning damage due to the effect of Wide Area Poison Slash. 

    if (line.indexOf('You received') >= 0 && line.indexOf('due to the effect of') >= 0) {
        entry.damage_received = Number(line.split('received ')[1].split(' ')[0].replace(/,/gi, '').trim());
        entry.damage_skill = line.split('effect of ')[1].split('.')[0].trim();
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
    
    if (line.indexOf('Critical Hit!') >= 0) {
        entry.damage_critical = true;
    }

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
    for (var i in log) {
        if (log[i].item_id != false) {
            item_api(i, log[i].item_id);
        }
    }
}

// Function to Get Item Name Using NotAion's API
function item_api(index, item_id) {
    request(item_api_url + item_id, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var item = JSON.parse(body).item[0];
            log[index].item_acquired = item['name'];
            num_items_processed++;
            // Once All Items Have Been Given Their Name, Generate JSON file.
            if (num_items_processed == num_items) {
                fs.writeFileSync('output/log.json', JSON.stringify(log));
            }
        } else {
            console.error('request failed');
        }
    });
}

```
Sample Output
```js
{ raw: '2017.04.05 15:10:59 : You have acquired 10,000 [item:188100335;ver8;;;;](s).',
  time: '2017-04-05T15:10:59',
  logged_in: false,
  region: false,
  hours_played: false,
  friend_logged_in: false,
  friend_logged_out: false,
  whisper_from: false,
  whisper_to: false,
  money_earned: false,
  money_spent: false,
  ap_earned: false,
  ap_spent: false,
  gp_earned: false,
  item_sold_broker: false,
  item_sold_npc: false,
  item_acquired: 'Magic Powder',
  item_id: 188100335,
  item_quantity: 10000,
  enchant_item: false,
  enchant_increase: false,
  temper_item: false,
  temper_increase: false,
  quest_acquired: false,
  quest_updated: false,
  quest_completed: false,
  damage_inflicted: false,
  damage_received: false,
  damage_critical: false,
  damage_skill: false,
  damage_target: false,
  damage_target_npc: false,
  damage_target_player: false,
  damage_source: false,
  damage_source_npc: false,
  damage_source_player: false }
```

## Monsters with one word in their names

```
"Abunka",
"Abyla",
"Acolyte",
"Aetherflame",
"Aetherguard",
"Aetherogeneticist",
"Aethertech_Barricade",
"Aethertech_BindPoint01",
"Aethertech_BindPoint04",
"Agrima",
"Agrint",
"Ahserion",
"Aionguard",
"Airon",
"Aishi",
"Akhal",
"Alarm",
"Aldreen",
"Ampha",
"Andrastar",
"Andre",
"Angparinerk",
"Anubite",
"Anvilface",
"Arachna",
"Archer",
"Arges",
"Argush",
"Asan",
"Asmodian_Polymorph_Chihuahua",
"Asmodian_Polymorph_Dobermann",
"Asmodian_Polymorph_Lamb",
"Asmodian_Polymorph_Pomeranian",
"Assailant",
"Assassin",
...
```

## Preliminary Data Structure
```
{
	"name":"Applied",
	"class":"Templar",

	"communication": 
	{
		"outgoing": 
		{
			"charName1": ["2017.02.24 14:54:24", "2017.02.24 14:54:43"],
			"charName2": ["2017.02.24 14:54:24", "2017.02.24 14:54:43"],
			"charName3": ["2017.02.24 14:54:24", "2017.02.24 14:54:43"]
		},

		"incoming": 
		{
			"charName1": ["2017.02.24 14:54:24", "2017.02.24 14:54:43"],
			"charName4": ["2017.02.24 14:54:24", "2017.02.24 14:54:43"],
			"charName3": ["2017.02.24 14:54:24", "2017.02.24 14:54:43"]
		}
	},

	"places": 
	{
		"instances": 
		{
			"Smoldering Fire Temple": ["2017.02.24 14:54:24", "2017.02.24 14:54:43"],
			"Fissure of Oblivion": ["2017.02.24 14:54:24", "2017.02.24 14:54:43"],
			"Contaminated Underpath": ["2017.02.24 14:54:24", "2017.02.24 14:54:43"]
		},

		"cities":
		{ 
			"Iluma": ["2017.02.24 14:54:24", "2017.02.24 14:54:43"],
			"Reshanta": ["2017.02.24 14:54:24", "2017.02.24 14:54:43"],
			"Cygnea": ["2017.02.24 14:54:24", "2017.02.24 14:54:43"]				
		}
	},

	"finance": 
	{
		"spent":
		{
			{ "time": "2017.02.24 14:54:24", "amount": 10203311 },
			{ "time": "2017.02.24 14:54:25", "amount": 931941 },
			{ "time": "2017.02.24 14:54:34", "amount": 2000000 
		},

		"earned":
		[
			{ "time": "2017.02.24 14:54:24", "amount": 10203311 },
			{ "time": "2017.02.24 14:54:25", "amount": 931941 },
			{ "time": "2017.02.24 14:54:34", "amount": 2000000 }
		]
	},

	"combat": 
	{
		"outgoing":
		{
			"Entangling Chains": [2017.02.24 14:54:24", "2017.02.24 14:54:43"],
			"Aether Leash": [2017.02.24 14:54:24", "2017.02.24 14:54:43"],
			"Break Power": [2017.02.24 14:54:24", "2017.02.24 14:54:43"]			
		},
		
		"received":
		{
			"Entangling Chains": [2017.02.24 14:54:24", "2017.02.24 14:54:43"]],
			"Aether Leash": [2017.02.24 14:54:24", "2017.02.24 14:54:43"]],
			"Break Power": [2017.02.24 14:54:24", "2017.02.24 14:54:43"]]	
		}
	}
	
	"items":
	{
		"acquired":
		{
			{ "time": "2017.02.24 14:54:43", "item": "Provenance Greatsword", "quantity": 1 },
			{ "time": "2017.02.24 18:54:53", "item": "Polearm of Provenance", "quantity": 1 }
		}
	}
}
```


User Logged On
```raw
2017.02.24 14:18:55 : You changed the connection status to Online.
```

Class of the User's Avatar
```
2017.02.24 14:19:08 : You have joined the Templar Channel. 
```

Looking for Group Channel. People use this to look for groups for instances as well as advertise items to want to buy/sell.
```
2017.02.24 14:21:49 : [3.LFG] [charname:Spiritrow;1.0000 0.6941 0.6941]: WTT/S CHAIN MYSTIC+15 3 PARTS FOR CLOTH MYSTIC +15 
2017.02.24 14:21:49 : [3.LFG] [charname:Torrr;1.0000 0.6941 0.6941]: WTB[item:188057312;ver7;;;;] 8b[item:167010307;ver7;;;;]1b [item:167010304;ver7;;;;]1.5b [item:166030005;ver7;;;;]200 mil any quantity 
2017.02.24 14:21:50 : [3.LFG] [charname:Miguelgaboo;1.0000 0.6941 0.6941]: [cmd:Miguelgaboo;PPqHEYzRFjIbsU112NB39getZEoA/KBwj0bHOcA5Vyg=]DR Need DPS  
2017.02.24 14:22:06 : [3.LFG] [charname:MaliciousCrazy;1.0000 0.6941 0.6941]: WTS [item:110302058;ver7;????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????;;;]SET FULL!!! PM OFFER! 
2017.02.24 14:22:14 : [3.LFG] [charname:Suy;1.0000 0.6941 0.6941]: WTB [item:166030005;ver7;;;;] 220mil/ea 
2017.02.24 14:22:22 : [3.LFG] [charname:ReLife;1.0000 0.6941 0.6941]: [cmd:ReLife;1nshTIPdp9aY9ymyWO4qdQjdsQMPof2BkC6IG4zYhoM=]event need glad and sorc 
```

Trade Channel
```
2017.02.24 16:45:40 : [2.Trade] [charname:YinZei;1.0000 0.6941 0.6941]: WTS[item:188057312;ver7;;;;][pos:Location;0 110010000 1362.8 1509.8 0.0 0] i got 2    10b each 
```

Outgoing Trade
```
2017.03.07 18:13:56 : You sent a trade message to Manuleiva. 
```

Completed Trades
```
2017.03.13 19:07:40 : The trade is complete. 
```

Item acquisition
```
2017.03.11 05:00:02 : You have acquired [item:188100406;ver7;;;;]. 
```

User Avatar Challenged Someone in Duel
```
2017.02.26 13:09:33 : You challenged Kobayashii to a duel. 
2017.02.26 13:09:42 : Starting the duel with Kobayashii. 
2017.02.26 13:10:02 : You won the duel against Kobayashii. 
```

Duels Happening Around the User
```
2017.03.06 04:51:02 : A duel between kiiarra and Acoz has started. 
2017.03.06 04:51:42 : Acoz defeated kiiarra in a duel. 
```
Duel Example
```
2017.03.03 20:09:21 : You challenged lllmackylll to a duel. 
2017.03.03 20:09:24 : Your Stun, Knock Back, Stumble, Spin, and Aerial Thrust Resistance Values has been boosted by using Unwavering Devotion. 
2017.03.03 20:09:24 : lllmackylll is in the boost parry state as it used Wall of Steel. 
2017.03.03 20:09:24 : Your Attack has been boosted by using Divine Fury. 
2017.03.03 20:09:25 : lllmackylll is in the boost Attack state because lllmackylll used Berserking. 
2017.03.03 20:09:25 : lllmackylll is in the weaken Accuracy state because lllmackylll used Berserking. 
2017.03.03 20:09:25 : lllmackylll is in the weaken Physical Def state because lllmackylll used Berserking. 
2017.03.03 20:09:25 : Your Attack has been boosted by using Empyrean Fury. 
2017.03.03 20:09:25 : Your Magical Acc has been boosted by using Empyrean Fury. 
2017.03.03 20:09:25 : Your Magic Boost has been boosted by using Empyrean Fury. 
2017.03.03 20:09:26 : Starting the duel with lllmackylll. 
2017.03.03 20:09:26 : Your Physical Def has been weakened by using Reroute Power. 
2017.03.03 20:09:26 : You received the effect by using Reroute Power. 
2017.03.03 20:09:27 : Your Magic Resist has been boosted by using Aether Armor. 
2017.03.03 20:09:27 : lllmackylll parried the attack. 
2017.03.03 20:09:27 : Critical Hit!You inflicted 902 damage on lllmackylll by using Inquisitor's Blow. 
2017.03.03 20:09:27 : Reroute Power has been activated. 
2017.03.03 20:09:27 : lllmackylll received 173 damage due to the effect of Reroute Power. 
2017.03.03 20:09:27 : lllmackylll is in the boost Stun, Knock Back, Stumble, Spin, and Aerial Thrust Resistance Values state because lllmackylll used Unwavering Devotion. 
2017.03.03 20:09:28 : lllmackylll parried the attack. 
2017.03.03 20:09:28 : Critical Hit!You inflicted 822 damage on lllmackylll by using Aether Leash. 
2017.03.03 20:09:28 : lllmackylll parried the attack. 
2017.03.03 20:09:28 : Critical Hit!lllmackylll's movement speed decreased as you used Aether Leash. 
2017.03.03 20:09:28 : Reroute Power has been activated. 
2017.03.03 20:09:28 : lllmackylll received 179 damage due to the effect of Reroute Power. 
2017.03.03 20:09:30 : lllmackylll parried the attack. 
2017.03.03 20:09:30 : You inflicted 470 damage on lllmackylll. 
2017.03.03 20:09:30 : Reroute Power has been activated. 
2017.03.03 20:09:30 : lllmackylll received 173 damage due to the effect of Reroute Power. 
2017.03.03 20:09:31 : lllmackylll parried the attack. 
2017.03.03 20:09:31 : Critical Hit!You inflicted 1,145 damage on lllmackylll by using Sword Storm. 
2017.03.03 20:09:32 : lllmackylll has inflicted 506 damage on you by using Ferocious Strike. 
2017.03.03 20:09:32 : Reroute Power has been activated. 
2017.03.03 20:09:32 : lllmackylll received 173 damage due to the effect of Reroute Power. 
2017.03.03 20:09:32 : lllmackylll parried the attack. 
2017.03.03 20:09:32 : You inflicted 566 damage on lllmackylll by using Dazing Severe Blow. 
2017.03.03 20:09:32 : lllmackylll parried the attack. 
2017.03.03 20:09:32 : lllmackylll's attack speed has decreased because Applied used Dazing Severe Blow. 
2017.03.03 20:09:32 : lllmackylll parried the attack. 
2017.03.03 20:09:32 : Applied has weakened lllmackylll's Physical Def by using Dazing Severe Blow. 
2017.03.03 20:09:32 : Reroute Power has been activated. 
2017.03.03 20:09:32 : lllmackylll received 173 damage due to the effect of Reroute Power. 
2017.03.03 20:09:33 : lllmackylll parried the attack. 
2017.03.03 20:09:33 : You inflicted 581 damage on lllmackylll by using Divine Blow. 
2017.03.03 20:09:33 : Reroute Power has been activated. 
2017.03.03 20:09:33 : lllmackylll received 173 damage due to the effect of Reroute Power. 
2017.03.03 20:09:33 : lllmackylll is in the boost Attack state because lllmackylll used Rage. 
2017.03.03 20:09:33 : lllmackylll is in the defense shield state as it used Rage. 
2017.03.03 20:09:34 : lllmackylll parried the attack. 
2017.03.03 20:09:34 : The attack was blocked by the protective shield effect cast on lllmackylll. 
2017.03.03 20:09:34 : Critical Hit! You inflicted 235 critical damage on lllmackylll. 
2017.03.03 20:09:34 : lllmackylll parried the attack. 
2017.03.03 20:09:34 : You inflicted 74 damage on lllmackylll. 
2017.03.03 20:09:34 : lllmackylll parried the attack. 
2017.03.03 20:09:34 : You inflicted 74 damage on lllmackylll. 
2017.03.03 20:09:34 : lllmackylll parried the attack. 
2017.03.03 20:09:34 : Critical Hit!You inflicted 1,716 damage on lllmackylll by using Punishing Thrust. 
2017.03.03 20:09:34 : Reroute Power has been activated. 
2017.03.03 20:09:34 : lllmackylll received 173 damage due to the effect of Reroute Power. 
2017.03.03 20:09:34 : lllmackylll has inflicted 551 damage on you by using Counter Leech. 
2017.03.03 20:09:35 : Reroute Power has been activated. 
2017.03.03 20:09:35 : lllmackylll received 173 damage due to the effect of Reroute Power. 
2017.03.03 20:09:35 : lllmackylll parried the attack. 
2017.03.03 20:09:35 : You inflicted 750 damage on lllmackylll by using Holy Punishment. 
2017.03.03 20:09:35 : Reroute Power has been activated. 
2017.03.03 20:09:35 : lllmackylll received 173 damage due to the effect of Reroute Power. 
2017.03.03 20:09:36 : lllmackylll parried the attack. 
2017.03.03 20:09:36 : Critical Hit!You inflicted 667 damage on lllmackylll by using Punishment. 
2017.03.03 20:09:36 : lllmackylll restored 826 HP with Counter Leech. 
2017.03.03 20:09:36 : lllmackylll has inflicted 642 damage on you by using Crushing Blow. 
2017.03.03 20:09:36 : lllmackylll has knocked you down by using Crushing Blow. 
2017.03.03 20:09:36 : You have used Saam King's Herbs. 
2017.03.03 20:09:36 : You recovered 1,130 HP. 
2017.03.03 20:09:36 : Reroute Power has been activated. 
2017.03.03 20:09:36 : You can see again 
2017.03.03 20:09:36 : lllmackylll received 173 damage due to the effect of Reroute Power. 
2017.03.03 20:09:38 : You are no longer shocked. 
2017.03.03 20:09:38 : Your Stun, Knock Back, Stumble, Spin, and Aerial Thrust Resistance Values has been boosted by using Remove Shock I. 
2017.03.03 20:09:38 : lllmackylll parried the attack. 
2017.03.03 20:09:38 : You inflicted 637 damage on lllmackylll by using Ensnaring Blow. 
2017.03.03 20:09:38 : lllmackylll has inflicted 608 damage on you by using Absorbing Fury. 
2017.03.03 20:09:38 : Reroute Power has been activated. 
2017.03.03 20:09:38 : lllmackylll received 173 damage due to the effect of Reroute Power. 
2017.03.03 20:09:38 : lllmackylll restored its movement speed. 
2017.03.03 20:09:39 : You must use Chain Skills in order. 
2017.03.03 20:09:40 : lllmackylll parried the attack. 
2017.03.03 20:09:40 : Critical Hit! You inflicted 753 critical damage on lllmackylll. 
2017.03.03 20:09:40 : lllmackylll parried the attack. 
2017.03.03 20:09:40 : You inflicted 75 damage on lllmackylll. 
2017.03.03 20:09:40 : lllmackylll parried the attack. 
2017.03.03 20:09:40 : You inflicted 75 damage on lllmackylll. 
2017.03.03 20:09:40 : Critical Hit!You inflicted 1,404 damage on lllmackylll by using Ferocious Strike. 
2017.03.03 20:09:40 : lllmackylll restored 304 HP with Absorbing Fury. 
2017.03.03 20:09:40 : Reroute Power has been activated. 
2017.03.03 20:09:40 : lllmackylll received 173 damage due to the effect of Reroute Power. 
2017.03.03 20:09:40 : Reroute Power has been activated. 
2017.03.03 20:09:40 : lllmackylll received 173 damage due to the effect of Reroute Power. 
2017.03.03 20:09:41 : You inflicted 783 damage on lllmackylll. 
2017.03.03 20:09:41 : lllmackylll has inflicted 1,119 damage on you by using Sure Strike. 
2017.03.03 20:09:41 : Your Attack has been boosted by using Rage. 
2017.03.03 20:09:41 : You gave yourself a defense shield by using Rage. 
2017.03.03 20:09:41 : Paralyze has been activated. 
2017.03.03 20:09:42 : You inflicted 1,015 damage on lllmackylll by using Slash Artery. 
2017.03.03 20:09:42 : You caused lllmackylll to bleed by using Slash Artery. 
2017.03.03 20:09:43 : Critical Hit! You inflicted 1,439 critical damage on lllmackylll. 
2017.03.03 20:09:43 : You inflicted 143 damage on lllmackylll. 
2017.03.03 20:09:43 : You inflicted 143 damage on lllmackylll. 
2017.03.03 20:09:44 : You won the duel against lllmackylll. 
```

Defeated (is this for players in the opposing faction?)
```
2017.03.11 06:41:28 : You have defeated Ararmathesecond. 
```

Incoming Whisper (Character Name Masked)
```
2017.02.24 14:52:22 : [charname:_____;0.6275 1.0000 0.6275] Whispers: u back? o.o
```

Outgoing Whisper (Character Name Masked)
```
2017.02.24 14:52:31 : You Whisper to [charname:_____;0.6275 1.0000 0.6275]: not really
```

Damage done to monster from skill (critical & non-critical)
```
2017.03.14 05:09:52 : You inflicted 1,615 damage on Ancient Drakan Warrior by using Dazing Severe Blow. 
2017.03.14 05:10:04 : Critical Hit!You inflicted 2,541 damage on Ancient Drakan Warrior by using Ferocious Strike.
```

Damage done to monster from auto-attack
```
2017.03.14 05:10:04 : You inflicted 125 damage on Ancient Drakan Warrior. 
```

Damage received
```
2017.03.14 03:12:43 : You received 1,378 damage from Bakarma Legion Drakan Elite Magical Soldier. 
```

Damage received from another PC (PCs only have one word in their names, NPCs have more than one)
```
2017.03.14 21:37:15 : Critical Hit! You received 476 damage from Peacekeyper-TM. 
```


Avatar Death
```
2017.02.25 06:55:44 : You have died. 
```

Death (Others)
```
2017.02.25 07:24:38 : healereye has died.
```

Sound-Bound Items
```
2017.03.08 06:12:13 : You have successfully soul-bound Provenance Greatsword. 
```

Enchantment
```
2017.03.10 03:34:05 : You successfully enchanted Provenance Greatsword by +1. 
2017.03.10 03:34:44 : You successfully enchanted Provenance Greatsword by +2. 
2017.03.10 03:37:34 : You successfully enchanted Provenance Greatsword by +2. 
2017.03.10 03:40:17 : You successfully enchanted Provenance Greatsword by +2. 
2017.03.10 13:10:49 : You successfully enchanted Provenance Greatsword by +2. 
2017.03.10 16:42:54 : You successfully enchanted Provenance Greatsword by +2. 
2017.03.10 16:48:04 : You successfully enchanted Provenance Greatsword by +1. 
2017.03.10 17:29:00 : You successfully enchanted Provenance Greatsword by +2. 
2017.03.13 00:37:17 : You successfully enchanted Provenance Greatsword by +1. 
2017.03.13 00:37:17 : _____ has succeeded in enchanting Provenance Greatsword to level 15. 
```

Enchantment Failure
```
2017.03.10 17:30:16 : Failed to enchant Provenance Greatsword. The item was destroyed. 
```

Armsfusion
```
2017.03.13 18:56:10 : Divine Claymore of the Arena Conqueror has been combined with Provenance Greatsword. 
```

Joined Instances (Solo)
```
2017.03.14 04:46:37 : You have entered Raksang Ruins. Your allies are barred from joining you.
2017.03.04 13:32:11 : You have entered Fissure of Oblivion. Your allies are barred from joining you. 
```

Joined Instances (Group)
```
2017.02.25 17:34:24 : You have joined the Smoldering Fire Temple region channel. 
```

Cities/Towns/Areas Travelled to
```
2017.02.25 08:51:15 : You have joined the Kaisinel Academy region channel. 
2017.02.25 08:51:15 : You have joined the Kaisinel Academy trade channel. 
2017.02.25 08:51:32 : You have joined the Sanctum region channel. 
2017.02.25 08:51:32 : You have joined the Sanctum trade channel. 
2017.02.25 09:13:07 : You have joined the Kaisinel Academy region channel. 
2017.02.25 09:13:07 : You have joined the Kaisinel Academy trade channel. 
2017.02.25 09:13:39 : You have joined the Iluma region channel. 
2017.02.25 09:13:39 : You have joined the Iluma trade channel. 
2017.02.25 09:14:39 : You have joined the Reshanta region channel. 
2017.02.25 09:14:40 : You have joined the Reshanta trade channel. 
2017.02.25 09:15:25 : You have joined the Verteron region channel. 
2017.02.25 09:15:25 : You have joined the Verteron trade channel. 
2017.02.25 09:15:58 : You have joined the Reshanta region channel. 
2017.02.25 09:15:58 : You have joined the Reshanta trade channel. 
2017.02.25 09:30:53 : You have joined the Cygnea region channel. 
2017.02.25 09:30:53 : You have joined the Cygnea trade channel. 
2017.02.25 15:25:43 : You have joined the Sanctum region channel. 
2017.02.25 15:25:43 : You have joined the Sanctum trade channel. 
```

Number of times grouped with people
```
2017.02.24 22:04:06 : You have joined the group. 
2017.02.25 03:36:56 : You have joined the group. 
2017.02.25 05:34:08 : You have joined the group. 
2017.02.25 07:18:15 : You have joined the group. 
2017.02.25 16:21:00 : You have joined the group. 
2017.02.25 17:08:00 : You have joined the group. 
2017.02.25 17:09:25 : You have joined the group. 
```

Expenses
```
2017.03.14 21:42:59 : You spent 1,880,000 Kinah. 
```

Earnings
```
2017.02.24 17:39:39 : You have earned 150,660 Kinah. 
```

Purchases
```
2017.03.14 21:42:59 : You have purchased 20 [item:160001274;ver7;;;;]s. 
```