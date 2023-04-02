const REG_LINK = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const StatusCode = {
  OK_STATUS_CODE: 200,
  CREATED_STATUS_CODE: 201,
  BAD_REQUEST_ERROR_CODE: 400,
  UNAUTHORIZED_CODE: 401,
  FORBIDDEN_ERROR_CODE: 403,
  NOT_FOUND_STATUS_CODE: 404,
  CONFLICT_STATUS_CODE: 409,
  INTERNAL_SERVER_ERROR_CODE: 500,
};

module.exports = {
  REG_LINK,
  StatusCode,

};
