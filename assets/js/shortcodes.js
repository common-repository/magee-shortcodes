;(function($, window, document, undefined) {
    /* Init */
    function MageeShortcodes() {} 
    $.extend(MageeShortcodes.prototype, {
        init: function() {
            this.initShortcodes()
            this.general()
            this.animation()
            this.heading()
            this.resize()
        },
        initShortcodes: function() {
            this.shortcodeAccordion()
            this.shortcodeAudioplayer()
            this.shortcodeAlert()
            this.shortcodeCarousel()
            this.shortcodeContact()
            this.shortcodeCountdown()
           // this.shortcodeCounterup()
            this.shortcodeCounter()
            this.shortcodeDailymotion()
            this.shortcodeDocumentviewer()
            this.shortcodeExpand()
            this.shortcodeFeature()
            this.shortcodeFlipbox()
            this.shortcodeImagecompare()
            this.shortcodeVimeo()
            this.shortcodePiechart()
            this.shortcodeModaltrigger()
        },
        resize: function() {
            var o = this;
            $(window).on("resize", function() {
                o.heading()
            })
        },
        DY_scroll: function(wraper, prev, next, img, speed, or) {
            var wraper = $(wraper), prev = $(prev), next = $(next), img = $(img).find('ul'), w = img.find('li').outerWidth(true), s = speed;
            next.click(function() {
                img.animate({'margin-left':-w},function() {
                    img.find('li').eq(0).appendTo(img)
                    img.css({'margin-left':0})
                })
            })
            prev.click(function() {
                img.find('li:last').prependTo(img)
                img.css({'margin-left':-w})
                img.animate({'margin-left':0})
            })
            if (or == true) {
                ad = setInterval(function() { next.click();},s*1000)
                wraper.hover(function() {clearInterval(ad);},function() {ad = setInterval(function() { next.click();},s*1000);})
            }
        },
        counterUp: function(element, options ) {
            var settings = $.extend({
                'time': 400,
                'delay': 10
            }, options);
        
            return element.each(function() {
        
                var $this = $(this);
                var $settings = settings;
        
                var counterUpper = function() {
                    var nums = [];
                    var divisions = $settings.time / $settings.delay;
                    var num = $this.text();
                    var isComma = /[0-9]+,[0-9]+/.test(num);
                    num = num.replace(/,/g, '');
                    var isInt = /^[0-9]+$/.test(num);
                    var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
                    var decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;
        
                    for (var i = divisions; i >= 1; i--) {
                        var newNum = parseInt(num / divisions * i);
                        if (isFloat) {
                            newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
                        }
                        if (isComma) {
                            while (/(\d+)(\d{3})/.test(newNum.toString())) {
                                newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
                            }
                        }
                        nums.unshift(newNum);
                    }
        
                    $this.data('counterup-nums', nums);
                    $this.text('0');
        
                    var f = function() {
                        $this.text($this.data('counterup-nums').shift());
                        if ($this.data('counterup-nums').length) {
                            setTimeout($this.data('counterup-func'), $settings.delay);
                        } else {
                            delete $this.data('counterup-nums');
                            $this.data('counterup-nums', null);
                            $this.data('counterup-func', null);
                        }
                    };
                    $this.data('counterup-func', f);
        
                    setTimeout($this.data('counterup-func'), $settings.delay);
                };
        
                $this.waypoint(counterUpper, { offset: '100%', triggerOnce: true });
            });
        
        },
        IsEmail: function(email) {
            var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!regex.test(email)) {
               return false;
            } else {
               return true;
            }
        },
        general: function() {
            /*wow*/
            $(".wow").each(function() {
                var duration = $(this).data("animationduration")
                if ( typeof duration !== "undefined") {
                    $(this).css({"-webkit-animation-duration":duration+"s","animation-duration":duration+"s"})
                }
            })
            /*tooltip*/
            var tooltip = $('.magee-shortcode[data-toggle="tooltip"]')
            if (tooltip.length) {
                tooltip.tooltip()
            }
            /*popover*/
            var popover = $('.magee-popover')
            if (popover.length) {
                popover.popover()
            }
            /*prettyPhoto*/
            var prettyPhoto = $("a[rel^='prettyPhoto']")
            if (prettyPhoto.length) {
                prettyPhoto.prettyPhoto()
            }
        },
        heading: function() {
            $(".magee-heading").each(function() {
                magee_heading = $(this);	
                if (magee_heading.data("responsive") == 'yes') {
                    if ($(window).width() <1200) {	
                        newPercentage = (($(window).width() / 1200) * 100) + "%";
                        $(this).find(".heading-inner").css({"font-size": newPercentage});
                    }	
                }
              });
        },
        mgmodal: function(el, options) {

            var options = $.extend({
                title: '',
                message: '',
                close_icon : '',
                type : 'effect-1',
                id : ''
            }, options);
            
            var obj = el;
            if (options.type === '') options.type = 'effect-1';
            if (options.close_icon === '') options.close_icon = 'yes';
            obj.wrap('<div class="ms-modal-wrapper"></div>');
            obj.after('<div class="magee-modal-wrapper" id="'+options.id+'"></div>');
            var container = obj.parent('.ms-modal-wrapper').find('.magee-modal-wrapper');
            container.append('<div class="magee-modal magee-modal-'+options.type+'"></div><div class="magee-modal-overlay"></div>');
            var magee_modal = container.find('.magee-modal');
            magee_modal.append('<div class="magee-modal-content-wrapper"><div class="magee-modal-title-wrapper"></div><div class="magee-modal-content"></div></div>');
            var magee_modal_title = container.find('.magee-modal-title-wrapper');

            if (options.close_icon === 'yes') {
                magee_modal_title.append('<h3>'+ options.title +'<a href="javascript:void(0);" class="magee-modal-close"><i class="fa fa-remove"></i></a></h3>');
            } else {
                magee_modal_title.append('<h3>'+ options.title +'</h3>');	 
            }

            var magee_modal_content = container.find('.magee-modal-content');
            magee_modal_content.append(options.message);
            var modal_close_icon = container.find('a.magee-modal-close');
            modal_close_icon.on('click',function(e) {
                e.preventDefault();
                magee_modal.removeClass('magee-modal-show');
            });
            var magee_modal_overlay = container.find(".magee-modal-overlay");
            magee_modal_overlay.on('click',function() {
                magee_modal.removeClass('magee-modal-show');
            });
            obj.on('click',function() {
                magee_modal.addClass('magee-modal-show');
            });
        },
        animation: function () {
            $(".magee-shortcode[data-animation]").mouseover(function() {
                var anmiationName = $(this).attr("data-animation")
                $(this).addClass("animated").addClass(anmiationName)
            })
            $(".magee-shortcode[data-animation]").mouseout(function() {
                var anmiationName = $(this).attr("data-animation")
                $(this).removeClass("animated").removeClass(anmiationName)
            })

            if ($('.magee-animated').length) {
                $('.magee-animated').each(function() {
                    if ($(this).data('imageanimation')==="yes") {
                        $(this).find("img,i.fa").css("visibility","hidden")
                    } else {
                        $(this).css("visibility","hidden")
                    }
                    $this = $(this);
                    if ($().waypoint) {

                        $this.waypoint(function(event, direction) {
                            $this.css('visibility', 'visible')
                            $this.find("img,i.fa").css('visibility', 'visible')
                            var animation_type       = $this.data('animationtype')
                            var animation_duration   = $this.data('animationduration')
                            var image_animation      = $this.data('imageanimation')
        
                            if (image_animation === "yes") {
                                $this.find("img,i.fa").addClass("animated "+animation_type)
                                if (animation_duration) {
                                    $this.find("img,i.fa").css('-moz-animation-duration', animation_duration+'s')
                                    $this.find("img,i.fa").css('-webkit-animation-duration', animation_duration+'s')
                                    $this.find("img,i.fa").css('-ms-animation-duration', animation_duration+'s')
                                    $this.find("img,i.fa").css('-o-animation-duration', animation_duration+'s')
                                    $this.find("img,i.fa").css('animation-duration', animation_duration+'s')
                                }
                            } else {
                                $this.addClass("animated "+animation_type)
                                if (animation_duration) {
                                    $this.css('-moz-animation-duration', animation_duration+'s')
                                    $this.css('-webkit-animation-duration', animation_duration+'s')
                                    $this.css('-ms-animation-duration', animation_duration+'s')
                                    $this.css('-o-animation-duration', animation_duration+'s')
                                    $this.css('animation-duration', animation_duration+'s')
                                }
                            }
                            
                        },{ triggerOnce: true, offset: '90%' });
                    }
                })
            }
        },
        shortcodeAccordion: function() {
            var accordion = $('.magee-accordion')
            if (accordion.length) {
                accordion.find('.panel-heading').on('click', function(e) {
                    e.stopPropagation()
                    var p =  $(this).parents('.magee-accordion')
                    var toggle = $(this).find('a.accordion-toggle')
                    var panelid = toggle.attr('aria-controls')
                    var multiselectable = $(this).parents('.magee-accordion').attr('aria-multiselectable')
                    var next = $('#'+panelid);
                    next.slideToggle('fade');
                    if (toggle.hasClass('collapsed')) {
                        toggle.removeClass('collapsed')
                    } else {
                        toggle.addClass('collapsed')
                    }
                    console.log(multiselectable)
                    if(multiselectable !== 'yes' && multiselectable !== '1'){
                        p.find('.panel-collapse').not(next).slideUp('fast')
                        p.find('.accordion-toggle').not(toggle).addClass('collapsed')
                    }
                   
                    return false
                })
            }
        },
        shortcodeAlert: function(e) {
            var alert = $('.magee-alert')
            if (alert.length) {
                alert.find(".close").each(function() {
                    $(this).click(function(e) {
                        e.preventDefault()
                        $(this).parent(".magee-alert").remove()
                    })
            })
            }
        },
        shortcodeAudioplayer: function() {
            var ms_audio = $('.ms-audio')
            if (ms_audio.length) {
                ms_audio.each(function() {
                    $(this).audioPlayer({
                        classPrefix: 'audioplayer',
                        strPlay: 'Play',
                        strPause: 'Pause',
                        strVolume: 'Volume',
                        strControls : $(this).data('controls'),
                        strStyle : $(this).data('style'),
                    });							
                });
            }
        },
        shortcodeContact: function() {
            $("form.magee-contact-form #submit").click(function(e) {
                e.preventDefault()
                var obj = $(this).parents(".magee-contact-form")
                obj.find(".contact-failed").text("")
                var receiver  = obj.find("input#receiver").val()
                var email     = obj.find("input#email").val()
                var name      = obj.find("input#name").val()
                var subject   = obj.find("input#subject").val()
                var message   = obj.find("textarea#message").val()
                
                var country   = obj.find("input#country").val()? obj.find("input#country").val() : '0'
                var city      = obj.find("input#city").val()?obj.find("input#city").val() : '0'
                var telephone = obj.find("input#telephone").val()?obj.find("input#telephone").val() : '0'
                var company   = obj.find("input#company").val()?obj.find("input#company").val() : '0'
                var website   = obj.find("input#website").val()?obj.find("input#website").val() : '0'
                var checkboxWarning = obj.find("input#checkboxWarning").attr("checked") == 'checked' ? 'yes':'no'
                var terms     = obj.find("input#terms").val()
                var required_fields  = obj.find("input#required_fields").val()
                var arrs  = required_fields.split(",")
                var status = ''
                var field = '';
                for (i=0; i<arrs.length; i++) {
                    field = $.trim(arrs[i])
                    if ( field && obj.find("#"+field).length > 0) {
                        if (obj.find("#"+field).val() !== '') {
                            status = status + ''
                        } else {	   
                            status = status + field
                            obj.find(".contact-failed").addClass("notice-error")
                            obj.find(".contact-failed").html( field.substring(0,1).toUpperCase() + field.substring(1)+magee_params.required)
                            return false
                        }
                    }
                }
                
                if (status == '') {
                
                    obj.find(".contact-failed").removeClass("notice-error")
                    obj.find(".contact-failed").append("<img alt='loading' class='loading' src='"+magee_params.themeurl+"/images/AjaxLoader.gif' />")
                
                    $.ajax({
                        type:"POST",
                        dataType:"json",
                        url:magee_params.ajaxurl,
                        // data:"name="+name+"&email="+email+"&subject="+subject+"&receiver="+receiver+"&message="+message+"&terms="+terms+"&checkboxWarning="+checkboxWarning+"&required_fields="+required_fields+"&country="+country+"&city="+city+"&telephone="+telephone+"&company="+company+"&website="+website+"&action=magee_contact",
                        data:{"name":name,"email":email,"subject":subject,"receiver":receiver,"message":message,"terms":terms,"checkboxWarning":checkboxWarning,"required_fields":required_fields,"country":country,"city":city,"telephone":telephone,"company":company,"website":website,"action":"magee_contact"},
                        success:function(data) {
                            if ( data.error == 0 ) {
                                obj.find(".contact-failed").addClass("notice-success")
                                obj.find(".contact-failed").html(data.msg)
                                $('.loading').remove();obj[0].reset()
                            } else {
                                obj.find(".contact-failed").removeClass("notice-success")
                                obj.find(".contact-failed").html(data.msg)
                            }
                            
                        return false
                        },error:function() {
                            obj.find(".contact-failed").html("Error.")
                            obj.find('.loading').remove()
                            return false
                        }
                    })
                }
                return false
            })
        },
        shortcodeCountdown: function() {
            var countdown = $('.magee-countdown-circle-type')
            if (countdown.length) {
                countdown.each(function() {
                    el = $(this);
                    el.ClassyCountdown({
                      end: el.data('endtime'),
                      now: el.data('nowtime'),
                      labels: true,
                      labelsOptions: {
                          lang: {
                              days: el.data('day_field_text'),
                              hours: el.data('hours_field_text'),
                              minutes: el.data('minutes_field_text'),
                              seconds: el.data('seconds_field_text')
                          },
                      },
                      style: {
                          element: '',
                          textResponsive: .5,
                          days: {
                              gauge: {
                                  thickness: .03,
                                  bgColor: "rgba(255,255,255,0.05)",
                                  fgColor: el.data('circle_type_day_color')
                              },
                              textCSS: 'font-family:'+el.data('google_fonts')+';font-weight:300; color:'+el.data('fontcolor')+';'
                          },
                          hours: {
                              gauge: {
                                  thickness: .03,
                                  bgColor: "rgba(255,255,255,0.05)",
                                  fgColor: el.data('circle_type_hours_color')
                              },
                              textCSS: 'font-family:'+el.data('google_fonts')+';font-weight:300; color:'+el.data('fontcolor')+';'
                          },
                          minutes: {
                              gauge: {
                                  thickness: .03,
                                  bgColor: "rgba(255,255,255,0.05)",
                                  fgColor: el.data('circle_type_minutes_color')
                              },
                              textCSS: 'font-family:'+el.data('google_fonts')+';font-weight:300; color:'+el.data('fontcolor')+';'
                          },
                          seconds: {
                              gauge: {
                                  thickness: .03,
                                  bgColor: "rgba(255,255,255,0.05)",
                                  fgColor: el.data('circle_type_seconds_color')
                              },
                              textCSS: 'font-family:'+el.data('google_fonts')+';font-weight:300; color:'+el.data('fontcolor')+';'
                            }
              
                        },
                        onEndCallback: function() {
                            el.remove();
                        }
                    });
                  
                });
            }
        },
        shortcodeCounter: function() {
            if ($('.magee-counter-box').length){
                $('.magee-counter-box').waypoint( function( direction ) {
                    var el = $(this.element).attr('class');
                    if( direction === 'down' && !$(this.element).hasClass('animated')) {
                        setTimeout( function(){
                            $('.'+el.replace(' ', '.')).find('.js-counter').countTo({
                                 formatter: function (value, options) {
                                  return value.toFixed(options.decimals);
                               },
                            });
                        } , 200);
                        
                        $(this.element).addClass('animated');
                            
                    }
                } , { offset: '75%' } );
            }
        },
        shortcodeCarousel: function() {
  
            if ($('.magee-carousel').length) {
 
                $('.magee-carousel').each(function() {
   
                    var carousel_owl = $(this);
                    var carousel_columns =  carousel_owl.data("columns");
                    var carousel_itemsNum600 = (carousel_columns-2)>0?(carousel_columns-2):carousel_columns;
                    var carousel_margin = carousel_columns > 1?10:0;
                    carousel_owl.find(".owl-carousel").owlCarousel({
                        loop:true,
                        margin:carousel_margin,
                        autoplay:(carousel_owl.data("autoplay") == 'yes'?true:false),
                        autoplayTimeout:carousel_owl.data("autoplaytimeout"),
                        autoplayHoverPause:true,
                        items:carousel_columns,
                        responsiveClass:true,
                        responsive:{
                            0:{
                                items:1,
                                nav:false
                            },
                            600:{
                                items:carousel_itemsNum600,
                                nav:(carousel_owl.data("display-nav") == 'yes'?'true':'false'),
                            },
                            1000:{
                                items:carousel_columns,
                                nav:(carousel_owl.data("display-nav") == 'yes'?'true':'false'),
                            }
                        }
                    });
                    
                    carousel_owl.find(".carousel-next").click(function() {
                        carousel_owl.find(".owl-carousel").trigger("next.owl.carousel");
                    })
                    carousel_owl.find(".carousel-prev").click(function() {
                        carousel_owl.find(".owl-carousel").trigger("prev.owl.carousel");
                    });
                    carousel_owl.find(".owl-controls").addClass(carousel_owl.data("pag-style"));
                });
            }

            if ($('.multi-carousel').length) {
                this.DY_scroll('.multi-carousel', '.multi-carousel-nav-prev', '.multi-carousel-nav-next', '.multi-carousel-inner', 3, false)
            }
        },
        shortcodeDailymotion: function() {
            var dailymotion = $(".magee-dailymotion")
            if (dailymotion.length) {
                dailymotion.each(function() {
                    dail = $(this);
                    if ( dail.data("width") == '100%' || dail.data("width") == '' &&  dail.data("height") == '100%' || dail.data("height") == '') {
                        width = dail.width();
                        iframewidth = dail.find("iframe").eq(0).width();
                        iframeheight = dail.find("iframe").eq(0).height();
                        op = iframeheight/iframewidth;
                        dail.find("iframe").eq(0).width(width-100);
                        dail.find("iframe").eq(0).height(op*(width-100));		
                    }
                });
            }
        },
        shortcodeDocumentviewer: function() {
            var documentviewer = $(".magee-document")
            if (documentviewer.length) {
                $('.magee-document').each(function() {
                    doc =  $(this);
                    if (doc.data("responsive") == 'yes') {
                        width = doc.width();
                        if (width < doc.data("width")) {
                        op = doc.data("height")/doc.data("width");
                        doc.find("iframe").eq(0).width(width);
                        doc.find("iframe").eq(0).height(op*width);
                        } 			
                    }
                });
            }
        },
        shortcodeExpand: function() {
            var el = $(".magee-expand")
            if (el.length) {
                el.each(function() {
                    expand = $(this)
                    less_icon = expand.data("less-icon")
                    less_icon_color = expand.data("less-icon-color")
                    more_icon = expand.data("more-icon")
                    more_icon_color = expand.data("more-icon-color")
                    if (less_icon.indexOf("fa-")>=0) {
                        var more = '<i class="fa '+less_icon+'" style="color:'+less_icon_color+';"></i> '+ expand.data('less-text')
                    } else {
                        var more = '<img src="'+less_icon+'" class="image-instead"/>'+ expand.data('less-text')
                    }
                    if (more_icon.indexOf("fa-")>=0) {
                        var less = '<i class="fa '+ more_icon +'" style="color:'+more_icon_color+';"></i> '+ expand.data('more-text')
                    } else {
                        var less = '<img src="'+ more_icon +'" class="image-instead"/>'+ expand.data('more-text')
                    }

                    expand.find(".expand-control").click(function() {
                        var e = $(this)
                        e.parent(".magee-expand").find(".expand-content").slideToggle(500, function() {
                            if (e.siblings('.expand-content').is(':visible')) {
                                e.html(more)
                            } else {
                                e.html(less)
                            }
                        })
                    });
                });
            }
        },
        shortcodeFeature: function() {
            var s = $(".magee-feature-box")
            if (s.length) {
                for(i=0; i<s.length; i++) {
                    var t = $(s[i]).find(".icon-box").outerWidth()
                    if ($(s[i]).find("img.feature-box-icon").length) {
                        var t = $(s[i]).find("img.feature-box-icon").outerWidth()
                    }
                    t += 15
                    
                    if ($(s[i]).hasClass('style2') && $(s[i]).hasClass('reverse') ) {
                        $(s[i]).css({"padding-left":0,"padding-right":t+'px'})
                        
                    } else if ($(s[i]).hasClass('style2')) {
                        $(s[i]).css({"padding-left":t+'px'})
                    } else if ($(this).hasClass('style3')) {
                        t -= 15
                        $(s[i]).find("h3").css({"line-height":t+'px'})
                    } else if ($(s[i]).hasClass('style4')) {
                        t=t/2,t1=-t,t+="px", t1+="px"
                        $(s[i]).css({"padding-top":t,"margin-top":t})
                        $(s[i]).find(".icon-box").css({"top":t1,"margin-left":t1})
                        $(s[i]).find("img.feature-box-icon").css({"top":t1,"margin-left":t1})
                    }
                    
                }
            }
        },
        shortcodeFlipbox: function() {
            var flipbox = $('.magee-flipbox-wrap')
            if (flipbox.length) {
                flipbox.each(function() {
                    var front_height = $(this).find('.flipbox-front').outerHeight()
                    var back_height  = $(this).find('.flipbox-back').outerHeight()
                    var height = front_height > back_height ? front_height : back_height
                    $(this).css({'height': height})
                    var obj = 	$(this)
                    obj.bind('touchstart',function() {
                        var direction = $(this).data('direction')
                        switch (direction) {
                            case 'horizontal': 
                            case 'vertical':
                            case 'slide-left':
                            case 'slide-right':
                            case 'slide-top':
                            case 'slide-bottom':
                                $(this).find(".flipbox-front").addClass(direction + "-touchstart-front").removeClass(direction + "-touchend-front")
                                $(this).find(".flipbox-back").addClass(direction + "-touchstart-back").removeClass(direction + "-touchend-back")
                                break;
                            case 'flip-bottom':
                            case 'flip-top':
                            case 'flip-right':
                            case 'flip-left':
                                $(this).find(".flipbox-back").addClass(direction + "-touchstart-back").removeClass(direction + "-touchend-back")
                                break;
                        }	
                    });
                
                    obj.bind('touchend',function() {
                        var direction = $(this).data('direction')
                        switch (direction) {
                            case 'horizontal': 
                            case 'vertical': 
                                $(this).find(".flipbox-front").addClass(direction + "-touchend-front").removeClass(direction + "-touchstart-front")
                                $(this).find(".flipbox-back").addClass(direction + "-touchend-back").removeClass(direction + "-touchstart-back")
                                break;
                            case 'slide-left':
                            case 'slide-right':
                            case 'slide-top':
                            case 'slide-bottom':
                                $(this).find(".flipbox-front").removeClass(direction + "-touchstart-front").addClass(direction + "-touchend-front")
                                $(this).find(".flipbox-back").removeClass(direction + "-touchstart-back").addClass(direction + "-touchend-back")
                                break;
                            case 'flip-bottom':
                            case 'flip-top':
                            case 'flip-right':
                            case 'flip-left':
                                $(this).find(".flipbox-back").removeClass(direction + "-touchstart-back").addClass(direction + "-touchend-back")
                                break;
                        }	
                    });	
                });
            }
        },
        shortcodeImagecompare: function() {
            var imageCompare = $(".magee-image-compare");
            if (imageCompare.length) {
                $(".magee-image-compare").each(function() {
                    $(this).twentytwenty({
                        default_offset_pct: $(this).data("pct"),
                        orientation: $(this).data("orientation"),
                        before_label: $(this).data("before_label"),
                        after_label: $(this).data("after_label"),
                        click_to_move: true
                    });
                });
            }
        },
        shortcodeModaltrigger: function() {
            var modalTrigger = $(".magee-modal-trigger");
            var $this = this;
            if (modalTrigger.length) {
                modalTrigger.each(function() {
                    var el = $(this)
                    $this.mgmodal(el, {
                        title: el.data('title'),
                        message	: el.data('content'),
                        close_icon:el.data('close_icon'),
                        type:el.data('effect'),
                        id:el.data('id')
                    })
              })
            }
        },
        shortcodePiechart: function() {
            var piecharts = $(".magee-chart-box");
            if (piecharts.length) {
                $(".magee-chart-box").each(function() {
                    piechart = $(this);
                    piechart.easyPieChart({
                        barColor: piechart.data("barcolor"),
                        trackColor: piechart.data("trackcolor"),
                        scaleColor: false,
                        lineWidth: 10,
                        trackWidth: 10,
                        size: piechart.data("size"),
                        lineCap: piechart.data("linecap")
                    })
                })
            }
        },
        shortcodeVimeo: function() {
            var vimeos = $(".magee-vimeo-video");
            if (vimeos.length) {
                vimeos.each(function() {
                    magee_vimeo = $(this);
                    if ( (magee_vimeo.data("width") == '100%' &&
                    magee_vimeo.data("height") == '100%') || (magee_vimeo.data("width") == '' &&
                    magee_vimeo.data("height") == '')) {
                        divwidth = magee_vimeo.width();
                        width = magee_vimeo.find("iframe.magee-vimeo").width();
                        height = magee_vimeo.find("iframe.magee-vimeo").height();
                        op = height/width;
                        magee_vimeo.find("iframe.magee-vimeo").width(divwidth-100);
                        magee_vimeo.find("iframe.magee-vimeo").height(op*divwidth-100);
                    }
                })
            }
        }

    })
    $.fn.MageeShortcodes = function(){
        return new MageeShortcodes();
    }
    $(function() {
        var magee_shortcodes = new MageeShortcodes()
        magee_shortcodes.init()
    })

})(window.jQuery, window, document);