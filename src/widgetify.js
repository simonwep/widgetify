import Nanopop              from './libs/nanopop';
import {on, off, eventPath} from './utils';

function Widgetify(options) {

    const that = {

        // Apply default options
        options: Object.assign({
            el: null,
            ref: null,
            inline: false,
            position: 'bottom-middle'
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

            const {ref, el} = opt;

            // Remove element, and insert it after the reference
            if (opt.inline) {
                const parent = ref.parentElement;
                el.remove();

                if (ref.nextSibling) {
                    parent.insertBefore(el, ref);
                } else {
                    parent.appendChild(el);
                }
            } else {
                el.style.position = 'fixed';

                // Otherwise, Setup nanopop engine
                that.nanopop = Nanopop({el, ref});

                // Listen for resize events
                that.listeners.push(
                    on(window, ['scroll', 'resize'], () => that.reposition(), {capture: true})
                );
            }

            that.listeners.push(
                // Listen for show events
                on(ref, 'click', () => that.show()),

                // Cancel selecting if the user taps behind the color picker
                on(document, ['touchstart', 'mousedown'], e => {
                    if (that.isVisible() &&
                        !eventPath(e).some(e => e === ref || e === el)) {
                        that.hide();
                    }
                }, {capture: true})
            );

            return that;
        },

        reposition() {
            if (!that.options.inline) {
                that.nanopop.update(that.options.position);
            }
        },

        show() {
            that.options.el.classList.add('visible');
            that.reposition();
        },

        hide() {
            that.options.el.classList.remove('visible');
        },

        isVisible() {
            return that.options.el.classList.contains('visible');
        },

        destroy() {

            // Unbind events
            that.listeners.forEach(args => off(...args));

            // Remove elements
            const {ref, el} = that.options;
            ref.remove();
            el.remove();
        }
    };

    return that._init();
}

export default Widgetify;
