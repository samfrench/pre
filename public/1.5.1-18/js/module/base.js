define([
    'module/stats/statsSubscriber',
    'module/stats/statsConfig',
    'module/nav/navManager',
    'module/urlShrinker',
    'config'
    ],
    
    function(StatsSubscriber, statsConfig, navManager, urlShrinker, config) {

    return {
        init: function(opts) {
            navManager.init();
            urlShrinker.init();
            new StatsSubscriber(statsConfig);
        }
    };
});