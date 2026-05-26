import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20 md:py-32">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Premium Tiles for Every Space
          </h1>
          <p className="text-lg md:text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Transform your bathroom, kitchen, or outdoor areas with our exquisite collection of high-quality tiles. Choose from thousands of designs, colors, and dimensions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tiles" className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transition">
              Browse Collection
            </Link>
            <Link href="/qa" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition">
              Ask a Question
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Explore Our Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'General', desc: 'Versatile tiles for all spaces', icon: '🔷' },
              { title: 'Bathroom', desc: 'Water-resistant premium collection', icon: '🚿' },
              { title: 'Kitchen', desc: 'Durable & stylish designs', icon: '🍳' },
              { title: 'Outdoors', desc: 'Weather-resistant options', icon: '🌳' }
            ].map((cat) => (
              <Link key={cat.title} href={`/tiles?type=${cat.title.toUpperCase()}`}>
                <div className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition cursor-pointer">
                  <div className="text-5xl mb-4">{cat.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
                  <p className="text-gray-600">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose TilesPro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Premium Quality',
                desc: 'All our tiles are carefully selected to ensure the highest quality standards.',
                icon: '⭐'
              },
              {
                title: 'Wide Selection',
                desc: 'Choose from thousands of designs, colors, patterns, and dimensions.',
                icon: '🎨'
              },
              {
                title: 'Expert Support',
                desc: 'Our team is ready to help you find the perfect tiles for your project.',
                icon: '🤝'
              },
              {
                title: 'Filter & Compare',
                desc: 'Easy filtering by type, color, and dimensions to find exactly what you need.',
                icon: '🔍'
              },
              {
                title: 'Save Favorites',
                desc: 'Like and bookmark your favorite tiles for easy access later.',
                icon: '❤️'
              },
              {
                title: 'Expert Advice',
                desc: 'Browse our Q&A section or contact us for professional recommendations.',
                icon: '💡'
              }
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary text-white py-16 md:py-20">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Tiles?
          </h2>
          <p className="text-lg mb-8 text-purple-100 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their spaces with TilesPro.
          </p>
          <Link href="/tiles" className="inline-block px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transition">
            Start Browsing Now
          </Link>
        </div>
      </section>
    </>
  )
}
