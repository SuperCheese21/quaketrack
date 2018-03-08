import { StyleSheet } from 'react-native';

import colors from '../config/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center'
    },
    headerStyle: {
        backgroundColor: colors.header,
        height: 65,
        paddingLeft: 10,
        paddingRight: 10
    },
    headerTitleStyle: {
        fontSize: 30,
        alignSelf: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    infoLink: {
        height: 40,
        color: 'blue',
        textAlign: 'center',
        textAlignVertical: 'center',
        textDecorationLine: 'underline'
    },
    infoTitle: {
        height: 50,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    infoView: {
        borderRadius: 10,
        flex: 1,
        margin: 5,
        padding: 10
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
    listTitle: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'bottom',
        height: 30
    },
    listView: {
        backgroundColor: colors.background,
        flex: 1
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
