import React from 'react';
import { TextInput } from 'react-native';

type Props = {
    placeholder: string;
    contentType: 'emailAddress' | 'password';
    onChange: (text: string) => void;
    value: string;
    secure?: boolean;
};

const TextInputElement: React.FC<Props> = (props) => {
    const { placeholder, contentType, onChange, value, secure = false } = props;
    return (
        <TextInput
            placeholder={placeholder}
            textContentType={contentType}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secure}
            className='p-3 rounded-lg border border-gray-400'
        />
    );
};

export default TextInputElement;
