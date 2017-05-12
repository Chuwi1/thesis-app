Feed back from Daniel:

Don't use the word "they" cus it's like categrorizing them 

Consider using words like "players", however find a more precise word? Also, would it be may be too repetitive to keep saying "players"?

## Introduction

> "You can discover more about a person in an hour of play than in a year of conversation." – PLATO

This thesis attempts to explore the activity of players in a Massive Multiplayer Online Role Playing Game (MMORPG) by visualizing the interactions they engage in while playing the game and reveal patterns behind them. What do they do while playing the game? Who do they meet and who do they talk to? Do they spend more time interacting with humans or the virtual environment? What are their usage patterns like and what motivates them to become so invested in these shared virtual environments? Not much is known about the structure and nature of these interactions. Hence, I plan to investigate these interactions through a visualization to better understand the psychology and the patterns behind them. I will be using the shared virtual environment of Aion (an MMORPG released in 2009) as the backdrop for this project. It will be the environment through which these interactions are captured and visualized from. I picked Aion is because it is a highly successful MMORPG that has been around for a long time, and has a large player base. Aion was developed by a Korean gaming company called NCSOFT, and they have gaming servers and offices in Asia, Europe, and North America. I have personally played this game myself in the past and am familiar with the concept and mechanics of the game.

## Why Online Games?

In 2013, an industry study by Dutch games publisher Spil Games reported that 44% of the global internet population plays online games. In real terms, that is over 700 million people across the globe, with males making up 54% of that figure and females making up 46%. Also, the total number people who play games (both online and offline) worldwide is expected to surpass 1.2 billion by the end of 2013; a staggering 17% of the world’s population. This phenomenon can be explained by the decreasing cost of internet access and free-to-play games that are available and accessible to everyone. Online games also have a broad demographic appeal with both men and women well represented in all age categories. (Spil Games, 2013)

There is a popular belief is that playing computer games is a solitary activity. However, King and Borland (2003) argues that it is not, and instead, it is becoming more and more of a social experience. It is a social experience where hundreds of players log onto a shared virtual environment and interact with each other in a game. They either compete against each other or collaborate with other players to defeat sophisticated artificial intelligence and achieve complicated objectives. However, what is known about the nature and structure of these interactions remain little. An example of these types of online games is Massively Multiplayer Online Roleplaying Games, or commonly referred to as MMORPGs, and many of them are engineered specifically to spur interactions among players. (Ducheneaut, Nicolas, and Moore, 2004) MMORPGs are typically set in a 3D fantasy world where players can choose preset or templated roles, a side or faction to belong to, and engage in a wide range of interactions with other players through battles, commerce, and recreational activities. There is usually an overarching storyline to the game as well. Players can also groom their characters over long periods of time, be it upgrading their items or buying skins to look better. (Son et al. 2012) 

Yee (2016) suggested that in the study of social interactions in shared virtual environments, MMORPGs are highly relevant because they are they only existing naturalistic setting where millions of users voluntarily immerse themselves in a graphical virtual environment and interact with each other through avatars on a daily basis. Therefore, the opportunity to study what people actually do when they choose to be in a virtual environment with thousands of other people cannot be overstated. (Yee, 2016)

As games are evolving to become increasingly more complex, they are also and reaching a much wider audience. Hence, there is a rising interest in the procedures used to analyze player behavior in games. (Wallner & Kriglstein, 2013) Son et al. (2012) argues that given the complexity and longevity of the user experiences in MMORPGs, they now rival the real life, and that they present an extremely promising opportunity to study and understand the patterns and dynamics of complex human behavior in depth. This also means data visualization can play a significant role in contributing into this space. Besides, the visualization problems faced in games are reflections of similar problems faced in the real world. The only difference between the two is that shared virtual environments are more easily controlled and instrumented. Therefore, it is possible that new visualization techniques derived from gaming data space may also apply more broadly to real-world data and real-world problems as well. (Bowman, Elmqvist, and Jankun-Kelly, 2012)

## Methodology

This project investigates the in-game activity and behavior of a player through the categories stated below.

1. **Messaging**

We will investigate the number of private messages the player sends to and receives from another player, and the number messages the player sends to a specific group of players (e.g., party group, legion channel, class channel, trade channel, and looking for group channel). This would very importantly give us the pulse of the player’s social activity in the game. Unfortunately, we cannot yet determine whether a player from a specific group is addressing the player in subject, hence, we recognize that the visual outcome might be lopsided in this case. However, if this is omitted, we will lose an important signal, and it is therefore vital that it is retained. Lastly, for privacy purposes, we will not include the contents of all the messages. 

