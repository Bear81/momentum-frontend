export function applyServerErrors(err, setError, fallbackToast) {
  const data = err?.response?.data || {};
  let mapped = false;

  Object.entries(data).forEach(([key, messages]) => {
    const msg = Array.isArray(messages) ? messages[0] : String(messages);
    if (
      ['username', 'email', 'password', 'password1', 'password2'].includes(key)
    ) {
      setError(key, { type: 'server', message: msg });
      mapped = true;
    } else if (key === 'non_field_errors' || key === 'detail') {
      fallbackToast(msg);
      mapped = true;
    }
  });

  if (!mapped) fallbackToast('Something went wrong. Please try again.');
}
