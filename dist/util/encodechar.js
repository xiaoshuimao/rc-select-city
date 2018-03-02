var type = function (obj) {
    var types = Object.prototype.toString.call(obj).split(' ');
    return types.length >= 2 ? types[1].slice(0, types[1].length - 1) : '';
};
var buildParams = function (prefix, obj, add) {
    var name;
    if (Array.isArray(obj)) {
        // Serialize array item.
        obj.forEach(function (i, v) {
            // Item is non-scalar (array or object), encode its numeric index.
            buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, add);
        });
    }
    else if (type(obj) === "Object") {
        // Serialize object item.
        for (name in obj) {
            buildParams(prefix + "[" + name + "]", obj[name], add);
        }
    }
    else {
        // Serialize scalar item.
        add(prefix, obj);
    }
};
// key/values into a query string
export var enCodeChar = function (data) {
    var prefix;
    var s = [];
    var add = function (key, value) {
        // If value is a function, invoke it and return its value
        value = type(value) === 'function' ? value() : value;
        if (value === null || value === undefined)
            return;
        s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
    };
    for (prefix in data) {
        buildParams(prefix, data[prefix], add);
    }
    // Return the resulting serialization
    return s.join("&").replace(/%20/g, "+");
};
