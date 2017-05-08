ContactManager.module('ContactsApp.List', (List, ContactManager, Backbone, Marionette, $, _) => {
	List.Controller = {
		listContacts() {
			const loadingView = new ContactManager.Common.Views.Loading();
			ContactManager.regions.main.show(loadingView);

			const fetchingContacts = ContactManager.request('contact:entities');

			const contactsListLayout = new List.Layout();
			const contactsListPanel = new List.Panel();

			$.when(fetchingContacts).done(contacts => {
				const contactsListView = new List.Contacts({
					collection: contacts
				});

				contactsListLayout.on('show', () => {
					contactsListLayout.panelRegion.show(contactsListPanel);
					contactsListLayout.contactsRegion.show(contactsListView);
				});

				contactsListPanel.on('contact:new', () => {
					const newContact = new ContactManager.Entities.Contact();
					const view = new ContactManager.ContactsApp.New.Contact({
						model: newContact,
						asModal: true
					});

					view.on('form:submit', data => {
						if (contacts.length > 0) {
							const highestId = contacts.max(c => c.id).get('id');
							data.id = highestId + 1;
						} else {
							data.id = 1;
						}
						if (newContact.save(data)) {
							contacts.add(newContact);
							ContactManager.regions.dialog.empty();
							contactsListView.children.findByModel(newContact).flash('alert-success');
						} else {
							view.triggerMethod('form:data:invalid', newContact.validationError);
						}
					});
					ContactManager.regions.dialog.show(view);
				});

				contactsListView.on('childview:contact:delete', (childView, args) => {
					args.model.destroy();
				});

				contactsListView.on('childview:contact:show', (childView, args) => {
					ContactManager.trigger('contact:show', args.model.get('id'));
				});

				contactsListView.on('childview:contact:edit', (childView, args) => {
					const model = args.model;
					const view = new ContactManager.ContactsApp.Edit.Contact({
						model,
						asModal: true
					});

					view.on('form:submit', data => {
						if (model.save(data)) {
							childView.render();
							ContactManager.regions.dialog.empty();
							childView.flash('alert-success');
						} else {
							view.triggerMethod('form:data:invalid', model.validationError);
						}
					});

					ContactManager.regions.dialog.show(view);
				});

				ContactManager.regions.main.show(contactsListLayout);
			});
		}
	};
});
