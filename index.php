<!DOCTYPE HTML>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="application/x-www-form-urlencoded"/>
<title>Sample Submission Form</title>
</head>

<body>
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "music-db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if(isset($_REQUEST["register"])){
  $out_value = "";
  $u_username = $_REQUEST['username'];
  $u_password = $_REQUEST['password'];


  if(!empty($u_username)&&(!empty($u_password))){
	$sql_query = "INSERT INTO users ( username, password ) VALUES ( '$u_username', '$u_password' )";

    $result = mysqli_query($conn, $sql_query);

    $out_value = "Successfuly registered";
  }
}

if(isset($_REQUEST["retrieve"])){

	$out_value_songs_and_ratings = array();
	$u_username = $_REQUEST['username'];
  
	if(!empty($u_username)){
	  $sql_query = "SELECT * FROM ratings WHERE username = ('$u_username')";
	  $result = mysqli_query($conn, $sql_query);

		while($row = mysqli_fetch_assoc($result))
		{
		$song_and_rating = array($row['song'], $row['rating']);
		array_push($out_value_songs_and_ratings,$song_and_rating);
		}
  
	}
  }

$conn->close();
?>

<!-- 
  HTML code
-->
<h1>MUSIC-DB</h1>
<h3>Register</h3>
<form method="POST" action="">
Username: <input type="text" name="username" placeholder="Enter username" /><br>
Password: <input type="text" name="password" placeholder="Enter password" /><br>
<input type="submit" name="register" value="Register"/>

<p><?php 
  if(!empty($out_value)){
	echo "<h5>$out_value</h5>";
} else {
	echo "<h5>Please enter a valid and unique username</h5>";
}
?></p>
</form>

<h3>Find Ratings</h3>
<form method="POST" action="">
Username: <input type="text" name="username" placeholder="Enter username" /><br>
<input type="submit" name="retrieve" value="Retrieve"/>

<p><?php 
  if(!empty($out_value_songs_and_ratings)){
	foreach($out_value_songs_and_ratings as $song_and_rating) {
		
		echo "<h5>$song_and_rating[0] -> $song_and_rating[1]</h5>";
	}
  } else {
	  echo "<h5>Please enter a valid user with ratings</h5>";
  }
  $out_value_songs_and_ratings=array();
?></p>
</form>

</body>
</html>