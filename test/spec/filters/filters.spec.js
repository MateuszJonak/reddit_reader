'use strict';

describe('Filters:', function () {
    // load the controller's module
    beforeEach(module('redditReaderApp'));

    it('should be a filters', inject(function ($filter) {
        expect($filter('unsafe')).not.toBeNull();
        expect($filter('htmldecode')).not.toBeNull();
        expect($filter('timesince')).not.toBeNull();

    }));

    it('should a htmldecode work perfectly', inject(function (htmldecodeFilter) {
        expect(htmldecodeFilter('&lt;p&gt;text&lt;/p&gt;')).toBe('<p>text</p>');
        expect(htmldecodeFilter('&lt;div&gt;&lt;p&gt;text&lt;/p&gt;&lt;/div&gt;')).toBe('<div><p>text</p></div>');
    }));

    it('should a htmldecode work perfectly', inject(function (timesinceFilter) {
        var data = Math.floor((new Date().getTime() / 1000) - 2 * 60);

        expect(timesinceFilter(data)).toBe('2 minutes ago');
    }));
});