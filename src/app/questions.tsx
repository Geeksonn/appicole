import LargeButton from '@/components/common/large-button';
import SubPageContainer from '@/components/common/sub-page-container';
import BeerOverview from '@/components/questions/beer-overview';
import { ProgressRedo } from '@/components/questions/icons';
import OptionButton from '@/components/questions/option-button';
import Progress from '@/components/questions/progress';
import { beers$, questionsAndOptions$ } from '@/lib/SupaLegend';
import { Beer, OptionsForQuestion } from '@/lib/types';
import { useValue } from '@legendapp/state/react';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

export default function QuestionsScreen() {
    const [selectedOpt, setSelectedOpt] = React.useState<OptionsForQuestion | null>(null);
    const [selectedBeer, setSelectedBeer] = React.useState<Beer | undefined>(undefined);

    const qAndO = useValue(questionsAndOptions$);
    const beers = useValue(beers$);

    if (!qAndO || !beers) {
        return (
            <SubPageContainer title='Les Questions'>
                <ActivityIndicator />
            </SubPageContainer>
        );
    }

    const [qidList, setQidList] = React.useState<number[]>([Object.values(qAndO)[0].qid]);

    const isSelectedOpt = (option: OptionsForQuestion) => {
        return selectedOpt !== null && selectedOpt.id === option.id;
    };

    const handleValidate = () => {
        if (selectedOpt && selectedOpt.nextQuestionId > -1) {
            setQidList([...qidList, selectedOpt.nextQuestionId]);
            setSelectedOpt(null);
        } else if (selectedOpt && selectedOpt.nextQuestionId < 0) {
            setSelectedBeer(Object.values(beers).find((beer) => beer.id === selectedOpt.selectedBeerId));
        }
    };

    const goBack = (index: number) => {
        setQidList(qidList.filter((qid, ind) => ind <= index));
        if (index === 0) setSelectedBeer(undefined);
    };

    const Title: React.FC<{ title: string }> = ({ title }) => {
        return <Text className='text-accent-green font-bold text-2xl my-4'>{title}</Text>;
    };

    const RestartButton: React.FC = () => {
        return (
            <TouchableOpacity
                className='flex flex-row items-center gap-x-2 w-fit mx-auto px-5 py-2 bg-accent-green rounded-full'
                onPress={() => goBack(0)}>
                <ProgressRedo />
                <Text className='text-white text-sm'>Recommencer</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SubPageContainer title='Les Questions'>
            {selectedBeer !== undefined ? (
                <View className='p-4'>
                    <RestartButton />
                    <Title title='Bière recommandée' />
                    <BeerOverview {...selectedBeer} />
                </View>
            ) : (
                <View className='p-4'>
                    <Progress qidList={qidList} end={selectedBeer !== undefined} goBack={goBack} />
                    <Title
                        title={
                            Object.values(qAndO).find((q) => q.qid === qidList[qidList.length - 1])
                                ?.question || ''
                        }
                    />
                    <View className='w-full mx-auto'>
                        {Object.values(qAndO)
                            .find((q) => q.qid === qidList[qidList.length - 1])
                            ?.options.map((o) => (
                                <OptionButton
                                    selected={isSelectedOpt(o)}
                                    option={o}
                                    onPress={() => setSelectedOpt(o)}
                                    key={o.id}
                                />
                            ))}
                    </View>
                    <LargeButton title='Valider' onPress={() => handleValidate()} />
                </View>
            )}
        </SubPageContainer>
    );
}
