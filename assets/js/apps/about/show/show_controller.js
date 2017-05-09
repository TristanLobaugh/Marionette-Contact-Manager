ContactManager.module('AboutApp.Show', (Show, ContactManager, Backbone, Marionette, $, _) => {
	Show.Controller = {
		showAbout() {
			const view = new Show.Message();
			ContactManager.regions.main.show(view);
		}
	};
});
