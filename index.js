import { getDataC, getDataF } from "./data.js"

let isC = true
let currentCity
renderPage().then(city => {
  currentCity = city
})

async function renderPage(currentCtiy) {

  //get data
  let cityName = currentCtiy || 'japan'
  let data
  try {
    data = isC ? await getDataC(cityName) : await getDataF(cityName)
  } catch (error) {
    const errorElement = document.querySelector('.error-message')
    errorElement.classList.remove('hide')
    errorElement.innerHTML = error.message
    setTimeout(() => {
      errorElement.innerHTML = ''
      errorElement.classList.add('hide')
    }, 2500)
  }
  /***************************/

  //generate left side
  const left_html = `
    <div class="condition-icon">
      <img src=${data.current.icon} alt="">
    </div>

    <div class="current-info">
      <div class="temp">
        ${data.current.temp}
      </div>
      <div class="day-time">
        <span class="day">${new dayjs(data.current.date).format('dddd')},</span> ${new dayjs(data.current.date).format('h:mm A')}
      </div>
    </div>

    <hr>

    <div class="condition-rain-text">
      <div class="condition-text">
        ${data.current.condition_Text}
      </div>
    </div>

    <div class="city-country">
      ${data.place_info.city} - ${data.place_info.country}
    </div>

  `
  document.querySelector('.generated-info').innerHTML = left_html


  /***************************/

  //generate day cards
  let right_html_top = ''

  data.weekDaysForecast.forEach((day) => {
    right_html_top += generateDayHtml(day)
  })

  document.querySelector('.day-cards').innerHTML = right_html_top


  /***************************/

  //generate today's highlight

  //cards names
  const div_names = ['chance-rain', 'highest-temp', 'sunrise', 'humidity', 'lowest-temp', 'sunset']
  const field_names = ['chance_of_rain', 'maxTemp', 'sunrise', 'humidity', 'minTemp', 'sunset']

  div_names.forEach((div, index) => {
    document.querySelector(`.${div} .value span`).innerHTML = data.current[field_names[index]]
  })

  return cityName


}


//make the search bar interactive
document.querySelector('.search-icon-js').addEventListener('click', () => {
  const cityNameInput = document.querySelector('.input-js').value
  currentCity = cityNameInput
  if (cityNameInput) {
    document.querySelector('.input-js').value = ""
    renderPage(cityNameInput)

  }

})

//make the enter interactive
document.addEventListener('keydown', (e) => {
  const cityNameInput = document.querySelector('.input-js').value
  currentCity = cityNameInput

  if (cityNameInput && e.key == 'Enter') {
    document.querySelector('.input-js').value = ""
    renderPage(cityNameInput)

  }

})

//make unit buttons interactive

//C button
document.querySelector('.c-btn-js').addEventListener('click', () => {
  const theCbutton = document.querySelector('.c-btn-js')
  const theFbutton = document.querySelector('.f-btn-js')
  theCbutton.classList.remove('unactive')
  theFbutton.classList.add('unactive')
  isC = true
  renderPage(currentCity)
})

//f button
document.querySelector('.f-btn-js').addEventListener('click', () => {
  const theCbutton = document.querySelector('.c-btn-js')
  const theFbutton = document.querySelector('.f-btn-js')
  theCbutton.classList.add('unactive')
  theFbutton.classList.remove('unactive')
  isC = false
  renderPage(currentCity)

})


//to generate the html forr the day cards
//left side on top
function generateDayHtml(day) {
  return `
    <div class="card">

      <div class="card-day">
        ${new dayjs(day.date).format('ddd')}
      </div>
      <div class="card-condition-icon">
        <img src=${day.icon} alt="">
      </div>
      <div class="temp">
        ${day.avgtemp}&deg;
      </div>

    </div>
    `
}





