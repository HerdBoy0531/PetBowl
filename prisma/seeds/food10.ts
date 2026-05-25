import {
  AnimalType,
  LifeStage,
  Allergy,
  Certification,
} from "@prisma/client";

export const food10 = {
  nameKo: "네츄럴랩 6-ZERO PLUS 4",
  nameEn: "Natural Lab 6-zero plus 04 salmon",

  brandKo: "네츄럴랩",
  brandEn: "Natural Lab",

  animalType: AnimalType.dog,
  lifeStage: LifeStage.senior,
  sizeCategory: "all",

  isPrescription: false,

  price: 18000,
  kibbleSize: 10,

  allergies: [Allergy.HYDROLYZED],

  certifications: [Certification.FSSC22000, 
    Certification.HACCP, 
    Certification.ORGANIC,
    Certification.AAFCO],

  country: "대한민국",
  sourceUrl: "https://naturallab.net/",

  analysis: {
    create: {
      protein: 21,
      fat: 10,
      fiber: 6,
      ash: 9,
      moisture: 12,

      calcium: 0.9,
      phosphorus: 0.7,
    },
  },

  ingredients: {
    create: [
      { ingredientRaw: "가수분해 연어" },
      { ingredientRaw: "유기현미" },
      { ingredientRaw: "유기보리" },
      { ingredientRaw: "유기고구마" },
      { ingredientRaw: "유기녹두" },
      { ingredientRaw: "유기해바라기씨" },
      { ingredientRaw: "유기완두" },
      { ingredientRaw: "베타글루칸" },
      { ingredientRaw: "어골칼슘" },
      { ingredientRaw: "DL-메치오닌" },
      { ingredientRaw: "어분" },
      { ingredientRaw: "건조크릴" },
      { ingredientRaw: "어유" },
      { ingredientRaw: "사탕무박(무 섬유소)" },
      { ingredientRaw: "프락토올리고당" },
      { ingredientRaw: "타우린" },
      { ingredientRaw: "비타민제합제" },
      { ingredientRaw: "미네랄제합제" },
      { ingredientRaw: "아마씨" },
      { ingredientRaw: "유카추출물" },
      { ingredientRaw: "염화칼륨" },
      { ingredientRaw: "가수분해초록입홍합복합물" },
      { ingredientRaw: "천일염" },
      { ingredientRaw: "씨벅턴열매" },
      { ingredientRaw: "달맞이꽃종자" },
      { ingredientRaw: "고수" },
      { ingredientRaw: "당근" },
      { ingredientRaw: "시금치" },
      { ingredientRaw: "글루코사민" },
      { ingredientRaw: "아스코르빈산" },
      { ingredientRaw: "SPM OMEGA-3" },
      { ingredientRaw: "유익균합제" },
    ],
  },

  proteins: {
    create: [
      {
        proteinType: "salmon",
        sourceRaw: "가수분해 연어",
        isPrimary: true,
      },
      {
        proteinType: "fish",
        sourceRaw: "어분",
        isPrimary: false,
      },
      {
        proteinType: "krill",
        sourceRaw: "건조크릴",
        isPrimary: false,
      },
      {
        proteinType: "green_lipped_mussel",
        sourceRaw: "가수분해초록입홍합복합물",
        isPrimary: false,
      },
    ],
  },

  carbohydrates: {
    create: [
      { carbType: "brown_rice", sourceRaw: "유기현미" },
      { carbType: "barley", sourceRaw: "유기보리" },
      { carbType: "sweet_potato", sourceRaw: "유기고구마" },
      { carbType: "mung_bean", sourceRaw: "유기녹두" },
      { carbType: "pea", sourceRaw: "유기완두" },
      { carbType: "beet_pulp", sourceRaw: "사탕무박(무 섬유소)" },
    ],
  },

  vegetables: {
    create: [
      { vegetableType: "sea_buckthorn", sourceRaw: "씨벅턴열매" },
      { vegetableType: "coriander", sourceRaw: "고수" },
      { vegetableType: "carrot", sourceRaw: "당근" },
      { vegetableType: "spinach", sourceRaw: "시금치" },
    ],
  },
};