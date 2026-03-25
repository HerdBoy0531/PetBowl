export const food1 = {
  name: "미니인도어시니어",
  brand: "royal canin",
  animalType: "dog",
  lifeStage: "senior",
  sizeCategory: "s",
  isPrescription: false,
  country: "대한민국 김제",
  sourceUrl: "https://www.royalcanin.com/kr",

  analysis: {
    create: {
      protein: 22,
      fat: 12,
      fiber: 2.8,
      ash: 6.0,
      moisture: 10.5,
      calcium: 0.64,
      phosphorus: 0.48,
    }
  },

  ingredients: {
    create: [
      { ingredientRaw: "쌀" },
      { ingredientRaw: "옥수수" },
      { ingredientRaw: "육분(닭, 오리)" },
      { ingredientRaw: "밀가루" },
      { ingredientRaw: "동물성 유지(닭, 오리)" },
      { ingredientRaw: "밀 글루텐" },
      { ingredientRaw: "유도 단백질(닭, 칠면조, 어류)" },
      { ingredientRaw: "옥수수 글루텐" },
      { ingredientRaw: "옥수수 가루" },
      { ingredientRaw: "사탕무박" },
      { ingredientRaw: "어류" },
      { ingredientRaw: "분말 셀룰로오스" },
      { ingredientRaw: "양조효모" },
      { ingredientRaw: "대두유" },
      { ingredientRaw: "제올라이트" },
      { ingredientRaw: "비타민제합제" },
      { ingredientRaw: "염화칼륨" },
      { ingredientRaw: "탄산칼슘" },
      { ingredientRaw: "혼합 광물질제" },
      { ingredientRaw: "황산철" },
      { ingredientRaw: "황산코발트" },
      { ingredientRaw: "황산구리" },
      { ingredientRaw: "해조유(EPA+DHA의 원료)" },
      { ingredientRaw: "비타민 E(합성착색제)" },
      { ingredientRaw: "효모(만난올리고당의 원료)" },
      { ingredientRaw: "정제소금" },
      { ingredientRaw: "DL-메티오닌" },
      { ingredientRaw: "타우린" },
      { ingredientRaw: "글루콘산 철" },
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
      { proteinType: "unknown", sourceRaw: "옥수수 글루텐", isPrimary: false },
    ]
  },

  carbohydrates: {
    create: [
      { carbType: "rice", sourceRaw: "쌀" },
      { carbType: "corn", sourceRaw: "옥수수" },
      { carbType: "corn", sourceRaw: "옥수수 가루" },
      { carbType: "unknown", sourceRaw: "밀가루" },
    ]
  },

  vegetables: {
    create: [
      { vegetableType: "unknown", sourceRaw: "사탕무박" },
      { vegetableType: "unknown", sourceRaw: "로즈마리 추출물" },
    ]
  }
}