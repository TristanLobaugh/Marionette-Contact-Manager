ContactManager.module('ContactsApp.Show', (Show, ContactManager, Backbone, Marionette, $, _) => {
	Show.Contact = Marionette.ItemView.extend({
		template: '#contact-view'
	});
});
