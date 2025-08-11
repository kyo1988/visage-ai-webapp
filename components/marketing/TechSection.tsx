"use client";
import { useTranslations } from "@/app/lib/intl";
import CodeBlock from "@/app/components/common/CodeBlock";
import { track } from "@/app/lib/analytics";

const jsCode = `import { Visage } from "@visage/web";
const client = new Visage({ apiKey: process.env.VISAGE_KEY });
const result = await client.analyze(imageFile);`;

const kotlinCode = `val client = VisageClient(apiKey = BuildConfig.VISAGE_KEY)
val result = client.analyze(imageFile)`;

const swiftCode = `let client = VisageClient(apiKey: ProcessInfo.processInfo.environment["VISAGE_KEY"]!)
let result = try await client.analyze(imageFile)`;

export default function TechSection() {
  const t = useTranslations("landing.tech");

  return (
    <section
      id="technology"
      className="scroll-mt-28 py-10 md:py-12 bg-gray-100"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mb-10">
          <div className="h-0.5 w-10 rounded bg-sky-500 mb-3" />
          <h2 className="text-2xl sm:text-3xl font-semibold">{t("title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("lead")}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("deployedNote")}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="border-b px-4 py-3 font-medium bg-gray-50">
              {t("code.jsTitle")}
            </div>
            <div className="p-0">
              <CodeBlock
                code={jsCode}
                id="js-sdk"
                onCopy={() => track("tech_copy_js")}
              />
            </div>
          </div>

          <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="border-b px-4 py-3 font-medium bg-gray-50">
              {t("code.kotlinTitle")}
            </div>
            <div className="p-0">
              <CodeBlock
                code={kotlinCode}
                id="kotlin-sdk"
                onCopy={() => track("tech_copy_kotlin")}
              />
            </div>
          </div>

          <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="border-b px-4 py-3 font-medium bg-gray-50">
              {t("code.swiftTitle")}
            </div>
            <div className="p-0">
              <CodeBlock
                code={swiftCode}
                id="swift-sdk"
                onCopy={() => track("tech_copy_swift")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}