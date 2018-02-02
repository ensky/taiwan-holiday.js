class OpendataTW {
	constructor (data) {
		this.holidays = data.result.records
			.filter((record) => record.isHoliday === '是')
			.reduce((map, record) => {
				map[new Date(record.date).getTime()] = true;
				return map;
			}, {});
	}

	isHoliday (date) {
		if (!date instanceof Date) {
			throw '!date instanceof Date';
		}

		return !!this.holidays[date.getTime()];
	}
};

// TODO: fetch method rather than url
OpendataTW.url = 'http://data.ntpc.gov.tw/api/v1/rest/datastore/382000000A-000077-002';

module.exports = OpendataTW;