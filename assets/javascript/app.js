$(document).ready(function() {
    // Create a function that creates the start button and initial screen
    
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }
    
    initialScreen();
    
    //Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...
    
    $("body").on("click", ".start-button", function(event){
        event.preventDefault();  // added line to test issue on GitHub Viewer
        clickSound.play();
        generateHTML();
    
        timerWrapper();
    
    }); // Closes start-button click
    
    $("body").on("click", ".answer", function(event){
        //answeredQuestion = true;
        clickSound.play();
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            //alert("correct");
    
            clearInterval(theClock);
            generateWin();
        }
        else {
            //alert("wrong answer!");
            clearInterval(theClock);
            generateLoss();
        }
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function generateLossDueToTimeOut() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  //  change to 4000 or other amount
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  //  change to 4000 or other amount
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/Jinn.jpg'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000); //  change to 4000 or other amount
    }
    
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $(".mainArea").html(gameHTML);
    }
    
    function wait() {
        if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
        }
        else {
            finalScreen();
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done! Great Job, here are your Results!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateHTML();
        timerWrapper();
    }
    
    var startScreen;
    var gameHTML;
    var counter = 30;
    var questionArray = ["Who kills Jabba the Hut?", "In which movie did Han Solo and Luke Skywalker Free Princess Leia from the Death Star?", "In which movie did the Battle of Hoth take place?", "What planet is Princess Leia from?", "In which Star Wars movie does Liam Neesom play Qui-Gon Jinn?", "In Episode 4, A New Hope, Who is the first character to speak?", "How tall was the actor who played Chewbacca?", "Who said, 'I have a bad feeling about this?"];
    var answerArray = [["Princess Leia", "C3PO", "R2D2", "Lando"], ["Empire Strikes Back","A New Hope","Return of the Jedi","The Last Jedi"], ["The Last Jedi", "Rogue One", "The Empire Strikes Back", "Return of the Jedi"], ["Jakku","Jedha","Alderaan","Yavin"], ["A New Hope", "Attack of the Clones", "The Force Awakens", "The Phantom Menance"], ["C3PO","R2D2","Darth Vader","Princess Leia"], ["6'10", "7'2", "7'6", "6'8"], ["Luke Skywalker","Han Solo","Obi Wan Kenobi","All of the above"]];
    var imageArray = ["<img class='center-block img-right' src='assets/images/leia.jpg'>", "<img class='center-block img-right' src='assets/images/Falcon.jpg'>", "<img class='center-block img-right' src='assets/images/hoth.jpg'>", "<img class='center-block img-right' src='assets/images/Vader.jpg'>", "<img class='center-block img-right' src='assets/images/faceoff.jpg'>", "<img class='center-block img-right' src='assets/images/Anakin&Obi.jpg'>", "<img class='center-block img-right' src='assets/images/Yoda.jpg'>", "<img class='center-block img-right' src='assets/images/starwars1.jpg'>"];
    var correctAnswers = ["A. Princess Leia", "B. A New Hope", "C. Empire Strikes Back", "C. Alderaan", "D. The Phantom Menance", "A. C3PO", "B. 7'2", "D. All of the above"];
    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var clickSound = new Audio("assets/images/binarySunset.mp3");