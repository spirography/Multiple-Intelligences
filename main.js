var questions = [
    "I really enjoy books",
    "I can quickly and easily compute numbers in my head",
    "When I close my eyes, I can see clear visual images",
    "I take part in at least one sport or physical activity regularly",
    "I can carry a tune",
    "People often come to me to seek advice or counsel",
    "I regularly spend times reflecting, meditating, or thinking about important life questions",
    "I hear words in my head before I write, read, or speak them",
    "I enjoy solving math problems",
    "using maps is easy for me",
    "I find it difficult to sit still for long periods of time",
    "I know when musical notes are off-key",
    "I prefer team and group sports to individual sports",
    "I have attended classes, seminars, and workshops to gain insight about myself",
    "I enjoy word games such as crossword puzzles, Scrabble, or anagrams",
    "I like solving brainteasers, logical games, and other strategy games such as chess and checkers",
    "Color coding helps me learn things",
    "I like working with my hands (for example, sewing, weaving, carving, carpentry, model-building)",
    "I often listen to musical selections on the radio, CDs, mp3s, etc",
    "When I have problems, I tend to seek help from other people rather than work it out alone",
    "I often think about how something I've seen in books, art, poetry, etc., applies to my own life",
    "I like puns and workds & phrases with double meanings",
    "I look for structure, patterns, sequences, or logical order",
    "I enjoy visual puzzles such as mazes, jigsaw puzzles, 3-D images",
    "I tend to use gestures and other body language when engaged in conversations",
    "I okay an instrument",
    "I enjoy social pastimes like board games and gaming with others over the internet more than individual ones like solitaire",
    "I have specific goals in life that I think about regularly",
    "English and history have been more natural subjects for me than science and math",
    "I wonder about how some things work and keep up-to-date on new scientific developments",
    "I navigate well in unfamiliar places",
    "I need to touch or hold objects to learn more about them",
    "My life would be less dynamic without music",
    "I like the challenge of teaching other people what I know how to do",
    "I have a realistic view of my own strengths and weaknesses",
    "People often as me the meaning of words",
    "I can think in abstract, clear, imageless concepts",
    "I often draw or doodle",
    "I am well-coordinated",
    "I often have a tune running through my mind during the day",
    "I am comfortable in a crowd of people",
    "I keep a journal or diary to record the events of my inner life",
    "I have written something recently that I was proud of",
    "I am good at seeing how things can be quantified, categorized, or analyzed in some way",
    "Geometry was easier than algebra",
    "I like hands-on learning the best, as in labs, studios, etc.",
    "I can keep time to a piece of music",
    "I am involved in campus and community activities",
    "I would like to be self-employed or start my own business"
];
var intelligences = ["Linguistics", "Logical", "Spatial", "Kinesthetic", "Musical", "Interpersonal", "Intrapersonal"];
var colors = ["#f1c40f", "#e74c3c", "#9b59b6", "#3498db", "#2ecc71", "#e67e22", "#16a085"];
var MAX_SCORE = 5 * questions.length / intelligences.length;

var list;
var table;

function setup() {
    /*
     * DOM variables
     */
    console.log("javascript loaded, initializing...");


    // list = document.createElement('ol');
    // for (var i = 0; i < questions.length; i++) {
    //     var row = document.createElement('li');
    //
    //     var question = document.createElement('div');
    //     question.innerText = questions[i];
    //
    //     var survey = document.createElement('div');
    //     for (var j = 1; j <= 5; j++) {
    //         var radioButton = document.createElement('input');
    //         radioButton.type = "radio";
    //         radioButton.name = i+1;
    //         radioButton.value = j;
    //         survey.appendChild(radioButton);
    //     }
    //
    //     row.appendChild(question);
    //     row.appendChild(survey);
    //
    //     list.appendChild(row);
    // }
    //
    // document.body.appendChild(list);


    table = document.getElementById('table');



    for (var i = 0; i < questions.length; i++) {
        var row = document.createElement('tr');

        var number = document.createElement('td');
        number.innerText = (i+1) + '.';

        var question = document.createElement('td');
        question.innerText = questions[i];

        var survey = document.createElement('td');
        for (var j = 1; j <= 5; j++) {
            var radioButton = document.createElement('input');
            radioButton.type = "radio";
            radioButton.name = i+1;
            radioButton.value = j;

            radioButton.addEventListener("change", calculateIntelligences);
            survey.appendChild(radioButton);
        }

        row.appendChild(number);
        row.appendChild(question);
        row.appendChild(survey);

        table.appendChild(row);
    }

    console.log("finished setup");
}

function calculateIntelligences() {
    // add up radio button totals
    var results = Array.apply(null, Array(intelligences.length)).map(Number.prototype.valueOf,0);
    var rows = table.children;

    for (var i = 1; i <= questions.length; i++) {
        var radioButtonGroup = table.children[i].children[2].children;
        var questionAnswered = false;
        for (var j = 0; j < radioButtonGroup.length; j++) {
            if (radioButtonGroup[j].checked) {
                results[(i-1) % results.length] += j+1;
                questionAnswered = true;
                break;
            }
        }
        if (!questionAnswered) {
            return; // need to answer every question first
        }
    }
    var resultsElements = new Array(results.length);
    for(var i = 0; i < resultsElements.length; i++) {
        resultsElements[i] = document.createElement('div');
        resultsElements[i].value = results[i];
        // resultsElements[i].innerText = intelligences[i];

        resultsElements[i].style.width = (results[i] / MAX_SCORE * 100) + "%";
        if (results[i] === 0) {
            resultsElements[i].style.background = "none";
        } else {
            resultsElements[i].style.background = colors[i];
        }


        var scoreElement = document.createElement('span');
        scoreElement.classList.add('score');
        scoreElement.innerText = results[i];

        var nameElement = document.createElement('span');
        nameElement.style.display = "inline-block";
        nameElement.innerText = intelligences[i];

        resultsElements[i].appendChild(scoreElement);
        resultsElements[i].appendChild(nameElement);
    }

    // sort them
    resultsElements.sort(function(a, b) {
        return b.value - a.value;
    });

    var resultsDiv = document.getElementById('results');
    while (resultsDiv.hasChildNodes()) {
    resultsDiv.removeChild(resultsDiv.lastChild);
}
    for (var i = 0; i < resultsElements.length; i++) {
        resultsDiv.appendChild(resultsElements[i]);
    }

}
