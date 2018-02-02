var holiday = require('../index');
var assert = require('chai').assert;

before(function (done) {
	holiday.init()
		.then(() => done())
		.catch((e) => {throw e;});
});

describe('#isHoliday()', function () {
	it('should detect 1/1 is a holiday', function () {
		assert.isOk(holiday.isHoliday(new Date('2018/1/1')));
	});
	it('should detect 1/3 is not a holiday', function () {
		assert.isNotOk(holiday.isHoliday(new Date('2018/1/3')));
	});
});
