ContactManager.module('Entities', (Entities, ContactManager, Backbone, Marionette, $, _) => {
	Entities.Header = Backbone.Model.extend({
		initialize() {
			const selectable = new Backbone.Picky.Selectable(this);
			_.extend(this, selectable);
		}
	});

	Entities.HeaderCollection = Backbone.Collection.extend({
		model: Entities.Header,
		initialize() {
			const singleSelect = new Backbone.Picky.SingleSelect(this);
			_.extend(this, singleSelect);
		}
	});

	const initializeHeaders = () => {
		Entities.headers = new Entities.HeaderCollection([
			{ name: 'Contacts', url: 'contacts', navigationTrigger: 'contacts:list' },
			{ name: 'About', url: 'about', navigationTrigger: 'about:show' }
		]);
	};

	const API = {
		getHeaders() {
			if (Entities.headers === undefined) {
				initializeHeaders();
			}
			return Entities.headers;
		}
	};

	ContactManager.reqres.setHandler('header:entities', () => API.getHeaders());
});
