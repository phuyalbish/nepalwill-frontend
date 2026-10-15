import ErrorState from "@/components/ui/ErrorState";

/**
 * Renders a skeleton while the first request is in flight, an ErrorState with retry on failure,
 * and the children otherwise.
 * @param {object} query  an RTK Query hook result
 * @param {import('react').ReactNode} skeleton
 * @param {string} errorTitle
 */
export default function DataState({ query, skeleton, errorTitle, className, children }) {
  if (query.isLoading || query.isUninitialized) return skeleton;
  if (query.isError) {
    return (
      <ErrorState
        error={query.error}
        title={errorTitle}
        onRetry={query.refetch}
        className={className}
      />
    );
  }
  return children;
}
