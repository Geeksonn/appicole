import { Beer } from '@/lib/types';
import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';

type Props = {
    beer: Beer;
    rating: number;
    numberOfVotes?: number;
    showCaveIcon?: boolean;
    //userRatings?: UserRating[];
};

const BeerItem: React.FunctionComponent<Props> = (props) => {
    const { beer, rating, numberOfVotes = -1, showCaveIcon = true /*, userRatings = []*/ } = props;

    const [showModal, setShowModal] = React.useState<boolean>(false);

    const { id, name, image_card_path, type, degree_integer, degree_decimal } = beer;
    const imgUrl = `${process.env.EXPO_PUBLIC_IMG_CDN}/${image_card_path}`;

    return (
        <View className='flex flex-row justify-around h-36 mx-3 my-6 bg-white rounded-xl ring-2 ring-gray-300/10 shadow-lg'>
            <View className='w-1/3 -mt-7'>
                <Image source={imgUrl} contentFit='contain' transition={1000} style={{ flex: 1 }} />
            </View>
            <View className='flex w-2/3 py-2'>
                <Text className='font-title font-bold text-brass-green text-xl'>{name}</Text>
                <Text className='text-gray-400 text-sm'>{`${type} - ${degree_integer},${degree_decimal} %`}</Text>
                <View className='flex justify-between mr-4 items-center mt-4'>
                    {/* <BeerRating rating={rating} numberOfVotes={numberOfVotes} /> */}
                    {showCaveIcon && (
                        // <BeerCaveIcon
                        //     id={id}
                        //     userRatings={userRatings}
                        //     toggleRateBeer={() => setShowModal(true)}
                        // />
                        <Text>BeerCaveIcon</Text>
                    )}
                </View>
            </View>
        </View>
    );

    /* old version --> 
    return (
        <>
            <Link href={`/edition/beer/${id}`} className='last:mb-24'>
                <div className='flex justify-around h-36 mx-3 my-8 bg-white rounded-xl drop-shadow-[0_0_30px_rgba(0,0,0,0.05)]'>
                    <div className='w-1/3 -mt-4'>
                        <img src={imgUrl} className={`h-40 -mt-8 mx-auto`} />
                    </div>
                    <div className='flex flex-col w-2/3 py-2'>
                        <div className='flex justify-between items-center pr-2'>
                            <h2>{name}</h2>
                        </div>
                        <p className='text-brass-grey text-sm'>{`${type} - ${degree_integer},${degree_decimal} %`}</p>
                        {rating === -1 ? (
                            <Spinner />
                        ) : (
                            <div className='flex justify-between mr-4 items-center mt-4'>
                                <BeerRating rating={rating} numberOfVotes={numberOfVotes} />
                                {showCaveIcon && (
                                    <BeerCaveIcon
                                        id={id}
                                        userRatings={userRatings}
                                        toggleRateBeer={() => setShowModal(true)}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Link>

            <Modal show={showModal} close={() => setShowModal(false)}>
                <BeerRatingForm beer={beer} close={() => setShowModal(false)} />
            </Modal>
        </>
    );
    */
};

export default BeerItem;
