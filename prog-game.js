/*

    Main JS file for Prog Music or RPG Soundtrack minigame

*/





/* ------------------------------------------ */
/* DATA: setting up score counter             */
/* ------------------------------------------ */

var correctAnswers = 0;
var wrongAnswers = 0;




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
    0: { "name": 'track1', "value": 2, "info": "It's a battle theme from the RPG Tales of Zestiria", "cover": "covers/zestiria.png" },
    1: { "name": 'track2', "value": 1, "info": "It's Dreamtime by the prog supergroup YES", "cover": "covers/magnification.png" },
    2: { "name": 'track3', "value": 2, "info": "It's a battle theme from the RPG Final Fantasy VI", "cover": "covers/ff6.png" },
    3: { "name": 'track4', "value": 1, "info": "It's The Wheel's Turning by prog guitarist Steve Hackett", "cover": "covers/hackett.png" },
    4: { "name": 'track5', "value": 1, "info": "It's ATLAS by Italian proggers The Watch", "cover": "covers/thewatch.png" },
    5: { "name": 'track6', "value": 1, "info": "It's Qoquaq En Transic by YES frontman Jon Anderson", "cover": "covers/sunhillow.png" },
    6: { "name": 'track7', "value": 2, "info": "It's Gadwin's theme from the RPG Grandia", "cover": "covers/grandia.png" },
    7: { "name": 'track8', "value": 2, "info": "It's battle music from the RPG Xenoblade Chronicles", "cover": "covers/xenoblade.png" },
    8: { "name": 'track9', "value": 2, "info": "It's music from the RPG Star Ocean 5: Integrity and Faithlessness", "cover": "covers/starocean.png" },
    9: { "name": 'track10', "value": 1, "info": "It's Close to the Edge by prog supergroup YES", "cover": "covers/edge.png" },
    10: { "name": 'track11', "value": 2, "info": "It's boss music from the RPG Final Fantasy VII", "cover": "covers/ff7.png" },
    11: { "name": 'track12', "value": 1, "info": "It's Mad Man Moon by Genesis", "cover": "covers/madmanmoon.png" },
    12: { "name": 'track13', "value": 2, "info": "It's music from the RPG Lost Odyssey", "cover": "covers/lostodyssey.png" }
}


