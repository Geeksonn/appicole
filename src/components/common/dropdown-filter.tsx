import { BlurView } from 'expo-blur';
import React from 'react';
import { Animated, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    items: {
        label: string;
        value: string;
    }[];
    selected: string;
    onSelect: (value: string) => void;
};

type Position = {
    x: number;
    y: number;
    width: number;
    height: number;
};

const DropdownFilter: React.FC<Props> = ({ items, selected, onSelect }) => {
    const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
    // Animated values
    const heightAnim = React.useRef(new Animated.Value(36)).current;
    const listOpacity = React.useRef(new Animated.Value(0)).current;
    const backdropOpacity = React.useRef(new Animated.Value(0)).current;
    const buttonOpacity = React.useRef(new Animated.Value(1)).current;

    const buttonRef = React.useRef<View>(null);
    const [buttonLayout, setButtonLayout] = React.useState<Position>({ x: 0, y: 0, width: 160, height: 36 });

    const BUTTON_HEIGHT = 48;
    const OPTION_ROW_HEIGHT = 44;
    const menuHeight = BUTTON_HEIGHT + items.length * OPTION_ROW_HEIGHT;

    const openDropdown = () => {
        buttonRef.current?.measureInWindow((x, y, width, height) => {
            setButtonLayout({ x, y, width, height });
            buttonOpacity.setValue(0);
            setShowDropdown(true);

            Animated.parallel([
                Animated.spring(heightAnim, {
                    toValue: menuHeight,
                    damping: 22,
                    stiffness: 280,
                    useNativeDriver: false,
                }),
                Animated.timing(listOpacity, {
                    toValue: 1,
                    duration: 160,
                    delay: 80,
                    useNativeDriver: true,
                }),
                Animated.timing(backdropOpacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        });
    };

    const closeDropdown = (callback?: () => void) => {
        Animated.parallel([
            /*Animated.spring(heightAnim, {
                toValue: BUTTON_HEIGHT,
                damping: 22,
                stiffness: 280,
                useNativeDriver: false,
            }),*/
            Animated.timing(listOpacity, {
                toValue: 0,
                duration: 1,
                useNativeDriver: true,
            }),
            Animated.timing(backdropOpacity, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setShowDropdown(false);
            heightAnim.setValue(BUTTON_HEIGHT);
            Animated.timing(buttonOpacity, {
                toValue: 1,
                duration: 1,
                useNativeDriver: true,
            }).start(() => callback?.());
        });
    };

    const handleSelect = (value: string) => {
        closeDropdown(() => onSelect(value));
    };

    return (
        <View className='px-4 my-5'>
            <View className='flex flex-row justify-end w-full'>
                <TouchableOpacity
                    ref={buttonRef as any}
                    onPress={openDropdown}
                    activeOpacity={0.85}
                    // We hide this button while the modal is open to avoid double render
                    style={{ opacity: showDropdown ? 0 : 1 }}
                    className='flex-row justify-center items-center px-6 h-12 min-w-44 rounded-3xl bg-accent-green/70 border border-accent-green'>
                    <Text className='text-xs text-white'>
                        {items.find((it) => it.value === selected)!.label}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Dropdown overlay */}
            <Modal visible={showDropdown} transparent animationType='none' statusBarTranslucent>
                {/* Dimmed backdrop */}
                <Animated.View className='absolute inset-0 bg-black/10' style={{ opacity: backdropOpacity }}>
                    <Pressable className='flex-1' onPress={() => closeDropdown()} />
                </Animated.View>
                <Animated.View
                    className='absolute overflow-hidden rounded-3xl bg-accent-green/70 border border-accent-green'
                    style={{
                        top: buttonLayout.y,
                        left: buttonLayout.x,
                        width: buttonLayout.width,
                        height: heightAnim,
                    }}>
                    {items.map((it, id) => {
                        const isSelected = it.value === selected;
                        return (
                            <TouchableOpacity
                                key={`${it.value}_${id}`}
                                onPress={() => handleSelect(it.value)}
                                activeOpacity={0.7}
                                className={`flex flex-row items-center px-6 h-12`}>
                                <Text className={`text-xs text-white`}>{it.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </Animated.View>
                <BlurView />
            </Modal>
        </View>
    );
};

export default DropdownFilter;
