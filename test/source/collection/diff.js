/* global source, describe, it, expect */

const Collection = source('collection');
const StringCollection = require('../../extends/string-collection');
const NumberCollection = require('../../extends/number-collection');
const NumberStringCollection = require('../../extends/number-string-collection');

describe('Collection Diff', () => {
	const one = Collection.from([
		'a',
		'b',
		1,
		2,
		3,
		true,
		false,
	]);
	const two = StringCollection.from([ 'a', 'b', 'c' ]);
	const three = NumberCollection.from([
		0,
		1,
		2,
		3,
		4,
	]);
	const four = NumberStringCollection.from([
		'c',
		4,
		'b',
		3,
		'a',
		2,
		'b',
		1,
	]);

	[
		{ a: one, b: two, expect: [
			1,
			2,
			3,
			true,
			false,
		] },
		{ a: two, b: one, expect: [ 'c' ] },

		{ a: one, b: three, expect: [
			'a',
			'b',
			true,
			false,
		] },
		{ a: three, b: one, expect: [ 0, 4 ] },

		{ a: one, b: four, expect: [ true, false ] },
		{ a: four, b: one, expect: [ 'c', 4 ] },

		{ a: two, b: four, expect: [] },
		{ a: four, b: two, expect: [
			4,
			3,
			2,
			1,
		] },

		{ a: three, b: four, expect: [ 0 ] },
		{ a: four, b: three, expect: [
			'c',
			'b',
			'a',
			'b',
		] },
	].forEach((item) => {
		describe('default compare function', () => {
			const diff = item.a.diff(item.b);

			describe(`finds different elements ${ item.a } > ${ item.b }`, () => {
				it('preserves the origin constructor', (next) => {
					expect(diff.constructor.name).to.equal(item.a.constructor.name);

					next();
				});

				it('contains the correct elements', (next) => {
					expect(diff.length).to.equal(item.expect.length);
					expect(diff).to.equal(item.expect);

					next();
				});

				it('preserves the order or the origin', (next) => {
					expect(String(diff)).to.equal(String(item.expect));
					expect(JSON.stringify(diff)).to.equal(JSON.stringify(item.expect));

					next();
				});
			});
		});

		describe('custom compare function', () => {
			const nothing = item.a.diff(item.b, () => true);
			const everything = item.a.diff(item.b, () => false);

			it('contains the correct elements', (next) => {
				expect(nothing.length).to.equal(0);
				expect(nothing).to.equal([]);

				expect(everything.length).to.equal(item.a.length);
				expect(everything).to.equal(item.a);

				next();
			});
		});
	});
});
