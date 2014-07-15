'use strict';

angular.module('App.Filters', [])

    // Change String for HTML code
    .filter('unsafe', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    })

    // Decode signs like &lt;/p&gt;
    .filter('htmldecode', function() {
        return function(val) {
            var e = document.createElement('div');
            e.innerHTML = val;
            return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
        };
    })

    // Convert time from articles
    .filter('timesince', function() {
        return function(val) {
            var seconds = Math.floor(((new Date().getTime()/1000) - val));

            var interval = Math.floor(seconds / 31536000);

            if (interval >= 1) {
                if(interval === 1){
                    return interval + ' year ago';
                }
                else{
                    return interval + ' years ago';
                }

            }
            interval = Math.floor(seconds / 2592000);
            if (interval >= 1) {
                if(interval === 1){
                    return interval + ' month ago';
                } else {
                    return interval + ' months ago';
                }

            }
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                if(interval === 1){
                    return interval + ' day ago';
                } else {
                    return interval + ' days ago';
                }

            }
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
                if(interval === 1){
                    return interval + ' hour ago';
                } else {
                    return interval + ' hours ago';
                }

            }
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
                if(interval === 1){
                    return interval + ' minute ago';
                } else {
                    return interval + ' minutes ago';
                }

            }
            return Math.floor(seconds) + ' seconds ago';
        };
    });