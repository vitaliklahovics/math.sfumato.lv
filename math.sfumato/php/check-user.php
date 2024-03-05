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

	$sql = "SELECT * FROM users WHERE login = '$login' AND password = '$password'";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		echo json_encode(array('success' => true));
	} else {
		echo json_encode(array('success' => false));
	}

	$conn->close();
?>