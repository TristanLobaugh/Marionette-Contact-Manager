ContactManager.module('ContactsApp', (ContactsApp, ContactManager, Backbone, Marionette, $, _) => {
	ContactsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			'contacts': 'listContacts',
			'contacts/:id': 'showContact',
			'contacts/:id/edit': 'editContact'
		}
	});

	const API = {
		listContacts() {
			ContactsApp.List.Controller.listContacts();
		},
		showContact(id) {
			ContactsApp.Show.Controller.showContact(id);
		},
		editContact(id) {
			ContactsApp.Edit.Controller.editContact(id);
		}
	};

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
