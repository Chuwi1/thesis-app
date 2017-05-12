# Why?

Need to paraphrase everything (lol...)

>"You can discover more about a person in an hour of play than in a year of conversation." 
>– PLATO

Talk about e-sports

#### Key points from: Toward Visualization for Games: Theory, Design Space, and Patterns (Brian Bowman, Niklas Elmqvist, Member, IEEE, and T.J. Jankun-Kelly, Member, IEEE)

2.2 Applied Visualization

Visualization for games is still in its infancy, but there is a number of existing visualization technologies that may be relevant to this novel domain. The target audience of a visualization for a computer game is one of the first issues to consider. If the visualization is targeted primarily at the gamer community, these visualizations will likely fall under the topic of casual information visualization [4]. 

Such visualizations will need to target attributes such as being “useful” and “pleasing” rather than “utilitarian.” If, on the other hand, the target audience is the development team, then techniques from software visualization [22]— such as for log traces, program structure, and run- time behavior—may be more appropriate. Bioware’s Skynet [23] is an example of such a developer-oriented telemetry and visualization framework that we will discuss in depth later on in this paper.

Just as for normal visualization, the data governs which technique to use. Because many games tend to be spatial in nature, spatiotemporal visualization techniques are often useful; see Andrienko and An- drienko [24] for an exhaustive survey. Other data may be abstract or purely temporal in nature, and for these we can apply temporal visualization techniques [25] as well as traditional statistical data graphics [26]. Furthermore, multidimensional, graph, and text vi- sualization techniques—currently very uncommon in games—may become more prevalent in the future.

Finally, a closely related, yet equally (if not more) unexplored, research topic is the use of visualization for sports. Sports share many of the characteristics of games in the types of data, the target audience, and the questions that the audience is likely to ask (not to mention the fact that sports games form an extremely popular share of the market). Medler [27] draws connections between the collection of statistics in sports and games; however, visualization is equally underutilized in both domains. TennisViewer [28], which visualizes tennis matches, is one of only a select few examples. More recently, Cox and Stasko [29] use information visualization to discover hidden mean- ing in baseball season data using bar displays and treemaps. Healey parses play-by-play summaries of NFL football games and combines temporal and spa- tial representations to visualize them graphically [30].


5.2 Replay Theater
Replay theaters are mechanisms for post-mortem anal- ysis of a game session by playing back the session, either for players to see their own performance or for Replay theaters are mechanisms for post-mortem analysis of a game session by playing back the session, either for players to see their own performance or for observers that are spectating on a match. Developers may also want to use replays to catch bugs and game design issues (it is integrated into the SkyNet [23] sys- tem). Gaming, particularly multiplayer gaming, has a long history of recording game sessions as videos (a practice more generally known as machinima [55]), but these restrict the viewer to just watching a non- interactive animation. Replay theaters take this a step further by recording telemetry for all entities in a game session, not just the screen of one player.

• Time controls: The addition of time controls relax the temporal constraints of the live gameplay and allows the viewer to navigate the recorded session in time, as well as freeze time at will.
• Space controls: Like time controls, the space con- trols pattern for a replay theater allows the user to freely navigate in the game environment to study the gameplay action from different viewpoints.
• Event timeline: Timeline visualizations can be in- tegrated with the replay theater to aid navigation in the replay data; for example, the theater mode in the recent Call of Duty: Black Ops [57] includes a timeline visualization that shows player deaths and kills over the course of the session (Figure 8).
Fig. 8. Playback control interface for the replay theater in Call of Duty: Black Ops [57]. Note the timeline on top that visualizes the player’s kills and deaths as green and red lines at different positions in time.


6.1 Social Motivators

In surveying the repertoire of games with visualiza- tion components, one trend is obvious: games sup- porting multiplayer are disproportionally represented in this list. The reason for this is that multiplayer games create a community of players interacting with each other inside the game, and this drives a need for communicating with each other, sharing game experiences, and comparing oneself to other players.

Having a strong community also causes a player’s investment of time and effort in a game to increase, thereby giving an incentive to players to create their own visualization components using live telemetry data provided by the game developers. The benefits are clearly major, and we hope that more game devel- opers in the future follow the example of games such as Spore [61] and Halo: Reach [66] in providing public APIs for accessing game statistics and telemetry.

6.2 Potential benefits to Games

A large portion of this paper has been about showcasing the benefit of applying visualization in games.
- Players can use visualization to improve their skills, be more aware of the game world and its state, and communicate their achivements and progress to fellow players
- Developers can use visualization to detect bugs, find game balance issues, and draw inspirtaion from player behavior
- Observers can use visualiztion to draw more enjoyment from watching others play through better access to game data
(Bowman, B., N. Elmqvist, and T. J. Jankun-Kelly)

6.3 Potential Benefits to Visualization

