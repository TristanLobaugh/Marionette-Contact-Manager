ContactManager.module('ContactsApp.List', (List, ContactManager, Backbone, Marionette, $, _) => {
	List.Controller = {
		listContacts(criterion) {
			const loadingView = new ContactManager.Common.Views.Loading();
			ContactManager.regions.main.show(loadingView);

			const fetchingContacts = ContactManager.request('contact:entities');

			const contactsListLayout = new List.Layout();
			const contactsListPanel = new List.Panel();

			$.when(fetchingContacts).done(contacts => {
				const filteredContacts = ContactManager.Entities.FilteredCollection({
					collection: contacts,
					filterFunction(filterCriterion) {
						var criterion = filterCriterion.toLowerCase();
						return contact => {
							if (contact.get('firstName').toLowerCase().indexOf(criterion) !== -1 || contact.get('lastName').toLowerCase().indexOf(criterion) !== -1 || contact.get('phoneNumber').toLowerCase().indexOf(criterion) !== -1) {
								return contact;
							}
						};
					}
				});

				if (criterion) {
					filteredContacts.filter(criterion);
					contactsListPanel.once('show', () => {
						contactsListPanel.triggerMethod('set:filter:criterion', criterion);
					});
				}

				const contactsListView = new List.Contacts({
					collection: filteredContacts
				});

				contactsListPanel.on('contacts:filter', filterCriterion => {
					filteredContacts.filter(filterCriterion);
					ContactManager.trigger('contacts:filter', filterCriterion);
				});

				contactsListLayout.on('show', () => {
					contactsListLayout.panelRegion.show(contactsListPanel);
					contactsListLayout.contactsRegion.show(contactsListView);
				});

				contactsListPanel.on('contact:new', () => {
					const newContact = new ContactManager.Entities.Contact();
					const view = new ContactManager.ContactsApp.New.Contact({
						model: newContact
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
							view.trigger('dialog:close');
							const newContactView = contactsListView.children.findByModel(newContact);
							if (newContactView) {
								newContactView.flash('alert-success');
							}
						} else {
							view.triggerMethod('form:data:invalid', newContact.validationError);
						}
					});
					ContactManager.regions.dialog.show(view);
				});

				contactsListView.on('childview:contact:show', (childView, args) => {
					ContactManager.trigger('contact:show', args.model.get('id'));
				});

				contactsListView.on('childview:contact:edit', (childView, args) => {
					const model = args.model;
					const view = new ContactManager.ContactsApp.Edit.Contact({
						model
					});

					view.on('form:submit', data => {
						if (model.save(data)) {
							childView.render();
							view.trigger('dialog:close');
							childView.flash('alert-success');
						} else {
							view.triggerMethod('form:data:invalid', model.validationError);
						}
					});

					ContactManager.regions.dialog.show(view);
				});

				contactsListView.on('childview:contact:delete', (childView, args) => {
					args.model.destroy();
				});

				ContactManager.regions.main.show(contactsListLayout);
			});
		}
	};
});
