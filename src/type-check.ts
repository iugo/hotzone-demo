import { ActivitySingle, ActivityHotzone } from "./types";

export const isSingle = (v: any): v is ActivitySingle => {
  if (v.link) {
    return true;
  }
  return false;
};

export const isHotzone = (v: any): v is ActivityHotzone => {
  if (v.hotzone) {
    return true;
  }
  return false;
};
