class OpendataTW {
	constructor (data) {
		this.holidays = data.result.records
			.filter((record) => record.isHoliday === '是')
			.reduce((map, record) => {
				map[new Date(record.date).toISOString().slice(0, 10)] = true;
				return map;
			}, {});
	}

	isHoliday (date) {
		if (!date instanceof Date) {
			throw '!date instanceof Date';
		}

		return !!this.holidays[date.toISOString().slice(0, 10)];
	}
};

// TODO: fetch method rather than url
OpendataTW.url = 'http://data.ntpc.gov.tw/api/v1/rest/datastore/382000000A-000077-002';

module.exports = OpendataTW;