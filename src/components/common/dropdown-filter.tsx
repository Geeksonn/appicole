import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Animated, Modal, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    items: {
        label: string;
        value: string;
    }[];
    selected: string;
    onSelect: (value: string) => void;
};

type Position = {
    top: number;
    left: number;
    width: number;
};

const DropdownFilter: React.FC<Props> = ({ items, selected, onSelect }) => {
    const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(-8)).current;
    const buttonRef = React.useRef<View>(null);
    const [dropdownPos, setDropdownPos] = React.useState<Position>({ top: 0, left: 0, width: 0 });

    const openDropdown = () => {
        buttonRef.current?.measureInWindow((x, y, width, height) => {
            setDropdownPos({ top: y + height + 6, left: x, width });
            setShowDropdown(true);
            fadeAnim.setValue(0);
            slideAnim.setValue(-8);
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 180,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 180,
                    useNativeDriver: true,
                }),
            ]).start();
        });
    };

    const closeDropdown = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 140,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: -8,
                duration: 140,
                useNativeDriver: true,
            }),
        ]).start(() => setShowDropdown(false));
    };

    const handleSelect = (value: string) => {
        onSelect(value);
        closeDropdown();
    };

    return (
        <View className='px-4 my-5'>
            <TouchableOpacity
                ref={buttonRef as any}
                onPress={showDropdown ? closeDropdown : openDropdown}
                activeOpacity={0.75}
                className='flex flex-row items-center gap-6 px-4 py-3 rounded-full bg-accent-green border border-accent-green'>
                <Text className='text-xs text-white'>{items.find((it) => it.value === selected)!.label}</Text>
            </TouchableOpacity>

            {/* Dropdown overlay */}
            <Modal visible={showDropdown} transparent animationType='none'>
                <Pressable className='absolute inset-0' onPress={closeDropdown} />
                <Animated.View
                    className={`absolute bg-white rounded-xl border border-accent-green overflow-hidden`}
                    style={[
                        {
                            top: dropdownPos.top,
                            left: dropdownPos.left,
                            minWidth: dropdownPos.width,
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                        Platform.OS === 'ios'
                            ? {
                                  shadowColor: '#000',
                                  shadowOffset: { width: 0, height: 8 },
                                  shadowOpacity: 0.12,
                                  shadowRadius: 16,
                              }
                            : { elevation: 8 },
                    ]}>
                    {items.map((it, id) => {
                        const isSelected = it.value === selected;
                        const isLast = id === items.length - 1;
                        return (
                            <TouchableOpacity
                                key={`${it.value}_${id}`}
                                onPress={() => handleSelect(it.value)}
                                activeOpacity={0.7}
                                className={`flex flex-row items-center px-4 py-3 gap-x-2`}>
                                <Text
                                    className={`text-xs text-accent-green ${isSelected ? 'font-bold' : ''}`}>
                                    {it.label}
                                </Text>
                                {isSelected ? <Ionicons name='checkmark' size={14} /> : null}
                            </TouchableOpacity>
                        );
                    })}
                </Animated.View>
            </Modal>
        </View>
    );
};

export default DropdownFilter;
