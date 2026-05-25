import {
  AnimalType,
  LifeStage,
  Allergy,
  Certification,
} from "@prisma/client";

export const food2 = {
  nameKo: "오쿡 소프트 바이트 치킨&야채",
  nameEn: "Ocook Soft Bite Chicken & Vegetable",

  brandKo: "오쿡",
  brandEn: "Ocook",


  animalType: AnimalType.dog,
  lifeStage: LifeStage.all,
  sizeCategory: "all",

  isPrescription: false,

  price: 15000,
  kibbleSize: 9,

  allergies: [],
  certifications: [],

  country: "일본",
  sourceUrl: "https://naturallab.net/",

  analysis: {
    create: {
      protein: 13.5,
      fat: 3.4,
      fiber: 5.0,
      ash: 11.0,
      moisture: 33.0,

      calcium: 1.2,
      phosphorus: 0.01,
    },
  },

  ingredients: {
    create: [
      { ingredientRaw: "소맥분" },
      { ingredientRaw: "닭고기" },
      { ingredientRaw: "올리고당" },
      { ingredientRaw: "미네랄(인산칼슘, 염화나트륨, 탄산칼슘, 염화마그네슘, 염화칼륨, 황산철, 탄산아연, 황산동, 탄산망간, 요오드산칼슘)" },
      { ingredientRaw: "프로필렌글리콜" },
      { ingredientRaw: "글리세린" },
      { ingredientRaw: "소르빈산칼슘" },
      { ingredientRaw: "L-리신염산염" },
      { ingredientRaw: "항산화제(에르소르빈산나트륨, 혼합토코페롤, 로즈마리추출물)" },
      { ingredientRaw: "비타민(콜린, 비타민A, C, E, 니코틴산, 판토텐산, 비타민B1, 2, 6, 12, 엽산, 비타민D)" },
      { ingredientRaw: "산도조절제(퓨말산)" },
      { ingredientRaw: "착색제(이산화티타늄, 황색-4, 5호, 청색-1호, 적색-106호)" },
      { ingredientRaw: "고구마" },
      { ingredientRaw: "호박" },
      { ingredientRaw: "당근" },
      { ingredientRaw: "시금치" },
    ],
  },

  proteins: {
    create: [
      {
        proteinType: "chicken",
        sourceRaw: "닭고기",
        isPrimary: true,
      },
    ],
  },

  carbohydrates: {
    create: [
      {
        carbType: "wheat",
        sourceRaw: "소맥분",
      },
      {
        carbType: "sweet_potato",
        sourceRaw: "고구마",
      },
    ],
  },

  vegetables: {
    create: [
      {
        vegetableType: "pumpkin",
        sourceRaw: "호박",
      },
      {
        vegetableType: "carrot",
        sourceRaw: "당근",
      },
      {
        vegetableType: "spinach",
        sourceRaw: "시금치",
      },
    ],
  },
};