<?php
header('Content-Type: application/json');

$servername  = "localhost";
$username = "sfumato_vlik";
$password = "A886pern4VLIK";
$dbname = "sfumato_math";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

mysqli_set_charset($conn, "utf8");

$getUsersQuery = "SELECT * FROM `exercise-data` ORDER BY `correct-answers` DESC, `wrong-answers` ASC LIMIT 3";
$result = $conn->query($getUsersQuery);

if ($result->num_rows > 0) {
    $userData = array();
    while ($row = $result->fetch_assoc()) {
        $userData[] = $row;
    }

    echo json_encode(array("success" => true, "data" => $userData));
} else {
    $response = array("error" => "Нет данных для отображения.");
    echo json_encode($response);
}

$conn->close();
?>
