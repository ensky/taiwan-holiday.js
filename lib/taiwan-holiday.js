const env_conf = require('./config');
const Cache = require('./cache');
const OpendataTW = require('./opendata-tw');

const path = require('path');

var engine;

var TaiwanHoliday = {
	/**
	 * config
	 * 	temp_dir: temp directory
	 */
	init: function (ctor_conf) {
		ctor_conf = ctor_conf || {};
		temp_dir = ctor_conf.temp_dir || env_conf.temp_dir;

		this.cache = new Cache(path.resolve(temp_dir, 'taiwan-holiday-cache.json'));
		return this.cache
			.load()
			.catch(() =>
				OpendataTW.requestData(0, 1000)
					.then((result) => JSON.parse(result))
					.then((json) => {
						resultNumber = json.result.count;
						let firstResults = json.result.results;
						// if the result number is more then the first fetch, more fetches are needed to merge all results
						// Create requests
						const offsets = [
							...new Array(Math.ceil(resultNumber / 1000) - 1).keys(),
						].map((v) => (v + 1) * 1000);
						return Promise.all(
							[Promise.resolve(firstResults)].concat(
								offsets.map((offset) =>
									OpendataTW.requestData(offset, 1000).then(
										(response) => JSON.parse(response).result.results
									)
								)
							)
						);
					})
					.then((results) => {
						json = results.reduce((accumulator, currentValue) => {
							return accumulator.concat(currentValue);
						}, []);
						engine = new OpendataTW(json);
						return json;
					})
					.then((json) => {
						return this.cache.save(json);
					})
			)
			.catch((e) => {
				console.error(e);
				throw e;
			});
	},

	isHoliday: function (date) {
		if (!engine) {
			throw 'need to init first';
		}

		return engine.isHoliday(date);
	},
};

module.exports = TaiwanHoliday;
