/*

    Main JS file for Prog Music or RPG Soundtrack minigame

*/


/* ------------------------------------------ */
/* DATA: setting up trackobject               */
/*
   nb: a value of either 1 or 2
   corresponds to either prog or rpg          */
/* ------------------------------------------ */

var allTracks = {
    0: { "name": 'track1', "value": 2, "info": "It's a battle theme from the RPG Tales of Zestiria" },
    1: { "name": 'track2', "value": 1, "info": "I haven't decided yet..." }
}


/* ------------------------------------------ */
/* ACTION: analyse user input on button press */
/* ------------------------------------------ */
function analyse(usersGuess) {
    // get answer and compare
    var answer = getActiveTrackData("active", "data-name");
    if (usersGuess == answer["value"]) {
        window.alert( "You guessed correctly! " + answer["info"] );
    } else {
        window.alert( "Wrong! " + answer["info"] );
    }
    // activate next section
    activateNextSection();
}



/* ------------------------------------------ */
/* FETCHER: gets data for active track        */
/* accepts two values: attribute to target
   and data value to retrieve                 */
/* ------------------------------------------ */
function getActiveTrackData(attribute, data) {
    var activeElement = document.getElementsByClassName(attribute);
    var trackNumber = activeElement[0].getAttribute(data);
    var track = findTrackNumber(trackNumber);
    return track;
}

/* ------------------------------------------ */
/* FETCHER: finds track in trackobject        */
/* accepts one value: track number            */
/* ------------------------------------------ */
function findTrackNumber(trackNumber) {
    for (track in allTracks) {
        if (trackNumber == allTracks[track]["name"]) {
            return allTracks[track];
        }
    }
}


function activateNextSection() {
    var sections = document.getElementsByTagName("section");

    for ( var i = 0; i < sections.length; i++ ) {
       if ( sections[i].classList.contains("active") ) {
           sections[i].classList.add("completed");
           sections[i].classList.remove("active", "uncompleted");
           // select random number for next track to show
           var uncompleted = document.getElementsByClassName("uncompleted");
           var rand = randomIntFromInterval(0, uncompleted.length);
           //var rand = 0;
           console.log(rand);
           for ( var j = 0; j < uncompleted.length; j++ ) {
               if ( j == (rand) ) {
                   var selectedDataName = uncompleted[j].getAttribute("data-name");
                   console.log( selectedDataName );

                   var a = document.querySelectorAll('[data-name=' + selectedDataName + ']');

                    for (var i in a) if (a.hasOwnProperty(i)) {
                        console.log(a[i].getAttribute('data-name'));
                        a[i].classList.add("active");
                    }
               }
           }
           return;
       }
    }
}


function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