2. **Combat**

Here, we examine the complex combat mechanics of the game by showing the skills players use against each other and non-player characters, and the effects that they inflict.  

3. **Finance**

Spending habits is a reflection of one’s personality. This category will reveal how much money the player earns and spends in the game. The main currency used in Aion is called “Kinah”, and it allows players to buy items, services, and transportation between areas and regions. Players can earn Kinah by completing quests, selling items, and killing non-player characters. Without it, it is impossible to progress in the game. There are other forms of currency that exist in the game, such as medals, tokens, and special points, which can be earned through similar ways. These alternative currencies allow players to purchase special items that cannot be bought using Kinah, and are therefore harder to earn. However, some of these alternative currencies and special items can be traded and sold to another player, and often come at a hefty price. There are instances of players who use real money to buy or earn Kinah. Although Aion is a free-to-play game, they have an online store that lets you use real money to buy in-game products and services, such as scrolls, potions, pets, costumes, etc. These items can be sold in the game for Kinah, and some players use their earnings to make their characters stronger so that they can progress faster in the game. There is a greater virtual economic phenomenon that exists beyond Aion, and it is called Real Money Trading (RMT). This phenomenon is mainly driven by Chinese gold farming companies that specialize in farming game currency in games. They do so either by deploying bots in the game to kill non-player characters, or employ a significant number of people to play the game constantly with the sole objective of earning game currency. You can buy game currency from them by using real money, for example, one billion Kinah in Aion would cost you USD$16.85 from OKAYGOLD.COM. These rates change according to supply and demand. Their services stretch to cover a wide array of online games, such as World of Warcraft, Blade and Soul, and Diablo III, just to name a few. In addition, you can even trade game currencies across different games by selling game currency to them. The reason why it is important to discuss both the online store and RMT phenomenon is because they have an influence over the game’s economy and the spending habits of players. There are players who have spent over USD$20,000 to be competitive in Aion.

4. **Items**

*Elaborate*

5. **Enchantments**

*Elaborate*

6. **Area/Regional Travel**

*Elaborate*

7. **Quests**

*Elaborate*


We will be using log files generated from the game client to visualize the categories state above. The log file captures most of the player’s interaction in the game and stores them in time-stamped format. However, the Aion game client does not automatically generate these log files. So we had to use and a third party program to get the game client to generate it. The third party program is called Aion RainMeter, which is basically a Damage Per Second (DPS) meter that aggregates the amount of damage a player does in the game by parsing the log file. Below is a snippet of how the log file looks like:

```
2017.02.24 14:52:22 : [charname:Kinnari;0.6275 1.0000 0.6275] Whispers: u back? o.o
2017.02.24 14:52:31 : You Whisper to [charname:Kinnari;0.6275 1.0000 0.6275]: not really
2017.02.26 14:10:02 : You have failed to enchant Mystic Guardian Functionary's Divine Breastplate.
2017.03.10 03:37:34 : You successfully enchanted Provenance Greatsword by +2.
2017.03.31 21:49:59 : You changed the connection status to Online.
2017.03.31 22:33:09 : You have joined the Idgel Dome Landmark region channel.
2017.03.31 22:35:06 : You inflicted 1,075 damage on LindWanijima-SL by using Wrathful Explosion.
2017.03.31 22:35:36 : Critical Hit!You inflicted 1,399 damage on LeonTyrron-SL by using Ferocious Strike.
2017.03.31 22:52:21 : The Hemorrhage Shot item has been sold by the broker.
2017.04.01 00:34:29 : The Ancient Manastone: Magic Suppression +30 item has been sold by the broker.
2017.04.01 01:11:16 : You have acquired [item:188052501;ver8;;;;]. 
2017.04.01 01:39:19 : Critical Hit! You received 362 damage from Driver-KR.
2017.04.04 19:19:10 : Quest acquired: [Prestige/Daily] Prestigious Valor
2017.04.04 21:06:01 : Quest updated: [Urgent Order] Protect the Upper Abyss
2017.04.03 11:35:41 : You spent 218,850,000 Kinah.
2017.04.03 11:35:51 : You have successfully tempered Kaisinel's Bracelet. +1 temperance level achieved.
2017.04.03 20:15:21 : You have earned 350,476,629 Kinah.
2017.04.06 23:56:22 : Quest complete: [Alliance] Keep Up the Defense
```

A set of rules was then written to parse these log files and mapping each piece of information do the corresponding category.