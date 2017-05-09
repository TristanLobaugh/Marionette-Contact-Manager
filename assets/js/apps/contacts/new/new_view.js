ContactManager.module('ContactsApp.New', (New, ContactManager, Backbone, Marionette, $, _) => {
	New.Contact = ContactManager.ContactsApp.Common.Views.Form.extend({
		title: 'New Contact',
		onRender() {
			this.$('.js-submit').text('Create contact');
		}
	});
});
