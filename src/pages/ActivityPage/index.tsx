import * as React from "react";
import { useParams } from "react-router";
import { getActivity } from "../../models/api";
import { Activity } from "../../types";
import { ActivityRender } from "../../components/activity";

import "./style.css";

/** 活动展示页面 */
export default function ActivityPage() {
  const [activity, setActivity] = React.useState({} as Activity);
  const [loading, setLoading] = React.useState(true);
  const { activityId } = useParams();
  React.useEffect(() => {
    console.log("调取 API 一次");
    if (!activityId) {
      // TODO: 错误处理
      return;
    }
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
  return <ActivityRender activity={activity} />;
}
