// app/geoblocked/page.tsx
export default function GeoBlocked() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Access Restricted</h1>
        <p className="text-gray-600 mb-8">
          Polyzone is not available in your region due to legal restrictions.
        </p>
        <p className="text-sm text-gray-500">Please contact support at [your-email@example.com] if you believe this is an error.</p>
      </div>
    </div>
  );
}