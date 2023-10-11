$.fn.scrollTo = function( target, options, callback ){
    if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
    var settings = $.extend({
        scrollTarget  : target,
        offsetTop     : 50,
        duration      : 500,
        easing        : 'swing'
    }, options);
    return this.each(function(){
        var scrollPane = $(this);
        var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
        var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
        scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
            if (typeof callback == 'function') { callback.call(this); }
        });
    });
}


$(document).ready(function() {
    //focus search all
	$('input#inputsearchall').focusin(function() {
		$('.line_search').addClass('active');
	});
	$('input#inputsearchall').focusout(function() {
		$('.line_search').removeClass('active');
	});

    // load scroll left
    loadscroll();

    /* gọi tooltip*/
    $("body").tooltip({ selector: '[data-toggle=tooltip]', trigger: "hover" });

    var mac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
    if (mac) {
        var duration_enscroll = 700;
    }else{
        var duration_enscroll = 100;
    }


	//icheck
	var callbacks_list = $('.demo-callbacks ul');
    $('.demo-list input').on('ifCreated ifClicked ifChanged ifChecked ifUnchecked ifDisabled ifEnabled ifDestroyed', function(event){
      callbacks_list.prepend('<li><span>#' + this.id + '</span> is ' + event.type.replace('if', '').toLowerCase() + '</li>');
    }).iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%'
    });
    $('.demo-list-green input').on('ifCreated ifClicked ifChanged ifChecked ifUnchecked ifDisabled ifEnabled ifDestroyed', function(event){
        callbacks_list.prepend('<li><span>#' + this.id + '</span> is ' + event.type.replace('if', '').toLowerCase() + '</li>');
    }).iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
        increaseArea: '20%'
    });

    /* js scroll bar */
    $('.scrollbar_cus').enscroll({
        showOnHover: false,
        verticalTrackClass: 'track3',
        verticalHandleClass: 'handle3'
    });
    var do_width = $( window ).width();
	setTimeout(function() {
	if ( $('#sliding_menu_js').hasClass('open') ) {
            if (do_width > 1280) {
                var max_width = do_width - 500;
                var max_width2 = max_width + 240;
                if(max_width <= 949) {
                    $('.content_cols-right').css('max-width', max_width + 'px');
                    $('.content14').css('max-width', max_width2 + 'px');
                    $('.footer').css('max-width', max_width + 'px');
                    //console.log(max_width);
                }else{
                    $('.content_cols-right').css('max-width','949px');
                    $('.footer').css('max-width','920px');
                    if(max_width2 < 1156){
						$('.content14').css('max-width', max_width2 + 'px');
					}else{
						$('.content14').css('max-width', 1156 + 'px');
					}
                }
            }else{
                $('.content_cols-right').css('max-width','732px');
                $('.footer').css('max-width','714px');
            }
            if (do_width < 1280) {
                ocultar();
            }
        }
	},1000);
    $(window).resize(function() {
        var padding_h = $('.title_box_left').height();
        var padding_d = $('.header').height();
        /* js chia man hinh thanh 2 khoi */
        if($('.header_right').get(0)) {
            var height = $( window ).height() - 64;
        } else {
            var height = $( window ).height() - padding_d;
        }
        //console.log(height);
        $("#cols-left").css({"height":height  + "px"});
        $("#cols-right").css({"height":height + "px"});
		//$("#cols-left").mouseover(function(){$(this).css("overflow","scroll");});
		//$("#cols-left").mouseout(function(){$(this).css("overflow","hidden");});
        var windowWidth = $( window ).width();
        if(windowWidth < 1024){
            $("#cols-right").addClass('over-x');
        }else{
            $("#cols-right").removeClass('over-x');
        }

        var do_width = $( window ).width();
        if ( $('#sliding_menu_js').hasClass('open') ) {
            if (do_width > 1280) {
                var max_width = do_width - 500;
                var max_width2 = max_width + 240;
                if(max_width <= 949) {
                    $('.content_cols-right').css('max-width', max_width + 'px');
                    $('.content14').css('max-width', max_width2 + 'px');
                    $('.footer').css('max-width', max_width + 'px');
                    //console.log(max_width);
                }else{
                    $('.content_cols-right').css('max-width','949px');
                    $('.footer').css('max-width','920px');
                    if(max_width2 < 1156){
						$('.content14').css('max-width', max_width2 + 'px');
					}else{
						$('.content14').css('max-width', 1156 + 'px');
					}
                }
            }else{
                $('.content_cols-right').css('max-width','732px');
                $('.footer').css('max-width','714px');
            }
            if (do_width < 1280) {
                ocultar();
            }
        }
        if (do_width >= 1280) {
            //mostrar();
        }
        if (do_width < 1012) {
            $('#sliding_menu_js_btn').hide();
        }
        if (do_width >= 1012) {
            $('#sliding_menu_js_btn').show();
        }
        if (do_width > 1024) {
            var max_width3 = (do_width - 1040)/5;
			var max_width4 = $('.menu_cong_header').width();
			//$('.menu_cong_header').css('max-width', 640 + 'px');
			if(max_width3 > 0 && max_width3 < 24){
				$('.bt_head_cong').css('margin-left', max_width3 + 'px');
			}
			if(max_width3 > 24){
				$('.bt_head_cong').css('margin-left', 24 + 'px');
			}
			//console.log(max_width3);
			$( ".menu_cong_header a:nth-child(4) .title_cong_menu" ).replaceWith( "<div class='title_cong_menu w_100'>Sinh viên/Bán TG</div>" );
			$('.icn_cong_head_sinhvien').css('margin-left', 34 + 'px');
        }
		if (do_width > 1024 && do_width < 1280) {
			//$('.menu_cong_header').css('max-width', 625 + 'px');

		}
		if(do_width < 1024){
			//$('.menu_cong_header').css('max-width', 452 + 'px');
			$('.bt_head_cong').css('margin-left', '4px');
			$('.icn_cong_head_sinhvien').css('margin-left', 12 + 'px');
			$( ".menu_cong_header a:nth-child(4) .title_cong_menu" ).replaceWith( "<div class='title_cong_menu w_100'>Sinh viên</div>" );
			//console.log(do_width);
		}

		// check vung ngoai content
		var w_do = $( window ).width();
		var w_con = $('.content_cols-right').width();
		var h_con = $('.content_cols-right').height();
		$('.block_over_click').css('width', '0px');
		if(w_do > 1178){
			$('.block_over_click').css('width', w_do - w_con + 'px');
			$('.block_over_click').css('height', h_con + 'px');
			$('.block_over_click').css('margin', '-24px');
		}

    });
    if (do_width < 1012) {
        $('#sliding_menu_js_btn').hide();
    }
    if (do_width >= 1012) {
        $('#sliding_menu_js_btn').show();
    }

	if (do_width > 1024) {
        var max_width3 = (do_width - 1040)/5;
		var max_width4 = $('.menu_cong_header').width();

		if(max_width3 > 0 && max_width3 < 24){
			setTimeout(function() {
				$('.bt_head_cong').css('margin-left', max_width3 + 'px');
			},100);
		}
		$('.menu_cong_header').css('max-width', 625 + 'px');
		if(max_width3 > 24){
			setTimeout(function() {
				$('.bt_head_cong').css('margin-left', 24 + 'px');
			},100);
		}
		setTimeout(function() {
		$( ".menu_cong_header a:nth-child(4) .title_cong_menu" ).replaceWith( "<div class='title_cong_menu w_100'>Sinh viên/Bán TG</div>" );
		$('.icn_cong_head_sinhvien').css('margin-left', 34 + 'px');
		},100);
    }
	if(do_width < 1024){
			$('.menu_cong_header').css('max-width', 452 + 'px');
			$('.bt_head_cong').css('margin', '0px 12px;');
			$('.icn_cong_head_sinhvien').css('margin-left', 12 + 'px');
			$( ".menu_cong_header a:nth-child(4) .title_cong_menu" ).replaceWith( "<div class='title_cong_menu w_100'>Sinh viên</div>" );
	}
	//$("#cols-left").mouseover(function(){$(this).css("overflow","scroll");});
	//$("#cols-left").mouseout(function(){$(this).css("overflow","hidden");});
    var windowWidth = $( window ).width();
    if(windowWidth < 1024){
        $("#cols-right").addClass('over-x');
    }else{
        $("#cols-right").removeClass('over-x');
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
    $(window).scroll(function() {
        0 != jQuery(this).scrollTop() ? jQuery("#bttop").fadeIn() : jQuery("#bttop").fadeOut()
    }), $("select.select-style").size() > 0 && $("select.select-style").each(function() {
        var e = $(this).attr("data-maximum"),
            o = $(this).attr("data-disS");
        void 0 != e ? $(this).select2({
            maximumSelectionSize: e,
            allowClear: !0,
            dropdownCssClass: $(this).attr("name"),
            formatResult: t,
            formatSelection: t,
            escapeMarkup: function(t) {
                return t
            }
        }) : void 0 != o ? $(this).select2({
            maximumSelectionSize: e,
            allowClear: !0,
            dropdownCssClass: $(this).attr("name"),
            formatResult: t,
            formatSelection: t,
            minimumResultsForSearch: -1
        }) : $(this).select2({
            allowClear: !0,
            dropdownCssClass: $(this).attr("name"),
            formatResult: t,
            formatSelection: t,
            escapeMarkup: function(t) {
                return t
            }
        })
    });

    $('#box_vieclam_tuyengap .pagination a').click(function() {
        pagination(this,'box_vieclam_tuyengap');
    });
    $('#box_vieclam_hapdan .pagination a').click(function() {
        pagination(this,'box_vieclam_hapdan');
    });
    $('#box_vieclam_moinhat .pagination a').click(function() {
        pagination(this,'box_vieclam_moinhat');
    });
    $('#box_vieclam_vip .pagination a').click(function() {
        pagination(this,'box_vieclam_vip');
    });
    $('#viec_hapdan .pagination a').click(function() {
        pagination(this,'viec_hapdan');
    });
    $('#viec_hapdan_daxacthuc .pagination a').click(function() {
        pagination(this,'viec_hapdan_daxacthuc');
    });
    $('#box_vieclam_hapdan_tinhthanh .pagination a').click(function() {
        pagination(this,'box_vieclam_hapdan_tinhthanh');
    });
    $('#box_vieclam_tuyengap_theonghanh .pagination a').click(function() {
        pagination(this,'box_vieclam_tuyengap_theonghanh');
    });
    $('#box_vieclam_tuyengap_theonghanh02 .pagination a').click(function() {
        pagination(this,'box_vieclam_tuyengap_theonghanh02');
    });
    $('#box_vieclam_tuyengap_theonghanh03 .pagination a').click(function() {
        pagination(this,'box_vieclam_tuyengap_theonghanh03');
    });
    $('#box_vieclam_hapdan_theonghanh .pagination a').click(function() {
        pagination(this,'box_vieclam_hapdan_theonghanh');
    });
    $('#box_vieclam_tuyengap_tinhthanh .pagination a').click(function() {
        pagination(this,'box_vieclam_tuyengap_tinhthanh');
    });
    $('#box_vieclam_moinhat_tinhthanh .pagination a').click(function() {
        pagination(this,'box_vieclam_moinhat_tinhthanh');
    });
    $('#box_vieclam_phuhop .pagination a').click(function() {
        pagination(this,'box_vieclam_phuhop');
    });

    $('#box_vieclam_hapdan_daxacthuc .pagination a').click(function() {
        pagination(this,'box_vieclam_hapdan_daxacthuc');
    });

    var pagination = function(thisLi, id) {
        $('#' + id + ' .pagination li').removeClass('active');
        $(thisLi).parent().addClass('active');
        //Hide scrollTop _nghiephai
        //$('#cols-right').scrollTo('#' + id);
        var contentLoaded = $('#'+ id).find('.list_item_two').find('div').html();
        $('#'+id).find('.list_item_two').find('div:eq(0)').html('<p class="bold font28 text-center">Đang tải dữ liệu... </p>');
        $('#'+id).find('.list_item_two').find('div:eq(0)').html(contentLoaded);
    }

    $('.order_filter .btn').click(function() {
        $('.order_filter .btn').removeClass('active');
        $(this).addClass('active');
    });
    setTimeout(function() {

        $('.select2-results').enscroll({
            showOnHover: false,
            verticalTrackClass: 'track3',
            verticalHandleClass: 'handle3'
        });
    },1000);
    $('.modal-drop-mucluong, .modal-body-searchad').enscroll({
        showOnHover: false,
        verticalTrackClass: 'track3',
        verticalHandleClass: 'handle3'
    });
    $('.regis_content').enscroll({
        showOnHover: false,
        easingDuration: duration_enscroll,
        verticalTrackClass: 'track3',
        verticalHandleClass: 'handle3'
    });
    $(window).resize(function() {
        $('.list_nganhnghe_all').width($('.search_nghanhnghe').width()-38);
    });

    $('.list_nganhnghe_all').width($('.search_nghanhnghe').width()-18);



    /* js add form */
    $('#addPhone').click(function() {
        var div = $(this).parent().parent().parent();
        var html = div.find('.input-phone').last().clone(true, true);
        html.find('input').val('');
        div.find('.input-phone').last().after(html);
        div.find('.input-phone').removeClass('mb1');
        div.find('.input-phone').last().addClass('mb1');
    })
    $('#addbangcap').click(function() {
        var div = $(this).parent().parent().parent();
        var html = div.find('.box-bangcap').last().clone(true, true);
        html.find('input').val('');
        div.find('.box-bangcap').last().after(html);
        div.find('.box-bangcap').removeClass('mb1');
        div.find('.box-bangcap').last().addClass('mb1');
    })

    $('#addbangcap2').click(function() {
        var div = $(this).parent().parent().parent();
        var html = div.find('.addformbangcap').last().clone(true, true);
        html.find('input').val('');
        div.find('.box-bangcap2').last().after(html);
        div.find('.box-bangcap2').removeClass('mb1');
        div.find('.box-bangcap2').last().addClass('mb1');
    })
    $('#addngongu').click(function() {
        var div = $(this).parent().parent().parent();
        var html = div.find('.box-ngonngu').last().clone(true, true);
        html.find('input').val('');
        div.find('.box-ngonngu').last().after(html);
        div.find('.box-ngonngu').removeClass('mb1');
        div.find('.box-ngonngu').last().addClass('mb1');
    })

    $('#addngongu2').click(function() {
        var div = $(this).parent().parent().parent();
        var html = div.find('.addformngonngu').last().clone(true, true);
        html.find('input').val('');
        div.find('.box-ngonngu2').last().after(html);
        div.find('.box-ngonngu2').removeClass('mb1');
        div.find('.box-ngonngu2').last().addClass('mb1');
    })


    $('#addbkinhngiem').click(function() {
        var div = $(this).parent().parent().parent();
        var html = div.find('.box-kynang').last().clone(true, true);
        html.find('input').val('');
        div.find('.box-kynang').last().after(html);
        div.find('.box-kynang').removeClass('mb1');
        div.find('.box-kynang').last().addClass('mb1');
    })


    $('#addbkinhngiem2').click(function() {
        var div = $(this).parent().parent().parent();
        var html = div.find('.addformkinhnghiem').last().clone(true, true);
        html.find('input').val('');
        div.find('.box-kynang2').last().after(html);
        div.find('.box-kynang2').removeClass('mb1');
        div.find('.box-kynang2').last().addClass('mb1');
    })
    $('#addbkynang').click(function() {
        var div = $(this).parent().parent().parent();
        var html = div.find('.box-sotruong').last().clone(true, true);
        html.find('input').val('');
        div.find('.box-sotruong').last().after(html);
        div.find('.box-sotruong').removeClass('mb1');
        div.find('.box-sotruong').last().addClass('mb1');
    })


    $('#addbkynang2').click(function() {
        var div = $(this).parent().parent().parent();
        var html = div.find('.addformkynang').last().clone(true, true);
        html.find('input').val('');
        div.find('.box-sotruong2').last().after(html);
        div.find('.box-sotruong2').removeClass('mb1');
        div.find('.box-sotruong2').last().addClass('mb1');
    })



    $('#addthamkhao').click(function() {
        var div = $(this).parent().parent().parent();
        var html = div.find('.box-thamkhao').last().clone(true, true);
        html.find('input').val('');
        div.find('.box-thamkhao').last().after(html);
        div.find('.box-thamkhao').removeClass('mb1');
        div.find('.box-thamkhao').last().addClass('mb1');
    })


    $('#addthamkhao2').click(function() {
        var div = $(this).parent().parent().parent();
        var html = div.find('.addformthamkhao').last().clone(true, true);
        html.find('input').val('');
        div.find('.box-thamkhao2').last().after(html);
        div.find('.box-thamkhao2').removeClass('mb1');
        div.find('.box-thamkhao2').last().addClass('mb1');
    })

    $("#hidetrinhdobangcap").click(function(){
        $("#trinhdobangcap").hide();
        $(".hidetrinhdobangcap").hide();
        $(".tooltip").removeClass('in');
        $(".showtrinhdobangcap").show();
    });

    $("#showtrinhdobangcap").click(function(){
        $("#trinhdobangcap").show();
        $(".hidetrinhdobangcap").show();
        $(".tooltip").removeClass('in');
        $(".showtrinhdobangcap").hide();
    });

    $("#hidekinhnghiemvakynang").click(function(){
        $("#kinhnghiemvakynang").hide();
        $(".hidekinhnghiemvakynang").hide();
        $(".tooltip").removeClass('in');
        $(".showkinhnghiemvakynang").show();
    });

    $("#showkinhnghiemvakynang").click(function(){
        $("#kinhnghiemvakynang").show();
        $(".hidekinhnghiemvakynang").show();
        $(".tooltip").removeClass('in');
        $(".showkinhnghiemvakynang").hide();
    });
    $("#show-edit").click(function(){
        $("#hienform").slideDown("slow");
    });

    //THÊM BẰNG CẤP CHỨNG CHỈ
    $("#add_bangcap_chungchi").click(function(){
        var bang_cap_id = $("#bang_cap_id").val();

        if ( $("#add_bangcap_chungchi").hasClass("addBangCapCC") || bang_cap_id == 0){

            $(".max_content_bangcap_cc").html("<span class='error_reg_mess_icon'></span>Bạn cần LƯU thông tin đang tạo trước khi thêm thông tin mới");
            $(".max_content_bangcap_cc").slideDown("slow");
        }else{
            $("#bang_cap_id").val(0);
            $(".max_content_bangcap_cc").slideUp("slow");
            $("#hienform_add_bccc").slideDown("slow");
            $("#add_bangcap_chungchi").addClass('addBangCapCC');
        }
    });

    //kinh nghiem lam viec
    $("#addbkinhngiem2_new").click(function(){
        var status_id = $("#kinh_nghiem_status_id").val();
        if ( $("#addbkinhngiem2_new").hasClass("addKinhNghiemLV")  || status_id == 0){
            $(".max_content_kinhnghiem_lv").html("<span class='error_reg_mess_icon'></span>Bạn cần LƯU thông tin đang tạo trước khi thêm thông tin mới");
            $(".max_content_kinhnghiem_lv").slideDown("slow");
        }else{
            $("#status_id").val(0);
            $(".max_content_kinhnghiem_lv").slideUp("slow");
            $("#hienform-kinhnghiem-add").slideDown("slow");
            $("#addbkinhngiem2_new").addClass('addKinhNghiemLV');
        }
    });

    //ky nang dac biet
    $("#addbkynang2_new").click(function(){
        var status_id = $("#sotruong_status_id").val();
        if ( $("#addbkynang2_new").hasClass( "addKyNangSoTruong" )  || status_id == 0){
            $(".max_content_kynang_st").html("<span class='error_reg_mess_icon'></span>Bạn cần LƯU thông tin đang tạo trước khi thêm thông tin mới");
            $(".max_content_kynang_st").slideDown("slow");
        }else{
            $("#status_id").val(0);
            $(".max_content_kynang_st").slideUp("slow");
            $("#hienform-kynang-new").slideDown("slow");
            $("#addbkynang2_new").addClass('addKyNangSoTruong');
        }
        $("#addbkynang2_new").hide();

    });

    //NGƯỜI THAM KHẢO
    $("#addthamkhao2_new").click(function(){
        var status_id = $("#nguoitk_status_id").val();
        var hasNTK = $("#addthamkhao2_new").hasClass( "addNguoiThamKhao" );
        if ( hasNTK  || status_id == 0 ){
            $(".max_content").html("<span class='error_reg_mess_icon'></span>Bạn cần LƯU thông tin đang tạo trước khi thêm thông tin mới");
            $(".max_content").slideDown("slow");

        }else{
            $(".max_content").slideUp("slow");
            $("#status_id").val(0);
            $("#hienform-thamkhao-add").slideDown("slow");
            $("#addthamkhao2_new").addClass('addNguoiThamKhao');
        }

    });


    $("#hide-formbangcap").click(function(){
        $("#hienform").hide(1000);
    });
    $("#show-detail").click(function(){
        $("#box-view").show();
        $("#listnews-bc").hide();
    });
    $("#hide-detailbangcap").click(function(){
        $("#box-view").hide();
        $("#listnews-bc").show();
    });
    $("#show-edit-ngoai-ngu").click(function(){
        $("#hienform-ngoaingu").slideDown("slow");
    });

    $("#show-add-ngoai-ngu").click(function(){
        var ngoai_ngu_id = $("#ngoai_ngu_id").val();
        if ( $("#show-add-ngoai-ngu").hasClass( "addNgoaiNgu" ) || ngoai_ngu_id == 0){
            $(".max_content_ngoaingu").html("<span class='error_reg_mess_icon'></span>Bạn cần LƯU thông tin đang tạo trước khi thêm thông tin mới");
            $(".max_content_ngoaingu").slideDown("slow");
        }else{
            $("#ngoai_ngu_id").val(0);
            $("#hienform-ngoaingu_add").slideDown("slow");
            $("#show-add-ngoai-ngu").addClass('addNgoaiNgu');
        }
    });

    $("#btnRegisNgoaiNgu").click(function(){
        /*$("#hienform-ngoaingu").hide(1000);*/
        $("#hienform-ngoaingu").slideUp("slow");
    });

    $("#show-edit-tinhoc").click(function(){
        $("#hienform-tinhoc").slideDown("slow");
    });

    $("#hide-formtinhoc").click(function(){
        $("#hienform-tinhoc").hide(1000);
    });
    $("#show-detail-tinhoc").click(function(){
        $("#box-viewtinhoc").show();
        $("#listnews-th").hide();
    });
    $("#hide-detailtinhoc").click(function(){
        $("#box-viewtinhoc").hide();
        $("#listnews-th").show();
    });
    $("#show-edit-kinhnghiem").click(function(){
        $("#hienform-kinhnghiem").slideDown("slow");
    });

    $("#hide-formkinhnghiem").click(function(){
        $("#hienform-kinhnghiem").hide(1000);
    });
    $("#show-detail-kinhnghiem").click(function(){
        $("#box-viewkinhnghiem").show();
        $("#listnews-kn").hide();
    });
    $("#hide-detailkinhnghiem").click(function(){
        $("#box-viewkinhnghiem").hide();
        $("#listnews-kn").show();
    });
    $("#show-edit-kynang").click(function(){
        $("#hienform-kynang").slideDown("slow");
    });

    $("#hide-formkynang").click(function(){
        $("#hienform-kynang").hide(1000);
    });
    $("#show-edit-thamkhao").click(function(){
        $("#hienform-thamkhao").slideDown("slow");
    });

    $("#hide-formthamkhao").click(function(){
        $("#hienform-thamkhao").hide(1000);
    });
    $("#show-detail-thaokhao").click(function(){
        $("#box-viewthamkhao").show();
        $("#listnews-tk").hide();
    });
    $("#hide-detailthamkhao").click(function(){
        $("#box-viewthamkhao").hide();
        $("#listnews-tk").show();
    });
    $("#hidenguoithamkhao").click(function(){
        $("#nguoithamkhao").hide();
        $(".hidenguoithamkhao").hide();
        $(".tooltip").removeClass('in');
        $(".shownguoithamkhao").show();
    });
    $("#shownguoithamkhao").click(function(){
        $("#nguoithamkhao").show();
        $(".tooltip").removeClass('in');
        $(".shownguoithamkhao").hide();
        $(".hidenguoithamkhao").show();
    });




	var box_open;

	// dong mo item
	$('.click_thu_gon').click(function() {
	    $(this).parent().parent().parent().find('.accordion-large').slideToggle( "fast" );
        $(this).parent().parent().parent().find('.accordion-small').slideToggle( "fast" );
        $(this).parent().parent().parent().find('.thu_gon').hide();
        $(this).parent().parent().parent().find('.mo_rong').show();
        $(this).parent().parent().parent().find('.container-accordion').addClass("bogoc");
        $('.container-accordion').removeClass('hasBoxOpened');
		box_open = 0;
	});
	$('.click_mo_rong').click(function() {
        $('.container-accordion').removeClass('hasBoxOpened');
        $('.accordion-large').slideUp( "fast" );
        $('.accordion-small').slideDown( "fast" );
        $('.mo_rong').hide();
        $('.container-accordion').removeClass("bogoc");
        $(this).parent().find('.accordion-small').slideUp( "fast" );
        $(this).parent().find('.accordion-large').slideDown( "fast" );
        $(this).parent().find('.thu_gon').show();
        $(this).parent().find('.mo_rong').hide();
        $(this).parent().find('.container-accordion').removeClass("bogoc");
        $(this).parent().parent().parent().addClass('hasBoxOpened');
		setTimeout(function(){
		  box_open = 1;
		}, 100);
	});


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
    /*
	$('#cols-right').click(function() {
		if(box_open == 1){
        $('.box-mini').slideDown( "fast" );
        $('.box-large').slideUp( "fast" );
        $('.box_trinhdo').removeClass('hasBoxOpened');
		$('.accordion-large').slideUp( "fast" );
        $('.accordion-small').slideDown( "fast" );
		}
		box_open = 0;
    });
    */
    $('.block_over_click').click(function() {
		if(box_open == 1){
        $('.box-mini').slideDown( "fast" );
        $('.box-large').slideUp( "fast" );
        $('.box_trinhdo').removeClass('hasBoxOpened');
		$('.accordion-large').slideUp( "fast" );
        $('.accordion-small').slideDown( "fast" );
		}
		box_open = 0;
    });

	var w_do = $( window ).width();
	var w_con = $('.content_cols-right').width();
	var h_con = $('.content_cols-right').height();
	$('.block_over_click').css('width', '0px');
	if(w_do > 1178){
		$('.block_over_click').css('width', w_do - w_con + 'px');
		$('.block_over_click').css('height', h_con + 'px');
		$('.block_over_click').css('margin', '-24px');
	}

    /* header search form: start */
    var do_width = $( window ).width();
	$('[data-jq-dropdown]').click(show);
    var callbacks_list = $('.demo-callbacks ul');
    $('.demo-list input').on('ifCreated ifClicked ifChanged ifChecked ifUnchecked ifDisabled ifEnabled ifDestroyed', function(event){
        callbacks_list.prepend('<li><span>#' + this.id + '</span> is ' + event.type.replace('if', '').toLowerCase() + '</li>');
    }).iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%'
    });
    $('.demo-list-green input').on('ifCreated ifClicked ifChanged ifChecked ifUnchecked ifDisabled ifEnabled ifDestroyed', function(event){
        callbacks_list.prepend('<li><span>#' + this.id + '</span> is ' + event.type.replace('if', '').toLowerCase() + '</li>');
    }).iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
        increaseArea: '20%'
    });
    $('.modal-drop-mucluong').enscroll({
        showOnHover: false,
        verticalTrackClass: 'track3',
        verticalHandleClass: 'handle3',
        'zIndex': 999999
    });
    $('.box_notification_scroll').enscroll({
        showOnHover: false,
        verticalTrackClass: 'track3',
        verticalHandleClass: 'handle3',
        'zIndex': 999999
    });

    $('#btn_select_luong').click(function() {
        var numSelected = $('.user-info .box_mucluong .icheckbox_square-blue.checked').length;
        if(numSelected > 0) {
            if(numSelected < 10) {
                numSelected = "0" + numSelected;
            }
            var text = '<strong>Đang chọn ' + numSelected +' Mức lương</strong>';
        } else {
            var text = 'Tất cả mức lương';
        }
        $('.user-info  .box_mucluong .drop_filter_top').html(text);
        $('#user_menu_filter_mucluong').hide();
        if($('#search_box_header .box_mucluong .jq-dropdown-open').length > 0){
            $('#search_box_header .box_mucluong .jq-dropdown-open').removeClass('jq-dropdown-open');
        }
        // $('.user-info .box_mucluong .drop_filter_top').trigger('click');
        dim_color_other_element($(this));
    });
    $('#btn_select_kinh_nghiem').click(function() {
        var numSelected = $('.user-info .box_kinhnghiem .icheckbox_square-blue.checked').length;
        if(numSelected > 0) {
            if(numSelected < 10) {
                numSelected = "0" + numSelected;
            }
            var text = '<strong>Đang chọn ' + numSelected +' Kinh nghiệm</strong>';
        } else {
            var text = 'Tất cả kinh nghiệm';
        }
        $('.user-info .box_kinhnghiem .drop_filter_top').html(text);
        $('#user_menu_filter_kinhnghiem').hide();
        if($('#search_box_header .box_kinhnghiem .jq-dropdown-open').length > 0){
            $('#search_box_header .box_kinhnghiem .jq-dropdown-open').removeClass('jq-dropdown-open');
        }
        // $('.user-info .box_kinhnghiem .drop_filter_top').trigger('click');
        dim_color_other_element($(this));
    });

    $('#btn_search_time').click(function() {
        var numSelected = $('#cols-right .box_mucluong .icheckbox_square-blue.checked').length;
        if(numSelected > 0) {
            if(numSelected < 10) {
                numSelected = "0" + numSelected;
            }
            var text = '<strong>Đang chọn ' + numSelected +' Mức lương</strong>';
        } else {
            var text = 'Tất cả mức lương';
        }
        $('#cols-right .box_mucluong .drop_filter_top').html(text);
        $('#filter_mucluong').hide();
        $('#search_box_full .box_mucluong .jq-dropdown-open').removeClass('jq-dropdown-open');
        // $('#cols-right .box_mucluong .drop_filter_top').trigger('click');
        dim_color_other_element($(this));
    });


    $('#btn_search_time3').click(function() {
        var numSelected = $('#cols-right .box_kinhnghiem .icheckbox_square-blue.checked').length;
        if(numSelected > 0) {
            if(numSelected < 10) {
                numSelected = "0" + numSelected;
            }
            var text = '<strong>Đang chọn ' + numSelected +' Kinh nghiệm</strong>';
        } else {
            var text = 'Tất cả kinh nghiệm';
        }
        $('#cols-right .box_kinhnghiem .drop_filter_top').html(text);
        $('#filter_kinhnghiem').hide();
        $('#search_box_full .box_kinhnghiem .jq-dropdown-open').removeClass('jq-dropdown-open');
        // $('#cols-right .box_kinhnghiem .drop_filter_top').trigger('click');
        dim_color_other_element($(this));
    });

    $('#btn_search_nganhnghe').click(function() {
        var numSelected = $('.reg_box_nganhnghe .icheckbox_square-blue.checked').length;
        if (numSelected > 3) {
            var i = 1;
            $('.reg_box_nganhnghe .icheckbox_square-blue.checked').each(function(index, el) {
                if(i > 3) {
                    $(this).removeClass('checked');
                    $(this).find('input[type=checkbox]').prop('checked', false);
                }
                i++;
            });
        };
        var numSelected = $('.reg_box_nganhnghe .icheckbox_square-blue.checked').length;
        if(numSelected > 0) {
            if(numSelected < 10) {
                numSelected = "0" + numSelected;
            }
            var text = 'Đang chọn ' + numSelected +' Ngành nghề';
        } else {
            var text = 'Tất cả ngành nghề';
        }
        $('.reg_box_nganhnghe .txt-xanh-la-cay').html(numSelected);
        $('.reg_box_nganhnghe .drop_filter_top_reg').html(text);
        // $('.reg_box_nganhnghe .drop_filter_top_reg').trigger('click');
    });


    /*$('body').click(function() {
        $(this).find('.popup_down').hide();
        $('.user-info .dropdown_box').hide();
        $('.hda-overlayer').addClass('hidden');
    });*/

	$('.hda-overlayer').click(function() {
        $('.popup_down').hide();
        $('.user-info .dropdown_box').hide();
        $('.hda-overlayer').addClass('hidden');
    });

    $('.popup_down').click(function(e) {
        e.stopPropagation();
    });
    $('.main-menu ul li.notification').unbind('click');
    $('.main-menu ul li.notification').click(function(event) {
        event.stopPropagation();
        $('.main-menu ul li.notification .notification').fadeToggle(1);
        thongbao_readall();
        $.each($('.main-menu ul li'), function() {
            if(!$(this).hasClass('notification')) {
                $(this).find('.popup_down').hide();
				$('.hda-overlayer').addClass('hidden');
            }
        });
    });

    $('.main-menu ul li.dang_nhap').click(function(event) {
        event.stopPropagation();
        $('.main-menu ul li.dang_nhap .dang_nhap').fadeToggle(1);
        $.each($('.main-menu ul li'), function() {
            if(!$(this).hasClass('dang_nhap')) {
                $(this).find('.popup_down').hide();
				$('.hda-overlayer').addClass('hidden');
            }
        });
    });

    $('.main-menu ul li.loggedin').unbind('click');
    $('.main-menu ul li.loggedin').click(function(event) {
        event.stopPropagation();
        $('.main-menu ul li.loggedin .loggedin').fadeToggle(1);
        $.each($('.main-menu ul li'), function() {
            if(!$(this).hasClass('loggedin')) {
                $(this).find('.popup_down').hide();
				$('.hda-overlayer').addClass('hidden');
            }
        });
    });

    $('.main-menu ul li.tim-kiem-nang-cao').click(function(event) {
        event.stopPropagation();
        $('.main-menu ul li.tim-kiem-nang-cao .tim-kiem-nang-cao').fadeToggle(1);
        if($('.hda-overlayer').hasClass('hidden')) {
            $('.hda-overlayer').removeClass('hidden');
        } else {
            $('.hda-overlayer').addClass('hidden');
        }
        $.each($('.main-menu ul li'), function() {
            if(!$(this).hasClass('tim-kiem-nang-cao')) {
                $(this).find('.popup_down').hide();
            }
        });
    });


    if (do_width < 1012) {
        $('#sliding_menu_js_btn').hide();
    }
    if (do_width > 1012) {
        $('#sliding_menu_js_btn').show();
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

    $("select.select-style").size() > 0 && $("select.select-style").each(function() {
        var e = $(this).attr("data-maximum"),
            o = $(this).attr("data-disS");
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
    /* header search form: end */

    /* js scroll bar */
    $('.scrollbar_cus_right').enscroll2({
        showOnHover: false,
        verticalTrackClass: 'track3',
        verticalHandleClass: 'handle3'
    });
    var padding_d = $('.header').height();
    var padding_h = $('.title_box_left').height();
    if($('.header_right').get(0)) {
        var height = $( window ).height() - 64;
    } else {
        var height = $( window ).height() - padding_d;
    }
    $("#cols-right").css({"height":height + "px"});
    var windowWidth = $( window ).width();
    if(windowWidth < 1024){
        $("#cols-right").addClass('over-x');
    }else{
        $("#cols-right").removeClass('over-x');
    }
    /* right sidebar: end */
} );



(function($) {
    $.fn.openPopup = function(options) {
        $(this).load(options.url, function() {
            $(document).ready(function() {

                //load popup confirm
                $("#overlay_popup, #popup_content"+options.div).show();
                var height = $("#popup_content"+ options.div).height()/2;
                var width = $("#popup_content"+ options.div).width()/2;
                $("#pos_popup"+ options.div).css('top','50%');
                $("#pos_popup"+ options.div).css('left','50%');
                $("#pos_popup"+ options.div).css('margin-top',((-1)*height)+'px');
                $("#pos_popup"+ options.div).css('margin-left',((-1)*width)+'px');

                $("#overlay_popup, #popup_component" + options.div).show();


                if(options.hasScrollBar) {
                    var headerHeight = $(options.divHeader).height();
                    var footerHeight =  $(options.divFooter).height();
                    $(options.divContent).height((height*2)-headerHeight-footerHeight);
                }


                //close confirm
                $(".btn_close").click(function(){
                    //hide popup dang ky
                    $("#overlay_popup, #popup_component"+options.div).hide();

                });

                $('.scrollbar_cus_popup').enscroll({
                    showOnHover: false,
                    easingDuration: duration_enscroll,
                    verticalTrackClass: 'track3',
                    verticalHandleClass: 'handle3'
                });

                options.afterLoad.call(this);
            });
        });
    }
})(jQuery);

