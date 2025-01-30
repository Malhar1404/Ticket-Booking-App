import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#eef2f3',
    fontFamily: 'Helvetica',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Ensure the content is vertically centered on the page
  },
  ticket: {
    width: '80%',
    padding: 20,
    border: '2px solid #007bff', // Add border around the ticket
    borderRadius: 12,
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Align the content in the center horizontally
  },
  section: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: '1px dotted #000', // Dotted line below each section
    width: '100%', // Ensure the section spans the width of the ticket
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black', // Set header text color to black
    textTransform: 'uppercase',
    opacity: 0.75,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Set value text color to black
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Ensure the row spans the width of the ticket
    marginBottom: 10,
  },
  column: {
    flexDirection: 'column',
    width: '48%', // Make each column take up half the row's width
  },
});

const TicketPDF = ({ ticketData, formatDate, formatTime }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.ticket}>
        <View style={styles.section}>
          <Text style={styles.header}>Date</Text>
          <Text style={styles.value}>
            {ticketData.showtime && formatDate(ticketData.showtime.startTime)}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Movie</Text>
          <Text style={styles.value}>
            {ticketData.showtime && ticketData.showtime.movie?.name}
          </Text>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.header}>Seats</Text>
            <Text style={styles.value}>
              {ticketData.seatData &&
                ticketData.seatData.seats?.map((seat) => `${seat.row}${seat.column} `)}
            </Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.header}>Time</Text>
            <Text style={styles.value}>
              {ticketData.showtime && formatTime(ticketData.showtime.startTime)}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default TicketPDF;
