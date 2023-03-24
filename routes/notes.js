import * as dotenv from 'dotenv'

import { fetchJson, postJson } from '../helpers/fetchWrapper.js'

import express from 'express'
import { log } from 'console'

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
  console.log(request.body)

  // Roep de API aan met de post methode
  const id = request.query.id || null
  const url = `${process.env.API_URL}/notities?id=${id}`
  postJson(url, request.body).then((data) => {

    // De waarden uit het formulier (niet de API)
    let newNote = { ...request.body }

    // Het id uit de API (overschrijft het formulier)
    newNote.id = data.data.createNote.id || null

    // Stuur de gebruiker naar / als het gelukt is
    if (data.success) {
      response.redirect('/notities') // squad meegeven, message meegeven

      // Toon opnieuw het formulier (met waarden) als het niet gelukt is
    } else {
      response.render('noteForm.ejs', newNote) // Fail, message meegeven
    }
  })
})

export default notes
