ContactManager.module('Entities', (Entities, ContactManager, Backbone, Marionette, $, _) => {
	Entities.Contact = Backbone.Model.extend({
		urlRoot: 'contacts'
	});

	Entities.configureStorage('ContactManager.Entities.Contact');

	Entities.ContactCollection = Backbone.Collection.extend({
		url: 'contacts',
		model: Entities.Contact,
		comparator: 'firstName'
	});

	Entities.configureStorage('ContactManager.Entities.ContactCollection');

	const initializeContacts = () => {
		console.log('running init');
		const contacts = new Entities.ContactCollection([
			{
				id: 1,
				firstName: 'Bobby',
				lastName: 'Brigham',
				phoneNumber: '555-4444'
			},
			{
				id: 2,
				firstName: 'Alice',
				lastName: 'Arten',
				phoneNumber: '555-5555'
			},
			{
				id: 3,
				firstName: 'Charlie',
				lastName: 'Campbell',
				phoneNumber: '555-6666'
			},
			{
				id: 4,
				firstName: 'Alice',
				lastName: 'Tampen',
				phoneNumber: '555-1111'
			},
			{
				id: 5,
				firstName: 'Alice',
				lastName: 'Artsy',
				phoneNumber: '555-2222'
			},
			{
				id: 6,
				firstName: 'Alice',
				lastName: 'Smith',
				phoneNumber: '555-3333'
			}
		]);
		contacts.forEach(contact => {
			contact.save();
		});
		return contacts.models;
	};

	const API = {
		getContactEntities() {
			const contacts = new Entities.ContactCollection();
			const defer = $.Deferred();
			contacts.fetch({
				success(data) {
					defer.resolve(data);
				}
			});
			const promise = defer.promise();
			$.when(promise).done(fetchedContacts => {
				if (fetchedContacts.length === 0) {
					const models = initializeContacts();
					contacts.reset(models);
				}
			});
			return promise;
		},
		getContactEntity(contactId) {
			const contact = new Entities.Contact({ id: contactId });
			const defer = $.Deferred();
			setTimeout(() => {
				contact.fetch({
					success(data) {
						defer.resolve(data);
					},
					error(data) {
						defer.resolve(undefined);
					}
				});
			}, 2000);
			return defer.promise();
		}
	};


	ContactManager.reqres.setHandler('contact:entities', () => API.getContactEntities());
	ContactManager.reqres.setHandler('contact:entity', id => API.getContactEntity(id));
});
