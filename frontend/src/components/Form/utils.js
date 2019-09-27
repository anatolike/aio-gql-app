

export function formatErrors(errors) {
  const errorsMap = {};
  errors.forEach((e) => {
    errorsMap[e.field] = e.messages
  });
  return errorsMap
}