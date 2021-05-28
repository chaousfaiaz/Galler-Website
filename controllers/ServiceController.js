const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const Controller = vertex.Controller
const Service = require('../models/Service')

class ServiceController extends Controller {
	constructor(){
		super(Service, process.env)
	}

	get(params) {
		return new Promise((resolve, reject) => {
			Service.find(params, Controller.parseFilters(params))
			.then(services => {
				resolve(Service.convertToJson(services))
			})
			.catch(err => {
				reject(err)
			})
		})
	}

	getById(id) {
		return new Promise((resolve, reject) => {
			Service.findById(id)
			.then(service => {
				if (service == null){
					throw new Error(Service.resourceName + ' ' + id + ' not found.')
					return
				}

				resolve(service.summary())
			})
			.catch(err => {
				reject(new Error(Service.resourceName + ' ' + id + ' not found.'))
			})
		})
	}

	post(body) {
		return new Promise((resolve, reject) => {
			let payload = null
			Service.create(body)
			.then(service => {
				resolve(service.summary())
			})
			.catch(err => {
				reject(err)
			})
		})
	}

	put(id, params) {
		return new Promise((resolve, reject) => {
			let payload = null
			Service.findByIdAndUpdate(id, params, {new:true})
			.then(service => {
				resolve(service.summary())
			})
			.catch(err => {
				reject(err)
			})
		})
	}

	delete(id) {
		return new Promise((resolve, reject) => {
			Service.findByIdAndRemove(id)
			.then(() => {
				resolve()
			})
			.catch(err => {
				reject(err)
			})
		})
	}
}

module.exports = ServiceController
