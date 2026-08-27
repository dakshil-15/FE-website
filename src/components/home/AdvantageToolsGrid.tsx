import Image from "next/image";

const toolLogoFiles: Record<string, string> = {
  "Google Trends": "google_trends.png",
  Comscore: "comscore.png",
  SEMrush: "semrush.png",
  GWI: "gwi.png",
  "Power BI": "power_bi.png",
  Brandwatch: "brandwatch.png",
  Brand24: "brand24.png",
  Supermetrics: "supermetrics.png",
  "Konnect Insights": "konnect_insights.png",
  "Looker Studio": "looker_studio.png",
  Similarweb: "similarweb.png",
};

export default function AdvantageToolsGrid({ tools }: { tools: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden bg-line sm:grid-cols-3">
      {tools.map((tool) => {
        const file = toolLogoFiles[tool];
        return (
          <div key={tool} className="relative flex h-20 items-center justify-center bg-paper px-4">
            {file ? (
              <Image src={`/images/tools/${file}`} alt={tool} fill sizes="160px" className="object-contain p-4" />
            ) : (
              <span className="text-sm font-semibold text-ink/85">{tool}</span>
            )}
          </div>
        );
      })}
      <div className="relative col-span-2 flex h-20 items-center justify-center bg-paper px-4 sm:col-span-3">
        <Image
          src="/images/tools/in_house_proprietary_tools.png"
          alt="In-house proprietary tools"
          fill
          sizes="480px"
          className="object-contain p-4"
        />
      </div>
    </div>
  );
}
