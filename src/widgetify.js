import Nanopop              from './libs/nanopop';
import {on, off, eventPath} from './utils';

function Widgetify(options) {

    const that = {

        // Apply default options
        options: Object.assign({
            el: null,
            ref: null,
            inline: false,
            disabled: false,
            showAlways: false,
            padding: 8,
            position: 'bottom-middle',
            closeWithKey: 'Escape',

            onShow: () => 0,
            onHide: () => 0
        }, options),

        // Used listeners
        listeners: [],

        // Nanopop instance
        nanopop: null,

        _init() {
            const opt = that.options;

            // Resolve elements
            for (const prop of ['el', 'ref']) {
                if (typeof opt[prop] === 'string') {
                    opt[prop] = document.querySelector(opt[prop]);
                }
            }

            const {ref, el, padding} = opt;

            // Remove element, and insert it after the reference
            if (opt.inline) {
                const parent = ref.parentElement;
                el.remove();

                if (ref.nextSibling) {
                    parent.insertBefore(el, ref.nextSibling);
                } else {
                    parent.appendChild(el);
                }
            } else {
                el.style.position = 'fixed';

                // Otherwise, Setup nanopop engine
                that.nanopop = Nanopop({
                    el, ref, padding
                });

                // Listen for resize events
                that.listeners.push(
                    on(window, ['scroll', 'resize'], () => that.reposition(), {capture: true})
                );
            }

            const ck = opt.closeWithKey;
            that.listeners.push(
                // Listen for show events
                on(ref, 'click', () => that.show()),

                // Close with keyboard
                on(document, 'keyup', e => (e.key === ck || e.code === ck) && that.hide()),

                // Cancel selecting if the user taps behind the color picker
                on(document, ['touchstart', 'mousedown'], e => {
                    if (that.isVisible() &&
                        !eventPath(e).some(e => e === ref || e === el)) {
                        that.hide();
                    }
                }, {capture: true})
            );

            if (opt.disabled) {
                that.disable();
            }

            if (opt.showAlways) {
                that.show();
            }

            return that;
        },

        reposition() {

            if (!that.options.inline) {
                that.nanopop.update(that.options.position);
            }

            return that;
        },

        /**
         * Shows the widget
         */
        show() {

            if (!that.options.disabled && !that.isVisible()) {
                that.options.el.classList.add('visible');
                that.reposition();
                that.options.onShow(that);
            }

            return that;
        },

        /**
         * Hides the widget
         */
        hide() {
            const {disabled, showAlways, el} = that.options;

            if (!disabled && !showAlways && that.isVisible()) {
                el.classList.remove('visible');
                that.options.onHide(that);
            }

            return that;
        },

        /**
         * Disables the widget
         */
        disable() {
            that.hide();
            that.options.disabled = true;
            that.options.ref.classList.add('disabled');
            return that;
        },

        /**
         * Enables the widget
         */
        enable() {
            that.options.disabled = false;
            that.options.ref.classList.remove('disabled');
            return that;
        },

        /**
         * Checks whenever the widget is currently visible
         */
        isVisible() {
            return that.options.el.classList.contains('visible');
        },

        /**
         * Destroys, e.g. removes all event listeners
         */
        destroy() {
            that.listeners.forEach(args => off(...args));
        },

        /**
         * Destroys and removes ref and el from the dom
         */
        destroyAndRemove() {
            that.destroy();
            const {ref, el} = that.options;
            ref.remove();
            el.remove();
        }
    };

    return that._init();
}

// Export utils
Widgetify.utils = {
    on, off, eventPath
};

// Export version
Widgetify.version = '0.0.0';

export default Widgetify;
