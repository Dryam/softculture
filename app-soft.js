 // TODO:
// изменить состония меню согласно макетам     
(function() {
	var initialState = 'all_programms';
	Polymer('app-soft', {
		created: function() {
			var app = document.querySelector('app-soft');
			app.state = initialState;
		},
		ready: function() {
			console.log('Polymer Ready');
			this.$.base.addEventListener('core-localstorage-load', console.info('a value is loaded from localStorage'));
		},
		remoteDataChanged: function() {
			console.info('remoteData changed');
			this.remote2Local();
		},
		localDataChanged: function() {
			console.info('localData changed')
			this.MenuItems = this.localData.states[this.state].coreDrawerpanel.drawer.coreMenu.items;
		
		},
		stateChanged: function() {
			console.info('state changed to ' + this.state);
			this.updateModels();
		},
		remote2Local: function(e) {
			this.localData = this.remoteData;
			console.info('remoteData saved to localData');
		},
		updateModels: function() {
			this.$.core_menu.templateInstance.model.MenuItems = this.localData.states[this.state].coreDrawerpanel.drawer.coreMenu.items;
		},
		saveProgram: function() {						
			this.remoteData.states.all_programms = 1;
		},
		itemClick: function(e) {
			switch (e.target.id) {
				case 'students':
					this.state = "all_students";
					break;
				case 'programms':
					this.state = "all_programms";
					break;
				case 'createNewProgram':
					this.state = "createNewProgram";
					break;
				case 'createNewStudent':
					this.state = "createNewStudent";
					break;
				case 'saveProgram':
					this.saveProgram();
					break;
				default:
					console.warn('no state or actions for ' + '#' + e.target.id);
			}
		}
	});
})();
