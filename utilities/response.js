exports.success = (res, data, message) => {
    res.send({
        success: true,
        result: data,
        message: message
    });
};

exports.error = (res, data, code, message) => {
    res.statusCode = code;
    res.send({
        success: false,
        error: data,
        message: message
    });
};
