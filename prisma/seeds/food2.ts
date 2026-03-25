export const food2 = {
  name: "미니인도어어덜트",
  brand: "royal canin",
  animalType: "dog",
  lifeStage: "adult",
  sizeCategory: "s",
  isPrescription: false,
  country: "대한민국 김제",
  sourceUrl: "https://www.royalcanin.com/kr",

  analysis: {
    create: {
      protein: 19,
      fat: 12,
      fiber: 2.8,
      ash: 7.4,
      moisture: 10.5,
      calcium: 0.76,
      phosphorus: 0.56,
    }
  },

  ingredients: {
    create: [
      { ingredientRaw: "쌀" },
      { ingredientRaw: "밀가루" },
      { ingredientRaw: "육분(닭, 오리)" },
      { ingredientRaw: "옥수수" },
      { ingredientRaw: "동물성 유지(닭, 오리)" },
      { ingredientRaw: "밀 글루텐" },
      { ingredientRaw: "유도 단백질(닭, 칠면조, 어류)" },
      { ingredientRaw: "옥수수 가루" },
      { ingredientRaw: "사탕무박" },
      { ingredientRaw: "양조효모" },
      { ingredientRaw: "대두유" },
      { ingredientRaw: "분말 셀룰로오스" },
      { ingredientRaw: "제올라이트" },
      { ingredientRaw: "정제소금" },
      { ingredientRaw: "비타민제합제" },
      { ingredientRaw: "탄산칼슘" },
      { ingredientRaw: "DL-메티오닌" },
      { ingredientRaw: "제일인산칼슘" },
      { ingredientRaw: "글리세린 지방산 에스테르" },
      { ingredientRaw: "염화칼륨" },
      { ingredientRaw: "혼합 광물질제" },
      { ingredientRaw: "어류" },
      { ingredientRaw: "효모(프락토올리고당)" },
      { ingredientRaw: "프리바이오틱스" },
      { ingredientRaw: "소르빈산칼륨" },
      { ingredientRaw: "염화콜린" },
      { ingredientRaw: "L-라이신" },
      { ingredientRaw: "비타민 E(합성착색제)" },
      { ingredientRaw: "L-타이로신" },
      { ingredientRaw: "해조유(EPA+DHA의 원료)" },
      { ingredientRaw: "비타민 C" },
      { ingredientRaw: "L-카르니틴" },
      { ingredientRaw: "식물성 유지" },
      { ingredientRaw: "산화마그네슘" },
      { ingredientRaw: "로즈마리 추출물" }
    ]
  },

  proteins: {
    create: [
      { proteinType: "chicken", sourceRaw: "육분(닭, 오리)", isPrimary: true },
      { proteinType: "duck", sourceRaw: "육분(닭, 오리)", isPrimary: true },
      { proteinType: "chicken", sourceRaw: "유도 단백질(닭, 칠면조, 어류)", isPrimary: false },
      { proteinType: "turkey", sourceRaw: "유도 단백질(닭, 칠면조, 어류)", isPrimary: false },
      { proteinType: "fish", sourceRaw: "유도 단백질(닭, 칠면조, 어류)", isPrimary: false },
      { proteinType: "fish", sourceRaw: "어류", isPrimary: false },
      { proteinType: "unknown", sourceRaw: "밀 글루텐", isPrimary: false },
    ]
  },

  carbohydrates: {
    create: [
      { carbType: "rice", sourceRaw: "쌀" },
      { carbType: "unknown", sourceRaw: "밀가루" },
      { carbType: "corn", sourceRaw: "옥수수" },
      { carbType: "corn", sourceRaw: "옥수수 가루" },
    ]
  },

  vegetables: {
    create: [
      { vegetableType: "unknown", sourceRaw: "사탕무박" },
      { vegetableType: "unknown", sourceRaw: "로즈마리 추출물" },
    ]
  }
}