import {Category} from "../entities/Category";


export const listCategories = () => {
  return categoryList;
};

export const categoryList: Category[] = [
  {
    value: "エンターテイメント",
    label: "エンターテイメント",
    children: [
      {
        value: "音楽配信",
        label: "音楽配信",
      },
      {
        value: "動画配信",
        label: "動画配信",
      },
      {
        value: "オンラインゲーム",
        label: "オンラインゲーム",
      },
      {
        value: "その他",
        label: "その他",
      },
    ],
  },
  {
    value: "保険",
    label: "保険",
    children: [
      {
        value: "生命保険",
        label: "生命保険",
      },
      {
        value: "養老保険",
        label: "養老保険",
      },
      {
        value: "医療保険",
        label: "医療保険",
      },
      {
        value: "がん保険",
        label: "がん保険",
      },
      {
        value: "自動車保険",
        label: "自動車保険",
      },
      {
        value: "学資保険",
        label: "学資保険",
      },
      {
        value: "その他",
        label: "その他",
      },
    ],
  },
  {
    value: "その他",
    label: "その他",
  },
];
