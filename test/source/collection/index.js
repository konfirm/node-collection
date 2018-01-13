/* global source, describe, it, expect */

const Collection = source('collection');
const StringCollection = require('../../extends/string-collection');
const NumberCollection = require('../../extends/number-collection');
const DateCollection = require('../../extends/date-collection');
const NumberStringCollection = require('../../extends/number-string-collection');

describe('Collection', () => {
	const values = [
		'foo', 'bar', 'baz',
		1, 2, Infinity,
		true, false, null,
		new Date('1970-01-01'), new Date('1990-01-01'), new Date('2010-01-01'),
	];
	const test = [
		{ collection: Collection,             allow: values,             types: [] },
		{ collection: StringCollection,       allow: values.slice(0, 3), types: [String] },
		{ collection: NumberCollection,       allow: values.slice(3, 6), types: [Number] },
		{ collection: DateCollection,         allow: values.slice(9),    types: [Date] },
		{ collection: NumberStringCollection, allow: values.slice(0, 6), types: [String, Number] },
	];

	test.forEach((config) => {
		const name = config.collection.name;

		it(`${name} implements ALLOWED_TYPES`, (next) => {
			expect(config.collection.ALLOWED_TYPES).to.be.array();
			expect(config.collection.ALLOWED_TYPES).to.equal(config.types);

			next();
		});

		values.forEach((value) => {
			const shouldAllow = config.allow.indexOf(value) >= 0;
			const collection = new config.collection();

			if (shouldAllow) {
				it(`${name} allows push, unshift and splice of (${typeof value}) ${value}`, (next) => {
					expect(collection.push(value)).to.be.number();
					expect(collection.unshift(value)).to.be.number();
					expect(collection.splice(0, 0, value)).to.be.array();

					next();
				});

				it(`${name} allows concat (${typeof value}) ${value}`, (next) => {
					const concat = collection.concat(value);

					expect(concat).to.be.instanceof(config.collection);
					expect(concat.length).to.equal(4);

					next();
				});
			}
			else {
				it(`${name} denies push, unshift and splice of (${typeof value}) ${value}`, (next) => {
					expect(() => collection.push(value)).to.throw(Error, /^Not allowed/);
					expect(() => collection.unshift(value)).to.throw(Error, /^Not allowed/);
					expect(() => collection.splice(0, 0, value)).to.throw(Error, /^Not allowed/);
					
					next();
				});

				it(`${name} denies (${typeof value}) ${value}`, (next) => {
					expect(() => collection.concat(value)).to.throw(Error, /^Not allowed/);
					
					next();
				});
			}
		});

		it(`new ${name} allows ${config.allow}`, (next) => {
			const collection = new config.collection(...config.allow);

			expect(collection).to.be.instanceof(config.collection);
			expect(collection).to.be.instanceof(Array);
			expect(collection.length).to.equal(config.allow.length);

			next();
		});

		it(`${name}.from allows ${config.allow}`, (next) => {
			const collection = config.collection.from(config.allow);

			expect(collection).to.be.instanceof(config.collection);
			expect(collection).to.be.instanceof(Array);
			expect(collection.length).to.equal(config.allow.length);

			next();
		});

		const deny = values.filter((value) => config.allow.indexOf(value) < 0);

		if (deny.length) {
			it(`new ${name} denies ${deny}`, (next) => {
				expect(() => new config.collection(deny)).to.throw(Error, /^Not allowed/);

				next();
			});

			it(`${name}.from denies ${deny}`, (next) => {
				expect(() => config.collection.from(deny)).to.throw(Error, /^Not allowed/);

				next();
			});
		}
	});
});
