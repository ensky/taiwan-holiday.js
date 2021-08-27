const request = require('request-promise');

const getDateHash = function (dateStr) {
	return Math.floor(new Date(dateStr).getTime() / 86400 / 1000);
};
const dateRE = /^\d{4}.\d{1,2}.\d{1,2}$/;

class OpendataTW {
	constructor (data) {
		this.holidays = data
			.filter((record) => record.isHoliday === '是')
			.reduce((map, record) => {
				map[getDateHash(record.date)] = true;
				return map;
			}, {});
	}

	isHoliday (dateStr) {
		if (!(typeof dateStr === 'string' || dateStr instanceof String) || !dateRE.test(dateStr)) {
			throw 'dateStr is not a string with format like "2018/01/01"';
		}

		return !!this.holidays[getDateHash(dateStr)];
	}
};

function requestData(offset = 0, limit = 1000) {
	return request(
		`https://data.taipei/api/v1/dataset/b0011e96-3fc3-43ec-8bf5-07fb46dd22bb?scope=resourceAquire&q=&limit=${limit}=&offset=${offset}`
	);
}

module.exports = OpendataTW;

module.exports.requestData = requestData;
