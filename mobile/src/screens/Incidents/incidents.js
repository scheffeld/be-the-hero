import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'

import styles from './styles'
import logoImg from '../../assets/logo.png'
import api from '../../services/api'

const IncidentsScreen = () => {
    const navigation = useNavigation()
    const [ incidents, setIncidents ] = useState([])
    const [ total, setTotal ] = useState(0)
    const [ page, setPage ] = useState(1)
    const [ loading, setLoading ] =useState(false)
    
    const loadIncidents = async () => {
        if(loading){
            return;
        }

        if(total > 0 && incidents.length == total){
            return;
        }

        setLoading(true)

        const response = await api.get('incidents', {
            params: { page }
        });
        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page+1)
        setLoading(false)
    }

    const navigateToDetails = (incident) => {
        navigation.navigate('Details', { incident })
    }

    useEffect(() => {
        loadIncidents()
    }, [navigation])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.textHeader}>
                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text> 
                </Text>
            </View>
            <Text style={styles.title}>Bem-Vindx!</Text>
            <Text style={styles.descripton}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                data={incidents}
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={() => loadIncidents()}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>
                        <Text style={styles.incidentProperty}>CASO: </Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>
                        <Text style={styles.incidentProperty}>VALOR: </Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetails(incident)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name='arrow-right' color='#E02041' size={16}/>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    )
}

export default IncidentsScreen;