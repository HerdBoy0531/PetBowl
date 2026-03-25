export const food6 = {
  name: "미니 더마컴포트",
  brand: "royal canin",
  animalType: "dog",
  lifeStage: "adult",
  sizeCategory: "s",
  isPrescription: false,
  country: "대한민국 김제",
  sourceUrl: "https://www.royalcanin.com/kr",

  analysis: {
    create: {
      protein: 23.5,
      fat: 15,
      fiber: 2.4,
      ash: 5.8,
      moisture: 10.5,
      calcium: 0.48,
      phosphorus: 0.48,
    }
  },

  ingredients: {
    create: [
      { ingredientRaw: "쌀" },
      { ingredientRaw: "밀 글루텐" },
      { ingredientRaw: "밀" },
      { ingredientRaw: "동물성 지방(닭, 오리, 돼지)" },
      { ingredientRaw: "옥수수 글루텐" },
      { ingredientRaw: "귀리" },
      { ingredientRaw: "옥수수" },
      { ingredientRaw: "동물성 유도단백질(닭, 칠면조)" },
      { ingredientRaw: "혼합광물질류 합제" },
      { ingredientRaw: "대두유" },
      { ingredientRaw: "사탕무박" },
      { ingredientRaw: "어유" },
      { ingredientRaw: "아마" },
      { ingredientRaw: "프락토올리고당" },
      { ingredientRaw: "글리세린 지방산 에스테르" },
      { ingredientRaw: "보리지유" },
      { ingredientRaw: "금잔화 분말" },
      { ingredientRaw: "아미노산제 합제" },
      { ingredientRaw: "비타민 A" },
      { ingredientRaw: "비타민 D3" },
      { ingredientRaw: "철" },
      { ingredientRaw: "요오드" },
      { ingredientRaw: "구리" },
      { ingredientRaw: "망간" },
      { ingredientRaw: "아연" },
      { ingredientRaw: "셀레늄" },
      { ingredientRaw: "제올라이트" },
      { ingredientRaw: "소르빈산칼륨" },
      { ingredientRaw: "항산화제" }
    ]
  },

  proteins: {
    create: [
      { proteinType: "unknown", sourceRaw: "밀 글루텐", isPrimary: true },
      { proteinType: "unknown", sourceRaw: "옥수수 글루텐", isPrimary: false },
      { proteinType: "chicken", sourceRaw: "동물성 유도단백질(닭, 칠면조)", isPrimary: false },
      { proteinType: "turkey", sourceRaw: "동물성 유도단백질(닭, 칠면조)", isPrimary: false },
    ]
  },

  carbohydrates: {
    create: [
      { carbType: "rice", sourceRaw: "쌀" },
      { carbType: "unknown", sourceRaw: "밀" },
      { carbType: "oat", sourceRaw: "귀리" },
      { carbType: "corn", sourceRaw: "옥수수" },
    ]
  },

  vegetables: {
    create: [
      { vegetableType: "unknown", sourceRaw: "사탕무박" },
      { vegetableType: "unknown", sourceRaw: "금잔화 분말" },
    ]
  }
}