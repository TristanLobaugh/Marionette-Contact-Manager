ContactManager.module('ContactsApp.List', (List, ContactManager, Backbone, Marionette, $, _) => {
	List.Controller = {
		listContacts() {
			const contacts = ContactManager.request('contact:entities');

			const contactsListView = new List.Contacts({
				collection: contacts
			});

			contactsListView.on('childview:contact:delete', (childview, model) => {
				contacts.remove(model);
			});

			// Exercise
			// contactsListView.on('childview:contact:warning', (childview, model) => {
			// 	console.log('Highlighting toggled on model: ', model);
			// });

			ContactManager.regions.main.show(contactsListView);
		}
	};
});

