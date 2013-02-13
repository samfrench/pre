/*jshint loopfunc:true shadow:true */
define(['module/bootstrap'], function(news) {

    function StatsSubscriber(config, iStatsMock, DocumentMock) {
        var that      = this;

        this.config   = config || {};
        this.document = DocumentMock || document;

        this.addCTMLabelForIStats();

        require(['vendor/istats/istats'], function(istats) {
            that.istats   = iStatsMock || istats;

            that.pageviews = [];
            that.hidden    = [];
            that.links     = [];

            that.istats.init();
            that.processConfig();
        });
    }

    StatsSubscriber.prototype = {

        addCTMLabelForIStats: function() {
            this.document.cookie = "sa_labels=" + encodeURIComponent('ctm=true') + ";";
        },

        addPageviews: function(pageviews) {
            for(var i = 0; i < pageviews.length; i++) {
                var pageview = pageviews[i];

                this.pageviews.push(pageview);
                this.registerPageview(pageview);
            }
        },

        addHidden: function(hiddenEvents) {
            for(var i = 0; i < hiddenEvents.length; i++) {
                var hiddenEvent = hiddenEvents[i];

                this.hidden.push(hiddenEvent);
                this.registerHiddenEvent(hiddenEvent);
            }
        },

        addTrackingLinks: function(trackingLinks) {
            for(var i = 0; i < trackingLinks.length; i++) {
                var trackingLink = trackingLinks[i];

                this.links.push(trackingLink);
                this.registerTrackingLink(trackingLink);
            }
        },

        applyCountername: function(counternameFunc, eventMeta) {
            var currentCountername = this.istats.getCountername(),
                eventMeta = Array.prototype.slice.call(eventMeta);

            eventMeta.unshift(currentCountername);
            return counternameFunc.apply(this, eventMeta);
        },

        applyLabels: function(labelsFunc, eventMeta) {
            return labelsFunc.apply(this, eventMeta);
        },

        registerPageview: function(pageview) {
            var that        = this,
                eventName   = pageview.on,
                countername = pageview.countername;

            news.pubsub.on(eventName, function() {
                newCountername = typeof countername === 'function' ? that.applyCountername(countername, arguments) : countername;
                that.istats.log('pageview', newCountername);
            });
        },

        registerHiddenEvent: function(hiddenEvent) {
            var that        = this,
                eventName   = hiddenEvent.on,
                actionType  = hiddenEvent.action_type || 'event',
                actionName  = hiddenEvent.action_name,
                labels      = hiddenEvent.labels || {};

            news.pubsub.on(eventName, function() {
                newLabels = typeof labels === 'function' ? that.applyLabels(labels, arguments) : labels;
                that.istats.log(actionType, actionName, newLabels);
            });
        },

        registerTrackingLink: function(trackingLink) {
            var type     = trackingLink.type || 'internal',
                name     = trackingLink.name,
                selector = document.querySelectorAll(trackingLink.selector);

            this.istats.track(type, { region: selector, linkLocation: name });
        },

        processConfig: function() {
            var pageviews = this.config.pageviews || {};
            this.addPageviews(pageviews);

            var hiddenEvents = this.config.hidden || {};
            this.addHidden(hiddenEvents);

            var trackingLinks = this.config.links || {};
            this.addTrackingLinks(trackingLinks);
        }
    };

    return StatsSubscriber;
});