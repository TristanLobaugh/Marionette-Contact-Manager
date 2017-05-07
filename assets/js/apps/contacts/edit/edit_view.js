ContactManager.module('ContactsApp.Edit', (Edit, ContactManager, Backbone, Marionette, $, _) => {
	Edit.Contact = Marionette.ItemView.extend({
		template: '#contact-form',
		events: {
			'click button.js-submit': 'submitClicked'
		},
		submitClicked(e) {
			e.preventDefault();
			const data = Backbone.Syphon.serialize(this);
			this.trigger('form:submit', data);
		},
		onFormDataInvalid(errors) {
			var $view = this.$el;

			const clearFormErrors = () => {
				var $form = $view.find('form');
				$form.find('.help-inline.error').each(function() {
					$(this).remove();
				});
				$form.find('.control-group.alert-danger').each(function() {
					console.log('clear class');
					$(this).removeClass('alert-danger');
				});
			};

			const markErrors = (value, key) => {
				var $controlGroup = $view.find(`#contact-${key}`).parent();
				var $errorEl = $('<span>', { class: 'help-inline error', text: value });
				$controlGroup.append($errorEl).addClass('alert-danger');
			};
			clearFormErrors();
			_.each(errors, markErrors);
		}
	});
});
