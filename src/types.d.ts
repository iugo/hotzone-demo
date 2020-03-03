/** 活动 */
export interface Activity {
  /** 活动 ID */
  id: string;
  /** 活动名称 */
  title: string;
  /** 活动描述 */
  desc?: string;
  /** 活动图片集 */
  images: ActivityImage[];
}

type ActivityImage = ActivitySingle | ActivityHotzone;

interface BaseActivity {
  imageUrl: WXMiniURL;
}

export interface ActivitySingle extends BaseActivity {
  link: WXMiniURL;
}

export interface ActivityHotzone extends BaseActivity {
  hotzone: HotzoneWithLink[];
}

interface HotzoneWithLink extends Hotzone {
  link: WXMiniURL;
}

export interface Hotzone {
  position: [number, number];
  widthHeight: [number, number];
}

type WXMiniURL = string;
