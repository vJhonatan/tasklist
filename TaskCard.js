import { CircleCheck } from "lucide-react-native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const TaskCard = ({ title, desc, status, onclick }) => {
    return (

        <View style={styles.card}>
            <View style={styles.header}>

                    <Text style={styles.title}>
                        {title}
                    </Text>

                    <CircleCheck color="green" size={32} />
            </View>
                <Text style={styles.description}> {desc} </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={onclick}>
                    <Text style={styles.buttonText}>
                        {status === "Done" ? 'Delete' : 'Check'}
                    </Text>
                </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginVertical: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontsize: 10,
        fontWeight: 'bold',
        color: '#333'
    },
    status: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBotton: 10
    },
    button: {
        marginTop: 16,
        backgroundColor: '#d33f49',
        paddingVertical: 10,
        borderRadius: 6,
        alignItens: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default TaskCard;