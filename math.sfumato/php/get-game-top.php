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
$getUsersQuery = "SELECT 
login,
GREATEST(
    `multiplicationtable-easy`, `multiplicationtable-normal`, `multiplicationtable-hard`,
    `max10-easy`, `max10-normal`, `max10-hard`,
    `max20-easy`, `max20-normal`, `max20-hard`
) AS max_value,
CASE
    WHEN GREATEST(
        `multiplicationtable-easy`, `multiplicationtable-normal`, `multiplicationtable-hard`,
        `max10-easy`, `max10-normal`, `max10-hard`,
        `max20-easy`, `max20-normal`, `max20-hard`
    ) = `multiplicationtable-easy` THEN 'multiplicationtable-easy'
    WHEN GREATEST(
        `multiplicationtable-easy`, `multiplicationtable-normal`, `multiplicationtable-hard`,
        `max10-easy`, `max10-normal`, `max10-hard`,
        `max20-easy`, `max20-normal`, `max20-hard`
    ) = `multiplicationtable-normal` THEN 'multiplicationtable-normal'
    WHEN GREATEST(
        `multiplicationtable-easy`, `multiplicationtable-normal`, `multiplicationtable-hard`,
        `max10-easy`, `max10-normal`, `max10-hard`,
        `max20-easy`, `max20-normal`, `max20-hard`
    ) = `multiplicationtable-hard` THEN 'multiplicationtable-hard'
    WHEN GREATEST(
        `multiplicationtable-easy`, `multiplicationtable-normal`, `multiplicationtable-hard`,
        `max10-easy`, `max10-normal`, `max10-hard`,
        `max20-easy`, `max20-normal`, `max20-hard`
    ) = `max10-easy` THEN 'max10-easy'
    WHEN GREATEST(
        `multiplicationtable-easy`, `multiplicationtable-normal`, `multiplicationtable-hard`,
        `max10-easy`, `max10-normal`, `max10-hard`,
        `max20-easy`, `max20-normal`, `max20-hard`
    ) = `max10-normal` THEN 'max10-normal'
    WHEN GREATEST(
        `multiplicationtable-easy`, `multiplicationtable-normal`, `multiplicationtable-hard`,
        `max10-easy`, `max10-normal`, `max10-hard`,
        `max20-easy`, `max20-normal`, `max20-hard`
    ) = `max10-hard` THEN 'max10-hard'
    WHEN GREATEST(
        `multiplicationtable-easy`, `multiplicationtable-normal`, `multiplicationtable-hard`,
        `max10-easy`, `max10-normal`, `max10-hard`,
        `max20-easy`, `max20-normal`, `max20-hard`
    ) = `max20-easy` THEN 'max20-easy'
    WHEN GREATEST(
        `multiplicationtable-easy`, `multiplicationtable-normal`, `multiplicationtable-hard`,
        `max10-easy`, `max10-normal`, `max10-hard`,
        `max20-easy`, `max20-normal`, `max20-hard`
    ) = `max20-normal` THEN 'max20-normal'
    ELSE '`max20-hard`'
END AS max_column
FROM 
`game-data`
ORDER BY 
max_value DESC
LIMIT 3;";
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


