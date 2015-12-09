// @todo add unique
import $ from 'jquery';
import modernizr from 'Modernizr/Modernizr';

class ActionToggle {

	constructor(link) {
		this.link = link;
		this.$link = $(link);
		this.toggleClass = this.$link.data().toggleClass ? this.$link.data().toggleClass : 'active';
		this.$target = $(this.$link.data().toggleTarget);
		this.toggleTargetClass = this.$link.data().toggleTargetClass ? this.$link.data().toggleTargetClass : 'active';
		this.transitionEndName = this._whichTransitionEvent();

		if (!this.$target.length) {
			throw 'data-toggle-target must be set';
		}

		this.$link.on('click.' + ActionToggle.MODULE_NAME, (e) => {
			this.$link.toggleClass(this.toggleClass);

			this.$target
				.toggleClass(this.toggleTargetClass)
				.off(this.transitionEndName)
				.one(this.transitionEndName, () => {
					$(window).trigger('resize');
				});

			return false;
		});
	}

	// Public methods

	destroy() {
		this.$link.off('.' + ActionToggle.MODULE_NAME);
	}



	// Private methods

	_whichTransitionEvent() {
		let transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd', // Saf 6, Android Browser
			'MozTransition': 'transitionend', // only for FF < 15
			'transition': 'transitionend' // IE10, Opera, Chrome, FF 15+, Saf 7+
		};
		return transEndEventNames[modernizr.prefixed('transition')];
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
