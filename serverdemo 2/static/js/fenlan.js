/**
 * Created by chenzi on 16/9/29.
 */
$(document).ready(function () {
    // $("#information").bind("click", function () {
    //
    //     $("#issues").css("background","rgba(255, 255, 255, 0.2)");
    //     $("#price").css("background","rgba(255, 255, 255, 0.2)");
    //     $("#enterprise").css("background","rgba(255, 255, 255, 0.2)");
    //     $("#information").css("background","#47b475");
    //
    //     $("#info-li").addClass("active");
    //     $("#info-li").show();
    //     $("#issues-li").hide();
    //     $("#price-li").hide();
    //     $("#enterprise-li").hide();
    // });

    $('.tabs li').click(function () {
        $(this).closest('.tabs').find('li').removeClass('active');
        $(this).addClass('active');
        var liIndex = $(this).index() + 1;
        $(this).closest('.tabbed-content').find('.content>li').removeClass('active');
        $(this).closest('.tabbed-content').find('.content>li:nth-of-type(' + liIndex + ')').addClass('active');
    });
});