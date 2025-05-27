document.addEventListener("DOMContentLoaded", function () {
    const goToWorks = document.getElementById("goToWorks");
    goToWorks.addEventListener("click", function () {
        window.location.href = "works.html";
    });
    document.getElementById('goToWorks').addEventListener('click', function() {
        document.getElementById('works').scrollIntoView({ behavior: 'smooth' });
    });

    // Тест модальное окно
    var openTestBtn = document.getElementById('openTestBtn');
    var testModal = document.getElementById('testModal');
    var closeTestModal = document.getElementById('closeTestModal');
    var abaiTestForm = document.getElementById('abaiTestForm');
    var testResult = document.getElementById('testResult');

    if (openTestBtn && testModal) {
        openTestBtn.onclick = function() {
            testModal.style.display = 'flex';
            testResult.innerHTML = '';
            abaiTestForm.reset();
        };
    }
    if (closeTestModal) {
        closeTestModal.onclick = function() {
            testModal.style.display = 'none';
        };
    }
    window.onclick = function(event) {
        if (event.target === testModal) {
            testModal.style.display = 'none';
        }
    }
    if (abaiTestForm) {
        abaiTestForm.onsubmit = function(e) {
            e.preventDefault();
            let score = 0;
            if (abaiTestForm.q1.value === 'c') score++;
            if (abaiTestForm.q2.value === 'a') score++;
            if (abaiTestForm.q3.value === 'b') score++;
            if (abaiTestForm.q4.value === 'b') score++;
            testResult.style.color = score === 4 ? '#388e3c' : '#e74c3c';
            testResult.innerHTML = `Ваш результат: ${score} из 4`;
        };
    }
});
