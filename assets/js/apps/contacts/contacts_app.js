ContactManager.module('ContactsApp', (ContactsApp, ContactManager, Backbone, Marionette, $, _) => {
	ContactsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			'contacts': 'listContacts',
			'contacts/:id': 'showContact'
		}
	});

	const API = {
		listContacts() {
			ContactsApp.List.Controller.listContacts();
		},
		showContact(id) {
			ContactsApp.Show.Controller.showContact(id);
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


	ContactsApp.on('start', () => {
		new ContactsApp.Router({
			controller: API
		});
	});
});
