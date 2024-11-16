import botAvatar from "/bot-images/Logo_TP_Thu_Duc.png";
import chatIcon from "/bot-images/Logo_TP_Thu_Duc.png"; // Importing the chat icon

export const setting = {
  header: {
    title: (
      <div
        style={{
          cursor: "pointer",
          margin: 0,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Civic Bot
      </div>
    ),
    avatar: botAvatar,
    showAvatar: true,
  },
  tooltip: {
    mode: "CLOSE",
    text: "Civic Bot 😊",
  },
  chatButton: {
    icon: chatIcon, // Using the imported chat icon
  },
  chatHistory: {
    disabled: true, // Turn off chatHistory
  },
};
