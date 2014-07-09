'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('redditReaderApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));
//    it('spec', function() {
//        debugger; // This is like setting a breakpoint
//        // ...
//    });
  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
