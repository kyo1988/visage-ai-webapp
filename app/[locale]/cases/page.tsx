export default async function CasesPage({ params: { locale } }: { params: { locale: string } }) {
  const { cases } = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {cases.title}
            </h1>
            <p className="text-xl text-gray-600">
              {cases.underConstruction}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
