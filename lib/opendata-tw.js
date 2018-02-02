const getDateHash = function (dateStr) {
	return Math.floor(new Date(dateStr).getTime() / 86400 / 1000);
};
const dateRE = /^\d{4}.\d{1,2}.\d{1,2}$/;

class OpendataTW {
	constructor (data) {
		this.holidays = data.result.records
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

// TODO: fetch method rather than url
OpendataTW.url = 'http://data.ntpc.gov.tw/api/v1/rest/datastore/382000000A-000077-002';

module.exports = OpendataTW;
