import { StyleSheet } from 'react-native';

import colors from '../config/colors';

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: colors.header,
        height: 65
    },
    headerTitleStyle: {
        fontSize: 30,
        alignSelf: 'center'
    },
    listView: {
        backgroundColor: colors.background,
        flex: 1
    },
    listTitle: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'bottom',
        height: 30
    },
    listInfo: {
        fontSize: 12,
        color: 'black',
        textAlign: 'center',
        height: 30
    },
    listItem: {
        flexDirection: 'row',
        height: 65,
        borderRadius: 8,
        marginTop: 2.5,
        marginBottom: 2.5,
        marginLeft: 5,
        marginRight: 5,
        padding: 5
    },
    magnitudeText: {
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        flex: 1
    },
    locationText: {
        textAlignVertical: 'center',
        color: 'black',
        fontWeight: 'bold',
        flex: 1
    },
    timestampText: {
        textAlignVertical: 'center',
        color: 'black'
    }
});

export default styles;
