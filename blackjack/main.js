var shuffledDeck = [];
var playersHand = [];
var storePlayersHandValue = 0;
var dealersHand = [];
var storeDealersHandValue = 0;
$(document).ready(intializeApp);
function intializeApp(){
	assignClickHandlers();
}

// function stackDeck(cardValues){
// 	for(var i = 0; i < cardValues.length; i++){
// 		for(var j = 0; j < shuffledDeck.length; j++){
// 			if(cardValues[i] === shuffledDeck[j]){
// 				playersHand[i] = cardValues[i];
// 			}
// 		}
// 	}
// }
// stackDeck(['A','3'])
function assignClickHandlers(){
	$('.startGame').on('click', createCards);
	$('.hit').on('click', hit);
	$('.clearPlayersHand').on('click', resetPlayerHand);
	$('.stand').on('click', stand)
}
function getValue(number){
	var value = number;
	if(number >= 10){
		value = 10;
	}
	if(number === 1){
		value = 11;
	}
	return value

}
function getSuite(suite){
	var suiteType = '';
	switch(suite){
		case 1:
			suiteType = 'Hearts';
			break;
		case 2:
			suiteType = 'Diamond';
			break;
		case 3:
			suiteType = 'Club';
			break;
		case 4:
			suiteType = 'Spades';
			break;
	}
	return suiteType
}
function getName(number){
	var cardName = '';
	switch(number){
		case 1:
			cardName = 'A';
			break;
		case 13:
			cardName = 'K';
			break;
		case 12:
			cardName = 'Q';
			break;
		case 11:
			cardName = 'J';
			break;
		default:
			cardName = number;
			break;
	}
	return cardName
}

function createCards(){
	shuffledDeck = [];
	var deck = [];
	for(var i = 1; i < 53; i++){
		var cardObj = {name: null,value: null, suite: null}
		cardObj.name = getName(i%13+1);
		cardObj.value = getValue(i%13+1);
		cardObj.suite = getSuite(i%4+1);
		deck.push(cardObj);
	}
	while(deck.length !== 0){
		var randomIndex = Math.floor(Math.random() * deck.length);
		shuffledDeck.push(deck[randomIndex]);
		deck.splice(randomIndex,1);
	}

	console.log('shuffled deck: ', shuffledDeck);
	resetPlayerHand();
	if(storeDealersHandValue === 22){
		storeDealersHandValue = 12;
	}
	if(storePlayersHandValue === 22){
		storePlayersHandValue = 12;
	}
	if(storePlayersHandValue === 21){
		alert('Yahtzee!!!');
	}
}

function hit(){
	if(storePlayersHandValue >= 21 || playersHand.length === 5 || playersHand.length === 0 || dealersHand.length > 2){
		console.log('can not give you cards')
		return
	}
	storePlayersHandValue = 0;
	playersHand.push(shuffledDeck[0].value);
	shuffledDeck.splice(0,1);
	for(var i = 0; i < playersHand.length; i++){
		storePlayersHandValue += playersHand[i]
	}
	
	for(var i = 0; i < playersHand.length; i++){
		if(storePlayersHandValue > 21){
			if(playersHand[i] === 11){
				playersHand[i] = 1;
			}
		}
		storePlayersHandValue = 0;
		for(var i = 0; i < playersHand.length; i++){
			storePlayersHandValue += playersHand[i]
		}
	}
	if(storePlayersHandValue > 21){
		console.log('you bust')
		alert('you bust');
	}
	console.log('dealer has: ', dealersHand[1], 'you have: ', storePlayersHandValue);
	console.log(playersHand);
}

function resetPlayerHand(){
	playersHand = [];
	storePlayersHandValue = 0;
	dealersHand = [];
	storeDealersHandValue = 0;
	giveTwoCards();
	console.log('there are ', shuffledDeck.length, ' cards in the deck')
	console.log('dealer has: ', dealersHand[1], 'you have: ', storePlayersHandValue);
	console.log(playersHand);
	if(storePlayersHandValue === 21){
		alert('Yahtzee!!!');
	}
}
 
 function stand(){
 	if(storeDealersHandValue === 22){
 		storeDealersHandValue = 12;
 	}
 	while(storeDealersHandValue < 17){
 		for(var i = 0; i < dealersHand.length; i++){
 			if(storeDealersHandValue > 21){
 				if(dealersHand[i] === 11){
 					playersHand[i] = 1;
 				}
 			}
 		}
 		dealersHand.push(shuffledDeck[0].value);
 		shuffledDeck.splice(0,1);
  		storeDealersHandValue = 0;
 		for(var i = 0; i < dealersHand.length; i++){
 			storeDealersHandValue += dealersHand[i]
 		}
 	}
 	console.log('dealer has: ', dealersHand[1], 'you have: ', storePlayersHandValue);
 	if(storePlayersHandValue > storeDealersHandValue && storePlayersHandValue <= 21){
 		console.log('you win');
 		alert('you win');
 	} else if (storeDealersHandValue > 21){
 		console.log('dealer bust');
 		alert('dealer bust');
 	} else {
 		console.log('dealer wins');
 		alert('dealer wins');
 	}
 }

 function giveTwoCards(){
	playersHand.push(shuffledDeck[0].value);
	playersHand.push(shuffledDeck[1].value);
	storePlayersHandValue = playersHand[0] + playersHand[1];
	shuffledDeck.splice(0,2);
	dealersHand.push(shuffledDeck[0].value);
	dealersHand.push(shuffledDeck[1].value);
	storeDealersHandValue = dealersHand[0] + dealersHand[1];
	shuffledDeck.splice(0,2);
 }
