<?php   
$form_value = $_GET['object'];
echo 'plop '.$form_value;

//test fi



//mail send 
$recep_mail ="santosphilippe93@gmail.com";
$send_mail ="form@techstroy.fr";
$subject = 'Form vote';
$content = "Date : ".date("d/m/Y")."\n"."Heure : ".date("H:i:s")."\n"."Vote : ".$form_value;
$headers = array(
    'From' => $send_mail ,
    'Reply-To' => $mail ,
    'X-Mailer' => 'PHP/'.phpversion()
);
mail($recep_mail, $subject ,$content, $headers);


$file_name = 'test.txt';
$file = fopen($file_name, "a+") or die ("tchip alors");
fwrite($file, $form_value);
fclose($file);
?>