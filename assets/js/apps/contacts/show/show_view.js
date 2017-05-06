ContactManager.module('ContactsApp.Show', (Show, ContactManager, Backbone, Marionette, $, _) => {
	Show.MissingContact = Marionette.ItemView.extend({
		template: '#missing-contact-view'
	});

	Show.Contact = Marionette.ItemView.extend({
		template: '#contact-view'
	});
});
