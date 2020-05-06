'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validate } = use('Validator')
const Person = use('App/Models/Person')

/**
 * Resourceful controller for interacting with people
 */
class PersonController {
  /**
   * Show a list of all people.
   * GET people
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
     
    const people = await Person.all()

    const data = {
      people: people.toJSON(),
      other: 'Gluglu, yeah yeah. Ha!'
    }

    return view.render('person.index', data)
  }

  /**
   * Render a form to be used for creating a new person.
   * GET people/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, session, response, view }) {
    console.log(session.all())
    return view.render('person.create')
  }

  /**
   * Create/save a new person.
   * POST people
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, session, response }) {

    const rules = {
      name: 'required|min:4'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()

      return response.redirect('back')
    }

    const input = request.only(['name'])

    await Person.create(input)

    response.redirect('/people')
  }

  /**
   * Display a single person.
   * GET people/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const id = params.id
    const person = await Person.find(id)

    if (person) {
      return view.render('person.show', { person: person.toJSON()})
    }

  }

  /**
   * Render a form to update an existing person.
   * GET people/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {

    const id = params.id
    const person = await Person.find(id)

    if (person) {
      return view.render('person.edit', { person: person.toJSON()})
    }

  }

  /**
   * Update person details.
   * PUT or PATCH people/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const id = params.id
    const person = await Person.find(id)

    if ( person ) {

      person.name = request.input('name')

      person.save()

      return response.redirect('/people')
    }
    
    return response.notFound()
  }
    
    
  /**
   * Delete a person with id.
   * DELETE people/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const id = params.id
    const person = await Person.find(id)

    if ( person ) {      
      await person.delete()
      return response.redirect('/people')
    }

    return response.notFound()
  }

}

module.exports = PersonController