One obvious question in all this is what the benefit of applying visualization to games is to us as visualiza- tion researchers. While it can be argued that games have a long way to go until they start incorporating advanced visualization techniques, let alone begin to influence research in visualization as a field, the benefit of this approach lies more in adoption and impact than scientific progress. With more than 60 million video game consoles in North America alone, the video and computer game industry represents a huge base of potential casual users scattered in living rooms worldwide. As mentioned early on in this paper, we believe that we are on the cusp of a major adoption of visualization on a large scale, and visualization researchers should be part of this trend to help shape and guide it in the right direction.

Gamers are an interesting population because they are often very passionate and willing to spend time on improving their own gameplay, or sometimes just watch other people play. In addition, they often have a high degree of visual literacy and spatial ability [3]. Integrating visualization components in games represents a unique opportunity for tapping into this population and exposing it to our technologies.

As stated earlier in this paper, one potential synergy for games is the equally unexploited sports domain, which also shares many of the same challenges, audience, and opportunities—not to mention data types (primarily spatiotemporal data and simple statistics). One benefit may thus be that advances in one domain could also be applied to the other domain.
 
*THIS IS AN IMPORTANT POINT*
**Finally, while visual representations in games currently admittedly are simplistic, this is not to say that researchers cannot make significant progress by conducting visualization research related to games; in fact, many of the visualization problems encountered in games are reflections of similar problems encountered in the real world. The difference may be that the game world can be more easily controlled and instrumented than the real world. For this reason, we certainly believe there is ample opportunity for deriving new visualization techniques for game data that may become more broadly applicable to real- world data and real-world problems as well.**


7 Conclusions and Future Work

Drawing on a wide variety of examples from the last two decades of video game history, we formulate the design space of visualization for games as an exciting new branch of casual information visualization with the potential for broad impact in millions of living rooms worldwide. We proceed to use our framework to identify common design patterns for how to employ visualization in computer and video games.
It is clear that both the visualization and the game development communities so far only have scratched the surface of this exciting new problem domain. Our future work will continue mapping out interesting examples that will help progress in both fields.

----

The study of MMORPGs is highly relevant to research on social interaction in Shared Virtual Environments (SVE) and avatars at work and play in these environments. Although many of the theoretical implications of social interaction in virtual environments have been explored in the artificial confines of Virtual Reality (VR) research laboratories [3-8], MMORPGs are the only existing naturalistic setting where millions of users voluntarily immerse themselves in a graphical virtual environment and interact with each other through avatars on a daily basis. The opportunity to study what people actually do when they choose to be in a virtual environment with thousands of other people cannot be overstated, and the results and implications of a survey study of 30,000 MMORPG players will be presented in this chapter. (Yee 2006)

As video games are becoming more and more complex and are reaching a broader audience, there is an increasing interest in procedures to analyze player behavior and the impact of design decisions. Game companies traditionally relied on user-testing methods, like playtesting, surveys or videotaping, to obtain player feedback. However, these qualitative methods for data collection are time-consuming and the obtained data is often incomplete or subjective. Therefore, instrumentation became popular in recent years to unobtrusively obtain the detailed data required to thoroughly evaluate player behavior. To make sense of the large amount of data, appropriate tools and visualizations have been developed. (Wallner & Kriglstein 2013)

Gameplay metrics are usually stored in textual form in game logs or relational database systems which need to be processed and analyzed in some way. Traditionally, purely statistical ap- proaches (see, e.g., [24–26]) were used [2,5]. However, the inter- pretation of the data can be difficult, e.g., because of missing expertise with statistical methods. Therefore additional ap- proaches are necessary to support the analysis of gameplay data. The literature review showed us that there is an increasing interest in visualizations because they can help developers to analyze large amounts of multi-dimensional data and enable them to gain valu- able knowledge in order to understand player behavior (e.g., by visualizing player traces) and to discover patterns of what players are doing over time (e.g., by analyzing occurrence, context and fre- quency). Graphical representations of gameplay data make things visible or present things in a new light of which users were not aware of before and therefore support them in their decisions to improve the game [1,27]. (Wallner & Kriglstein 2013)

Based on these observations we want to give researchers and practitioners a state-of-the-art overview about different aspects for the analysis and particularly for the visualization of gameplay data. In the following sections we shortly discuss the various appli- cation areas of game metrics, present our attempt to categorize vi- sual methods for analyzing gameplay data, provide detailed descriptions and examples for each category and discuss open problems and topics for possible future work. (Wallner & Kriglstein 2013)

