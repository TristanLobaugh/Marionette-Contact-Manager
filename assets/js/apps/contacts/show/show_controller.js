ContactManager.module('ContactsApp.Show', (Show, ContactManager, Backbone, Marionette, $, _) => {
	Show.Controller = {
		showContact(id) {
			const contacts = ContactManager.request('contact:entities');
			const model = contacts.get(id);
			let contactView;
			if (model !== undefined) {
				contactView = new Show.Contact({
					model
				});
			} else {
				contactView = new Show.MissingContact();
			}
			ContactManager.regions.main.show(contactView);
		}
	};
});
