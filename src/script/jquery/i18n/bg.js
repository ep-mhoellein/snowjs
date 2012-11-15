(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["bg"] = $.extend(true, {}, en, {
        name: "bg",
        englishName: "Bulgarian",
        nativeName: "български",
        language: "bg",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currencies: {'':{
                pattern: ["-n $","n $"],
                ',': " ",
                '.': ",",
                symbol: "лв."
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["неделя","понеделник","вторник","сряда","четвъртък","петък","събота"],
                    namesAbbr: ["нед","пон","вт","ср","четв","пет","съб"],
                    namesShort: ["н","п","в","с","ч","п","с"]
                },
                months: {
                    names: ["януари","февруари","март","април","май","юни","юли","август","септември","октомври","ноември","декември",""],
                    namesAbbr: ["ян","февр","март","апр","май","юни","юли","авг","септ","окт","ноември","дек",""]
                },
                AM: null,
                PM: null,
                eras: [{"name":"след новата ера","start":null,"offset":0}],
                patterns: {
                    d: "d.M.yyyy 'г.'",
                    D: "dd MMMM yyyy 'г.'",
                    t: "HH:mm 'ч.'",
                    T: "HH:mm:ss 'ч.'",
                    f: "dd MMMM yyyy 'г.' HH:mm 'ч.'",
                    F: "dd MMMM yyyy 'г.' HH:mm:ss 'ч.'",
                    M: "dd MMMM",
                    Y: "MMMM yyyy 'г.'",
                    l: "d.M.yyyy 'г.' HH:mm 'ч.'",
                    L: "d.M.yyyy 'г.' HH:mm:ss 'ч.'"
                }
            })
        }
    }, regions["bg"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));