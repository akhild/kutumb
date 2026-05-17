import React, { ReactNode } from 'react';
import Animated, { interpolateColor, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const AnimatedBackground = ({ children, active, style }: {
  children: ReactNode,
  active: boolean,
  style: any,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    // Highlight effect: Check if this item matches the activeIndex
    const backgroundColor = interpolateColor(
      active ? 1 : 0,
      [0, 1],
      ['#FFFFFF', '#D1E8FF'] // From white to a highlighted blue
    );

    const scale = withTiming(active ? 1.2 : 1, { duration: 1500 });

    return {
      backgroundColor,
      transform: [{ scale }],
      transitionDuration: [500],
      transitionProperty: ['backgroundColor'],
    };
  });


  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  )
}

export default AnimatedBackground;