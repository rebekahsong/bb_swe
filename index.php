<!-- 
  COMP 333: Software Engineering
  Sebastian Zimmeck (szimmeck@wesleyan.edu) 

  PHP sample script for querying a database with SQL. This script can be run 
  from inside the htdocs directory in XAMPP. The script assumes that there is a 
  database set up (e.g., via PHPMyAdmin) named COMP333_SQL_Tutorial with a 
  student_grades table per the sql_tutorial.md.

  Note: To run this file as a PHP script change the file extension to .php.
-->

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

if(isset($_REQUEST["submit"])){
  $out_value = "";
  $u_username = $_REQUEST['username'];

  if(!empty($u_username)){
    $sql_query = "SELECT * FROM ratings WHERE username = ('$u_username')";
    $result = mysqli_query($conn, $sql_query);

    $row = mysqli_fetch_assoc($result);
    $out_value = "The song is: " . $row['song'];
  }
  else {
    $out_value = "No ratings available!";
  }
}

$conn->close();
?>

<!-- 
  HTML code for the form by which the user can query data.
  Note that we are using names (to pass values around in PHP) and not ids
  (which are for CSS styling or JavaScript functionality).
  You can leave the action in the form open 
  (https://stackoverflow.com/questions/1131781/is-it-a-good-practice-to-use-an-empty-url-for-a-html-forms-action-attribute-a)
-->
<form method="POST" action="">
Username: <input type="text" name="username" placeholder="Enter username to see their ratings" /><br>
<input type="submit" name="submit" value="Submit"/>
<!-- 
  Make sure that there is a value available for $out_value.
  If so, print to the screen.
 -->
<p><?php 
  if(!empty($out_value)){
    echo $out_value;
  }
?></p>
</form>

</body>
</html>