const Collection = require('../../source/collection');

class NumberCollection extends Collection {
	static get ALLOWED_TYPES() {
		return super.ALLOWED_TYPES.concat(Number);
	}
}

module.exports = NumberCollection;
