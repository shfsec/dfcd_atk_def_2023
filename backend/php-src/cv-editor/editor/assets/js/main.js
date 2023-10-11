;(function($) {
    $(function() {
        if ($('.cv-grid').length) {
            $('.cv-grid').each(function() {
                var elm = this, jelm = $(elm);

                jelm.find('.imgBox').on('show-preview', function() {
                    var jbox = $(this);
                    var jcontent = $(jbox.data('content'));

                    jelm.find('.selectedItem').removeClass('selectedItem');

                    // jelm.find('.cv-expander').appendTo(jelm.find('.cv-expander').data('parent'));
                    jbox.trigger('hide-preview', [1]);
                    jbox.trigger('hide-preview');
                    if (jcontent.length) {
                        if (!jcontent.data('parent')) jcontent.data('parent', jcontent.parent());
                        jcontent.insertAfter(jbox).slideUp(0).slideDown();

                        jbox.addClass('selectedItem');

                        jcontent.find('.cv-expander-close').unbind('click').bind('click', function() {
                            jbox.trigger('hide-preview');
                        });
                    }

                    $("#cols-right").animate({
                        scrollTop: $("#cols-right").scrollTop() + jcontent.offset().top - 80 // trick VL24H
                    }, {
                        duration: 400
                    });
                }).on('hide-preview', function(ev, tmp) {
                    var jbox = $(this);

                    jelm.find('.cv-expander').slideUp(tmp ? 0 : 'medium', function() {
                        $(this).appendTo(jelm.find('.cv-expander').data('parent'));
                        if (!tmp) jbox.removeClass('selectedItem');
                    });
                });

                jelm.find('.imgBox .xem-truoc').on('click', function() {
                    var jbox = $(this).parents('.imgBox');

                    jbox.trigger('show-preview');
                });
            });
        }

        // color switcher
        if ($('.cv-color-switcher').length) {
            $('.cv-color-switcher').each(function() {
                var container = this, jcontainer = $(container), cdata = jcontainer.data();

                // loop each oclor
                jcontainer.find('.cv-color-switch').each(function() {
                    var elm = this, jelm = $(elm);

                    // load color
                    jelm.find('span').css('background-color', jelm.data('color'));

                    // active
                    jelm.on('click', function() {
                        jcontainer.find('.cv-color-switch').removeClass('active');
                        jelm.addClass('active');

                        $(cdata.previewContainer).attr('src', jelm.data('preview'));

                        jcontainer.trigger('colorChanged', [jelm.data('color')]);
                    });
                }).filter(':first-child').trigger('click');
            });
        }

        // fadeLeft effect
        $('#cols-right').on('scroll', function() {
            $(".fadeLeft").each(function(){
                var pos2 = $(this).offset().top;

                var winTop = $(window).scrollTop();
                if (pos2 < winTop + $(window).height()) {
                    $(this).addClass("fadeInLeft");
                }
            });

            $(".fadeRight").each(function(){
                var pos2 = $(this).offset().top;

                var winTop = $(window).scrollTop();
                if (pos2 < winTop + $(window).height()) {
                    $(this).addClass("fadeInRight");
                }
            });
        });
    });
})(jQuery);

