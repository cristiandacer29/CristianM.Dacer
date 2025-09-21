<?php
echo"<body style='margin: 0;'>
         <div style='margin: 0; height: 100dvh; width: 100dvw; background-color: rgb(238, 238, 255); z-index: 2; position: absolute;'>
         </div>
      </body>";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
if($_SERVER["REQUEST_METHOD"] == "POST")
{
   session_start();
   if(isset($_POST["contact"]) && !empty($_POST["contact"]))
   {
      $_SESSION["notification-trigger"] = "useRobot";
      die("<script> window.location = 'error.php';</script>");
   }

   if(isset($_POST["email"])||isset($_POST["subject"])||isset($_POST["message"]))
   {
      $customerEmail = htmlspecialchars($_POST["email"]);
      $customerSubject = htmlspecialchars($_POST["subject"]);
      $customerMessage = htmlspecialchars($_POST["message"]);

      require 'PHPMailer-master/src/Exception.php';
      require 'PHPMailer-master/src/PHPMailer.php';
      require 'PHPMailer-master/src/SMTP.php';

      $mail = new PHPMailer();
      $mail->IsSMTP();
      $mail->Mailer = "smtp";

      $mail->SMTPDebug  = 1;  
      $mail->SMTPAuth   = TRUE;
      $mail->SMTPSecure = "ssl";
      $mail->Port       = 465;
      $mail->Host       = "smtp.gmail.com";
      $mail->Username   = "cristiandacer29@gmail.com";
      $mail->Password   = "mhmy ctnt imhm vbdo";

      $mail->IsHTML(true);
      $mail->AddAddress("cristiandacer29@gmail.com", "cristiandacer29");
      $mail->SetFrom("$customerEmail", "Client");
      $mail->AddReplyTo("$customerEmail", "Client");
      $mail->AddCC("cristiandacer29@gmail.com", "cristiandacer29");
      $mail->Subject = "$customerSubject";
      $content = "$customerMessage";

      $mail->MsgHTML($content); 
      if(!$mail->Send())
      {
         $_SESSION["notification-trigger"] = "error"; 
         echo "<script> window.location = 'error.php';</script>";
         var_dump($mail);
      } 
      else
      {
         $_SESSION["notification-trigger"] = "success";
         echo "<script> window.location = 'error.php';</script>";
      }
   }
   else
   {
      die("<script> window.location = 'index.html';</script>");
   }
}
else
{
   die("<script> window.location = 'index.html';</script>");
}
?>
<script src="portfolio.js"></script>