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
    1: { "name": 'track2', "value": 1, "info": "I haven't decided yet..." },
    2: { "name": 'track3', "value": 2, "info": "tr3I haven't decided yet..." },
    3: { "name": 'track4', "value": 2, "info": "tr4I haven't decided yet..." },
    4: { "name": 'track5', "value": 1, "info": "5I haven't decided yet..." }
}


/* ------------------------------------------ */
/* ACTION: analyse user input on button press */
/* ------------------------------------------ */
function analyse(usersGuess) {
    // create child element to populate result with
    var resultsInner = document.getElementById('results-inner');
    resultsInner.innerHTML = "";
    // get true answer
    var answer = getActiveTrackData("active", "data-name");
    // compare user answer with true answer
    if (usersGuess == answer["value"]) {
        resultsInner.innerHTML =  "You guessed correctly! " + answer["info"] ;
    } else {
        resultsInner.innerHTML =  "Wrong! " + answer["info"] ;
    }
    // append child to results window and reveal
    var result = document.getElementById("result");
    result.classList.add("active");
}


/* ------------------------------------------ */
/* ACTION: restart the game                   */
/* ------------------------------------------ */
function restart() {
    var sections = document.getElementsByTagName("section");
    for ( var i = 0; i < sections.length; i++ ) {
        if ( i == 0 ) {
            sections[i].classList.add("active", "uncompleted");
        } else {
            sections[i].classList.add("uncompleted");
        }
        sections[i].classList.remove("completed");
    }
    var finish = document.getElementById("finished");
    finish.classList.remove("active");
}


/* ------------------------------------------ */
/* ACTION: activate next question             */
/* ------------------------------------------ */
function activateNextSection() {
    var resultsInner = document.getElementById("results-inner");
    resultsInner.innerHTML = "";
    var result = document.getElementById("result");
    result.classList.remove("active");

    var sections = document.getElementsByTagName("section");

    for ( var i = 0; i < sections.length; i++ ) {
        if ( sections[i].classList.contains("active") ) {
            sections[i].classList.add("completed");
            sections[i].classList.remove("active", "uncompleted");
            // select random number for next track to show
            var uncompleted = document.getElementsByClassName("uncompleted");
            if (uncompleted.length > 0) {
                console.log('made it inside');
                if (uncompleted.length > 1) {
                    var rand = randomIntFromInterval(0, uncompleted.length - 1);
                } else {
                    var rand = 0;
                }
                for ( var j = 0; j < uncompleted.length; j++ ) {
                   if ( j == (rand) ) {
                       var selectedDataName = uncompleted[j].getAttribute("data-name");
                       var next = document.querySelectorAll('[data-name=' + selectedDataName + ']');
                        for (var k in next) if (next.hasOwnProperty(k)) {
                            next[k].classList.add("active");
                        }
                   }
                }
            } else {
                var finish = document.getElementById("finished");
                finish.classList.add("active");
            }
            return;
        }
    }
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


/* ------------------------------------------ */
/* HELPER: generates random number            */
/* accepts two values: minimum and
   maximum. Both inclusive.                   */
/* ------------------------------------------ */
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
