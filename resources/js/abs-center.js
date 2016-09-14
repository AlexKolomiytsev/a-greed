/**
 * Created by alexanderkolomiitsev on 9/14/16.
 */
function AbsCenter() {
    this.parent = $('.a-abs-center-parent');
}

AbsCenter.prototype.init = function () {
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

module.exports = new AbsCenter();