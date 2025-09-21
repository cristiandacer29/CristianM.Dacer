<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notification</title>
    <link rel="stylesheet" href="css/style.css" type="text/css">
    <link rel="stylesheet" href="css/notification.css" type="text/css">
    <link rel="icon" type="image/x-icon" href="img/myLogo.ico">
</head>
<body onload="notification()" class="wraper">
    <input type="hidden" class="to-hide" id="trigger-design" value="<?php
        session_start();
        echo $_SESSION['notification-trigger'];
        session_destroy();?>">
    <div class="glass-effect error-container" id="glow-style-effect">
        <img src="img/icons/Successful.png" class="icon-size bell-animation" alt="icon" id="change-icon">
        <h2 class="notify" id="notify-header">
            Error message
        </h2>
        <p id="notify-message">vdfgdsfgd fg dgd dsfgdf ghfh fdghf dfdg dfgdfgdfgfdg dfg fg dfg dfgdfgdfgfdg
        </p>
        <button class="main-button" onclick="toLink()">OK</button>
    </div>
</body>
</html>
<script src="portfolio.js"></script>