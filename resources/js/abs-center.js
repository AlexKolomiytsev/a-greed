/**
 * Created by alexanderkolomiitsev on 9/14/16.
 */
function AbsCenter() {
    this.parent = $('.a-abs-center-parent');
}

AbsCenter.prototype.calculate = function () {
    var self = this;

    self.parent.each(function (index) {
        var height;
        var ownHeight = parseFloat($(this).find('.a-abs-center').css("height"));
        var paddingTop = parseFloat($(this).find('.a-abs-center').css("padding-top"));
        var paddingBottom = parseFloat($(this).find('.a-abs-center').css("padding-bottom"));
        var marginTop = parseFloat($(this).find('.a-abs-center').css("margin-top"));
        var marginBottom = parseFloat($(this).find('.a-abs-center').css("margin-bottom"));

        height = ownHeight + paddingTop + paddingBottom + marginTop + marginBottom;

        console.log(height);

        $(this).height(height + 50);
    });
};

AbsCenter.prototype.events = function () {
    var self = this;

    $(window).resize(function () {
        self.calculate();
    });

    $(document).ready(function () {
        self.calculate();
    })
};

AbsCenter.prototype.init = function () {
    this.events();
};

module.exports = new AbsCenter();