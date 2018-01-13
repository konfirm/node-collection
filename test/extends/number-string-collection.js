const StringCollection = require('./string-collection');

class NumberStringCollection extends StringCollection {
	static get ALLOWED_TYPES() {
		return super.ALLOWED_TYPES.concat(Number);
	}
}

module.exports = NumberStringCollection;
