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

	if (isset($_POST['login'])) {

		$login = $conn->real_escape_string($_POST['login']);

		$getUserQuery = "SELECT * FROM `game-data` WHERE login=?";
		$stmt = $conn->prepare($getUserQuery);
		$stmt->bind_param("s", $login);
		$stmt->execute();
		$result = $stmt->get_result();

		if ($result->num_rows > 0) {
			$userData = array();
			while ($row = $result->fetch_assoc()) {
				$userData[] = $row;
			}

			echo json_encode(array("success" => true, "data" => $userData));
		} else {
			$response = array("error" => "Пользователь с логином '$login' не найден.");
			echo json_encode($response);
		}
		
	} else {
		$response = array("error" => "Логин не был передан в запрос.");
		echo json_encode($response);
	}

	$conn->close();
?>
