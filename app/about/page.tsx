import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <main className="max-w-3xl mx-auto space-y-8 mt-10">
        {/* Header */}
        <section className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            About Cold DM AI 🚀
          </h1>
          <p className="text-gray-400">Learn what this tool does and how it helps you grow.</p>
        </section>

        {/* What is it section */}
        <section className="bg-gray-800 p-6 rounded-xl shadow-xl space-y-3">
          <h2 className="text-xl font-bold text-cyan-400">What is Cold DM AI?</h2>
          <p className="text-gray-300 leading-relaxed">
            Cold DM AI Generator is a powerful, lightweight SaaS tool designed for freelancers, 
            developers, agency owners, and creators. Writing personalized outreach messages can take hours—this tool 
            uses advanced AI to craft high-converting, personalized cold messages in just a few seconds.
          </p>
        </section>

        {/* How it works section */}
        <section className="bg-gray-800 p-6 rounded-xl shadow-xl space-y-4">
          <h2 className="text-xl font-bold text-cyan-400">How It Works 🤔</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              <strong className="text-white">1. Enter Your Offer:</strong> Tell the AI what skills you have, what services you offer, or what product you are selling.
            </p>
            <p>
              <strong className="text-white">2. Paste Client Bio:</strong> Copy and paste the target client's business description, website details, or social media bio.
            </p>
            <p>
              <strong className="text-white">3. Generate & Send:</strong> Our AI instantly connects the dots and writes a highly personalized outreach message tailored specifically to that business, increasing your response rate!
            </p>
          </div>
        </section>

        {/* Back Button Link */}
        <div className="text-center pt-4">
          <Link 
            href="/" 
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 font-bold py-3 px-6 rounded-lg transition dynamic-shadow"
          >
            ← Back to Generator
          </Link>
        </div>
      </main>
    </div>
  );
}