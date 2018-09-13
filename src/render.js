import crel from 'crel'

// a QUIZ contains ROUNDS
// a ROUND has a QUESTION and ANSWERS

function renderQuizResult(score, total) {
    return crel('result',
        crel('p', 'Congratulations, you have finished the quiz!'),
        crel('p', 'You scored ' + score + ' out of ' + total + '.'))
}

function renderRoundResult(isCorrect, isLast, gotoNext) {
    var nextBtn = crel('button', isLast ? 'finished' : 'next')
    nextBtn.addEventListener('click', gotoNext)
    return crel('p', isCorrect ? 'correct!' : 'wrong!', nextBtn)
}

function renderAnswer(answer, isCorrect, increaseScore, showResult, hasAnswered, markAnswered) {
    var btn = crel('button', answer + (isCorrect ? '*' : ''))

    btn.addEventListener('click', function () {
        if (hasAnswered()) {
            return
        }
        markAnswered()

        if (isCorrect) {
            increaseScore()
        }
        showResult(isCorrect)
    })

    return btn
}

function renderRound(round, roundNumber, gotoNext, isLast, increaseScore) {
    var container = undefined

    function showResult(isCorrect) {
        var result = renderRoundResult(isCorrect, isLast, gotoNext)
        container.appendChild(result)
    }

    var answered = false
    function markAnswered() {
        answered = true
    }

    function hasAnswered() {
        return answered
    }

    container = crel('round',
        crel('h1', roundNumber + ': ' + round.question),
        renderAnswer(round.a, round.correctAnswer == "a", increaseScore, showResult, hasAnswered, markAnswered),
        renderAnswer(round.b, round.correctAnswer == "b", increaseScore, showResult, hasAnswered, markAnswered),
        renderAnswer(round.c, round.correctAnswer == "c", increaseScore, showResult, hasAnswered, markAnswered))

    return container
}

function renderQuiz(rounds) {
    var currentRound = 0
    var container = crel('quiz')

    function renderAndShowCurrentRound() {
        crel(container,
            renderRound(rounds[currentRound],
                currentRound + 1,
                gotoNext,
                rounds.length == currentRound + 1,
                increaseScore
            ))
    }

    var score = 0
    function increaseScore() {
        score = score + 1
    }



    function gotoNext() {
        currentRound = currentRound + 1
        container.removeChild(container.firstChild)

        if (currentRound < rounds.length) {
            renderAndShowCurrentRound()
        } else {
            var result = renderQuizResult(score, rounds.length)
            container.appendChild(result)
        }
    }

    renderAndShowCurrentRound()
    return container
}

export default renderQuiz