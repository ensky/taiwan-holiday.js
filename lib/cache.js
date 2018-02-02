const fs = require('fs');

class Cache {
	constructor (path) {
		this.path = path;
	}

	load () {
		return new Promise((resolve, reject) => {
			fs.readFile(this.path, {encoding: 'utf8'}, (err, json) => {
				if (err) {
					return reject(err);
				}

				resolve(JSON.parse(json));
			});
		});
	}

	save (jsonOrString) {
		if (!(typeof jsonOrString === 'string' || jsonOrString instanceof String)) {
			jsonOrString = JSON.stringify(jsonOrString);
		}

		return new Promise((resolve, reject) => {
			fs.writeFile(this.path, jsonOrString, 'utf8', (err) => {
				if (err) {
					return reject(err);
				}

				resolve(jsonOrString);
			})
		});
	}
};

module.exports = Cache;