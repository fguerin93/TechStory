<?php
$json= file_get_contents("vote.json");

$json_data = json_decode($json, TRUE);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <table>
        <tr>
            <th>Object</th>
            <th>Value</th>
        </tr>
        <?php
            $i =0;
            $len = sizeof($json_data["content"]);
            while($i < $len){
        ?>
                    <tr>
                        <td><?php echo $json_data["content"][$i];?></td>
                        <td><?php echo $json_data["vote"][$json_data["content"][$i]];?></td>
                    </tr>
        <?php
                $i = $i+1;
            }
        ?>




    </table>
</body>
</html>