It has been recently reported that around 40% of Internet users play some form of an online game (http://www.develop-online.net/news/36618/40-of-all-internet-users-play-online-games). Among the games, Massively Multiplayer Online Role-Playing Games (MMORPGs for short), perhaps the most sophisticated and complex, are known to be enjoyed by a dedicated base composed of no less than 20 million people worldwid (http://www.brighthub.com/video-games/mmo/articles/35992.aspx). An MMOPRG typically features a real world-like arena set in a fantastical age in which gamers engage in a variety of interactions with other players through battles and commerce (e.g., exchange or sales of valuable items), or purely recreational activities. The existence of a large dedicated fan base is attributed to the engrossing and persistent nature of MMORPGs, the players being able to groom their characters over a time span of many months or years. (Korean Paper...)

Further, we identified possible directions for future research. Gameplay metrics analysis offers a rich and interesting field for re- search which goes beyond the mere application of statistical methods. (Wallner & Kriglstein 2013)

Playing computer games has become a social experience. Hundreds of thousands of players interact in massively multiplayer online games (MMORPG), a recent and successful genre descending from the pioneering multi-user dungeons (MUDs). These new games are purposefully designed to encourage interactions among players, but little is known about the nature and structure of these interactions. In this paper, we analyze player-to-player interactions in two locations in the game Star Wars Galaxies. We outline different patterns of interactivity, and discuss how they are affected by the structure of the game. We conclude with a series of recommendations for the design and support of social activities within multiplayer games. (The social side of gaming: a study of interaction patterns in a massively multiplayer online game)

#### Explain what MMORPGs are?


#### Explain other genres out there other than MMOs


#### Some visualization tools out there
Several visualization tools (e.g., Data Cracker [9], Lithium [28], PlayerViz [1] or Playtracer [5]) have been developed in the last years with the goal to assist the analytical process. Such visualization tools range from simple representa- tions like bar charts of a single variable (e.g., level completion times) to complex systems that consider different visualization techniques (e.g., maps in combination with player path representation).

#### Spectatorship, talk about sites like Twitch, PvPAllDay?

#### On Addiction

"I am addicted to EQ and I hate it and myself for it. When I play I sit down and play for a minimum of 12 hours at a time, and I inevitably feel guilty about it, thinking there a large number of things I should be doing instead, like reading or furthering my education or pursuing my career. But I can't seem to help myself, it draws me in every time. I have been out of work now for over a month and now find myself in a stressful, depressed state that is only quelled when I am playing EQ, because it's easy to forget about real world troubles and problems, but the problem is when you get back to the real world, problems and troubles have become bigger, and it's a bad, bad cycle. I've tried quitting seriously on several occasions. There are serious withdrawal pangs, anxiety, and a feeling of being lost and not quite knowing what next to do with yourself. [male, 26]" (Yee 2006)

"While the design of these environments, such as the sophisticated reward cycles based on operant conditioning paradigms [38], certainly plays a role in engaging users in problematic usage, it would be overly-simplistic to focus entirely on the architecture of the environment itself. After all, that perspective fails to account for why only certain users engage in problematic usage. It also fails to take into account that different users are motivated to participate in the environment for different reasons. One proposed model of problematic usage [37] approaches the environment as a place where many common anxieties can be overcome. For example, users who have low self-esteem can become powerful and competent in these environments and they are driven to achieve in these environments as a way of overcoming anxieties they have in the material world. Or for example, users who feel undervalued in the material world can become needed and valued members of groups or guilds. Users with poor self-image can choose to be as attractive and physically fit as they desire. Users with low internal locus-of-control gain a stronger sense of agency in these environments. Users with stressful problems can use these environments as escape. In short, these environments are seductive for some users because it empowers them in ways specific to their anxieties." (Yee 2006)


#### Shortcomings and limitations

However, these qualitative methods for data collection are time-consuming and the obtained data is often incomplete or subjective. Therefore, instrumentation became popular in recent years to unobtrusively obtain the detailed data required to thoroughly evaluate player behavior. To make sense of the large amount of data, appropriate tools and visualizations have been developed. (Wallner & Kriglstein 2013)

Even though gameplay metrics analysis has many advantages it does not provide reliable information about why a player is doing something [2–4,21,22]. In other words, game metrics fail to provide context, e.g., whether a player is having fun or not. However, as Lynn [22] points out, why can sometimes be the most important question. Canossa and Cheong [23] also emphasize that the re- corded behavior is not necessarily an expression of the player’s personality and intention. Several authors (e.g., [2,4,21]) therefore recommend to combine telemetry analysis with qualitative user research methods to get the best of both worlds. (Wallner & Kriglstein 2013)

Large game companies, like Microsoft, are able to mine enormous amounts of data not only for specific games but also across games via services such as Xbox Live (see, e.g., [101]). This is something that is usually not possible for independent research- ers. Fortunately, some game developers have started to provide public application programming interfaces (APIs) to access in- game telemetry data. Examples include the API for the game Spore [117,118] from Maxis, the BF3 Stats API [119] to access sta- tistics from Battlefield 3 and the World of Warcraft API [120]. While Bowman et al. [40] highlight the benefits of such APIs for community building, especially the latter API has become a favorite for the research community as evidenced by the number of publications on World of Warcraft ([32,98,100] are a few examples which are also concerned with visualization). (Wallner & Kriglstein 2013)

#### Interesting point

In recent years, some developers like Valve [20] have therefore started to view games as a service rather than as a product. (??? cited in Wallner & Kriglstein 2013)




