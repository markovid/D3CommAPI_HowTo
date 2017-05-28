/***********************
 *Dylan Markovic
 *CS290 How To 
 *Due 5.28.2017
 ************************/
console.log("hello world");

var apiKey ='7y2eektjvhfu98expct5hwm4w6hvb9r6';
var imageURL = 'https://blzmedia-a.akamaihd.net/d3/icons/items/large/';



document.addEventListener('DOMContentLoaded', bindUsernameButton);
	function bindUsernameButton(){
		document.getElementById('UsernameSubmit').addEventListener('click', function(event){
			var reqPlayer = new XMLHttpRequest();
			var Username1 = document.getElementById('Username1').value;
			console.log('Username is ' + Username1);
			reqPlayer.open('GET', 'https://us.api.battle.net/d3/profile/' + Username1 + '/?locale=en_US&apikey=' + apiKey, true);
			reqPlayer.addEventListener('load', function(){
				if(reqPlayer.status >= 200 && reqPlayer.status < 400){
					var player1 = JSON.parse(reqPlayer.responseText);
					console.log(player1);
					
					
					for(var i = 0; i < player1.heroes.length; i++){
						var hero = player1.heroes[i];
						console.log(hero.id);
						
						//append character options to select "Character1_Bio"
						var dropDown = document.getElementById('Character1_Bio');
						var newSelect = document.createElement('option');
						//newSelect.value = hero.id;
						newSelect.textContent = hero.id;
						dropDown.appendChild(newSelect);	
								
						
					}
					
					 document.getElementById('Player1_Profile').textContent = player1.battleTag + "'s Profile";
                    
                    //show game progess
                    var progress = document.getElementById('progress');
                    progress.textContent = player1.battleTag + ' has completed the following of the 5 Acts.';
                    //list acts completed
                    if(player1.progression.act1 == true){
                        var act1 = document.createElement('li');
                        act1.textContent = 'ACT 1 COMPLETED';
                        progress.appendChild(act1);
                        if(player1.progression.act2 == true){
                            var act2 = document.createElement('li');
                            act2.textContent = 'ACT 2 COMPLETED';
                            progress.appendChild(act2);                     
                                if(player1.progression.act3 == true){
                                var act3 = document.createElement('li');
                                act3.textContent = 'ACT 3 COMPLETED';
                                progress.appendChild(act3);
                                if(player1.progression.act4 == true){
                                    var act4 = document.createElement('li');
                                    act4.textContent = 'ACT 4 COMPLETED';
                                    progress.appendChild(act4);
                                    if(player1.progression.act5 == true){
                                        var act5 = document.createElement('li');
                                        act5.textContent = 'ACT 5 COMPLETED';
                                        progress.appendChild(act5);
                                    }
                                }
                            }
                        }
                    }
                                
                    
                    
                    //set up character list
                    document.getElementById('Player1_Characters').textContent = 'Characters:';
                    document.getElementById('Player1_Characters').style.fontWeight = "900";
                    document.getElementById('Player1_Characters').style.borderStyle = "solid";
                    document.getElementById('Player1_Characters').style.borderWidths = "20px";
                    var characterList = document.getElementById('Player1_Characters');
                    
                    //show summary of player's characters
                    for(var i = 0; i < player1.heroes.length; i++){
                        var hero = player1.heroes[i];
                        var charDT = document.createElement('dt');
                        charDT.textContent = 'Character ' + (i+1);
                        characterList.appendChild(charDT);
						var heroID = document.createElement('dd');
                        heroID.textContent = ' ID: ' + hero.id;
                        characterList.appendChild(heroID);
                        var heroName = document.createElement('dd');
                        heroName.textContent = ' Name: ' + hero.name;
                        characterList.appendChild(heroName);
                        var heroClass = document.createElement('dd');
                        heroClass.textContent = 'Class: ' + hero.class;
                        characterList.appendChild(heroClass);
                        var heroLevel = document.createElement('dd');
                        heroLevel.textContent = 'Level: ' + hero.level;
                        characterList.appendChild(heroLevel);
					}
										
				} else {
					console.log("Error in network request: " + reqPlayer.statusText);
				}
			});
			reqPlayer.send(null);
			event.preventDefault();
		});
	}
	
	document.addEventListener('DOMContentLoaded', bindCharacterButton);
		function bindCharacterButton(){
			document.getElementById('CharacterSubmit').addEventListener('click', function(event){
					var Username1 = document.getElementById('Username1').value;
					console.log(Username1);
					var reqItem = new XMLHttpRequest();
					var CharacterID = document.getElementById('Character1_Bio').value;
					console.log('Character ID is ' + CharacterID);
					reqItem.open('GET', 'https://us.api.battle.net/d3/profile/' + Username1 + '/hero/'  + CharacterID+ '?locale=en_US&apikey=' + apiKey, true);
					reqItem.addEventListener('load', function(){
					if(reqItem.status >= 200 && reqItem.status < 400){
						var hero = JSON.parse(reqItem.responseText);
							console.log(hero.name);
							//stat table data
								var characterStats = document.getElementById('Character1_Stats');
								characterStats.textContent = hero.name + "'s Statistics";
          
							
								var life = document.createElement("li");
								life.textContent = "Life: " + hero.stats.life;
								characterStats.appendChild(life);
								
								var int = document.createElement("li");
								int.textContent = "Intelligence: " + hero.stats.intelligence;
								characterStats.appendChild(int);
								
								var strength = document.createElement("li");
								strength.textContent = "Stength: " + hero.stats.strength;
								characterStats.appendChild(strength);
								
								//info table data
						        var characterInfo = document.getElementById('Character1_Info');
								characterInfo.textContent = hero.name + "'s Information";
          
								//add level to characterInfo on table
								var level = document.createElement("li");
								level.textContent = "Level: " + hero.level;
								characterInfo.appendChild(level);
          
								//add class to characterInfo on table
								var klass = document.createElement("li");
								klass.textContent = "Class: " + hero.class;
								characterInfo.appendChild(klass);
          
								//add elite kills to characterInfo on table
								var eliteKills = document.createElement("li");
								eliteKills.textContent = "Elite Kills: " + hero.kills.elites;
								characterInfo.appendChild(eliteKills);
								
								//item item names and picture
								for (var prop in hero.items) {
									(function(anti_async){
									var item = document.getElementById(prop);
										//check if item exists
									if (typeof(item) != 'undefined' && item != null){
										console.log(hero.items[prop].name);
										item.textContent = hero.items[prop].name;
										//image
										var Image = document.createElement('img');
										Image.src = imageURL + hero.items[prop].icon +".png";
										item.appendChild(Image);
										
										
												//begin nested API call
										
										var req = new XMLHttpRequest();
										req.open('GET', 'https://us.api.battle.net/d3/data/item/' + hero.items[prop].id + "?locale=en_US&apikey="+ apiKey, true);
										req.addEventListener('load', function(){
											if(req.status >= 200 && req.status < 400){
												var gear = JSON.parse(req.responseText);
												          
												//add item level to list
												var gearLevel = document.createElement("li");
												gearLevel.textContent = "Item Level: " + gear.itemLevel;
												item.appendChild(gearLevel);
          
												//add damage range to list
												var itemDamage = document.createElement("li");
												itemDamage.textContent = "Damage Range: " + gear.damageRange;
												item.appendChild(itemDamage);
          
												//add min and max armor values:
												if(gear.hasOwnProperty("armor")){
												var itemArmor = document.createElement("li");
												itemArmor.textContent = "Armor Range: " + gear.armor.min + "-" + gear.armor.max + " Defense";
												item.appendChild(itemArmor);	
												}												
					
											} else {
												console.log("Error in network request: " + req.statusText);
											}
											});
											req.send(null);
									}
									})(prop);
								}
/*
								//head info table data
					if(hero.items.hasOwnProperty('head')){
						//title
						var head = document.getElementById('head');
						head.textContent = hero.items.head.name;
						//image
						var headImage = document.createElement('img');
						headImage.src = imageURL + hero.items.head.icon +".png";
						head.appendChild(headImage);						
					}
					//shoulders info table data
					if(hero.items.hasOwnProperty('shoulders')){
						//title
						var shoulders = document.getElementById('shoulders');
						shoulders.textContent = hero.items.shoulders.name;
						//image
						var shImage = document.createElement('img');
						shImage.src = imageURL + hero.items.shoulders.icon +".png";
						shoulders.appendChild(shImage);						
					}
							//torso
					if(hero.items.hasOwnProperty('torso')){
						//title
						var torso = document.getElementById('torso');
						torso.textContent = hero.items.torso.name;
						//image
						var Image = document.createElement('img');
						Image.src = imageURL + hero.items.torso.icon +".png";
						torso.appendChild(Image);						
					}
					
					//neck
					if(hero.items.hasOwnProperty('neck')){
						//title
						var neck = document.getElementById('neck');
						neck.textContent = hero.items.neck.name;
						//image
						var neckImage = document.createElement('img');
						neckImage.src = imageURL + hero.items.neck.icon +".png";
						neck.appendChild(neckImage);						
					}
					
					//hands
					if(hero.items.hasOwnProperty('hands')){
						//title
						var hands = document.getElementById('neck');
						neck.textContent = hero.items.hands.name;
						//image
						var handsImage = document.createElement('img');
						handsImage.src = imageURL + hero.items.hands.icon +".png";
						hands.appendChild(handsImage);						
					}
					
					//waist
					if(hero.items.hasOwnProperty('waist')){
						//title
						var waist = document.getElementById('waist');
						waist.textContent = hero.items.waist.name;
						//image
						var waistImage = document.createElement('img');
						waistImage.src = imageURL + hero.items.waist.icon +".png";
						waist.appendChild(waistImage);						
					}
					
					//bracers
					if(hero.items.hasOwnProperty('bracers')){
						//title
						var bracers = document.getElementById('bracers');
						bracers.textContent = hero.items.bracers.name;
						//image
						var bracersImage = document.createElement('img');
						bracersImage.src = imageURL + hero.items.bracers.icon +".png";
						waist.appendChild(waistImage);						
					}
*/

					} else {
						console.log('Error in network request: ' + reqItem.statusText);
					}
					});
					reqItem.send(null);
					event.preventDefault();
					});
		}				
					