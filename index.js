import express from 'express'

// url vini mini database
const url = 'https://api.vinimini.fdnd.nl/api/v1'

// Maak een nieuwe express app
const app = express()


// Stel in hoe we express gebruiken
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

// Maak een route aan voor de index
app.get('/', (request, response) => {

  let homeUrl = url + '/'

  fetchJson(homeUrl).then((data) => {
    response.render('index', data)
  })
})

// Overzichtspagina
app.get('/producten', (request, response) => {
    let orderBy = request.query.orderBy || 'titel' // sorteren op titel
    let productenUrl = url + '/producten' + '?orderBy=' + orderBy + '&direction=ASC' // 'mij-eerste-ei' als eerste tonen ipv 'pinda-presentje'
    
    fetchJson(productenUrl).then((data) => {
      response.render('producten', data)
    })
  })

  // Detail pagina 
app.get('/product', (request, response) => {
  let id = request.query.detailId || 'clerps05z09jm0aw3vccjq5un'
  let detailUrl = url + '/product?id=' + id
  console.log(detailUrl);
  fetchJson(detailUrl).then((data) => {
    // console.log(data)
    response.render('detail', data)
  })
})


// linkt de pagina 'over Vini mini' en haalt informatie op
app.get('/over', (request, response) => {
  response.render('over')
})

// linkt de pagina 'contact' en haalt informatie op
app.get('/contact', (request, response) => {
  response.render('contact')
})

// linkt de pagina 'login' en haalt informatie op
app.get('/login', (request, response) => {
  response.render('login.ejs')
})

// linkt de pagina 'login' en haalt informatie op
app.get('/personal', (request, response) => {
  response.render('personal')
})

// Stel het poortnummer in en start express
app.set('port', process.env.PORT || 2000)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}