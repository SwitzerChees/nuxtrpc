const checkAuthorized = async (isAuthorized: () => Promise<boolean> | boolean) => {
  if (!(await isAuthorized())) {
    throw createError({
      statusCode: 403,
      message: 'error.unauthorized',
    })
  }
}
export default checkAuthorized
