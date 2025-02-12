const $circle = document.querySelector('#circle')
const $score = document.querySelector('#score')
const tlgid = window.Telegram.WebApp.initDataUnsafe.user.id
const initdata = window.Telegram.WebApp.initData
const initDataUnsafehash = window.Telegram.WebApp.initDataUnsafe.hash
// const initDataUnsafefull = window.Telegram.WebApp.initDataUnsafe

const iddiv = document.getElementById('iddiv')
iddiv.textContent = tlgid




async function getScoreFromD() {
  try {
      const response = await fetch('https://api.directual.com/good/api/v5/data/temptmauser/getScore?appID=b27175e7-b9eb-48bb-a207-e7b7e3c32835&sessionID=&uid=412697670', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      var score1 = data.payload[0].score;
      // console.log(data.payload[0].score); // Вывод JSON-ответа в консоль
      localStorage.setItem('score', score1);
      $score.textContent = score1;
      // return score; // Можно вернуть данные, если нужно использовать их дальше
  } catch (error) {
      console.error('Ошибка при запросе:', error);
  }
}






function start() {
  // setScore(getScore())
  getScoreFromD()
  setImage()
}



function setScore(score) {
  localStorage.setItem('score', score)
  $score.textContent = score
}

function setImage() {
  if (getScore() >= 20) {
    $circle.setAttribute('src', './assets/wolfCircle2ready.png')
  }
}

function getScore() {
  return Number(localStorage.getItem('score')) ?? 0
}

function addOne() {
  setScore(getScore() + 1)
  setImage()
}

$circle.addEventListener('click', (event) => {
  const rect = $circle.getBoundingClientRect()

  const offfsetX = event.clientX - rect.left - rect.width / 2
  const offfsetY = event.clientY - rect.top - rect.height / 2

  const DEG = 40

  const tiltX = (offfsetY / rect.height) * DEG
  const tiltY = (offfsetX / rect.width) * -DEG

  $circle.style.setProperty('--tiltX', `${tiltX}deg`)
  $circle.style.setProperty('--tiltY', `${tiltY}deg`)

  setTimeout(() => {
    $circle.style.setProperty('--tiltX', `0deg`)
    $circle.style.setProperty('--tiltY', `0deg`)
  }, 300)

  const plusOne = document.createElement('div')
  plusOne.classList.add('plus-one')
  plusOne.textContent = '+1'
  plusOne.style.left = `${event.clientX - rect.left}px`
  plusOne.style.top = `${event.clientY - rect.top}px`

  $circle.parentElement.appendChild(plusOne)

  addOne()

  setTimeout(() => {
    plusOne.remove()
  }, 2000)
})


const nextbtn = document.getElementById('nextbtn');
nextbtn.addEventListener('click', function () {
    window.location.href = 'page2.html';
});

const savebtn = document.getElementById('savebtn');
savebtn.addEventListener('click', function () {

  fetch('https://api.directual.com/good/api/v5/data/tempinitdata/saveInit?appID=b27175e7-b9eb-48bb-a207-e7b7e3c32835&sessionID=', {
    method: 'POST',
    // specify id if you want to edit existing objects
    body: JSON.stringify({
        'id': '',
        'initDataString':initdata,
        'initDataUnsafehash':initDataUnsafehash
        // 'initDataUnsafefull':initDataUnsafefull
    }),
    headers: {
        'Content-Type': 'application/json'
    },
    }).then(res=>{
        console.log(res.json())
    })

});


// function savescore(userscore){
//   fetch('https://api.directual.com/good/api/v5/data/savescore/savescore?appID=131a686f-8dc6-4b21-9593-d50e9ca2f3df&sessionID=', {
//     method: 'POST',
//     // specify id if you want to edit existing objects
//     body: JSON.stringify({
//         'id': '111',
//           'score': userscore,
//    'user_id': '333'
//     }),
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     }).then(res=>{
//         console.log(res.json())
//     })
// }


start()



