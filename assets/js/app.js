const ContactManager = new Marionette.Application();

ContactManager.on('before:start', () => {
	const	RegionContainer = Marionette.LayoutView.extend({
		el: '#app-container',
		regions: {
			main: '#main-region'
		}
	});
	ContactManager.regions = new RegionContainer();
});

ContactManager.on('start', () => {
	ContactManager.ContactsApp.List.Controller.listContacts();
});
