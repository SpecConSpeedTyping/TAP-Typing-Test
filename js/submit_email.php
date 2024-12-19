<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "antonio@speccon.co.za"; // Specify the recipient email address
    $subject = "New Speed Typing Test Score"; // Email subject
    $email = $_POST["email"]; // User's email from the form
    $wpm = $_POST["wpm"]; // WPM score from the form
    $accuracy = $_POST["accuracy"]; // Accuracy score from the form

    // Email content
    $message = "Hello,\n\n";
    $message .= "A new speed typing test score has been submitted:\n";
    $message .= "Email: $email\n";
    $message .= "Words Per Minute (WPM): $wpm\n";
    $message .= "Accuracy: $accuracy%\n\n";
    $message .= "Best regards,\n";
    $message .= "Your Website";

    // Send the email
    mail($to, $subject, $message);

    // Redirect back to the thank you page or any other page
    header("file:///C:/Users/Speccon/Downloads/Typing%20Speed%20Test%20Game%20in%20JavaScript/Typing%20Speed%20Test%20Game%20Second%20Page/Page%203.html"); // Replace "thank_you.html" with the actual URL of your thank you page
    exit();
}

