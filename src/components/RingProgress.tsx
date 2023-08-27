import React, { useEffect } from "react";
import { View, Text } from "react-native";
import SVG, { Circle } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

// Cria um componente animado personalizado.
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type RingProgressProps = {
  radius?: number;
  strokeWidth?: number;
  progress: number;
};

const color = "#EE0755";

export const RingProgress = ({
  radius = 100,
  strokeWidth = 35,
  progress,
}: RingProgressProps) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;

  // É o estado inicial da animação
  const fill = useSharedValue(0);

  // Animando o estado fill por tempo
  useEffect(() => {
    fill.value = withTiming(progress, { duration: 1500 });
  }, [progress]);

  // Animando apenas a propriedade
  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [circumference * fill.value, circumference],
  }));

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignSelf: "center",
      }}
    >
      <SVG>
        <AnimatedCircle
          r={innerRadius}
          cx={radius}
          cy={radius}
          originX={radius}
          originY={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeLinecap="round"
          rotation="-90"
          animatedProps={animatedProps}
        />

        <Circle
          r={innerRadius}
          cx={radius}
          cy={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          opacity={0.2}
        />
      </SVG>
    </View>
  );
};
