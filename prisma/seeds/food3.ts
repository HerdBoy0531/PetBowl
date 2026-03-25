export const food3 = {
  name: "미니인도어퍼피",
  brand: "royal canin",
  animalType: "dog",
  lifeStage: "puppy",
  sizeCategory: "s",
  isPrescription: false,
  country: "대한민국 김제",
  sourceUrl: "https://www.royalcanin.com/kr",

  analysis: {
    create: {
      protein: 25,
      fat: 16,
      fiber: 2.5,
      ash: 8.7,
      moisture: 10.5,
      calcium: 1.048,
      phosphorus: 0.8,
    }
  },

  ingredients: {
    create: [
      { ingredientRaw: "쌀" },
      { ingredientRaw: "옥수수" },
      { ingredientRaw: "육분(닭, 오리)" },
      { ingredientRaw: "동물성 지방(닭, 오리)" },
      { ingredientRaw: "밀 글루텐" },
      { ingredientRaw: "사탕무박" },
      { ingredientRaw: "동물성 유도단백질(닭, 칠면조)" },
      { ingredientRaw: "혼합광물질류 합제" },
      { ingredientRaw: "옥수수 글루텐" },
      { ingredientRaw: "대두유" },
      { ingredientRaw: "어유" },
      { ingredientRaw: "프락토올리고당" },
      { ingredientRaw: "해조유(DHA의 원료)" },
      { ingredientRaw: "가수분해효모(만난올리고당의 원료)" },
      { ingredientRaw: "효모추출물(베타글루칸의 원료)" },
      { ingredientRaw: "글라이스활성(베타글루칸의 원료)" },
      { ingredientRaw: "글루타치온" },
      { ingredientRaw: "L-카르니틴" },
      { ingredientRaw: "프로바이오틱스(바실러스)" },
      { ingredientRaw: "아이노산합제" },
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
      { proteinType: "chicken", sourceRaw: "동물성 유도단백질(닭, 칠면조)", isPrimary: false },
      { proteinType: "turkey", sourceRaw: "동물성 유도단백질(닭, 칠면조)", isPrimary: false },
      { proteinType: "unknown", sourceRaw: "밀 글루텐", isPrimary: false },
      { proteinType: "unknown", sourceRaw: "옥수수 글루텐", isPrimary: false },
    ]
  },

  carbohydrates: {
    create: [
      { carbType: "rice", sourceRaw: "쌀" },
      { carbType: "corn", sourceRaw: "옥수수" },
    ]
  },

  vegetables: {
    create: [
      { vegetableType: "unknown", sourceRaw: "사탕무박" },
      { vegetableType: "unknown", sourceRaw: "유카 추출물" },
    ]
  }
}