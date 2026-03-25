export const food4 = {
  name: "골든리트리버퍼피",
  brand: "royal canin",
  animalType: "dog",
  lifeStage: "puppy",
  sizeCategory: "all",
  isPrescription: false,
  country: "대한민국 김제",
  sourceUrl: "https://www.royalcanin.com/kr",

  analysis: {
    create: {
      protein: 27,
      fat: 14,
      fiber: 4.7,
      ash: 8.1,
      moisture: 10.5,
      calcium: 1.01,
      phosphorus: 0.8,
    }
  },

  ingredients: {
    create: [
      { ingredientRaw: "육분(닭, 오리)" },
      { ingredientRaw: "쌀" },
      { ingredientRaw: "옥수수" },
      { ingredientRaw: "밀 글루텐" },
      { ingredientRaw: "밀" },
      { ingredientRaw: "동물성 지방(닭, 오리, 돼지)" },
      { ingredientRaw: "동물성 유도단백질(닭, 칠면조, 돼지)" },
      { ingredientRaw: "분말셀룰로오스" },
      { ingredientRaw: "사탕무박" },
      { ingredientRaw: "어유" },
      { ingredientRaw: "혼합광물질류 합제" },
      { ingredientRaw: "대두유" },
      { ingredientRaw: "프락토올리고당(0.5%)" },
      { ingredientRaw: "제지방산에스테르" },
      { ingredientRaw: "효모(만난올리고당의 원료)" },
      { ingredientRaw: "글루코사민" },
      { ingredientRaw: "브로콜리분말(0.1%)" },
      { ingredientRaw: "금잔화분말" },
      { ingredientRaw: "프로바이오틱스(바실러스)" },
      { ingredientRaw: "알파-리포산" },
      { ingredientRaw: "비타민 A" },
      { ingredientRaw: "비타민 D3" },
      { ingredientRaw: "철" },
      { ingredientRaw: "요오드" },
      { ingredientRaw: "구리" },
      { ingredientRaw: "망간" },
      { ingredientRaw: "아연" },
      { ingredientRaw: "셀레늄" },
      { ingredientRaw: "제올라이트" },
      { ingredientRaw: "유카 추출물" },
      { ingredientRaw: "소르빈산칼륨" },
      { ingredientRaw: "항산화제" }
    ]
  },

  proteins: {
    create: [
      { proteinType: "chicken", sourceRaw: "육분(닭, 오리)", isPrimary: true },
      { proteinType: "duck", sourceRaw: "육분(닭, 오리)", isPrimary: true },
      { proteinType: "chicken", sourceRaw: "동물성 유도단백질(닭, 칠면조, 돼지)", isPrimary: false },
      { proteinType: "turkey", sourceRaw: "동물성 유도단백질(닭, 칠면조, 돼지)", isPrimary: false },
      { proteinType: "unknown", sourceRaw: "동물성 유도단백질(닭, 칠면조, 돼지)", isPrimary: false },
      { proteinType: "unknown", sourceRaw: "밀 글루텐", isPrimary: false },
    ]
  },

  carbohydrates: {
    create: [
      { carbType: "rice", sourceRaw: "쌀" },
      { carbType: "corn", sourceRaw: "옥수수" },
      { carbType: "unknown", sourceRaw: "밀" },
    ]
  },

  vegetables: {
    create: [
      { vegetableType: "unknown", sourceRaw: "사탕무박" },
      { vegetableType: "unknown", sourceRaw: "브로콜리분말" },
      { vegetableType: "unknown", sourceRaw: "금잔화분말" },
      { vegetableType: "unknown", sourceRaw: "유카 추출물" },
    ]
  }
}