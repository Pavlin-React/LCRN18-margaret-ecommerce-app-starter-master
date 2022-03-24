import { View, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { SIZES, constants } from "../../constants";

let ITEM_WIDTH = 120;

const Walkthrough1 = () => {
  // Row 1
  let [row1Images, setRow1Images] = useState([
    ...constants.walkthrough_01_01_images,
    ...constants.walkthrough_01_01_images,
  ]);

  let [currentPosition, setCurrentPosition] = useState(0);

  // Row 2
  let [row2Images, setRow2Images] = useState([
    ...constants.walkthrough_01_02_images,
    ...constants.walkthrough_01_02_images,
  ]);

  let [row2CurrentPosition, setRow2CurrentPosition] = useState(0);

  // Ref
  let row1FlatListRef = useRef();
  let row2FlatListRef = useRef();

  useEffect(() => {
    let positionTimer;
    let timer = () => {
      positionTimer = setTimeout(() => {
        // increment scroll position with each new interval
        // Slider 1
        setCurrentPosition((prevPosition) => {
          let position = Number(prevPosition) + 1;
          row1FlatListRef?.current?.scrollToOffset({
            offset: position,
            animated: false,
          });
          let maxOffset =
            constants.walkthrough_01_01_images.length * ITEM_WIDTH;

          if (prevPosition > maxOffset) {
            let offset = prevPosition - maxOffset;
            row1FlatListRef?.current?.scrollToOffset({
              offset,
              animated: false,
            });
            return offset;
          } else {
            return position;
          }
        });

        // Slider 2

        setRow2CurrentPosition((prevPosition) => {
          let position = Number(prevPosition) + 1;
          row2FlatListRef?.current?.scrollToOffset({
            offset: position,
            animated: false,
          });
          let maxOffset =
            constants.walkthrough_01_02_images.length * ITEM_WIDTH;

          if (prevPosition > maxOffset) {
            let offset = prevPosition - maxOffset;
            row2FlatListRef?.current?.scrollToOffset({
              offset,
              animated: false,
            });
            return offset;
          } else {
            return position;
          }
        });

        timer();
      }, 32);
    };
    timer();
    return () => {
      clearTimeout(positionTimer);
    };
  }, []);

  return (
    <View>
      {/* Slider 1 */}
      <FlatList
        ref={row1FlatListRef}
        decelerationRate="fast"
        horizontal
        scrollEnable={false}
        showHorizontalScrollIndicator={false}
        listKey="Slider1"
        keyExtractor={(_, index) => `Slider1_${index}`}
        data={row1Images}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: ITEM_WIDTH,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image source={item} style={{ width: 110, height: 110 }} />
            </View>
          );
        }}
      />
      <FlatList
        style={{ marginTop: SIZES.padding, transform: [{ rotate: "180deg" }] }}
        ref={row2FlatListRef}
        decelerationRate="fast"
        horizontal
        showHorizontalScrollIndicator={false}
        listKey="Slider2"
        scrollEnable={false}
        keyExtractor={(_, index) => `Slider2_${index}`}
        data={row2Images}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: ITEM_WIDTH,
                alignItems: "center",
                justifyContent: "center",
                transform: [{ rotate: '180deg'}]
              }}
            >
              <Image source={item} style={{ width: 110, height: 110 }} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Walkthrough1;
