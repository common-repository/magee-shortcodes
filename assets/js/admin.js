;(function($, window, document, undefined) {
    /* Init */
    function MageeShortcodesGenerator() {} 
    $.extend(MageeShortcodesGenerator.prototype, {
        container: '',
        k: 0,
        props:'',
        init: function() {
            this.btnClick()
        },
        setter: function(args='') {
            this.props = args
        },
        btnClick: function() {
            var app = this
            $(document).on('click', '.magee_shortcodes', function() {
                app.shortcodePopup($(this))
            })
            $(document).on('click', 'a.magee_shortcode_item', function() {
                var el = $(this)
                $(this).css({"pointer-events": "none" }).append('<i style="float:right;" class="fa fa-spinner fa-spin"></i>');
                app.shortcodeGenerator(el)
            })
            $(document).on('click', 'a.magee-shortcodes-home', function() {
                $('a.magee_shortcode_item').css({"pointer-events": "auto" })
                $('a.magee_shortcode_item').find('.fa-spinner').remove()
                app.goBack()
            })
            $(document).on('click', '.magee-shortcode-insert', function(e) {
                $(this).addClass('button-secondary').removeClass('button-primary').css({"pointer-events": "none" }).append('<i class="fa fa-spinner fa-spin"></i>');
                app.shortcodeInsert()
            })
            // activate upload button
	        $(document).on('click', '.magee-upload-button', function(e) {
                var el = $(this)
                e.preventDefault();
                app.uplaodButton(el)
            })
            // column remove and add
            $(document).on('click', 'a.child-clone-row-remove.magee-shortcodes-button', function() {
                var el = $(this)
                app.removeColumn(el)
            })
            $(document).on('click', 'a.child-shortcode-add', function() {
                app.addColumn()
            })
            // type choose to show
	        $(document).on('click', '.choose-show', function() {
                var el = $(this)
                app.choiceControl(el)
            })
            // choose icon to show
            $(document).on('click', '.magee_custom_icon', function() {
                var el = $(this)
                app.chooseIcon(el)
            })
            $(document).on('click', '.magee-shortcodes-preview',function(e) {
                e.stopPropagation();
                app.shortcodePrivew()
            })
            $(document).on('click', '.magee-preview-delete', function() {
                app.deletePrivew()
            })
            $(document).on('keyup', '#magee_shortcode_search', function() {
                app.shortcodeSearch($(this))
            })
            
        },
        initOptions: function (){
            var app = this
            app.numberControl()
            $('.choose-show').each(function() {
                var el = $(this)
                el.find('.choose-show-param').each(function(){
                    var value = $(this).parents('.param-item').find('.magee-form-choose').val()
                    value = value == ''? 'no':value

                    if($(this).attr('name') == value){
                        $(this).css('display','block')
                    }else{
                        $(this).css('display','none')
                    }
                    if($(this).text() == 'Yes'){
                        $(this).css({'background-color':'#CCF7D5','color': '#17A534','font-weight': 'bold'})
                    }else if($(this).text() == 'No'){
                        $(this).css({'background-color':'#FFDEDE','color': '#ff0000','font-weight': 'bold'})
                    }
                })
            })
            $(document).find('.wp-color-picker-field').each(function(e) {
                var el = $(this)
                app.colorpickerControl(el)
            })
        },
        colorOptions: function() {
            var app = this
            return {
                change: function(event, ui) {
                    app.container.find('.wp-color-picker-field').each(function() {	
                        var color = $(this).parents('.wp-picker-container').find('.wp-color-result').css("background-color")
                        $(this).css("background-color",color)
                        var top = 0
                        if ($(this).parents('.wp-picker-container').find('a.iris-square-value').css("top")){
                            top = parseInt($(this).parents('.wp-picker-container').find('a.iris-square-value').css("top").replace('px',''))
                        }
                        var percent = parseInt($(this).parents('.wp-picker-container').find('div.iris-slider-offset span').css("bottom"))
                        if (top < 87 && percent < 97) {
                            $(this).css("color","black")
                        }else{
                            $(this).css("color","white")
                        }
                    })
                },
                defaultColor: true,
            };
        },
        shortcodePrivew: function() {
            var preview_height = $("#TB_window").height()-40
		
            $("#preview").css({"display":"block","position": "absolute","width": "1200px","height":preview_height,"top": "0px","left": "-200px"})
            
            var height = $("#preview").height()-$(".preview-title").height()-50
            var  iframe = "<iframe id='magee-sc-form-preview' class='magee-sc-form-preview' width='100%' height='"+height.toString()+"'></iframe>"
            
            if ($("#magee-sc-form-preview").length > 0) {
                $("#magee-sc-form-preview").remove()
            }		
            $("#preview").append(iframe)
            
            var html = this.container.find('form').serializeArray()
            var shortcode = this.container.find('form').find("input#magee-shortcode").val()

            $.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: "html",
                data:{action: "preview_js", shortcode: shortcode },
                success:function(data) {
                    $("#magee-sc-form-preview").contents().find("head").append(data)
                    $("#magee-sc-form-preview").contents().find("body").append("<img alt='loading' class='loading' src='"+magee_params.themeurl+"/images/AjaxLoader.gif' />")
                    $.ajax({
                        type: "POST",
                        url: ajaxurl,
                        dataType: "html",
                        data:{name:shortcode,  action:"live_preview",preview:html},
                        success:function(data) {
                            data += '<script>if (typeof jQuery !== "undefined") {var magee_shortcodes = jQuery().MageeShortcodes(); magee_shortcodes.init();}</script>'
                            $("#magee-sc-form-preview").contents().find(".loading").remove()
                            $("#magee-sc-form-preview").contents().find("body").append(data);
                            $("#magee-sc-form-preview").contents().find("a").on("click",function(e) {
                                if ($(this).attr("href") == "#") {
                                    e.preventDefault()
                                }
                            });
                        },   
                        error:function() {
                        }
                    });
                },
                error:function() {
                }
            });
        },
        deletePrivew: function() {
            $("#preview").css('display','none');
		    $("#magee-sc-form-preview").remove()
        },
        shortcodeSearch: function(input){
            var keyword = input.val()
         
            if ( '' !== keyword ){
                $('.magee_shortcodes_list li').hide()
                var re = new RegExp(keyword, 'i');
                $('.magee_shortcodes_list li').each(function(){
                    var text = $(this).text()
                    if(text.match(re)){
                        $(this).show()
                    }
                })
            }else{
                $('.magee_shortcodes_list li').show()
            }
        },
        shortcodePopup: function(params={}){
            var popup = 'shortcode-generator'
            var target = params.data('target')

            if (typeof params != 'undefined' && params.identifier) {
                popup = params.identifier
            }
            var magee = MSEditorL10n.insertShortcode + " " + MSEditorL10n.ver + "<span class='shortcode_show_name'></span><a class='link-doc' target='_blank' href='"+MSGenerator.docUrl+"'>"+MSEditorL10n.doc+"</a><a class='link-forum' target='_blank' href='"+MSGenerator.forumUrl+"'>"+MSEditorL10n.forums+"</a>"
            var height = $(window).height()-150
            tb_show(magee, ajaxurl + "?action=magee_shortcodes_popup&popup=" + popup + "&target=" + target + "&width=800&height="+height)
        },
        goBack: function() {
            var height = $(window).height()-150
            $('#TB_ajaxContent').css('height',height)	
            $("#magee-shortcodes-settings").hide()
            $("#TB_footer").remove()
            $("#magee-shortcodes-settings-innter").html("")
            $(".magee_shortcodes_list").show()
            $("#magee_shortcode_search").show()
            $("#TB_ajaxWindowTitle").find("i").remove()
            $("#TB_ajaxWindowTitle").find("span").html('')
            $("#TB_ajaxWindowTitle").html($("#TB_ajaxWindowTitle").html().replace(/&nbsp;/g,''))
            $("#preview").css("display","none")
            $("#magee-sc-form-preview").remove()
        },
        chooseIcon: function(el) {
            el.each(function() {
                $(this).parents(".param-item").find(".iconpicker").css('display','block')
                //iconpicker
                $(this).parents(".param-item").find(".iconpicker i").click(function() {
                    var icon = $(this).data('name')
                    $(this).addClass('selected').siblings().removeClass('selected')
                    $(this).parents('.param-item').find('input').val(icon)
                    $(this).parent(".iconpicker").css('display','none')
                });
            });
        },
        uplaodButton: function(el) {

            upid = el.attr('data-upid')

            if (el.hasClass('remove-image')) {
                $('.magee-upload-button[data-upid="' + upid + '"]').parent().find('img').attr('src', '').hide()
                $('.magee-upload-button[data-upid="' + upid + '"]').parent().find('input').val('').change()
                $('.magee-upload-button[data-upid="' + upid + '"]').text('Upload').removeClass('remove-image')

                return
            }

            var file_frame = wp.media.frames.file_frame = wp.media({
                title: MSEditorL10n.select_img,
                button: {
                    text: MSEditorL10n.select_img,
                },
                frame: 'post',
                multiple: false  // Set to true to allow multiple files to be selected
            });

            file_frame.open();

            $('.media-menu a:contains(Insert from URL)').remove()

            file_frame.on( 'select', function() {
                var selection = file_frame.state().get('selection')
                selection.map( function( attachment ) {
                    attachment = attachment.toJSON();

                    $('.magee-upload-button[data-upid="' + upid + '"]').parent().find('img').attr('src', attachment.url).show()
                    $('.magee-upload-button[data-upid="' + upid + '"]').parent().find('input').val(attachment.url).change()

                });

                $('.magee-upload-button[data-upid="' + upid + '"]').text('Remove').addClass('remove-image')
                $('.media-modal-close').trigger('click')
            });

            file_frame.on( 'insert', function() {
                var selection = file_frame.state().get('selection');
                var size = $('.attachment-display-settings .size').val()

                selection.map( function( attachment ) {
                    attachment = attachment.toJSON()

                    if (!size) {
                        attachment.url = attachment.url
                    } else {
                        attachment.url = attachment.sizes[size].url
                    }

                    $('.magee-upload-button[data-upid="' + upid + '"]').parent().find('img').attr('src', attachment.url).show()
                    $('.magee-upload-button[data-upid="' + upid + '"]').parent().find('input').val(attachment.url).change()

                });

                $('.magee-upload-button[data-upid="' + upid + '"]').text('Remove').addClass('remove-image')
                $('.media-modal-close').trigger('click')
            });
        },
        addColumn: function() {
    
            var html = '<div class="param-item"><a id="child-shortcode-remove" href="#" class="child-clone-row-remove magee-shortcodes-button ">'+MSEditorL10n.remove+'</a></div>'
            var copy = this.container.find(".magee-shortcodes-settings-inner-clone")

            copy.find('.wp-picker-container').each(function() {
                var colorname = $(this).find('input').attr('name')
                var colorid = $(this).find('input').attr('id')
                var colorval = $(this).find('input').val()
                var colirfield = '<input type="text" class="magee-form-text magee-cinput wp-color-picker-field" name="' +colorname+ '" id="' +colorid+ '" value="' +colorval+ '" />'
                $(this).replaceWith(colirfield)
            })
            $clone = copy.html()
           
            var count = $('.column-shortcode-inner').length
            var wraptext = '<div class="column-shortcode-inner">'+$clone+html+'</div>'
            
            $(".shortcode-add").before(wraptext)
            //add iconpicker data-unqid
            $source = $('.column-shortcode-inner').eq(count)
            if ($source.find('.magee-upload-button').length>0) {
                var number = $source.find('.magee-upload-button').length
                for(var i=0;i<number;i++) {
                    this.k++
                    var value = $source.find('.magee-upload-button').eq(i).attr('data-upid')
                    $source.find('.magee-upload-button').eq(i).attr('data-upid',value+this.k)
                }
            };
            this.initOptions()
        },
        removeColumn: function(el) {
            el.parents(".column-shortcode-inner").remove()
        },
        numberControl: function() {
            //input number controls
            this.container.find('.magee-form-number').each(function() {
                var number_obj = $(this);
                var number = parseInt($(this).attr('max'));
                var total =parseInt($(this).parent('.field').find('.probar').width())
                var op = total/number;
                var val = parseInt($(this).val())
                var left = op*val.toString();
                $(this).parent('.field').find('.probar-control').css('left',left)
                $(this).parents('.param-item').find('.probar').click(function(e) {
                    e = e||window.event
                    var x2 = e.clientX
                    var x3 = $(this).parents('.param-item').find('.probar').offset().left

                    var lv = (x2-x3)/total*100
                    $(this).parents('.param-item').find('.probar-control').css('left',lv.toString()+'%')
                    if (Math.round(parseInt($(this).parents('.param-item').find('.probar-control').css('left'))/op) > number) {
                        number_obj.val(number)
                    }else{
                        number_obj.val(Math.round(parseInt($(this).parents('.param-item').find('.probar-control').css('left'))/op))
                    }
                });
                $(this).change(function() {
                    if (parseInt($(this).val()) > number) {
                        $(this).parents('.param-item').find('.probar-control').css('left','100%')
                    }else{
                        newleft = op*parseInt($(this).val()).toString();
                        $(this).parents('.param-item').find('.probar-control').css('left',newleft)
                    }
                });
                var z  = 0
                var x1,y1
                $(this).parents('.param-item').find('.probar-control').mousedown(function(e) {
                    z = 1
                    e = e||window.event
                    x1 = $(this).parents('.param-item').find('.probar').offset().left
                    y1 = x1 + total
                });
                
                $(document).mousemove(function(e) {
                    if (z == 1) {
                        var e=e||window.event
                        var x = e.clientX
                        if (x>y1 || x< x1) {
                            if (x>y1) {	 
                                number_obj.parents('.param-item').find('.probar-control').css('left','100%')
                                }
                            if (x < x1) {
                                number_obj.parents('.param-item').find('.probar-control').css('left','0%')
                                }
                        }else{
                            var pc = (x-x1)/total*100
                            number_obj.parents('.param-item').find('.probar-control').css('left',pc.toString()+'%')
                            number_obj.val(Math.round(parseInt(number_obj.parents('.param-item').find('.probar-control').css('left'))/op))
                        }
                    }
                });
                $(document).mouseup(function() { z = 0; })
            });
        },
        choiceControl: function(el) {

            //input choose controls
  
            if (el.find('.choose-show-param').eq(0).is(':hidden')) {
                var value = el.find('.choose-show-param').eq(0).attr('name')
                el.find('.choose-show-param').eq(0).css('display','block')
                el.find('.choose-show-param').eq(1).css('display','none')
                el.parents('.param-item').find('.magee-form-choose').val(value)
                if (el.find('.choose-show-param').eq(1).text() == 'Yes') {el.css({'background-color':'#CCF7D5','color': '#17A534','font-weight': 'bold'});}
                if (el.find('.choose-show-param').eq(1).text() == 'No') {el.css({'background-color':'#FFDEDE','color': '#ff0000','font-weight': 'bold'});}
            }else{
                var value = el.find('.choose-show-param').eq(1).attr('name')
                el.find('.choose-show-param').eq(1).css('display','block')
                el.find('.choose-show-param').eq(0).css('display','none')
                el.parents('.param-item').find('.magee-form-choose').val(value)
                if (el.find('.choose-show-param').eq(0).text() == 'Yes') {el.css({'background-color':'#CCF7D5','color': '#17A534','font-weight': 'bold'});}
                if (el.find('.choose-show-param').eq(0).text() == 'No') {el.css({'background-color':'#FFDEDE','color': '#ff0000','font-weight': 'bold'});}
            }
            

        },
        colorpickerControl: function(el) {
            //colorpicker controls
            var colorOptions = this.colorOptions()
            el.wpColorPicker(colorOptions)
            var color = el.attr('value')
            el.css("background-color",color)
            var since = 0
            var picker = el.parents('.wp-picker-container')
            picker.find('.wp-picker-holder').mouseover(function(e) {
                since = 0
                e.cancelBubble=true
            });
            picker.find('.wp-picker-holder').mouseout(function(e) {
                since = 1
                e.cancelBubble=true
            });
            $(document).mousedown(function() {
                if (since == 1) {
                    picker.find('.wp-picker-holder').css("display","none")
                }
            });
            picker.find('.wp-color-result').click(function() {
                picker.find('.wp-picker-holder').css("display","block")
            });
        },
        shortcodeGenerator: function(el) {
            var colorOptions = this.colorOptions()
            var shortcode = el.data("shortcode")
            var form      = el.parents("div#magee_shortcodes_container form")
            this.container = $('#magee_shortcodes_container')
            var app = this

            $.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: "html",
                data: { shortcode: shortcode, action: "magee_shortcode_form" },
                success:function(data) {
                    
                    form.find(".magee_shortcodes_list").hide()
                    $("#magee_shortcode_search").hide()
                    form.find("#magee-shortcodes-settings").show()
                    form.find("#magee-shortcodes-settings .current_shortcode").text(shortcode)
                    form.find("#magee-shortcodes-settings #magee-shortcode").val(shortcode)
                    form.find("#magee-shortcodes-settings-inner").html(data)
                    //iconpicker upload load 
                    $(".magee-shortcodes-settings-inner-clone").html(form.find(".column-shortcode-inner").html())
                    if (form.find('.magee-upload-button').length>0) {
                        var number = form.find('.magee-upload-button').length;
                        for(var i=0;i<number;i++) {
                            app.k++
                            var value = form.find('.magee-upload-button').eq(i).attr('data-upid')
                            form.find('.magee-upload-button').eq(i).attr('data-upid',value+app.k)
                        }
                    }
                
                    var c_btn = '<div class="TB_footer" id="TB_footer">'
                    c_btn += '<div class="magee-shortcode-return">'+MSEditorL10n.top+'</div>'
                    c_btn += '<div class="magee-shortcode-actions magee-shortcode-clearfix">'
                    c_btn += '<a class="button button-large magee-shortcodes-home"  href="javascript:void(0);"><img src="'+MSGenerator.imgUrl+'list.png"/></a>'
                    c_btn += '<a class="button button-primary button-large magee-shortcodes-preview" >'
                    c_btn += '<img style="margin-bottom:-3px;margin-right:5px" src="'+MSGenerator.imgUrl+'preview.png"/>'+MSEditorL10n.preview+''
                    c_btn += '</a>'
                    c_btn += '<a class="button button-primary button-large magee-shortcode-insert"  href="javascript:void(0);">'
                    c_btn += '<img style="margin-bottom:-3px;margin-right:5px" src="'+MSGenerator.imgUrl+'insert_shortcode.png"/>'+MSEditorL10n.insert+''
                    c_btn += '</a>'
                    c_btn += '</div>'
                    c_btn += '</div>'
                    $('#TB_window').append(c_btn)
                    var content_height = $('#TB_window').outerHeight()
                    var title_height = $('#TB_title').outerHeight()
                    var footer_height = $('#TB_footer').outerHeight()
                    $('#TB_ajaxContent').css({'height':content_height-title_height-footer_height-15})
                    //add shortcode name 
                    $('#TB_ajaxWindowTitle> span:first-child').before("&nbsp;<i class='fa fa-angle-right title_icon' ></i>&nbsp;")
                    $('#TB_ajaxWindowTitle> span').append($("#magee-shortcodes-settings-inner h2").text())
                    //when image compare to be hidden
                    var no_preview = $('#no_preview').val()
                    if(no_preview ) {
                        $('.TB_footer .magee-shortcodes-preview').css("display","none")
                    }

                    $("#TB_ajaxContent").scroll(function() {
                        var scrollvalue = $(this).scrollTop()
                        if ( scrollvalue >= 400 ) {
                            $(".magee-shortcode-return").css("display","block")
                        }else{ 
                            $(".magee-shortcode-return").css("display","none")
                        }
                    });

                    $(".magee-shortcode-return").click(function() {
                        $("#TB_ajaxContent").animate({scrollTop:0}, 500)
                    });

                    $('.magee-form-datetime').datetimepicker({dateFormat: "yy-mm-dd HH:ii:ss", allowTimes:[]})
                },
                complete: function(){
                    app.container.find('.wp-color-picker-field').wpColorPicker(colorOptions)
                    app.initOptions()
                },
                error:function() { }
            });
        },
        shortcodeInsert: function() {
            var form      = this.container.find("form")
            var shortcode = form.find("input#magee-shortcode").val()
            var target    = this.container.data('target')
            console.log('target', target)
            $.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: "html",
                data: { shortcode: shortcode, action: "magee_create_shortcode", attr:form.serializeArray()},
                success:function(data) {
                    if (window.MSG.props){
                        window.MSG.props.props.setAttributes({
                            content: window.MSG.props.props.attributes.content + data
                        });
                    } else {
                        window.magee_wpActiveEditor = window.wpActiveEditor
                        window.wpActiveEditor = target
                        window.wp.media.editor.insert(data)
                        window.wpActiveEditor = window.magee_wpActiveEditor
                    }
                    tb_remove()
                },
                error:function() {
                    tb_remove()
                }
            });
        }

    })
    $.fn.MageeShortcodesApi = function(){
        var App = new MageeShortcodesGenerator();
        return App.setter;
    }
    $(function() {
        var Generator = new MageeShortcodesGenerator()
        Generator.init()
    })
    window.MSG = {}
    window.MSG.Api = jQuery().MageeShortcodesApi()

})(window.jQuery, window, document);
