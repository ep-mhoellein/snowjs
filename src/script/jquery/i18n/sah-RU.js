(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["sah-RU"] = $.extend(true, {}, en, {
        name: "sah-RU",
        englishName: "Yakut (Russia)",
        nativeName: "саха (Россия)",
        language: "sah",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': " ",
                '.': ","
            },
            currencies: {'':{
                pattern: ["-n$","n$"],
                ',': " ",
                '.': ",",
                symbol: "с."
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["баскыһыанньа","бэнидиэнньик","оптуорунньук","сэрэдэ","чэппиэр","бээтинсэ","субуота"],
                    namesAbbr: ["Бс","Бн","Оп","Ср","Чп","Бт","Сб"],
                    namesShort: ["Бс","Бн","Оп","Ср","Чп","Бт","Сб"]
                },
                months: {
                    names: ["Тохсунньу","Олунньу","Кулун тутар","Муус устар","Ыам ыйа","Бэс ыйа","От ыйа","Атырдьах ыйа","Балаҕан ыйа","Алтынньы","Сэтинньи","Ахсынньы",""],
                    namesAbbr: ["тхс","олн","кул","мст","ыам","бэс","отй","атр","блҕ","алт","стн","ахс",""]
                },
                monthsGenitive: {
                    names: ["тохсунньу","олунньу","кулун тутар","муус устар","ыам ыйын","бэс ыйын","от ыйын","атырдьах ыйын","балаҕан ыйын","алтынньы","сэтинньи","ахсынньы",""],
                    namesAbbr: ["тхс","олн","кул","мст","ыам","бэс","отй","атр","блҕ","алт","стн","ахс",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "MM.dd.yyyy",
                    D: "MMMM d yyyy 'с.'",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "MMMM d yyyy 'с.' H:mm",
                    F: "MMMM d yyyy 'с.' H:mm:ss",
                    Y: "MMMM yyyy 'с.'",
                    l: "MM.dd.yyyy H:mm",
                    L: "MM.dd.yyyy H:mm:ss"
                }
            })
        }
    }, regions["sah-RU"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));