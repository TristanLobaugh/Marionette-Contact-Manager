ContactManager.module('ContactsApp.Show', (Show, ContactManager, Backbone, Marionette, $, _) => {
	Show.Controller = {
		showContact(id) {
			const contacts = ContactManager.request('contact:entities');
			const model = contacts.get(id);
			const contactView = new Show.Contact({
				model
			});
			ContactManager.regions.main.show(contactView);
		}
	};
});
