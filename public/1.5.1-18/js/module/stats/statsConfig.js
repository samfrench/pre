define(function() {

    var getPlayerName =  function(player) {
        var player_name = '';

        if(typeof player.getFlashVersion == 'function') {
            player_name = player.getFlashVersion() == '0' ? 'emp-clear' : 'emp-flash';
        } else {
            player_name = 'rmp';
        }

        return player_name;
    };

    return {
        links: [
            {
                name: 'top-stories',
                selector: '#top-stories'
            },
            {
                name: 'features-and-analysis',
                selector: '.features-and-analysis'
            }
        ],
        pageviews: [
            {
                on: 'tabs:activate:mostread',
                countername: 'news.popular.read.page'
            },
            {
                on: 'tabs:activate:topstories',
                countername: 'news.page'
            },
            {
                on: 'tabs:activate:livetext',
                countername: function(currentCountername) {
                    return currentCountername.replace(/(\d+).*$/, '$1.page');
                }
            },
            {
                on: 'tabs:activate:keypoints',
                countername: function(currentCountername) {
                    return currentCountername.replace(/(\d+).*$/, '$1.keypoints.page');
                }
            },
            {
                on: 'tabs:activate:contribute',
                countername: function(currentCountername) {
                    return currentCountername.replace(/(\d+).*$/, '$1.contribute.page');
                }
            },
            {
                on: 'map:asset:request:success',
                countername: function(currentCountername, assetId, response) {
                    return response.countername || currentCountername;
                }
            }
        ],
        hidden: [
            {
                on: 'nav:top:open',
                action_name: 'top_navigation_open'
            },
            {
                on: 'nav:bottom:open',
                action_name: 'bottom_navigation_open'
            },
            {
                on: 'locator:submitSearch',
                action_name: 'news.locator'
            },
            {
                on: 'locator:geoLocation',
                action_name: 'news.locator'
            },
            {
                on: 'video:load',
                action_type: 'video',
                action_name: 'load',
                labels: function(player) {
                    return { player_name: getPlayerName(player) };
                }
            },
            {
                on: 'video:play',
                action_type: 'video',
                action_name: 'play',
                labels: function(player) {
                    return { player_name: getPlayerName(player) };
                }
            },
            {
                on: 'video:pause',
                action_type: 'video',
                action_name: 'pause',
                labels: function(player) {
                    return { player_name: getPlayerName(player) };
                }
            },
            {
                on: 'video:end',
                action_type: 'video',
                action_name: 'end',
                labels: function(player) {
                    return { player_name: getPlayerName(player) };
                }
            },
            {
                on: 'tabs:activate:maprelated',
                action_type: 'tabchange',
                action_name: 'map-index',
                labels: { tab_name: 'related' }
            },
            {
                on: 'tabs:activate:maptopstories',
                action_type: 'tabchange',
                action_name: 'map-index',
                labels: { tab_name: 'topstories' }
            },
            {
                on: 'tabs:activate:mapmostwatched',
                action_type: 'tabchange',
                action_name: 'map-index',
                labels: { tab_name: 'mostwatched' }
            },
            {
                on: 'map:index:toggle',
                action_type: 'toggle',
                action_name: 'map-index',
                labels: function(section, toggle) {
                    return {
                        section: section,
                        toggle: toggle
                    };
                }
            },
            {
                on: 'map:asset:summary',
                action_type: 'toggle',
                action_name: 'map-asset-summary',
                labels: function(toggle) {
                    return { toggle: toggle };
                }
            },
            {
                on: 'map:index:topstories',
                action_type: 'toggle',
                action_name: 'map-index-topstories',
                labels: function(toggle) {
                    return { toggle: toggle };
                }
            }
        ]
    };
});