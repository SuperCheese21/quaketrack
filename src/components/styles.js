import { StyleSheet } from 'react-native';

import colors from '../config/colors';

const styles = StyleSheet.create({
    listView: {
        backgroundColor: colors.background,
        flex: 1
    },
    listHeader: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: colors.background,
        textAlign: 'center',
        textAlignVertical: 'center',
        flex: 0.1
    },
    listTitle: {
        fontSize: 15,
        color: 'black',
        textAlign: 'center'
    },
    listInfo: {
        fontSize: 12,
        color: 'black',
        textAlign: 'center',
        height: 30
    },
    listItem: {
        flexDirection: 'row',
        height: 60,
        borderRadius: 5,
        marginBottom: 5,
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
        color: 'black',
        flex: 1
    }
});

export default styles;
