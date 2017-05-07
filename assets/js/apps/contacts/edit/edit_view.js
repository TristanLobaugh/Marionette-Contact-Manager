ContactManager.module('ContactsApp.Edit', (Edit, ContactManager, Backbone, Marionette, $, _) => {
	Edit.Contact = Marionette.ItemView.extend({
		template: '#contact-form',
		events: {
			'click button.js-submit': 'submitClicked'
		},
		submitClicked(e) {
			e.preventDefault();
			const data = Backbone.Syphon.serialize(this);
			this.trigger('form:submit', data);
		}
	});
});
