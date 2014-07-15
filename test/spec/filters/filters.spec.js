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

    it('should a timesinceFilter work perfectly', inject(function (timesinceFilter) {
        var twoMin = Math.floor((new Date().getTime() / 1000) - 2 * 60);
        var threeHours = Math.floor((new Date().getTime() / 1000) - 3 * 3600);
        var oneDay = Math.floor((new Date().getTime() / 1000) - 1 * 86400);
        expect(timesinceFilter(twoMin)).toBe('2 minutes ago');
        expect(timesinceFilter(threeHours)).toBe('3 hours ago');
        expect(timesinceFilter(oneDay)).toBe('1 day ago');
    }));

    it('should a unsafe work perfectly', inject(function (unsafeFilter) {
        expect(unsafeFilter('<div>my divs</div>').$$unwrapTrustedValue()).toBe('<div>my divs</div>');
        expect(unsafeFilter('<div><p>text</p></div>').$$unwrapTrustedValue()).toBe('<div><p>text</p></div>');
        expect(unsafeFilter('<img src="this/is/my/path.jpg" alt="title"/>').$$unwrapTrustedValue()).toBe('<img src="this/is/my/path.jpg" alt="title"/>');
    }));
});