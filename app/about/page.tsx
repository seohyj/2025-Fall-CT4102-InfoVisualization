"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { EXTINCTION_COLORS, STATUS_LABELS } from "@/lib/colors";

const STATUS_INFO = [
  {
    code: "LC",
    label: "Least Concern",
    labelKo: "관심대상",
    description:
      "넓게 분포하고 풍부한 종으로, 현재 심각한 위협에 직면하지 않습니다. 이 범주에는 넓은 지리적 분포를 가지고 있으며 안정적인 개체수를 유지하는 종들이 포함됩니다.",
    color: EXTINCTION_COLORS.LC,
  },
  {
    code: "NT",
    label: "Near Threatened",
    labelKo: "준위협",
    description:
      "가까운 미래에 위협받는 범주로 분류될 가능성이 있는 종입니다. 현재는 위협받는 범주에 해당하지 않지만, 위협 요인이 지속되면 위협받는 범주로 전환될 수 있습니다.",
    color: EXTINCTION_COLORS.NT,
  },
  {
    code: "VU",
    label: "Vulnerable",
    labelKo: "취약",
    description:
      "야생에서 멸종 위험이 높은 종으로, 개체수 감소나 서식지 손실이 발생하고 있습니다. 지난 10년 또는 3세대 동안 개체수가 30% 이상 감소했거나, 서식지가 심각하게 파편화된 종들이 이 범주에 포함됩니다.",
    color: EXTINCTION_COLORS.VU,
  },
  {
    code: "EN",
    label: "Endangered",
    labelKo: "위기",
    description:
      "야생에서 매우 높은 멸종 위험에 직면한 종으로, 심각한 개체수 감소나 서식지 파괴가 진행 중입니다. 지난 10년 또는 3세대 동안 개체수가 50% 이상 감소했거나, 서식지가 극도로 제한된 종들이 이 범주에 해당합니다.",
    color: EXTINCTION_COLORS.EN,
  },
  {
    code: "CR",
    label: "Critically Endangered",
    labelKo: "심각한 위기",
    description:
      "야생에서 극도로 높은 멸종 위험에 직면한 종으로, 즉각적인 보전 조치가 필요합니다. 지난 10년 또는 3세대 동안 개체수가 80% 이상 감소했거나, 서식지가 극히 제한적이며 지속적인 위협에 노출된 종들이 이 범주에 포함됩니다.",
    color: EXTINCTION_COLORS.CR,
  },
  {
    code: "EW",
    label: "Extinct in the Wild",
    labelKo: "야생절멸",
    description:
      "사육, 재배, 또는 자연 서식지 외부에서만 생존하는 종으로, 야생 개체군은 더 이상 존재하지 않습니다. 동물원, 식물원, 또는 보호 구역에서만 관리되고 있으며, 야생 복원 프로그램이 필요한 종들이 이 범주에 해당합니다.",
    color: EXTINCTION_COLORS.EW,
  },
  {
    code: "EX",
    label: "Extinct",
    labelKo: "절멸",
    description:
      "마지막 개체가 사망한 것이 확실한 종으로, 생존 표본이 존재하지 않습니다. 철저한 조사에도 불구하고 알려진 서식지나 예상 서식지에서 더 이상 발견되지 않으며, 모든 개체가 사망한 것으로 확인된 종들이 이 범주에 포함됩니다.",
    color: EXTINCTION_COLORS.EX,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Map</span>
          </Link>
          <h1 className="text-2xl font-bold">About</h1>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        {/* What is IUCN Red List */}
        <section className="mb-12">
          <h2 className="text-5xl font-bold mb-6">
            What is the IUCN Red List?
          </h2>
          <div className="space-y-4 text-2xl text-white/80 leading-relaxed">
            <p>
              IUCN 적색목록(IUCN Red List of Threatened Species)은 전 세계 생물
              종의 보전 상태를 평가한 가장 포괄적인 목록입니다. 정량적 기준을
              사용하여 수천 종의 멸종 위험도를 평가하며, 각 종의 분포 범위,
              개체수, 서식지와 생태, 이용 및 거래, 위협 요인, 보전 조치에 대한
              정보를 제공합니다.
            </p>
            <p>
              1964년에 설립된 이래, 적색목록은 전 세계 생물다양성 상태에 대한
              가장 권위 있는 정보원으로 발전했습니다. 정부 기관, 야생동물 관리
              부서, 보전 관련 비정부기구(NGO), 자연 자원 계획가, 교육 기관,
              학생, 그리고 기업 커뮤니티가 보전 계획과 의사결정을 위해 활용하고
              있습니다.
            </p>
            <p>
              적색목록은 단순히 종의 목록을 제공하는 것을 넘어서, 각 종이 직면한
              위협과 필요한 보전 조치에 대한 상세한 정보를 제공하여 효과적인
              보전 전략 수립을 지원합니다.
            </p>
          </div>
        </section>

        {/* Status Categories Guide */}
        <section className="mb-12">
          <h2 className="text-5xl font-bold mb-8">Status Categories Guide</h2>
          <div className="space-y-6">
            {STATUS_INFO.map((status) => (
              <div
                key={status.code}
                className="border border-white/10 rounded-lg p-6 bg-black/50 hover:bg-black/70 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="px-5 py-3 rounded-lg font-bold text-white text-lg flex-shrink-0"
                    style={{ backgroundColor: status.color }}
                  >
                    {status.code}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-semibold mb-2">
                      {status.label}
                    </h3>
                    <p className="text-xl text-white/60 mb-3 italic">
                      {status.labelKo}
                    </p>
                    <p className="text-xl text-white/70 leading-relaxed">
                      {status.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Overview */}
        <section className="mb-12">
          <h2 className="text-5xl font-bold mb-6">Global Overview</h2>
          <div className="border border-white/10 rounded-lg p-8 bg-black/50">
            <div className="space-y-4 text-2xl text-white/80 leading-relaxed">
              <p>
                이 시각화는 IUCN 적색목록의 데이터를 기반으로 하며, 다양한
                분류군과 시간에 따른 종의 보전 상태를 보여줍니다. 인터랙티브
                지도를 통해 종의 분포를 확인하고, 카테고리별로 필터링하며, 각
                그룹의 상세 통계를 살펴볼 수 있습니다.
              </p>
              <p>
                데이터는 2009년부터 2025년까지의 기간을 다루며, 시간에 따른 종
                상태의 변화를 관찰하고 지구 생물다양성이 직면한 지속적인 멸종
                위기를 이해할 수 있도록 합니다.
              </p>
              <p>
                현재 전 세계적으로 수많은 종들이 서식지 파괴, 기후 변화, 남획,
                외래종 침입, 질병 등 다양한 위협에 직면해 있습니다. 이러한
                위협들은 종의 개체수를 감소시키고 분포 범위를 축소시키며, 결국
                멸종으로 이어질 수 있습니다.
              </p>
              <p>
                보전 노력은 이러한 위기를 완화하고 생물다양성을 보호하는 데
                핵심적입니다. 서식지 보호, 복원 프로그램, 법적 보호, 지역 사회
                참여 등 다양한 접근 방식이 필요하며, 적색목록은 이러한 보전
                활동의 우선순위를 결정하는 데 중요한 도구로 활용됩니다.
              </p>
            </div>
          </div>
        </section>

        {/* Link to IUCN */}
        <section className="mb-12">
          <div className="border border-white/20 rounded-lg p-8 bg-gradient-to-br from-black/80 to-black/50">
            <h2 className="text-4xl font-bold mb-4">더 알아보기</h2>
            <p className="text-2xl text-white/70 mb-6">
              종합적인 종 평가와 상세한 보전 정보는 공식 IUCN 적색목록
              웹사이트를 방문하세요.
            </p>
            <a
              href="https://www.iucnredlist.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-semibold text-lg hover:bg-white/90 transition-colors"
            >
              <span>IUCN 적색목록 방문</span>
              <ExternalLink className="w-6 h-6" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
