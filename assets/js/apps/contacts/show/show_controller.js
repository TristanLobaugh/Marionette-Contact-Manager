ContactManager.module('ContactsApp.Show', (Show, ContactManager, Backbone, Marionette, $, _) => {
	Show.Controller = {
		showContact(id) {
			const loadingView = new ContactManager.Common.Views.Loading();
			ContactManager.regions.main.show(loadingView);

			const fetchingContact = ContactManager.request('contact:entity', id);
			$.when(fetchingContact).done(contact => {
				let contactView;
				if (contact !== undefined) {
					contactView = new Show.Contact({
						model: contact
					});
				} else {
					contactView = new Show.MissingContact();
				}
				ContactManager.regions.main.show(contactView);
			});
		}
	};
});
