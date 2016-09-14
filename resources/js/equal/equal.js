/**
 * Created by alexanderbondarenko on 9/14/16.
 */

function Equal() {
}

Equal.prototype.calculate = function () {
    var parents = $('.a-equal-parent'),
        width = $(window).outerWidth(),
        children, height, childH, maxWidth, minWidth;

    if (parents.length) {
        parents.each(function () {
            maxWidth = $(this).attr('data-maxWidth') || width + 1;
            minWidth = $(this).attr('data-minWidth') || 0;
            children = $(this).find('.a-equal-h');
            children.css('height', '');

            if (width < maxWidth && width > minWidth){
                height = $(children[0]).outerHeight();

                children.each(function () {
                    childH = $(this).outerHeight();

                    if (childH > height) {
                        height = childH;
                    }
                });

                children.css('height', height);
            }
        })
    }
};

Equal.prototype.events = function () {
    var self = this;

    $(window).resize(function () {
        self.calculate();
    });

    $(document).ready(function () {
        self.calculate();
    })
};

Equal.prototype.init = function () {
    this.events();
};

module.exports = new Equal();