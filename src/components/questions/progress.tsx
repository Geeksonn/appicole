import { TouchableOpacity, View } from 'react-native';
import { ProgressActive, ProgressInactive, ProgressLinker, ProgressRedo } from './icons';

type Props = {
    qidList: number[];
    end: boolean;
    goBack: (index: number) => void;
};

const Progress: React.FunctionComponent<Props> = ({ qidList, end, goBack }) => {
    return (
        <View className='flex flex-row mx-auto my-3'>
            {end ? (
                <TouchableOpacity
                    className='flex items-center space-x-2 px-5 py-2 bg-brass-green rounded-full text-white text-sm'
                    onPress={() => goBack(0)}>
                    <ProgressRedo />
                    <p>Recommencer</p>
                </TouchableOpacity>
            ) : (
                qidList.map((qid, ind) => {
                    return (
                        <View key={`view_${ind}`} className='flex flex-row items-center'>
                            <TouchableOpacity key={`div_click_${ind}`} onPress={() => goBack(ind)}>
                                {ind === qidList.length - 1 ? (
                                    <ProgressActive key={`active_${ind}`} />
                                ) : (
                                    <ProgressInactive key={`inactive_${ind}`} />
                                )}
                            </TouchableOpacity>
                            {ind < qidList.length - 1 ? <ProgressLinker key={`linker_${ind}`} /> : null}
                        </View>
                    );
                })
            )}
        </View>
    );
};

export default Progress;
