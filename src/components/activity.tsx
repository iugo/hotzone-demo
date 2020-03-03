import * as React from "react";
import { Activity } from "../types";
import { isSingle, isHotzone } from "../type-check";

function wxTo(url: string) {
  // TODO: 微信小程序跳轉
  console.log(`链接跳转至 ${url}`);
}

export function ActivityRender(props: { activity: Activity }) {
  const { activity } = props;
  return (
    <div className="activity-img">
      {activity.images.map((v, i) => {
        if (isSingle(v)) {
          return (
            <div
              onClick={() => {
                wxTo(v.link);
              }}
              key={i}
            >
              <img alt="" src={v.imageUrl} />
            </div>
          );
        }

        if (isHotzone(v)) {
          return (
            <div key={i}>
              <img alt="" src={v.imageUrl} />
            </div>
          );
        }
        return <div key={i}>無效數據: {JSON.stringify(v)}</div>;
      })}
    </div>
  );
}
