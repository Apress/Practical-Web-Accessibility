let $widget = $('.disclosure-widget .trigger');
if($widget.length) {
    $widget.on('click', function() {
        let attr = $(this).attr('aria-expanded'),
            panel = $(this).find('.trigger + .panel');
        $(this).attr('aria-expanded', attr == 'true' ? 'false' : 'true');
        if(attr == 'true') {
            panel.removeAttr('hidden');
        } else {
            panel.attr('hidden');
        }
    });
}