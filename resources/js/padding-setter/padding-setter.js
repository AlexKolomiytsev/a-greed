/**
 * Created by alexanderbondarenko on 9/14/16.
 */

function PaddingSetter() {

}

PaddingSetter.prototype.calculate = function () {
    var elems = $('.padding-setter'),
        top, left, bottom, right, elem;

    if (elems.length) {
        elems.each(function () {
            elem = $(this);

            top = $(elem.attr('data-top')).outerHeight();
            bottom = $(elem.attr('data-bottom')).outerHeight();
            left = $(elem.attr('data-left')).outerHeight();
            right = $(elem.attr('data-right')).outerHeight();

            elem.css('padding-top', top);

            elem.css('padding-bottom', bottom);

            elem.css('padding-left', left);

            elem.css('padding-right', right);

        });
    }
};

PaddingSetter.prototype.events = function () {
    var self = this;

    $(window).resize(function () {
        self.calculate();
    });

    $(document).ready(function () {
        self.calculate();
    })
};

PaddingSetter.prototype.init = function () {
    this.events();
};

module.exports = new PaddingSetter();