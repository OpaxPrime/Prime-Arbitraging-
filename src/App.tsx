import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Search, TrendingUp, Package, Settings } from 'lucide-react';
import { Globe } from './components/3d/Globe';
import { ProductCard } from './components/ProductCard';
import { useStore } from './store/useStore';

function App() {
  const { products, user } = useStore();
  const highValueProducts = products.filter(p => p.velocity > 8);

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-950 to-navy-900">
      {/* Header */}
      <header className="border-b border-blue-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-blue-400" size={24} />
              <h1 className="text-2xl font-bold text-white">Prime Arbitrage</h1>
            </div>
            
            <div className="flex items-center space-x-6">
              {user ? (
                <>
                  <span className="text-blue-400">Premium Member</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                    Dashboard
                  </button>
                </>
              ) : (
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                  Start Free Trial
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with 3D Globe */}
      <section className="relative h-[60vh] overflow-hidden">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <Globe />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
        
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent to-navy-950">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Global Arbitrage Intelligence
            </h2>
            <p className="text-xl text-blue-300">
              AI-Powered Market Analysis & Automation
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition-colors duration-200">
                Explore Opportunities
              </button>
              <button className="bg-navy-800 hover:bg-navy-700 text-white px-8 py-3 rounded-md transition-colors duration-200">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Search Section */}
        <div className="relative mb-12">
          <input
            type="text"
            placeholder="Search products, categories, or marketplaces..."
            className="w-full bg-navy-800 text-white border border-blue-900 rounded-lg py-3 px-12 focus:outline-none focus:border-blue-600"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
        </div>

        {/* High Value, Fast Moving Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Package className="text-blue-400" />
              High Value, Fast Moving
            </h2>
            <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highValueProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;