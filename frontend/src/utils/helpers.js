
export function isServer() {
  return !(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}


export function maybe(exp, d) {
  try {
    const result = exp();
    return result === undefined || result === null ? d : result;
  } catch(err) {
    return d;
  }
}
