<?php
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);

    if ($data && isset($data['results']) && isset($data['username']) && isset($data['currentTime'])) {
        $savePath = "../users/";

        $username = $data['username'];
        
        if (!file_exists($savePath . $username)) {
            mkdir($savePath . $username, 0777, true);
        }

        $filePath = $savePath . $username . "/" . $data['currentTime'] . ".json";

        $file = fopen($filePath, "a");
        if ($file) {
            fwrite($file, json_encode($data['results']) . "\n");
            fclose($file);
            echo "Results saved successfully.";
        } else {
            echo "Error opening file for writing.";
        }
    } else {
        echo "Error: Data not received or incorrect.";
    }
?>
