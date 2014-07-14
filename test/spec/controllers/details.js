'use strict';

describe('Controller: DetailsCtrl', function () {

    // load the controller's module
    beforeEach(module('redditReaderApp'));

    var DetailsCtrl,
        scope,
        redditBackend,
        routeParams,
        $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, redditFactory) {
        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();
        routeParams = {'id': '2ampcb', 'subreddit': 'jquery'};
        redditBackend = redditFactory;
        DetailsCtrl = $controller('DetailsCtrl', {
            $scope: scope,
            redditFactory: redditBackend,
            $routeParams: routeParams
        });
    }));

    describe('Display Content of article', function() {
        var url,
            data;
        beforeEach(function () {
            url = 'http://www.reddit.com/r/jquery/comments/2ampcb.json?depth=1&limit=10&sort=top';

            data = '[{"kind": "Listing", "data": {"modhash": "", "children": [{"kind": "t3", "data": {"domain": "self.jquery", "banned_by": null, "media_embed": {}, "subreddit": "jquery", ' +
                '"selftext_html": "This is text", "selftext": "This is text", "likes": null, "secure_media": null, "link_flair_text": null, "id": "2ampcb", "gilded": 0, "secure_media_embed": {}, "clicked": false, "stickied": false, "author": "Xuttuh", "media": null, "score": 1, "approved_by": null, "over_18": false, "hidden": false, "thumbnail": "", "subreddit_id": "t5_2qhs4", "edited": false, "link_flair_css_class": null, "author_flair_css_class": null, "downs": 0, "saved": false, "is_self": true, "permalink": "/r/jquery/comments/2ampcb/helpdynamically_adding_content_to_varables/", "name": "t3_2ampcb", "created": 1405331609.0, "url": "http://www.reddit.com/r/jquery/comments/2ampcb/helpdynamically_adding_content_to_varables/", "author_flair_text": null, "title": "Help:Dynamically adding content to varables", "created_utc": 1405302809.0, "ups": 1, "upvote_ratio": 0.56, "num_comments": 4, "visited": false, "num_reports": null, "distinguished": null}}], "after": null, "before": null}}, ' +
                '{"kind": "Listing", "data": {"modhash": "", "children": [{"kind": "t1", "data": {"subreddit_id": "t5_2qhs4", "banned_by": null, "subreddit": "jquery", "likes": null, "replies": {"kind": "Listing", "data": {"modhash": "", "children": [{"kind": "more", "data": {"count": 0, "parent_id": "t1_ciwqm3x", "children": ["ciwrdo7"], "name": "t1_ciwrdo7", "id": "ciwrdo7"}}], "after": null, "before": null}}, "saved": false, "id": "ciwqm3x", "gilded": 0, "author": "paulguise", "parent_id": "t3_2ampcb", "score": 3, "approved_by": null, "controversiality": 0, "body": "Body of comment", "edited": false, "author_flair_css_class": null, "downs": 0, "body_html": "&lt;div &gt;HTML Body of comment&lt;/div&gt;", "link_id": "t3_2ampcb", "score_hidden": false, "name": "t1_ciwqm3x", "created": 1405336102.0, "author_flair_text": null, "created_utc": 1405307302.0, "ups": 3, "num_reports": null, "distinguished": null}}, ' +
                '{"kind": "t1", "data": {"subreddit_id": "t5_2qhs4", "banned_by": null, "subreddit": "jquery", "likes": null, "replies": {"kind": "Listing", "data": {"modhash": "", "children": [{"kind": "more", "data": {"count": 0, "parent_id": "t1_cix281l", "children": ["cix3bby"], "name": "t1_cix3bby", "id": "cix3bby"}}], "after": null, "before": null}}, "saved": false, "id": "cix281l", "gilded": 0, "author": "lostjimmy", "parent_id": "t3_2ampcb", "score": 2, "approved_by": null, "controversiality": 0, "body": "Procrastination at work led me to this: http://jsfiddle.net/YZQE3/", "edited": false, "author_flair_css_class": null, "downs": 0, "body_html": "&lt;div class=&gt;&lt;p&gt;Procrastination at work led me to this: &lt;a &gt;http://jsfiddle.net/YZQE3/&lt;/a&gt;&lt;/p&gt;&lt;/div&gt;", "link_id": "t3_2ampcb", "score_hidden": false, "name": "t1_cix281l", "created": 1405377752.0, "author_flair_text": null, "created_utc": 1405348952.0, "ups": 2, "num_reports": null, "distinguished": null}}], "after": null, "before": null}}]'
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should return data for article id', function () {
            scope.getArticle();
            $httpBackend.expectGET(url).respond(200, data);
            $httpBackend.flush();

            expect(scope.data.article.id).toBe(routeParams.id);
            expect(scope.data.article.subreddit).toBe(routeParams.subreddit);
            expect(scope.data.comments.length).toBe(2);
        });

    });

    describe('Add comment for article', function() {
        var url,
            data,
            urlLogin;
        beforeEach(function () {

            url = 'http://www.reddit.com/r/jquery/comments/2ampcb.json?depth=1&limit=10&sort=top';

            data = '[{"kind": "Listing", "data": {"modhash": "", "children": [{"kind": "t3", "data": {"domain": "self.jquery", "banned_by": null, "media_embed": {}, "subreddit": "jquery", ' +
                '"selftext_html": "This is text", "selftext": "This is text", "likes": null, "secure_media": null, "link_flair_text": null, "id": "2ampcb", "gilded": 0, "secure_media_embed": {}, "clicked": false, "stickied": false, "author": "Xuttuh", "media": null, "score": 1, "approved_by": null, "over_18": false, "hidden": false, "thumbnail": "", "subreddit_id": "t5_2qhs4", "edited": false, "link_flair_css_class": null, "author_flair_css_class": null, "downs": 0, "saved": false, "is_self": true, "permalink": "/r/jquery/comments/2ampcb/helpdynamically_adding_content_to_varables/", "name": "t3_2ampcb", "created": 1405331609.0, "url": "http://www.reddit.com/r/jquery/comments/2ampcb/helpdynamically_adding_content_to_varables/", "author_flair_text": null, "title": "Help:Dynamically adding content to varables", "created_utc": 1405302809.0, "ups": 1, "upvote_ratio": 0.56, "num_comments": 4, "visited": false, "num_reports": null, "distinguished": null}}], "after": null, "before": null}}, ' +
                '{"kind": "Listing", "data": {"modhash": "", "children": [{"kind": "t1", "data": {"subreddit_id": "t5_2qhs4", "banned_by": null, "subreddit": "jquery", "likes": null, "replies": {"kind": "Listing", "data": {"modhash": "", "children": [{"kind": "more", "data": {"count": 0, "parent_id": "t1_ciwqm3x", "children": ["ciwrdo7"], "name": "t1_ciwrdo7", "id": "ciwrdo7"}}], "after": null, "before": null}}, "saved": false, "id": "ciwqm3x", "gilded": 0, "author": "paulguise", "parent_id": "t3_2ampcb", "score": 3, "approved_by": null, "controversiality": 0, "body": "Body of comment", "edited": false, "author_flair_css_class": null, "downs": 0, "body_html": "&lt;div &gt;HTML Body of comment&lt;/div&gt;", "link_id": "t3_2ampcb", "score_hidden": false, "name": "t1_ciwqm3x", "created": 1405336102.0, "author_flair_text": null, "created_utc": 1405307302.0, "ups": 3, "num_reports": null, "distinguished": null}}, ' +
                '{"kind": "t1", "data": {"subreddit_id": "t5_2qhs4", "banned_by": null, "subreddit": "jquery", "likes": null, "replies": {"kind": "Listing", "data": {"modhash": "", "children": [{"kind": "more", "data": {"count": 0, "parent_id": "t1_cix281l", "children": ["cix3bby"], "name": "t1_cix3bby", "id": "cix3bby"}}], "after": null, "before": null}}, "saved": false, "id": "cix281l", "gilded": 0, "author": "lostjimmy", "parent_id": "t3_2ampcb", "score": 2, "approved_by": null, "controversiality": 0, "body": "Procrastination at work led me to this: http://jsfiddle.net/YZQE3/", "edited": false, "author_flair_css_class": null, "downs": 0, "body_html": "&lt;div class=&gt;&lt;p&gt;Procrastination at work led me to this: &lt;a &gt;http://jsfiddle.net/YZQE3/&lt;/a&gt;&lt;/p&gt;&lt;/div&gt;", "link_id": "t3_2ampcb", "score_hidden": false, "name": "t1_cix281l", "created": 1405377752.0, "author_flair_text": null, "created_utc": 1405348952.0, "ups": 2, "num_reports": null, "distinguished": null}}], "after": null, "before": null}}]'

            scope.getArticle();
            $httpBackend.expectGET(url).respond(200, data);
            $httpBackend.flush();

        });

        afterEach(function () {
//            $httpBackend.verifyNoOutstandingExpectation();
//            $httpBackend.verifyNoOutstandingRequest();
        });


        it('should return return error on submit comment', function() {
            urlLogin = 'http://www.reddit.com/api/login?api_type=json&user=test_cc&passwd=zaqwsx&rem=True';
            var dataLogin = '{"json": {"errors": [], "data": {"modhash": "ym5407ia4t7955cb3f1c45b776ed7e5b962dce570ad25d0e7c", "cookie": "29151019,2014-07-14T13:49:02,a409bee91611d96b330d9531b8c6de65f20f89ba"}}}';
            var urlComment = 'https://ssl.reddit.com/api/comment?api_type=json&text=This%20is%20comment&thing_id=t3_2ampcb';
            var dataComment = '{"json": {"errors": [["USER_REQUIRED", "zaloguj si\u0119", null]]}}';

            scope.comment = "This is comment";
            scope.addComment();
            $httpBackend.expectPOST(urlLogin).respond(200, dataLogin);
            $httpBackend.expectPOST(urlComment).respond(200, dataComment);
            $httpBackend.expectGET('modalErrorComment.html').respond(200);
            $httpBackend.flush();

//            expect(scope.data.article.id).toBe(routeParams.id);
//            expect(scope.data.article.subreddit).toBe(routeParams.subreddit);
//            expect(scope.data.comments.length).toBe(2);
        });

    });



});
