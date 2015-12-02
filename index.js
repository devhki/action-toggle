// @todo add unique
import $ from 'jquery';

class ActionToggle {

	constructor(link) {
		this.link = link;
		this.$link = $(link);
		this.$target = $(this.$link.data().toggleTarget);
		this.toggleClass = this.$link.data().toggleClass;

		if ( !this.$target.length ) {
			throw 'data-toggle-target must be set';
		}

		if ( !this.toggleClass ) {
			throw 'data-toggle-class must be set';
		}

		this.$link.on('click.' + ActionToggle.MODULE_NAME, (e) => {
			this.$target.toggleClass( this.toggleClass );
			return false;
		});
	}

	// Public methods

	destroy() {
		this.$link.off('.' + ActionToggle.MODULE_NAME);
	}

}

ActionToggle.MODULE_NAME = 'a-toggle';

export default ActionToggle;

export function autoInit() {
	let instances = [];

	$('.' + ActionToggle.MODULE_NAME).each((i, item) => {
		instances.push(new ActionToggle(item));
	});

	return instances;
};
