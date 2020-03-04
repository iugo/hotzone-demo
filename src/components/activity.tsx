import * as React from "react";
import { useState } from "react";
import { Activity, Hotzone } from "../types";
import { isSingle, isHotzone } from "../type-check";
import { out } from "../functions";

function wxTo(url: string) {
  // TODO: 微信小程序跳轉
  alert(`链接跳转至 ${url}`);
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
            <div
              key={i}
              style={{
                display: "flex",
                position: "sticky"
              }}
            >
              {v.hotzone.map((v, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: v.position[0],
                    top: v.position[1],
                    width: v.widthHeight[0],
                    height: v.widthHeight[1]
                  }}
                  onClick={() => {
                    wxTo(v.link);
                  }}
                />
              ))}
              <img alt="" src={v.imageUrl} />
            </div>
          );
        }
        return <div key={i}>無效數據: {JSON.stringify(v)}</div>;
      })}
    </div>
  );
}

export function SelectHotzone(props: {
  imageUrl: string;
  prevHotzones: Hotzone[];
  addHotzoneCallback: (
    newHotzone: Hotzone,
    options: { width: number; height: number }
  ) => void;
  removeHotzoneCallback: (i: number) => void;
}) {
  const {
    imageUrl,
    prevHotzones,
    addHotzoneCallback,
    removeHotzoneCallback
  } = props;
  /** 是否在拖动状态 */
  const [isDrop, setIsDrop] = useState(false);
  /** 储存之前的坐标, 用于计算宽高 */
  const [clickXY, setClickXY] = useState([0, 0]);
  /** 热区坐标 */
  const [position, setPosition] = useState([0, 0] as [number, number]);
  /** 热区宽高 */
  const [widthHeight, setWidthHeight] = useState([0, 0] as [number, number]);
  /** 当前热区数据 */
  const [hotzone, setHotzone] = useState(prevHotzones);

  function clickHandler(e: React.MouseEvent) {
    const target = e.currentTarget;
    if (!(target instanceof HTMLElement)) {
      throw new Error("程序有误, event target should be HTMLElement");
    }
    if (!isDrop) {
      out("begin", e.type);
      const x = e.pageX - target.offsetLeft;
      const y = e.pageY - target.offsetTop;
      setClickXY([e.pageX, e.pageY]);
      setPosition([x, y]);
      // out("setPosition", [x, y]);
    } else {
      out("end", e.type);
      const theImg = target.querySelector("img");
      if (!theImg) {
        throw new Error("程序有误, 没有找到 img DOM");
      }
      setHotzone([
        ...hotzone,
        {
          position,
          widthHeight
        }
      ]);
      addHotzoneCallback(
        {
          position,
          widthHeight
        },
        {
          width: theImg.width,
          height: theImg.height
        }
      );
      setWidthHeight([0, 0]);
    }
    out("page X Y", [e.pageX, e.pageY]);
    out("target", target);
    out("target X Y", [target.offsetLeft, target.offsetTop]);
    setIsDrop(!isDrop);
  }

  function moveHandler(e) {
    if (isDrop) {
      // console.log("pageX", e.pageX);
      // console.log("pageY", e.pageY);
      const width = e.pageX - clickXY[0];
      const height = e.pageY - clickXY[1];
      // console.log("setWidthHeight", [width, height]);
      setWidthHeight([width, height]);
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          position: "sticky"
        }}
        onClick={clickHandler}
        onPointerMove={moveHandler}
      >
        {hotzone.map((v, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: v.position[0],
              top: v.position[1],
              width: v.widthHeight[0],
              height: v.widthHeight[1],
              backgroundColor: "rgba(200, 100, 100, 0.7)"
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            backgroundColor: "rgba(100, 100, 100, 0.7)",
            left: position[0],
            top: position[1],
            width: widthHeight[0],
            height: widthHeight[1]
          }}
        />
        <img alt="test hehe" src={imageUrl} />
      </div>
      {hotzone.map((v, i) => (
        <div key={i}>
          区域 {JSON.stringify(v)}{" "}
          <span
            onClick={() => {
              const newData = hotzone.filter((it, i2) => i !== i2);
              setHotzone(newData);
              removeHotzoneCallback(i);
            }}
          >
            删除
          </span>
        </div>
      ))}
    </div>
  );
}
