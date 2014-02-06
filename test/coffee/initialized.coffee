describe 'directive', ->
  $directive = null
  scope      = null
  imputDate  = "2014-01-29 22:50:00 +0400"
  testDate   = false

  beforeEach module('ngPickadatetime')

  beforeEach inject ($rootScope, $compile) ->
    $rootScope.testDate = false
    $directive = angular.element "<input class=\"ngPickadatetime\" name=\"date\" data-minDate=\"minDate\" date=\"testDate\" value=\"#{ imputDate }\">"
    $compile($directive)($rootScope)
    $rootScope.$digest()

  it 'Initialized', () ->
    $newInput = $directive.find("input[name=date]")
    expect( $newInput.length ).toBe 1
    expect( $newInput.val()  ).toBe (new Date(imputDate)).toISOString()