<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $service = htmlspecialchars($_POST['service']);
    $message = htmlspecialchars($_POST['message']);

    // Recipient email
    $to = "creationsdeem@gmail.com"; // Your email here

    // Email subject
    $email_subject = "New Quote Request: $subject";

    // Email body
    $email_body = "You have received a new quote request.\n\n".
                  "Name: $name\n".
                  "Email: $email\n".
                  "Service: $service\n".
                  "Message:\n$message\n";

    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    if(mail($to, $email_subject, $email_body, $headers)){
        echo "success";
    } else {
        echo "error";
    }
}
?>


