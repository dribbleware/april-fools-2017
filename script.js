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
        var itemsContainer = document.createElement('div');
        itemsContainer.classList.add('items-container');

        var alphabet = document.createElement('div');
        alphabet.classList.add('items-alphabet');

        itemsContainer.appendChild(alphabet);

        return itemsContainer;
    }

    var Item = function () {

        var itemWrap = document.createElement('div');
        itemWrap.classList.add('item-wrap');

        var brand = document.createElement('div');
        brand.classList.add('item-brand');
        brand.innerHTML = currentProduct.brand;

        var title = document.createElement('div');
        title.classList.add('item-title');
        title.innerHTML = currentProduct.title;

        var subtitle = document.createElement('div');
        subtitle.classList.add('item-subtitle');
        subtitle.innerHTML = currentProduct.subtitle;

        var links = document.createElement('div');
        links.classList.add('item-links');

        if (currentProduct.links) {
            for (var link in currentProduct.links) {
                if (currentProduct.links.hasOwnProperty(link)) {
                    var el = document.createElement('a');
                    el.classList.add('item-link');

                    el.href = currentProduct.links[link];
                    el.innerHTML = link;
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
        var footer = document.createElement('footer');
        footer.innerHTML = 'Made with lols at <a href="http://dribbleware.co" target="_blank">dribbleware</a>';

        return footer;
    }

})();