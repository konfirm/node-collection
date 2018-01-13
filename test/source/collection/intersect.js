/* global source, describe, it, expect */

const Collection = source('collection');
const StringCollection = require('../../extends/string-collection');
const NumberCollection = require('../../extends/number-collection');
const NumberStringCollection = require('../../extends/number-string-collection');

describe('Collection Intersection', () => {
	const collectionA = Collection.from(['a', 'b', 1, 2, 3, true, false]);
	const collectionB = StringCollection.from(['a', 'b', 'c']);
	const collectionC = NumberCollection.from([0, 1, 2, 3, 4]);
	const collectionD = NumberStringCollection.from(['c', 4, 'b', 3, 'a', 2, 'b', 1]);

	[
		{ a: collectionA, b: collectionB, expect: ['a', 'b'] },
		{ a: collectionB, b: collectionA, expect: ['a', 'b'] },

		{ a: collectionA, b: collectionC, expect: [1, 2, 3] },
		{ a: collectionC, b: collectionA, expect: [1, 2, 3] },

		{ a: collectionA, b: collectionD, expect: ['a', 'b', 1, 2, 3] },
		{ a: collectionD, b: collectionA, expect: ['b', 3, 'a', 2, 'b', 1] },

		{ a: collectionB, b: collectionD, expect: ['a', 'b', 'c'] },
		{ a: collectionD, b: collectionB, expect: ['c', 'b', 'a', 'b'] },

		{ a: collectionC, b: collectionD, expect: [ 1, 2, 3, 4 ] },
		{ a: collectionD, b: collectionC, expect: [ 4, 3, 2, 1 ] },
	].forEach((item) => {
		describe('default compare function', () => {
			const intersect = item.a.intersect(item.b);

			describe(`finds common elements ${item.a} > ${item.b}`, () => {
				it('preserves the origin constructor', (next) => {
					expect(intersect.constructor.name).to.equal(item.a.constructor.name);

					next();
				});

				it('contains the correct elements', (next) => {
					expect(intersect.length).to.equal(item.expect.length);
					expect(intersect).to.equal(item.expect);

					next()
				});

				it('preserves the order or the origin', (next) => {
					expect(String(intersect)).to.equal(String(item.expect));
					expect(JSON.stringify(intersect)).to.equal(JSON.stringify(item.expect));

					next();
				});
			});
		});

		describe('custom compare function', () => {
			const nothing = item.a.intersect(item.b, () => false);
			const everything = item.a.intersect(item.b, () => true);

			it('contains the correct elements', (next) => {
				expect(nothing.length).to.equal(0);
				expect(nothing).to.equal([]);

				expect(everything.length).to.equal(item.a.length);
				expect(everything).to.equal(item.a);

				next()
			});
		});
	});
});
