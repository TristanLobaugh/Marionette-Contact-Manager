ContactManager.module('ContactsApp.List', (List, ContactManager, Backbone, Marionette, $, _) => {
	List.Controller = {
		listContacts() {
			const loadingView = new ContactManager.Common.Views.Loading();
			ContactManager.regions.main.show(loadingView);

			const fetchingContacts = ContactManager.request('contact:entities');

			$.when(fetchingContacts).done(contacts => {
				const contactsListView = new List.Contacts({
					collection: contacts
				});

				contactsListView.on('childview:contact:delete', (childView, model) => {
					model.destroy();
				});

				contactsListView.on('childview:contact:show', (childView, model) => {
					ContactManager.trigger('contact:show', model.get('id'));
				});

				ContactManager.regions.main.show(contactsListView);
			});
		}
	};
});
