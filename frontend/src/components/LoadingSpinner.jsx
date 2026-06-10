export default function LoadingSpinner({
  height = "h-96",
  size = "h-8 w-8",
}) {
  return (
    <div className={`flex justify-center items-center ${height}`}>
      <div
        className={`${size} rounded-full border-2 border-muted border-t-primary animate-spin`}
      />
    </div>
  );
}
