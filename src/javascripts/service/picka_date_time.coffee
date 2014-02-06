class PickaDateTimeClass
  dateMask: 'd MMM y'
  timeMask: 'HH:mm'
  constructor: (datetime) ->
    @datetime = @create datetime

  setDate: (newDate) ->
    newDateTime = new Date newDate
    @datetime.setDate     newDateTime.getDate()
    @datetime.setMonth    newDateTime.getMonth()
    @datetime.setFullYear newDateTime.getFullYear()
    @getDate()

  getDate: ->
    @datetime

  setTime: (newTime) ->
    matchTime = if newTime?.length >= 4 then newTime.match(/([0-9]{2})/g) else [0,0]
    @datetime.setHours   matchTime[0]
    @datetime.setMinutes matchTime[1]
    @getTime()

  toTimeFormat: (time) ->
    (0 + time.toString()).slice(-2)

  getTime: ->
    hours   = @toTimeFormat @datetime.getHours()
    minutes = @toTimeFormat @datetime.getMinutes()
    hours + minutes

  dateParse: (str) ->
    arr = str.split /[^0-9]/
    new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5], arr[6], arr[7])

  create: (datetime) ->
    if datetime?.length > 10
      @dateParse datetime
    else
      new Date()

  value: ->
    if angular.isDate(@datetime) && !@disable
      @datetime.toISOString() 
    else
      null

Module.factory "PickaDateTimeClass", [ ->
  PickaDateTimeClass
]