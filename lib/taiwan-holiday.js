const config = require('./config');
const Cache = require('./cache');
const OpendataTW = require('./opendata-tw');

const request = require('request-promise');

var engine;

var TaiwanHoliday = {
	init: function () {
		this.cache = new Cache(config.temp_dir + '/taiwan-holiday-cache.json');
		return this.cache.load()
			.catch(() => {
				var ret;

				return request(OpendataTW.url)
					.then((str) => ret = JSON.parse(str))
					.then((result) => this.cache.save(result))
					.then(() => ret);
			})
			.then((json) => {
				engine = new OpendataTW(json);
			});
	},

	isHoliday: function (date) {
		if (!engine) {
			throw 'need to init first';
		}

		return engine.isHoliday(date);
	}
};

module.exports = TaiwanHoliday;
