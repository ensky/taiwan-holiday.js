# taiwan-holiday.js
let me help you find out it's taiwan holiday or not.

# Use
```
const holiday = require('taiwan-holiday');

holiday.init()
	.then(() => {
		holiday.isHoliday(new Date('2018/1/1'));
	});
```


Custom temp dir
```
const holiday = require('taiwan-holiday');

holiday.init({temp_dir: './my-tmp'})
	.then(() => {
		holiday.isHoliday(new Date('2018/1/1'));
	});
```
