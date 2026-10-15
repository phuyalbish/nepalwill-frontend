/**
 * Turn an RTK Query / fetch error into a short human message.
 * Handles {status, data:{detail}}, FETCH_ERROR, and plain Error objects.
 */
export function getErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  if (!error) return fallback;
  if (typeof error === "string") return error;
  if (error.status === "FETCH_ERROR") {
    return "We could not reach the server. Check your connection and try again.";
  }
  const detail = error.data?.detail;
  if (typeof detail === "string" && detail) return detail;
  if (typeof error.message === "string" && error.message) return error.message;
  return fallback;
}
