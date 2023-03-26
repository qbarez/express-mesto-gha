const SERVER_ERROR_CODE = (res, message) => {
  res.status(500).send({ message });
};

const BAD_REQUEST_ERROR_CODE = (res, message, errors = {}) => {
  res.status(400).send({ message, errors });
};

const FORBIDDEN_ERROR_CODE = (res, message) => {
  res.status(403).send({ message });
};

const NOT_FOUND_STATUS_CODE = (res, message) => {
  res.status(404).send({ message });
};

const OK_STATUS_CODE = (res, data) => {
  res.status(200).send(data);
};

const CREATED_STATUS_CODE = (res, data) => {
  res.status(201).send(data);
};

module.exports = {
  OK_STATUS_CODE,
  CREATED_STATUS_CODE,
  BAD_REQUEST_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_STATUS_CODE,
  SERVER_ERROR_CODE,
};
