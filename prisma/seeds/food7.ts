export const food7 = {
  name: "닥스훈트 어덜트",
  brand: "royal canin",
  animalType: "dog",
  lifeStage: "adult",
  sizeCategory: "s",
  isPrescription: false,
  country: "대한민국 김제",
  sourceUrl: "https://www.royalcanin.com/kr",

  analysis: {
    create: {
      protein: 28,
      fat: 14,
      fiber: 2.9,
      ash: 6.4,
      // 나머지는 null → 생략
    }
  },

  ingredients: {
    create: [
      { ingredientRaw: "쌀" },
      { ingredientRaw: "육분(닭, 오리)" },
      { ingredientRaw: "밀 글루텐" },
      { ingredientRaw: "동물성 유도단백질(닭, 칠면조, 돼지)" },
      { ingredientRaw: "동물성 지방(닭, 오리, 돼지)" },
      { ingredientRaw: "분말 셀룰로오스" },
      { ingredientRaw: "사탕무박" },
      { ingredientRaw: "혼합광물질류 합제" },
      { ingredientRaw: "어유" },
      { ingredientRaw: "대두유" },
      { ingredientRaw: "프락토올리고당" },
      { ingredientRaw: "보리지유" },
      { ingredientRaw: "금잔화 분말" },
      { ingredientRaw: "글루코사민" },
      { ingredientRaw: "뮤코다당단백" },
      { ingredientRaw: "아미노산제 합제" },
      { ingredientRaw: "비타민A" },
      { ingredientRaw: "비타민D3" },
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
      { proteinType: "chicken", sourceRaw: "육분(닭, 오리)", isPrimary: true },
      { proteinType: "duck", sourceRaw: "육분(닭, 오리)", isPrimary: true },
      { proteinType: "unknown", sourceRaw: "밀 글루텐", isPrimary: false },
      { proteinType: "chicken", sourceRaw: "동물성 유도단백질(닭, 칠면조, 돼지)", isPrimary: false },
      { proteinType: "turkey", sourceRaw: "동물성 유도단백질(닭, 칠면조, 돼지)", isPrimary: false },
      { proteinType: "unknown", sourceRaw: "동물성 유도단백질(닭, 칠면조, 돼지)", isPrimary: false },
    ]
  },

  carbohydrates: {
    create: [
      { carbType: "rice", sourceRaw: "쌀" },
    ]
  },

  vegetables: {
    create: [
      { vegetableType: "unknown", sourceRaw: "사탕무박" },
      { vegetableType: "unknown", sourceRaw: "금잔화 분말" },
    ]
  }
}