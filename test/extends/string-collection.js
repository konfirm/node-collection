const Collection = require('../../source/collection');

class StringCollection extends Collection {
	static get ALLOWED_TYPES() {
		return super.ALLOWED_TYPES.concat(String);
	}
}

module.exports = StringCollection;
