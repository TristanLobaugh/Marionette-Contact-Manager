ContactManager.module('HeaderApp.List', (List, ContactManager, Backbone, Marionette, $, _) => {
	List.Controller = {
		listHeader() {
			const links = ContactManager.request('header:entities');
			const headers = new List.Headers({ collection: links });

			headers.on('brand:clicked', () => {
				ContactManager.trigger('contacts:list');
			});

			headers.on('childview:navigate', (childview, model) => {
				const trigger = model.get('navigationTrigger');
				ContactManager.trigger(trigger);
			});

			ContactManager.regions.header.show(headers);
		},
		setActiveHeader(headerUrl) {
			const links = ContactManager.request('header:entities');
			const headerToSelect = links.find(header => header.get('url') === headerUrl);
			headerToSelect.select();
			links.trigger('reset');
		}
	};
});
