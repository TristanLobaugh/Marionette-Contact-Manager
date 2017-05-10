ContactManager.module('AboutApp', (AboutApp, ContactManager, Backbone, Marionette, $, _) => {
	AboutApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			'about': 'showAbout'
		}
	});

	const API = {
		showAbout() {
			AboutApp.Show.Controller.showAbout();
			ContactManager.execute('set:active:header', 'about');
		}
	};

	ContactManager.on('about:show', () => {
		ContactManager.navigate('about');
		API.showAbout();
	});

	AboutApp.on('start', () => {
		new AboutApp.Router({
			controller: API
		});
	});
});
