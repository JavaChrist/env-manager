export const ProjectCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden animate-pulse">
      {/* Header coloré */}
      <div className="h-3 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700"></div>

      {/* Header de la carte */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center mb-3">
              <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>

            <div className="flex items-center">
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-lg mr-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Variables d'environnement */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-xl mr-3"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
          </div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </div>
        <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-4 border border-gray-700 dark:border-gray-600">
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 dark:bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-700 dark:bg-gray-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 dark:bg-gray-800 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="px-6 pb-6">
        <div className="flex flex-wrap gap-2">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-16"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-20"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-12"></div>
        </div>
      </div>
    </div>
  );
}; 