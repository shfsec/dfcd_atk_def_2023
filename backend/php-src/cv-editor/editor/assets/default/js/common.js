function getBaseURL() {
    var url = location.href;  // entire url including querystring - also: window.location.href;
    var baseURL = url.substring(0, url.indexOf('/', 14));


    if (baseURL.indexOf('http://localhost') != -1) {
        // Base Url for localhost
        var url = location.href;  // window.location.href;
        var pathname = location.pathname;  // window.location.pathname;
        var index1 = url.indexOf(pathname);
        var index2 = url.indexOf("/", index1 + 1);
        var baseLocalUrl = url.substr(0, index2);

        return baseLocalUrl + "/";
    }
    else {
        // Root Url for domain name
        return baseURL + "/";
    }
}

function bookmark(id){
    var star = $(id).find('.icon-star-line');
    if($(star).hasClass('active')){
        $(id).attr('data-original-title','Lưu việc làm');
        $(star).removeClass('active')
    } else {
        $(id).attr('data-original-title','Hủy lưu');
        $(star).addClass('active')
    }
}

function getPathUrl(){
    var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
    var pathArray = window.location.pathname.split( '/' );
    var subpath = "/";
    if(pathArray.length > 2){
        subpath = pathArray[1];
    }
    return subpath;
}

var d = new Date();
/* If change upload */
var n = d.getTime();
/* If change upload */
var baseUrl = getBaseURL();
var nearBottom = 100;
var page = 1;
var loadding = false;
function loadMoreData(param) {
	if (!param) {
        return false;
    }
    var ih_col_left = $("#cols-left").height();
    $("#cols-left").scroll(function(){
        var h_col_left = $("#cols-left").height();
        var h_scroll = $("#cols-left").scrollTop();
        var h_min =  h_scroll + h_col_left;
        if (ih_col_left - nearBottom <= h_min) {
            if (page < param['max_page'] && loadding == false) {

                var data_post = {page: (page + 1)};
                if (param['data']) {
                    data_post = $.extend({}, data_post, param['data']);
                }
                if (!param['append']) {
                    param['append'] = "data_list";
                }

                $container = $("#" + param['append']);

                if (loadding)
                    return false;
                loadding = true;

                $.ajax({
                    type: 'POST',
                    url: baseUrl + param['url'] + '?' + n,
                    data: data_post,
                    beforeSend: function () {
                        $(".img-loading").addClass('show').removeClass('hide');
                    },
                    success: function (data) {
                        // make jQuery object from HTML string
                        var $moreBlocks = jQuery(data);

                        // Append new blocks
                        setTimeout(function () {
                            $container.append($moreBlocks);
                            $(".img-loading").addClass('hide').removeClass('show');
                            page = page + 1;
                            loadding = false;
                        }, 1500);
                    },
                    error: function () {
                        $(".img-loading").addClass('hide').removeClass('show');
                        loadding = false;
                    }
                });
            }
        }
    });
}

function loadscroll() {
    setTimeout(function(){
        var h_col_left = $("#cols-left").height();
        $("#cols-left").scroll(function(){
            var h_scroll = $("#cols-left").scrollTop();

            offset = $('.tags_keywork').offset();
            if(offset.top <= 800){
                $('.click-more').hide();
            }else{
                $('.click-more').show();
            }
        });
    }, 5000);
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function validateTel(value_tel){
    var filter = /^[0-9+\ \.\,\\\/-]+$/;
    if (filter.test(value_tel)) {
        return true;
    }
    else {
        return false;
    }
}


$(document).ready(function() {

    $("#controls-action").load("/common/control_button_ntv", function() {
         // dong mo item
        $('#menu').mouseenter(function() {
            $('#bt_magic_bt').hide('fast');
        });
        $('#menu').mouseover(function() {
            $('#bt_magic_bt').hide('fast');
        });
        $('#menu').mouseleave(function(){
            $('#bt_magic_bt').show('fast');
        });

        $('.go-top').click(function() {
            $('#cols-right').scrollTo('.content_cols-right');
        });

        $('.go-top').click(function() {
            $('#cols-right').scrollTo('.content_cols-right');
        });
        
        /* right sidebar: start */
        $('#menu_right ul').sliding_menu_js({
            header_title:'',
            header_logo: ""
        });

    });

});

function salaryTop(elen){
    $('#'+elen).trigger('click');
    $('#cols-right').scrollTo('#'+elen, {duration:'500', offsetTop : '75'});
}