<?php
    header('Content-Type: text/html; charset=utf-8');
    mb_internal_encoding('UTF-8');    

    $servername  = "localhost";
    $username = "sfumato_vlik";
    $password = "A886pern4VLIK";
    $dbname = "sfumato_math";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    mysqli_set_charset($conn, "utf8");

    $login = $conn->real_escape_string($_POST['login']);
    $password = $conn->real_escape_string($_POST['password']);
    $color = $conn->real_escape_string($_POST['color']);
    $language = $conn->real_escape_string($_POST['language']);

    $checkUserQuery = "SELECT * FROM `users` WHERE `login` = '$login'";
    $checkUserResult = $conn->query($checkUserQuery);

    if ($checkUserResult->num_rows > 0) {
        echo json_encode(array('success' => false, 'message' => "Пользователь с таким логином уже существует"));
    } else {
        $insertQuery = "INSERT INTO `users`(`login`, `password`) VALUES ('$login', '$password')";
        $insertResult = $conn->query($insertQuery);

        if (!$insertResult) {
            echo json_encode(array('success' => false, 'message' => "Пользователь не создан. Ошибка: " . $conn->error));
        } else {
            $insertQuerySettings = "INSERT INTO `settings-data`(`login`, `color`, `language`) VALUES ('$login', '$color', '$language')";
            $insertQueryGame = "INSERT INTO `game-data`(`login`,`multiplicationtable-easy`, `multiplicationtable-normal`, `multiplicationtable-hard`, `max10-easy`, `max10-normal`, `max10-hard`, `max20-easy`, `max20-normal`, `max20-hard`, `seconds`) VALUES ('$login', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)";
            $insertQueryExercise = "INSERT INTO `exercise-data`(`login`, `correct-answers`, `wrong-answers`, `seconds`) VALUES ('$login', 0, 0, 0)";

            $conn->begin_transaction();

            $insertResultSettings = $conn->query($insertQuerySettings);
            $insertResultGame = $conn->query($insertQueryGame);
            $insertResultExercise = $conn->query($insertQueryExercise);

            if ($insertResultSettings && $insertResultGame && $insertResultExercise) {
                $conn->commit();
                echo json_encode(array('success' => true));
            } else {
                $conn->rollback();
                echo json_encode(array('success' => false, 'message' => "Ошибка при добавлении данных. Ошибка: " . $conn->error));
            }
        }
    }

    $conn->close();
?>
