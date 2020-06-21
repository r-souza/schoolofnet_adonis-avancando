'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome').middleware(['simple'])
Route.get('login', 'UserController.login').as('users.login').middleware('guest')
Route.get('logout', 'UserController.logout').as('users.logout')
Route.post('login', 'UserController.auth').as('users.auth')
Route.get('signup', 'UserController.signup').as('users.signup')
Route.post('signup', 'UserController.store').as('users.store').validator('StoreUser')


Route.resource('people', 'PersonController')
    .validator(new Map([
        [['people.update'], ['StorePerson']]
    ]))
    .middleware(['redirectNotLoggedIn', 'auth' ]);
