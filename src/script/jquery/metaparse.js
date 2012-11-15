/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery/metaparse
 */

(function () {
	define("jquery/metaparse", ["jquery", "module"], function ($, mod, undefined) {

		var doc = document,

			metaExp = /(?:(?:^|\s+)((?:[\$\w]+)?)((?:\.(?:require|ready)\([^\)]*\))?)(\.[\$\w]+\(.*\)))/,

			requireExp = /^\.require/,

			// >>>> DEPRECATED >>>> //
			readyExp = /^\.ready/,
			// <<<< DEPRECATED <<<< //

			promiseDone = $.Deferred()
				.resolve()
				.promise(),

			promiseFail = $.Deferred()
				.reject()
				.promise(),

			metaparse = function (data) {
				var meta = {};

				meta.data = data.replace(metaExp, function (m, m1, m2, m3) {
					meta.depend = m2;
					meta.execute = (m1 || "jQuery") + "(elem)" + m3;

					return "";
				});

				return meta;
			},

			// Set internal already parsed status
			isMetaparsed = function (elem, set) {
				return set === undefined ? $._data(elem)
					.metaparsed : ($._data(elem)
					.metaparsed = set);
			},

			module = {
				config: $.extend({
					type: "class",
					name: "metaparse"
				}, mod.config())
			};

		// >>>> DEPRECATED >>>> //
		if ($.config && $.config.metaparse) {
			$.debug.warn("DEPRECATED: use 'module config of requirejs' instead of 'jQuery.config.metaparse'.");
			$.extend(module.config, $.config.metaparse);
		}
		$.metaparseSettings = module.config;
		// <<<< DEPRECATED <<<< //

		$.extend({
			metaparse: function (elem, settings /*internal*/ , isEach) {
				// Check whether elem is already parsed
				if (!isMetaparsed(elem)) {
					var s = isEach ? settings : $.extend({}, module.config, settings),
						type = s.type,
						name = s.name,
						meta = {},
						execute,
						depend,
						deferred,
						temp;

					if (type === "class") {
						meta = metaparse(elem.className);
						elem.className = meta.data;
					}
					else if (type === "elem") {
						if (!elem.getElementsByTagName) {
							return;
						}

						if ((temp = elem.getElementsByTagName(name)[0])) {
							meta = metaparse(temp.innerHTML);
							temp.innerHTML = meta.data;
						}
					}
					else if (elem.getAttribute !== undefined) {
						if (type === "html5" || type === "data") {
							name = "data-" + name;
						}

						if ((temp = elem.getAttribute(name))) {
							meta = metaparse(temp);
							elem.setAttribute(name, meta.data);
						}
					}

					// $.globalEval isn't faster then eval this short string
					if ((execute = meta.execute)) {
						temp = function () {
							isMetaparsed(elem, true);
							/*jshint evil:true */
							eval(execute);

							if (deferred) {
								deferred.resolve();
							}
						};
						
						depend = (depend = meta.depend);
						if ((depend = depend && requireExp.test(depend) && depend.replace(requireExp, ""))) {
							deferred = $.Deferred();
							/*jshint evil:true */
							require(eval(depend), temp);
							return deferred.promise();
						}
						// >>>> DEPRECATED >>>> //
						if ((depend = depend && readyExp.test(depend) && depend.replace(readyExp, ""))) {
							/*jshint evil:true */
							return $.ready(eval(depend), temp);
						}
						// <<<< DEPRECATED <<<< //
						else {
							temp();
							return promiseDone;
						}
					}
				}

				return promiseFail;
			}
		});

		$.fn.extend({
			metaparse: function (settings /*internal*/ , isAutoparse) {
				var s = $.extend({}, module.config, settings),
					self = this,
					stack = [],
					depend;

				self.each(function () {
					if ((depend = $.metaparse(this, s, true))
						.state() !== "rejected") {
						stack.push(depend);
					}
				});

				$.when.apply($, stack)
					.done(function () {
						self.each(function () {
							$.event.trigger("metaparse", null, this, true);
						});

						if (isAutoparse) {
							isMetaparsed(doc, true);
							$.event.trigger("metaparse", null, doc, true);
						}

					});

				return self;
			}
		});

		$.event.special.metaparse = {
			// Don't add real event
			setup: $.noop,

			// Add special handler
			add: function (bind) {
				// Execute handler immediately if elem is already parsed
				if (isMetaparsed(this)) {
					bind.handler.call(this, $.Event("metaparse"));
				}
			}
		};

		// Expose module object
		return module;
	});

	// Execute module callback for triggering autoparse if module is part of a package
	var autoparse;

	if ((autoparse = require().config().config) && (autoparse = autoparse["jquery/metaparse"]) && (autoparse = autoparse.autoparse)) {
		require(["jquery", "jquery/metaparse"], function ($, metaparse) {

			// Run metaparse automatically on dom ready if defined in config
			var runAutoparse = function () {
					$(function () {
						$(autoparse.selector || (typeof autoparse === "string" ? autoparse : ".metaparse"))
							.metaparse({}, true);
					});
				};

			if ((autoparse = metaparse.config.autoparse)) {
				if (autoparse.require) {
					require(autoparse.require, runAutoparse);
				}
				// >>>> DEPRECATED >>>> //
				else if (autoparse.ready) {
					$.ready(autoparse.ready, runAutoparse);
				}
				// <<<< DEPRECATED <<<< //
				else {
					runAutoparse();
				}

				delete metaparse.config.autoparse;
			}
		});
	}
}());