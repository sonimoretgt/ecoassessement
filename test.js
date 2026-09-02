let currentQuestion = 0;
let score = 0;

const startButton = document.getElementById("startTest");
const container = document.getElementById("testContainer");

startButton.addEventListener("click", startTest);

function startTest() {

    currentQuestion = 0;
    score = 0;

    document.querySelector(".card").style.display = "none";

    container.style.display = "block";

    showQuestion();

}

function showQuestion() {

    if (currentQuestion >= questions.length) {

        showResult();

        return;

    }

    const q = questions[currentQuestion];

    let html = `
    <section class="card">

        <h2 class="card-title">
            Вопрос ${currentQuestion + 1} из ${questions.length}
        </h2>

        <p style="font-size:20px; margin-bottom:25px;">
            ${q.question}
        </p>
    `;

    for (let i = 0; i < q.answers.length; i++) {

        html += `
        <label class="answer-option">

            <input
                type="radio"
                name="answer"
                value="${i}">

            ${q.answers[i]}

        </label>
        `;

    }

    html += `

    <div style="text-align:right; margin-top:30px;">

        <button
            class="nav-button"
            onclick="nextQuestion()">

            Далее →

        </button>

    </div>

    </section>
    `;

    container.innerHTML = html;

}

function nextQuestion() {

    const answer =
        document.querySelector('input[name="answer"]:checked');

    if (!answer) {

        alert("Выберите вариант ответа.");

        return;

    }

    if (Number(answer.value) === questions[currentQuestion].correct) {

        score++;

    }

    currentQuestion++;

    showQuestion();

}

function showResult() {

    const percent =
        Math.round(score / questions.length * 100);

    let text = "";

    if (percent >= 90) {

        text = "Отличный результат!";

    } else if (percent >= 75) {

        text = "Хороший результат!";

    } else if (percent >= 60) {

        text = "Рекомендуется повторить отдельные темы.";

    } else {

        text = "Необходимо повторить материал курса.";

    }

    container.innerHTML = `

    <section class="card">

        <h2 class="card-title">

            🎉 Тест завершён

        </h2>

        <h1>

            ${score} / ${questions.length}

        </h1>

        <p>

            Правильных ответов: ${percent}%

        </p>

        <h3>

            ${text}

        </h3>

        <div style="margin-top:35px; text-align:center;">

            <button
                class="nav-button"
                onclick="location.reload()">

                Пройти ещё раз

            </button>

        </div>

    </section>

    `;

}