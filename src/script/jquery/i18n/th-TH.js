(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["th-TH"] = $.extend(true, {}, en, {
        name: "th-TH",
        englishName: "Thai (Thailand)",
        nativeName: "ไทย (ไทย)",
        language: "th",
        numberFormat: {
            currencies: {'':{
                pattern: ["-$n","$n"],
                symbol: "฿"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "ThaiBuddhist",
                firstDay: 1,
                days: {
                    names: ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"],
                    namesAbbr: ["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."],
                    namesShort: ["อ","จ","อ","พ","พ","ศ","ส"]
                },
                months: {
                    names: ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม",""],
                    namesAbbr: ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค.",""]
                },
                eras: [{"name":"พ.ศ.","start":null,"offset":-543}],
                twoDigitYearMax: 2572,
                patterns: {
                    d: "d/M/yyyy",
                    D: "d MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d MMMM yyyy H:mm",
                    F: "d MMMM yyyy H:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy",
                    l: "d/M/yyyy H:mm",
                    L: "d/M/yyyy H:mm:ss"
                }
            }),
            Gregorian_Localized: $.extend(true, {}, standard, {
                firstDay: 1,
                days: {
                    names: ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"],
                    namesAbbr: ["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."],
                    namesShort: ["อ","จ","อ","พ","พ","ศ","ส"]
                },
                months: {
                    names: ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม",""],
                    namesAbbr: ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค.",""]
                },
                patterns: {
                    d: "d/M/yyyy",
                    D: "'วัน'dddd'ที่' d MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "'วัน'dddd'ที่' d MMMM yyyy H:mm",
                    F: "'วัน'dddd'ที่' d MMMM yyyy H:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy",
                    l: "d/M/yyyy H:mm",
                    L: "d/M/yyyy H:mm:ss"
                }
            })
        }
    }, regions["th-TH"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));