<?php

	//local
	$host = 'localhost';
	$user = 'root';
	$pass = '';
	$db_name = 'firefly';

	//connection
	$conn = new mysqli($host, $user, $pass, $db_name);

	if($conn->connect_error) {
	echo 'Error: ' . $conn->connect_error;
	}

?>