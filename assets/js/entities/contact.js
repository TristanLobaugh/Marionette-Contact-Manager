ContactManager.module('Entities', (Entities, ContactManager, Backbone, Marionette, $, _) => {
	Entities.Contact = Backbone.Model.extend({});

	Entities.ContactCollection = Backbone.Collection.extend({
		model: Entities.Contact,
		comparator(contact) {
			return `${contact.get('firstName')} ${contact.get('lastName')}`;
		}
	});


	let contacts;

	const initializeContacts = () => {
		contacts = new Entities.ContactCollection([
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
	};

	const API = {
		getContactEntities() {
			if (contacts === undefined) {
				initializeContacts();
			}
			return contacts;
		}
	};

	ContactManager.reqres.setHandler('contact:entities', () => API.getContactEntities());
});

