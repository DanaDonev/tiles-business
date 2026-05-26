import ContactForm from '@/components/ContactForm'

export default function QAPage() {
  const faqs = [
    {
      question: 'What are the best tiles for bathroom use?',
      answer: 'Our bathroom collection features water-resistant tiles with non-slip surfaces. Look for tiles labeled bathroom-rated with proper grout sealing for maximum durability.'
    },
    {
      question: 'How do I determine the right tile dimensions for my space?',
      answer: 'Larger tiles (60x60cm) work well in spacious areas and create a modern look, while smaller tiles (20x20cm) are great for detailed patterns. Consider your room size and layout.'
    },
    {
      question: 'What is the difference between glazed and unglazed tiles?',
      answer: 'Glazed tiles have a protective coating making them easier to clean and more stain-resistant. Unglazed tiles are more porous and ideal for outdoor areas where slip resistance is important.'
    },
    {
      question: 'Can I install tiles myself or should I hire a professional?',
      answer: 'While DIY installation is possible, we recommend professional installation for best results. Our support team can connect you with trusted installers in your area.'
    },
    {
      question: 'What are your return and warranty policies?',
      answer: 'We offer a 30-day satisfaction guarantee. All tiles come with a 10-year manufacturing warranty. Contact our support team for details.'
    },
    {
      question: 'Do you offer bulk discounts?',
      answer: 'Yes! We provide special pricing for bulk orders. Contact our sales team through the form below for a custom quote.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Questions & Answers</h1>
          <p className="text-xl text-gray-600">Find answers to common questions about our tiles and services</p>
        </div>

        {/* FAQ Section */}
        <div className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md p-6 cursor-pointer group">
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-800 hover:text-purple-600 transition">
                  <span>{faq.question}</span>
                  <span className="text-2xl group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Didn&apos;t find your answer?</h2>
            <p className="text-gray-600">Send us your question and we&apos;ll get back to you as soon as possible</p>
          </div>
          <ContactForm />
        </div>

        {/* Support Info */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8 text-center border border-purple-200">
          <h3 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h3>
          <p className="text-gray-700 mb-4">
            Our support team is available to help you with any questions or concerns.
          </p>
          <div className="space-y-2 text-gray-600">
            <p>📧 Email: <span className="font-semibold">support@tilespro.com</span></p>
            <p>📞 Phone: <span className="font-semibold">+1 (555) 123-4567</span></p>
            <p>⏰ Hours: <span className="font-semibold">Monday - Friday, 9 AM - 6 PM EST</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
