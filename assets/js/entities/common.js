ContactManager.module('Entities', (Entities, ContactManager, backbone, Marionette, $, _) => {
	Entities.FilteredCollection = options => {
		const original = options.collection;
		const filtered = new original.constructor();
		filtered.add(original.models);
		filtered.filterFunction = options.filterFunction;

		const applyFilter = (filterCriterion, filterStrategy, collection) => {
			var collection = collection || original;
			var criterion;
			if (filterStrategy === 'filter') {
				criterion = filterCriterion.trim();
			} else {
				criterion = filterCriterion;
			}

			var items = [];
			if (criterion) {
				if (filterStrategy === 'filter') {
					if (!filtered.filterFunction) {
						throw ('Attempted to use \'filter\' function, but none was defined');
					}
					var filterFunction = filtered.filterFunction(criterion);
					items = collection.filter(filterFunction);
				} else {
					items = collection.where(criterion);
				}
			} else {
				items = collection.models;
			}

			filtered._currentCriterion = criterion;
			return items;
		};

		filtered.filter = filterCriterion => {
			filtered._currentFilter = 'filter';
			var items = applyFilter(filterCriterion, 'filter');

			filtered.reset(items);
			return filtered;
		};

		filtered.where = filterCriterion => {
			filtered._currentFilter = 'where';
			var items = applyFilter(filterCriterion, 'where');

			filtered.reset(items);
			return filtered;
		};

		original.on('reset', () => {
			var items = applyFilter(filtered._currentCriterion, filtered._currentFilter);

			filtered.reset(items);
		});

		original.on('add', models => {
			var coll = new original.constructor();
			coll.add(models);
			var items = applyFilter(filtered._currentCriterion, filtered._currentFilter, coll);
			filtered.add(items);
		});

		return filtered;
	};
});
