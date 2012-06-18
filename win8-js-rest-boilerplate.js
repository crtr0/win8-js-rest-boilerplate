(function () {

    var

    // The username and password for BASIC auth
    username,
    password,

    // CHANGE THIS
    apiRoot = "https://api.foo.com/version",

    get = function (url, params) {
        var queryStr = "";
        if (params !== null) {
            queryStr = "?"
            Object.keys(params).forEach(function (key, i) {
                if (i !== 0) { queryStr = queryStr + "&"; }
                queryStr = queryStr + key + "=" + encodeURIComponent(params[key]);
            });
        }
        
        return WinJS.xhr({ url: url + queryStr }).then(
            function (req) {
                return WinJS.Promise.wrap(JSON.parse(req.responseText));
            }
        );
    },

    post = function (url, dataHash) {
        var dataStr = "";
        Object.keys(dataHash).forEach(function (key, i) {
            if (i !== 0) { dataStr = dataStr + "&"; }
            dataStr = dataStr + key + "=" + encodeURIComponent(dataHash[key]);
        });

        return WinJS.xhr({
            type: "post", user: username, password: password, url: url,
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            data: dataStr
        }).then(
            function (req) {
                return WinJS.Promise.wrap(JSON.parse(req.responseText));
            }
        );
    };

    // CHANGE "foo"
    WinJS.Namespace.define("foo", {
        auth: function (u, p) {
            username = u;
            password = p;
        },
        restApiCall: function (param1, param2) {
            return post(apiRoot + "/path/to/resource", { param1: param1, param2: param2 });
        },
    });

}());
