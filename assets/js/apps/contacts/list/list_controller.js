ContactManager.module('ContactsApp.List', (List, ContactManager, Backbone, Marionette, $, _) => {
	List.Controller = {
		listContacts() {
			const contacts = ContactManager.request('contact:entities');

			const contactsListView = new List.Contacts({
				collection: contacts
			});

			ContactManager.regions.main.show(contactsListView);
		}
	};
});

