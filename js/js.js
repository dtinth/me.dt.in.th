
$(function() {
  $('.highlight .nx, .highlight .kd, .highlight .k').attr('data-name', function() {
    return $(this).text()
  })
  $('sup[data-of]').html(function() {
    var num = parseInt($(this).data('of'), 10)
    if (num % 100 >= 10 && num % 100 < 20) return 'th'
    if (num % 10 == 1) return 'st'
    if (num % 10 == 2) return 'nd'
    if (num % 10 == 3) return 'rd'
    if (num % 10 >= -1) return 'th'
  })
  $('a.read-more').each(function() {
    $(this).prev('p').append(' ').append(this)
  })
})
