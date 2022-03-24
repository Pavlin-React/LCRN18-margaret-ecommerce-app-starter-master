import React, { useRef } from "react";
import { View, Animated, Text } from "react-native";
import { TextButton } from "../../components";
import { COLORS, SIZES, FONTS, constants } from "../../constants";
import Walkthrough1 from "./Walkthrough1";

const Walkthrough = () => {
  let scrollX = useRef(new Animated.Value(0)).current;
  let Dots = () => {
    let dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {constants.walkthrough.map((item, index) => {
          let dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.dark08, COLORS.primary, COLORS.dark08],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                borderRadius: 5,
                marginHorizontal: 6,
                width: 10,
                height: 10,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };
  let renderFooter = () => {
    return (
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: SIZES.height * 0.2,
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.height > 700 ? SIZES.padding : 20,
        }}
      >
        <Dots />
        <View style={{flexDirection: 'row', height: 55}} >
          <TextButton
            label='Join Now'
            contentContainerStyle={{
              flex: 1,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGrey
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3
            }}
          />
          <TextButton
            label='Log In'
            contentContainerStyle={{
              flex: 1,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
              marginLeft: SIZES.radius
            }}
            labelStyle={{
              ...FONTS.h3
            }}
          />
        </View>
      </View>
    );
  };

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
              

              <View style={{ flex: 1, justifyContent: 'center' }}>
                {index == 0 && <Walkthrough1/>}
              </View>

              {/* Title and description */}
              <View
                style={{
                  height: SIZES.height * 0.35,
                  alignItems: "center",
                  justifyContent: "flex-start",
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
      />
      {renderFooter()}
    </View>
  );
};

export default Walkthrough;
