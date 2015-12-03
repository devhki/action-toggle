// @todo add unique
import $ from 'jquery';

class ActionToggle {

	constructor(link) {
		this.link = link;
		this.$link = $(link);
		this.toggleClass = this.$link.data().toggleClass ? this.$link.data().toggleClass : 'active';
		this.$target = $(this.$link.data().toggleTarget);
		this.toggleTargetClass = this.$link.data().toggleTargetClass ? this.$link.data().toggleTargetClass : 'active';

		if ( !this.$target.length ) {
			throw 'data-toggle-target must be set';
		}

		this.$link.on('click.' + ActionToggle.MODULE_NAME, (e) => {
			this.$link.toggleClass( this.toggleClass );
			this.$target.toggleClass( this.toggleTargetClass );
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
