import React, { useRef } from "react";
import { View, Animated, Text } from "react-native";
import { TextButton } from "../../components";
import { COLORS, SIZES, FONTS, constants } from "../../constants";

const Walkthrough = () => {
  let scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.light }}>
      <Animated.FlatList
        data={constants.walkthrough}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SIZES.width}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width: SIZES.width, justifyContent: "center" }}>
              {/* Walkthrough Images */}

              <View style={{ flex: 1 }}></View>

              {/* Title and description */}
              <View
                style={{
                  height: SIZES.height * 0.35,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: SIZES.padding,
                }}
              >
                <Text style={{ ...FONTS.h1 }}>{item.title}</Text>
                <Text
                  style={{
                    ...FONTS.body3,
                    marginTop: SIZES.radius,
                    textAlign: "center",
                    color: COLORS.grey,
                  }}
                >
                  {item.sub_title}
                </Text>
              </View>
            </View>
          );
        }}
      ></Animated.FlatList>
    </View>
  );
};

export default Walkthrough;
