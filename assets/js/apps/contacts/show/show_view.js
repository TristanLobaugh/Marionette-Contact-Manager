ContactManager.module('ContactsApp.Show', (Show, ContactManager, Backbone, Marionette, $, _) => {
	Show.MissingContact = Marionette.ItemView.extend({
		template: '#missing-contact-view'
	});

	Show.Contact = Marionette.ItemView.extend({
		template: '#contact-view',
		events: {
			'click a.js-edit': 'editClicked'
		},
		editClicked(e) {
			e.preventDefault();
			this.trigger('contact:edit', this.model);
		}
	});
});
