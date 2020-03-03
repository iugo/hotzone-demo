import * as React from "react";
import { SelectHotzone } from "../components/activity";

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
