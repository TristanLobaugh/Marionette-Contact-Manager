ContactManager.module('ContactsApp.Edit', (Edit, ContactManager, Backbone, Marionette, $, _) => {
	Edit.Contact = ContactManager.ContactsApp.Common.Views.Form.extend({
		initialize() {
			this.title = `Edit ${this.model.get('firstName')} ${this.model.get('lastName')}`;
		},
		onRender() {
			if (this.options.generateTitle) {
				var $title = $('<h1>', { text: this.title });
				this.$el.prepend($title);
			}
			this.$('.js-submit').text('Update contact');
		}
	});
});
