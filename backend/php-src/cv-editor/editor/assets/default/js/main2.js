jQuery.fn.exists = function(){return this.length>0;}

$.fn.scrollTo2 = function( target, options, callback ){
    if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
    var settings = $.extend({
        scrollTarget  : target,
        offsetTop     : 150,
        duration      : 500, 
        easing        : 'swing'
    }, options);
    return this.each(function(){
        var scrollPane = $(this);
        var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
        if(typeof settings.scrollTarget != "number" && $(settings.scrollTarget).length == 0) return false;
        var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
        scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
            if (typeof callback == 'function') { callback.call(this); }
        });
    });
}

function doi_trang_thai_hien_thi_ttv (id_ttv, tinhtrang) {

    $.ajax({
        type: 'get',
        dataType : 'json',
        url: '/tintimviec/doi_trang_thai_hien_thi?id='+id_ttv+'&status='+tinhtrang,
        // data: {id: id_ttv, status: tinhtrang},
        //processData: false,
        //contentType: false,
       // asynx: false,
        success: function(data, textStatus, jqXHR) {

            if (data.error == 0)
            { // thanh cong
                window.location.reload();
            }
            else
            {
                var text_alert = 'Tài khoản của bạn đang không được duyệt. Vui lòng cập nhật lại tài khoản để tiếp tục hiển thị hồ sơ.';
                show_popup_ntv_khong_duyet(text_alert);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Đã có lỗi hệ thống. Vui lòng thử lại.');
        }
    });
}


$(document).ready(function() {
    $('body').removeClass('page_on_load');
    $('.box_loading').delay(1000).fadeOut(500);

    var mac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
    if (mac) {
        var duration_enscroll = 700;
    }else{
        var duration_enscroll = 100;
    }

    setTimeout(function() {
        $('#btn_search_time2').click(function() {
           hide();
        });
     },500);

    //calc height header and footer of popup
    var height_w = $( window ).height();
    // Show box chọn ngành nghề ở menu trái
    $(".show_s02_trang_vieclam_theo_nganh").click(function(e){
        $("#popup_tao_ho_so_tung_buoc_lan_dau, #popup_tao_ho_so_dinh_kem, #popup_xem_truoc_ho_so_dinh_kem, #popup_regis_successfull").html('');
        var page = $(this).attr('data-page');
        var url = '/common/chonnganhnghe';
        if (typeof page != 'undefined') {
            url += '/'+page;
        }
        $("#popup_ntv_register").load(url, function() {
            //load popup confirm
            var h_win_2 = height_w/2;
            $("#overlay_popup, #popup_content_register_choice").show();
            var h_pop_confirm_2 = $("#popup_content_register_choice").height()/2;
            var h_confirm = h_win_2 - h_pop_confirm_2;
            $("#pos_popup_register_choice").css('top',$(window).scrollTop() + h_confirm);
            $("#pos_popup_register_choice").css('left',0);

            $("#overlay_popup, #popup_component_register_choice").show();

            //close confirm
            $(".btn_close").click(function(){
                //hide popup dang ky
                $("#overlay_popup, #popup_component_register_choice").hide();
                $("#popup_chon_nghanh").html('');
            });

            $('.scrollbar_cus_popup').enscroll({
                showOnHover: false,
                easingDuration: duration_enscroll,
                verticalTrackClass: 'track3',
                verticalHandleClass: 'handle3'
            });
            // filter

            // Bấm đổi loại box ngành nghề
            $('div.popup_nganhnghe a.tab_nganhnghe_box').click(function () {
                var id_tab = $(this).attr('rel');
                $('.popup_nganhnghe .tab_nganhnghe_box').removeClass('text_black').removeClass('text_blue').addClass('text_black');
                $(this).removeClass('text_black').addClass('text_blue');
                $(this);
                $('.popup_nganhnghe .box_nganhnghe').removeClass('hide').addClass('hide');
                $('.popup_nganhnghe  #'+id_tab).removeClass('hide');
            });
            // Gõ tìm kiếm trong box ngành nghề => chỉ hiện thỉ ngành nghề chứa str
            $('div.popup_nganhnghe input[id="filter_nganhnghe"]').keyup(function() {
                var str = $('div.popup_nganhnghe input[id="filter_nganhnghe"]').val();
                str = bodauTiengViet(str);
                str = bodauTiengVietUnicodeToHop(str);
                $('div.popup_nganhnghe .nganhnghe_item').addClass('hide');
                $('div.popup_nganhnghe .nganhnghe_item').each(function () {
                    var a_text = $(this).attr('data-khong-dau');
                    a_text = a_text ? a_text : $(this).text();
                    if (a_text.toLowerCase().indexOf(str) >= 0) {
                        // $(this).show();
                        $(this).removeClass('hide');
                    }
                })
            });

        });
    });


    //click show_s03_trang_viec_lam_theo_tinh_thanh
    $(".show_s03_trang_viec_lam_theo_tinh_thanh").click(function(e){
        $("#popup_tao_ho_so_tung_buoc_lan_dau, #popup_tao_ho_so_dinh_kem, #popup_xem_truoc_ho_so_dinh_kem, #popup_regis_successfull").html('');
        var page = $(this).attr('data-page');
        var url = '/common/chontinhthanh';
        if (typeof page != 'undefined') {
            url += '/'+page;
        }
        $("#popup_ntv_register").load(url, function() {
            //load popup confirm
            var h_win_2 = height_w/2;

            var h_pop_confirm_2 = $("#popup_content_register_choice").height()/2;
            var h_confirm = h_win_2 - h_pop_confirm_2;
            $("#pos_popup_register_choice").css('top',$(window).scrollTop() + h_confirm);
            $("#pos_popup_register_choice").css('left',0);

            $("#overlay_popup, #popup_component_register_choice").show();


            //close confirm
            $(".btn_close").click(function(){
                //hide popup dang ky
                $("#overlay_popup, #popup_component_register_choice").hide();
                $("#popup_ntv_register").html('');
            });

            $('.scrollbar_cus_popup').enscroll({
                showOnHover: false,
                easingDuration: duration_enscroll,
                verticalTrackClass: 'track3',
                verticalHandleClass: 'handle3'
            });


            // Bấm đổi loại box ngành nghề
            $('div.popup_tinhthanh .tab_tinhthanh_box').click(function () {
                var id_tab = $(this).attr('rel');
                $('div.popup_tinhthanh .tab_tinhthanh_box').removeClass('text_black').removeClass('text_blue').addClass('text_black');
                $(this).removeClass('text_black').addClass('text_blue');
                $(this);
                $('div.popup_tinhthanh .box_tinhthanh').removeClass('hide').addClass('hide');
                $('div.popup_tinhthanh #'+id_tab).removeClass('hide');
            });

            $('div.popup_tinhthanh input[id="filter_tinhthanh"]').keyup(function() {
                var str = $(this).val();
                str = str.toLowerCase();
                $('div.popup_tinhthanh .tinh_item').addClass('hide');
                $('div.popup_tinhthanh .tinh_item').each(function () {
                    var a_text = $(this).text();
                    if (a_text.toLowerCase().indexOf(str) >= 0) {
                        // $(this).show();
                        $(this).removeClass('hide');
                    }
                })
            });


        });
    });



    // Bấm đổi loại box ngành nghề
    $('.tab_nganhnghe_box').click(function () {
        var id_tab = $(this).attr('rel');
        $('.tab_nganhnghe_box').removeClass('text_black').removeClass('text_blue').addClass('text_black');
        $(this).removeClass('text_black').addClass('text_blue');
        $(this);
        $('.box_nganhnghe').removeClass('hide').addClass('hide');
        $('#'+id_tab).removeClass('hide');
    });


    // Gõ tìm kiếm trong box ngành nghề => chỉ hiện thỉ ngành nghề chứa str
    $('input[id="filter_nganhnghe"]').keyup(function() {
        var str = $('input[id="filter_nganhnghe"]').val();
        str = bodauTiengViet(str);
        str = bodauTiengVietUnicodeToHop(str);
        $('.nganhnghe_item').addClass('hide');
        $('.nganhnghe_item').each(function () {
            var a_text = $(this).attr('data-khong-dau');
            a_text = a_text ? a_text : $(this).text();
            if (a_text.toLowerCase().indexOf(str) >= 0) {
                // $(this).show();
                $(this).removeClass('hide');
            }
        })
    });


    // Bấm đổi loại box ngành nghề
    $('.tab_tinhthanh_box').click(function () {
        var id_tab = $(this).attr('rel');
        $('.tab_tinhthanh_box').removeClass('text_black').removeClass('text_blue').addClass('text_black');
        $(this).removeClass('text_black').addClass('text_blue');
        $(this);
        $('.box_tinhthanh').removeClass('hide').addClass('hide');
        $('#'+id_tab).removeClass('hide');
    });

    $('input[id="filter_tinhthanh"]').keyup(function() {
        var str = $('input[id="filter_tinhthanh"]').val();
        str = str.toLowerCase();
        $('.tinh_item').addClass('hide');
        $('.tinh_item').each(function () {
            var a_text = $(this).text();
            if (a_text.toLowerCase().indexOf(str) >= 0) {
                // $(this).show();
                $(this).removeClass('hide');
            }
        })
    });

    //click register
    $(".member_register").click(function(e){
        $("#popup_tao_ho_so_tung_buoc_lan_dau, #popup_tao_ho_so_dinh_kem, #popup_xem_truoc_ho_so_dinh_kem, #popup_regis_successfull").html('');
        $("#popup_ntv_register").load("/taikhoan/register", function() {

            //load popup confirm
            var h_win_2 = height_w/2;
            var h_pop_confirm_2 = $("#popup_content_register_choice").height()/2;
            var h_confirm = h_win_2 - h_pop_confirm_2;

            $("#overlay_popup, #popup_component_register_choice").show();
            $("#pos_popup_register_choice").css('top',$(window).scrollTop() + h_confirm);
            $("#pos_popup_register_choice").css('left',0);

        });
    });

    // focus tab
    // $("[role='presentation']").click(function(e){
    //     var tab_id = $(this).attr('id');
    //     if (typeof tab_id != 'undefined') {
    //         createCookie('tab_focus', tab_id, 1);
    //     }
    // });
    // var tab_cookie = readCookie('tab_focus');
    // if (tab_cookie != null) {
    //     $('#'+tab_cookie+', #'+tab_cookie+'_content').siblings().removeClass('active');
    //     $('#'+tab_cookie+', #'+tab_cookie+'_content').addClass('active');
    // }
   
    //@nghiephai 06-07-2017 function Alert Ko Cho phép Nhà tuyển dụng tìm kiếm hồ sơ và liên hệ với bạn.
//    var chk_hienthi = $('input.is_search_allowed');
//    chk_hienthi.on('ifChecked', function(event) 
//    {
//        var value = $(this).val();
//        var taikhoan_trang_thai_sua = $(this).attr('data-id');
//        if(taikhoan_trang_thai_sua < 0 && value == 1)
//        {
//            alert('Không thể hiển thị hồ sơ vì tài khoản của bạn không được duyệt');
//            window.location.href = window.location.href;
//            return false;
//        }  
//        if (event.type == 'ifChecked') {
//            // alert(value)
//        }else if(event.type == 'ifUnchecked') {
//           
//        }
//    });

    //Cho phép/Ko cho phép nhà tuyển dụng tìm kiếm hồ sơ và liên hệ với bạn
    var chk_hienthi = $('input.chk_hienthi_ttv');
    chk_hienthi.on('ifChecked ifUnchecked', function(event) {
        var ttvid = $(this).attr('data-idttv');
        if (event.type == 'ifChecked') {
            // chk_hienthi.not(this).iCheck('uncheck');
            // chk_hienthi.data('show_pop', 0);
            // $(this).data('show_pop', 1);
            doi_trang_thai_hien_thi_ttv(ttvid, 1);
        }else if(event.type == 'ifUnchecked') {
            doi_trang_thai_hien_thi_ttv(ttvid, 0);
        }
    });
    $("#viec_nganhnghe .bt_more_ola").click(function(){
        $("#viec_nganhnghe .search_filter_ola").show();
        $("#viec_nganhnghe .more_filter_ola").show();
        $("#viec_nganhnghe .bt_more_ola").hide();
    });
    $("#viec_tinh .bt_more_ola").click(function(){
        $("#viec_tinh .search_filter_ola").show();
        $("#viec_tinh .more_filter_ola").show();
        $("#viec_tinh .bt_more_ola").hide();
    });

    //Thay doi mau cho khi selected
    $('.box_select_filter_reg').each(function (){
        var id = 's2id_'+ $(this).attr('id');
        var val = $(this).val();
        change_text_color_selected(id, val);
    });

});

function must_login(func_name, msg, url_redirect)
{
    var padding_h = $('.regis_header').height();
    var padding_f = $('.regis_footer').height();
    var height_w = $( window ).height();
    var scroll_h = height_w - (padding_f + padding_h + 50);
    if(msg == null || msg == 'undefined') {
        url = "/taikhoan/must_login/"+encodeURI(func_name)+"?";
    }else{
        url = "/taikhoan/must_login/"+encodeURI(func_name)+'?msg='+encodeURI(msg);
    }
    if(!(url_redirect == null || url_redirect == 'undefined')) {
        url += '&next_url=' + encodeURI(url_redirect);
    }
    $("#popup_yeu_cau_dang_nhap").load(url, function() {
        //load popup confirm
        var h_win_2 = height_w/2;
        $("#overlay_popup, #popup_content_register_choice").show();
        var h_pop_confirm_2 = $("#popup_content_register_choice").height()/2;
        var h_confirm = h_win_2 - h_pop_confirm_2;
        $("#pos_popup_register_choice").css('top',$(window).scrollTop() + h_confirm);
        $("#pos_popup_register_choice").css('left',0);

        $("#overlay_popup, #popup_component_register_choice").show();
    });
}

function luutin(id){
    var idtin   = $(id).attr('data-idtin');
    var idnganh = $(id).attr('data-idnganh');
    var type    = $(id).attr('type');
    if(type == null || type == 'undefined') type = 'tintuyendung';
    var url_ajax = '/'+type+'/save?id='+idtin+'&nganh='+idnganh;
    $.ajax({url:url_ajax,cache: false,success:function(result){
        if (result == 'LOGIN') {
            must_login('Lưu việc làm');
            return false;
        };
        if (result == 'DONE') {
            $("[data-idtin='"+idtin+"']").each(function (){
                $(this).toggleClass('active');
                var star = $(this).find('.icon-star-line').toggleClass('active');
            });
        };
    }});
}
function luuhoso(id){
    var idtin   = $(id).attr('data-idtin');
    var idnganh = $(id).attr('data-idnganh');
    var idntv = $(id).attr('data-idntv');
    var type    = $(id).attr('data-type');
    if(type == null || type == 'undefined') type = 'tintimviec';
    var url_ajax = '/'+type+'/save?id='+idtin+'&nganh='+idnganh+'&ntv='+idntv;
    $("[data-idtin='"+idtin+"']").each(function (){
        $(this).toggleClass('active');
        var star = $(this).find('.icon-star-line').toggleClass('active');
    });
    $.ajax({url:url_ajax,cache: false,success:function(result){
        if (result == 'LOGIN') {
            must_login('Lưu việc làm');
            return false;
        };
        if (result != 'DONE') {
            $("[data-idtin='"+idtin+"']").each(function (){
                $(this).toggleClass('active');
                var star = $(this).find('.icon-star-line').toggleClass('active');
            });
        };
    }});
}
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}


