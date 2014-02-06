describe('directive', function() {
  var $directive, imputDate, scope, testDate;
  $directive = null;
  scope = null;
  imputDate = "2014-01-29 22:50:00 +0400";
  testDate = false;
  beforeEach(module('ngPickadatetime'));
  beforeEach(inject(function($rootScope, $compile) {
    $rootScope.testDate = false;
    $directive = angular.element("<input class=\"ngPickadatetime\" name=\"date\" data-minDate=\"minDate\" date=\"testDate\" value=\"" + imputDate + "\">");
    $compile($directive)($rootScope);
    return $rootScope.$digest();
  }));
  return it('Initialized', function() {
    var $newInput;
    $newInput = $directive.find("input[name=date]");
    expect($newInput.length).toBe(1);
    return expect($newInput.val()).toBe((new Date(imputDate)).toISOString());
  });
});
