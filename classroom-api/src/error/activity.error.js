function deleteSingleCallBack(json, { kind }) {
    let result = { ...json };
    console.log({ kind })
    switch (kind) {
        case 'ObjectId':
            result = {
                ...result,
                message: 'Al eliminar la actividad no se encontró el registro',
                status: 404,
            }
            break;
        default:
            result = {
                ...result,
                message: 'error interno del servidor, favor de contactar al administrador',
                status: 500,
            }
            break;
    }
    return result;
}

exports.generalCallback = (origin, err) => {
    let json = {
        success: false,
    };
    switch (origin) {
        case 'deleteSingle':
            json = deleteSingleCallBack(json, err);
            break;
        default:
            json.message = 'unknown general error';
            json.status = 500;
            break;
    }
    return { ...json, err };
}