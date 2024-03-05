<?php
$userName = $_GET['userName'];
$userFolder = "../users/" . $userName;

if (is_dir($userFolder)) {
    $files = scandir($userFolder);
    $fileList = [];

    foreach ($files as $file) {
        if ($file != '.' && $file != '..') {
            $fileInfo = pathinfo($file);
            $dateTime = DateTime::createFromFormat('Y_m_d_H-i-s', $fileInfo['filename']);
            $fileList[] = array(
                'date' => $dateTime->format('Y-m-d'),
                'time' => $dateTime->format('H:i:s'),
                'filename' => $file
            );
        }
    }

    echo json_encode($fileList);
} else {
    echo json_encode(array('error' => 'Folder with this name does not exist'));
}
?>
