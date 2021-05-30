import { Category } from "../entities/Category";

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
        value: "ゲーム",
        label: "ゲーム",
      },
      {
        value: "読み放題",
        label: "読み放題",
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
        value: "ペット保険",
        label: "ペット保険",
      },
      {
        value: "その他",
        label: "その他",
      },
    ],
  },
  {
    value: "仕事効率化",
    label: "仕事効率化",
    children: [
      {
        value: "クラウドストレージ",
        label: "クラウドストレージ",
      },
      {
        value: "ノート",
        label: "ノート",
      },
      {
        value: "生産ツール",
        label: "生産ツール",
      },
    ],
  },
  {
    value: "生活",
    label: "生活",
    children: [
      {
        value: "通信費",
        label: "通信費",
      },
      {
        value: "光熱費",
        label: "光熱費",
      },
      {
        value: "住居費",
        label: "住居費",
      },
      {
        value: "車両関係費用",
        label: "車両関係費用",
      },
    ],
  },
  {
    value: "スキルアップ",
    label: "スキルアップ",
    children: [{ value: "料理教室", label: "料理教室" }],
  },
  {
    value: "学習",
    label: "学習",
    children: [
      {
        value: "予備校・塾",
        label: "予備校・塾",
      },
      {
        value: "英会話",
        label: "英会話",
      },
      {
        value: "Eラーニング",
        label: "Eラーニング",
      },
    ],
  },
  {
    value: "スポーツ",
    label: "スポーツ",
    children: [
      {
        value: "格闘技",
        label: "格闘技",
      },
      {
        value: "水泳",
        label: "水泳",
      },
      {
        value: "ゴルフ",
        label: "ゴルフ",
      },
      {
        value: "スポーツジム",
        label: "スポーツジム",
      },
      {
        value: "球技",
        label: "球技",
      },
    ],
  },
  {
    value: "カスタム",
    label: "カスタム",
  },
];
