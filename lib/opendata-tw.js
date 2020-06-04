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

// TODO: fetch method rather than url
OpendataTW.url = 'https://data.ntpc.gov.tw/api/datasets/308DCD75-6434-45BC-A95F-584DA4FED251/json?size=2000';

module.exports = OpendataTW;