;(function() {
    $.fn.datepicker.language = {
        vn: {
            days: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
            daysShort: ['CN', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy'],
            daysMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            months: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6', 'Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
            monthsShort: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
            today: 'Hiện nay',
            clear: 'Xóa',
            dateFormat: 'dd/mm/yyyy',
            timeFormat: 'hh:ii aa',
            firstDay: 0
        }
    };

    $.dataValidate = function(data, rules) {
        var invalid = false;

        for (var k in rules) {
            if (invalid) break;

            var rule = rules[k];

            switch (k) {
                case 'required':
                    if (typeof(data) == 'string' && data.length == 0) {
                        invalid = true;
                    }
                    break;

                case 'maxLength':
                    if (typeof(data) == 'string' && data.length > rule) {
                        invalid = true;
                    }
                    break;

                case 'email':
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    invalid = !re.test(data);
                    break;
            }
        }

        return invalid === false;
    }

    window.updateCV = function () {
        if ($('.cv-editor').length) {
            $('.cv-editor').each(function() {
                var editor = this, jeditor = $(editor), editorData = jeditor.data();
                var jeditorContent = $('<div class="cv-editor-content"></div>');

                jeditor.append(jeditorContent);

                jeditor.on('save.cv', function() {
                    var formData = [];
                    jeditor.find('[data-name]').each(function() {
                        var jinput = $(this);
                        var name = jinput.data('name'), value = jinput.data('value');

                        if (name.indexOf('__I__') != -1) {
                            var _i = 0;
                            if (jinput.parents('[data-iteration]').length) {
                                _i = jinput.parents('[data-iteration]').data('iteration');
                            }

                            name = name.replace('__I__', _i);
                        }

                        formData.push({
                            name: name,
                            value: value ? value : jinput.text()
                        });
                    });

                    console.log(formData);
                    jeditor.data('form-serialize', $.param(formData));

                    // var formSerialize = [];
                    // for (i in formData) {
                    //     formSerialize.push(formData[i].name + '=' + formData[i].value);
                    // }
                    //
                    // // console.log(formSerialize);
                    // // console.log(formSerialize.join('&'));
                    //
                    // jeditor.data('form-serialize', formSerialize.join('&'));
                });

                $.ajax({
                    url: editorData.url,
                    dataType: 'html',
                    success: function(html) {
                        jeditorContent.html(html);
                        changesDefinition = changesDefinition || [];
                        jeditor.data('changesDefinition', changesDefinition);

                        jeditor.on('changeColor', function(e, color) {
                            var changesDefinition = jeditor.data('changesDefinition');
                            var colors = changesDefinition.color;
                            var inlineStyles = [];

                            for (var attr in colors)
                            {
                                for (var i = 0; i < colors[attr].length; i++) {
                                    var selector = colors[attr][i];

                                    if (selector.indexOf(':before') >= 0) {
                                        inlineStyles[selector] = [attr, color];
                                    } else {
                                        jeditor.find(selector).css(attr, color);
                                        if(cv_pattern_id == 3)
                                            jeditor.find('.fcv.fcv-la').css('border', '8px solid '+color);
                                    }
                                }
                            }

                            //console.log(inlineStyles);

                            if (inlineStyles) {
                                var jInlineColorStyles = jeditor.find('#color-styles');
                                if (!jInlineColorStyles.length) {
                                    jInlineColorStyles = $('<style id="color-styles"></style>');
                                    jInlineColorStyles.appendTo(jeditorContent);
                                }

                                for (selector in inlineStyles) {
                                    jInlineColorStyles.append(selector + '{'+inlineStyles[selector][0]+':'+inlineStyles[selector][1]+'!important;}');
                                }
                            }
                        });

                        jeditor.on('changeFontsize', function(e, delta) {
                            var changesDefinition = jeditor.data('changesDefinition');
                            var fontSize = changesDefinition.fontSize;
                            var defaultFontSize = changesDefinition.defaultFontSize;
                            
                            for (var selector in fontSize)
                            {
                                var multiplier = fontSize[selector];
                                if (!jeditor.find(selector).data('fontSize')) {
                                    jeditor.find(selector).data('fontSize', parseInt(jeditor.find(selector).css('fontSize')));
                                }
                             
                                var currentFontSize = jeditor.find(selector).data('fontSize');
                                currentFontSize = currentFontSize ? currentFontSize : defaultFontSize;
                                jeditor.find(selector).css('fontSize', currentFontSize + (1 * multiplier * delta));
                                
                            }
                        });

                        jeditor.on('changeLineheight', function(e, delta) {
                            var changesDefinition = jeditor.data('changesDefinition');
                            var lineHeight = changesDefinition.lineHeight;
                            var defaultLineHeight = changesDefinition.defaultLineHeight;

                            for (var selector in lineHeight)
                            {
                                var multiplier = lineHeight[selector];
                                if (!jeditor.find(selector).data('lineHeight')) {
                                    jeditor.find(selector).data('lineHeight', parseInt(jeditor.find(selector).css('lineHeight')) / 12);
                                }
                                
                                var currentLineHeight = jeditor.find(selector).data('lineHeight');
                                currentLineHeight = currentLineHeight ? currentLineHeight : defaultLineHeight;
                                jeditor.find(selector).css('lineHeight', currentLineHeight + (1 * multiplier * delta));
                            }
                        });



                        jeditor.find('.allow-editable').each(function() {
                            var elm = this, jelm = $(elm), data = jelm.data();

                            // validation
                            jelm.on('doneEdit', function(e, text, value) {
                                var jthis = $(this);

                                if (text) {
                                    jthis.text(text)
                                }

                                if (!value) {
                                    value = jthis.text().trim();
                                }

                                jthis.data('value', value);

                                // validate
                                if ($.dataValidate(value, jthis.data('validation'))) {
                                    jthis.removeClass('editable-error');
                                } else {
                                    jthis.addClass('editable-error');
                                }
                            });

                            switch (data.type) {
                                case 'date':
                                    jelm.on('click', function() {
                                        var data = jelm.data();
                                        var options = data.date || {};
                                        options = $.extend({}, {
                                            container: editor,
                                            language: 'vn',
                                            minView: data.view ? data.view : 'days',
                                            view: data.view ? data.view : 'days',
                                            todayButton: function(inst) {
                                                jelm.data('value', 'now');
                                                jelm.text($.fn.datepicker.language[inst.opts.language].today);
                                                inst.hide();
                                            },
                                            autoClose: true,
                                            dateFormat: data.format ? data.format : 'MM yyyy',
                                            onSelect: function (formattedDate, date, inst) {
                                                
                                               
                                                var getDate = date.getDate();
                                                var getMonth = date.getMonth() + 1;
                                                var getFullYear = date.getFullYear();
                                                if(getDate < 10)
                                                    getDate = '0' + getDate;
                                                if(getMonth < 10)
                                                    getMonth = '0' + getMonth;
                                                if(getFullYear < 10)
                                                    getFullYear = '0' + getFullYear;
                                                
//                                                console.log(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
//                                                console.log(getFullYear + '-' + getMonth + '-' + getDate);
                                                jelm.data('value', getFullYear + '-' + getMonth + '-' + getDate);
                                                jelm.text(formattedDate);
                                            }
                                        }, options);

                                        if (typeof(options.maxDate) != 'undefined' && typeof(options.maxDate) != 'Date') {
                                            options.maxDate = (options.maxDate == 'today' ? new Date() : new Date());
                                        }

                                        jelm.datepicker(options);
                                        var datepicker = jelm.datepicker().data('datepicker');
                                        datepicker.show();
                                        // jelm.trigger('click');
                                    });
                                    break;

                                case 'select':
                                    jelm.on('click', function(e) {
                                        e.stopPropagation();

                                        if (!jelm.data('dropdown')) {
                                            var jdiv = $('<div class="wrapper-dropdown-3"></div>');
                                            var jul = $('<ul class="dropdown"></ul>');
                                            jdiv.append(jul);

                                            if (data.selection) {
                                                for (k in data.selection) {
                                                    jul.append('<li data-value="'+k+'">'+data.selection[k]+'</li>');
                                                }
                                            }

                                            jelm.data('dropdown', jdiv);

                                        } else {
                                            var jdiv = jelm.data('dropdown');
                                            var jul = jdiv.find('.dropdown');
                                        }

                                        jul.on('click', 'li', function(e) {
                                            e.stopPropagation();
                                            jelm.trigger('doneEdit', [$(this).text(), $(this).data('value')]).trigger('close');
                                        });

                                        $('body').one('click', function(e) {
                                            jelm.trigger('close');
                                        });

                                        jdiv.appendTo(jeditor);
                                        jdiv.fadeOut(0);
                                        jdiv.css({
                                            top: jelm.offset().top - jeditor.offset().top + jelm.outerHeight() + 8,
                                            left: jelm.offset().left - jeditor.offset().left
                                        }).fadeIn(200);
                                    }).on('close', function() {
                                        if (jelm.data('dropdown')) {
                                            jelm.data('dropdown').fadeOut(200, function() {
                                                $(this).remove();
                                            });
                                        }
                                    });
                                    break;

                                case 'phone':
                                case 'email':
                                case 'textarea':
                                case 'text':
                                default:
                                    jelm.prop('contenteditable', true);
                                    jelm.prop('spellcheck', false);

                                    jelm.on('blur', function() {
                                        jelm.trigger('doneEdit');
                                    });
                                    break;
                            }
                        });

                        /** INIT TOOLBOX */
                        var jbox_toolbox = $('<div id="cvp-toolbox" class="cvp-toolbox"><div></div></div>');
                        // prepare buttons for box toolbox
                        var jtoolbox_up = $('<a href="#"><i class="fa fa-caret-up "></i></a>');
                        var jtoolbox_down = $('<a href="#"><i class="fa fa-caret-down "></i></a>');

                        jtoolbox_up.appendTo(jbox_toolbox.find('div'));
                        jtoolbox_down.appendTo(jbox_toolbox.find('div'));

                        jtoolbox_up.on('click', function(e) {
                            e.preventDefault();
                            $(this).closest('.cvp-box').insertBefore($(this).closest('.cvp-box').prev('.cvp-box')).trigger('blur.cv');
                        });

                        jtoolbox_down.on('click', function(e) {
                            e.preventDefault();
                            $(this).closest('.cvp-box').insertAfter($(this).closest('.cvp-box').next('.cvp-box')).trigger('blur.cv');
                            jbox_toolbox.trigger('destroy.cv');
                        });

                        jbox_toolbox.on('initialize.cv', function(e, jbox) {
                            if (!jbox.prev('.cvp-box').length) {
                                jtoolbox_up.addClass('hidden');
                            }

                            if (!jbox.next('.cvp-box').length) {
                                jtoolbox_down.addClass('hidden');
                            }
                        });

                        jbox_toolbox.on('destroy.cv', function(e, jbox) {
                            jtoolbox_up.removeClass('hidden');
                            jtoolbox_down.removeClass('hidden');
                        });

                        // cvp-box
//                        jeditor.find('.cvp-box').on('active.cv', function() {
//                            var jbox = $(this);
//                            jeditor.find('.cvp-box').addClass('dimmed');
//                            jbox.addClass('active').removeClass('dimmed');
//
//                            jbox_toolbox.appendTo(jbox).css({
//                                // top: jbox.offset().top - jeditor.offset().top,
//                                // left: jbox.offset().left - jeditor.offset().left,
//                                // height: jbox.outerHeight(),
//                                // width: jbox.outerWidth()
//                            }).trigger('initialize.cv', [jbox]);
//                        }).on('blur.cv', function() {
//                            var jbox = $(this);
//
//                            jeditor.find('.cvp-box').removeClass('dimmed');
//                            jbox.removeClass('active');
//
//                            jbox_toolbox.detach().trigger('destroy.cv', [jbox]);
//                        });
//
//                        jeditor.find('.cvp-box').hover(function() {
//                            $(this).trigger('active.cv');
//                        }, function() {
//                            $(this).trigger('blur.cv');
//                        });
                        
                        //@haipn Check mac dinh color, font size, line height da dc luu trong CV mau
                        color_selected = window['color_selected'] || '';
                        $('[data-color="'+color_selected+'"]').trigger('click');
                      
                        //Xoa nhung phan chua co thong tin 
                        //Start Remove html chua co thong tin
                        var arr_id = ["#education", "#experience", "#additional-information", '#references', '#tinhoc', '#language', '#interests', '#skills'];
                        $.each(arr_id, function(index, item_id) {
                            if($(item_id).find('.box-content').text().trim() == "Chưa có thông tin")
                            {
                                $(item_id).remove();
                            }
                        });
                        //End Remove html chua co thong tin
                    }
                });
            });
        }


        
    };
    $(updateCV);

    // save CV
    $('#saveCV').on('click', function() {
    });
    
    
    // switch Color
    $('#cv-editor-switch-colors').on('colorChanged', function(e, color) {
        $('#cv-editor-1').trigger('changeColor', [color]);
    });

    // line height
    $('#cv-adjust-fontsize').on('input', function(e) {
        $('#cv-editor-1').trigger('changeFontsize', [this.value]);
    });

    $('#cv-adjust-lineheight').on('input', function(e) {
        $('#cv-editor-1').trigger('changeLineheight', [this.value]);
    });
    

})(jQuery);