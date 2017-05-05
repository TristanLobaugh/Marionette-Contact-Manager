ContactManager.module('ContactsApp.List', (List, ContactManager, Backbone, Marionette, $, _) => {
	List.Contact = Marionette.ItemView.extend({
		tagName: 'tr',
		template: '#contact-list-item',
		events: {
			'click': 'highlightName',
			// Exercise
			// 'click td': 'alertCellText'
			'click button.js-delete': 'deleteClicked'
		},
		highlightName(e) {
			this.$el.toggleClass('warning');
			// Exercise
			// this.trigger('contact:warning', this.model);
		},
		// Exercise
		// alertCellText(e) {
		// 	alert($(e.target).text());
		// },
		deleteClicked(e) {
			e.stopPropagation();
			this.trigger('contact:delete', this.model);
		},
		remove() {
			const self = this;
			this.$el.fadeOut(() => {
				Marionette.ItemView.prototype.remove.call(self);
			});
		}
	});

	List.Contacts = Marionette.CompositeView.extend({
		tagName: 'table',
		className: 'table table-hover',
		template: '#contact-list',
		childView: List.Contact,
		childViewContainer: 'tbody'
	});
});
