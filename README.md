[![Coverage Status](https://coveralls.io/repos/github/ensky/taiwan-holiday.js/badge.svg?branch=master)](https://coveralls.io/github/ensky/taiwan-holiday.js?branch=master)
[![Build Status](https://api.travis-ci.org/ensky/taiwan-holiday.js.svg?branch=master)](https://travis-ci.org/ensky/taiwan-holiday.js)

# taiwan-holiday.js
let me help you find out it's taiwan holiday or not.

# Use
```javascript
// use project static data
const holiday = require('taiwan-holiday');

holiday.init()
	.then(() => {
		holiday.isHoliday('2018/1/1');
	});
```


```javascript
// useCustom temp dir
const holiday = require('taiwan-holiday');

holiday.init({temp_dir: './my-tmp'})
	.then(() => {
		holiday.isHoliday('2018/1/1');
	});
```
