import { BreweryIcon, DistanceIcon } from '@/components/beer-info/icons';
import InfoPill from '@/components/beer-info/info-pill';
import ModalRateBeer from '@/components/beer-info/modal-rate-beer';
import Ratings from '@/components/beer-info/ratings';
import SubPageContainer from '@/components/common/sub-page-container';
import { addUserRating, beers$, currentUser$, userRatings$ } from '@/lib/SupaLegend';
import { useSelector, useValue } from '@legendapp/state/react';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function BeerScreen() {
    const { beerId } = useLocalSearchParams();
    const beers = useValue(beers$);
    //const userRatings = useValue(userRatings$);
    const userRatings = useSelector(() => Object.values(userRatings$.get()));
    const currentUser = useValue(currentUser$);

    const [showRateBeer, setShowRateBeer] = React.useState<boolean>(false);
    const [justVoted, setJustVoted] = React.useState<boolean>(false);

    if (!beers || !userRatings || !currentUser) {
        return (
            <SubPageContainer title=''>
                <ActivityIndicator />
            </SubPageContainer>
        );
    }

    const selectedBeer = Object.values(beers).find((b) => b.id === beerId);
    const beerRating = Object.values(userRatings).filter((r) => r.beer === beerId);
    const avgRating = beerRating.reduce((acc, r) => acc + r.rating, 0) / beerRating.length;
    //const usrRating = beerRating.find((r) => r.user === currentUser.profile?.id)?.rating ?? -1;
    const usrRating =
        userRatings.find((r) => r.beer === beerId && r.user === currentUser.profile?.id)?.rating ?? -1;

    if (!selectedBeer) {
        return (
            <SubPageContainer title=''>
                <Text>Cette bière n'existe pas.</Text>
            </SubPageContainer>
        );
    }

    const beerImgUrl = `${process.env.EXPO_PUBLIC_IMG_CDN}/${selectedBeer?.image_card_path}`;

    const confirmRating = (rating: number) => {
        const beerId = selectedBeer.id;
        const userId = currentUser.profile?.id;

        if (!userId) {
            console.error('User not logged in');
            return;
        }

        addUserRating(beerId, rating, userId);
        setJustVoted(true);
        setTimeout(() => setJustVoted(false), 3000);
        setShowRateBeer(false);
    };

    return (
        <SubPageContainer title=''>
            <View className='p-4 bg-white'>
                <View className='flex flex-row justify-end bg-white pt-3 pb-8'>
                    {/*<div className='w-1/3'>&nbsp;</div>*/}
                    <View className='w-2/3 pl-4'>
                        <Text className='title-h2'>{selectedBeer.name}</Text>
                        <Text className='text-xl text-gray-300'>{selectedBeer.type}</Text>
                    </View>
                </View>
                <View className='flex flex-row gap-x-5 px-4'>
                    <View className='w-1/3 -mt-24'>
                        <Image
                            source={beerImgUrl}
                            contentFit='contain'
                            transition={1000}
                            style={{ flex: 1 }}
                        />
                    </View>
                    <View className='w-2/3 -mt-3 gap-y-6'>
                        <View className='flex flex-row gap-2 flex-wrap'>
                            <InfoPill info={`IBU ${selectedBeer.ibu}`} />
                            {selectedBeer.ebc > -1 ? <InfoPill info={`EBC ${selectedBeer.ebc}`} /> : null}
                            <InfoPill
                                info={`${selectedBeer.degree_integer},${selectedBeer.degree_decimal}%`}
                            />
                        </View>
                        <View className='flex flex-row gap-x-3'>
                            <BreweryIcon />
                            <Text className='text-accent-green'>{selectedBeer.brewery}</Text>
                        </View>
                        {!selectedBeer.distance || selectedBeer.distance <= 0 ? null : (
                            <View className='flex flex-row gap-x-3'>
                                <DistanceIcon />
                                <Text className='text-accent-green'>{`${selectedBeer.distance} km`}</Text>
                            </View>
                        )}
                    </View>
                </View>

                <Ratings
                    avgRating={avgRating}
                    justVoted={justVoted}
                    beerId={selectedBeer.id}
                    userId={currentUser.profile?.id || ''}
                    fullUserRatings={userRatings}
                    showRateBeer={() => setShowRateBeer(true)}
                />

                <View className='flex gap-y-2 my-8'>
                    <Text className='font-semibold text-accent-green'>Description</Text>
                    <Text className='text-gray-400'>{selectedBeer.description}</Text>
                </View>
            </View>
            {showRateBeer ? (
                <ModalRateBeer
                    beer={selectedBeer}
                    close={() => setShowRateBeer(false)}
                    confirmRating={confirmRating}
                />
            ) : null}
        </SubPageContainer>
    );
}
