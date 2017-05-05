ContactManager.module('ContactsApp.Show', (Show, ContactManager, Backbone, Marionette, $, _) => {
	Show.Controller = {
		showContact(model) {
			const contactView = new Show.Contact({
				model
			});
			ContactManager.regions.main.show(contactView);
		}
	};
});
