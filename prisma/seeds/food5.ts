export const food5 = {
  name: "미디움어덜트",
  brand: "royal canin",
  animalType: "dog",
  lifeStage: "adult",
  sizeCategory: "m",
  isPrescription: false,
  country: "대한민국 김제",
  sourceUrl: "https://www.royalcanin.com/kr",

  analysis: {
    create: {
      protein: 23,
      fat: 12,
      fiber: 2.4,
      ash: 6.5,
      moisture: 10.5,
      calcium: 0.96,
      phosphorus: 0.63,
    }
  },

  ingredients: {
    create: [
      { ingredientRaw: "육분(닭, 오리)" },
      { ingredientRaw: "밀가루" },
      { ingredientRaw: "옥수수" },
      { ingredientRaw: "밀" },
      { ingredientRaw: "옥수수 가루" },
      { ingredientRaw: "동물성 유지(닭, 오리)" },
      { ingredientRaw: "유도 단백질(닭, 칠면조, 어류)" },
      { ingredientRaw: "보리" },
      { ingredientRaw: "밀 글루텐" },
      { ingredientRaw: "사탕무박" },
      { ingredientRaw: "양조효모" },
      { ingredientRaw: "대두유" },
      { ingredientRaw: "탄산칼슘" },
      { ingredientRaw: "비타민제합제" },
      { ingredientRaw: "정제소금" },
      { ingredientRaw: "제일인산칼슘" },
      { ingredientRaw: "혼합광물질류 합제" },
      { ingredientRaw: "소르빈산칼륨" },
      { ingredientRaw: "염화칼륨" },
      { ingredientRaw: "해조분말" },
      { ingredientRaw: "비타민 E(합성착색제)" },
      { ingredientRaw: "어유" },
      { ingredientRaw: "효모(만난올리고당의 원료)" },
      { ingredientRaw: "해조유(EPA+DHA의 원료)" },
      { ingredientRaw: "DL-메티오닌" },
      { ingredientRaw: "비타민 C" },
      { ingredientRaw: "식물성 유지" },
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
      { proteinType: "unknown", sourceRaw: "밀 글루텐", isPrimary: false },
    ]
  },

  carbohydrates: {
    create: [
      { carbType: "unknown", sourceRaw: "밀가루" },
      { carbType: "corn", sourceRaw: "옥수수" },
      { carbType: "unknown", sourceRaw: "밀" },
      { carbType: "corn", sourceRaw: "옥수수 가루" },
      { carbType: "unknown", sourceRaw: "보리" },
    ]
  },

  vegetables: {
    create: [
      { vegetableType: "unknown", sourceRaw: "사탕무박" },
      { vegetableType: "unknown", sourceRaw: "해조분말" },
      { vegetableType: "unknown", sourceRaw: "로즈마리 추출물" },
    ]
  }
}