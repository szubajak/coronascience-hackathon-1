import * as React from 'react';
import {View} from 'native-base';

export const Separator: React.FunctionComponent = ({}) =>
    <View
        style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            marginTop: 12,
            marginBottom: 12,
        }}
    />;