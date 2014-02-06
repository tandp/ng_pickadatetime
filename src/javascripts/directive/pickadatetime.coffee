Module.directive "ngPickadatetime", [ 
  "PickaDateTimeClass",
  "isValidDate",
  (PickaDateTimeClass, isValidDate) ->
    restrict:   "AC"
    template:   "<div class='pickadatetime_wrapper'>" +
                  "<input class='date-input' type='text'/>" +
                  "<input class='time-input' type='text' ui-mask='99:99' ng-model='modelTime'/>" +
                  "<input type='hidden' name='{{ name }}' ng-value='day.value()'/>" +
                "</div>"
    replace:    true
    scope: 
      name:     "@"
      date:     "="
      minDate:  "="
      disable:  "="
    controller: ["$scope", "$attrs", ($scope, $attrs) ->
      $scope.day       = new PickaDateTimeClass $attrs.value, $scope.name
      $scope.modelTime = $scope.day.getTime()
      $scope.$watch "disable", (disable) ->
        $scope.day.disable = disable
      $scope.$watch "modelTime", (newTime) ->
        $scope.day.setTime newTime
    ]
    link: (scope, element) ->
      dateInput = element.find(".date-input")
      today     = new Date()
      minDate   = if scope.day.datetime < today then scope.day.datetime else today

      dateInput.pickadate
        min: minDate
        onSet: (thingSet) ->
          if thingSet.select 
            scope.day.setDate thingSet.select 
            if scope.date? && isValidDate scope.day.datetime
              scope.date = scope.day.datetime
            unless scope.$$phase || scope.$root.$$phase
              scope.$apply()
   
      picker = dateInput.pickadate 'picker'
      picker.set 'select', scope.day.datetime

      scope.$watch "minDate", (minDate,oldMinDate) ->
        if isValidDate minDate
          if scope.day.datetime < scope.minDate
            scope.day.setDate scope.minDate
            picker.set 
              min: scope.minDate
              select: scope.day.datetime
      , true
]