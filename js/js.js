
$(function() {
  $('.highlight .nx, .highlight .kd, .highlight .k').attr('data-name', function() {
    return $(this).text()
  })
  $('a.read-more').each(function() {
    $(this).prev('p').append(' ').append(this)
  })
})
