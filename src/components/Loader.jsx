function Loader() {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="relative">
                {/* Spinning circle */}
                <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-950 rounded-full animate-spin"></div>

                {/* Loading text */}
                <p className="mt-4 text-sm text-gray-600 text-center">Loading...</p>
            </div>
        </div>
    );
}

export default Loader;
