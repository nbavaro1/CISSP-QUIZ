// Set and initialize variables
var questionCount=0;
var score=0;
var ans;
var timedOut = 0;
var rand;
var record = [];
var status = 0;

function $(id) {
    return document.getElementById(id);
}

var quiz =$("quiz");
var quizSet = $("quizSet");
var resultBox = $("resultBox")
var question = $("question");
var option1 = $("option1"); 
var option2 = $("option2");
var option3 = $("option3");
var option4 = $("option4");
var submit = $("submit");
var progress = $("progress");
var result = $("result");
var retake = $("retake");
var button1 = $("btn1");
var button2 = $("btn2");
var button3 = $("btn3");
var button4 = $("btn4");
var tracker;
var countDown;
var secsInput = 60;
var seconds = secsInput;
var t;

//Load current question into the app
function setQuestion(qCount, rand) {
    var ques = questions[rand];
    question.textContent = (qCount+1) + ". " + ques.question;
    option1.textContent = ques.option1;
    option2.textContent = ques.option2;
    option3.textContent = ques.option3;
    option4.textContent = ques.option4;
}
function changeProgressBar(qCount){
    progress.innerHTML = "Question " + (qCount+1) + " of 10";
    tracker = $("no" + (qCount+1));
    tracker.style.backgroundColor = "#ffff00";
}

function defaultOptionColors() {
    button1.style.backgroundColor = "#e6f3ff"
    button2.style.backgroundColor = "#e6f3ff"
    button3.style.backgroundColor = "#e6f3ff"
    button4.style.backgroundColor = "#e6f3ff"
}

function getQuestion(qCount, rand) {
    if(qCount == 9) {
        submit.innerHTML = "Submit Test";
        submit.style.backgroundColor = "#00b300";
    }
    if(qCount > 9) {
        return;
    }
setQuestion(qCount,rand);
changeProgressBar(qCount);
defaultOptionColors();

startTimer(seconds, "timer");
}

//Create funtions we need setting   tracker and result
function setCorrect() {
    score++;
    tracker.style.backgroundColor = "#009900";
}
function setWrong() {
    tracker.style.backgroundColor = "#cc0000";
}
function finalScore() {
    if(score >5) {
        result.innerHTML = "Congrats! You passed! <br/> Your score is  "+ score + "!";
    }
    else {
        result.innerHTML = "Sorry. you failed. <br/> your score is " + score + "!";
    }
}

function setResultPage() {
    quizSet.style.display = "none";
    resultBox.style.display = "block";
    progress.innerHTML = "Quiz Completed";
    timer.textContent = "00:00";
    finalScore();
}
//Generate random number
function randomGenerator () {
    while(status == 0) {
        rand = Math.round(Math.random() * questions.length);
        if(rand !== questions.length) {
            for(var j=0; j<record.length; j++) {
                if(rand === record[j]) {
                    break;
                }
                else if (j == record.length - 1) {
                    record[questionCount] = rand;
                    status = 1;
                }
            }
        }    
    }
    status = 0;
    return  rand;
}
function startTimer(secs, elem) {
    t = $(elem);
    t.innerHTML = "00:" + secs;

    if(secs<0) {
        clearTimeout(countDown);

    if(button1.style.backgroundColor !== "rgb(255, 255, 0)" && button2.style.backgroundColor !== "rgb(255, 255, 0)" && button3.style.backgroundColor !== "rgb(255, 255, 0)" && button4.style.backgroundColor !== "rgb(255, 255, 0)") {
        if(questionCount == 9) {
            setWrong();
            setResultPage();
            return;
        }
        setWrong();
        secs = secsInput;
        getQuestion(++questionCount, randomGenerator());
    }

    else {
        if(questionCount ==9) {
            if(ans === questions[rand].answer) {
                setCorrect();
            }
            else {
                setWrong();
            }
             setResultPage();   
            return;
        }
        if(ans == questions[rand].answer) {
            setCorrect();
            secs = secsInput;
            getQuestion(++questionCount, randomGenerator());
        }
        else {
            setWrong();
            secs = secsInput;
            getQuestion(++questionCount, randomGenerator());
        }
    }
    return;
}
    
    secs--;
    countDown = setTimeout('startTimer('+secs+',"'+elem+'")', 1000);
}
//startTimer (seconds, "timer");
// making  the  option section work
option1.addEventListener("click",optionSelect);
option2.addEventListener("click",optionSelect);
option3.addEventListener("click",optionSelect);
option4.addEventListener("click",optionSelect);

function optionSelect(e) {
    var parentEl = e.target.parentElement;
    parentEl.style.backgroundColor = "#ffff00";

    switch(e.target.id) {
        case "option1": button2.style.backgroundColor = "#e6f3ff";
                        button3.style.backgroundColor = "#e6f3ff";
                        button4.style.backgroundColor = "#e6f3ff";
                        break;
        case "option2": button1.style.backgroundColor = "#e6f3ff";
                        button3.style.backgroundColor = "#e6f3ff";
                        button4.style.backgroundColor = "#e6f3ff";
                        break;
        case "option3": button1.style.backgroundColor = "#e6f3ff";
                        button2.style.backgroundColor = "#e6f3ff";
                        button4.style.backgroundColor = "#e6f3ff";
                        break;
        case "option4": button1.style.backgroundColor = "#e6f3ff";
                        button2.style.backgroundColor = "#e6f3ff";
                        button3.style.backgroundColor = "#e6f3ff";
                        break;
    }
    ans = parseInt(e.target.id.replace("option", ""), 10);
}
//loading the  nest question
submit.addEventListener("click", nextQuestion);

function nextQuestion() {
    
    if(button1.style.backgroundColor !== "rgb(255, 255, 0)" && button2.style.backgroundColor !== "rgb(255, 255, 0)"&& button3.style.backgroundColor !== "rgb(255, 255, 0)"&& button4.style.backgroundColor !== "rgb(255, 255, 0)") {
        alert("Please select an option");
        return;
    }
    
    else {
        clearTimeout(countDown);
        secs = secsInput;
        if(questionCount == 9 && questionCount != 10) {
            if(ans == questions[rand].answer) {
                setCorrect();
            }
            else {
                setWrong();
            }
            setResultPage();
            return;
        }
        if(ans == questions[rand].answer) {
            setCorrect();
            getQuestion(++questionCount, randomGenerator());
        }
        else {
            setWrong();
            getQuestion(++questionCount, randomGenerator());
        }
    }
}
//final parts 
retake.addEventListener("click",retakeTest);

function retakeTest() {
    window.location.reload();

}
rand = Math.round(Math.random() * questions.length);
while(rand == questions.length) {
    rand = Math.round(Math.random() * questions.length);
}
record[0] = rand;

window.onload = getQuestion(questionCount, rand);