/* ------------------------------------------ */
/* ACTION: analyse user input on button press */
/* ------------------------------------------ */
function analyse(usersGuess) {
    // create child element to populate result with
    var resultInner = document.getElementById('result-container');

    // get true answer
    var answer = getActiveTrackData("active", "data-name");

    var cover = "<span class='cover'><img src=' " + answer["cover"] +  "' /></span>" ;


    // compare user answer with true answer
    if (usersGuess == answer["value"]) {
        resultInner.innerHTML =  "<div id='result-inner'>"
                                + cover
                                + "<p class='success'>You guessed correctly!  "
                                + answer["info"]
                                + "</p><button class='successNext' name='next' onclick='activateNextSection();'>NEXT</button></div>";
        correctAnswers += 1;
    } else {
        resultInner.innerHTML = "<div id='result-inner'>"
                                + cover
                                + "<p class='fail'>Wrong!  "
                                + answer["info"]
                                + "</p><button class='failNext' name='next' onclick='activateNextSection();'>NEXT</button></div>";
        wrongAnswers += 1;
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

    // show inner wrap panel
    var innerWrap = document.getElementById("inner-wrapper");
    innerWrap.classList.remove("hidden");

    // hide finish panel
    var finish = document.getElementById("finished");
    finish.classList.remove("active");

    // show buttons again
    var buttons = document.getElementById("buttons");
    buttons.classList.add("active");

    if ( questionCounter > 1 ) {
        questionCounter = 1; // reset questionCounter
    }
    if ( correctAnswers > 0 ) {
        correctAnswers = 0; // reset correctAnswers
    }
    if ( wrongAnswers > 0 ) {
        wrongAnswers = 0; // reset wrongAnswers
    }

    // reset round title
    var roundTitle = document.getElementsByTagName("h2");
    for ( var i = 0; i < roundTitle.length; i++ ) {
        if ( roundTitle[i].classList.contains("round") ) {
            roundTitle[i].innerHTML = "First Round";
        }
    }

    var pausedElements = document.getElementsByClassName("pause");

    for ( var j = 0; j < pausedElements.length; j++ ) {
        console.log('element ' + j);
        pausedElements[j].classList.add("play");
        pausedElements[j].classList.remove("pause");
    }
}


/* ------------------------------------------ */
/* ACTION: activate next question             */
/* ------------------------------------------ */
function activateNextSection() {
    // reset audio before moving on
    resetAudio();

    // increment question counter
    questionCounter++;

    // wipe results contents and hide results box
    var resultInner = document.getElementById("result-container");
    resultInner.innerHTML = "";
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
                var innerWrap = document.getElementById("inner-wrapper");
                innerWrap.classList.add("hidden");

                // show finish box with no score data
                var finish = document.getElementById("finished");
                var finishContainer = document.getElementById("finished-container");
                finish.classList.add("active");
                removeElementsByClass('score-data');

                // append final score data to finish box
                var finalScorer = finalScore(questionCounter, correctAnswers, wrongAnswers);
                finishContainer.appendChild(finalScorer);

                // remove buttons
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
/* FETCHER: generates final score             */
/* accepts question#, correct & wrong ans     */
/* and score object                           */
/* ------------------------------------------ */
function finalScore(questionCounter, correctAnswers, wrongAnswers) {
    var score = document.createElement("div");
    var finalBox = document.getElementById("finished-container");
    score.classList.add("score-data");
    var scoreContent = '';
    if ( correctAnswers == ( questionCounter - 1 ) ) {
        finalBox.classList.remove("lose");
        finalBox.classList.add("ultimate-win");
        scoreContent += '<h2>ULTIMATE WIN</h2>';
        scoreContent += '<p>You got ' + correctAnswers + '/' + ( questionCounter - 1 ) + ' answers right.</p>';
        scoreContent += '<p>All our bass are belong to you</p>';
        scoreContent += '<p>Seriously, you\'re the overlord of prog and RPGs here</p>';
    }
    else if ( correctAnswers > wrongAnswers ) {
        finalBox.classList.remove("lose");
        finalBox.classList.remove("ultimate-win");
        scoreContent += '<h2>MOSTLY PERFECT</h2>';
        scoreContent += '<p>You got ' + correctAnswers + '/' + ( questionCounter - 1 ) + ' answers right.</p>';
        var scoreChoice = randomIntFromInterval(0,3); // gets 1 to 3
        switch (scoreChoice) {
            case 1:
                // score content option 1
                scoreContent += '<p>You\'re a master of the MOOG,</p>';
                scoreContent += '<p>A synth sorcerer,</p>';
                scoreContent += '<p>A time-signature tactician</p>';
                break;
            case 2:
                // score content option 2
                scoreContent += '<p>You\'re living CLOSE TO THE EDGE,</p>';
                scoreContent += '<p>In no RUSH to prove yourself,</p>';
                scoreContent += '<p>and not even Sephiroth could get you down!</p>';
                break;
            case 3:
                // score content option 3
                scoreContent += '<p>You seem to be a seasoned progger</p>';
                scoreContent += '<p>Or perhaps a battle-scarred mage</p>';
                scoreContent += '<p>Either way, well done! Now, can you beat your high score?</p>';
                break;
            default:
                scoreContent += '<p>You seem to be a seasoned progger</p>';
                scoreContent += '<p>Or perhaps a battle-scarred mage</p>';
                scoreContent += '<p>Either way, well done! Now, can you beat your high score?</p>';
        }
    } else {
        finalBox.classList.add("lose");
        finalBox.classList.remove("ultimate-win");
        scoreContent += '<h2>END OF THE LINE, BUDDY</h2>';
        scoreContent += '<p>You got ' + correctAnswers + '/' + ( questionCounter - 1 ) + ' answers right.</p>';
        var scoreChoice = randomIntFromInterval(0,3); // gets 1 to 3
        switch (scoreChoice) {
            case 1:
                // score content option 1
                scoreContent += '<p>You need to brush up on your Genesis and Grandia,</p>';
                scoreContent += '<p>learn the difference between a Moogle and a MOOG,</p>';
                scoreContent += '<p>and don\'t let this be your FINAL FANTASY!</p>';
                break;
            case 2:
                // score content option 2
                scoreContent += '<p>You just couldn\'t HACKETT</p>';
                scoreContent += '<p>But don\'t let failure CLOUD your vision...</p>';
                scoreContent += '<p>Say YES to another round!</p>';
                break;
            case 3:
                // score content option 3
                scoreContent += '<p>Are you JUST ANOTHER BRICK IN THE WALL?</p>';
                scoreContent += '<p>Maybe you need a phoenix down?</p>';
                break;
            default:
                scoreContent += '<p>That was one tough boss gauntlet!</p>';
        }

    }
    scoreContent += '<button id="restart-button" name="restart" onclick="restart()">Play again?</button>';
    score.innerHTML = scoreContent;
    return score;
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



/* ------------------------------------------ */
/* HELPER: removes elements by class          */
/* accepts one value: class name              */
/* ------------------------------------------ */
function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}



/* ------------------------------------------ */
/* HELPER: set audio clip back to start       */
/* accepts one value: class name              */
/* ------------------------------------------ */
function resetAudio() {

    var aud = document.getElementsByClassName( 'active' );

    for ( var i = 0; i < aud.length; i++ ) {
        if ( aud[i].classList.contains( 'uncompleted' ) ) { // find correct aud

            var pausedElements = aud[i].getElementsByClassName("pause");

            for ( var j = 0; j < pausedElements.length; j++ ) {
                pausedElements[j].classList.add("play");
                pausedElements[j].classList.remove("pause");
            }

            var newAud = aud[i];

            for ( var j = 0; j < newAud.childNodes.length; j++ ) {
                if ( newAud.childNodes[j].tagName == "AUDIO" ) { // find correct child
                    newAud.childNodes[j].currentTime = 0;
                    newAud.childNodes[j].pause();
                }
            }

        }
    }

}



/* ------------------------------------------ */
/* HELPER: play or pause audio clip           */
/* ------------------------------------------ */
function playAudio() {
    var aud = document.getElementsByClassName( 'active' );
    for ( var i = 0; i < aud.length; i++ ) {
        if ( aud[i].classList.contains( 'uncompleted' ) ) { // find correct aud
            var newAud = aud[i];
            for ( var j = 0; j < newAud.childNodes.length; j++ ) {
                if ( newAud.childNodes[j].tagName == "AUDIO" ) { // find correct child
                    if (newAud.childNodes[j].paused) {
                        newAud.childNodes[j].play();
                    } else {
                      newAud.childNodes[j].pause();
                    }
                }
                if ( newAud.childNodes[j].id == "audioplayer" ) {
                    var audioplayer = newAud.childNodes[j];
                    for ( var k = 0; k < audioplayer.childNodes.length; k++ ) {
                        if (audioplayer.childNodes[k].tagName == "BUTTON") {
                            console.log("woo");
                            if ( audioplayer.childNodes[k].classList.contains("play") ) {
                                audioplayer.childNodes[k].classList.add("pause");
                                audioplayer.childNodes[k].classList.remove("play");
                            } else {
                                audioplayer.childNodes[k].classList.add("play");
                                audioplayer.childNodes[k].classList.remove("pause");
                            }
                        }
                    }

                    //newAud.childNodes[j].childNodes[0].classList.add("pause");
                    // newAud.childNodes[j].classList.remove("play");
                }
                // if ( newAud.childNodes[j].classList.contains( "pause" ) ) {
                //     // newAud.childNodes[j].classList.add("play");
                //     // newAud.childNodes[j].classList.remove("pause");
                // }
            }
        }
    }
}



/* ------------------------------------------ */
/* HELPER: audio volume control               */
/* ------------------------------------------ */
function setVolume(volume) {
    var aud = document.getElementsByClassName( 'active' );
    for ( var i = 0; i < aud.length; i++ ) {
        if ( aud[i].classList.contains( 'uncompleted' ) ) { // find correct aud
            var newAud = aud[i];
            for ( var j = 0; j < newAud.childNodes.length; j++ ) {
                if ( newAud.childNodes[j].tagName == "AUDIO" ) { // find correct child
                    newAud.childNodes[j].volume = volume;
                }
            }
        }
    }
}
