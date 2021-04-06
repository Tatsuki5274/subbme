import { Category } from "entities/Category";


export const listCategories = () => {
    return categoryList;
}

export const categoryList: Category[] = [
    {
      value: 'エンターテイメント',
      label: 'エンターテインメント',
      children: [
        {
          value: '音楽配信',
          label: '音楽配信',
        },
        {
          value: '動画配信',
          label: '動画配信'
        },
        {
          value: 'その他',
          label: 'その他'
        }
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
];