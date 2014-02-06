Module.factory "isValidDate", [ ->
  (d) ->
    if Object.prototype.toString.call(d) != "[object Date]"
      return false
    ! isNaN d.getTime()
]