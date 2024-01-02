import { Link } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Home: React.FC<Record<string, never>> = () => (
    <View style={styles.container}>
        <Text style={styles.header}>Choose your game</Text>
        <Link style={styles.link} to={{ screen: 'Memotest' }}>
            Memotest
        </Link>
        <StatusBar style="auto" />
    </View>
) 

export default Home

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
    },
    link: {
        fontSize: 20,
        letterSpacing: 4,
    }
});