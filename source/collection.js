const Type = require('@konfirm/is-type');

/**
 *  Collections managing (optionally) strong typed contents
 *
 *  @class    Collection
 *  @extends  {Array}
 */
class Collection extends Array {
	/**
	 *  Creates an instance of Collection.
	 *
	 *  @param     {...any}  element
	 *  @memberof  Collection
	 */
	constructor(...list) {
		const init = list.length === 1 && Type.isNumber(list[0]);

		super(...[].concat(init ? list[0] : []));

		if (!init && list.length) {
			this.push(...list);
		}
	}

	/**
	 *  Obtain the allowed types (empty array indicates all types are allowed)
	 *
	 *  @readonly
	 *  @static
	 *  @memberof  Collection
	 */
	static get ALLOWED_TYPES() {
		return [];
	}

	/**
	 *  Determine whether the given value is of an allowed type
	 *
	 *  @static
	 *  @param     {any}      potential
	 *  @return    {Boolean}  allowed
	 *  @throws    {Error}    throw error if the potential is not allowed
	 *  @memberof  Collection
	 */
	static isAllowed(potential) {
		const types = this.ALLOWED_TYPES;
		const allow = !types.length || types.filter((type) => Type.is(type, potential)).length > 0;

		if (!allow) {
			throw new Error(`Not allowed: (${ Type.getTypeName(potential) }) ${ potential }`);
		}

		return true;
	}

	/**
	 *  Create a new Collection from the given Array(-ish) provider
	 *
	 *  @static
	 *  @param     {Array|*}     provider
	 *  @return    {Collection}  collection
	 *  @throws    {Error}       throw error if one or more items are not allowed
	 *  @memberof  Collection
	 */
	static from(provider) {
		const from = Array.from(provider)
			.filter((item) => this.isAllowed(item));

		return super.from(from);
	}

	/**
	 *  Add one or more items to the end of the Collection
	 *
	 *  @param     {...any}  list
	 *  @return    {Number}  length
	 *  @throws    {Error}   throw error if one or more items are not allowed
	 *  @memberof  Collection
	 */
	push(...list) {
		return super.push(...list.filter((item) => this.constructor.isAllowed(item)));
	}


	/**
	 *  Merge the Collection with another Collection or Array, validating
	 *  whether all elements are allowed within the Collection
	 *
	 *  @param     {...any}      list
	 *  @return    {Collection}  collection
	 *  @throws    {Error}       throw error if one or more items are not allowed
	 *  @memberof  Collection
	 */
	concat(...list) {
		return super.concat(...[].concat(...list).filter((item) => this.constructor.isAllowed(item)));
	}

	/**
	 *  Unshift one or more items into the Collection
	 *
	 *  @param     {...any}    list
	 *  @return    {Number}  length
	 *  @throws    {Error}   throw error if one or more items are not allowed
	 *  @memberof  Collection
	 */
	unshift(...list) {
		return super.unshift(...list.filter((item) => this.constructor.isAllowed(item)));
	}

	/**
	 *  Changes the contents of the Collection by removing existing elements
	 *  and/or adding new elements
	 *
	 *  @param   {Number}      start
	 *  @param   {Number}      count
	 *  @param   {...*}        list
	 *  @return  {Collection}  removed
	 *  @throws  {Error}       throw error if one or more items are not allowed
	 */
	splice(start, count, ...list) {
		return super.splice(start, count, ...list.filter((item) => this.constructor.isAllowed(item)));
	}

	/**
	 *  Find the intersection (overlapping, common) elements of two collections
	 *
	 *  @param   {Collection|Array}  other
	 *  @param   {Function}          [compare]
	 *  @return  {Collection}        intersection
	 */
	intersect(other, compare) {
		if (!compare) {
			compare = (item, comp) => comp === item || String(comp) === String(item);
		}

		return this.filter((item) => other
			.filter((comp) => compare(item, comp))
			.length > 0);
	}

	/**
	 *  Find the elements from the Collection not present in the other
	 *
	 *  @param   {Collection|Array}  other
	 *  @param   {Function}          [compare]
	 *  @return  {Collection}        difference
	 */
	diff(other, compare) {
		if (!compare) {
			compare = (item, comp) => comp === item || String(comp) === String(item);
		}

		return this.filter((item) => other
			.filter((comp) => compare(item, comp))
			.length <= 0);
	}
}

module.exports = Collection;
