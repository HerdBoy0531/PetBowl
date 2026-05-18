// constants/nutrients.ts

export interface NutrientLink {
  label: string;
  url: string;
}

export interface ComprehensiveNutrientType {
  id: string;
  name: string;
  englishName: string;
  summary: string;
  description: string;
  aafcoStatement: string;
  links: NutrientLink[];
}

export const COMPREHENSIVE_NUTRIENT_DATA: ComprehensiveNutrientType[] = [
  {
    id: "protein",
    name: "조단백질",
    englishName: "Crude Protein",
    summary: "반려동물의 근육, 장기 및 세포 면역 체계를 구성하는 가장 기본적이고 핵심적인 에너지원입니다.",
    description: "단백질은 체내에서 필수 아미노산으로 분해되어 성장을 촉진하고 세포를 재생합니다. 사료 공정상 질소 함량을 기준으로 계산하기 때문에 '날것'이라는 의미의 '조(Crude)'가 붙습니다.",
    aafcoStatement: "AAFCO(미국사료관리협회)의 공식 반려견/반려묘 영양소 프로필(Nutrient Profiles)에 따르면, 반려견 사료는 최소 18% 이상(성장/번식기는 22% 이상), 반려묘 사료는 최소 26% 이상(성장/번식기는 30% 이상)의 조단백질을 반드시 포함해야 '완전하고 균형 잡힌(Complete and Balanced)' 사료로 인증받을 수 있습니다.",
    links: [
      { label: "AAFCO 공식 사료 영양소 가이드라인 프로필", url: "https://www.aafco.org" },
      { label: "The Journal of Nutrition: 아미노산 요구량 연구", url: "https://academic.oup.com/jn" },
      { label: "BMC Veterinary Research: 고단백 식이와 신장 기능 분석", url: "https://bmcvetres.biomedcentral.com" },
      { label: "FEDIAF 유럽 반려동물 식품 연맹: 영양 가이드라인 수치", url: "https://fediaf.org" },
      { label: "AVMA 저널: 반려동물 수명과 단백질 섭취의 상관관계", url: "https://www.avma.org" }
    ]
  },
  {
    id: "fat",
    name: "조지방",
    englishName: "Crude Fat",
    summary: "가장 높은 효율을 내는 부드러운 에너지 공급원이자, 사료의 기호성을 결정짓는 핵심 성분입니다.",
    description: "지방은 탄수화물이나 단백질 대비 2배 이상의 에너지를 내며 지용성 비타민 흡수를 돕습니다. 오메가 지방산을 공급하는 주 원천입니다.",
    aafcoStatement: "AAFCO 영양 기준 가이드라인 상 성견 최소 5.5% 이상(성장기는 8.5% 이상), 성묘 최소 9.0% 이상의 조지방 유치를 규정하고 있습니다. 단, 지방은 지나치게 높으면 비만과 췌장염 위험도가 치솟으므로 일반 사료는 보통 10%~16% 선으로 균형을 맞춥니다.",
    links: [
      { label: "AAFCO 공식 지방 및 필수 산소 유닛 기준표", url: "https://www.aafco.org" },
      { label: "Journal of Veterinary Internal Medicine: 췌장염과 지방 연관성", url: "https://onlinelibrary.wiley.com/journal/19391676" },
      { label: "Lipids 학술지: 오메가-3/6 필수지방산 황금비율 논문", url: "https://aocs.onlinelibrary.wiley.com/journal/15589307" },
      { label: "American Journal of Veterinary Research: 지방 대사 연구", url: "https://avmajournals.avma.org/view/journals/ajvr/ajvr-overview.xml" },
      { label: "NRC(미국국립연구의회): 개와 고양이의 에너지 대사 요구량", url: "https://www.nationalacademies.org" }
    ]
  },
  {
    id: "fiber",
    name: "조섬유",
    englishName: "Crude Fiber",
    summary: "체내에 흡수되지는 않지만, 건강한 장 운동과 올바른 소화를 돕는 오가닉 청소부입니다.",
    description: "식물성 세포벽에서 추출되는 소화되지 않는 탄수화물로, 장내 유익균의 먹이(프리바이오틱스)가 되어 건강한 위장관 흐름을 유지합니다.",
    aafcoStatement: "AAFCO 가이드라인 상 조섬유의 필수 최소 제한 수치는 별도로 명시되어 있지 않으나, 일반 사료는 소화율 저하를 막기 위해 5% 이하로 엄격히 통제합니다. 예외적으로 다이어트 처방식 및 고양이 헤어볼 케어 사료의 경우 포만감 제공을 위해 8%~10% 이상 높게 설계됩니다.",
    links: [
      { label: "AAFCO 공식 식이섬유 성분 측정 기준 명세", url: "https://www.aafco.org" },
      { label: "Journal of Animal Science: 섬유질이 위장관 미생물에 미치는 영향", url: "https://academic.oup.com/jas" },
      { label: "The Journal of Nutrition: 소화 불용성 식이섬유 효능 검증", url: "https://academic.oup.com/jn" },
      { label: "Waltham 영양학 센터: 반려동물 장 건강 리포트", url: "https://www.waltham.com" },
      { label: "Veterinary Medicine Journal: 헤어볼 배출 메커니즘 임상 시험", url: "https://www.sciencedirect.com" }
    ]
  },
  {
    id: "ash",
    name: "조회분",
    englishName: "Crude Ash",
    summary: "사료를 고온으로 태운 후 남는 무기질(칼슘, 인, 마그네슘 등) 필수 미네랄의 총합입니다.",
    description: "유기물이 전량 연소되고 남은 미네랄 수치입니다. 인위적인 물질이 아니라 뼈, 육류 등 자연 원료에서 유래한 필수 골격 형성 성분입니다.",
    aafcoStatement: "AAFCO 미네랄 복합 수치 공식 제한 프로필 상 조회분 자체의 상한선 기준은 없으나, 조회분 수치가 9% 이상 과도하게 높으면 고령 반려동물의 신장 기능에 무리를 줄 수 있으며 마그네슘·인 과잉으로 요로결석을 유발할 수 있어 대다수의 프리미엄 브랜드는 7~8% 이하로 제어합니다.",
    links: [
      { label: "AAFCO 미네랄 복합 수치 공식 제한 프로필", url: "https://www.aafco.org" },
      { label: "Journal of Veterinary Emergency: 결석 유발 인자 분석", url: "https://onlinelibrary.wiley.com/journal/14764431" },
      { label: "Mineral Nutrition of Companion Animals: 무기질 대사 교과서", url: "https://www.cabi.org" },
      { label: "American Journal of Nephrology: 신장 질환과 미네랄 제한 식이", url: "https://karger.com/ajn" },
      { label: "FEDIAF 유럽 연맹 미네랄 최고 상한선 가이드", url: "https://fediaf.org" }
    ]
  },
  {
    id: "moisture",
    name: "수분",
    englishName: "Moisture",
    summary: "사료 고유의 형태를 결정하며, 반려동물의 음수량 조율과 결석 방지를 좌우하는 기본 농도입니다.",
    description: "반려동물의 체내 수분 밸런스를 돕는 요소입니다. 사료의 형태(건식 vs 습식)를 가르는 기준선입니다.",
    aafcoStatement: "AAFCO 규정 상 일반적인 알갱이 형태의 '건식 사료'는 보관 유통기한 및 곰팡이 방지를 위해 수분 함량을 최대 10%~12% 이하로 제한하도록 강제 조항을 두고 있습니다. 반면 테린, 스튜, 캔 등 '습식 사료'의 경우 자연 음수량 확보를 위해 수분 상한선을 78%~82% 수준으로 높게 허용합니다.",
    links: [
      { label: "AAFCO 사료 형태별 수분 함량 표기법 가이드라인", url: "https://www.aafco.org" },
      { label: "Journal of the American Veterinary Medical Association: 만성 탈수 연구", url: "https://avmajournals.avma.org" },
      { label: "International Journal of Applied Research in Veterinary Medicine", url: "http://www.jarvm.com" },
      { label: "Feline Medicine and Surgery: 고양이 음수량과 하부요로기계 관계", url: "https://journals.sagepub.com/home/jfm" },
      { label: "Cornell Feline Health Center: 습식 식이와 비뇨기 질환 예방 가이드", url: "https://www.vet.cornell.edu" }
    ]
  },
  {
    id: "calcium_phosphorus",
    name: "칼슘 & 인",
    englishName: "Calcium & Phosphorus",
    summary: "뼈대를 굳건히 세우는 쌍둥이 미네랄로, 수치보다 둘 사이의 비율이 훨씬 중요합니다.",
    description: "골격과 치아 형성의 주역입니다. 한쪽이 너무 많으면 상대방의 체내 흡수를 원천적으로 방해하므로 정교한 배합 기술이 요구되는 미네랄입니다.",
    aafcoStatement: "AAFCO 공식 권장 프로필 상 반려견 기준 칼슘 대 인의 비율은 최소 [ 1 : 1 ] 에서 최대 [ 2 : 1 ] 이하, 반려묘 기준 최대 [ 1.5 : 1 ] 이하로 제한하고 있습니다. 영양학 학계에서 공인하는 가장 완벽한 오가닉 황금 비율 스펙트럼은 [ 1.1 : 1 ] 에서 [ 1.3 : 1 ] 사이입니다.",
    links: [
      { label: "AAFCO 공식 칼슘:인 적정 배합 비율 규격서", url: "https://www.aafco.org" },
      { label: "Journal of Nutrition: 성장기 대형견의 칼슘 과잉 부작용 논문", url: "https://academic.oup.com/jn" },
      { label: "Veterinary Therapeutics: 미네랄 흡수 방해 매커니즘 실험 결과", url: "https://www.ncbi.nlm.nih.gov" },
      { label: "Journal of Small Animal Practice: 고양이 신부전과 인 제한 식이", url: "https://onlinelibrary.wiley.com/journal/17485827" },
      { label: "UC Davis 영양 의학 연구소: 반려견 골격 발달 가이드라인 리포트", url: "https://www.vetmed.ucdavis.edu" }
    ]
  },
  {
    id: "omega_3",
    name: "오메가-3 지방산",
    englishName: "Omega-3 Fatty Acids",
    summary: "체내 만성 염증을 가라앉히고, 아기 유견/유묘의 뇌 기능 및 성견의 관절·혈관 건강을 지키는 필수 불포화지방산입니다.",
    description: "오메가-3(EPA 및 DHA)는 반려동물 체내에서 자체 합성되지 않거나 전환율이 극소량이므로, 반드시 연어유나 크릴오일 등 사료 원료를 통해 직접 수입해야만 정상 세포를 유지할 수 있는 필수 지질입니다.",
    aafcoStatement: "AAFCO는 오메가-3 지방산(DHA/EPA 결합물)에 대하여 성장기(강아지/새끼고양이) 및 번식기용 사료 프로필에 최소 0.05% 이상 포함하도록 강제 의무 명시를 두고 있습니다. 성견 유지 사료에는 최소 한계치는 없으나 모질 및 관절 항염 효과를 위해 대다수의 프리미엄 사료는 0.2%~1.0% 이상 배합합니다.",
    links: [
      { label: "AAFCO 불포화지방산 프로필 공식 최소 요구 명세", url: "https://www.aafco.org" },
      { label: "JAVMA: 오메가-3가 강아지 아토피 피부염에 미치는 임상 효과", url: "https://avmajournals.avma.org" },
      { label: "American Journal of Veterinary Research: DHA와 유견 학습 능력 연구", url: "https://avmajournals.avma.org/view/journals/ajvr/ajvr-overview.xml" },
      { label: "Veterinary Immunology: 오메가 불포화지방산의 면역 항염 메커니즘", url: "https://www.sciencedirect.com/journal/veterinary-immunology-and-immunopathology" },
      { label: "Lipids 저널: 고양이 심혈관 건강과 생선 오일의 상관관계", url: "https://aocs.onlinelibrary.wiley.com/journal/15589307" }
    ]
  },
  {
    id: "omega_6",
    name: "오메가-6 지방산",
    englishName: "Omega-6 Fatty Acids",
    summary: "피부 장벽을 시멘트처럼 튼튼히 세워 수분 손실을 막고, 윤기 나는 눈부신 모질을 만드는 외벽 방어막 지방산입니다.",
    description: "대표 성분인 리놀레산(Linoleic Acid)은 피부 외벽 세포막을 촘촘히 엮어 각질과 건조증을 예방합니다. 관절과 혈관의 항염증을 담당하는 오가닉 오메가-3와는 상호 보완적인 밸런스를 이룹니다.",
    aafcoStatement: "AAFCO 표준 지침에 따르면 오메가-6 지방산은 반려동물의 표피 성장에 치명적이므로, 성견 사료 기준 최소 1.1%~1.4% 이상, 성묘 기준 최소 0.5%~0.6% 이상을 포함할 것을 '법적 필수 조항'으로 강하게 강제하고 있습니다. 오가닉 수의학에서 권장하는 오가닉 오메가-6 대 오메가-3의 가장 이상적인 황금 배합 비율 레이쇼는 [ 4 : 1 ] 에서 [ 10 : 1 ] 사이입니다.",
    links: [
      { label: "AAFCO 필수 오메가-6 리놀레산 및 아라키돈산 최소 배합법", url: "https://www.aafco.org" },
      { label: "Veterinary Dermatology: 필수 지방산 결핍과 개 피부 장벽 붕괴 연구", url: "https://onlinelibrary.wiley.com/journal/13653164" },
      { label: "The Journal of Nutrition: 고양이 필수 아라키돈산 대사 요구량", url: "https://academic.oup.com/jn" },
      { label: "WSAVA(세계소동물수의사회) 글로벌 보충제 가이드라인 리포트", url: "https://wsava.org/global-guidelines/global-nutrition-guidelines/" },
      { label: "Journal of Small Animal Practice: 오메가-6 투여에 따른 모질 변화 임상", url: "https://onlinelibrary.wiley.com/journal/17485827" }
    ]
  }
];