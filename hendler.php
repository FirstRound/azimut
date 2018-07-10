<?php
    $name=$_POST['user'];
    $phone=$_POST['phone'];
    $to = "codimweb@gmail.com";
    $subject = "Заявка!";


    $message = "$subject  <br>Имя: $name <br>Телефон: $phone";

    
    $headers = "Content-type: text/html; charset=UTF-8 \r\n";
    $headers .= "From: wth\r\n";
    mail($to, $subject, $message, $headers);

    echo  'ok';
?>
