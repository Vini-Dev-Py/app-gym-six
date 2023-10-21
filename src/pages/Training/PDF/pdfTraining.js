import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { getTrainingsMember } from "../../../services/getTrainingsMember";
import { getUser } from "../../../services/getUser";
import Loading from "../../../components/Loading/Loading";

const days = {
    "sunday": "Domingo",
    "monday": "Segunda-feira",
    "tuesday": "Terça-feira",
    "wednesday": "Quarta-feira",
    "thursday": "Quinta-feira",
    "friday": "Sexta-feira",
    "saturday": "Sábado",
};

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: '100vh',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    headerTraining: {
        marginBottom: 10,
        fontSize: 22
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ccc',
        padding: 5,
        border: '1px solid #000',
        justifyContent: 'space-between',
    },
    headerText: {
        fontWeight: 'bold',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        border: '1px solid #000',
        justifyContent: 'space-between',
    },
    cell: {
        flex: 1,
    },
});

export default function PdfTraining() {

    const { day } = useParams();
    const [trainings, setTrainings] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            var user = await getUser();

            user = JSON.parse(user);

            const response = await getTrainingsMember(user.id, day);

            setTrainings(response.data["data"]);
        };

        fetchData();
    }, []);

    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <View>
                        <Text style={styles.headerTraining}>
                            Treino de {days[day]}
                        </Text>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Exercício</Text>
                        <Text style={styles.headerText}>Séries</Text>
                        <Text style={styles.headerText}>Repetições</Text>
                        <Text style={styles.headerText}>Tempo de descanso</Text>
                    </View>
                    {
                        trainings.map((training, index) => (
                            <View key={index} style={styles.row}>
                                <Text style={styles.cell}>{training.exercise_name}</Text>
                                <Text style={styles.cell}>{training.sets}</Text>
                                <Text style={styles.cell}>{training.repes}</Text>
                                <Text style={styles.cell}>{training.rest_time}</Text>
                            </View>
                        ))
                    }
                </View>
            </Page>
        </Document>
    );

    if (!trainings) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    return (
        <div className="container">
            <PDFViewer className="iframe-pdf" style={{ width: '100%', height: '95vh' }}>
                <MyDocument />
            </PDFViewer>
        </div>
    );
}
