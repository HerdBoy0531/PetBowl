import {
  AnimalType,
  LifeStage,
  Allergy,
  Certification,
} from "@prisma/client";

export const food6 = {
  nameKo: "네츄럴랩 케어4 강아지사료 다이어트*면역",
  nameEn: "Natural Lab care4 diet&immunity",

  brandKo: "네츄럴랩",
  brandEn: "Natural Lab",

  animalType: AnimalType.dog,
  lifeStage: LifeStage.all,
  sizeCategory: "all",

  isPrescription: false,

  price: 27000,
  kibbleSize: 11,

  allergies: [Allergy.HYDROLYZED],

  certifications: [Certification.FSSC22000, 
    Certification.HACCP, 
    Certification.ORGANIC,
    Certification.ECOCERT],

  country: "대한민국",
  sourceUrl: "https://naturallab.net/",

  analysis: {
    create: {
      protein: 24,
      fat: 9,
      fiber: 8,
      ash: 9,
      moisture: 12,

      calcium: 0.9,
      phosphorus: 0.7,
    },
  },

  ingredients: {
    create: [
      { ingredientRaw: "가수분해 소고기" },
      { ingredientRaw: "유기 현미" },
      { ingredientRaw: "유기 고구마" },
      { ingredientRaw: "유기 녹두" },
      { ingredientRaw: "유기 해바라기씨" },
      { ingredientRaw: "유기 보리" },
      { ingredientRaw: "유기 완두" },
      { ingredientRaw: "비트펄프" },
      { ingredientRaw: "유기 아마씨" },
      { ingredientRaw: "인산칼슘" },
      { ingredientRaw: "프락토올리고당" },
      { ingredientRaw: "비타민제 합제" },
      { ingredientRaw: "미네랄제 합제" },
      { ingredientRaw: "유카추출물" },
      { ingredientRaw: "건조크릴" },
      { ingredientRaw: "크릴오일" },
      { ingredientRaw: "메티오닌" },
      { ingredientRaw: "타우린" },
      { ingredientRaw: "천일염" },
      { ingredientRaw: "가수분해 초록입홍합 복합물" },
      { ingredientRaw: "씨벅턴열매" },
      { ingredientRaw: "달맞이꽃종자" },
      { ingredientRaw: "고수" },
      { ingredientRaw: "당근" },
      { ingredientRaw: "시금치" },
      { ingredientRaw: "L-카르니틴" },
      { ingredientRaw: "글루코사민" },
      { ingredientRaw: "EPA-DHA" },
      { ingredientRaw: "아스코르빈산" },
      { ingredientRaw: "유익균 합제" },
      { ingredientRaw: "유산균건조분말" },
    ],
  },

  proteins: {
    create: [
      {
        proteinType: "beef",
        sourceRaw: "가수분해 소고기",
        isPrimary: true,
      },
      {
        proteinType: "green_lipped_mussel",
        sourceRaw: "가수분해 초록입홍합 복합물",
        isPrimary: false,
      },
      {
        proteinType: "krill",
        sourceRaw: "건조크릴",
        isPrimary: false,
      },
    ],
  },

  carbohydrates: {
    create: [
      {
        carbType: "brown_rice",
        sourceRaw: "유기 현미",
      },
      {
        carbType: "sweet_potato",
        sourceRaw: "유기 고구마",
      },
      {
        carbType: "mung_bean",
        sourceRaw: "유기 녹두",
      },
      {
        carbType: "barley",
        sourceRaw: "유기 보리",
      },
      {
        carbType: "pea",
        sourceRaw: "유기 완두",
      },
      {
        carbType: "beet_pulp",
        sourceRaw: "비트펄프",
      },
    ],
  },

  vegetables: {
    create: [
      {
        vegetableType: "sea_buckthorn",
        sourceRaw: "씨벅턴열매",
      },
      {
        vegetableType: "coriander",
        sourceRaw: "고수",
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