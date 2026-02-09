export default function Process({ dictionary }: { dictionary: any }) {
  return (
    <section id="process" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {dictionary.process.title}
          </h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {dictionary.process.steps.map((step: any, index: number) => (
              <div key={index} className="relative bg-white p-6 rounded-lg text-center md:bg-transparent">
                <div className="w-16 h-16 mx-auto bg-bled-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg ring-4 ring-white">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us subsection */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="bg-blue-50 p-8 rounded-xl border border-bled-blue">
             <h3 className="text-xl font-bold text-bled-blue mb-3">{dictionary.why_us.quality.title}</h3>
             <p className="text-blue-900">{dictionary.why_us.quality.desc}</p>
           </div>
           <div className="bg-orange-50 p-8 rounded-xl border border-bled-orange">
             <h3 className="text-xl font-bold text-bled-orange mb-3">{dictionary.why_us.logistics.title}</h3>
             <p className="text-orange-900">{dictionary.why_us.logistics.desc}</p>
           </div>
           <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
             <h3 className="text-xl font-bold text-gray-800 mb-3">{dictionary.why_us.price.title}</h3>
             <p className="text-gray-700">{dictionary.why_us.price.desc}</p>
           </div>
        </div>
      </div>
    </section>
  )
}
