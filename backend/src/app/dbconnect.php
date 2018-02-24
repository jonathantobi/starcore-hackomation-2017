<?php

	//config
	// $host = 'localhost';
	// $user = 'tes729sr';
	// $pass = 'ATsTneExMH5GGkPR';
	// $db_name = 'tes729sr_firefly';

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