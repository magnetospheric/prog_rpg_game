/*

    Main JS file for Prog Music or RPG Soundtrack minigame

*/


/* ------------------------------------------ */
/* DATA: setting up question counter          */
/* ------------------------------------------ */
var questionCounter = 1; // starts on first question

var questionTitle = {
    1: "First",
    2: "Second",
    3: "Third",
    4: "Fourth",
    5: "Fifth",
    6: "Sixth",
    7: "Seventh",
    8: "Eighth",
    9: "Ninth",
    10: "Tenth",
    11: "Eleven",
    12: "Twelve",
    13: "Thirteen",
    14: "Fourteen",
    15: "Fifteen",
    16: "Sixteen",
    17: "Seventeen",
    18: "Eighteen",
    19: "Nineteen",
    20: "Twenty"
}


/* ------------------------------------------ */
/* DATA: setting up trackobject               */
/*
   nb: a value of either 1 or 2
   corresponds to either prog or rpg          */
/* ------------------------------------------ */
var allTracks = {
    0: { "name": 'track1', "value": 2, "info": "It's a battle theme from the RPG Tales of Zestiria" },
    1: { "name": 'track2', "value": 1, "info": "It's Dreamtime by the prog supergroup YES" },
    2: { "name": 'track3', "value": 2, "info": "It's a battle theme from the RPG Final Fantasy VI" },
    3: { "name": 'track4', "value": 1, "info": "It's The Wheel's Turning by prog guitarist Steve Hackett" },
    4: { "name": 'track5', "value": 1, "info": "It's ATLAS by Italian proggers The Watch" },
    5: { "name": 'track6', "value": 1, "info": "It's Qoquaq En Transic by YES frontman Jon Anderson" },
    6: { "name": 'track7', "value": 2, "info": "It's Gadwin's theme from the RPG Grandia" },
    7: { "name": 'track8', "value": 2, "info": "It's battle music from the RPG Xenoblade Chronicles" },
    8: { "name": 'track9', "value": 2, "info": "It's music from the RPG Star Ocean 5: Integrity and Faithlessness" },
    9: { "name": 'track10', "value": 1, "info": "It's Close to the Edge by prog supergroup YES" },
    10: { "name": 'track11', "value": 2, "info": "It's boss music from the RPG Final Fantasy VII" }
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
    // set classes on sections
    var sections = document.getElementsByTagName("section");
    for ( var i = 0; i < sections.length; i++ ) {
        if ( i == 0 ) {
            sections[i].classList.add("active", "uncompleted");
        } else {
            sections[i].classList.add("uncompleted");
        }
        sections[i].classList.remove("completed");
    }

    // hide finish panel
    var finish = document.getElementById("finished");
    finish.classList.remove("active");

    // show buttons again
    var buttons = document.getElementById("buttons");
    buttons.classList.add("active");

    if ( questionCounter > 1 ) {
        questionCounter = 1; // reset questionCounter
    }

    // reset round title
    var roundTitle = document.getElementsByTagName("h2");
    for ( var i = 0; i < roundTitle.length; i++ ) {
        if ( roundTitle[i].classList.contains("round") ) {
            roundTitle[i].innerHTML = "First Round";
        }
    }
}


/* ------------------------------------------ */
/* ACTION: activate next question             */
/* ------------------------------------------ */
function activateNextSection() {
    // increment question counter
    questionCounter++;

    // wipe results contents and hide results box
    var resultsInner = document.getElementById("results-inner");
    resultsInner.innerHTML = "";
    var result = document.getElementById("result");
    result.classList.remove("active");

    // to do: stop player playing music when going on to next track
    var audioElements = document.getElementsByTagName("audio");
    for ( var i = 0; i < audioElements.length; i++ ) {
        audioElements[i].pause();
    }

    // register current section as completed, choose next section
    var sections = document.getElementsByTagName("section");

    for ( var i = 0; i < sections.length; i++ ) {
        if ( sections[i].classList.contains("active") ) {
            sections[i].classList.add("completed");
            sections[i].classList.remove("active", "uncompleted");
            // select random number for next track to show
            var uncompleted = document.getElementsByClassName("uncompleted");
            if ( uncompleted.length > 0 ) {
                // get random number for next round
                if ( uncompleted.length > 1 ) {
                    var rand = randomIntFromInterval(0, uncompleted.length - 1);
                } else {
                    var rand = 0;
                }
                // find section that matches random number and display it
                for ( var j = 0; j < uncompleted.length; j++ ) {
                   if ( j == (rand) ) {
                       var selectedDataName = uncompleted[j].getAttribute("data-name");
                       var next = document.querySelectorAll('[data-name=' + selectedDataName + ']');
                        for (var k in next) if (next.hasOwnProperty(k)) {
                            next[k].classList.add("active");
                        }
                   }
                }
                // change h2 text with current round number
                var roundTitle = document.getElementsByTagName("h2");
                for ( var i = 0; i < roundTitle.length; i++ ) {
                    if ( roundTitle[i].classList.contains("round") ) {
                        if ( questionCounter <= 10 ) {
                            roundTitle[i].innerHTML = questionTitle[questionCounter] + ' Round';
                        } else {
                            roundTitle[i].innerHTML = 'Round ' + questionTitle[questionCounter];
                        }
                    }
                }
            } else {
                // wipe round title from h2
                var roundTitle = document.getElementsByTagName("h2");
                for ( var i = 0; i < roundTitle.length; i++ ) {
                    if ( roundTitle[i].classList.contains("round") ) {
                        roundTitle[i].innerHTML = "";
                    }
                }
                var finish = document.getElementById("finished");
                finish.classList.add("active");

                var buttons = document.getElementById("buttons");
                buttons.classList.remove("active");
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
