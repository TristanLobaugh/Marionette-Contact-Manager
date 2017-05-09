ContactManager.module('ContactsApp.Edit', (Edit, ContactManager, Backbone, Marionette, $, _) => {
	Edit.Controller = {
		editContact(id) {
			const loadingView = new ContactManager.Common.Views.Loading({
				title: 'Artificial Loading Delay',
				message: 'Data loading is delayed to demonstrate using a loading view.'
			});
			ContactManager.regions.main.show(loadingView);

			const fetchingContact = ContactManager.request('contact:entity', id);
			$.when(fetchingContact).done(contact => {
				let view;
				if (contact !== undefined) {
					view = new Edit.Contact({
						model: contact,
						generateTitle: true
					});

					view.on('form:submit', data => {
						if (contact.save(data)) {
							ContactManager.trigger('contact:show', contact.get('id'));
						} else {
							view.triggerMethod('form:data:invalid', contact.validationError);
						}
					});
				} else {
					view = new ContactManager.ContactsApp.Show.MissingContact();
				}
				ContactManager.regions.main.show(view);
			});
		}
	};
});
