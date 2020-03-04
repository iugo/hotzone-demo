import * as React from "react";
import { Activity } from "../../types";
import { Link } from "react-router-dom";
import { getActivities } from "../../models/api";

/** 活动列表页面 */
export default function Activities() {
  const [activities, setActivities] = React.useState([] as Activity[]);
  React.useEffect(() => {
    getActivities().then(setActivities);
  }, []);
  return (
    <>
      {activities.map((v, i) => {
        return (
          <div key={i}>
            <h2>{v.title}</h2>
            <Link to={`/activity/${v.id}`}>Open</Link>
            {" | "}
            <Link to={`/edit-activity/${v.id}`}>Edit</Link>
            {" | "}
            <Link to={`/activity/${v.id}?u=123`}>Share</Link>
          </div>
        );
      })}
    </>
  );
}
