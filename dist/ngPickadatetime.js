(function() {
  var Module, PickaDateTimeClass;

  Module = angular.module('ngPickadatetime', ['ui.mask']);

  Module.factory("isValidDate", [
    function() {
      return function(d) {
        if (Object.prototype.toString.call(d) !== "[object Date]") {
          return false;
        }
        return !isNaN(d.getTime());
      };
    }
  ]);

  PickaDateTimeClass = (function() {
    PickaDateTimeClass.prototype.dateMask = 'd MMM y';

    PickaDateTimeClass.prototype.timeMask = 'HH:mm';

    function PickaDateTimeClass(datetime) {
      this.datetime = this.create(datetime);
    }

    PickaDateTimeClass.prototype.setDate = function(newDate) {
      var newDateTime;
      newDateTime = new Date(newDate);
      this.datetime.setDate(newDateTime.getDate());
      this.datetime.setMonth(newDateTime.getMonth());
      this.datetime.setFullYear(newDateTime.getFullYear());
      return this.getDate();
    };

    PickaDateTimeClass.prototype.getDate = function() {
      return this.datetime;
    };

    PickaDateTimeClass.prototype.setTime = function(newTime) {
      var matchTime;
      matchTime = (newTime != null ? newTime.length : void 0) >= 4 ? newTime.match(/([0-9]{2})/g) : [0, 0];
      this.datetime.setHours(matchTime[0]);
      this.datetime.setMinutes(matchTime[1]);
      return this.getTime();
    };

    PickaDateTimeClass.prototype.toTimeFormat = function(time) {
      return (0 + time.toString()).slice(-2);
    };

    PickaDateTimeClass.prototype.getTime = function() {
      var hours, minutes;
      hours = this.toTimeFormat(this.datetime.getHours());
      minutes = this.toTimeFormat(this.datetime.getMinutes());
      return hours + minutes;
    };

    PickaDateTimeClass.prototype.dateParse = function(str) {
      var arr;
      arr = str.split(/[^0-9]/);
      return new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5], arr[6], arr[7]);
    };

    PickaDateTimeClass.prototype.create = function(datetime) {
      if ((datetime != null ? datetime.length : void 0) > 10) {
        return this.dateParse(datetime);
      } else {
        return new Date();
      }
    };

    PickaDateTimeClass.prototype.value = function() {
      if (angular.isDate(this.datetime) && !this.disable) {
        return this.datetime.toISOString();
      } else {
        return null;
      }
    };

    return PickaDateTimeClass;

  })();

  Module.factory("PickaDateTimeClass", [
    function() {
      return PickaDateTimeClass;
    }
  ]);

  Module.directive("ngPickadatetime", [
    "PickaDateTimeClass", "isValidDate", function(PickaDateTimeClass, isValidDate) {
      return {
        restrict: "AC",
        template: "<div class='pickadatetime_wrapper'>" + "<input class='date-input' type='text'/>" + "<input class='time-input' type='text' ui-mask='99:99' ng-model='modelTime'/>" + "<input type='hidden' name='{{ name }}' ng-value='day.value()'/>" + "</div>",
        replace: true,
        scope: {
          name: "@",
          date: "=",
          minDate: "=",
          disable: "="
        },
        controller: [
          "$scope", "$attrs", function($scope, $attrs) {
            $scope.day = new PickaDateTimeClass($attrs.value, $scope.name);
            $scope.modelTime = $scope.day.getTime();
            $scope.$watch("disable", function(disable) {
              return $scope.day.disable = disable;
            });
            return $scope.$watch("modelTime", function(newTime) {
              return $scope.day.setTime(newTime);
            });
          }
        ],
        link: function(scope, element) {
          var dateInput, minDate, picker, today;
          dateInput = element.find(".date-input");
          today = new Date();
          minDate = scope.day.datetime < today ? scope.day.datetime : today;
          dateInput.pickadate({
            min: minDate,
            onSet: function(thingSet) {
              if (thingSet.select) {
                scope.day.setDate(thingSet.select);
                if ((scope.date != null) && isValidDate(scope.day.datetime)) {
                  scope.date = scope.day.datetime;
                }
                if (!(scope.$$phase || scope.$root.$$phase)) {
                  return scope.$apply();
                }
              }
            }
          });
          picker = dateInput.pickadate('picker');
          picker.set('select', scope.day.datetime);
          return scope.$watch("minDate", function(minDate, oldMinDate) {
            if (isValidDate(minDate)) {
              if (scope.day.datetime < scope.minDate) {
                scope.day.setDate(scope.minDate);
                return picker.set({
                  min: scope.minDate,
                  select: scope.day.datetime
                });
              }
            }
          }, true);
        }
      };
    }
  ]);

}).call(this);
