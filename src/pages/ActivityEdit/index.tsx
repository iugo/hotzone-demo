import * as React from "react";
import { useParams } from "react-router";
import update from "immutability-helper";

import { getActivity } from "../../models/api";
import { Activity, ActivityImage, HotzoneWithLink } from "../../types";
import { isSingle, isHotzone } from "../../type-check";
import { SelectHotzone } from "../../components/activity";

/** 编辑活动页面 */
export default function ActivityEdit() {
  const [activity, setActivity] = React.useState({} as Activity);
  const [loading, setLoading] = React.useState(true);
  const { activityId } = useParams();
  React.useEffect(() => {
    console.log("调取 API 一次");
    if (!activityId) {
      setLoading(false);
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
              prevHotzones={v.hotzone}
              addHotzoneCallback={newHotzone => {
                console.log("hotzoneChangeCallback", newHotzone);
                const link = prompt("请输入链接");
                if (!link) {
                  throw new Error("必须输入链接");
                }
                const newHot: HotzoneWithLink = {
                  ...newHotzone,
                  link
                };
                const newData = update(activity, {
                  images: {
                    [i]: {
                      hotzone: {
                        $push: [newHot]
                      }
                    }
                  }
                });
                setActivity(newData);
              }}
              removeHotzoneCallback={removedIndex => {
                const newData = update(activity, {
                  images: {
                    [i]: {
                      hotzone: {
                        $set: v.hotzone.filter(
                          (nouse, i2) => removedIndex !== i2
                        )
                      }
                    }
                  }
                });
                setActivity(newData);
              }}
            />
          );
        }
        return <div key={i}>無效數據: {JSON.stringify(v)}</div>;
      })}
      <button
        onClick={() => {
          const link = prompt("请输入图片链接");
          console.log("activity", activity);
          if (!link) {
            throw new Error("必须输入图片链接");
          }
          const img: ActivityImage = {
            imageUrl: link,
            hotzone: []
          };
          const newData = update(activity, {
            images: {
              $push: [img]
            }
          });
          setActivity(newData);
        }}
      >
        新增热区图片
      </button>
      <button
        onClick={() => {
          console.log("save", activity);
        }}
      >
        保存
      </button>
    </div>
  );
}
