const containers = Array.from(document.querySelectorAll('main > section'));

const widgets = [];
for (const con of containers) {
    const ref = con.querySelector('button');
    const el = con.querySelector('div');

    widgets.push(
        new Widgetify(Object.assign({
            el, ref,
        }, con.dataset))
    );
}
