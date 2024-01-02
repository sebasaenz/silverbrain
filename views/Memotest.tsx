import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MemotestGrid from '../components/Memotest/MemotestGrid';

const Memotest: React.FC<Record<string, never>> = () => (
    <View style={styles.container}>
        <Text style={styles.header}>Memotest</Text>
        <MemotestGrid />
        <StatusBar style="auto" />
    </View>
) 

export default Memotest

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30
    }
});