function loadAjaxContent (container, url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            $('#'+container).html(data);
        }
    });
}

function print_preview(p_url,p_style){
    openWindow(p_url,'',p_style);
}

function chiase_facebook(p_url){
    openWindow('https://www.facebook.com/sharer/sharer.php?u='+p_url+'&display=popup&ref=plugin&src=share_button','','width=640,height=400,scrollbars=yes');
}

function openWindow( theURL, winName, features) { //v2.0
    window.open(theURL,winName,features);
}



function tocao (id) {
    $("#popup_ntv_register, .popup_ntd_register").load("/tintuyendung/tocao?id="+id, function() {
        $("#overlay_popup, #popup_component").show();
        var height_wd = $( window ).height()/2;
        var height_p  = $( "#popup_content" ).height()/2;
        var top_p     = height_wd -height_p;
        $("#pos_popup").css('top', top_p);
        $("#pos_popup").css('left', 0);

        $("#overlay_popup, #popup_component").show();
    });
}
function reload_captcha (div_id) {
    $("#"+div_id).html('<img src="/common/captcha?time=' + new Date().getTime() + '" alt="Nhap ma bao mat" title="Nhập mã bảo mật"/>');
}

function load_box_sua_ho_so () {
    $("#popup_tao_ho_so_tung_buoc_lan_dau").load("/tintimviec/box_suahoso_tungbuoc_landau", function() {
        //load popup confirm
        var height_w = $( window ).height();
        var h_win_2 = height_w/2;
        var h_pop_confirm_2 = $("#popup_content").height()/2;
        var h_confirm = h_win_2 - h_pop_confirm_2 - 15;

        $('#popup_ntv_register').html('');
        $("#overlay_popup, #popup_component").show();
        //$("#pos_popup").css('top',$(window).scrollTop() + h_confirm);
        $("#pos_popup").css('top', 13);
        $("#pos_popup").css('left',0);
    });
}

function load_box_taohoson_tungbuoc_landau (id_ttd_ungtuyen) {
    $(window).scrollTop(0);

    var padding_h = $('.regis_header').height();
    var padding_f = $('.regis_footer').height();
    var height_w = $( window ).height();
    var scroll_h = height_w - (padding_f + padding_h + 50);
    $("#popup_ntv_register").html('');
    if (typeof id_ttd_ungtuyen === 'undefined' || id_ttd_ungtuyen === null) {
        var url = "/tintimviec/box_taohoso_tungbuoc_landau";
    }else{
        var url = "/tintimviec/box_taohoso_tungbuoc_landau?id_ttd_ungtuyen="+id_ttd_ungtuyen;
    }

    $("#popup_tao_ho_so_tung_buoc_lan_dau").load(url, function() {

        //load popup confirm
        var h_win_2 = height_w/2;
        var h_pop_confirm_2 = $("#popup_content").height()/2;

        console.log(h_win_2);
        console.log(h_pop_confirm_2);
        var h_confirm = h_win_2 - h_pop_confirm_2;
        if(h_confirm <= 30){
            h_confirm = 31;
        }
        $("#overlay_popup, #popup_component").show();
        $("#pos_popup").css('top',$(window).scrollTop() + h_confirm);
        $("#popup_component").css('left',0);
    });
}
function load_box_thay_file_dinh_kem (file_path,id_ttd) {
    $("#popup_tao_ho_so_tung_buoc_lan_dau, #popup_tao_ho_so_dinh_kem, #popup_xem_truoc_ho_so_dinh_kem, #popup_regis_successfull, #popup_ntv_register").html('');
    if (id_ttd == 'undefined') {
        id_ttd = 0;
    }
    $('#frm-hoso-dinhkem').attr('action', "/tintuyendung/nophoso_thayfile?id_ttd="+id_ttd+"&file_path="+file_path);
    $('#frm-hoso-dinhkem').submit();
}
function load_box_taohoso_dinhkem (file_path, id_ttd) {
    $(window).scrollTop(0);

    var padding_h = $('.regis_header').height();
    var padding_f = $('.regis_footer').height();
    var height_w = $( window ).height();
    var scroll_h = height_w - (padding_f + padding_h + 50);
    $("#popup_ntv_register").html('');
    if (typeof file_path === 'undefined' || file_path === null) {
        url = "/tintimviec/box_taohoso_dinhkem";
    }else{
        url = "/tintimviec/box_taohoso_dinhkem?file_path="+file_path+"&id_ttd_ungtuyen="+id_ttd;
    }
    $("#popup_tao_ho_so_tung_buoc_lan_dau").load(url, function() {
        //load popup confirm
        var h_win_2 = height_w/2;
        var h_pop_confirm_2 = $("#popup_content").height()/2;

        console.log(h_win_2);
        console.log(h_pop_confirm_2);
        var h_confirm = h_win_2 - h_pop_confirm_2;
        if(h_confirm <= 30){
            h_confirm = 31;
        }
        $("#overlay_popup, #popup_component").show();
        $("#pos_popup").css('top',$(window).scrollTop() + h_confirm);
        $("#popup_component").css('left',0);
    });
}

function thongbao_readall() {
    if ($('.icon_number_alert').html() == '0') {
        return false;
    }
    var url_ajax = '/thongbao/read_all';
    $.ajax({
        type: 'GET',
        processData: false,
        contentType: false,
        dataType : 'json',
        url: url_ajax,
        success: function (data) {
            $('.icon_number_alert').addClass('display_none').html('0');
            if (data.error == 0) { // thanh cong
                $('.icon_number_alert').html('0');
            } else {

            }
        }
    });
}

$(document).ready(function() {
    $(window).scrollTop(0);
    var height_w = $( window ).height();
    //click Tạo hồ sơ
    $(".show_s11_2_tao_ho_so").click(function(e){
        $("#popup_tao_ho_so_tung_buoc_lan_dau, #popup_xem_truoc_ho_so_dinh_kem, #popup_regis_successfull").html('');
        $("#popup_ntv_register").load("/common/box_taohoso", function() {
            //load popup confirm
            var h_win_2 = height_w/2;
            var h_pop_confirm_2 = $("#popup_content_successfull").height()/2;
            var h_confirm = h_win_2 - h_pop_confirm_2;

            $("#overlay_popup, #popup_component_successfull").show();
            $("#pos_popup_successfull").css('top',$(window).scrollTop() + h_confirm);
            $("#pos_popup_successfull").css('left',0);

            $("#overlay_popup, #popup_component_successfull").show();
        });
    });
    $(".show_s11_2_chua_co_hoso").click(function(e){
        $("#popup_tao_ho_so_tung_buoc_lan_dau, #popup_xem_truoc_ho_so_dinh_kem, #popup_regis_successfull").html('');
        $("#popup_ntv_register").load("/common/box_taohoso?chuacohoso=1", function() {
            //load popup confirm
            var h_win_2 = height_w/2;
            var h_pop_confirm_2 = $("#popup_content_successfull").height()/2;
            var h_confirm = h_win_2 - h_pop_confirm_2;

            $("#overlay_popup, #popup_component_successfull").show();
            $("#pos_popup_successfull").css('top',$(window).scrollTop() + h_confirm);
            $("#pos_popup_successfull").css('left',0);

            $("#overlay_popup, #popup_component_successfull").show();
        });
    });

    $('.icn-main-alert').click(function(event) {
    });
    $('.delete_thongbao').click(function(event) {
        var id = $(this).data('id');
        var url_ajax = '/thongbao/xoa_thong_bao?id='+id;
        $.ajax({
            type: 'GET',
            processData: false,
            contentType: false,
            dataType : 'json',
            url: url_ajax,
            success: function (data) {
                if (data.error == 0) { // thanh cong
                    $('#thongbao_'+id).fadeOut('slow', function() {
                        $(this).remove();
                        if ($('.row_notification').length == 0) {
                            $('#box_thong_bao').remove();
                        }
                    });
                } else {

                }
            }
        });
    });
    $('#xoa_all_thong_bao').click(function(event) {
        if (!confirm('Bạn có chắc chắn muốn xóa toàn bộ thông báo không?')) {
            return false;
        }
        var url_ajax = '/thongbao/xoa_thong_bao_all';
        $.ajax({
            type: 'GET',
            processData: false,
            contentType: false,
            dataType : 'json',
            url: url_ajax,
            success: function (data) {
                if (data.error == 0) { // thanh cong
                    $('#box_thong_bao').remove();
                    // $('.box_notification_scroll').fadeOut('slow', function() {
                    //     $(this).html('');
                    //     $(this).show();
                    // });;
                } else {

                }
            }
        });
    });

    $('.search_combobox').each(function(index, el) {
        var e_id = $(this).attr('id');
        if ($(this).val() == '' || ($(this).val() == '0' && $(this).attr('name') != 'gioi_tinh_ntd')){
            $('#s2id_' + $(this).attr('id')).find('.select2-choice').css({'font-weight':''});
        } else {
            $('#s2id_' + $(this).attr('id')).find('.select2-choice').css({'color':'#363636', 'font-weight':'700'});
        }
        // dim_color_other_element($(this));
    });
    $('.search_combobox').each(function(index, el) {
        var e_id = $(this).attr('id');
        $('#'+e_id).on("change", function () {
            if ($(this).val() == '' || ($(this).val() == '0' && $(this).attr('name') != 'gioi_tinh_ntd')){
                $('#s2id_' + $(this).attr('id')).find('.select2-choice').css({'font-weight':''});
            } else {
                $('#s2id_' + $(this).attr('id')).find('.select2-choice > span.select2-chosen').css({'color':'#363636', 'font-weight':'700'});
                $('#s2id_' + $(this).attr('id')).find('.select2-choice').css({'color':'#363636', 'font-weight':'700'});
            }
            // dim_color_other_element($(this));
        });
    });
});

 $(".show_s11_2_co_nhieu_hoso").click(function(e){
    $("#popup_tao_ho_so_tung_buoc_lan_dau, #popup_xem_truoc_ho_so_dinh_kem, #popup_regis_successfull").html('');
    $("#popup_ntv_register").load("/tintimviec/chon1hoso", function() {
         //load popup confirm
        $("#overlay_popup, #popup_component").show();
        var height_wd = $( window ).height()/2;
        var height_p  = $( "#popup_content" ).height()/2;
       $("#overlay_popup, #popup_component").show();
        $("#pos_popup").css('top',$(window).scrollTop() + 13);
        $("#pos_popup").css('left',0);
        $(".regis_content").css('width', 599);
    });
});

