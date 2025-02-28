import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

// Function to fetch mentor data from Firestore
export const fetchChatbotData = async (mentorName) => {
    try {
      const docRef = doc(db, 'chatbots', mentorName); // Reference to the document
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('Chatbot data fetched:', data); // Log the fetched data to verify it
        return data; // Return the data if it exists
      } else {
        console.error('No such document found!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching chatbot data:', error);
      return null;
    }
};

  
  

// Function to get the chatbot's response
export const getChatbotResponse = (userMessage, responses) => {
    if (!responses || responses.length === 0) {
      return "I'm sorry, I don't have a response for that.";
    }
  
    // Log the user's message and responses for debugging
    console.log('User message:', userMessage); 
    console.log('Available responses:', responses);
  
    // Ensure case-insensitive matching and check if the topic is included in the message
    const matchedResponse = responses.find((response) =>
      userMessage.toLowerCase().includes(response.topic.toLowerCase()) // Case-insensitive matching
    );
  
    console.log('Matched response:', matchedResponse); // Log matched response
  
    return matchedResponse
      ? matchedResponse.reply
      : "I'm sorry, I didn't understand that. Can you rephrase?";
  };
  
