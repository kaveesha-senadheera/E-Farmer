import React from "react";
import PropTypes from "prop-types";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles for a professional and beautiful layout
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f7fafc", // Light gray-blue background
    padding: 40,
  },
  header: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "extrabold",
    marginBottom: 25,
    color: "#1a4733", // Deep green for e-farmer theme
    borderBottom: "2px solid #48bb78", // Green underline
    paddingBottom: 5,
  },
  section: {
    marginBottom: 15,
    padding: 20,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderLeft: "4px solid #48bb78", // Green accent on left
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2d3748", // Dark gray-blue for labels
    marginBottom: 4,
  },
  text: {
    fontSize: 13,
    color: "#4a5568", // Softer gray for text
    marginBottom: 8,
    lineHeight: 1.4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  star: {
    fontSize: 16,
    color: "#f6e05e", // Bright yellow for stars
    marginRight: 2,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 11,
    color: "#718096", // Muted gray for footer
    fontStyle: "italic",
  },
});

const ReviewPDF = ({ review }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>E-Farmer Review Details</Text>

      {/* Review Information */}
      <View style={styles.section}>
        <Text style={styles.label}>Reviewer Name:</Text>
        <Text style={styles.text}>{review.name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{review.email}</Text>

        <Text style={styles.label}>Rating:</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <Text
              key={i}
              style={{
                ...styles.star,
                color: i < review.rating ? "#f6e05e" : "#e2e8f0", // Yellow for filled, gray for empty
              }}
            >
              ★
            </Text>
          ))}
          <Text style={{ ...styles.text, marginLeft: 8 }}>
            ({review.rating}/5)
          </Text>
        </View>

        <Text style={styles.label}>Review:</Text>
        <Text style={styles.text}>{review.reviewText}</Text>

        <Text style={styles.label}>Photo:</Text>
        <Text style={styles.text}>{review.photo || "No photo attached"}</Text>

        <Text style={styles.label}>Submitted:</Text>
        <Text style={styles.text}>
          {new Date(review.createdAt).toLocaleString()}
        </Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Thank you for sharing your feedback with E-Farmer!
      </Text>
    </Page>
  </Document>
);

ReviewPDF.propTypes = {
  review: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviewText: PropTypes.string.isRequired,
    photo: PropTypes.string,
    createdAt: PropTypes.string.isRequired, // Assuming createdAt is provided
  }).isRequired,
};

export default ReviewPDF;
