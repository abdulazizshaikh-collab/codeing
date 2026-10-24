// Small enhancements for the lessons: mobile nav + instant quiz feedback.

// 1. Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// 2. Quizzes: click an answer, find out immediately
document.querySelectorAll('.quiz').forEach((quiz) => {
  const answer = quiz.dataset.answer;
  const feedback = quiz.querySelector('.quiz-feedback');
  const buttons = quiz.querySelectorAll('.quiz-options button');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const correct = button.dataset.choice === answer;

      buttons.forEach((other) => {
        other.disabled = true;
        if (other.dataset.choice === answer) {
          other.classList.add('is-correct');
        }
      });

      if (!correct) {
        button.classList.add('is-wrong');
      }

      if (feedback) {
        feedback.textContent = correct
          ? 'Correct — nice work.'
          : 'Not quite. The highlighted answer is the right one.';
        feedback.classList.toggle('is-correct', correct);
        feedback.classList.toggle('is-wrong', !correct);
      }
    });
  });
});
