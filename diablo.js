/**************************************
 * Dylan Markovic
 * CS290 How To Proposal
 * diablo.js
 * Due Date: 5.14.2017
 ***************************************/
 



//display title on browser tab
var apiKey ='7y2eektjvhfu98expct5hwm4w6hvb9r6';
var imageURL = 'https://blzmedia-a.akamaihd.net/d3/icons/items/large/';
var Username1;
var player1;

//script for player
document.addEventListener('DOMContentLoaded', bindUsernameButton);
	function bindUsernameButton(){
		document.getElementById('UsernameSubmit').addEventListener('click', function(event){
			var req = new XMLHttpRequest();
			Username1 = document.getElementById('Username1').value;
			console.log('Username is ' + Username1);
			req.open('GET', 'https://us.api.battle.net/d3/profile/' + Username1 + '/?locale=en_US&apikey=' + apiKey, true);
			req.addEventListener('load', function(){
				if(req.status >= 200 && req.status < 400){
					var response = JSON.parse(req.responseText);
					player1 = response;
					console.log(player1);
					//console.log('the number of heroes owned is' + response.heroes.length);
					document.getElementById('Player1_Profile').textContent = response.battleTag + "'s Profile";
					
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
					for(var i = 0; i < response.heroes.length; i++){
						var hero = response.heroes[i];
						console.log(hero.id);
						var charDT = document.createElement('dt');
						charDT.textContent = 'Character ' + (i+1);
						characterList.appendChild(charDT);
						var heroName = document.createElement('dd');
						heroName.textContent = ' Name: ' + hero.name;
						characterList.appendChild(heroName);
						var heroClass = document.createElement('dd');
						heroClass.textContent = 'Class: ' + hero.class;
						characterList.appendChild(heroClass);
						var heroLevel = document.createElement('dd');
						heroLevel.textContent = 'Level: ' + hero.level;
						characterList.appendChild(heroLevel);
						
						//append character options to select "Character1_Bio"
						var dropDown = document.getElementById('Character1_Bio');
						var newSelect = document.createElement('option');
						//newSelect.value = hero.id;
						newSelect.textContent = hero.id;
						dropDown.appendChild(newSelect);
						
					}
				} else {
					console.log("Error in network request: " + req.statusText);
				}
			});
			req.send(null);
			event.preventDefault();
		});
	}
	


//specific character info	
document.addEventListener('DOMContentLoaded', bindCharacterButton);
	function bindCharacterButton(){
		document.getElementById('CharacterSubmit').addEventListener('click', function(event){
			var req = new XMLHttpRequest();
			var CharacterID = document.getElementById('Character1_Bio').value;
			console.log('Character ID is ' + CharacterID);
			req.open('GET', 'https://us.api.battle.net/d3/profile/' + Username1 + '/hero/'  + CharacterID+ '?locale=en_US&apikey=' + apiKey, true);
			req.addEventListener('load', function(){
				if(req.status >= 200 && req.status < 400){
					var response = JSON.parse(req.responseText);
					console.log(response.name);
					var characterInfo = document.getElementById('Character1_Info');
					characterInfo.style.fontWeight = '900';
					characterInfo.style.borderStyle = 'solid';
					characterInfo.style.borderWidths = '20px';
					characterInfo.textContent = response.name + "'s Equipment";
					console.log(response);
					
					//display main weapon equipment
					var items = response.items;
					if(items.hasOwnProperty('mainHand')){
						//title
						var mainHand = document.createElement('dt');
						mainHand.textContent = 'Main Weapon:';
						characterInfo.appendChild(mainHand);
						//name
						var mainHandName = document.createElement('dd');
						mainHandName.textContent = items.mainHand.name;
						characterInfo.appendChild(mainHandName);
						//image
						var mainHandPictureDD = document.createElement('dd');
						var mainHandImage = document.createElement('img');
						mainHandImage.src = imageURL + items.mainHand.icon +".png";
						mainHandPictureDD.appendChild(mainHandImage);
						characterInfo.appendChild(mainHandPictureDD);
						
					}
					//display wrist equipment
					var items = response.items;
					if(items.hasOwnProperty('bracers')){
						//title
						var bracers = document.createElement('dt');
						bracers.textContent = 'Bracers:';
						characterInfo.appendChild(bracers);
						//name
						var bracersName = document.createElement('dd');
						bracersName.textContent = items.bracers.name;
						characterInfo.appendChild(bracersName);
						//image
						var bracersPictureDD = document.createElement('dd');
						var bracersImage = document.createElement('img');
						bracersImage.src = imageURL + items.bracers.icon +".png";
						bracersPictureDD.appendChild(bracersImage);
						characterInfo.appendChild(bracersPictureDD);
						
					}
					
					//display helm
					if(items.hasOwnProperty('head')){
						//title
						var head = document.createElement('dt');
						head.textContent = 'Head:';
						characterInfo.appendChild(head);
						//name
						var headName = document.createElement('dd');
						headName.textContent = items.head.name;
						characterInfo.appendChild(headName);
						//image
						var headPictureDD = document.createElement('dd');
						var headImage = document.createElement('img');
						headImage.src = imageURL + items.head.icon +".png";
						headPictureDD.appendChild(headImage);
						characterInfo.appendChild(headPictureDD);
						
					}
				} else {
					console.log('Error in network request: ' + req.statusText);
				}
			});
			req.send(null);
			event.preventDefault();
		});
	}