function kiem_tra_do_manh_mat_khau(obj){
    var mat_khau = obj.value;
    var do_dai_mat_khau = mat_khau.length;
    var thong_bao = '';
    /*if (do_dai_mat_khau == 0) {
        thong_bao = '<span class="color-mk-y">Mật khẩu yếu</span>';
    }*/
    if (do_dai_mat_khau > 0 && do_dai_mat_khau < 6) {
        thong_bao = '<span class="color-mk-y">Mật khẩu yếu</span>';
    }
    if (do_dai_mat_khau >= 6 && do_dai_mat_khau < 10) {
        thong_bao = '<span class="color-mk-tb">Mật khẩu trung bình</span>';
    }
    if (do_dai_mat_khau >= 10) {
        thong_bao = '<span class="color-mk-m">Mật khẩu mạnh</span>';
    }
    if (mat_khau == '123456') {
        thong_bao = '<span class="color-mk-y">Mật khẩu quá đơn giản</span>';
    }
    $("#warning_pass").html(thong_bao);
}


function show_bangcap_edit (id) {
    if (!$("#bangcap-edit-form-"+id).exists()) {

        //An nut them
        $('#add_bangcap_chungchi').attr('style', 'display:none');
        $('#div-frm-bangcap').addClass('display_none');

        $('#bangcap-view-'+id).append('<div id="div-bangcap-edit-'+id+'" ></div>');
        $("#div-bangcap-edit-"+id).hide().load("/tintimviec/bangcap?edit_form="+id, function() {
            $(this).fadeIn();
        });
    };
}
function delete_bangcap (id) {
    if (confirm('Bạn có chắc muốn xóa mục này không?')) {
        $.ajax({
            type: 'get',
            dataType : 'json',
            url: '/tintimviec/bangcap?delete='+id,
            mimeType:"multipart/form-data",
            processData: false,
            contentType: false,
            success: function(data, textStatus, jqXHR) {
                if (data.error == 0) { // thanh cong

                    $("#bangcap-view-"+id).fadeOut().remove();
                    $("#quantri-bangcap-view-"+id).fadeOut().remove();

                    //Hien nut them bang cap

                    $('#add_bangcap_chungchi').removeAttr("style");
                    //Hien lai form them neu ko con danh sach bang cap nao
                    if($('.new-bangcap').length < 1)
                    {
                        $('#add_bangcap_chungchi').click();
                    }
                }
                else {
                    alert('Xóa không thành công!');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Đã có lỗi hệ thống. Vui lòng thử lại. (#' + jqXHR.status + ': ' + textStatus + ')');
            }
        });
    };
}


function show_ngoaingu_edit (id) {
    if (!$("#ngoaingu-edit-form-"+id).exists()) {

        //Hien nut them ngoai ngu
        $('#show-add-ngoai-ngu').attr("style","display:none;");
        $('#div-frm-ngoaingu').attr("style","display:none;");
        $('#div-frm-ngoaingu').fadeOut();

        $('#ngoaingu-view-'+id).append('<div id="div-ngoaingu-edit-'+id+'" ></div>');
        $("#div-ngoaingu-edit-"+id).hide().load("/tintimviec/ngoaingu?edit_form="+id, function() {
            $(this).fadeIn();
        });
    };
}
function delete_ngoaingu (id) {
    if (confirm('Bạn có chắc muốn xóa mục này không?')) {
        $.ajax({
            type: 'get',
            dataType : 'json',
            url: '/tintimviec/ngoaingu?delete='+id,
            mimeType:"multipart/form-data",
            processData: false,
            contentType: false,
            success: function(data, textStatus, jqXHR) {
                if (data.error == 0) { // thanh cong

                    $("#ngoaingu-view-"+id).fadeOut().remove();
                    $("#quantri-ngoaingu-view-"+id).fadeOut().remove();

                    //Hien nut them ngoai ngu
                    $('#show-add-ngoai-ngu').removeAttr("style");
                    if($('.new-ngoaingu').length < 1)
                    {
                        $('#show-add-ngoai-ngu').click();
                    }

                } else {
                    alert('Xóa không thành công!');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Đã có lỗi hệ thống. Vui lòng thử lại. (#' + jqXHR.status + ': ' + textStatus + ')');
            }
        });
    };
}
function show_tinhoc_edit (id) {
    if (!$("#tinhoc-edit-form-"+id).exists()) {
        //class="listnews new-tinhoc"
        $('#tinhoc-view-'+id).append('<div id="div-tinhoc-edit-'+id+'" ></div>');
        $("#div-tinhoc-edit-"+id).hide().load("/tintimviec/tinhoc?edit_form="+id, function() {
            $(this).fadeIn();
        });
    };
}
function delete_tinhoc (id) {
    if (confirm('Bạn có chắc muốn xóa mục này không?')) {
        $.ajax({
            type: 'get',
            dataType : 'json',
            url: '/tintimviec/tinhoc?delete='+id,
            mimeType:"multipart/form-data",
            processData: false,
            contentType: false,
            success: function(data, textStatus, jqXHR) {
                if (data.error == 0) { // thanh cong
                    $("#tinhoc-view-"+id).fadeOut().remove();
                    $("#quantri-tinhoc-view-"+id).fadeOut().remove();
                    $('#div-frm-tinhoc').removeClass("display_none").fadeIn();
                    $('#c_phan_mem_khac').val('');

                    show_button_add_tinhoc();

                    $("#btnTHCancel").click();
                } else {
                    alert('Xóa không thành công!');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Đã có lỗi hệ thống. Vui lòng thử lại. (#' + jqXHR.status + ': ' + textStatus + ')');
            }
        });
    };
}


function show_kinhnghiem_edit (id)
{
    //Start Ẩn thông tin thêm
    $('#addbkinhngiem2_new').attr('style', 'display:none');
    $('#div-frm-kinhnghiem').addClass("display_none").fadeOut();
    $('#div-frm-kinhnghiem .error_reg_mess').html('').addClass('display_none');
    var chk = $('input#chk_c_cong_viec_hien_tai');
    chk.val(1);
    chk.iCheck('uncheck');
    //End Ẩn thông tin thêm

    if (!$("#kinhnghiem-edit-form-"+id).exists()) {
        //class="listnews new-kinhnghiem"
        $('#kinhnghiem-view-'+id).append('<div id="div-kinhnghiem-edit-'+id+'" ></div>');
        $("#div-kinhnghiem-edit-"+id).hide().load("/tintimviec/kinhnghiem?edit_form="+id, function() {
            $(this).fadeIn(function () {
                init_kinhnghiem_mucluong();
                init_tooltip("#kinhnghiem-edit-form-"+id);
                // $('input.format_number').number( true, 0, '.', ',' );
            });
        });
    };
}

function delete_kinhnghiem (id) {
    if (confirm('Bạn có chắc muốn xóa mục này không?')) {
        $.ajax({
            type: 'get',
            dataType : 'json',
            url: '/tintimviec/kinhnghiem?delete='+id,
            mimeType:"multipart/form-data",
            processData: false,
            contentType: false,
            success: function(data, textStatus, jqXHR) {
                if (data.error == 0) { // thanh cong

                    $("#kinhnghiem-view-"+id).fadeOut().remove();
                    $("#quantri-kinhnghiem-view-"+id).fadeOut().remove();

                    //Hien nut them kinh nghiem
                    $('#addbkinhngiem2_new').removeAttr("style");
                    if($('.new-kinhnghiem').length < 1)
                    {
                        $('#addbkinhngiem2_new').click();
                    }

                } else {
                    alert('Xóa không thành công!');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Đã có lỗi hệ thống. Vui lòng thử lại. (#' + jqXHR.status + ': ' + textStatus + ')');
            }
        });
    };
}


function show_kynang_edit (id) {
    //An them ky nang
    $('#addbkynang2_new').attr('style', 'display:none');

    if (!$("#kynang-edit-form-"+id).exists()) {
        //class="listnews new-kynang"
        $('#kynang-view-'+id).append('<div id="div-kynang-edit-'+id+'" ></div>');
        $("#div-kynang-edit-"+id).hide().load("/tintimviec/kynang?edit_form="+id, function() {
            $(this).fadeIn();
        });
    };
}
function delete_kynang (id) {
    if (confirm('Bạn có chắc muốn xóa mục này không?')) {
        $.ajax({
            type: 'get',
            dataType : 'json',
            url: '/tintimviec/kynang?delete='+id,
            mimeType:"multipart/form-data",
            processData: false,
            contentType: false,
            success: function(data, textStatus, jqXHR) {
                if (data.error == 0) { // thanh cong
                    $("#kynang-view-"+id).fadeOut().remove();
                    $("#quantri-kynang-view-"+id).fadeOut().remove();
                    if($('#frmkynang').length > 0){
                        document.getElementById("frmkynang").reset();
                    }
                    $('#div-frm-kynang').css("display", "inline-block").removeClass("display_none").fadeIn();
                    $('#div-frm-kynang div.icheckbox_square-blue').removeClass('checked');
                    $('#div-frm-kynang div.icheckbox_square-blue').removeClass('checked');
                    $('.chk_ky_nang_khac ').each(function(index, el) {
                        var v = $(this).attr('relval');
                        $(this).val(v);
                    });
                    if($('#add-skill-list').length > 0){
                        $('.btn-add-action').css('display','block');
                    }
                } else {
                    alert('Xóa không thành công!');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Đã có lỗi hệ thống. Vui lòng thử lại. (#' + jqXHR.status + ': ' + textStatus + ')');
            }
        });
    };
}

function show_thamkhao_edit (id) {
    //An nguoi tham khao
    $('#addthamkhao2_new').attr('style', 'display:none');
    $('#div-frm-thamkhao').addClass("display_none");

    if (!$("#thamkhao-edit-form-"+id).exists()) {
        //class="listnews new-thamkhao"
        $('#thamkhao-view-'+id).append('<div id="div-thamkhao-edit-'+id+'" ></div>');
        $("#div-thamkhao-edit-"+id).hide().load("/tintimviec/thamkhao?edit_form="+id, function() {
            $(this).fadeIn();
        });
    };
}
function delete_thamkhao (id) {
    //Hien nut them tham khao
    $('#addthamkhao2_new').removeAttr("style");

    if (confirm('Bạn có chắc muốn xóa mục này không?')) {
        $.ajax({
            type: 'get',
            dataType : 'json',
            url: '/tintimviec/thamkhao?delete='+id,
            mimeType:"multipart/form-data",
            processData: false,
            contentType: false,
            success: function(data, textStatus, jqXHR) {
                if (data.error == 0) { // thanh cong
                    $("#thamkhao-view-"+id).fadeOut().remove();
                    $("#quantri-thamkhao-view-"+id).fadeOut().remove();

                    if($('.new-thamkhao').length < 1)
                    {
                        $('#addthamkhao2_new').click();
                    }

                } else {
                    alert('Xóa không thành công!');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Đã có lỗi hệ thống. Vui lòng thử lại. (#' + jqXHR.status + ': ' + textStatus + ')');
            }
        });
    };
}

//Xoa the html neu co khi submit
function remove_tag_html()
{
    var regex = /(<([^>]+)>)/ig;
    $('#c_tieu_de').val( $('#c_tieu_de').val().replace(regex, "") );
    $('#c_muc_tieu_nghe_nghiep').val( $('#c_muc_tieu_nghe_nghiep').val().replace(regex, "") );

    $('#company_name').val( $('#company_name').val().replace(regex, "") );
    $('#address').val( $('#address').val().replace(regex, "") );
    $('#kinhnghiem_mucluong').val( $('#kinhnghiem_mucluong').val().replace(regex, "") );
    $('#mo_ta_cong_viec').val( $('#mo_ta_cong_viec').val().replace(regex, "") );
    $('#thanh_tich').val( $('#thanh_tich').val().replace(regex, "") );

    $('#c_bang_cap').val( $('#c_bang_cap').val().replace(regex, "") );
    $('#c_truong').val( $('#c_truong').val().replace(regex, "") );
    $('#c_chuyen_nganh').val( $('#c_chuyen_nganh').val().replace(regex, "") );

    $('#c_ngoai_ngu_khac').val( $('#c_ngoai_ngu_khac').val().replace(regex, "") );

    $('#c_phan_mem_khac').val( $('#c_phan_mem_khac').val().replace(regex, "") );

    $('#c_ky_nang_chinh').val( $('#c_ky_nang_chinh').val().replace(regex, "") );
    $('#c_so_thich').val( $('#c_so_thich').val().replace(regex, "") );

    $('#fullname_tk').val( $('#fullname_tk').val().replace(regex, "") );
    $('#company_name_ntk').val( $('#company_name_ntk').val().replace(regex, "") );
    $('#tel_ntk').val( $('#tel_ntk').val().replace(regex, "") );
    $('#chucvu_ntk').val( $('#chucvu_ntk').val().replace(regex, "") );
}


function show_ngoaingu_edit (id)
{
    //An them ngoai ngu
    $('#show-add-ngoai-ngu').attr('style', 'display:none');
    $('#div-frm-ngoaingu').attr('style', 'display:none');

    if (!$("#ngoaingu-edit-form-"+id).exists()) {
        //class="listnews new-ngoaingu"
        $('#ngoaingu-view-'+id).append('<div id="div-ngoaingu-edit-'+id+'" ></div>');
        $("#div-ngoaingu-edit-"+id).hide().load("/tintimviec/ngoaingu?edit_form="+id, function() {
            $(this).fadeIn();
        });
    };
}

//Thay doi chon loai ngoai ngu
function change_chon_ngoai_ngu(data)
{
    if (data.value == 'OTHER') {
        $('#div_ngonngukhac').fadeIn();
        $('#div_ngonngukhac').removeAttr("style");
    }else{
        $('#div_ngonngukhac').fadeOut();
    }
}

$(document).ready(function() {
    // load_box_taohoson_tungbuoc_landau();


    registerSocialComplete = function() {
        $("#popup_tao_ho_so_tung_buoc_lan_dau, #popup_tao_ho_so_dinh_kem, #popup_xem_truoc_ho_so_dinh_kem, #popup_regis_successfull").html('');
        $("#popup_ntv_register").load("/taikhoan/register_social_complete", function() {
            $("#overlay_popup, #popup_component").show();
            $("#pos_popup").css('top',$(window).scrollTop() + 13);
            $("#pos_popup").css('left',0);
            $(".regis_content").css('height', scroll_h);

            $("#overlay_popup, #popup_component").show();
        });
    } ;
});




function checkValidHoSo () {
    var isCheck = true;
    var focus = false;
    var id_form = 'div-frm-hoso';

    $('.inputTextTop, .inputTxtAreaTop').each(function (){
        if($(this).val().trim() == '') {
            isCheck = false;
            $(this).parent().next('div.invalid-msg').removeClass('display_none');
            $(this).parent().next('div.invalid-msg').html("<span class='error_reg_mess_icon'></span>Vui lòng nhập vào các trường yêu cầu!");
            if(!focus) {
                $('#cols-right').scrollTo2("."+id_form+" #"+ $(this).attr('id'));
                focus = true;
            }
        }else{
            $(this).parent().next('div.invalid-msg').addClass('display_none');
            $(this).parent().next('div.invalid-msg').html('');
        }
    });

    $('.reqCheckBoxTopKn').each(function (){
        if ($(this).find('option:selected').val() == 0) {
            isCheck = 0;
            $(this).parent().parent().next('div.invalid-msg').removeClass('display_none');
            $(this).parent().parent().next('div.invalid-msg').html("<span class='error_reg_mess_icon'></span>Vui lòng nhập vào các trường yêu cầu!");
            if(!focus) {
                $('#cols-right').scrollTo2("."+id_form+" #"+ $(this).attr('id'));
                focus = true;
            }
        }else{
            $(this).parent().parent().next('div.invalid-msg').addClass('display_none');
            $(this).parent().parent().next('div.invalid-msg').html('');
        }
    });

    if (!isCheck){
        return false;
    }else{
        return true;
    }
}



function show_button_add_tinhoc () {
    if ($('.tinhoc-view-div').length > 0 ) {
        $('#div-add-tinhoc').addClass('display_none');
    }else{
        $('#div-add-tinhoc').removeClass('display_none');
    }
}


function lam_moi_ttv (id, trang_thai)
{
    var text_alert = 'Tài khoản của bạn đang không được duyệt. Vui lòng cập nhật lại thông tin tài khoản để tiếp tục làm mới hồ sơ.';
    if(trang_thai == -1)
    {
        show_popup_ntv_khong_duyet(text_alert);
        return false;
    }
    else
    {
        var datapost = new FormData();
        datapost.append( 'id', id );
        $.ajax({
            type: 'post',
            dataType : 'json',
            url: '/tintimviec/lammoi',
            data: datapost,
            mimeType:"multipart/form-data",
            processData: false,
            contentType: false,
            success: function(data, textStatus, jqXHR) {
                if (data.error == 0) { // thanh cong
                    alert('Làm mới hồ sơ thành công');
                } else {
                    alert(data.message);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Đã có lỗi hệ thống. Vui lòng thử lại.');
            }
        });
    }
}

function reload_action () {

    // dong mo item
    $('.thu_gon_box').unbind("click");
    $('.thu_gon_box').bind("click",function() {
        $(this).parent().parent().parent().find('.box-large').slideToggle( "fast" );
        $(this).parent().parent().parent().find('.box-mini').slideToggle( "fast" );
        $('.box_trinhdo').removeClass('hasBoxOpened');
        box_open = 0;
    });
    $('.box-mini .info').unbind("click");
    $('.box-mini .info').bind("click",function() {
        $('.box_trinhdo').removeClass('hasBoxOpened');
        $('.box-large').slideUp( "fast" );
        $('.box-mini').slideDown( "fast" );
        $(this).parent().parent().parent().find('.box-mini').slideUp( "fast" );
        $(this).parent().parent().parent().find('.box-large').slideDown( "fast" );
        $(this).parent().parent().parent().parent().parent().addClass('hasBoxOpened');
        setTimeout(function(){
          box_open = 1;
        }, 100);
    });
}

function open_popup_tintuyendung(id,id_goc) {
    var height_w = $( window ).height();
    if ( $("#popup_tao_ho_so_sua_tin_tuyen_dung" ).length ) {
        $div_insert_html = $("#popup_tao_ho_so_sua_tin_tuyen_dung");
    } else if ( $(".popup_tao_ho_so_sua_tin_tuyen_dung" ).length ) {
        $div_insert_html = $(".popup_tao_ho_so_sua_tin_tuyen_dung");
    } else if ( $("#popup_ntv_register" ).length ) {
        $div_insert_html = $("#popup_ntv_register");
    }
    if (id_goc == undefined)
        id_goc = 0;
    $div_insert_html.load("/tintuyendung/edit?id="+id+"&id_goc="+id_goc, function() {
        //load popup confirm
        var h_win_2 = height_w/2;
        var h_pop_confirm_2 = $("#popup_content").height()/2;
        var h_confirm = h_win_2 - h_pop_confirm_2;

        $("#overlay_popup, #popup_component").show();
        $("#pos_popup").css('top',$(window).scrollTop() + h_confirm);
        $("#popup_component").css('left', 0);
    });
}


function open_popup_guiphanhoi(list_id, id_ttv) {
    if (list_id && list_id != "") {
        if (typeof id_ttv == 'undefined') {
            var id_ttv = '';
        }
        $("#popup_ntv_register").load("/nhatuyendung/guiphanhoi?list_id_display="+list_id+"&id_ttv="+id_ttv, function() {
            $("#overlay_popup, #popup_component").show();
            var height_wd = $( window ).height()/2;
            var height_p  = $( "#popup_content" ).height()/2;
            var top_p     = height_wd -height_p;
            $("#pos_popup").css('top', top_p);
            $("#pos_popup").css('left', 0);

            $("#overlay_popup, #popup_component").show();
        });
    } else {
        alert("Bạn phải chọn tin ứng tuyển");
        return false;
    }
}
function open_popup_thongbao_taikhoan_free(msg) {
    var padding_h = $('.regis_header').height();
    var padding_f = $('.regis_footer').height();
    var height_w = $( window ).height();
    var scroll_h = height_w - (padding_f + padding_h + 50);
    $("#popup_ntv_register").load("/common/thongbao_taikhoan_free?msg="+msg, function() {
        //load popup confirm
        var h_win_2 = height_w/2;
        var h_pop_confirm_2 = $("#popup_content").height()/2;
        var h_confirm = h_win_2 - h_pop_confirm_2;

        $("#pos_popup").css('top',$(window).scrollTop() + h_confirm/2);
        $("#pos_popup").css('left',0);

        $("#overlay_popup, #popup_component").show();

        //close confirm
        $(".btn_close").click(function(){
            //hide popup dang ky
            $("#overlay_popup, #popup_component").hide();
            $("#popup_ntv_register").html('');
        });
    });
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

function popup_hotline()
{
    $("#popup_ntv_register, .popup_ntd_register").load("/common/hotline", function() {
        $("#overlay_popup, #popup_component").show();
        var height_wd = $( window ).height()/2;
        var height_p  = $( "#popup_content" ).height()/2;
        var top_p     = height_wd -height_p;
        $("#overlay_popup, #popup_component").show();
        $("#pos_popup").css('top', top_p);
        $("#pos_popup").css('left', 0);
    });
}

$(document).ready(function() {
    $(".btn_ntd_dang_ky_tu_van, .show_s09b_ntd_register").click(function(e){
        $("#popup_ntv_register").load("/common/ntd_dang_ky_tu_van", function() {
            $("#overlay_popup, #popup_component").show();
            var height_wd = $( window ).height()/2;
            var height_p  = $( "#popup_content" ).height()/2;
            var top_p     = height_wd -height_p;
            $("#pos_popup").css('top', top_p);
            $("#pos_popup").css('left', 0);

            $("#overlay_popup, #popup_component").show();
        });
    });

    $(".btn_ntv_dang_ky_tu_van, .show_s09_ntv_register").click(function(e){
        $("#popup_ntv_register").load("/common/ntv_dang_ky_tu_van", function() {
            $("#overlay_popup, #popup_component").show();
            var height_wd = $( window ).height()/2;
            var height_p  = $( "#popup_content" ).height()/2;
            var top_p     = height_wd -height_p;
            $("#pos_popup").css('top', top_p);
            $("#pos_popup").css('left', 0);

            $("#overlay_popup, #popup_component").show();
        });
    });
});

function bodauTiengViet(str) {
    str= str.toLowerCase();
    str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str= str.replace(/đ/g,"d");
    return str;
}

function bodauTiengVietUnicodeToHop(str) {
    str= str.toLowerCase();
    str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str= str.replace(/đ/g,"d");
    return str;
}

function t(t) {
    if (!t.id) return t.text;
    var e = t.text.split("|-|");
    if ("undefined" != typeof e[1]) {
        var o = '<span class="pull-left">' + e["0"] + "</span>",
            i = '<span class="pull-right"><i class="text-primary">' + e[1] + "</i></span>";
        e = o + i
    } else e = t.text;
    return e
}

function reload_selectbox() {

$("select.select-style").size() > 0 && $("select.select-style").each(function() {
    var e = $(this).attr("data-maximum"),
        o = $(this).attr("data-disS");
        c = $(this).attr("data-select-class");
    void 0 != e ? $(this).select2({
        maximumSelectionSize: e,
        allowClear: !0,
        dropdownCssClass: $(this).attr("name"),
        formatResult: t,
        formatSelection: t,
        escapeMarkup: function (t) {
            return t
        }
    }) : void 0 != o ? $(this).select2({
        maximumSelectionSize: e,
        allowClear: !0,
        dropdownCssClass: $(this).attr("name"),
        formatResult: t,
        formatSelection: t,
        minimumResultsForSearch: -1
    }) : void 0 != c ? $(this).select2({
        allowClear: !0,
        dropdownCssClass: c,
        formatResult: t,
        formatSelection: t,
        escapeMarkup: function (t) {
            return t
        }
    }) : $(this).select2({
        allowClear: !0,
        dropdownCssClass: $(this).attr("name"),
        formatResult: t,
        formatSelection: t,
        escapeMarkup: function (t) {
            return t
        }
    });
});
}
function show_popup_thanh_cong(msg,id_ttv) {
    $("#popup_tao_ho_so_thanh_cong, .popup_tao_ho_so_thanh_cong").load("/tintimviec/danghosothanhcong?msg="+msg+"&id_ttv="+id_ttv, function () {

        //load popup confirm
        var height_w = $( window ).height();
        var h_win_2 = height_w / 2;
        var h_pop_confirm_2 = $("#popup_content_successfull").height() / 2;

        var h_confirm = h_win_2 - h_pop_confirm_2;

        $("#overlay_popup, #popup_component_successfull").show();
        $("#popup_content_successfull").css('top', ($(window).scrollTop() + h_confirm) - 5);
        $("#popup_content_successfull").css('left', 0);

        //close confirm
        $(".btn_close").click(function () {
            //hide popup dang ky
            $("#overlay_popup, #popup_component_successfull").hide();
        });
    });
}
function xem_ho_so_mau() {
    $("#popup_ntv_register, .popup_ntd_register").load("/tintimviec/hosomau", function() {
        $("#overlay_popup, #popup_component").show();
        var height_wd = $( window ).height()/2;
        var height_p  = $( "#popup_content" ).height()/2;
        var top_p     = height_wd -height_p;
        $("#pos_popup").css('top', 13);
        $("#popup_content").css('top', '20px');
        $("#pos_popup").css('left', 0);
        $("#overlay_popup, #popup_component").show();
    });
}



function fn_setTimeout_daluu() {
    setTimeout(function() {
    var trang_thai = $('input.trang_thai_tuyen_dung');


     $(".btn_excel_daluu").click(function(e){
        window.location = '/nhatuyendung/taoFileExcel?da_luu=1';
    });

    trang_thai.on('ifChecked ifUnchecked', function(event) {
        if (event.type == 'ifChecked') {
            var status = $(this).val();
            var ttd_uv = $(this).attr("data-ttduv");
            $.ajax({
                type: 'post',
                dataType : 'json',
                url: '/nhatuyendung/changeStatusResume?status='+status+'&ttd_uv='+ttd_uv,
                data: {status: status,ttd_uv:ttd_uv},
                mimeType:"multipart/form-data",
                processData: false,
                contentType: false,
                success: function(data, textStatus, jqXHR) {
                    if (data.error == 'DA_CAP_NHAT_UNG_VIEN') { // thanh cong
                        //alert('Đã cập nhật trạng thái thành công!');
                        //location.reload();
                    } else {
                        alert(data.message);
                        //location.reload();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert('Đã có lỗi hệ thống. Vui lòng thử lại. (#' + jqXHR.status + ': ' + textStatus + ')');
                }
            });
        }
    })
    },500);
}


function kiem_tra_form_co_thongtin (id_form) {
    var has_value = false;
    if($('#'+id_form).length == 0) return false;
    $('#'+id_form+' input').each(function () {
        type = $(this).attr('type');
        if (type == 'radio' || type == 'checkbox') {
            if ($(this).prop("checked")) {
                has_value = true;
            }
        }else if(type != 'hidden'){
            if ($(this).val() != '') {
                has_value = true;
            };
        }
    });
    $('#'+id_form+' textarea').each(function () {
        if ($(this).val() != '') {
            has_value = true;
        };
    });
    $('#'+id_form+' select').each(function () {
        if ($(this).val() != '' && $(this).val() != '0') {
            has_value = true;
        };
    });
    return has_value;
}
function bao_loi_element (id_element) {
    if($('#'+id_element).length == 0) return false;
    $('#'+id_element).closest('div.form-group').find('.error_reg_mess').html('<span class="error_reg_mess_icon"></span> Vui lòng điền đầy đủ thông tin').removeClass('display_none');
}
function xoa_loi_element (id_element) {
    if($('#'+id_element).length == 0) return false;
    $('#'+id_element).closest('div.form-group').find('.error_reg_mess').html('').addClass('display_none');
}
function xoa_loi_trong_form (id_form) {
    if($('#'+id_form).length == 0) return false;
    $('#'+id_form+' .main_message').html('').addClass('display_none');
    $('#'+id_form+ ' .error_reg_mess').html('').addClass('display_none');
}
function bao_loi_trong_form (id_form) {
    if($('#'+id_form).length == 0) return false;
    $('#'+id_form+' input.required').each(function () {
        if ($(this).val() == '') {
            bao_loi_element($(this).attr('id'));
        }else{
            xoa_loi_element($(this).attr('id'));
        }
    });
    $('#'+id_form+' textarea.required').each(function () {
        if ($(this).val() == '') {
            bao_loi_element($(this).attr('id'));
        }else{
            xoa_loi_element($(this).attr('id'));
        }
    });
    $('#'+id_form+' select.required').each(function () {
        var this_id = $(this).attr('id');
        if ($('#chk_c_cong_viec_hien_tai').prop("checked") && (this_id == 's2id_end_month' || this_id == 's2id_end_year' || this_id == 'end_month' || this_id == 'end_year')) {
            return true;
        };
        if ($(this).val() == '' || $(this).val() == '0') {
            bao_loi_element($(this).attr('id'));
        }else{
            xoa_loi_element($(this).attr('id'));
        }
    });
}

function yeu_cau_dien_form (id_form) {
    if($('#'+id_form).length == 0) return false;
    var main_message = $('#'+id_form+' .main_message').first();
    var form_id = main_message.closest('form').attr('id');
    $('#cols-right').scrollTo2('#'+form_id);
    main_message.removeClass('display_none').html('<span class="error_reg_mess_icon"></span> Vui lòng nhập đầy đủ các trường yêu cầu hoặc bấm Hủy').fadeIn();
    bao_loi_trong_form(id_form);
}


function getImageSize(img, callback){
    img = $(img);

    var wait = setInterval(function(){
        var w = img.width(),
            h = img.height();

        if(w && h){
            done(w, h);
        }
    }, 0);

    var onLoad;
    img.on('load', onLoad = function(){
        done(img.width(), img.height());
    });


    var isDone = false;
    function done(){
        if(isDone){
            return;
        }
        isDone = true;

        clearInterval(wait);
        img.off('load', onLoad);

        callback.apply(this, arguments);
    }
}

function show_popup_nop_hoso_act(id_ttd) {
     window.location = "/nop-ho-so.html?id_ttd="+id_ttd;
}

/**
 * jQuery number plug-in 2.1.3
 * Copyright 2012, Digital Fusion
 * Licensed under the MIT license.
 * http://opensource.teamdf.com/license/
 *
 * A jQuery plugin which implements a permutation of phpjs.org's number_format to provide
 * simple number formatting, insertion, and as-you-type masking of a number.
 *
 * @author  Sam Sehnert
 * @docs    http://www.teamdf.com/web/jquery-number-format-redux/196/
 */
(function($){

    "use strict";

    /**
     * Method for selecting a range of characters in an input/textarea.
     *
     * @param int rangeStart            : Where we want the selection to start.
     * @param int rangeEnd              : Where we want the selection to end.
     *
     * @return void;
     */
    function setSelectionRange( rangeStart, rangeEnd )
    {
        // Check which way we need to define the text range.
        if( this.createTextRange )
        {
            var range = this.createTextRange();
                range.collapse( true );
                range.moveStart( 'character',   rangeStart );
                range.moveEnd( 'character',     rangeEnd-rangeStart );
                range.select();
        }

        // Alternate setSelectionRange method for supporting browsers.
        else if( this.setSelectionRange )
        {
            this.focus();
            this.setSelectionRange( rangeStart, rangeEnd );
        }
    }

    /**
     * Get the selection position for the given part.
     *
     * @param string part           : Options, 'Start' or 'End'. The selection position to get.
     *
     * @return int : The index position of the selection part.
     */
    function getSelection( part )
    {
        var pos = this.value.length;

        // Work out the selection part.
        part = ( part.toLowerCase() == 'start' ? 'Start' : 'End' );

        if( document.selection ){
            // The current selection
            var range = document.selection.createRange(), stored_range, selectionStart, selectionEnd;
            // We'll use this as a 'dummy'
            stored_range = range.duplicate();
            // Select all text
            //stored_range.moveToElementText( this );
            stored_range.expand('textedit');
            // Now move 'dummy' end point to end point of original range
            stored_range.setEndPoint( 'EndToEnd', range );
            // Now we can calculate start and end points
            selectionStart = stored_range.text.length - range.text.length;
            selectionEnd = selectionStart + range.text.length;
            return part == 'Start' ? selectionStart : selectionEnd;
        }

        else if(typeof(this['selection'+part])!="undefined")
        {
            pos = this['selection'+part];
        }
        return pos;
    }

    /**
     * Substitutions for keydown keycodes.
     * Allows conversion from e.which to ascii characters.
     */
    var _keydown = {
        codes : {
            188 : 44,
            109 : 45,
            190 : 46,
            191 : 47,
            192 : 96,
            220 : 92,
            222 : 39,
            221 : 93,
            219 : 91,
            173 : 45,
            187 : 61, //IE Key codes
            186 : 59, //IE Key codes
            189 : 45, //IE Key codes
            110 : 46  //IE Key codes
        },
        shifts : {
            96 : "~",
            49 : "!",
            50 : "@",
            51 : "#",
            52 : "$",
            53 : "%",
            54 : "^",
            55 : "&",
            56 : "*",
            57 : "(",
            48 : ")",
            45 : "_",
            61 : "+",
            91 : "{",
            93 : "}",
            92 : "|",
            59 : ":",
            39 : "\"",
            44 : "<",
            46 : ">",
            47 : "?"
        }
    };

    /**
     * jQuery number formatter plugin. This will allow you to format numbers on an element.
     *
     * @params proxied for format_number method.
     *
     * @return : The jQuery collection the method was called with.
     */
    $.fn.format_number = function( number, decimals, dec_point, thousands_sep ){

        // Enter the default thousands separator, and the decimal placeholder.
        thousands_sep   = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
        dec_point       = (typeof dec_point === 'undefined') ? '.' : dec_point;
        decimals        = (typeof decimals === 'undefined' ) ? 0 : decimals;

        // Work out the unicode character for the decimal placeholder.
        var u_dec           = ('\\u'+('0000'+(dec_point.charCodeAt(0).toString(16))).slice(-4)),
            regex_dec_num   = new RegExp('[^'+u_dec+'0-9]','g'),
            regex_dec       = new RegExp(u_dec,'g');

        // If we've specified to take the number from the target element,
        // we loop over the collection, and get the number.
        if( number === true )
        {
            // If this element is a number, then we add a keyup
            if( this.is('input:text') )
            {
                // Return the jquery collection.
                return this.on({

                    /**
                     * Handles keyup events, re-formatting numbers.
                     *
                     * @param object e          : the keyup event object.s
                     *
                     * @return void;
                     */
                    'keydown.format' : function(e){

                        // Define variables used in the code below.
                        var $this   = $(this),
                            data    = $this.data('numFormat'),
                            code    = (e.keyCode ? e.keyCode : e.which),
                            chara   = '', //unescape(e.originalEvent.keyIdentifier.replace('U+','%u')),
                            start   = getSelection.apply(this,['start']),
                            end     = getSelection.apply(this,['end']),
                            val     = '',
                            setPos  = false;

                        // Webkit (Chrome & Safari) on windows screws up the keyIdentifier detection
                        // for numpad characters. I've disabled this for now, because while keyCode munging
                        // below is hackish and ugly, it actually works cross browser & platform.

//                      if( typeof e.originalEvent.keyIdentifier !== 'undefined' )
//                      {
//                          chara = unescape(e.originalEvent.keyIdentifier.replace('U+','%u'));
//                      }
//                      else
//                      {
                            if (_keydown.codes.hasOwnProperty(code)) {
                                code = _keydown.codes[code];
                            }
                            if (!e.shiftKey && (code >= 65 && code <= 90)){
                                code += 32;
                            } else if (!e.shiftKey && (code >= 69 && code <= 105)){
                                code -= 48;
                            } else if (e.shiftKey && _keydown.shifts.hasOwnProperty(code)){
                                //get shifted keyCode value
                                chara = _keydown.shifts[code];
                            }

                            if( chara == '' ) chara = String.fromCharCode(code);
//                      }




                        // Stop executing if the user didn't type a number key, a decimal character, or backspace.
                        if( code !== 8 && chara != dec_point && !chara.match(/[0-9]/) )
                        {
                            // We need the original keycode now...
                            var key = (e.keyCode ? e.keyCode : e.which);
                            if( // Allow control keys to go through... (delete, etc)
                                key == 46 || key == 8 || key == 9 || key == 27 || key == 13 ||
                                // Allow: Ctrl+A, Ctrl+R
                                ( (key == 65 || key == 82 ) && ( e.ctrlKey || e.metaKey ) === true ) ||
                                // Allow: Ctrl+V, Ctrl+C
                                ( (key == 86 || key == 67 ) && ( e.ctrlKey || e.metaKey ) === true ) ||
                                // Allow: home, end, left, right
                                ( (key >= 35 && key <= 39) )
                            ){
                                return;
                            }
                            // But prevent all other keys.
                            e.preventDefault();
                            return false;
                        }

                        // The whole lot has been selected, or if the field is empty...
                        if( start == 0 && end == this.value.length || $this.val() == 0 )
                        {
                            if( code === 8 )
                            {
                                // Blank out the field, but only if the data object has already been instanciated.
                                start = end = 1;
                                this.value = '';

                                // Reset the cursor position.
                                data.init = (decimals>0?-1:0);
                                data.c = (decimals>0?-(decimals+1):0);
                                setSelectionRange.apply(this, [0,0]);
                            }
                            else if( chara === dec_point )
                            {
                                start = end = 1;
                                this.value = '0'+ dec_point + (new Array(decimals+1).join('0'));

                                // Reset the cursor position.
                                data.init = (decimals>0?1:0);
                                data.c = (decimals>0?-(decimals+1):0);
                            }
                            else if( this.value.length === 0 )
                            {
                                // Reset the cursor position.
                                data.init = (decimals>0?-1:0);
                                data.c = (decimals>0?-(decimals):0);
                            }
                        }

                        // Otherwise, we need to reset the caret position
                        // based on the users selection.
                        else
                        {
                            data.c = end-this.value.length;
                        }

                        // If the start position is before the decimal point,
                        // and the user has typed a decimal point, we need to move the caret
                        // past the decimal place.
                        if( decimals > 0 && chara == dec_point && start == this.value.length-decimals-1 )
                        {
                            data.c++;
                            data.init = Math.max(0,data.init);
                            e.preventDefault();

                            // Set the selection position.
                            setPos = this.value.length+data.c;
                        }

                        // If the user is just typing the decimal place,
                        // we simply ignore it.
                        else if( chara == dec_point )
                        {
                            data.init = Math.max(0,data.init);
                            e.preventDefault();
                        }

                        // If hitting the delete key, and the cursor is behind a decimal place,
                        // we simply move the cursor to the other side of the decimal place.
                        else if( decimals > 0 && code == 8 && start == this.value.length-decimals )
                        {
                            e.preventDefault();
                            data.c--;

                            // Set the selection position.
                            setPos = this.value.length+data.c;
                        }

                        // If hitting the delete key, and the cursor is to the right of the decimal
                        // (but not directly to the right) we replace the character preceeding the
                        // caret with a 0.
                        else if( decimals > 0 && code == 8 && start > this.value.length-decimals )
                        {
                            if( this.value === '' ) return;

                            // If the character preceeding is not already a 0,
                            // replace it with one.
                            if( this.value.slice(start-1, start) != '0' )
                            {
                                val = this.value.slice(0, start-1) + '0' + this.value.slice(start);
                                $this.val(val.replace(regex_dec_num,'').replace(regex_dec,dec_point));
                            }

                            e.preventDefault();
                            data.c--;

                            // Set the selection position.
                            setPos = this.value.length+data.c;
                        }

                        // If the delete key was pressed, and the character immediately
                        // before the caret is a thousands_separator character, simply
                        // step over it.
                        else if( code == 8 && this.value.slice(start-1, start) == thousands_sep )
                        {
                            e.preventDefault();
                            data.c--;

                            // Set the selection position.
                            setPos = this.value.length+data.c;
                        }

                        // If the caret is to the right of the decimal place, and the user is entering a
                        // number, remove the following character before putting in the new one.
                        else if(
                            decimals > 0 &&
                            start == end &&
                            this.value.length > decimals+1 &&
                            start > this.value.length-decimals-1 && isFinite(+chara) &&
                            !e.metaKey && !e.ctrlKey && !e.altKey && chara.length === 1
                        )
                        {
                            // If the character preceeding is not already a 0,
                            // replace it with one.
                            if( end === this.value.length )
                            {
                                val = this.value.slice(0, start-1);
                            }
                            else
                            {
                                val = this.value.slice(0, start)+this.value.slice(start+1);
                            }

                            // Reset the position.
                            this.value = val;
                            setPos = start;
                        }

                        // If we need to re-position the characters.
                        if( setPos !== false )
                        {
                            //console.log('Setpos keydown: ', setPos );
                            setSelectionRange.apply(this, [setPos, setPos]);
                        }

                        // Store the data on the element.
                        $this.data('numFormat', data);

                    },

                    /**
                     * Handles keyup events, re-formatting numbers.
                     *
                     * @param object e          : the keyup event object.s
                     *
                     * @return void;
                     */
                    'keyup.format' : function(e){

                        // Store these variables for use below.
                        var $this   = $(this),
                            data    = $this.data('numFormat'),
                            code    = (e.keyCode ? e.keyCode : e.which),
                            start   = getSelection.apply(this,['start']),
                            setPos;

                        // Stop executing if the user didn't type a number key, a decimal, or a comma.
                        if( this.value === '' || (code < 48 || code > 57) && (code < 96 || code > 105 ) && code !== 8 ) return;

                        // Re-format the textarea.
                        $this.val($this.val());

                        if( decimals > 0 )
                        {
                            // If we haven't marked this item as 'initialised'
                            // then do so now. It means we should place the caret just
                            // before the decimal. This will never be un-initialised before
                            // the decimal character itself is entered.
                            if( data.init < 1 )
                            {
                                start       = this.value.length-decimals-( data.init < 0 ? 1 : 0 );
                                data.c      = start-this.value.length;
                                data.init   = 1;

                                $this.data('numFormat', data);
                            }

                            // Increase the cursor position if the caret is to the right
                            // of the decimal place, and the character pressed isn't the delete key.
                            else if( start > this.value.length-decimals && code != 8 )
                            {
                                data.c++;

                                // Store the data, now that it's changed.
                                $this.data('numFormat', data);
                            }
                        }

                        //console.log( 'Setting pos: ', start, decimals, this.value.length + data.c, this.value.length, data.c );

                        // Set the selection position.
                        setPos = this.value.length+data.c;
                        setSelectionRange.apply(this, [setPos, setPos]);
                    },

                    /**
                     * Reformat when pasting into the field.
                     *
                     * @param object e      : jQuery event object.
                     *
                     * @return false : prevent default action.
                     */
                    'paste.format' : function(e){

                        // Defint $this. It's used twice!.
                        var $this       = $(this),
                            original    = e.originalEvent,
                            val     = null;

                        // Get the text content stream.
                        if (window.clipboardData && window.clipboardData.getData) { // IE
                            val = window.clipboardData.getData('Text');
                        } else if (original.clipboardData && original.clipboardData.getData) {
                            val = original.clipboardData.getData('text/plain');
                        }

                        // Do the reformat operation.
                        $this.val(val);

                        // Stop the actual content from being pasted.
                        e.preventDefault();
                        return false;
                    }

                })

                // Loop each element (which isn't blank) and do the format.
                .each(function(){

                    var $this = $(this).data('numFormat',{
                        c               : -(decimals+1),
                        decimals        : decimals,
                        thousands_sep   : thousands_sep,
                        dec_point       : dec_point,
                        regex_dec_num   : regex_dec_num,
                        regex_dec       : regex_dec,
                        init            : false
                    });

                    // Return if the element is empty.
                    if( this.value === '' ) return;

                    // Otherwise... format!!
                    $this.val($this.val());
                });
            }
            else
            {
                // return the collection.
                return this.each(function(){
                    var $this = $(this), num = +$this.text().replace(regex_dec_num,'').replace(regex_dec,'.');
                    $this.number( !isFinite(num) ? 0 : +num, decimals, dec_point, thousands_sep );
                });
            }
        }

        // Add this number to the element as text.
        return this.text( $.number.apply(window,arguments) );
    };

    //
    // Create .val() hooks to get and set formatted numbers in inputs.
    //

    // We check if any hooks already exist, and cache
    // them in case we need to re-use them later on.
    var origHookGet = null, origHookSet = null;

    // Check if a text valHook already exists.
    if( $.isPlainObject( $.valHooks.text ) )
    {
        // Preserve the original valhook function
        // we'll call this for values we're not
        // explicitly handling.
        if( $.isFunction( $.valHooks.text.get ) ) origHookGet = $.valHooks.text.get;
        if( $.isFunction( $.valHooks.text.set ) ) origHookSet = $.valHooks.text.set;
    }
    else
    {
        // Define an object for the new valhook.
        $.valHooks.text = {};
    }

    /**
     * Define the valHook to return normalised field data against an input
     * which has been tagged by the number formatter.
     *
     * @param object el         : The raw DOM element that we're getting the value from.
     *
     * @return mixed : Returns the value that was written to the element as a
     *                 javascript number, or undefined to let jQuery handle it normally.
     */
    $.valHooks.text.get = function( el ){

        // Get the element, and its data.
        var $this   = $(el), num,
            data    = $this.data('numFormat');

        // Does this element have our data field?
        if( !data )
        {
            // Check if the valhook function already existed
            if( $.isFunction( origHookGet ) )
            {
                // There was, so go ahead and call it
                return origHookGet(el);
            }
            else
            {
                // No previous function, return undefined to have jQuery
                // take care of retrieving the value
                return undefined;
            }
        }
        else
        {
            // Remove formatting, and return as number.
            if( el.value === '' ) return '';

            // Convert to a number.
            num = +(el.value
                .replace( data.regex_dec_num, '' )
                .replace( data.regex_dec, '.' ));

            // If we've got a finite number, return it.
            // Otherwise, simply return 0.
            // Return as a string... thats what we're
            // used to with .val()
            return ''+( isFinite( num ) ? num : 0 );
        }
    };

    /**
     * A valhook which formats a number when run against an input
     * which has been tagged by the number formatter.
     *
     * @param object el     : The raw DOM element (input element).
     * @param float         : The number to set into the value field.
     *
     * @return mixed : Returns the value that was written to the element,
     *                 or undefined to let jQuery handle it normally.
     */
    $.valHooks.text.set = function( el, val )
    {
        // Get the element, and its data.
        var $this   = $(el),
            data    = $this.data('numFormat');

        // Does this element have our data field?
        if( !data )
        {

            // Check if the valhook function already exists
            if( $.isFunction( origHookSet ) )
            {
                // There was, so go ahead and call it
                return origHookSet(el,val);
            }
            else
            {
                // No previous function, return undefined to have jQuery
                // take care of retrieving the value
                return undefined;
            }
        }
        else
        {
            // Otherwise, don't worry about other valhooks, just run ours.
            return el.value = $.number( val, data.decimals, data.dec_point, data.thousands_sep );
        }
    };

    /**
     * The (modified) excellent number formatting method from PHPJS.org.
     * http://phpjs.org/functions/number_format/
     *
     * @modified by Sam Sehnert (teamdf.com)
     *  - don't redefine dec_point, thousands_sep... just overwrite with defaults.
     *  - don't redefine decimals, just overwrite as numeric.
     *  - Generate regex for normalizing pre-formatted numbers.
     *
     * @param float number          : The number you wish to format, or TRUE to use the text contents
     *                                of the element as the number. Please note that this won't work for
     *                                elements which have child nodes with text content.
     * @param int decimals          : The number of decimal places that should be displayed. Defaults to 0.
     * @param string dec_point      : The character to use as a decimal point. Defaults to '.'.
     * @param string thousands_sep  : The character to use as a thousands separator. Defaults to ','.
     *
     * @return string : The formatted number as a string.
     */
    $.number = function( number, decimals, dec_point, thousands_sep ){
        // Set the default values here, instead so we can use them in the replace below.
        thousands_sep   = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
        dec_point       = (typeof dec_point === 'undefined') ? '.' : dec_point;
        decimals        = !isFinite(+decimals) ? 0 : Math.abs(decimals);

        // Work out the unicode representation for the decimal place and thousand sep.
        var u_dec = ('\\u'+('0000'+(dec_point.charCodeAt(0).toString(16))).slice(-4));
        var u_sep = ('\\u'+('0000'+(thousands_sep.charCodeAt(0).toString(16))).slice(-4));

        // Fix the number, so that it's an actual number.
        number = (number + '')
            .replace('\.', dec_point) // because the number if passed in as a float (having . as decimal point per definition) we need to replace this with the passed in decimal point character
            .replace(new RegExp(u_sep,'g'),'')
            .replace(new RegExp(u_dec,'g'),'.')
            .replace(new RegExp('[^0-9+\-Ee.]','g'),'');

        var n = !isFinite(+number) ? 0 : +number,
            s = '',
            toFixedFix = function (n, decimals) {
                var k = Math.pow(10, decimals);
                return '' + Math.round(n * k) / k;
            };

        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (decimals ? toFixedFix(n, decimals) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thousands_sep);
        }
        if ((s[1] || '').length < decimals) {
            s[1] = s[1] || '';
            s[1] += new Array(decimals - s[1].length + 1).join('0');
        }
        return s.join(dec_point);
    }

})(jQuery);

// $('input#salary').number( true, 0, ',', '.' );

function save_tong_quan(id, id_ttd_ungvien) {
    //Kiem tra neu co thay doi du lieu
    var check_change_field = function_check_change_field('#frm-hoso');

    $("#btnSaveHoSoTongQuan").prop('disabled', true);
    var valid = false;
    valid = checkValidHoSo();
    if (!valid){
        $("#btnSaveHoSoTongQuan").prop('disabled', false);
        return false;
    }else{

        var datapost = new FormData($("#frm-hoso")[0]);
        // var id_form = 'frm-hoso';
        if (typeof id_ttd_ungvien !=  'undefined' && id_ttd_ungvien > 0) {
            datapost.append( 'id_ttd_ungvien', id_ttd_ungvien);
        }

        if(check_change_field == true)
            datapost.append('check_change_field', 1);
        else
            datapost.append('check_change_field', 0);

        var id_form = 'div-frm-hoso';
        $.ajax({
            type: 'post',
            dataType : 'json',
            url: '/tintimviec/hoso_create?act=saveTongQuan&id='+id,
            data: datapost,
            mimeType:"multipart/form-data",
            processData: false,
            contentType: false,
            asynx: false,
            success: function(data, textStatus, jqXHR) {
                if (data.error == 0) { // thanh cong
                    // Thành Công
                    $('#hoso_id').val(data.id);
                    $('#view-tongquan').html(data.html);
                    $('#form-tongquan').addClass('display_none');
                    $('#btnChinhSuaTongQuan').unbind('click');
                    $('#btnChinhSuaTongQuan').click(function(event) {
                        $('#view-tongquan').html('');
                        $('#form-tongquan').removeClass('display_none').show();
                    });
                    $('#btnXoaTongQuan').unbind('click');
                    $('#btnXoaTongQuan').click(function(event) {
                        if (confirm('Bạn có chắc chắn muốn xóa bỏ thông tin này không?')) {
                            $('#view-tongquan').html('');
                            $('#form-tongquan').removeClass('display_none').show();
                            hoso_tongquan_reset();
                        }
                    });
                    $("#btnSaveHoSoTongQuan").prop('disabled', false);
                } else {
                    var focus = false;
                    $("#btnSaveHoSoTongQuan").prop('disabled', false);
                    $('[id^="error_"]').text('');
                    if (data.tokenKey) {
                        $('#token-key').val(data.tokenKey);
                    };
                    if (data.tokenValue) {
                        $('#token-value').val(data.tokenValue);
                    };

                    for (key in data.message) {
                        $('#error_'+key).text(data.message[key]);
                        $('#error_'+key).removeClass("display_none").addClass('colorRegRed').addClass('fs14');

                        if (key == 'alert') {
                            alert(data.message[key]);
                        }
                        if (!focus) {
                            if ($("."+id_form+" #error_"+ key).length > 0) {
                                $('#cols-right').scrollTo2("."+id_form+" #error_"+ key);
                                focus = true;
                            }
                        }
                    }
                    if ($('#error_c_muc_luong_toi_thieu').hasClass('display_none') == false) {
                        $('#salary_words').addClass('display_none');
                    }
                    if (data.main_message != null) {
                        $('.max_content').show().removeClass("display_none").addClass('colorRegRed').addClass('fs14').html('<span class="error_reg_mess_icon"></span>'+data.main_message);
                    };
                    $("#btnSaveHoSoTongQuan").prop('disabled', false);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#btnSaveHoSoTongQuan").prop('disabled', false);
                alert('Đã có lỗi hệ thống. Vui lòng thử lại. (#' + jqXHR.status + ': ' + textStatus + ')');
            }
        });
    }
}

function hoso_tongquan_reset() {
    $('#c_tieu_de').val('');
    $('#c_tieu_de').attr('value', '');
    $("#frm-hoso")[0].reset();
    $('#frm-hoso option').removeAttr('selected');
    $("#frm-hoso .breaking-news").remove();
    $('#c_chuc_vu_hien_tai').select2('val', '0');
    $('#c_chuc_vu').select2('val', '0');
    $('#c_so_nam_kinh_nghiem').select2('val', '0');
    $('#c_so_nam_kinh_nghiem option').prop("selected", false);
    $('#c_thoi_gian_lam_viec').select2('val', '');
    $('#fk_tinh').select2('val', '0');
    $('#fk_nganhnghe').select2('val', '0');
    $('#c_muc_luong').select2('val', '');
    $('#c_trinh_do_hv').select2('val', '0');
    $('#frm-hoso select').val('0');
    $('#frm-hoso select').val('');
    $('#frm-hoso textarea').html('');
}


function dim_color_other_element(el) {
    // var must_dim = false;
    // el.closest('form').find('span.select2-chosen').each(function(index, el) {
    //     var tatca = 'Tất cả';
    //     var str = $(this).text();
    //     if (str.indexOf(tatca) === -1 && str != 'Thời gian cập nhật') {
    //         must_dim = true;
    //     }
    // });
    // el.closest('form').find('span.drop_filter_top').each(function(index, el) {
    //     var tatca = 'Tất cả';
    //     var str = $(this).text();
    //     if (str.indexOf(tatca) === -1) {
    //         must_dim = true;
    //     }
    // });
    // if (must_dim) {
        el.closest('form').find('span.select2-chosen').each(function(index, el) {
            var tatca = 'Tất cả';
            var str = $(this).text();
            if (str.indexOf(tatca) !== -1 || str == 'Thời gian cập nhật') {
                $(this).html('<span class="select_unchosen">'+str+'</span>');
            } else{
                $(this).html('<strong>'+str+'</strong>');
            }
        });
        el.closest('form').find('span.drop_filter_top').each(function(index, el) {
            var tatca = 'Tất cả';
            var str = $(this).text();
            if (str.indexOf(tatca) !== -1) {
                $(this).html('<span class="select_unchosen">'+str+'</span>');
            } else{
                $(this).html('<strong>'+str+'</strong>');
            }
        });
    // }else{
    //     el.closest('form').find('span.select2-chosen').each(function(index, el) {
    //         var tatca = 'Tất cả';
    //         var str = $(this).text();
    //         if (str.indexOf(tatca) !== -1 || str == 'Thời gian cập nhật') {
    //             $(this).html(str);
    //         }
    //     });
    //     el.closest('form').find('span.drop_filter_top').each(function(index, el) {
    //         var tatca = 'Tất cả';
    //         var str = $(this).text();
    //         if (str.indexOf(tatca) !== -1) {
    //             $(this).html(str);
    //         }
    //     });
    // }
}

function load_trang_taohoso_dinhkem (file_path, id_ttd, id_ttd_ungvien) {
    if (typeof file_path === 'undefined' || file_path === null) {
        url = "/tintimviec/box_taohoso_dinhkem";
    }else{
        url = "/tintimviec/box_taohoso_dinhkem?file_path="+file_path+"&id_ttd_ungtuyen="+id_ttd+"&id_ttd_ungvien="+id_ttd_ungvien;
    }
    // $('#btn_create_hoso').click(function(event) {
    window.location.href = url;
    // });
}

function taohoso_dinhkem_confirm (file_path, id_ttd, id_ttd_ungvien) {

    url = "/tintimviec/taohoso_dinhkem_confirm?file_path="+file_path+"&id_ttd_ungtuyen="+id_ttd+"&id_ttd_ungvien="+id_ttd_ungvien;
    $("#popup_tao_ho_so_tung_buoc_lan_dau, #popup_tao_ho_so_dinh_kem, #popup_xem_truoc_ho_so_dinh_kem, #popup_regis_successfull").html('');

    var padding_h = $('.regis_header').height();
    var padding_f = $('.regis_footer').height();
    var height_w = $( window ).height();
    var scroll_h = height_w - (padding_f + padding_h + 50);
    // $("#popup_tao_ho_so_tung_buoc_lan_dau, #popup_tao_ho_so_dinh_kem, #popup_xem_truoc_ho_so_dinh_kem, #popup_regis_successfull").html('');
    $("#popup_ntv_register").load(url, function() {
        //load popup confirm
        var h_win_2 = height_w/2;
        var h_pop_confirm_2 = $("#popup_content_register_choice").height()/2;
        var h_confirm = h_win_2 - 230;
        console.log($(window).scrollTop());
        console.log(h_confirm);
        $("#pos_popup_register_choice").css('top',$(window).scrollTop() + h_confirm);
        $("#pos_popup_register_choice").css('left',0);

        $("#overlay_popup, #popup_component_register_choice").show();

        //close confirm
        $(".btn_close").click(function(){
            //hide popup dang ky
            $("#overlay_popup, #popup_component_register_choice").hide();
            $("#popup_ntv_register").html('');
        });
        $('#btn_taohosodinhkem_tudong').focus(); // I want to focus the new link, it does not works
        $('#btn_taohosodinhkem_tudong').live("keyup", function (e) {
            if (e.keyCode == 13) {
                $(this).click();
            }
        });
    });
    return true;
    // $('#btn_create_hoso').click(function(event) {
    window.location.href = url;
    // });
}

function toWords(s, donvi) {
    var th = ['', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ', ' nghìn triệu tỷ', ' quintillion'];
    var dg = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    var tn = ['mười', 'mười một', 'mười hai', 'mười ba', 'mười bốn', 'mười năm', 'mười sáu', 'mười bảy', 'mười tám', 'mười chín'];
    var tw = ['hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];

    if (typeof donvi == 'undefined') {
        donvi = 'đồng';
    }

    s = s.toString();
    s = s.replace(/[\, ]/g, '');
    if (s != parseFloat(s)) return 'không phải là số';
    var x = s.indexOf('.');
    if (x == -1) x = s.length;
    if (x > 15) return 'Số quá lớn';
    var n = s.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
        if ((x - i) % 3 == 2) {
            if (n[i] == '1') {
                str += tn[Number(n[i + 1])] + ' ';
                i++;
                sk = 1;
            } else if (n[i] != 0) {
                str += tw[n[i] - 2] + ' ';
                sk = 1;
            }
        } else if (n[i] != 0) {
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 == 0) str += 'trăm ';
            sk = 1;
        }
        if ((x - i) % 3 == 1) {
            if (sk) str += th[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }
    if (x != s.length) {
        var y = s.length;
        str += 'point ';
        for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
    }
    str = firstToUpperCase( str );
    return '<i>'+ str.replace(/\s+/g, ' ') + ' ' + donvi+'</i>';
}
function firstToUpperCase( str ) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}
function init_kinhnghiem_mucluong() {
    $('input[name=\'kinhnghiem[c_muc_luong]\']').each(function(index, el) {
        $(this).unbind('keyup');
        $(this).keyup(function(event) {
            var numString =   $(this).val();
            var donvi_var =   $(this).closest('form').find('select[name=\'kinhnghiem[c_loai_tien_te]\']').val();
            if (donvi_var == 2) {
                var donvi = 'USD';
            } else {
                var donvi = 'đồng'
            }
            if (numString == '0') {
                document.getElementById('div_text_luong_kinhnghiem').innerHTML = '';
                return;
            }
            if (numString == 0) {
                document.getElementById('div_text_luong_kinhnghiem').innerHTML = '';
                return;
            }
            $(this).closest('form').find('#error_c_muc_luong').addClass('display_none');

            var output = toWords(numString, donvi);
            //print the output
            $(this).closest('form').find('#div_text_luong_kinhnghiem').html(output);
            $(this).closest('form').find('#div_luong_kinhnghiem').removeClass('display_none');
            // document.getElementById('div_text_luong_kinhnghiem').innerHTML = output;
        });
        var kinhnghiem_input = $(this);
        var text_mucluong = $(this).closest('form').find('#div_text_luong_kinhnghiem');
    });
    $('#c_loai_tien_te').unbind('change');
    $('#c_loai_tien_te').change(function(event) {
        $(this).closest('form').find('input[name=\'kinhnghiem[c_muc_luong]\']').val('');
        $(this).closest('form').find('#div_text_luong_kinhnghiem').html('');
    });
}


function init_tooltip(form_id) {

    if (typeof form_id != 'undefined' && form_id != '') {
        form_id = form_id + ' ';
    } else {
        form_id = '';
    }
    // alert(form_id + '.vl24h_tooltip');
    $('.vl24h_tooltip').each(function(index, el) {
        var relid = $(this).attr('rel');
        var initied = $(this).data('init');
        var tooltip = $(this);
        if (relid != '') {
            tooltip.closest('form').find('#'+relid).focus(function(event) {
                tooltip.hide().removeClass('display_none').fadeIn();
            });
            // tooltip.closest('form').find('#'+relid).click(function(event) {
                // tooltip.hide().removeClass('display_none').fadeIn();
            // });
            // $('#'+relid).change(function(event) {
            //     tooltip.fadeOut();
            // });
            tooltip.closest('form').find('#'+relid).blur(function(event) {
                tooltip.fadeOut();
            });
            // $('#'+relid).keydown(function(event) {
            //     tooltip.fadeOut();
            // });
            tooltip.data('init',1);
        }
    });
}

function getmap(diachi)
{
    $('#google_map').html('<div class="map-ntd"> <div class="frame" id="google-map"> </div> </div>');
    map = new google.maps.Map(document.getElementById('google-map'), {
      zoom: 15
    });
    var geocoder = new google.maps.Geocoder();
    var address = diachi;
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            // setTimeout(function(){
            $('#google_map').removeClass('display_none');
             // }, 3000);

            $(document).ready(function() {
                google.maps.event.addListener(map, "idle", function(){
                    google.maps.event.trigger(map, 'resize');
                });
            });

        } else {
            $('#google_map').remove();
        }
    });

}

function reload_format_number(argument) {
    $(document).on('input', '.format_number', function(e) {
        var elm = this, jelm = $(elm);
        var amount = elm.value;

        // clean
        amount = amount.replace(/[^0-9]/g, '');

        // limit 13 digrits
        if(amount.length > 13){
            amount = amount.slice(0, 13);
        }

        // format price
        var formatted_amount = amount;
        var n_loop = Math.floor(formatted_amount.length / 3);
        for (var i = 1; i <= n_loop; i++) {
            formatted_amount = formatted_amount.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
        }

        // set
        elm.value = formatted_amount;
        jelm.attr('data-real-amount', amount);
    });
    $('.format_number').trigger('input');
}


$(document).ready(function() {
    // price format
    // if ($('.format-price').length) {
    // $(document).on('input', '.format-price', function(e) {
    reload_format_number();
    // }

    $.toWords = {
        th: ['', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ', ' nghìn triệu tỷ', ' quintillion'],
        dg: ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bẩy', 'tám', 'chín'],
        tn: ['mừơi', 'mười một', 'mười hai', 'mười ba', 'mười bốn', 'mười lăm', 'mười sáu', 'mười bẩy', 'mười tám', 'mười chín'],
        tw: ['hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi']
    };

    $.numberToWords = function(s, prefix, suffix) {
        s = s.toString();
        s = s.replace(/[\, ]/g, '');
        if (s != parseFloat(s)) return 'không phải số';
        var x = s.indexOf('.');
        if (x == -1) x = s.length;
        if (x > 15) return 'số quá lớn';
        var n = s.split('');
        var str = '';
        var sk = 0;
        for (var i = 0; i < x; i++) {
            if ((x - i) % 3 == 2) {
                if (n[i] == '1') {
                    str += $.toWords.tn[Number(n[i + 1])] + ' ';
                    i++;
                    sk = 1;
                } else if (n[i] != 0) {
                    str += $.toWords.tw[n[i] - 2] + ' ';
                    sk = 1;
                }
            } else if (n[i] != 0) {
                str += $.toWords.dg[n[i]] + ' ';
                if ((x - i) % 3 == 0) str += 'trăm ';
                sk = 1;
            }
            if ((x - i) % 3 == 1) {
                if (sk) str += $.toWords.th[(x - i - 1) / 3] + ' ';
                sk = 0;
            }
        }
        if (x != s.length) {
            var y = s.length;
            str += 'point ';
            for (var i = x + 1; i < y; i++) str += $.toWords.dg[n[i]] + ' ';
        }

        return (prefix ? prefix : '') + str.replace(/\s+/g, ' ') + (suffix ? suffix : '');
    };

    // number to text
    // if ($('.price-to-text').length) {
    $(document).on('keyup', '.price-to-text', function(e) {
        var elm = this, jelm = $(this), data = jelm.data();
        var amount = elm.value;
        var jtarget = $(data['docso']);

        // clean
        amount = amount.replace(/[^0-9]/g, '');

        if (amount) {
            if (jtarget.length) {
                jtarget.html($.numberToWords(amount, data.docsoPrefix ? data.docsoPrefix : '', data.docsoSuffix ? data.docsoSuffix : ''));
            }
        } else {
            jtarget.html('');
        }

        return true;
    });
    $('.price-to-text').trigger('keyup');
    // }
});
//Chi cho nhap so
function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	return true;
}
//Start Task 1697 thay doi ma vung
function check_ma_vung()
{
    $(window).scrollTop(0);
    var height_w = $(window).height();
    $("#popup_thay_doi_ma_vung").load("/common/popup_thaydoimavung", function () {
        var h_win_2 = height_w / 2;
        var h_pop_confirm_2 = $("#popup_content_register_choice").height() / 3;
        var h_confirm = h_win_2 - h_pop_confirm_2;
        $("#pos_popup_register_choice").css('top', $(window).scrollTop() + h_confirm);
        $("#pos_popup_register_choice").css('left', 0);
        $("#popup_component_register_choice").show();

    });
}

//Chuyen email ve dang %
$('#search_box_full').on('submit', function () {
    var e_input = $(this).find('input[name="hdn_tu_khoa"]');
    var pattern = /^(.*?)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}(.*?)$/i;
    if(pattern.test(e_input.val())){
        e_input.val(e_input.val().replace('@','%%%').replace('.','%%'));
    }
});

function shareFacebook(p_url){
    openWindow('https://www.facebook.com/sharer/sharer.php?u='+p_url+'&display=popup&ref=plugin&src=share_button&app_id=138949819975591','','width=640,height=400,scrollbars=yes');
}
//Lay du lieu cu
function function_get_serialize_data_old(form_id)
{
    $(form_id).data('serialize_data_old',$(form_id).serialize());
}

//Kiem tra neu co thay doi du lieu
function function_check_change_field(form_id)
{
    if($(form_id).data('serialize_data_old') != $(form_id).serialize())
    {
        return true;
    }
    return false;
}

/*Start 12-06-2017 Task VL24H-1424*/
function onclick_check_user_approve(loai_tai_khoan, trang_thai, type_create, url)
{
    var text_alert = '';
    if(loai_tai_khoan == 0)
    {
        if(type_create == 'ttv-edit')
            text_alert = 'Tài khoản của bạn đang không được duyệt. Vui lòng cập nhật lại tài khoản để tiếp tục chỉnh sửa hồ sơ.';
        else if(type_create == 'ttv-danh-sach-cv')
            text_alert = 'Tài khoản của bạn đang không được duyệt. Vui lòng cập nhật lại tài khoản để tiếp tục sử dụng tính năng này.';
        else if(type_create == 'ttv-update-cv')
            text_alert = 'Tài khoản của bạn đang không được duyệt. Vui lòng cập nhật lại tài khoản để tiếp tục chỉnh sửa hồ sơ trang trí.';
        else
            text_alert = 'Tài khoản của bạn đang không được duyệt. Vui lòng cập nhật lại tài khoản để tiếp tục tạo hồ sơ.';
    }
    else
    {
        if(type_create == 'ntd-ttd-edit')
            text_alert = 'Tài khoản của Quý khách đang không được duyệt. Vui lòng cập nhật lại tài khoản để tiếp tục chỉnh sửa tin tuyển dụng.';
        else if(type_create == 'ntd-ttd-xuat-ban')
            text_alert = 'Tài khoản của Quý khách đang không được duyệt. Vui lòng cập nhật lại tài khoản để tiếp tục xuất bản tin tuyển dụng.';
        else
            text_alert = 'Tài khoản của Quý khách đang không được duyệt. Vui lòng cập nhật lại tài khoản để tiếp tục tạo tin tuyển dụng.';
    }

    if(trang_thai == '-1')
    {
        show_popup_ntv_khong_duyet(text_alert);
    }
    else
        window.location.href = url;
}

function show_popup_ntv_khong_duyet(text_alert)
{
    $(window).scrollTop(0);
    var padding_h = $('.regis_header').height();
    var padding_f = $('.regis_footer').height();
    var height_w = $(window).height();
    var scroll_h = height_w - (padding_f + padding_h + 50);

    $("#popup_confirm").load("/common/popup_check_approve_ntv",{text_alert:text_alert}, function () {

        var h_win_2 = height_w / 2;
        var h_pop_confirm_2 = $("#popup_content_register_choice").height() / 3;
        var h_confirm = h_win_2 - h_pop_confirm_2;

        $("#pos_popup_register_choice").css('top', $(window).scrollTop() + h_confirm);
        $("#pos_popup_register_choice").css('left', 0);
        $("#overlay_popup, #popup_component_register_choice").show();

        //Khi click đóng
        $(".btn_close, #btnCancel").click(function(){
            $("#overlay_popup, #popup_component_register_choice").hide();
            $("#popup_doi_mat_khau, .popup_ntv_register").html("");
            if(text_alert == 'Tài khoản của bạn đang không được duyệt. Vui lòng cập nhật lại tài khoản để tiếp tục hiển thị hồ sơ.')
                window.location.reload();
        });

        //Khi click update account
        $("#btnXoaHoSo").click(function(){
            window.location.href = "/taikhoan/profile?referer=hoso";
        });

    });
}
/*End 12-06-2017 Task VL24H-1424*/

//Hien thi mau sac khi select change
$('.box_select_filter_reg').on("change", function (e) {
    var id = 's2id_'+ $(this).attr('id');
    var val = $(this).val();
    change_text_color_selected(id, val);
});

function change_text_color_selected(id, val)
{
    if(val == 0)
        $('#'+id).find('.select2-chosen').attr('style','color:#c1bebe');
    else
        $('#'+id).find('.select2-chosen').attr('style','color:#757575');
}




