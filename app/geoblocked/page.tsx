// app/geoblocked/page.tsx
export default function GeoBlocked() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-green-500 mb-4">Access Granted</h1>
        <p className="text-gray-600 mb-8">
          Welcome to Coinzone! Enjoy unrestricted access to crypto and blockchain news from around the world.
        </p>
        <p className="text-sm text-gray-500">If you have any questions, contact support at [your-email@example.com].</p>
      </div>
    </div>
  );
}