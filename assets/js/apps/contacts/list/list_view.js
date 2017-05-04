ContactManager.module('ContactsApp.List', (List, ContactManager, Backbone, Marionette, $, _) => {
	List.Contact = Marionette.ItemView.extend({
		tagName: 'li',
		template: '#contact-list-item'
	});

	List.Contacts = Marionette.CollectionView.extend({
		tagName: 'ul',
		childView: List.Contact
	});
});
