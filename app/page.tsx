import Link from "next/link";

export default function RootLocalePicker() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 md:py-20 pb-0">
      <div className="rounded-2xl border bg-white p-6 md:p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Select your language</h1>
        <p className="mt-2 text-slate-600">Please choose a language to continue.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/ja"
            className="rounded-xl bg-sky-600 px-5 py-3 text-center text-white shadow-sm hover:opacity-90"
          >
            日本語 / Japanese
          </Link>
          <Link
            href="/en"
            className="rounded-xl border px-5 py-3 text-center hover:bg-slate-50"
          >
            English
          </Link>
        </div>
      </div>
    </main>
  );
}
