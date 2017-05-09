ContactManager.module('ContactsApp.List', (List, ContactManager, Backbone, Marionette, $, _) => {
	const NoContactsView = Marionette.ItemView.extend({
		template: '#contact-list-none',
		tagName: 'tr',
		className: 'alert-warning'
	});

	List.Layout = Marionette.LayoutView.extend({
		template: '#contact-list-layout',
		regions: {
			panelRegion: '#panel-region',
			contactsRegion: '#contacts-region'
		}
	});

	List.Panel = Marionette.ItemView.extend({
		template: '#contact-list-panel',
		triggers: {
			'click button.js-new': 'contact:new'
		},
		events: {
			'submit #filter-form': 'filterContacts'
		},
		ui: {
			criterion: 'input.js-filter-criterion'
		},
		filterContacts(e) {
			e.preventDefault();
			const criterion = this.$('.js-filter-criterion').val();
			this.trigger('contacts:filter', criterion);
		},
		onSetFilterCriterion(criterion) {
			this.ui.criterion.val(criterion);
		}
	});

	List.Contact = Marionette.ItemView.extend({
		tagName: 'tr',
		template: '#contact-list-item',
		triggers: {
			'click td a.js-show': 'contact:show',
			'click td a.js-edit': 'contact:edit',
			'click button.js-delete': 'contact:delete'
		},
		events: {
			'click': 'highlightName'
		},
		flash(cssClass) {
			var $view = this.$el;
			$view.hide().toggleClass(cssClass).fadeIn(800, () => {
				setTimeout(() => {
					$view.toggleClass(cssClass);
				}, 1000);
			});
		},
		highlightName(e) {
			this.$el.toggleClass('warning');
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
		emptyView: NoContactsView,
		childView: List.Contact,
		childViewContainer: 'tbody',
		initialize: function() {
			this.listenTo(this.collection, 'reset', () => {
				this.attachHtml = (collectionView, childView, index) => {
					collectionView.$el.append(childView.el);
				};
			});
		},
		onRenderCollection() {
			this.attachHtml = (collectionView, childView, index) => {
				collectionView.$el.prepend(childView.el);
			};
		}
	});
});
