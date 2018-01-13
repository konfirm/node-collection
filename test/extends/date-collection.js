const Collection = require('../../source/collection');

class DateCollection extends Collection {
	static get ALLOWED_TYPES() {
		return super.ALLOWED_TYPES.concat(Date);
	}
}

module.exports = DateCollection;
