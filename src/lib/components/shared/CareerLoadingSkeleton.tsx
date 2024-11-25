export default function CareerLoadingSkeleton() {
  return (
    <div className="animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="mb-8">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}
