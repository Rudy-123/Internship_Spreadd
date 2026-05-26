//IT has the general messages that are used so no need to write them again and againi import them from this file
const STATUS_CODES={
    OK:200,
    CREATED:201,
    BAD_REQUEST:400,
    UNAUTHORIZED:401,
    NOT_FOUND:404,
    FORBIDDEN:403,
    INTERNAL_SERVER_ERROR:500
};
const ERROR_MESSAGES={
    NOT_FOUND:'Resource not found',
    UNAUTHORIZED:'Unauthorized Access',
    BAD_REQUEST:'Invalid request data',
};
const SUCCESS_MESSAGES={
    CREATED:'User Created Successfully',
    UPDATED:'User Updated Successfully',
    DELETED:'User Deleted Successfully'
};
module.exports={STATUS_CODES,ERROR_MESSAGES,SUCCESS_MESSAGES};