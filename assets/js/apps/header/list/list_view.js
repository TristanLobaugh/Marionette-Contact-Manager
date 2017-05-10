ContactManager.module('HeaderApp.List', (List, ContactManager, Backbone, Marionette, $, _) => {
	List.Header = Marionette.ItemView.extend({
		template: '#header-link',
		tagName: 'li',
		events: {
			'click a': 'navigate'
		},
		navigate(e) {
			e.preventDefault();
			this.trigger('navigate', this.model);
		},
		onRender() {
			if (this.model.selected) {
				this.$el.addClass('active');
			}
		}
	});

	List.Headers = Marionette.CompositeView.extend({
		template: '#header-template',
		className: 'navbar navbar-inverse navbar-fixed-top',
		childView: List.Header,
		childViewContainer: 'ul',
		events: {
			'click a.navbar-brand': 'brandClicked'
		},
		brandClicked(e) {
			e.preventDefault();
			this.trigger('brand:clicked');
		}
	});
});
