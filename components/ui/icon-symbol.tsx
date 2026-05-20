// Fallback for using MaterialIcons on Android and web.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialCommunityIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code-tags',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'chevron.down': 'chevron-down',
  'chevron.up': 'chevron-up',
  'tree.fill': 'family-tree',
  'person.2.badge.plus': 'account-multiple-plus-outline',
  'person.badge.plus.fill': 'account-plus',
  'person.crop.circle': 'account-circle-outline',
  'person.crop.circle.badge.plus': 'account-circle-outline',
  'eye': 'account-eye-outline',
  'magnifyingglass': 'magnify',
  'camera': 'camera-outline',
  'calendar': 'calendar',
  'location.circle.fill': 'map-marker-multiple',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  className,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
  className?: string;
}) {
  return <MaterialCommunityIcons color={color} size={size} name={MAPPING[name]} style={style} className={className ?? ''} />;
}
