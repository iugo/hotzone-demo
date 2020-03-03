import * as React from "react";
import { useState } from "react";
import { Hotzone } from "../types";

export default function Test() {
  return (
    <SelectHotzone
      imageUrl="https://i.imgur.com/GvB85NN.jpeg"
      hotzoneChangeCallback={v => {
        console.log("hotzoneChangeCallback", v);
      }}
    />
  );
}

function SelectHotzone(props: {
  imageUrl: string;
  hotzoneChangeCallback: (v: Hotzone[]) => void;
}) {
  const { imageUrl, hotzoneChangeCallback } = props;
  /** 是否在拖动状态 */
  const [isDrop, setIsDrop] = useState(false);
  /** 储存之前的坐标, 用于计算宽高 */
  const [clickXY, setClickXY] = useState([0, 0]);
  /** 热区坐标 */
  const [position, setPosition] = useState([0, 0] as [number, number]);
  /** 热区宽高 */
  const [widthHeight, setWidthHeight] = useState([0, 0] as [number, number]);
  /** 当前热区数据 */
  const [hotzone, setHotzone] = useState([] as Hotzone[]);

  function changeHotzone(v: Hotzone[]) {
    setHotzone(v);
    hotzoneChangeCallback(v);
  }

  function clickHandler(e: React.MouseEvent) {
    const target = e.currentTarget;
    if (!(target instanceof HTMLElement)) {
      throw new Error("程序有误, event target should be HTMLElement");
    }
    if (!isDrop) {
      console.log("begin", e.type);
      const x = e.pageX - target.offsetLeft;
      const y = e.pageY - target.offsetTop;
      setClickXY([e.pageX, e.pageY]);
      setPosition([x, y]);
      // console.log("setPosition", [x, y]);
    } else {
      console.log("end", e.type);
      console.log("img", target.querySelector("img").width);
      console.log("img", target.querySelector("img").height);
      changeHotzone([
        ...hotzone,
        {
          position,
          widthHeight
        }
      ]);
      setWidthHeight([0, 0]);
    }
    console.log("page X Y", [e.pageX, e.pageY]);
    console.log("target", target);
    console.log("target X Y", [target.offsetLeft, target.offsetTop]);
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
              changeHotzone(hotzone.filter((it, i2) => i !== i2));
            }}
          >
            删除
          </span>
        </div>
      ))}
    </div>
  );
}
