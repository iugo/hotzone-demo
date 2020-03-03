import { Activity } from "../types";

const activities: Activity[] = [
  {
    id: "test",
    title: "测试活动1",
    desc: "一些描述文字",
    images: [
      {
        imageUrl: "https://i.imgur.com/Tdycwhs.png",
        link: "aaa"
      },
      {
        imageUrl: "https://i.imgur.com/H37kxPH.jpg",
        hotzone: []
      }
    ]
  }
];

export async function getActivities() {
  return activities as Activity[];
}

export async function getActivity(id: string) {
  return activities[0] as Activity;
}
