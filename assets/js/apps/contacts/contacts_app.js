ContactManager.module('ContactsApp', (ContactsApp, ContactManager, Backbone, Marionette, $, _) => {
	ContactsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			'contacts(/filter/criterion::criterion)': 'listContacts',
			'contacts/:id': 'showContact',
			'contacts/:id/edit': 'editContact'
		}
	});

	const API = {
		listContacts(criterion) {
			ContactsApp.List.Controller.listContacts(criterion);
			ContactManager.execute('set:active:header', 'contacts');
		},
		showContact(id) {
			ContactsApp.Show.Controller.showContact(id);
			ContactManager.execute('set:active:header', 'contacts');
		},
		editContact(id) {
			ContactsApp.Edit.Controller.editContact(id);
			ContactManager.execute('set:active:header', 'contacts');
		}
	};

	ContactManager.on('contacts:filter', criterion => {
		if (criterion) {
			ContactManager.navigate(`contacts/filter/criterion:${criterion}`);
		} else {
			ContactManager.navigate('contacts');
		}
	});

	ContactManager.on('contacts:list', () => {
		ContactManager.navigate('contacts');
		API.listContacts();
	});

	ContactManager.on('contact:show', id => {
		ContactManager.navigate(`contacts/${id}`);
		API.showContact(id);
	});

	ContactManager.on('contact:edit', id => {
		ContactManager.navigate(`contacts/${id}/edit`);
		API.editContact(id);
	});


	ContactsApp.on('start', () => {
		new ContactsApp.Router({
			controller: API
		});
	});
});
