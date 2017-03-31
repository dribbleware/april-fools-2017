(function () {

    var main = document.createElement('main');
    main.classList.add('main');
    document.body.appendChild(main);

    request = new XMLHttpRequest();
    request.open('GET', 'products.json', true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400){
            var data = JSON.parse(request.responseText);
            init(data);
        } else {
            // We reached our target server, but it returned an error
        }
    };

    request.onerror = function() {
        console.log('connection error!');
    };

    request.send();

    var currentAlphabet = null;
    var currentProduct = null;

    var init = function (obj) {

        var main = document.querySelector('main');
        var container = null;
        var itemsWrap = null;

        for (var prop in obj) {
            var productAlphabet = obj[prop].brand[0];
            currentProduct = obj[prop];
            if (!currentAlphabet || currentAlphabet != productAlphabet) {
                currentAlphabet = productAlphabet;

                container = Container();
                container.querySelector('.items-alphabet').innerHTML = productAlphabet.toUpperCase();

                itemsWrap = document.createElement('div');
                itemsWrap.classList.add('items-wrap');

                main.appendChild(container);
            }

            var item = Item();
            itemsWrap.appendChild(item);

            container.appendChild(itemsWrap);
        }

        var footer = Footer();
        document.body.appendChild(footer);
    }

    var Container = function () {
        var itemsContainer  = Element('div', 'items-container'),
            alphabet        = Element('div', 'items-alphabet');

        itemsContainer.appendChild(alphabet);

        return itemsContainer;
    }

    var Item = function () {

        var itemWrap    = Element('div', 'item-wrap'),
            brand       = Element('div', 'item-brand', currentProduct.brand),
            title       = Element('div', 'item-title', currentProduct.title),
            subtitle    = Element('div', 'item-subtitle', currentProduct.subtitle),
            links       = Element('div', 'item-links');

        if (currentProduct.links) {
            for (var link in currentProduct.links) {
                if (currentProduct.links.hasOwnProperty(link)) {
                    var el = Element('a', 'item-link', link);

                    el.href = currentProduct.links[link];
                    el.target = "_blank";

                    links.appendChild(el);
                }
            }
            
        }

        itemWrap.appendChild(brand);
        itemWrap.appendChild(title);
        itemWrap.appendChild(subtitle);
        itemWrap.appendChild(links)

        return itemWrap;
    }

    var Footer = function () {
        var text = 'Made with lols at <a href="http://dribbleware.co" target="_blank">dribbleware</a>'
        var footer = Element('footer', null, text);

        return footer;
    }

    var Element = function (element, className, text) {
        var el = document.createElement(element);
        
        if (className) {
            el.classList.add(className);
        }

        if (text) {
            el.innerHTML = text;
        }

        return el;
    }

})();