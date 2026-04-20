import Filter from '@/components/common/filter';
import SubPageContainer from '@/components/common/sub-page-container';
import AddBadge from '@/components/profile/add-badge';
import { addUserBadge, badges$, currentUser$ } from '@/lib/SupaLegend';
import { Badge } from '@/lib/types';
import { useValue } from '@legendapp/state/react';
import { Image } from 'expo-image';
import React from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, Text, View } from 'react-native';

type BadgeFilter = 'ALL' | 'AWARDED' | 'NOT_AWARDED';

export default function BadgesScreen() {
    const currentUser = useValue(currentUser$);
    const badges = useValue(badges$);

    if (!currentUser || !badges) {
        return <ActivityIndicator size={34} color='rgba(230, 94, 68, 1)' className='my-3' />;
    }

    const [showBadge, setShowBadge] = React.useState<(Badge & { awardedText: string }) | null>(null);
    const [showAddBadge, setShowAddBadge] = React.useState<boolean>(false);
    const [filter, setFilter] = React.useState<BadgeFilter>('ALL');

    const renderItem = (item: Badge) => {
        const imgUrl = `${process.env.EXPO_PUBLIC_IMG_CDN}/${item.image_path}`;
        const awarded = currentUser.profile?.badges.find((b) => b.badge === item.id);

        const itemContent = (
            <>
                <View className={`w-16 h-16 mx-auto `}>
                    <Image source={imgUrl} contentFit='fill' style={{ flex: 1 }} />
                </View>
                <Text className='text-xs font-semibold text-accent-green text-center'>{item.title}</Text>
            </>
        );

        if (awarded) {
            const awardedDate = currentUser.profile!.badges.find((b) => b.badge === item.id)!.created_at;
            const formattedDate = new Date(awardedDate).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
            const awardedText = `Vous avez obtenu ce badge le ${formattedDate}`;
            const badgeToShow = { ...item, awardedText };

            return (
                <Pressable
                    className='flex w-24 mx-2 my-2 items-center'
                    onPress={() => setShowBadge(badgeToShow)}>
                    {itemContent}
                </Pressable>
            );
        } else {
            return (
                <View className='flex w-24 mx-2 my-2 items-center bg-background opacity-60'>
                    {itemContent}
                </View>
            );
        }
    };

    const getBadgeList = (): Badge[] => {
        switch (filter) {
            case 'ALL':
                return Object.values(badges);
            case 'AWARDED':
                return Object.values(badges).filter((b) =>
                    currentUser.profile?.badges.some((ub) => ub.badge === b.id),
                );
            case 'NOT_AWARDED':
                return Object.values(badges).filter(
                    (b) => !currentUser.profile?.badges.some((ub) => ub.badge === b.id),
                );
        }
    };

    const addBadge = async (code: string) => {
        const badgeId = Object.values(badges).find((b) => b.code === code)?.id;
        if (badgeId !== undefined) {
            const hasBadge = currentUser.profile!.badges.find((b) => b.badge === badgeId) !== undefined;

            if (!hasBadge) {
                await addUserBadge(badgeId, currentUser.profile!.id);
            }
        }

        setShowAddBadge(false);
    };

    return (
        <SubPageContainer title='Mes badges'>
            <View className='flex flex-row justify-around gap-x-4 py-3 mx-8'>
                <Filter label='Tous' selected={filter === 'ALL'} action={() => setFilter('ALL')} />
                <Filter label='Obtenus' selected={filter === 'AWARDED'} action={() => setFilter('AWARDED')} />
                <Filter
                    label='A obtenir'
                    selected={filter === 'NOT_AWARDED'}
                    action={() => setFilter('NOT_AWARDED')}
                />
            </View>
            <Pressable className='flex flex-row justify-center' onPress={() => setShowAddBadge(true)}>
                <Text className='text-accent-green text-sm'>Ajouter un badge</Text>
            </Pressable>
            <View className='w-11/12 mx-auto mt-3'>
                <FlatList
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={getBadgeList()}
                    renderItem={({ item }) => renderItem(item)}
                />
            </View>
            <Modal visible={showBadge !== null} transparent animationType='none' statusBarTranslucent>
                {/* Dimmed backdrop */}
                <View className='absolute inset-0 bg-black/30'>
                    <Pressable className='flex-1' onPress={() => setShowBadge(null)} />
                </View>
                <View className='flex gap-y-4 w-full pt-6 pb-12 absolute bottom-0 rounded-3xl bg-white'>
                    <View className='mx-auto w-24 h-24'>
                        <Image
                            source={`${process.env.EXPO_PUBLIC_IMG_CDN}/${showBadge?.image_path}`}
                            contentFit='fill'
                            style={{ flex: 1 }}
                        />
                    </View>
                    <Text className='title-h2 text-center'>{showBadge?.title}</Text>
                    <Text className='text-sm text-center'>{showBadge?.description}</Text>
                    <Text className='text-xs text-center text-gray-500'>{showBadge?.awardedText}</Text>
                </View>
            </Modal>
            <Modal visible={showAddBadge} transparent animationType='none' statusBarTranslucent>
                {/* Dimmed backdrop */}
                <View className='absolute inset-0 bg-black/30'>
                    <Pressable className='flex-1' onPress={() => setShowAddBadge(false)} />
                </View>
                <View className='w-full p-4 absolute bottom-0 rounded-3xl bg-white'>
                    <AddBadge action={addBadge} />
                </View>
            </Modal>
        </SubPageContainer>
    );
}
