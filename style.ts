import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10
    }, title: {
        fontSize: 22,
        marginBottom: 30
    },
    subtitle: {
        fontSize: 18,
        marginTop: 15
    },
    button: {
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginBottom: 10

    },
    buttonDisabled: {
        backgroundColor: 'black',
        opacity: 0.5,
        color: 'white',
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginBottom: 10

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
        marginBottom: 30
    },
    inputSend: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
        marginBottom: 10,
        borderRadius: 5
    },
    inputLabel: {
        margin: 12,
        width: '80%',
        borderRadius: 5
    },
    header: {
        backgroundColor: 'black',
        color: 'white'
    },
    iconButton: {
        borderColor: 'black',
        borderWidth: 1,
        alignContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    balance: {
        color: 'green',
        fontSize: 30
    },
    modalView: {
        position: 'absolute',
        bottom: 0,
        height: '70%',
        backgroundColor: '#eeeeee',
        width: '100%'
    }

});

export { styles }