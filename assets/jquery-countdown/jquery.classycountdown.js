/*!
 * jQuery ClassyCountdown
 * vox.SPACE
 *
 * Written by voxspace AT riseup.net
 * Licensed under the MIT license https://vox.SPACE/LICENSE-MIT
 * Version 1.1.0
 *
 */
(function (c) {
	c.fn.ClassyCountdown = function (k, r) {
		function l() {
			e = Math.floor(d / 86400);
			f = Math.floor(d % 86400 / 3600);
			g = Math.floor(d % 86400 % 3600 / 60);
			h = Math.floor(d % 86400 % 3600 % 60 % 60)
		}
		function m() {
			d--;
			l();
			0 >= d && (n || (n = !0, b.onEndCallback()), h = g = f = e = 0);
			a.find(".ClassyCountdown-days input").val(365 - e).trigger("change");
			a.find(".ClassyCountdown-hours input").val(24 - f).trigger("change");
			a.find(".ClassyCountdown-minutes input").val(60 - g).trigger("change");
			a.find(".ClassyCountdown-seconds input").val(60 - h).trigger("change");
			a.find(".ClassyCountdown-days .ClassyCountdown-value > div").html(e);
			a.find(".ClassyCountdown-hours .ClassyCountdown-value > div").html(f);
			a.find(".ClassyCountdown-minutes .ClassyCountdown-value > div").html(g);
			a.find(".ClassyCountdown-seconds .ClassyCountdown-value > div").html(h)
		}
		function p() {
			a.find(".ClassyCountdown-wrapper > div").each(function () {
				c(this).css("height", c(this).width() + "px")
			});
			b.style.textResponsive && a.find(".ClassyCountdown-value").css("font-size", Math.floor(a.find("> div").eq(0).width() * b.style.textResponsive / 10) + "px");
			a.find(".ClassyCountdown-value").each(function () {
				c(this).css("margin-top", Math.floor(0 - parseInt(c(this).height()) / 2) + "px")
			});
			a.find(".ClassyCountdown-days input").trigger("change");
			a.find(".ClassyCountdown-hours input").trigger("change");
			a.find(".ClassyCountdown-minutes input").trigger("change");
			a.find(".ClassyCountdown-seconds input").trigger("change")
		}
		function q(a) {
			switch (a) {
			case "flat-colors":
				return {
					labels : !0,
					style : {
						element : "",
						textResponsive : .5,
						days : {
							gauge : {
								thickness : .01,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#1abc9c"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						hours : {
							gauge : {
								thickness : .01,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#2980b9"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						minutes : {
							gauge : {
								thickness : .01,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#8e44ad"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						seconds : {
							gauge : {
								thickness : .01,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#f39c12"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						}
					}
				};
			case "flat-colors-wide":
				return {
					labels : !0,
					style : {
						element : "",
						textResponsive : .5,
						days : {
							gauge : {
								thickness : .03,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#1abc9c"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						hours : {
							gauge : {
								thickness : .03,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#2980b9"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						minutes : {
							gauge : {
								thickness : .03,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#8e44ad"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						seconds : {
							gauge : {
								thickness : .03,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#f39c12"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						}
					}
				};
			case "flat-colors-very-wide":
				return {
					labels : !0,
					style : {
						element : "",
						textResponsive : .5,
						days : {
							gauge : {
								thickness : .12,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#1abc9c"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						hours : {
							gauge : {
								thickness : .12,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#2980b9"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						minutes : {
							gauge : {
								thickness : .12,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#8e44ad"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						seconds : {
							gauge : {
								thickness : .12,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#f39c12"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						}
					}
				};
			case "flat-colors-black":
				return {
					labels : !0,
					style : {
						element : "",
						textResponsive : .5,
						days : {
							gauge : {
								thickness : .25,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#1abc9c",
								lineCap : "round"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						hours : {
							gauge : {
								thickness : .25,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#2980b9",
								lineCap : "round"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						minutes : {
							gauge : {
								thickness : .25,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#8e44ad",
								lineCap : "round"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						seconds : {
							gauge : {
								thickness : .25,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#f39c12",
								lineCap : "round"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						}
					}
				};
			case "black":
				return {
					labels : !0,
					style : {
						element : "",
						textResponsive : .5,
						days : {
							gauge : {
								thickness : .01,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#222"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						hours : {
							gauge : {
								thickness : .01,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#222"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						minutes : {
							gauge : {
								thickness : .01,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#222"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						seconds : {
							gauge : {
								thickness : .01,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#222"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						}
					}
				};
			case "black-wide":
				return {
					labels : !0,
					style : {
						element : "",
						textResponsive : .5,
						days : {
							gauge : {
								thickness : .03,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#222"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						hours : {
							gauge : {
								thickness : .03,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#222"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						minutes : {
							gauge : {
								thickness : .03,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#222"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						seconds : {
							gauge : {
								thickness : .03,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#222"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						}
					}
				};
			case "black-very-wide":
				return {
					labels : !0,
					style : {
						element : "",
						textResponsive : .5,
						days : {
							gauge : {
								thickness : .17,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#222"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						hours : {
							gauge : {
								thickness : .17,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#222"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						minutes : {
							gauge : {
								thickness : .17,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#222"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						seconds : {
							gauge : {
								thickness : .17,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#222"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						}
					}
				};
			case "black-black":
				return {
					labels : !0,
					style : {
						element : "",
						textResponsive : .5,
						days : {
							gauge : {
								thickness : .25,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#222",
								lineCap : "round"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						hours : {
							gauge : {
								thickness : .25,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#222",
								lineCap : "round"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						minutes : {
							gauge : {
								thickness : .25,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#222",
								lineCap : "round"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						},
						seconds : {
							gauge : {
								thickness : .25,
								bgColor : "rgba(0,0,0,0.05)",
								fgColor : "#222",
								lineCap : "round"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#34495e;"
						}
					}
				};
			case "white":
				return {
					labels : !0,
					style : {
						element : "",
						textResponsive : .5,
						days : {
							gauge : {
								thickness : .03,
								bgColor : "rgba(255,255,255,0.05)",
								fgColor : "#fff"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#fff;"
						},
						hours : {
							gauge : {
								thickness : .03,
								bgColor : "rgba(255,255,255,0.05)",
								fgColor : "#fff"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#fff;"
						},
						minutes : {
							gauge : {
								thickness : .03,
								bgColor : "rgba(255,255,255,0.05)",
								fgColor : "#fff"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#fff;"
						},
						seconds : {
							gauge : {
								thickness : .03,
								bgColor : "rgba(255,255,255,0.05)",
								fgColor : "#fff"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#fff;"
						}
					}
				};
			case "white-wide":
				return {
					labels : !0,
					style : {
						element : "",
						textResponsive : .5,
						days : {
							gauge : {
								thickness : .06,
								bgColor : "rgba(255,255,255,0.05)",
								fgColor : "#fff"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#fff;"
						},
						hours : {
							gauge : {
								thickness : .06,
								bgColor : "rgba(255,255,255,0.05)",
								fgColor : "#fff"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#fff;"
						},
						minutes : {
							gauge : {
								thickness : .06,
								bgColor : "rgba(255,255,255,0.05)",
								fgColor : "#fff"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#fff;"
						},
						seconds : {
							gauge : {
								thickness : .06,
								bgColor : "rgba(255,255,255,0.05)",
								fgColor : "#fff"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#fff;"
						}
					}
				};
			case "white-very-wide":
				return {
					labels : !0,
					style : {
						element : "",
						textResponsive : .5,
						days : {
							gauge : {
								thickness : .16,
								bgColor : "rgba(255,255,255,0.05)",
								fgColor : "#fff"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#fff;"
						},
						hours : {
							gauge : {
								thickness : .16,
								bgColor : "rgba(255,255,255,0.05)",
								fgColor : "#fff"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#fff;"
						},
						minutes : {
							gauge : {
								thickness : .16,
								bgColor : "rgba(255,255,255,0.05)",
								fgColor : "#fff"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#fff;"
						},
						seconds : {
							gauge : {
								thickness : .16,
								bgColor : "rgba(255,255,255,0.05)",
								fgColor : "#fff"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#fff;"
						}
					}
				};
			case "white-black":
				return {
					labels : !0,
					style : {
						element : "",
						textResponsive : .5,
						days : {
							gauge : {
								thickness : .25,
								bgColor : "rgba(255,255,255,0.05)",
								fgColor : "#fff",
								lineCap : "round"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#fff;"
						},
						hours : {
							gauge : {
								thickness : .25,
								bgColor : "rgba(255,255,255,0.05)",
								fgColor : "#fff",
								lineCap : "round"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#fff;"
						},
						minutes : {
							gauge : {
								thickness : .25,
								bgColor : "rgba(255,255,255,0.05)",
								fgColor : "#fff",
								lineCap : "round"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#fff;"
						},
						seconds : {
							gauge : {
								thickness : .25,
								bgColor : "rgba(255,255,255,0.05)",
								fgColor : "#fff",
								lineCap : "round"
							},
							textCSS : "font-family:'Open Sans';font-weight:300;color:#fff;"
						}
					}
				}
			}
		}
		var a = c(this),
		e,
		f,
		g,
		h,
		d,
		n = !1,
		b = {
			end : void 0,
			now : c.now(),
			labels : !0,
			labelsOptions : {
				lang : {
					days : "Days",
					hours : "Hours",
					minutes : "Minutes",
					seconds : "Seconds"
				},
				style : "font-size: 0.5em;"
			},
			style : {
				element : "",
				labels : !1,
				textResponsive : .5,
				days : {
					gauge : {
						thickness : .02,
						bgColor : "rgba(0, 0, 0, 0)",
						fgColor : "rgba(0, 0, 0, 1)",
						lineCap : "butt"
					},
					textCSS : ""
				},
				hours : {
					gauge : {
						thickness : .02,
						bgColor : "rgba(0, 0, 0, 0)",
						fgColor : "rgba(0, 0, 0, 1)",
						lineCap : "butt"
					},
					textCSS : ""
				},
				minutes : {
					gauge : {
						thickness : .02,
						bgColor : "rgba(0, 0, 0, 0)",
						fgColor : "rgba(0, 0, 0, 1)",
						lineCap : "butt"
					},
					textCSS : ""
				},
				seconds : {
					gauge : {
						thickness : .02,
						bgColor : "rgba(0, 0, 0, 0)",
						fgColor : "rgba(0, 0, 0, 1)",
						lineCap : "butt"
					},
					textCSS : ""
				}
			},
			onEndCallback : function () {}
		};
		k.theme && (b = c.extend(!0, b, q(k.theme)));
		b = c.extend(!0, b, k);
		(function () {
			a.append('<div class="ClassyCountdown-wrapper"><div class="ClassyCountdown-days"><input type="text" /><span class="ClassyCountdown-value"><div></div><span></span></span></div><div class="ClassyCountdown-hours"><input type="text" /><span class="ClassyCountdown-value"><div></div><span></span></span></div><div class="ClassyCountdown-minutes"><input type="text" /><span class="ClassyCountdown-value"><div></div><span></span></span></div><div class="ClassyCountdown-seconds"><input type="text" /><span class="ClassyCountdown-value"><div></div><span></span></span></div></div>');
			a.find(".ClassyCountdown-days input").knob(c.extend({
					width : "100%",
					displayInput : !1,
					readOnly : !0,
					max : 365
				}, b.style.days.gauge));
			a.find(".ClassyCountdown-hours input").knob(c.extend({
					width : "100%",
					displayInput : !1,
					readOnly : !0,
					max : 24
				}, b.style.hours.gauge));
			a.find(".ClassyCountdown-minutes input").knob(c.extend({
					width : "100%",
					displayInput : !1,
					readOnly : !0,
					max : 60
				}, b.style.minutes.gauge));
			a.find(".ClassyCountdown-seconds input").knob(c.extend({
					width : "100%",
					displayInput : !1,
					readOnly : !0,
					max : 60
				}, b.style.seconds.gauge));
			a.find(".ClassyCountdown-wrapper > div").attr("style", b.style.element);
			a.find(".ClassyCountdown-days .ClassyCountdown-value").attr("style", b.style.days.textCSS);
			a.find(".ClassyCountdown-hours .ClassyCountdown-value").attr("style", b.style.hours.textCSS);
			a.find(".ClassyCountdown-minutes .ClassyCountdown-value").attr("style", b.style.minutes.textCSS);
			a.find(".ClassyCountdown-seconds .ClassyCountdown-value").attr("style", b.style.seconds.textCSS);
			a.find(".ClassyCountdown-value").each(function () {
				c(this).css("margin-top", Math.floor(0 - parseInt(c(this).height()) / 2) + "px")
			});
			b.labels && (a.find(".ClassyCountdown-days .ClassyCountdown-value > span").html(b.labelsOptions.lang.days), a.find(".ClassyCountdown-hours .ClassyCountdown-value > span").html(b.labelsOptions.lang.hours), a.find(".ClassyCountdown-minutes .ClassyCountdown-value > span").html(b.labelsOptions.lang.minutes), a.find(".ClassyCountdown-seconds .ClassyCountdown-value > span").html(b.labelsOptions.lang.seconds), a.find(".ClassyCountdown-value > span").attr("style", b.labelsOptions.style));
			d = b.end - b.now;
			l()
		})();
		m();
		setInterval(m, 1E3);
		(function () {
			a.find(".ClassyCountdown-wrapper > div").each(function () {
				c(this).css("height", c(this).width() + "px")
			});
			b.style.textResponsive && (a.find(".ClassyCountdown-value").css("font-size", Math.floor(a.find("> div").eq(0).width() * b.style.textResponsive / 10) + "px"), a.find(".ClassyCountdown-value").each(function () {
					c(this).css("margin-top", Math.floor(0 - parseInt(c(this).height()) / 2) + "px")
				}));
			c(window).trigger("resize");
			c(window).resize(c.throttle(50, p))
		})()
	}
})(jQuery);
