
/* DATE FORMAT functions */
const C = require('./constants');
const dateFormat = (function () {
    const token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g;
    const timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
    const timezoneClip = /[^-+\dA-Z]/g;
    const pad = function (val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) val = '0' + val;
        return val;
    };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        const dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length === 1 && Object.prototype.toString.call(date) === '[object String]' && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date();
        if (isNaN(date)) { throw SyntaxError('invalid date'); }

        mask = String(dF.masks[mask] || mask || dF.masks.default);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) === 'UTC:') {
            mask = mask.slice(4);
            utc = true;
        }

        const _ = utc ? 'getUTC' : 'get';
        const d = date[_ + 'Date']();
        const D = date[_ + 'Day']();
        const m = date[_ + 'Month']();
        const y = date[_ + 'FullYear']();
        const H = date[_ + 'Hours']();
        const M = date[_ + 'Minutes']();
        const s = date[_ + 'Seconds']();
        const L = date[_ + 'Milliseconds']();
        const o = utc ? 0 : date.getTimezoneOffset();
        const flags = {
            d,
            dd: pad(d),
            ddd: dF.i18n.dayNames[D],
            dddd: dF.i18n.dayNames[D + 7],
            m: m + 1,
            mm: pad(m + 1),
            mmm: dF.i18n.monthNames[m],
            mmmm: dF.i18n.monthNames[m + 12],
            yy: String(y).slice(2),
            yyyy: y,
            h: H % 12 || 12,
            hh: pad(H % 12 || 12),
            H,
            HH: pad(H),
            M,
            MM: pad(M),
            s,
            ss: pad(s),
            l: pad(L, 3),
            L: pad(L > 99 ? Math.round(L / 10) : L),
            t: H < 12 ? 'a' : 'p',
            tt: H < 12 ? 'am' : 'pm',
            T: H < 12 ? 'A' : 'P',
            TT: H < 12 ? 'AM' : 'PM',
            Z: utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
            o: (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
            S: ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 !== 10) * d % 10]
        };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}());

// Some common format strings
dateFormat.masks = {
    default: 'ddd mmm dd yyyy HH:MM:ss',
    shortDate: 'm/d/yy',
    mediumDate: 'mmm d, yyyy',
    longDate: 'mmmm d, yyyy',
    fullDate: 'dddd, mmmm d, yyyy',
    shortTime: 'h:MM TT',
    mediumTime: 'h:MM:ss TT',
    longTime: 'h:MM:ss TT Z',
    isoDate: 'yyyy-mm-dd',
    isoTime: 'HH:MM:ss',
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    monthNames: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ]
};

// For convenience...
// eslint-disable-next-line no-extend-native
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

exports.getDateBeforeXDaysInSpecificFormat = function (mask, daysBeforeTheCurrentDate) {
    let today = new Date();
    let dateBeforeXDays = today.setDate(today.getDate() - daysBeforeTheCurrentDate);
    return dateFormat(dateBeforeXDays, mask);
};
exports.getDateBeforeXYearsInSpecificFormat = function (mask, yearsBeforeTheCurrentDate) {
    let day = new Date();
    day.setDate(day.getDate() + 1);
    let dateBeforeXYears = day.setFullYear(day.getFullYear() - yearsBeforeTheCurrentDate);
    return dateFormat(dateBeforeXYears, mask);
};

exports.getYesterdaysDateInSpecificFormat = function (mask) {
    let today = new Date();
    let yesterday = today.setDate(today.getDate() - 1);
    return dateFormat(yesterday, mask);
};

exports.getCurrentDateInSpecificFormat = function (mask) {
    const todaysDate = new Date()
    return dateFormat(todaysDate, mask)
};

exports.getCurrentDateInCurrentFormat = function (dateTimeFormat) {
    return exports.getCurrentDateInSpecificFormat(dateTimeFormat.mask)
};

exports.tomorrowsDate = function (format = C.currentDateTimeFormat) {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return dateFormat(tomorrow, format.mask);
};

exports.getDateInFuture = function (numberOfDaysInFuture, format = C.currentDateFormat) {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + numberOfDaysInFuture);
    return dateFormat(tomorrow, format.mask);
};

exports.setIsoDateAndTime = function (year, month, date, h, min,) {

    const now = new Date()
    const definedDate = new Date(year, month - 1, date, h, min, 0, 0);
    let dateAndTime = year ? definedDate : now;

    return dateAndTime.toISOString();
};

exports.setCurrentDateAndTime = function (dateTimeFormat) {

    let now = new Date()
    return dateFormat(now, dateTimeFormat.mask)
};

exports.futureDate = function () {
    let futureY = new Date()
    futureY.setFullYear(futureY.getFullYear() + 1);
    return dateFormat(futureY, 'yyyy')
};

exports.currentDate = function () {
    let futureY = new Date()
    futureY.setFullYear(futureY.getFullYear());
    return dateFormat(futureY, 'yyyy')
};

exports.pastDate = function () {
    let pastY = new Date();
    pastY.setFullYear(pastY.getFullYear() - 1);
    return dateFormat(pastY, 'yyyy');
};

exports.setDateAndTime = function (dateTimeFormat, year, month, date, h = 0, min = 0) {

    const now = new Date()
    const definedDate = new Date(year, month - 1, date, h, min, 0, 0);
    let dateAndTime = year ? definedDate : now;

    return dateFormat(dateAndTime, dateTimeFormat.mask)
};

exports.setDate = function (dateOnlyFormat, year, month, date) {

    const now = new Date()
    const definedDate = new Date(year, month - 1, date);

    let selectedDate = year ? definedDate : now;
    return dateFormat(selectedDate, dateOnlyFormat.mask)
};

exports.randomNo = Math.floor(1000 * Math.random() + 1).toString() + Date.now().toString().substring(-12);

exports.setNewRandomNo = function () {
    return exports.randomNo = Math.floor(1000 * Math.random() + 1).toString() + Date.now().toString().substring(-12);
};

exports.setNewRandomString = function (length = 3) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    exports.randomString = dateFormat(Date(), 'mmm') + result;
    return exports.randomString.toLowerCase();
};

exports.getRandomString = function (length) {
    if (length) {
        let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }
};

exports.getRandomNo = function (length) {
    if (length) {
        let randomChars = '0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }
};

exports.getRandomNoWithDate = function (length) {
    if (length) {
        let randomChars = '0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return dateFormat(Date(), 'ddmmyy_') + result;
    }
};

exports.fetch_all_dropdown_values_and_convert_to_object_properties = function (dropdownSelector) {
    var objectWithValues = {};
    $(dropdownSelector + ' option').each(function () {
        objectWithValues[$(this).text().charAt(0).toLowerCase() + $(this).text().slice(1).replace(/\s/g, '')] = $(this).text();
    });

    const json = JSON.stringify(objectWithValues);  // {"name":"John Smith"}
    const unquoted = json.replace(/"([^"]+)":/g, '$1:');
    console.log(unquoted);  // {name:"John Smith"}

};

exports.format_as_phone_number = function (str) {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');

    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };
    return null
};
