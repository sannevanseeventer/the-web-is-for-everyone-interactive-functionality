import * as dotenv from 'dotenv'

import { fetchJson, postJson } from '../helpers/fetchWrapper.js'

import express from 'express'

dotenv.config()

const notes = express.Router()

// Haal de gegevens van één notitie op
notes.get('/', (request, response) => {
  const id = request.query.id || null
  const url = `${process.env.API_URL}/notities?id=${id}`

  fetchJson(url).then((data) => {
    response.render('notes', data)
  })
})

// Toon het formulier om een nieuwe notitie aan te maken
notes.get('/new', (request, response) => {
  const data = {
    squad: request.query.squad || null,
  }
  response.render('noteForm.ejs', data)
})

// Handel het versturen van het formulier af
notes.post('/', (request, response) => {
  

  // Roep de API aan met de post methode
  const id = request.query.id || 'clemozv3c3eod0bunahh71sx7'
  const url = `${process.env.API_URL}/notities?id=${id}`
  console.log("url is:", url);
  request.body.afgerond = false
  request.body.persoonId = 'clemozv3c3eod0bunahh71sx7'
  request.body.datum = request.body.datum + 'T00:00:00Z';
  request.body.herinnering = [request.body.herinnering + 'T00:00:00Z']
  console.log(request.body.datum);
  console.log(request.body)
  postJson(url, request.body).then((data) => {

    // De waarden uit het formulier (niet de API)
    let newNote = { ...request.body }
    console.log(JSON.stringify(data))
    // Stuur de gebruiker naar / als het gelukt is
    if (data.success) {
      response.redirect('/') // notitie, message meegeven

      // Toon opnieuw het formulier (met waarden) als het niet gelukt is
    } else {
      const errorMessage = data.message
      const newData = { error: errorMessage, values: newNote }
      response.render('noteForm.ejs', newData) // Fail, message meegeven
    }
  })
})

export default notes
