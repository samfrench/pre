define([
    'module/bootstrap',
    'vendor/ender/reqwest'
], function(
    news,
    reqwest
) {
    return {
        init: function() {

            var links = news.$('.shortenUrl');
            for (var i = links.length - 1; i >= 0; i--) {
                links[i].addEventListener('click', function() {

                    var anchor = this,
                        req = new XMLHttpRequest();
                        targetUrl = anchor.getAttribute('data-target-url');
                        socialUrl = anchor.getAttribute('data-social-url');
                        shrinkerUrl = 'http://www.bbc.co.uk/modules/sharetools/v1/shrink.json?url=';
                    // request needs to be synchronous so shrunk url is returned
                    // before link is activated
                    req.open('GET', shrinkerUrl + encodeURIComponent(targetUrl), false);
                    req.send();

                    if (req.status === 200) {
                        anchor.href = socialUrl + JSON.parse(req.responseText).url;
                    }
                }, false);
            }

        }
    };
});