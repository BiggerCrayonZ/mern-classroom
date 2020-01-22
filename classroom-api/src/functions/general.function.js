exports.normalizeSearch = (string) => {
    if (string === '') return {};
    return ({
        $text: {
            $search: string,
            $diacriticSensitive: true,
        }
    });
}

exports.normalizeFilter = (arr = []) => {
    if (arr.length === 0) return {};
    let json = {};
    arr.forEach((x) => {
        json = { ...json, [x]: 1 };
    });
    return json;
}

exports.normalizeSort = (arr = []) => {
    if (arr.length === 0) return {};
    let json = {};
    arr.forEach((x) => {
        const el = x.split(':');
        json = {
            ...json,
            [el[0]]: (el[1] === 'desc') ? -1 : 1
        };
    });
    return json;
}
