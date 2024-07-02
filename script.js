document.getElementById('openFormBtn').addEventListener('click', function () {
    document.getElementById('formContainer').style.display = 'block';
});

document.getElementById('themeForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const theme = document.getElementById('theme').value;
    fetchQuestions(theme);
});

function fetchQuestions(theme) {
    // Simulando a recuperação de questões do banco de dados
    const questions = {
        matematica: [
            { question: "Qual é 2 + 2?", options: ["1", "2", "3", "4"], answer: "4" },
            { question: "Qual é a raiz quadrada de 16?", options: ["2", "4", "8", "16"], answer: "4" }
        ],
        fisica: [
            { question: "Qual é a velocidade da luz?", options: ["300.000 km/s", "150.000 km/s", "100.000 km/s", "50.000 km/s"], answer: "300.000 km/s" },
            { question: "Quem formulou a teoria da relatividade?", options: ["Newton", "Einstein", "Galileu", "Copérnico"], answer: "Einstein" }
        ]
        // Adicione mais temas e questões conforme necessário
    };

    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';

    if (questions[theme]) {
        questions[theme].forEach(q => {
            const questionItem = document.createElement('div');
            questionItem.classList.add('question-item');
            questionItem.innerHTML = `
                <p><strong>Questão:</strong> ${q.question}</p>
                <ul>
                    ${q.options.map((opt, index) => `<li><button class="option-btn" data-answer="${q.answer}" data-option="${opt}">${String.fromCharCode(65 + index)}: ${opt}</button></li>`).join('')}
                </ul>
                <button class="show-answer-btn">Ver Gabarito</button>
                <div class="answer-container"><p>Gabarito: ${q.answer}</p></div>
            `;
            questionsContainer.appendChild(questionItem);
        });
    } else {
        questionsContainer.innerHTML = '<p>Nenhuma questão encontrada para este tema.</p>';
    }

    document.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', function () {
            const buttons = this.parentElement.parentElement.querySelectorAll('button');
            buttons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    document.querySelectorAll('.show-answer-btn').forEach(button => {
        button.addEventListener('click', function () {
            const answer = this.previousElementSibling.querySelector('.selected').dataset.answer;
            const selectedOption = this.previousElementSibling.querySelector('.selected').dataset.option;
            const buttons = this.previousElementSibling.querySelectorAll('button');

            buttons.forEach(btn => {
                if (btn.dataset.option === answer) {
                    btn.style.backgroundColor = '#28a745';
                    btn.style.color = 'white';
                } else if (btn.dataset.option === selectedOption) {
                    btn.style.backgroundColor = '#dc3545';
                    btn.style.color = 'white';
                }
            });

            const answerContainer = this.nextElementSibling;
            answerContainer.style.display = 'block';
        });
    });
}
