import notiflix from 'notiflix';
// notiflix.Notify.info('Cogito ergo sum');
// notiflix.Notify.warning('Memento te hominem esse');

const form = document.querySelector('.form');
const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector(['[name="amount"]']);
console.log(form);
console.log(delay);
console.log(step);
console.log(amount);

form.addEventListener('click', onCreatePromises);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject({ position, delay });
      }, delay);
    });
  }
}

function onCreatePromises(e) {
  e.preventDefault();
  let newDelay = parseInt(delay.value);
  let newStep = parseInt(step.value);
  let newAmount = parseInt(amount.value);
  console.log(newDelay);
  console.log(newStep);
  console.log(newAmount);
  for (let i = 0; i < newAmount; i++) {
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        notiflix.Notify.success(
          `✅ Fulfilled promise ${position + 1} in ${delay} ms`
        );
      })
      .catch(({ position, delay }) => {
        notiflix.Notify.failure(
          `❌ Rejected promise ${position + 1} in ${delay} ms`
        );
      });
    newDelay += newStep;
  }
}
