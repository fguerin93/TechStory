<?php   
$form_value = $_GET['object'];
$form_value= htmlspecialchars($form_value);


$json= file_get_contents("vote.json");

$json_data = json_decode($json, TRUE);


$i=0;
$len = sizeof($json_data["content"]);

//log vote
$string = "vote ".$form_value;
error_log($string."\n", 3, "vote.log");

//add the vote
while ($i < $len ){
    if($json_data["content"][$i] == $form_value){
        $json_data["vote"][$json_data["content"][$i]] = $json_data["vote"]["Voiture"]+1;
    }
    $i = $i +1;
}

//encode to json
$json_data = json_encode($json_data, TRUE);
//put in file 
file_put_contents("vote.json", $json_data);


header('Location: ../index.html'); 
?>