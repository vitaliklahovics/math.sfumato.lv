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
	$score = (int)$_POST['score'];
	$time = (int)$_POST['time'];
	$game = $conn->real_escape_string($_POST['game']);
	$difficulty = $conn->real_escape_string($_POST['difficulty']);

	$getUserQuery = "SELECT * FROM `game-data` WHERE login = '$login'";
	$getUserResult = $conn->query($getUserQuery);

	if ($getUserResult) {
		$userData = $getUserResult->fetch_assoc();

        if ($score > $userData["$game-$difficulty"]) {
            $updatedRecord = $score;
        } else {
            $updatedRecord = $userData["$game-$difficulty"];
        }
		$updatedMinutes = $userData['seconds'] + $time;

		$setUserQuery = "UPDATE `game-data` SET `$game-$difficulty`='$updatedRecord', `seconds`='$updatedMinutes' WHERE login = '$login'";
		$setUserResult = $conn->query($setUserQuery);

		if ($setUserResult) {
			echo json_encode(array('success' => true));
		} else {
			echo json_encode(array('success' => false, 'error' => $conn->error));
		}
	} else {
		echo json_encode(array('success' => false, 'error' => $conn->error));
	}

	$conn->close();
?>
