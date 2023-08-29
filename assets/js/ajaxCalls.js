function ajaxCall(method, api, data, successCB, errorCB) {
    $.ajax({
        async: false,
        type: method,
        url: api,
        data: data,
        cache: false,
        contentType: "application/json",
        dataType: "json",
        success: successCB,
        error: errorCB
    });
}