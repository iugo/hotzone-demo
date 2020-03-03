import * as React from "react";
import { useParams } from "react-router";

import { getActivity } from "../../models/api";
import { Activity } from "../../types";
import { isSingle, isHotzone } from "../../type-check";
import { SelectHotzone } from "../../components/activity";

/** 编辑活动页面 */
export default function ActivityEdit() {
  const [activity, setActivity] = React.useState({} as Activity);
  const [loading, setLoading] = React.useState(true);
  let { activityId } = useParams();
  React.useEffect(() => {
    console.log("调取 API 一次");
    getActivity(activityId)
      .then(setActivity)
      .catch() // TODO: 错误处理
      .then(() => {
        setLoading(false);
      });
  }, [activityId]);
  if (loading) {
    return <span>正在加载</span>;
  }
  return (
    <div className="activity-img">
      <h2>编辑活动</h2>
      <p>ID: {activity.id}</p>
      <p>标题: {activity.title}</p>
      <p>描述: {activity.desc}</p>
      {activity.images.map((v, i) => {
        if (isSingle(v)) {
          return (
            <div key={i}>
              <img alt="" src={v.imageUrl} />
              <p>
                编辑图片: <input value={v.imageUrl} onChange={() => 1} />
              </p>
              <p>
                编辑链接: <input value={v.link} onChange={() => 1} />
              </p>
            </div>
          );
        }

        if (isHotzone(v)) {
          return (
            <SelectHotzone
              key={i}
              imageUrl={v.imageUrl}
              hotzoneChangeCallback={v => {
                console.log("hotzoneChangeCallback", v);
              }}
            />
          );
        }
        return <div key={i}>無效數據: {JSON.stringify(v)}</div>;
      })}
    </div>
  );
}
