function onSuccess (message, result, res) {
  return res
    .status(200)
    .json({
      Message: message,
      Data: result,
      Status: 200,
      IsSuccess: true
    })
};

function serverError (error, res) {
  console.log(error.message)
  return res
    .status(500)
    .json({
      Message: error.message,
      Data: 0,
      Status: 500,
      IsSuccess: false
    })
};

function unauthorizedRequest (res) {
  return res
    .status(401)
    .json({
      Message: 'Unauthorized Request!',
      Data: 0,
      Status: 401,
      IsSuccess: false
    })
};

function forbiddenRequest (res) {
  return res
    .status(403)
    .json({
      Message: 'Access to the requested resource is forbidden! Contact Administrator.',
      Data: 0,
      Status: 403,
      IsSuccess: false
    })
};

function badRequest (error, res) {
  console.log(error.message)
  return res
    .status(400)
    .json({
      Message: error.message,
      Data: 0,
      Status: 400,
      IsSuccess: false
    })
};

function joinBadRequest (err, res) {
  return res
    .status(400)
    .json({
      Message: err.message,
      Data: 0,
      Status: 400,
      IsSuccess: false
    })
};

function errorHandler (err, _req, res, _next) {
  return serverError(err, res)
}

function isAuth (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res
      .status(401)
      .json({ msg: 'You are not authorized to view this resource' })
  }
}

function isAdmin (req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    next()
  } else {
    return res
      .status(401)
      .json({ msg: 'You are not authorized to view this resource because you are not an admin.' })
  }
}

export {
  isAuth,
  isAdmin,
  errorHandler
}
