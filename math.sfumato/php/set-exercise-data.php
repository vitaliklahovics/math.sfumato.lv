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
	$correctAnswers = (int)$_POST['correctAnswers'];
	$wrongAnswers = (int)$_POST['wrongAnswers'];
	$minutes = (int)$_POST['minutes'];

	$getUserQuery = "SELECT `correct-answers`, `wrong-answers`, `seconds` FROM `exercise-data` WHERE login = '$login'";
	$getUserResult = $conn->query($getUserQuery);

	if ($getUserResult) {
		$userData = $getUserResult->fetch_assoc();

		$updatedCorrectAnswers = $userData['correct-answers'] + $correctAnswers;
		$updatedWrongAnswers = $userData['wrong-answers'] + $wrongAnswers;
		$updatedMinutes = $userData['seconds'] + $minutes;

		$setUserQuery = "UPDATE `exercise-data` SET `correct-answers`='$updatedCorrectAnswers', `wrong-answers`='$updatedWrongAnswers', `seconds`='$updatedMinutes' WHERE login = '$login'";
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
