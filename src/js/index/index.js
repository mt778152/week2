define([
    'jquery',
    'handlebars'
], function($, Handlebars) {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(data) {
            var text = $('.text').html();
            var compile = Handlebars.compile(text);
            var html = compile(data);
            $('.box').html(html)
        }
    })

});