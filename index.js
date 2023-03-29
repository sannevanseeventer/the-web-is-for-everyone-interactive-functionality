import express from 'express'

// url vini mini database
const url = 'https://api.vinimini.fdnd.nl/api/v1'
const urlPost = "https://api.vinimini.fdnd.nl/api/v1/notities"; // Post URL 

// Maak een nieuwe express app
const app = express()


// Stel in hoe we express gebruiken
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

// afhandeling van formulieren
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

// linkt de pagina 'to do' en haalt informatie op
app.get('/todo', (request, response) => {
  response.render('todo')
})

// linkt de pagina 'to do' en haalt informatie op
app.get('/notes', (request, response) => {
  const baseUrl = "https://api.vinimini.fdnd.nl/api/v1/"
  const pepijnId = "notities?id=clemozv3c3eod0bunahh71sx7"
  const url = `${baseUrl}${pepijnId}`

  fetchJson(url).then((data) => {
    response.render('notes', data)
  })



})

// Maak een route voor de index
app.get('/', (request, response) => {
  const baseUrl = "https://api.vinimini.fdnd.nl/api/v1/"
  const pepijnId = "notities?id=clemozv3c3eod0bunahh71sx7"
  const url = `${baseUrl}${pepijnId}`

  fetchJson(url).then((data) => {
    response.render('index', data)
  })
})

app.post('/newnote', function (req, res, next) {
  const baseurl = "https://api.vinimini.fdnd.nl/api/v1/"
  const url = `${baseurl}`
  req.body.afgerond = false
  req.body.persoonId = 'clemozv3c3eod0bunahh71sx7'
  req.body.datum = req.body.datum + ':00Z';
  req.body.herinnering = [req.body.herinnering + ':00Z']
  console.log(req.body)
  postJson(url + '/notities', req.body).then((data) => {
    console.log(JSON.stringify(data))
    let newNotitie = { ... req.body }

    if (data.success) {
      res.redirect('/notes') 
      // TODO: squad meegeven, message meegeven
      // TODO: Toast meegeven aan de homepagina
    } else {
      console.log("Post error")
    }
  })
})
  














// Stel het poortnummer in waar express op gaat luisteren
app.set("port", process.env.PORT || 2000);

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});

async function fetchJson(url, payload = {}) {
  return await fetch(url, payload)
    .then((response) => response.json())
    .catch((error) => error);
}

export async function postJson(url, body) {
  return await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => error)
}
